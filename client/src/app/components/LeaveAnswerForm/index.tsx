import { useEffect, useRef, useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { TextEditor } from '../TextEditor';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAuth } from '../SignInPanel/slice/selectors';
import { Answer, createAnswer, getAnswers } from 'services/answer.service';
import { AlertActions } from '../AuthMessage/slice';
import { Question } from '../QuestionDetails/slice/types';
import { PanelSubmitButton } from '../PanelSubmitButton';
import { AlertMessage } from '../AlertMessage';
import { logout } from 'services/auth.service';
import { panelActions } from '../SignUpPanel/slice';
import { panelName } from '../SignUpPanel/slice/types';

export interface Props {
    question: Question;
    setQuestion: Function
}

export default function LeaveAnswerForm(props: Props) {
    const editorRef = useRef<TinyMCEEditor>();
    const { user } = useAppSelector(getAuth);
    const dispatch = useAppDispatch();
    const [disabled, setDisabled] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editorRef.current || !user) return;

        const content = editorRef.current.getContent();
        if (!content) {
            dispatch(
              AlertActions.setAuthMessage({
                error: 'Phần nội dung câu trả lời không được để trống',
              }),
            );
          }
        
        const result = await dispatch(
            createAnswer({ authorId: user.id , questionId: props.question.id, content }),
        );
    
        if (result.type.includes('fulfilled')) {
            const answer = result.payload;
            props.question.answers.push(answer as Answer);
            props.setQuestion({ ...props.question, comments: [...props.question.answers] });
            setDisabled(true);
        }
    }

    const handleLeaveAnswerClick = e => {
        e.preventDefault();
          dispatch(
            AlertActions.setAuthMessage({
              error: 'Bạn vui lòng đăng nhập để bình luận',
            }),
          );
          dispatch(panelActions.openPanel(panelName.SIGN_IN));
      };


    useEffect(() => {
        if (user) {
            const userAlreadyAnswer = async () => {
                const answers = await getAnswers({ questionId: props.question.id, author: user.id, page: 1, amount: 1 });
                return answers.length > 0;
            }
            
            const disableEditorIfUserAlreadyAnswer = async () => {
                const result = await userAlreadyAnswer();
                setDisabled(result);
            }
            disableEditorIfUserAlreadyAnswer();
        }
    }, [props.question.id]);

    
    return (
        <div id="respond-all" className="respond-popup-share">
            { user 
            ? (
                
                <div id="respond" className="comment-respond">
                <h3 className="section-title">
                Viết câu trả lời
                <div className="cancel-comment-reply">
                <a
                    rel="nofollow"
                    id="cancel-comment-reply-link"
                    href="/demo/themes/Discy/Main/question/testing-title/#respond"
                    style={{ display: 'none' }}
                >
                    Cancel reply
                </a>
                </div>
            </h3>
            <form
                method="post"
                id="commentform"
                className="post-section comment-form answers-form"
                noValidate
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <div className="clearfix" />
                <TextEditor editorRef={editorRef} disabled={disabled}/>
                <div className="clearfix" />
                <p className="wpqa_checkbox_p ask_anonymously_p">
                </p>
                <div className="wpqa_error" />
                {user.isBanned ?
                    <PanelSubmitButton name={"Tài khoản của bạn không còn quyền trả lời câu hỏi này"} style={{ width: '100%', height: '40px', background: 'gray' }} disabled={true} />: 
                    <PanelSubmitButton name={disabled ? "Bạn đã trả lời câu hỏi này" : "Trả lời"} style={{ width: '100%', height: '40px', background: disabled ? 'gray' : '' }} disabled={disabled} />
                }
            </form>
                </div>
            ) 
            : (
                <input name="submit" type="submit" id="submit" className="button-default button-hide-click button-default-question" value="Trả lời" onClick={handleLeaveAnswerClick}/>
            )}            
      </div>
    )
}