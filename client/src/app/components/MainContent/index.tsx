import React, { memo } from 'react';
import { AlertMessage } from '../AlertMessage';
import { useAppSelector } from 'store/hooks';
import { getAuth } from '../SignInPanel/slice/selectors';
import { useDispatch } from 'react-redux';
import { panelActions } from '../SignUpPanel/slice';
import { panelName } from '../SignUpPanel/slice/types';
import { AlertActions } from '../AuthMessage/slice';
import { Outlet, useOutlet } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function MainContent() {
  const outlet = useOutlet();
  const { user } = useAppSelector(getAuth);
  const dispatch = useDispatch();
  const handleAskQuestionClick = e => {
    e.preventDefault();
    if (user) {
      dispatch(panelActions.openPanel(panelName.ASK_QUESTION));
    } else {
      dispatch(
        AlertActions.setAuthMessage({
          error: 'You must login to ask a question',
        }),
      );
      dispatch(panelActions.openPanel(panelName.SIGN_IN));
    }
  };
  return (
    <div
      className="main-content"
      style={{ minHeight: 'calc(-487.571px + 100vh)' }}
    >
      <div
        className="discy-inner-content menu_sidebar"
        style={{ minHeight: 'calc(-487.571px + 100vh)' }}
      >
        <div
          className="the-main-container the-wrap-container"
          style={{ minHeight: 'calc(-487.571px + 100vh)' }}
        >
          <main
            className="all-main-wrap discy-site-content float_l"
            style={{
              position: 'relative',
              overflow: 'visible',
              boxSizing: 'border-box',
              minHeight: '1px',
            }}
          >
            <div
              className="theiaStickySidebar"
              style={{
                paddingTop: '0px',
                paddingBottom: '1px',
                position: 'static',
              }}
            >
              {outlet ? (
                <Outlet />
              ) : (
                <div className="the-main-inner float_l">
                  <AlertMessage />
                  <div className="clearfix" />
                  <div id="row-tabs-home" className="row row-boot row-tabs">
                    <div className="col col12 col-boot-sm-12">
                      <div className="wrap-tabs">
                        <div className="menu-tabs active-menu">
                          <ul className="menu flex menu-tabs-desktop navbar-nav navbar-secondary">
                            <li className="menu-item active-tab">
                              <a href="index5cfe.html?show=recent-questions">
                                Recent Questions
                              </a>
                            </li>
                            <li className="menu-item">
                              <a href="index11ec.html?show=most-answered">
                                Most Answered
                              </a>
                            </li>
                            <li className="menu-item">
                              <a href="index4c8e.html?show=question-bump">
                                Bump Question
                              </a>
                            </li>
                            <li className="menu-item">
                              <a href="index836b.html?show=answers">Answers</a>
                            </li>
                            <li className="menu-item">
                              <a href="indexe6b0.html?show=most-visited">
                                Most Visited
                              </a>
                            </li>
                            <li className="flexMenu-viewMore">
                              <a href="#">
                                <i className="icon-dot-3" />
                              </a>
                              <ul
                                className="flexMenu-popup"
                                style={{
                                  display: 'none',
                                  position: 'absolute',
                                }}
                              >
                                <li className="menu-item">
                                  <a href="indexdaa9.html?show=most-voted">
                                    Most Voted
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="indexc0b3.html?show=no-answers">
                                    No Answers
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <div className="wpqa_hide mobile-tabs">
                            <span className="styled-select">
                              <select className="form-control home_categories">
                                <option value="index5cfe.html?show=recent-questions">
                                  Recent Recent Recent Questions
                                </option>
                                <option value="index11ec.html?show=most-answered">
                                  Most Answered
                                </option>
                                <option value="index4c8e.html?show=question-bump">
                                  Bump Question
                                </option>
                                <option value="index836b.html?show=answers">
                                  Answers
                                </option>
                                <option value="indexe6b0.html?show=most-visited">
                                  Most Visited
                                </option>
                                <option value="indexdaa9.html?show=most-voted">
                                  Most Voted
                                </option>
                                <option value="indexc0b3.html?show=no-answers">
                                  No Answers
                                </option>
                              </select>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <section className="loop-section">
                      <h2 className="screen-reader-text">
                        Discy Latest Questions
                      </h2>
                      <div className="post-articles question-articles">
                        <article
                          id="post-118"
                          className="article-question article-post question clearfix question-answer-before question-vote-inside question-with-comments answer-question-not-jquery question-vote-image discoura-not-credential question-type-normal post-118 type-question status-publish hentry question-category-language question_tags-english question_tags-language"
                        >
                          <div className="question-sticky-ribbon">
                            <div>Pinned</div>
                          </div>
                          <div className="single-inner-content">
                            <div className="question-inner">
                              <div className="question-image-vote">
                                <div className="author-image author__avatar author-image-42 author_image_mouseover">
                                  <a href="profile/martin/index.html">
                                    <span className="author-image-span">
                                      <img
                                        className="avatar avatar-42 photo"
                                        alt="Martin Hope"
                                        title="Martin Hope"
                                        width={42}
                                        height={42}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-84x84.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg"
                                      />
                                    </span>
                                  </a>
                                  <div
                                    className="author-image-pop-2 member-card"
                                    data-user={6}
                                  >
                                    <div className="post-section user-area user-area-columns_pop him-user widget-not-icon-user">
                                      <div className="post-inner member__info community__info">
                                        <div className="author-image author__avatar author-image-70">
                                          <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/">
                                            <span className="author-image-span">
                                              <img
                                                className="avatar avatar-70 rounded-circle photo"
                                                alt="Martin Hope"
                                                title="Martin Hope"
                                                width={70}
                                                height={70}
                                                srcSet="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-70x70.jpg 1x, https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-140x140.jpg 2x"
                                                src="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-70x70.jpg"
                                              />
                                            </span>
                                          </a>
                                        </div>
                                        <div className="user-content">
                                          <div className="user-inner">
                                            <div className="user-data-columns">
                                              <h4 className="member__name mb-1">
                                                <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/">
                                                  Martin Hope
                                                </a>
                                              </h4>
                                              <div className="user-data">
                                                <ul>
                                                  <li className="city-country">
                                                    <i className="icon-location" />
                                                    Damita, Egypt
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        {/* End user-content */}
                                        <div className="user-columns-data">
                                          <ul className="member__stats list-unstyled mb-0 d-flex">
                                            <li className="user-columns-questions stats__item">
                                              <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/questions/">
                                                <i className="icon-book-open" />
                                                <span className="stats__count">
                                                  7
                                                </span>
                                                <span className="stats__text">
                                                  Questions
                                                </span>
                                              </a>
                                            </li>
                                            <li className="user-columns-answers stats__item">
                                              <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/answers/">
                                                <i className="icon-comment" />
                                                <span className="stats__count">
                                                  0
                                                </span>
                                                <span className="stats__text">
                                                  Answers
                                                </span>
                                              </a>
                                            </li>
                                            <li className="user-columns-best-answers stats__item">
                                              <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/best-answers/">
                                                <i className="icon-graduation-cap" />
                                                <span className="stats__count">
                                                  0
                                                </span>
                                                <span className="stats__text">
                                                  Best Answers
                                                </span>
                                              </a>
                                            </li>
                                            <li className="user-columns-points stats__item">
                                              <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/points/">
                                                <i className="icon-bucket" />
                                                <span className="stats__count">
                                                  1k
                                                </span>
                                                <span className="stats__text">
                                                  Points
                                                </span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                        {/* End user-columns-data */}
                                        <div className="user-follow-profile">
                                          <div className="member__actions d-flex justify-content-between">
                                            <a
                                              className="btn btn__semi__height btn__primary"
                                              href="https://2code.info/demo/themes/Discy/Main/profile/martin/"
                                            >
                                              View Profile
                                            </a>
                                          </div>
                                        </div>
                                        {/* End user-follow-profile */}
                                        <div className="clearfix" />
                                      </div>
                                      {/* End post-inner */}
                                    </div>
                                    {/* End post */}
                                  </div>
                                </div>
                                <ul className="question-vote question-mobile">
                                  <li className="question-vote-up">
                                    <a
                                      href="#"
                                      data-id={118}
                                      data-type="question"
                                      data-vote-type="up"
                                      className="wpqa_vote question_vote_up vote_allow"
                                      title="Like"
                                    >
                                      <i className="icon-up-dir" />
                                    </a>
                                  </li>
                                  <li className="vote_result">1k</li>
                                  <li className="li_loader">
                                    <span className="loader_3 fa-spin" />
                                  </li>
                                  <li className="question-vote-down">
                                    <a
                                      href="#"
                                      data-id={118}
                                      data-type="question"
                                      data-vote-type="down"
                                      className="wpqa_vote question_vote_down vote_allow"
                                      title="Dislike"
                                    >
                                      <i className="icon-down-dir" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="question-content question-content-first">
                                <header className="article-header">
                                  <div className="question-header">
                                    <a
                                      className="post-author"
                                      href="profile/martin/index.html"
                                    >
                                      Martin Hope
                                    </a>
                                    <span
                                      className="badge-span"
                                      style={{ backgroundColor: '#d9a34a' }}
                                    >
                                      Enlightened
                                    </span>
                                    <div className="post-meta">
                                      <span className="post-date">
                                        Asked:
                                        <span className="date-separator" />
                                        <a href="question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/index.html">
                                          <span className="entry-date published">
                                            April 19, 2023
                                          </span>
                                        </a>
                                      </span>
                                      <span className="byline">
                                        <span className="post-cat">
                                          In:
                                          <a
                                            href="question-category/language/index.html"
                                            rel="tag"
                                          >
                                            Language
                                          </a>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </header>
                                <div>
                                  <h2 className="post-title">
                                    <a
                                      className="post-title"
                                      href="question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/index.html"
                                      rel="bookmark"
                                    >
                                      Is this statement, “i see him last night”
                                      can be understood as “I saw him last
                                      night”?
                                    </a>
                                  </h2>
                                </div>
                              </div>
                              <div className="question-not-mobile question-image-vote question-vote-sticky">
                                <div className="question-sticky-stop">
                                  <ul className="question-vote">
                                    <li className="question-vote-up">
                                      <a
                                        href="#"
                                        data-id={118}
                                        data-type="question"
                                        data-vote-type="up"
                                        className="wpqa_vote question_vote_up vote_allow"
                                        title="Like"
                                      >
                                        <i className="icon-up-dir" />
                                      </a>
                                    </li>
                                    <li className="vote_result">1k</li>
                                    <li className="li_loader">
                                      <span className="loader_3 fa-spin" />
                                    </li>
                                    <li className="question-vote-down">
                                      <a
                                        href="#"
                                        data-id={118}
                                        data-type="question"
                                        data-vote-type="down"
                                        className="wpqa_vote question_vote_down vote_allow"
                                        title="Dislike"
                                      >
                                        <i className="icon-down-dir" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="question-content question-content-second">
                                <div className="post-wrap-content">
                                  <div className="question-content-text">
                                    <div className="all_not_single_post_content">
                                      <p className="excerpt-question">
                                        In my local language (Bahasa Indonesia)
                                        there are no verb-2 or past tense form
                                        as time tracker. So, I often forget to
                                        use the past form of verb when speaking
                                        english. I saw him last night (correct)
                                        I see him last night ...
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tagcloud">
                                    <div className="question-tags">
                                      <i className="icon-tags" />
                                      <a href="question-tag/english/index.html">
                                        english
                                      </a>
                                      <a href="question-tag/language/index.html">
                                        language
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="wpqa_error" />
                                <div className="wpqa_success" />
                                <footer className="question-footer">
                                  <ul className="footer-meta">
                                    <li className="best-answer-meta">
                                      <a href="question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/index.html#comments">
                                        <i className="icon-comment" />
                                        <span className="question-span">
                                          5 Answers
                                        </span>
                                      </a>
                                    </li>
                                    <li className="view-stats-meta">
                                      <i className="icon-eye" />
                                      26k
                                      <span className="question-span">
                                        Views
                                      </span>
                                    </li>
                                  </ul>
                                  <a
                                    className="meta-answer meta-answer-a"
                                    href="question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/index.html#respond"
                                  >
                                    Answer
                                  </a>
                                </footer>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </article>
                        <article
                          id="post-120"
                          className="article-question article-post question clearfix question-answer-before question-vote-inside question-with-comments answer-question-not-jquery question-vote-image discoura-not-credential question-type-normal post-120 type-question status-publish hentry question-category-language question_tags-english"
                        >
                          <div className="single-inner-content">
                            <div className="question-inner">
                              <div className="question-image-vote">
                                <div className="author-image author__avatar author-image-42 author_image_mouseover">
                                  <a href="profile/ahmed/index.html">
                                    <span className="author-image-span">
                                      <img
                                        className="avatar avatar-42 photo"
                                        alt="Ahmed Hassan"
                                        title="Ahmed Hassan"
                                        width={42}
                                        height={42}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-7-42x42.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-7-84x84.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-7-42x42.jpg"
                                      />
                                    </span>
                                  </a>
                                  <div
                                    className="author-image-pop-2 member-card"
                                    data-user={1}
                                  >
                                    <div className="post-section user-area user-area-columns_pop him-user widget-not-icon-user">
                                      <div className="post-inner member__info community__info">
                                        <div className="author-image author__avatar author-image-70">
                                          <a href="https://2code.info/demo/themes/Discy/Main/profile/ahmed/">
                                            <span className="author-image-span">
                                              <img
                                                className="avatar avatar-70 rounded-circle photo"
                                                alt="Ahmed Hassan"
                                                title="Ahmed Hassan"
                                                width={70}
                                                height={70}
                                                srcSet="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-7-70x70.jpg 1x, https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-7-140x140.jpg 2x"
                                                src="https://2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-7-70x70.jpg"
                                              />
                                            </span>
                                          </a>
                                        </div>
                                        <div className="user-content">
                                          <div className="user-inner">
                                            <div className="user-data-columns">
                                              <h4 className="member__name mb-1">
                                                <a href="https://2code.info/demo/themes/Discy/Main/profile/ahmed/">
                                                  Ahmed Hassan
                                                </a>
                                                <span
                                                  className="verified_user tooltip-n"
                                                  title="Verified"
                                                >
                                                  <i className="icon-check" />
                                                </span>
                                              </h4>
                                              <div className="user-data">
                                                <ul>
                                                  <li className="profile-credential">
                                                    Software Developer at HCL
                                                    Technologies
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        {/* End user-content */}
                                        <div className="user-columns-data">
                                          <ul className="member__stats list-unstyled mb-0 d-flex">
                                            <li className="user-columns-questions stats__item">
                                              <a href="https://2code.info/demo/themes/Discy/Main/profile/ahmed/questions/">
                                                <i className="icon-book-open" />
                                                <span className="stats__count">
                                                  3
                                                </span>
                                                <span className="stats__text">
                                                  Questions
                                                </span>
                                              </a>
                                            </li>
                                            <li className="user-columns-answers stats__item">
                                              <a href="https://2code.info/demo/themes/Discy/Main/profile/ahmed/answers/">
                                                <i className="icon-comment" />
                                                <span className="stats__count">
                                                  9
                                                </span>
                                                <span className="stats__text">
                                                  Answers
                                                </span>
                                              </a>
                                            </li>
                                            <li className="user-columns-best-answers stats__item">
                                              <a href="https://2code.info/demo/themes/Discy/Main/profile/ahmed/best-answers/">
                                                <i className="icon-graduation-cap" />
                                                <span className="stats__count">
                                                  5
                                                </span>
                                                <span className="stats__text">
                                                  Best Answers
                                                </span>
                                              </a>
                                            </li>
                                            <li className="user-columns-points stats__item">
                                              <a href="https://2code.info/demo/themes/Discy/Main/profile/ahmed/points/">
                                                <i className="icon-bucket" />
                                                <span className="stats__count">
                                                  895
                                                </span>
                                                <span className="stats__text">
                                                  Points
                                                </span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                        {/* End user-columns-data */}
                                        <div className="user-follow-profile">
                                          <div className="member__actions d-flex justify-content-between">
                                            <a
                                              className="btn btn__semi__height btn__primary"
                                              href="https://2code.info/demo/themes/Discy/Main/profile/ahmed/"
                                            >
                                              View Profile
                                            </a>
                                          </div>
                                        </div>
                                        {/* End user-follow-profile */}
                                        <div className="clearfix" />
                                      </div>
                                      {/* End post-inner */}
                                    </div>
                                    {/* End post */}
                                  </div>
                                </div>
                                <ul className="question-vote question-mobile">
                                  <li className="question-vote-up">
                                    <a
                                      href="#"
                                      data-id={120}
                                      data-type="question"
                                      data-vote-type="up"
                                      className="wpqa_vote question_vote_up vote_allow"
                                      title="Like"
                                    >
                                      <i className="icon-up-dir" />
                                    </a>
                                  </li>
                                  <li className="vote_result">519</li>
                                  <li className="li_loader">
                                    <span className="loader_3 fa-spin" />
                                  </li>
                                  <li className="question-vote-down">
                                    <a
                                      href="#"
                                      data-id={120}
                                      data-type="question"
                                      data-vote-type="down"
                                      className="wpqa_vote question_vote_down vote_allow"
                                      title="Dislike"
                                    >
                                      <i className="icon-down-dir" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="question-content question-content-first">
                                <header className="article-header">
                                  <div className="question-header">
                                    <a
                                      className="post-author"
                                      href="profile/ahmed/index.html"
                                    >
                                      Ahmed Hassan
                                    </a>
                                    <span
                                      className="verified_user tooltip-n"
                                      original-title="Verified"
                                    >
                                      <i className="icon-check" />
                                    </span>
                                    <span
                                      className="badge-span"
                                      style={{ backgroundColor: '#d9a34a' }}
                                    >
                                      Enlightened
                                    </span>
                                    <div className="post-meta">
                                      <span className="post-date">
                                        Asked:
                                        <span className="date-separator" />
                                        <a href="question/how-do-native-speakers-tell-im-foreign-based-on-my-english-alone/index.html">
                                          <span className="entry-date published">
                                            April 19, 2023
                                          </span>
                                        </a>
                                      </span>
                                      <span className="byline">
                                        <span className="post-cat">
                                          In:
                                          <a
                                            href="question-category/language/index.html"
                                            rel="tag"
                                          >
                                            Language
                                          </a>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </header>
                                <div>
                                  <h2 className="post-title">
                                    <a
                                      className="post-title"
                                      href="question/how-do-native-speakers-tell-im-foreign-based-on-my-english-alone/index.html"
                                      rel="bookmark"
                                    >
                                      How do native speakers tell I’m foreign
                                      based on my English alone?
                                    </a>
                                  </h2>
                                </div>
                              </div>
                              <div className="question-not-mobile question-image-vote question-vote-sticky">
                                <div className="question-sticky-stop">
                                  <ul className="question-vote">
                                    <li className="question-vote-up">
                                      <a
                                        href="#"
                                        data-id={120}
                                        data-type="question"
                                        data-vote-type="up"
                                        className="wpqa_vote question_vote_up vote_allow"
                                        title="Like"
                                      >
                                        <i className="icon-up-dir" />
                                      </a>
                                    </li>
                                    <li className="vote_result">519</li>
                                    <li className="li_loader">
                                      <span className="loader_3 fa-spin" />
                                    </li>
                                    <li className="question-vote-down">
                                      <a
                                        href="#"
                                        data-id={120}
                                        data-type="question"
                                        data-vote-type="down"
                                        className="wpqa_vote question_vote_down vote_allow"
                                        title="Dislike"
                                      >
                                        <i className="icon-down-dir" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="question-content question-content-second">
                                <div className="post-wrap-content">
                                  <div className="question-content-text">
                                    <div className="all_not_single_post_content">
                                      <p className="excerpt-question">
                                        I’m a 19-year-old student from Malaysia.
                                        I’ve been introduced to the language at
                                        a very young age and I’m capable of
                                        conducting any type of conversation.
                                        However, some of my English-speaking
                                        friends on the internet didn’t take too
                                        long to ...
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tagcloud">
                                    <div className="question-tags">
                                      <i className="icon-tags" />
                                      <a href="question-tag/english/index.html">
                                        english
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="wpqa_error" />
                                <div className="wpqa_success" />
                                <footer className="question-footer">
                                  <ul className="footer-meta">
                                    <li className="best-answer-meta">
                                      <a href="question/how-do-native-speakers-tell-im-foreign-based-on-my-english-alone/index.html#comments">
                                        <i className="icon-comment" />
                                        <span className="question-span">
                                          3 Answers
                                        </span>
                                      </a>
                                    </li>
                                    <li className="view-stats-meta">
                                      <i className="icon-eye" />
                                      6k
                                      <span className="question-span">
                                        Views
                                      </span>
                                    </li>
                                  </ul>
                                  <a
                                    className="meta-answer meta-answer-a"
                                    href="question/how-do-native-speakers-tell-im-foreign-based-on-my-english-alone/index.html#respond"
                                  >
                                    Answer
                                  </a>
                                </footer>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </article>
                        <article
                          id="post-119"
                          className="article-question article-post question clearfix question-answer-before question-vote-inside question-with-comments answer-question-not-jquery question-vote-image discoura-not-credential question-type-normal post-119 type-question status-publish hentry question-category-language question_tags-british question_tags-english"
                        >
                          <div className="single-inner-content">
                            <div className="question-inner">
                              <div className="question-image-vote">
                                <div className="author-image author__avatar author-image-42">
                                  <a href="profile/aaron/index.html">
                                    <span className="author-image-span">
                                      <img
                                        className="avatar avatar-42 photo"
                                        alt="Aaron Aiken"
                                        title="Aaron Aiken"
                                        width={42}
                                        height={42}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2023/05/team-1-42x42.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2023/05/team-1-84x84.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2023/05/team-1-42x42.jpg"
                                      />
                                    </span>
                                  </a>
                                  <div
                                    className="author-image-pop-2 member-card"
                                    data-user={7}
                                  >
                                    <div className="author-pop-loader">
                                      <div className="loader_2" />
                                    </div>
                                  </div>
                                </div>
                                <ul className="question-vote question-mobile">
                                  <li className="question-vote-up">
                                    <a
                                      href="#"
                                      data-id={119}
                                      data-type="question"
                                      data-vote-type="up"
                                      className="wpqa_vote question_vote_up vote_allow"
                                      title="Like"
                                    >
                                      <i className="icon-up-dir" />
                                    </a>
                                  </li>
                                  <li className="vote_result">278</li>
                                  <li className="li_loader">
                                    <span className="loader_3 fa-spin" />
                                  </li>
                                  <li className="question-vote-down">
                                    <a
                                      href="#"
                                      data-id={119}
                                      data-type="question"
                                      data-vote-type="down"
                                      className="wpqa_vote question_vote_down vote_allow"
                                      title="Dislike"
                                    >
                                      <i className="icon-down-dir" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="question-content question-content-first">
                                <header className="article-header">
                                  <div className="question-header">
                                    <a
                                      className="post-author"
                                      href="profile/aaron/index.html"
                                    >
                                      Aaron Aiken
                                    </a>
                                    <span
                                      className="badge-span"
                                      style={{ backgroundColor: '#d9a34a' }}
                                    >
                                      Enlightened
                                    </span>
                                    <div className="post-meta">
                                      <span className="post-date">
                                        Asked:
                                        <span className="date-separator" />
                                        <a href="question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/index.html">
                                          <span className="entry-date published">
                                            April 19, 2023
                                          </span>
                                        </a>
                                      </span>
                                      <span className="byline">
                                        <span className="post-cat">
                                          In:
                                          <a
                                            href="question-category/language/index.html"
                                            rel="tag"
                                          >
                                            Language
                                          </a>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </header>
                                <div>
                                  <h2 className="post-title">
                                    <a
                                      className="post-title"
                                      href="question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/index.html"
                                      rel="bookmark"
                                    >
                                      Why are the British confused about us
                                      calling bread rolls “biscuits” when they
                                      call bread rolls “puddings”?
                                    </a>
                                  </h2>
                                </div>
                              </div>
                              <div className="question-not-mobile question-image-vote question-vote-sticky">
                                <div className="question-sticky-stop">
                                  <ul className="question-vote">
                                    <li className="question-vote-up">
                                      <a
                                        href="#"
                                        data-id={119}
                                        data-type="question"
                                        data-vote-type="up"
                                        className="wpqa_vote question_vote_up vote_allow"
                                        title="Like"
                                      >
                                        <i className="icon-up-dir" />
                                      </a>
                                    </li>
                                    <li className="vote_result">278</li>
                                    <li className="li_loader">
                                      <span className="loader_3 fa-spin" />
                                    </li>
                                    <li className="question-vote-down">
                                      <a
                                        href="#"
                                        data-id={119}
                                        data-type="question"
                                        data-vote-type="down"
                                        className="wpqa_vote question_vote_down vote_allow"
                                        title="Dislike"
                                      >
                                        <i className="icon-down-dir" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="question-content question-content-second">
                                <div className="post-wrap-content">
                                  <div className="question-content-text">
                                    <div className="all_not_single_post_content">
                                      <p className="excerpt-question">
                                        (Why I darest say, they darest not get
                                        offended when they so indeed have
                                        examples that violate their own use and
                                        nomenclature!) IE: pudding as a specific
                                        dessert, puddings as a general term for
                                        desserts. Calling something a Yorkshire
                                        pudding ...
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tagcloud">
                                    <div className="question-tags">
                                      <i className="icon-tags" />
                                      <a href="question-tag/british/index.html">
                                        british
                                      </a>
                                      <a href="question-tag/english/index.html">
                                        english
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="wpqa_error" />
                                <div className="wpqa_success" />
                                <footer className="question-footer">
                                  <ul className="footer-meta">
                                    <li className="best-answer-meta meta-best-answer">
                                      <a href="question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/index.html#comments">
                                        <i className="icon-comment" />
                                        <span className="question-span">
                                          5 Answers
                                        </span>
                                      </a>
                                    </li>
                                    <li className="view-stats-meta">
                                      <i className="icon-eye" />
                                      5k
                                      <span className="question-span">
                                        Views
                                      </span>
                                    </li>
                                  </ul>
                                  <a
                                    className="meta-answer meta-answer-a"
                                    href="question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/index.html#respond"
                                  >
                                    Answer
                                  </a>
                                </footer>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </article>
                        <article
                          id="post-117"
                          className="article-question article-post question clearfix question-answer-before question-vote-inside question-with-comments answer-question-not-jquery question-vote-image discoura-not-credential question-type-normal post-117 type-question status-publish hentry question-category-analytics question_tags-analytics question_tags-google"
                        >
                          <div className="single-inner-content">
                            <div className="question-inner">
                              <div className="question-image-vote">
                                <div className="author-image author__avatar author-image-42">
                                  <a href="profile/marko/index.html">
                                    <span className="author-image-span">
                                      <img
                                        className="avatar avatar-42 photo"
                                        alt="Marko Smith"
                                        title="Marko Smith"
                                        width={42}
                                        height={42}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-42x42.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-84x84.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-42x42.jpg"
                                      />
                                    </span>
                                  </a>
                                  <div
                                    className="author-image-pop-2 member-card"
                                    data-user={5}
                                  >
                                    <div className="author-pop-loader">
                                      <div className="loader_2" />
                                    </div>
                                  </div>
                                </div>
                                <ul className="question-vote question-mobile">
                                  <li className="question-vote-up">
                                    <a
                                      href="#"
                                      data-id={117}
                                      data-type="question"
                                      data-vote-type="up"
                                      className="wpqa_vote question_vote_up vote_allow"
                                      title="Like"
                                    >
                                      <i className="icon-up-dir" />
                                    </a>
                                  </li>
                                  <li className="vote_result">107</li>
                                  <li className="li_loader">
                                    <span className="loader_3 fa-spin" />
                                  </li>
                                  <li className="question-vote-down">
                                    <a
                                      href="#"
                                      data-id={117}
                                      data-type="question"
                                      data-vote-type="down"
                                      className="wpqa_vote question_vote_down vote_allow"
                                      title="Dislike"
                                    >
                                      <i className="icon-down-dir" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="question-content question-content-first">
                                <header className="article-header">
                                  <div className="question-header">
                                    <a
                                      className="post-author"
                                      href="profile/marko/index.html"
                                    >
                                      Marko Smith
                                    </a>
                                    <span
                                      className="badge-span"
                                      style={{ backgroundColor: '#d9a34a' }}
                                    >
                                      Enlightened
                                    </span>
                                    <div className="post-meta">
                                      <span className="post-date">
                                        Asked:
                                        <span className="date-separator" />
                                        <a href="question/google-analytics-reads-like-a-seismic-chart-lately/index.html">
                                          <span className="entry-date published">
                                            April 19, 2023
                                          </span>
                                        </a>
                                      </span>
                                      <span className="byline">
                                        <span className="post-cat">
                                          In:
                                          <a
                                            href="question-category/analytics/index.html"
                                            rel="tag"
                                          >
                                            Analytics
                                          </a>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </header>
                                <div>
                                  <h2 className="post-title">
                                    <a
                                      className="post-title"
                                      href="question/google-analytics-reads-like-a-seismic-chart-lately/index.html"
                                      rel="bookmark"
                                    >
                                      Google Analytics reads like a seismic
                                      chart lately
                                    </a>
                                  </h2>
                                </div>
                              </div>
                              <div className="question-not-mobile question-image-vote question-vote-sticky">
                                <div className="question-sticky-stop">
                                  <ul className="question-vote">
                                    <li className="question-vote-up">
                                      <a
                                        href="#"
                                        data-id={117}
                                        data-type="question"
                                        data-vote-type="up"
                                        className="wpqa_vote question_vote_up vote_allow"
                                        title="Like"
                                      >
                                        <i className="icon-up-dir" />
                                      </a>
                                    </li>
                                    <li className="vote_result">107</li>
                                    <li className="li_loader">
                                      <span className="loader_3 fa-spin" />
                                    </li>
                                    <li className="question-vote-down">
                                      <a
                                        href="#"
                                        data-id={117}
                                        data-type="question"
                                        data-vote-type="down"
                                        className="wpqa_vote question_vote_down vote_allow"
                                        title="Dislike"
                                      >
                                        <i className="icon-down-dir" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="question-content question-content-second">
                                <div className="post-wrap-content">
                                  <div className="question-content-text">
                                    <div className="all_not_single_post_content">
                                      <p className="excerpt-question">
                                        Anyone else seeing dramatic ranking
                                        shakeups lately? Thankfully, this client
                                        is the blue line, but that’s a serious
                                        drop and recovery. We don’t operate at
                                        all in the black hat world, so our links
                                        and content should be in good shape. ...
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tagcloud">
                                    <div className="question-tags">
                                      <i className="icon-tags" />
                                      <a href="question-tag/analytics/index.html">
                                        analytics
                                      </a>
                                      <a href="question-tag/google/index.html">
                                        google
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="wpqa_error" />
                                <div className="wpqa_success" />
                                <footer className="question-footer">
                                  <ul className="footer-meta">
                                    <li className="best-answer-meta">
                                      <a href="question/google-analytics-reads-like-a-seismic-chart-lately/index.html#comments">
                                        <i className="icon-comment" />
                                        <span className="question-span">
                                          2 Answers
                                        </span>
                                      </a>
                                    </li>
                                    <li className="view-stats-meta">
                                      <i className="icon-eye" />
                                      2k
                                      <span className="question-span">
                                        Views
                                      </span>
                                    </li>
                                  </ul>
                                  <a
                                    className="meta-answer meta-answer-a"
                                    href="question/google-analytics-reads-like-a-seismic-chart-lately/index.html#respond"
                                  >
                                    Answer
                                  </a>
                                </footer>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </article>
                        <article
                          id="post-116"
                          className="article-question article-post question clearfix question-answer-before question-vote-inside question-no-comments answer-question-not-jquery question-vote-image discoura-not-credential question-type-normal post-116 type-question status-publish hentry question-category-analytics question_tags-analytics question_tags-google"
                        >
                          <div className="single-inner-content">
                            <div className="question-inner">
                              <div className="question-image-vote">
                                <div className="author-image author__avatar author-image-42">
                                  <a href="profile/james/index.html">
                                    <span className="author-image-span">
                                      <img
                                        className="avatar avatar-42 photo"
                                        alt="James Wane"
                                        title="James Wane"
                                        width={42}
                                        height={42}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-6-42x42.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-6-84x84.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-6-42x42.jpg"
                                      />
                                    </span>
                                  </a>
                                  <div
                                    className="author-image-pop-2 member-card"
                                    data-user={4}
                                  >
                                    <div className="author-pop-loader">
                                      <div className="loader_2" />
                                    </div>
                                  </div>
                                </div>
                                <ul className="question-vote question-mobile">
                                  <li className="question-vote-up">
                                    <a
                                      href="#"
                                      data-id={116}
                                      data-type="question"
                                      data-vote-type="up"
                                      className="wpqa_vote question_vote_up vote_allow"
                                      title="Like"
                                    >
                                      <i className="icon-up-dir" />
                                    </a>
                                  </li>
                                  <li className="vote_result">124</li>
                                  <li className="li_loader">
                                    <span className="loader_3 fa-spin" />
                                  </li>
                                  <li className="question-vote-down">
                                    <a
                                      href="#"
                                      data-id={116}
                                      data-type="question"
                                      data-vote-type="down"
                                      className="wpqa_vote question_vote_down vote_allow"
                                      title="Dislike"
                                    >
                                      <i className="icon-down-dir" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="question-content question-content-first">
                                <header className="article-header">
                                  <div className="question-header">
                                    <a
                                      className="post-author"
                                      href="profile/james/index.html"
                                    >
                                      James Wane
                                    </a>
                                    <span
                                      className="badge-span"
                                      style={{ backgroundColor: '#d9a34a' }}
                                    >
                                      Enlightened
                                    </span>
                                    <div className="post-meta">
                                      <span className="post-date">
                                        Asked:
                                        <span className="date-separator" />
                                        <a href="question/what-are-your-thoughts-on-google-analytics-vs-other-analytics-platforms/index.html">
                                          <span className="entry-date published">
                                            April 19, 2023
                                          </span>
                                        </a>
                                      </span>
                                      <span className="byline">
                                        <span className="post-cat">
                                          In:
                                          <a
                                            href="question-category/analytics/index.html"
                                            rel="tag"
                                          >
                                            Analytics
                                          </a>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </header>
                                <div>
                                  <h2 className="post-title">
                                    <a
                                      className="post-title"
                                      href="question/what-are-your-thoughts-on-google-analytics-vs-other-analytics-platforms/index.html"
                                      rel="bookmark"
                                    >
                                      What are your thoughts on Google Analytics
                                      vs other analytics platforms?
                                    </a>
                                  </h2>
                                </div>
                              </div>
                              <div className="question-not-mobile question-image-vote question-vote-sticky">
                                <div className="question-sticky-stop">
                                  <ul className="question-vote">
                                    <li className="question-vote-up">
                                      <a
                                        href="#"
                                        data-id={116}
                                        data-type="question"
                                        data-vote-type="up"
                                        className="wpqa_vote question_vote_up vote_allow"
                                        title="Like"
                                      >
                                        <i className="icon-up-dir" />
                                      </a>
                                    </li>
                                    <li className="vote_result">124</li>
                                    <li className="li_loader">
                                      <span className="loader_3 fa-spin" />
                                    </li>
                                    <li className="question-vote-down">
                                      <a
                                        href="#"
                                        data-id={116}
                                        data-type="question"
                                        data-vote-type="down"
                                        className="wpqa_vote question_vote_down vote_allow"
                                        title="Dislike"
                                      >
                                        <i className="icon-down-dir" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="question-content question-content-second">
                                <div className="post-wrap-content">
                                  <div className="question-content-text">
                                    <div className="all_not_single_post_content">
                                      <p className="excerpt-question">
                                        Recently heard about Heap which seems
                                        pretty cool, but I’m not sure if it
                                        would really be valuable, or simply
                                        another tool that I need to check. We
                                        are not at the point of using
                                        HubSpot/Marketo yet so Heap’s free ...
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tagcloud">
                                    <div className="question-tags">
                                      <i className="icon-tags" />
                                      <a href="question-tag/analytics/index.html">
                                        analytics
                                      </a>
                                      <a href="question-tag/google/index.html">
                                        google
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="wpqa_error" />
                                <div className="wpqa_success" />
                                <footer className="question-footer">
                                  <ul className="footer-meta">
                                    <li className="best-answer-meta">
                                      <a href="question/what-are-your-thoughts-on-google-analytics-vs-other-analytics-platforms/index.html#comments">
                                        <i className="icon-comment" />
                                        <span className="question-span">
                                          0 Answers
                                        </span>
                                      </a>
                                    </li>
                                    <li className="view-stats-meta">
                                      <i className="icon-eye" />
                                      2k
                                      <span className="question-span">
                                        Views
                                      </span>
                                    </li>
                                  </ul>
                                  <a
                                    className="meta-answer meta-answer-a"
                                    href="question/what-are-your-thoughts-on-google-analytics-vs-other-analytics-platforms/index.html#respond"
                                  >
                                    Answer
                                  </a>
                                </footer>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </article>
                        <article
                          id="post-115"
                          className="article-question article-post question clearfix question-answer-before question-vote-inside question-with-comments answer-question-not-jquery question-vote-image discoura-not-credential question-type-normal post-115 type-question status-publish hentry question-category-company question_tags-company question_tags-interview"
                        >
                          <div className="single-inner-content">
                            <div className="question-inner">
                              <div className="question-image-vote">
                                <div className="author-image author__avatar author-image-42">
                                  <a href="profile/barry/index.html">
                                    <span className="author-image-span">
                                      <img
                                        className="avatar avatar-42 photo"
                                        alt="Barry Carter"
                                        title="Barry Carter"
                                        width={42}
                                        height={42}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2023/12/team-8-42x42.jpeg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2023/12/team-8-84x84.jpeg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2023/12/team-8-42x42.jpg"
                                      />
                                    </span>
                                  </a>
                                  <div
                                    className="author-image-pop-2 member-card"
                                    data-user={3}
                                  >
                                    <div className="author-pop-loader">
                                      <div className="loader_2" />
                                    </div>
                                  </div>
                                </div>
                                <ul className="question-vote question-mobile">
                                  <li className="question-vote-up">
                                    <a
                                      href="#"
                                      data-id={115}
                                      data-type="question"
                                      data-vote-type="up"
                                      className="wpqa_vote question_vote_up vote_allow"
                                      title="Like"
                                    >
                                      <i className="icon-up-dir" />
                                    </a>
                                  </li>
                                  <li className="vote_result">58</li>
                                  <li className="li_loader">
                                    <span className="loader_3 fa-spin" />
                                  </li>
                                  <li className="question-vote-down">
                                    <a
                                      href="#"
                                      data-id={115}
                                      data-type="question"
                                      data-vote-type="down"
                                      className="wpqa_vote question_vote_down vote_allow"
                                      title="Dislike"
                                    >
                                      <i className="icon-down-dir" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="question-content question-content-first">
                                <header className="article-header">
                                  <div className="question-header">
                                    <a
                                      className="post-author"
                                      href="profile/barry/index.html"
                                    >
                                      Barry Carter
                                    </a>
                                    <span
                                      className="badge-span"
                                      style={{ backgroundColor: '#30a96f' }}
                                    >
                                      Explainer
                                    </span>
                                    <div className="post-meta">
                                      <span className="post-date">
                                        Asked:
                                        <span className="date-separator" />
                                        <a href="question/what-is-a-nice-way-to-end-an-interview-that-is-clearly-going-badly/index.html">
                                          <span className="entry-date published">
                                            April 19, 2023
                                          </span>
                                        </a>
                                      </span>
                                      <span className="byline">
                                        <span className="post-cat">
                                          In:
                                          <a
                                            href="question-category/company/index.html"
                                            rel="tag"
                                          >
                                            Company
                                          </a>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </header>
                                <div>
                                  <h2 className="post-title">
                                    <a
                                      className="post-title"
                                      href="question/what-is-a-nice-way-to-end-an-interview-that-is-clearly-going-badly/index.html"
                                      rel="bookmark"
                                    >
                                      What is a nice way to end an interview
                                      that is clearly going badly?
                                    </a>
                                  </h2>
                                </div>
                              </div>
                              <div className="question-not-mobile question-image-vote question-vote-sticky">
                                <div className="question-sticky-stop">
                                  <ul className="question-vote">
                                    <li className="question-vote-up">
                                      <a
                                        href="#"
                                        data-id={115}
                                        data-type="question"
                                        data-vote-type="up"
                                        className="wpqa_vote question_vote_up vote_allow"
                                        title="Like"
                                      >
                                        <i className="icon-up-dir" />
                                      </a>
                                    </li>
                                    <li className="vote_result">58</li>
                                    <li className="li_loader">
                                      <span className="loader_3 fa-spin" />
                                    </li>
                                    <li className="question-vote-down">
                                      <a
                                        href="#"
                                        data-id={115}
                                        data-type="question"
                                        data-vote-type="down"
                                        className="wpqa_vote question_vote_down vote_allow"
                                        title="Dislike"
                                      >
                                        <i className="icon-down-dir" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="question-content question-content-second">
                                <div className="post-wrap-content">
                                  <div className="question-content-text">
                                    <div className="all_not_single_post_content">
                                      <p className="excerpt-question">
                                        As an interviewer, I occasionally
                                        conduct interviews that become painful
                                        as time goes on because the candidate is
                                        doing so poorly. I have the impression
                                        that, in these cases, the candidate
                                        internally knows they are not getting
                                        the job, and ...
                                      </p>
                                    </div>
                                  </div>
                                  <div className="tagcloud">
                                    <div className="question-tags">
                                      <i className="icon-tags" />
                                      <a href="question-tag/company/index.html">
                                        company
                                      </a>
                                      <a href="question-tag/interview/index.html">
                                        interview
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="wpqa_error" />
                                <div className="wpqa_success" />
                                <footer className="question-footer">
                                  <ul className="footer-meta">
                                    <li className="best-answer-meta meta-best-answer">
                                      <a href="question/what-is-a-nice-way-to-end-an-interview-that-is-clearly-going-badly/index.html#comments">
                                        <i className="icon-comment" />
                                        <span className="question-span">
                                          3 Answers
                                        </span>
                                      </a>
                                    </li>
                                    <li className="view-stats-meta">
                                      <i className="icon-eye" />
                                      1k
                                      <span className="question-span">
                                        Views
                                      </span>
                                    </li>
                                  </ul>
                                  <a
                                    className="meta-answer meta-answer-a"
                                    href="question/what-is-a-nice-way-to-end-an-interview-that-is-clearly-going-badly/index.html#respond"
                                  >
                                    Answer
                                  </a>
                                </footer>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </article>
                      </div>
                      <div className="clearfix" />
                      <div className="pagination-wrap pagination-question">
                        <div className="pagination-nav posts-load-more">
                          <span className="load_span">
                            <span className="loader_2" />
                          </span>
                          <div className="load-more">
                            <a href="page/2/index.html">Load More Questions</a>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}
              <div className="hide-main-inner" />
              <div className="hide-sidebar sidebar-width">
                <div className="hide-sidebar-inner" />
              </div>
              <aside
                className="sidebar sidebar-width float_l fixed-sidebar"
                style={{
                  position: 'relative',
                  overflow: 'visible',
                  boxSizing: 'border-box',
                  minHeight: '1px',
                }}
              >
                <div
                  className="theiaStickySidebar"
                  style={{
                    paddingTop: '0px',
                    paddingBottom: '1px',
                    position: 'static',
                    top: '10px',
                    left: '1121.71px',
                  }}
                >
                  <h3 className="screen-reader-text">Sidebar</h3>
                  <div className="inner-sidebar">
                    <div className="widget card widget_ask">
                      <a
                        target="_self"
                        href="/"
                        className="button-default btn btn__primary btn__block btn__semi__height wpqa-question"
                        onClick={handleAskQuestionClick}
                      >
                        Ask A Question
                      </a>
                    </div>
                    <section
                      id="stats-widget-2"
                      className="widget-no-divider widget stats-widget"
                    >
                      <h3 className="screen-reader-text">Stats</h3>
                      <div className="widget-wrap stats-card">
                        <ul className="stats-inner list-unstyled mb-0">
                          <li className="stats-card__item stats-questions">
                            <div className="d-flex justify-content-between stats-card__item_div">
                              <span className="stats-text">Questions</span>
                              <span className="stats-value" />
                            </div>
                          </li>
                          <li className="stats-card__item stats-answers">
                            <div className="d-flex justify-content-between stats-card__item_div">
                              <span className="stats-text"> Answers </span>
                              <span className="stats-value">71 </span>
                            </div>
                          </li>
                          <li className="stats-card__item stats-best_answers">
                            <div className="d-flex justify-content-between stats-card__item_div">
                              <span className="stats-text">Best Answers</span>
                              <span className="stats-value"> 15 </span>
                            </div>
                          </li>
                          <li className="stats-card__item stats-users">
                            <div className="d-flex justify-content-between stats-card__item_div">
                              <span className="stats-text"> Users </span>
                              <span className="stats-value"> 110 </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </section>
                    <div className="widget card tabs-wrap widget-tabs">
                      <div className="widget-title widget-title-tabs">
                        <ul className="tabs tabstabs-widget-2">
                          <li className="tab current">
                            <a href="#">Popular</a>
                          </li>
                          <li className="tab">
                            <a href="#">Answers</a>
                          </li>
                        </ul>
                        <div className="clearfix" />
                      </div>
                      <div className="widget-wrap">
                        <div
                          className="widget-posts tab-inner-wrap tab-inner-wraptabs-widget-2 active-tab"
                          style={{}}
                        >
                          <div className="user-notifications user-profile-area questions-card">
                            <div>
                              <ul>
                                <li className="notifications__item question-item list-item-type-question d-flex widget-posts-text widget-no-img">
                                  <span className="span-icon author__avatar">
                                    <a href="profile/marko/index.html">
                                      <img
                                        className="avatar avatar-20 rounded-circle photo"
                                        alt="Marko Smith"
                                        title="Marko Smith"
                                        width={20}
                                        height={20}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-20x20.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-40x40.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-20x20.jpg"
                                      />
                                    </a>
                                  </span>
                                  <div>
                                    <h3 className="question__title">
                                      <a
                                        className="color-dark"
                                        href="question/how-to-approach-applying-for-a-job-at-a-company-owned-by-a-friend/index.html"
                                        title="How to approach applying for a job at a company owned by a friend?"
                                        rel="bookmark"
                                      >
                                        <i className="icon-ios-paper-outline wpqa_hide" />
                                        How How How to approach applying for a
                                        job at a company ...
                                      </a>
                                    </h3>
                                    <ul className="widget-post-meta question-item__meta list-unstyled mb-0 d-flex align-items-center">
                                      <li>
                                        <a
                                          className="post-meta-comment"
                                          href="question/how-to-approach-applying-for-a-job-at-a-company-owned-by-a-friend/index.html#comments"
                                        >
                                          <i className="icon-comment" />7
                                          Answers
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li className="notifications__item question-item list-item-type-question d-flex widget-posts-text widget-no-img">
                                  <span className="span-icon author__avatar">
                                    <a href="profile/james/index.html">
                                      <img
                                        className="avatar avatar-20 rounded-circle photo"
                                        alt="James Wane"
                                        title="James Wane"
                                        width={20}
                                        height={20}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-6-20x20.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-6-40x40.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-6-20x20.jpg"
                                      />
                                    </a>
                                  </span>
                                  <div>
                                    <h3 className="question__title">
                                      <a
                                        className="color-dark"
                                        href="question/how-to-handle-personal-stress-caused-by-utterly-incompetent-and-lazy-co-workers/index.html"
                                        title="How to handle personal stress caused by utterly incompetent and lazy co-workers?"
                                        rel="bookmark"
                                      >
                                        <i className="icon-ios-paper-outline wpqa_hide" />
                                        How How How to handle personal stress
                                        caused by utterly incompetent and ...
                                      </a>
                                    </h3>
                                    <ul className="widget-post-meta question-item__meta list-unstyled mb-0 d-flex align-items-center">
                                      <li>
                                        <a
                                          className="post-meta-comment"
                                          href="question/how-to-handle-personal-stress-caused-by-utterly-incompetent-and-lazy-co-workers/index.html#comments"
                                        >
                                          <i className="icon-comment" />5
                                          Answers
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li className="notifications__item question-item list-item-type-question d-flex widget-posts-text widget-no-img">
                                  <span className="span-icon author__avatar">
                                    <a href="profile/marko/index.html">
                                      <img
                                        className="avatar avatar-20 rounded-circle photo"
                                        alt="Marko Smith"
                                        title="Marko Smith"
                                        width={20}
                                        height={20}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-20x20.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-40x40.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-20x20.jpg"
                                      />
                                    </a>
                                  </span>
                                  <div>
                                    <h3 className="question__title">
                                      <a
                                        className="color-dark"
                                        href="question/what-is-a-programmers-life-like/index.html"
                                        title="What is a programmer’s life like?"
                                        rel="bookmark"
                                      >
                                        <i className="icon-ios-paper-outline wpqa_hide" />
                                        What What What is a programmer’s life
                                        like?
                                      </a>
                                    </h3>
                                    <ul className="widget-post-meta question-item__meta list-unstyled mb-0 d-flex align-items-center">
                                      <li>
                                        <a
                                          className="post-meta-comment"
                                          href="question/what-is-a-programmers-life-like/index.html#comments"
                                        >
                                          <i className="icon-comment" />5
                                          Answers
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-inner-wrap tab-inner-wraptabs-widget-2"
                          style={{ display: 'none' }}
                        >
                          <div className="user-notifications user-profile-area">
                            <div>
                              <ul>
                                <li className="notifications__item d-flex">
                                  <span className="span-icon author__avatar">
                                    <a href="profile/martin/index.html">
                                      <img
                                        className="avatar avatar-25 rounded-circle photo"
                                        alt="Martin Hope"
                                        title="Martin Hope"
                                        width={25}
                                        height={25}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-25x25.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-50x50.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-25x25.jpg"
                                      />
                                    </a>
                                  </span>
                                  <div className="notification__body">
                                    <a
                                      className="author__name"
                                      href="profile/martin/index.html"
                                    >
                                      Martin Hope
                                    </a>
                                    added an answer
                                    <span className="question-title">
                                      <a
                                        className="notification__question notification__question-dark"
                                        href="question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/index.html#comment-72"
                                      >
                                        They might be as confused as to why you
                                        keep…
                                      </a>
                                    </span>
                                    <span className="notifications-date notification__date d-block mt-2">
                                      April 19, 2023 at 2:07 am
                                    </span>
                                  </div>
                                </li>
                                <li className="notifications__item d-flex">
                                  <span className="span-icon author__avatar">
                                    <a href="profile/marko/index.html">
                                      <img
                                        className="avatar avatar-25 rounded-circle photo"
                                        alt="Marko Smith"
                                        title="Marko Smith"
                                        width={25}
                                        height={25}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-25x25.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-50x50.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-25x25.jpg"
                                      />
                                    </a>
                                  </span>
                                  <div className="notification__body">
                                    <a
                                      className="author__name"
                                      href="profile/marko/index.html"
                                    >
                                      Marko Smith
                                    </a>
                                    added an answer
                                    <span className="question-title">
                                      <a
                                        className="notification__question notification__question-dark"
                                        href="question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/index.html#comment-71"
                                      >
                                        I have never heard a British person EVER
                                        call a…
                                      </a>
                                    </span>
                                    <span className="notifications-date notification__date d-block mt-2">
                                      April 19, 2023 at 2:07 am
                                    </span>
                                  </div>
                                </li>
                                <li className="notifications__item d-flex">
                                  <span className="span-icon author__avatar">
                                    <a href="profile/barry/index.html">
                                      <img
                                        className="avatar avatar-25 rounded-circle photo"
                                        alt="Barry Carter"
                                        title="Barry Carter"
                                        width={25}
                                        height={25}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2023/12/team-8-25x25.jpeg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2023/12/team-8-50x50.jpeg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2023/12/team-8-25x25.jpg"
                                      />
                                    </a>
                                  </span>
                                  <div className="notification__body">
                                    <a
                                      className="author__name"
                                      href="profile/barry/index.html"
                                    >
                                      Barry Carter
                                    </a>
                                    added an answer
                                    <span className="question-title">
                                      <a
                                        className="notification__question notification__question-dark"
                                        href="question/why-are-the-british-confused-about-us-calling-bread-rolls-biscuits-when-they-call-bread-rolls-puddings/index.html#comment-70"
                                      >
                                        Calling a bread roll a “biscuit” really
                                        takes the biscuit.…
                                      </a>
                                    </span>
                                    <span className="notifications-date notification__date d-block mt-2">
                                      April 19, 2023 at 2:07 am
                                    </span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <section
                      id="users-widget-2"
                      className="widget users-widget"
                    >
                      <h2 className="widget-title">
                        <i className="icon-folder" />
                        Top Members
                      </h2>
                      <div className="widget-wrap">
                        <div className="user-section user-section-small row row-warp row-boot user-not-normal">
                          <div className="col col12 col-boot-12">
                            <div className="post-section user-area user-area-small community-card community-card-layout3 d-flex flex-wrap justify-content-between him-user widget-not-icon-user">
                              <div className="post-inner member__info community__info">
                                <div className="author-image author__avatar author-image-42">
                                  <a href="profile/martin/index.html">
                                    <span className="author-image-span">
                                      <img
                                        className="avatar avatar-42 rounded-circle photo"
                                        alt="Martin Hope"
                                        title="Martin Hope"
                                        width={42}
                                        height={42}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-84x84.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-2-42x42.jpg"
                                      />
                                    </span>
                                  </a>
                                </div>
                                <div className="user-content">
                                  <div className="user-inner">
                                    <h4 className="member__name mb-1">
                                      <a href="profile/martin/index.html">
                                        Martin Hope
                                      </a>
                                    </h4>
                                    <div className="user-data">
                                      <ul className="member__stats list-unstyled mb-0 d-flex">
                                        <li className="user-questions stats__item community__count">
                                          <a href="profile/martin/questions/index.html">
                                            <span className="stats__count">
                                              7
                                            </span>
                                            <span className="stats__text">
                                              Questions
                                            </span>
                                          </a>
                                        </li>
                                        <li className="user-points stats__item community__count">
                                          <a href="profile/martin/points/index.html">
                                            <span className="stats__count">
                                              1k
                                            </span>
                                            <span className="stats__text">
                                              Points
                                            </span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <span
                                      className="badge-span"
                                      style={{ backgroundColor: '#d9a34a' }}
                                    >
                                      Enlightened
                                    </span>
                                  </div>
                                </div>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="col col12 col-boot-12">
                            <div className="post-section user-area user-area-small community-card community-card-layout3 d-flex flex-wrap justify-content-between him-user widget-not-icon-user">
                              <div className="post-inner member__info community__info">
                                <div className="author-image author__avatar author-image-42">
                                  <a href="profile/ahmed/index.html">
                                    <span className="author-image-span">
                                      <img
                                        className="avatar avatar-42 rounded-circle photo"
                                        alt="Ahmed Hassan"
                                        title="Ahmed Hassan"
                                        width={42}
                                        height={42}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-7-42x42.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-7-84x84.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-7-42x42.jpg"
                                      />
                                    </span>
                                  </a>
                                </div>
                                <div className="user-content">
                                  <div className="user-inner">
                                    <h4 className="member__name mb-1">
                                      <a href="profile/ahmed/index.html">
                                        Ahmed Ahmed Ahmed Hassan
                                      </a>
                                      <span
                                        className="verified_user tooltip-n"
                                        original-title="Verified"
                                      >
                                        <i className="icon-check" />
                                      </span>
                                    </h4>
                                    <div className="user-data">
                                      <ul className="member__stats list-unstyled mb-0 d-flex">
                                        <li className="user-questions stats__item community__count">
                                          <a href="profile/ahmed/questions/index.html">
                                            <span className="stats__count">
                                              3
                                            </span>
                                            <span className="stats__text">
                                              Questions
                                            </span>
                                          </a>
                                        </li>
                                        <li className="user-points stats__item community__count">
                                          <a href="profile/ahmed/points/index.html">
                                            <span className="stats__count">
                                              882
                                            </span>
                                            <span className="stats__text">
                                              Points
                                            </span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <span
                                      className="badge-span"
                                      style={{ backgroundColor: '#d9a34a' }}
                                    >
                                      Enlightened
                                    </span>
                                  </div>
                                </div>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                          <div className="col col12 col-boot-12">
                            <div className="post-section user-area user-area-small community-card community-card-layout3 d-flex flex-wrap justify-content-between him-user widget-not-icon-user">
                              <div className="post-inner member__info community__info">
                                <div className="author-image author__avatar author-image-42">
                                  <a href="profile/marko/index.html">
                                    <span className="author-image-span">
                                      <img
                                        className="avatar avatar-42 rounded-circle photo"
                                        alt="Marko Smith"
                                        title="Marko Smith"
                                        width={42}
                                        height={42}
                                        srcSet="https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-42x42.jpg 1x, https://cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-84x84.jpg 2x"
                                        src="../../../../../cdn.2code.info/demo/themes/Discy/Main/wp-content/uploads/2018/04/team-4-42x42.jpg"
                                      />
                                    </span>
                                  </a>
                                </div>
                                <div className="user-content">
                                  <div className="user-inner">
                                    <h4 className="member__name mb-1">
                                      <a href="profile/marko/index.html">
                                        Marko Smith
                                      </a>
                                    </h4>
                                    <div className="user-data">
                                      <ul className="member__stats list-unstyled mb-0 d-flex">
                                        <li className="user-questions stats__item community__count">
                                          <a href="profile/marko/questions/index.html">
                                            <span className="stats__count">
                                              5
                                            </span>
                                            <span className="stats__text">
                                              Questions
                                            </span>
                                          </a>
                                        </li>
                                        <li className="user-points stats__item community__count">
                                          <a href="profile/marko/points/index.html">
                                            <span className="stats__count">
                                              545
                                            </span>
                                            <span className="stats__text">
                                              Points
                                            </span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <span
                                      className="badge-span"
                                      style={{ backgroundColor: '#d9a34a' }}
                                    >
                                      Enlightened
                                    </span>
                                  </div>
                                </div>
                                <div className="clearfix" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section
                      id="tag_cloud-2"
                      className="widget widget_tag_cloud"
                    >
                      <h2 className="widget-title">
                        <i className="icon-folder" />
                        Trending Tags
                      </h2>
                      <div className="tagcloud">
                        <a
                          href="question-tag/analytics/index.html"
                          className="tag-cloud-link tag-link-11 tag-link-position-1"
                          style={{ fontSize: '22pt' }}
                          aria-label="analytics (3 items)"
                        >
                          analytics
                        </a>
                        <a
                          href="question-tag/british/index.html"
                          className="tag-cloud-link tag-link-37 tag-link-position-2"
                          style={{ fontSize: '8pt' }}
                          aria-label="british (1 item)"
                        >
                          british
                        </a>
                        <a
                          href="question-tag/company/index.html"
                          className="tag-cloud-link tag-link-32 tag-link-position-3"
                          style={{ fontSize: '16.4pt' }}
                          aria-label="company (2 items)"
                        >
                          company
                        </a>
                        <a
                          href="question-tag/computer/index.html"
                          className="tag-cloud-link tag-link-28 tag-link-position-4"
                          style={{ fontSize: '8pt' }}
                          aria-label="computer (1 item)"
                        >
                          computer
                        </a>
                        <a
                          href="question-tag/developers/index.html"
                          className="tag-cloud-link tag-link-16 tag-link-position-5"
                          style={{ fontSize: '8pt' }}
                          aria-label="developers (1 item)"
                        >
                          developers
                        </a>
                        <a
                          href="question-tag/django/index.html"
                          className="tag-cloud-link tag-link-26 tag-link-position-6"
                          style={{ fontSize: '8pt' }}
                          aria-label="django (1 item)"
                        >
                          django
                        </a>
                        <a
                          href="question-tag/employee/index.html"
                          className="tag-cloud-link tag-link-30 tag-link-position-7"
                          style={{ fontSize: '8pt' }}
                          aria-label="employee (1 item)"
                        >
                          employee
                        </a>
                        <a
                          href="question-tag/employer/index.html"
                          className="tag-cloud-link tag-link-29 tag-link-position-8"
                          style={{ fontSize: '8pt' }}
                          aria-label="employer (1 item)"
                        >
                          employer
                        </a>
                        <a
                          href="question-tag/english/index.html"
                          className="tag-cloud-link tag-link-36 tag-link-position-9"
                          style={{ fontSize: '22pt' }}
                          aria-label="english (3 items)"
                        >
                          english
                        </a>
                        <a
                          href="question-tag/facebook/index.html"
                          className="tag-cloud-link tag-link-33 tag-link-position-10"
                          style={{ fontSize: '8pt' }}
                          aria-label="facebook (1 item)"
                        >
                          facebook
                        </a>
                        <a
                          href="question-tag/french/index.html"
                          className="tag-cloud-link tag-link-31 tag-link-position-11"
                          style={{ fontSize: '8pt' }}
                          aria-label="french (1 item)"
                        >
                          french
                        </a>
                        <a
                          href="question-tag/google/index.html"
                          className="tag-cloud-link tag-link-35 tag-link-position-12"
                          style={{ fontSize: '16.4pt' }}
                          aria-label="google (2 items)"
                        >
                          google
                        </a>
                        <a
                          href="question-tag/interview/index.html"
                          className="tag-cloud-link tag-link-34 tag-link-position-13"
                          style={{ fontSize: '8pt' }}
                          aria-label="interview (1 item)"
                        >
                          interview
                        </a>
                        <a
                          href="question-tag/javascript/index.html"
                          className="tag-cloud-link tag-link-27 tag-link-position-14"
                          style={{ fontSize: '8pt' }}
                          aria-label="javascript (1 item)"
                        >
                          javascript
                        </a>
                        <a
                          href="question-tag/language/index.html"
                          className="tag-cloud-link tag-link-25 tag-link-position-15"
                          style={{ fontSize: '22pt' }}
                          aria-label="language (3 items)"
                        >
                          language
                        </a>
                        <a
                          href="question-tag/life/index.html"
                          className="tag-cloud-link tag-link-14 tag-link-position-16"
                          style={{ fontSize: '8pt' }}
                          aria-label="life (1 item)"
                        >
                          life
                        </a>
                        <a
                          href="question-tag/php/index.html"
                          className="tag-cloud-link tag-link-24 tag-link-position-17"
                          style={{ fontSize: '8pt' }}
                          aria-label="php (1 item)"
                        >
                          php
                        </a>
                        <a
                          href="question-tag/programmer/index.html"
                          className="tag-cloud-link tag-link-15 tag-link-position-18"
                          style={{ fontSize: '8pt' }}
                          aria-label="programmer (1 item)"
                        >
                          programmer
                        </a>
                        <a
                          href="question-tag/programs/index.html"
                          className="tag-cloud-link tag-link-12 tag-link-position-19"
                          style={{ fontSize: '16.4pt' }}
                          aria-label="programs (2 items)"
                        >
                          programs
                        </a>
                        <a
                          href="question-tag/salary/index.html"
                          className="tag-cloud-link tag-link-17 tag-link-position-20"
                          style={{ fontSize: '8pt' }}
                          aria-label="salary (1 item)"
                        >
                          salary
                        </a>
                      </div>
                    </section>
                  </div>
                </div>
              </aside>
            </div>
          </main>
          <nav
            className="nav_menu float_r fixed_nav_menu"
            style={{
              position: 'relative',
              overflow: 'visible',
              boxSizing: 'border-box',
              minHeight: '1px',
            }}
          >
            <div
              className="theiaStickySidebar"
              style={{
                paddingTop: '0px',
                paddingBottom: '1px',
                position: 'static',
                top: '10px',
                left: '230.714px',
              }}
            >
              <h3 className="screen-reader-text">Explore</h3>
              <ul id="menu-explore-not-login" className="menu">
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-64 current_page_item menu-item-128">
                  <a href="index.html">
                    <i className="icon-home" />
                    Home
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-129">
                  <a href="communities/index.html">
                    <i className="icon-folder" />
                    Communities
                  </a>
                </li>
                <li className="nav_menu_open menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-130">
                  <a href="questions/index.html">
                    <i className="icon-book-open" />
                    Questions
                  </a>
                  <ul className="sub-menu">
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-131">
                      <a href="index5cfe.html?show=recent-questions">
                        New Questions
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-132">
                      <a href="indexdaa9.html?show=most-voted">
                        Trending Questions
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-133">
                      <a href="indexe6b0.html?show=most-visited">
                        Must read Questions
                      </a>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-134">
                      <a href="index11ec.html?show=most-answered">
                        Hot Questions
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="wpqa-menu wpqa-poll-nav menu-item menu-item-type-custom menu-item-object-custom menu-item-135 li-poll">
                  <a href="questions/index7bc2.html?type=poll">
                    <i className="icon-megaphone" />
                    Polls
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-180">
                  <a href="groups-page/index.html">
                    <i className="icon-globe" />
                    Groups
                  </a>
                </li>
                <li className="wpqa-menu wpqa-add-group-nav menu-item menu-item-type-custom menu-item-object-custom menu-item-179 li-add-group">
                  <a href="add-group/index.html">
                    <i className="icon-network" />
                    Add group
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-136">
                  <a href="tags/index.html">
                    <i className="icon-tag" />
                    Tags
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-138">
                  <a href="badges/index.html">
                    <i className="icon-trophy" />
                    Badges
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-137">
                  <a href="users/index.html">
                    <i className="icon-users" />
                    Users
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139">
                  <a href="faqs/index.html">
                    <i className="icon-lifebuoy" />
                    Help
                  </a>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-171">
                  <a
                    target="_blank"
                    href="https://1.envato.market/drV57"
                    rel="noreferrer"
                  >
                    <i className="icon-basket" />
                    Buy Theme
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

MainContent.propTypes = {};

export default memo(MainContent);
