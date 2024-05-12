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
                    error: 'Please fill out the desciption of your question',
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
                        Question Title<span className="required">*</span>
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
                        Please choose an appropriate title for the question so it can be
                        answered easily.
                    </span>
                    </p>
                    <div className="wpqa_category">
                    <label htmlFor="question-category-931">
                        Category<span className="required">*</span>
                    </label>
                    <span className="styled-select">
                        <select
                        name="category"
                        id="question-category-931"
                        className="form-control wpqa-custom-select select2-hidden-accessible"
                        data-select2-id="select2-data-question-category-931"
                        tabIndex={-1}
                        aria-hidden="true"
                        >
                        <option value={-1} data-select2-id="select2-data-2-uwm5">
                            Select a Category
                        </option>
                        <option className="level-0" value={8}>
                            Analytics
                        </option>
                        <option className="level-0" value={9}>
                            Communication
                        </option>
                        <option className="level-0" value={7}>
                            Company
                        </option>
                        <option className="level-0" value={6}>
                            Language
                        </option>
                        <option className="level-0" value={5}>
                            Management
                        </option>
                        <option className="level-0" value={4}>
                            Programmers
                        </option>
                        <option className="level-0" value={3}>
                            Programs
                        </option>
                        <option className="level-0" value={2}>
                            University
                        </option>
                        </select>
                        <span
                        className="select2 select2-container select2-container--default"
                        dir="ltr"
                        data-select2-id="select2-data-1-d28e"
                        style={{ width: '100%' }}
                        >
                        <span className="selection">
                            <span
                            className="select2-selection select2-selection--single"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabIndex={0}
                            aria-disabled="false"
                            aria-labelledby="select2-question-category-931-container"
                            aria-controls="select2-question-category-931-container"
                            >
                            <span
                                className="select2-selection__rendered"
                                id="select2-question-category-931-container"
                                role="textbox"
                                aria-readonly="true"
                                title="Select a Category"
                            >
                                Select a Category
                            </span>
                            <span
                                className="select2-selection__arrow"
                                role="presentation"
                            >
                                <b role="presentation" />
                            </span>
                            </span>
                        </span>
                        <span className="dropdown-wrapper" aria-hidden="true" />
                        </span>
                    </span>
                    <i className="icon-folder" />
                    <span className="form-description">
                        Please choose the appropriate section so the question can be
                        searched easily.
                    </span>
                    </div>
                    <p className="wpqa_tag">
                    <label htmlFor="question_tags-931">Tags</label>
                    <input
                        type="text"
                        className="form-control input question_tags"
                        name="question_tags"
                        id="question_tags-931"
                        data-seperator=","
                        style={{ display: 'none' }}
                    />
                    <span className="taglist">
                        <li className="input">
                        <input type="text" />
                        <span style={{ display: 'none' }} />
                        </li>
                    </span>
                    <span className="form-description">
                        Please choose suitable Keywords Ex:
                        <span className="color">question, poll</span>.
                    </span>
                    </p>
                    <p />
                    <p className="wpqa_checkbox_p wpqa_checkbox_poll">
                    <label htmlFor="question_poll-931">
                        <span className="wpqa_checkbox">
                        <input
                            type="checkbox"
                            id="question_poll-931"
                            className="question_poll"
                            defaultValue="on"
                            name="question_poll"
                        />
                        </span>
                        <span className="wpqa_checkbox_span">
                        Is this question is a poll? If you want to be doing a poll
                        click here.
                        </span>
                    </label>
                    </p>
                    <div className="clearfix" />
                    <div className="poll_options wpqa_hide not-poll-only poll-image poll-not-title poll-not-activated-image">
                    <p className="wpqa_checkbox_p">
                        <label htmlFor="question_image_poll-931">
                        <span className="wpqa_checkbox">
                            <input
                            type="checkbox"
                            id="question_image_poll-931"
                            className="question_image_poll"
                            defaultValue="on"
                            name="question_image_poll"
                            />
                        </span>
                        <span className="wpqa_checkbox_span">Image poll?</span>
                        </label>
                    </p>
                    <div className="clearfix" />
                    <ul className="question_items question_polls_item list-unstyled sorting-area ui-sortable">
                        <li id="poll_li_1" className="ui-sortable-handle">
                        <div className="poll-li">
                            <p className="poll_title_p">
                            <input
                                className="form-control ask"
                                name="ask[1][title]"
                                type="text"
                            />
                            <i className="icon-comment" />
                            </p>
                            <input name="ask[1][id]" defaultValue={1} type="hidden" />
                            <div className="del-item-li remove-answer">
                            <i className="icon-cancel" />
                            </div>
                            <div className="move-poll-li ui-icon darg-icon">
                            <i className="icon-menu" />
                            </div>
                        </div>
                        </li>
                        <li id="poll_li_2" className="ui-sortable-handle">
                        <div className="poll-li">
                            <p className="poll_title_p">
                            <input
                                className="form-control ask"
                                name="ask[2][title]"
                                type="text"
                            />
                            <i className="icon-comment" />
                            </p>
                            <input name="ask[2][id]" defaultValue={2} type="hidden" />
                            <div className="del-item-li remove-answer">
                            <i className="icon-cancel" />
                            </div>
                            <div className="move-poll-li ui-icon darg-icon">
                            <i className="icon-menu" />
                            </div>
                        </div>
                        </li>
                    </ul>
                    <button
                        type="button"
                        className="button-default-3 add_poll_button_js btn btn__primary btn__semi__height"
                    >
                        Add More Answers
                    </button>
                    <div className="clearfix" />
                    </div>
                    <div className="question-multiple-upload question-upload-featured">
                    <label htmlFor="featured_image-931">Featured image</label>
                    <div className="clearfix" />
                    <div className="fileinputs">
                        <input
                        type="file"
                        className="file"
                        name="featured_image"
                        id="featured_image-931"
                        />
                        <i className="icon-camera" />
                        <div className="fakefile">
                        <button type="button">Select file</button>
                        <span>Browse</span>
                        </div>
                    </div>
                    <div className="clearfix" />
                    </div>
                    <div className="wpqa_textarea wpqa_ask_question_textarea">
                    <label htmlFor="question-details-add-931">
                        Details<span className="required">*</span>
                    </label>
                    <TextEditor editorRef={editorRef} value={question?.details}/>
                    <span className="form-description">
                        Type the description thoroughly and in details.
                    </span>
                    </div>
                    <p className="wpqa_checkbox_p wpqa_checkbox_video">
                    <label htmlFor="video_description-931">
                        <span className="wpqa_checkbox">
                        <input
                            type="checkbox"
                            id="video_description-931"
                            className="video_description_input"
                            name="video_description"
                            defaultValue="on"
                        />
                        </span>
                        <span className="wpqa_checkbox_span">
                        Add a Video to describe the problem better.
                        </span>
                    </label>
                    </p>
                    <p className="wpqa_checkbox_p ask_remember_answer_p">
                    <label htmlFor="remember_answer-931">
                        <span className="wpqa_checkbox">
                        <input
                            type="checkbox"
                            id="remember_answer-931"
                            className="remember_answer"
                            name="remember_answer"
                            defaultValue="on"
                            defaultChecked={true}
                        />
                        </span>
                        <span className="wpqa_checkbox_span">
                        Get notified by email when someone answers this question.
                        </span>
                    </label>
                    </p>
                </div>
                <PanelSubmitButton name="Update Your Question" />
                </form>
            </div>
        </>
    )
}