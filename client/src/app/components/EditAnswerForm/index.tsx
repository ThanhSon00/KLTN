import { useEffect, useRef, useState } from "react";
import { TextEditor } from "../TextEditor"
import { Editor as TinyMCEEditor } from 'tinymce';
import { AlertMessage } from "../AlertMessage";
import { PanelSubmitButton } from "../PanelSubmitButton";
import BreadCrumb from "../BreadCrumbs";
import { useNavigate, useParams } from "react-router-dom";
import { Answer, AnswerDetails, getAnswer, updateAnswer } from "services/answer.service";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { AlertActions } from "../AlertMessage/slice";

export default function EditAnswerForm() {
    const editorRef = useRef<TinyMCEEditor>();
    const { id } = useParams();
    const user = useAppSelector(getAuth);
    const [answer, setAnswer] = useState<Answer>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editorRef.current || !user || !id) return;

        const content = editorRef.current.getContent();

        if (!content) {
            dispatch(
              AlertActions.setAlertMessage({
                error: 'Câu trả lời không được để trống',
              }),
            );
          }
        
        const result = await dispatch(updateAnswer({ id: id, content }));
    
        if (result.type.includes('rejected')) console.log('rejected');
    
        if (result.type.includes('fulfilled')) {
            const answer = result.payload;
            if (!answer || typeof answer === 'string') {
                console.log('error');
            } else {
                dispatch(AlertActions.setAlertMessage({ success: 'Câu trả lời đã được cập nhật thành công' }));
                navigate(`/home/questions/${(result.payload as Answer).questionId}`)
            }
        }
    }
    
    const loadAnswerDetails = async (id) => {
        const answer = await getAnswer(id);
        setAnswer(answer);
    }

    useEffect(() => {
        loadAnswerDetails(id);
    }, [id])

    return (
        <>
            <BreadCrumb />
            <AlertMessage />
            <div id="respond-all" className="respond-popup-share">
                <div id="respond" className="comment-respond">
                    <h3 className="section-title">
                        Viêt câu trả lời
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
                    <TextEditor editorRef={editorRef} value={answer?.details.content}/>
                    <div className="clearfix" />
                    <p className="wpqa_checkbox_p ask_anonymously_p">
                    </p>
                    <div className="wpqa_error" />
                    <PanelSubmitButton name="Cập nhật câu trả lời" style={{ width: '100%', height: '40px' }}/>
                </form>
            </div>
            </div>
        </>
    )
}