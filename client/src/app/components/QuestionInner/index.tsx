/**
 *
 * QuestionInner
 *
 */
import { Question } from 'app/components/QuestionDetails/slice/types';
import { User } from '../SignInPanel/slice/types';
import { isoToDateTimeString } from 'utils/date';
import parse from 'html-react-parser';
import { Avatar } from '../ReportLine';
import VoteSection, { VoteSectionType } from '../VoteSection';
import AuthorCard from '../AuthorCard';
import { useState } from 'react';
import { Link } from 'react-router-dom';
 
interface Props {
  question: Question;
  author: User;
  highlight?: boolean;
}

export function QuestionInner(prop: Props) {
  const [question, setQuestion] = useState<Question>(prop.question);
  return (
    <div className="question-inner">
      <div className="question-image-vote">
        <div className="author-image author__avatar author-image-42">
          <Link to={`/home/profile/${prop.author.id}`}>
            <span className="author-image-span">
              <img
                className="avatar avatar-42 photo"
                alt="son689"
                title="son689"
                width={42}
                height={42}
                style={{ maxBlockSize: '42px'}}
                src={prop.author.avatar ? `${process.env.REACT_APP_SERVER_ORIGIN}${prop.author?.avatar}` : Avatar.anonymous}
              />
            </span>
          </Link>
          <AuthorCard author={prop.author} />
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
      <div className="question-content question-content-first" style={prop.highlight ? { background: "rgb(255, 255, 172)" } : {}}>
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
            <div className="post-meta">
              <span className="post-date">
                Đã hỏi vào:
                <span className="date-separator" />
                  <span className="entry-date published">
                    {isoToDateTimeString(question.createdAt)}
                  </span>
              </span>
            </div>
          </div>
        </header>
        <div>
          <h1 className="post-title">
            <span itemProp="name">{question.title}</span>
          </h1>
        </div>
      </div>
      <VoteSection type={VoteSectionType.question} voteStatus={question.voteStatus} votes={question.votes} contentId={question.id} />
      <div className="question-content question-content-second">
        <div className="wpqa_error" />
        <div className="wpqa_success" />
        <div className="post-wrap-content">
          <div className="question-content-text">
            <div className="all_single_post_content">
              <div className="content-text" itemProp="text">
                  {
                    parse(question.details)
                  }
              </div>
              <div className="clearfix" />
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
            <li className={"best-answer-meta" + (question.answered ? " meta-best-answer" : "")}>
                <i className="icon-comment" />
                <span itemProp="answerCount" className="number discy_hide">
                  {question.answers.length}
                </span>
                <span className="question-span">{question.answers.length} Trả lời</span>
            </li>
            <li className="view-stats-meta">
              <i className="icon-eye" />{question.views}
              <span className="question-span"> Lượt xem</span>
            </li>
          </ul>
        </footer>
      </div>
      <div className="clearfix" />
    </div>
  );
}

