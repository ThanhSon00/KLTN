import { useRef, useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { TextEditor } from '../TextEditor';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAuth } from '../SignInPanel/slice/selectors';
import { Answer, createAnswer } from 'services/answer.service';
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
    const { user }= useAppSelector(getAuth);
    const dispatch = useAppDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editorRef.current || !user) return;

        const content = editorRef.current.getContent();

        if (!content) {
            dispatch(
              AlertActions.setAuthMessage({
                error: 'Please fill out the desciption of your question',
              }),
            );
          }
        
        const result = await dispatch(
            createAnswer({ authorId: user.id , questionId: props.question.id, content }),
        );
    
        if (result.type.includes('rejected')) console.log('rejected');
    
        if (result.type.includes('fulfilled')) {
            const answer = result.payload;
            if (!answer || typeof answer === 'string') {
                console.log('error');
            } else {
                props.question.comments.push(answer.details);
                props.setQuestion({ ...props.question, comments: [...props.question.comments] });
            }
        }
    }

    const handleLeaveAnswerClick = e => {
        e.preventDefault();
          dispatch(
            AlertActions.setAuthMessage({
              error: 'You must login to submit an answer',
            }),
          );
          dispatch(panelActions.openPanel(panelName.SIGN_IN));
      };


    const logoutHandler = async (e) => {
        e.preventDefault();
        await dispatch(logout());
    }
    
    return (
        <div id="respond-all" className="respond-popup-share">
            { user 
            ? (
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
                <p className="comment-login">
                Logged in as
                <a
                    className="comment-login-login"
                    href="/"
                >
                    <i className="icon-user" />
                    {user.name}
                </a>
                <a
                    className="comment-login-logout"
                    href="/"
                    title="Log out of this account"
                    onClick={logoutHandler}
                >
                    <i className="icon-logout" />
                    Log out
                </a>
                </p>
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
                <TextEditor editorRef={editorRef} />
                <div className="clearfix" />
                <p className="wpqa_checkbox_p ask_anonymously_p">
                <label htmlFor="anonymously_answer">
                    <span className="wpqa_checkbox">
                    <input
                        type="checkbox"
                        id="anonymously_answer"
                        className="ask_anonymously"
                        name="anonymously_answer"
                        defaultValue="on"
                    />
                    </span>
                    <span className="wpqa_checkbox_span">
                    Answer Anonymously
                    </span>
                    <span className="anonymously_span ask_named">
                    <img
                        className="avatar avatar-25 photo"
                        title={user.name}
                        width={25}
                        height={25}
                        srcSet="https://secure.gravatar.com/avatar/932c851fc3fada8a085a55a30ba2a385?s=96&d=mm&r=g 1x, https://secure.gravatar.com/avatar/932c851fc3fada8a085a55a30ba2a385?s=96&d=mm&r=g 2x"
                        src="https://secure.gravatar.com/avatar/932c851fc3fada8a085a55a30ba2a385?s=96&d=mm&r=g"
                    />
                    <span>{user.name} answers</span>
                    </span>
                    <span
                    className="anonymously_span ask_none"
                    style={{ display: 'none' }}
                    >
                    <img
                        alt="Anonymous"
                        src="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/plugins/WPQA/images/avatar.png"
                    />
                    <span>Anonymous answers</span>
                    </span>
                </label>
                </p>
                <div className="wpqa_error" />
                <PanelSubmitButton name="Submit" style={{ width: '100%', height: '40px' }}/>
            </form>
                </div>
            ) 
            : (
                <input name="submit" type="submit" id="submit" className="button-default button-hide-click button-default-question" value="Leave an answer" onClick={handleLeaveAnswerClick}/>
            )}            
      </div>
    )
}