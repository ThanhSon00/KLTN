import { useEffect, useRef, useState } from "react";
import { TextEditor } from "../TextEditor"
import { Editor as TinyMCEEditor } from 'tinymce';
import { AlertMessage } from "../AlertMessage";
import { PanelSubmitButton } from "../PanelSubmitButton";
import BreadCrumb from "../BreadCrumbs";
import { useNavigate, useParams } from "react-router-dom";
import { Answer, AnswerDetails, getAnswerDetails, updateAnswerDetail } from "services/answer.service";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { AlertActions } from "../AlertMessage/slice";

export default function EditCommentForm() {
    const editorRef = useRef<TinyMCEEditor>();
    const { id, answerDetailsId } = useParams();
    const user = useAppSelector(getAuth);
    const [answerDetails, setAnswerDetails] = useState<AnswerDetails>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editorRef.current || !user || !answerDetailsId) return;

        const content = editorRef.current.getContent();

        if (!content) {
            dispatch(
              AlertActions.setAlertMessage({
                error: 'Answer content cannot be empty',
              }),
            );
          }
        
        const result = await dispatch(updateAnswerDetail({ id: answerDetailsId, content }));
    
        if (result.type.includes('rejected')) console.log('rejected');
    
        if (result.type.includes('fulfilled')) {
            const answer = result.payload;
            if (!answer || typeof answer === 'string') {
                console.log('error');
            } else {
                dispatch(AlertActions.setAlertMessage({ success: 'Answer updated successfully' }));
                navigate(`/home/questions/${id}`)
            }
        }
    }
    
    const loadAnswerDetails = async (id) => {
        const answerDetails = await getAnswerDetails(id);
        setAnswerDetails(answerDetails);
    }

    useEffect(() => {
        loadAnswerDetails(answerDetailsId);
    }, [answerDetailsId])

    return (
        <>
            <BreadCrumb />
            <AlertMessage />
            <div id="respond-all" className="respond-popup-share">
                <div id="respond" className="comment-respond">
                    <h3 className="section-title">
                        Leave an answer
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
                    <div className="wpqa_form wpqa_featured_comment">
                    <label htmlFor="featured_image">Featured image</label>
                    <div className="fileinputs">
                        <input
                        type="file"
                        name="featured_image"
                        id="featured_image"
                        />
                        <div className="fakefile">
                        <button type="button">Select file</button>
                        <span>Browse</span>
                        </div>
                        <i className="icon-camera" />
                    </div>
                    </div>
                    <div className="clearfix" />
                    <div className="clearfix" />
                    <p className="wpqa_checkbox_p ask_private_answer_p">
                    <label htmlFor="private_answer">
                        <span className="wpqa_checkbox">
                        <input
                            type="checkbox"
                            id="private_answer"
                            className="ask_anonymously"
                            name="private_answer"
                            defaultValue="on"
                        />
                        </span>
                        <span className="wpqa_checkbox_span">
                        Private answer?
                        </span>
                    </label>
                    </p>
                    <div className="wpqa_form wpqa_video_comment">
                    <p className="wpqa_checkbox_p">
                        <label htmlFor="video_answer_description">
                        <span className="wpqa_checkbox">
                            <input
                            type="checkbox"
                            id="video_answer_description"
                            className="video_answer_description_input"
                            name="video_answer_description"
                            defaultValue="on"
                            />
                        </span>
                        <span className="wpqa_checkbox_span">
                            Add a Video to describe the problem better.
                        </span>
                        </label>
                    </p>
                    <div className="video_answer_description wpqa_hide">
                        <p>
                        <label htmlFor="video_answer_type">
                            Video type
                        </label>
                        <span className="styled-select">
                            <select
                            className="form-control"
                            id="video_answer_type"
                            name="video_answer_type"
                            >
                            <option value="youtube">Youtube</option>
                            <option value="vimeo">Vimeo</option>
                            <option value="daily">Dailymotion</option>
                            <option value="facebook">Facebook</option>
                            <option value="tiktok">TikTok</option>
                            </select>
                        </span>
                        <i className="icon-video" />
                        <span className="form-description">
                            Choose from here the video type.
                        </span>
                        </p>
                        <p>
                        <label htmlFor="video_answer_id">Video ID</label>
                        <input
                            name="video_answer_id"
                            id="video_answer_id"
                            className="form-control video_answer_id"
                            type="text"
                        />
                        <i className="icon-play" />
                        <span className="form-description">
                            Put Video ID here:
                            https://www.youtube.com/watch?v=sdUUx5FdySs Ex:
                            "sdUUx5FdySs".
                        </span>
                        </p>
                    </div>
                    </div>
                    <div className="clearfix" />
                    <TextEditor editorRef={editorRef} value={answerDetails?.content}/>
                    <div className="clearfix" />
                    <p className="wpqa_checkbox_p ask_anonymously_p">
                    </p>
                    <div className="wpqa_error" />
                    <PanelSubmitButton name="Update your comment" style={{ width: '100%', height: '40px' }}/>
                </form>
            </div>
            </div>
        </>
    )
}