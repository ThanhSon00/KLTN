/**
 *
 * QuestionInner
 *
 */
import * as React from 'react';
import { Question } from 'app/components/QuestionDetails/slice/types';
import { User } from '../SignInPanel/slice/types';

interface Props {
  question: Question;
  author?: User;
}

export function QuestionInner(prop: Props) {
  return (
    <div className="question-inner">
      <div className="question-image-vote">
        <div className="author-image author__avatar author-image-42">
          <a href="https://2code.info/demo/themes/Discy/Main/profile/son689/">
            <span className="author-image-span">
              <img
                className="avatar avatar-42 photo"
                alt="son689"
                title="son689"
                width={42}
                height={42}
                src={`${process.env.PUBLIC_URL}${prop.author?.avatar}`}
              />
            </span>
          </a>
          <div className="author-image-pop-2 member-card">
            <div className="author-pop-loader">
              <div className="loader_2" />
            </div>
          </div>
        </div>
        <ul className="question-vote question-mobile">
          <li className="question-vote-up">
            <a
              href="/"
              data-type="question"
              data-vote-type="up"
              className="wpqa_vote question_vote_up vote_not_allow"
              title="Like"
            >
              <i className="icon-up-dir" />
            </a>
          </li>
          <li className="vote_result" itemProp="upvoteCount">
            0
          </li>
          <li className="li_loader">
            <span className="loader_3 fa-spin" />
          </li>
          <li className="question-vote-down">
            <a
              href="/"
              data-type="question"
              data-vote-type="down"
              className="wpqa_vote question_vote_down vote_not_allow"
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
            <span
              itemProp="author"
              itemScope
              itemType="http://schema.org/Person"
            >
              <a className="post-author" itemProp="url" href="/">
                <span itemProp="name">{prop.author?.name}</span>
              </a>
            </span>
            <span className="badge-span" style={{ backgroundColor: '#0d0e11' }}>
              Beginner
            </span>
            <div className="post-meta">
              <span className="post-date">
                Asked:
                <span className="date-separator" />
                <a
                  href="https://2code.info/demo/themes/Discy/Main/question/testing-title/"
                  itemProp="url"
                >
                  <span className="entry-date published">
                    {convertToReadableDate(prop.question.createdAt)}
                  </span>
                </a>
              </span>
              <span className="byline">
                <span className="post-cat">
                  In:
                  <a href="/" rel="tag">
                    Comming soon!
                  </a>
                </span>
              </span>
            </div>
          </div>
        </header>
        <div>
          <h1 className="post-title">
            <span itemProp="name">{prop.question.title}</span>
          </h1>
        </div>
      </div>
      <div className="question-not-mobile question-image-vote question-vote-sticky">
        <div className="question-sticky-stop">
          <ul className="question-vote">
            <li className="question-vote-up">
              <a
                href="/"
                data-type="question"
                data-vote-type="up"
                className="wpqa_vote question_vote_up vote_not_allow"
                title="Like"
              >
                <i className="icon-up-dir" />
              </a>
            </li>
            <li className="vote_result" itemProp="upvoteCount">
              0
            </li>
            <li className="li_loader">
              <span className="loader_3 fa-spin" />
            </li>
            <li className="question-vote-down">
              <a
                href="/"
                data-type="question"
                data-vote-type="down"
                className="wpqa_vote question_vote_down vote_not_allow"
                title="Dislike"
              >
                <i className="icon-down-dir" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="question-content question-content-second">
        <div className="wpqa_error" />
        <div className="wpqa_success" />
        <div className="post-wrap-content">
          <div className="question-content-text">
            <div className="all_single_post_content">
              <div className="content-text" itemProp="text">
                <p>{prop.question.details}</p>
              </div>
              <div className="clearfix" />
              <div className="question-custom-links">
                <a
                  href="/"
                  className="bump-question wpqa-open-click color btn btn__link custom-post-link"
                  data-class="bump-question-area"
                >
                  Bump your question
                </a>
                <a
                  href="/"
                  className="pay-to-sticky wpqa-open-click color btn btn__link custom-post-link"
                  data-class="pay-to-sticky-area"
                >
                  Pay for sticky question
                </a>
                <div className="clearfix" />
                <div className="pay-to-sticky-area wpqa-open-div wpqa_hide">
                  <a
                    href="https://2code.info/demo/themes/Discy/Main/checkout/sticky/41015/"
                    target="_blank"
                    className="button-default btn btn__primary"
                    rel="noreferrer"
                  >
                    Pay for sticky question
                  </a>
                </div>
                <div className="clearfix" />
              </div>
              <div className="clearfix" />
              <div className="bump-question-area wpqa-open-div wpqa_hide">
                <input
                  className="form-control"
                  id="input-add-point"
                  type="text"
                  placeholder="Bump question with points"
                />
                <a className="button-default btn btn__primary" href="/">
                  Bump
                </a>
                <div className="load_span">
                  <span className="loader_2" />
                </div>
                <div className="clearfix" />
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
        <footer className="question-footer">
          <ul className="footer-meta">
            <li className="best-answer-meta">
              <a href="https://2code.info/demo/themes/Discy/Main/question/testing-title/#comments">
                <i className="icon-comment" />
                <span itemProp="answerCount" className="number discy_hide">
                  0
                </span>
                <span className="question-span">0 Answers</span>
              </a>
            </li>
            <li className="view-stats-meta">
              <i className="icon-eye" />0{' '}
              <span className="question-span">Views</span>
            </li>
            <li className="question-followers question-followers-no-link">
              <i className="icon-users" />
              <span className="question-follow-count">0 </span>
              <span className="question-span">Followers</span>
            </li>
            <li className="question-favorites question-favorites-no-link">
              <div className="small_loader loader_2" />
              <i className="icon-star" /> <span>0 </span>
            </li>
          </ul>
        </footer>
      </div>
      <div className="clearfix" />
    </div>
  );
}

function convertToReadableDate(isoTimestamp) {
  const date = new Date(isoTimestamp);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const year = date.getUTCFullYear();
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();

  // Construct the readable date string
  const readableDate = `${month} ${day}, ${year}`;

  return readableDate;
}
