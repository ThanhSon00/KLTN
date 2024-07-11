import { useEffect, useRef, useState } from "react";
import { AuthMessage } from "../AuthMessage";
import { PanelSubmitButton } from "../PanelSubmitButton";
import { TextEditor } from "../TextEditor";
import { Editor as TinyMCEEditor } from 'tinymce';
import { getAuth } from "../SignInPanel/slice/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { AlertActions } from "../AuthMessage/slice";
import { createQuestion, getQuestion, updateQuestion } from "services/question.service";
import { panelActions } from "../SignUpPanel/slice";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../BreadCrumbs";
import { Question } from "../QuestionDetails/slice/types";

export default function EditQuestionForm() {
    const { id } = useParams();
    const editorRef = useRef<TinyMCEEditor>();
    const [title, setTitle] = useState('');
    const { user } = useAppSelector(getAuth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question>();

    const handleTitleChange = e => {
        setTitle(e.target.value);
      };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!editorRef.current || !user || !id) return;

        const details = editorRef.current.getContent();

        if (!details) {
            dispatch(
                AlertActions.setAuthMessage({
                    error: 'Mô tả của câu không được để trống',
                }),
            );
        }
        
        const result = await dispatch(
            updateQuestion({ title, details, id }),
          );
      
        if (result.type.includes('rejected')) console.log('rejected');    
        if (result.type.includes('fulfilled')) {
            if (result.payload && typeof result.payload !== 'string') {
                const questionId = result.payload.id;
                navigate(`/home/questions/${questionId}`);
            }
        }
    }

    const loadQuestion = async (id) => {
        const question = await getQuestion(id);
        setQuestion(question);
        setTitle(question.title);
    }

    useEffect(() => {
        loadQuestion(id);
    }, [id])
    
    return (
        <>
            <BreadCrumb />
            <div className="wpqa-templates wpqa-edit-question-template">
                <form
                    className="form-post wpqa_form"
                    action="https://2code.info/demo/themes/Discy/Main/add-question/"
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                <AuthMessage />
                <div className="form-inputs clearfix">
                    <p>
                    <label htmlFor="question-title-931">
                        Tiêu đề câu hỏi<span className="required">*</span>
                    </label>
                    <input
                        name="title"
                        id="question-title-931"
                        className="form-control the-title"
                        type="text"
                        onChange={handleTitleChange}
                        defaultValue={question?.title}
                        required
                    />
                    <i className="icon-chat" />
                    <span className="form-description">
                        Nên chọn tiêu đề phù hợp nhất với câu hỏi để có thể dễ dàng được trả lời
                    </span>
                    </p>
                    <div className="wpqa_textarea wpqa_ask_question_textarea">
                    <label htmlFor="question-details-add-931">
                        Details<span className="required">*</span>
                    </label>
                    <TextEditor editorRef={editorRef} value={question?.details}/>
                    <span className="form-description">
                        Mô tả nên được viết rõ ràng và tập trung vào tiêu đề
                    </span>
                    </div>
                </div>
                <PanelSubmitButton name="Cập nhật câu hỏi của bạn" />
                </form>
            </div>
        </>
    )
}