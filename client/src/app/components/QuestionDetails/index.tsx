/**
 *
 * QuestionDetails
 *
 */
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Editor as TinyMCEEditor } from 'tinymce';
import { QuestionInner } from '../QuestionInner/Loadable';
import { Question } from 'app/components/QuestionDetails/slice/types';
import { QuestionBottom } from '../QuestionBottom';
// import { getAuth } from '../SignInPanel/slice/selectors';
import { TextEditor } from '../TextEditor';
import { getQuestion } from 'services/question.service';
import { User } from '../SignInPanel/slice/types';
import { getUser } from 'services/user.service';

interface Props {}

export default function QuestionDetails(props: Props) {
  const { id } = useParams();
  // const { user } = useAppSelector(getAuth);
  const editorRef = useRef<TinyMCEEditor>();
  const [question, setQuestion] = useState<Question>();
  const [author, setAuthor] = useState<User>();

  const loadDetails = async () => {
    const question = await getQuestion(id);
    const author = await getUser(question.authorId);
    setQuestion(question);
    setAuthor(author);
  };

  useEffect(() => {
    loadDetails();
  }, [id]);

  // const questionIndex = questions.findIndex(
  //   question => question.id === parseInt(id),
  // );

  // if (questionIndex !== -1) {
  //   questionData = questions[questionIndex];
  // }

  return (
    <div className="the-main-inner float_l">
      <div className="breadcrumbs d-flex align-items-center justify-content-between w-100 mb-4 breadcrumbs_1">
        <div className="breadcrumbs-wrap d-flex align-items-center justify-content-between w-100">
          <div className="breadcrumb-left">
            <span className="crumbs">
              <span
                className="breadcrumb-item"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                <span
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" />
                  <a
                    itemProp="item"
                    href="https://2code.info/demo/themes/Discy/Main/"
                    title="Home"
                  >
                    <span itemProp="name">
                      <i className="icon-home font-xl mr-2" />
                      Home
                    </span>
                  </a>
                </span>
                <span className="crumbs-span">/</span>
                <span
                  className="current"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" />
                  <a
                    itemProp="item"
                    href="https://2code.info/demo/themes/Discy/Main/questions/"
                    title="Questions"
                  >
                    <span itemProp="name">Questions</span>
                  </a>
                </span>
                <span className="crumbs-span">/</span>
                <span className="current">Q 41015</span>
              </span>
            </span>
          </div>
          <div className="breadcrumb-right d-flex align-items-center">
            <div className="question-navigation breadcrumb-navs d-flex">
              <a
                className="nav-previous breadcrumb-navs__item"
                href="https://2code.info/demo/themes/Discy/Main/question/what-is-a-nice-way-to-end-an-interview-that-is-clearly-going-badly/"
              >
                <i className="icon-left-open" />
              </a>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
      <div className="clearfix" />
      <div className="post-articles question-articles">
        <div className="activate-post-stats page-visits-post" data-id={41015} />
        <section className="loop-section">
          <h2 className="screen-reader-text">Discy Latest Questions</h2>
          <div className="post-articles question-articles articles-no-pagination">
            <article
              id="post-41015"
              className="article-question article-post question clearfix single-question question-vote-inside question-no-comments answer-question-not-jquery question-vote-image discoura-not-credential question-type-normal post-41015 type-question status-publish hentry question-category-company"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <div className="single-inner-content">
                {question && author && (
                  <>
                    <QuestionInner question={question} author={author} />
                    <QuestionBottom />
                  </>
                )}
              </div>
              <div className="question-adv-comments question-comments-before question-not-comments question-has-tabs">
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
                      action="https://2code.info/demo/themes/Discy/Main/wp-comments-post.php"
                      method="post"
                      id="commentform"
                      className="post-section comment-form answers-form"
                      noValidate
                      encType="multipart/form-data"
                    >
                      <p className="comment-login">
                        Logged in as
                        <a
                          className="comment-login-login"
                          href="https://2code.info/demo/themes/Discy/Main/profile/son689/"
                        >
                          <i className="icon-user" />
                          son689
                        </a>
                        <a
                          className="comment-login-logout"
                          href="https://2code.info/demo/themes/Discy/Main/wp-login.php?action=logout&redirect_to=https%3A%2F%2F2code.info%2Fdemo%2Fthemes%2FDiscy%2FMain%2Fquestion%2Ftesting-title%2F&_wpnonce=1ffc2c6c33"
                          title="Log out of this account"
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
                              alt="son689"
                              title="son689"
                              width={25}
                              height={25}
                              srcSet="https://secure.gravatar.com/avatar/932c851fc3fada8a085a55a30ba2a385?s=96&d=mm&r=g 1x, https://secure.gravatar.com/avatar/932c851fc3fada8a085a55a30ba2a385?s=96&d=mm&r=g 2x"
                              src="https://secure.gravatar.com/avatar/932c851fc3fada8a085a55a30ba2a385?s=96&d=mm&r=g"
                            />
                            <span>son689 answers</span>
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
                      <p className="form-submit">
                        <input
                          name="submit"
                          type="submit"
                          id="submit"
                          className="button-default button-hide-click button-default-question"
                          defaultValue="Submit"
                        />
                        <span className="clearfix" />
                        <span className="load_span">
                          <span className="loader_2" />
                        </span>
                        <input
                          type="hidden"
                          name="comment_post_ID"
                          defaultValue={41015}
                          id="comment_post_ID"
                        />
                        <input
                          type="hidden"
                          name="comment_parent"
                          id="comment_parent"
                          defaultValue={0}
                        />
                      </p>
                      <p style={{ display: 'none' }}>
                        <input
                          type="hidden"
                          id="akismet_comment_nonce"
                          name="akismet_comment_nonce"
                          defaultValue="4602a6be36"
                        />
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="clearfix" />
          <div className="pagination-wrap pagination-question no-pagination-wrap"></div>
        </section>
      </div>
    </div>
  );
}
