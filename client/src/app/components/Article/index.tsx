import parse from 'html-react-parser';
import { isoToDateTimeString } from "utils/date"
import { Question } from "../QuestionDetails/slice/types"
import { Link } from "react-router-dom"
import { Avatar } from '../ReportLine';
import AuthorCard from '../AuthorCard';
import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';
interface Props {
    question: Question
}

export function Article(props: Props) {
    const totalCommentVotes = props.question.answers.reduce((total, answer) => total + answer.details.votes, 0);
    const totalVotes = props.question.votes + totalCommentVotes;
    return (
        <article
        className="article-question article-post question clearfix question-answer-before question-vote-inside question-with-comments answer-question-not-jquery question-vote-image discoura-not-credential question-type-normal post-118 type-question status-publish hentry question-category-language question_tags-english question_tags-language"
      >
        <div className="single-inner-content">
          <div className="question-inner">
            <div className="question-image-vote">
              <div className="author-image author__avatar author-image-42 author_image_mouseover">
                <Link to={`/home/profile/${props.question.author.id}`}>
                  <span className="author-image-span">
                    <img
                      className="avatar avatar-42 photo"
                      title={props.question.author.name}
                      width={42}
                      height={42}
                      style={{ maxBlockSize: "42px" }}
                      src={props.question.author.avatar ? `${process.env.REACT_APP_SERVER_ORIGIN}${props.question.author.avatar}` : Avatar.anonymous}
                    />
                  </span>
                </Link>
                <AuthorCard author={props.question.author} />
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
                <li className="vote_result">0</li>
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
                  <Link className='post-author' to={`/home/profile/${props.question.author.id}`}>
                    {props.question.author.name}
                  </Link>

                  {/* <span
                    className="badge-span"
                    style={{ backgroundColor: '#d9a34a' }}
                  >
                    Enlightened
                  </span> */}
                  <div className="post-meta">
                    <span className="post-date">
                      Được hỏi vào:{' '}
                      <span className="date-separator" />
                      <a href="/">
                        <span className="entry-date published">
                           {isoToDateTimeString(props.question.createdAt)}
                        </span>
                      </a>
                    </span>
                  </div>
                </div>
              </header>
              <div>
                <h2 className="post-title">
                  <a
                    className="post-title"
                    href={`#/home/questions/${props.question.id}`}                    
                    rel="bookmark"
                  >
                    {props.question.title}
                  </a>
                </h2>
              </div>
            </div>
            <div className="question-content question-content-second" style={{ 
              width: "100%",
            }}>
              <div className="post-wrap-content">
                <div className="question-content-text">
                  <div className="all_not_single_post_content text-container">
                    <div className="excerpt-question" style={{
                      overflow: "hidden",
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}>
                      <div dangerouslySetInnerHTML={{ __html: props.question.details }} />
                    </div>
                  </div>
                </div>
                <div className="tagcloud">
                  <div className="question-tags">
                    <i className="icon-tags" />
                    {/* <a href="question-tag/english/index.html">
                      english
                    </a>
                    <a href="question-tag/language/index.html">
                      language
                    </a> */}
                  </div>
                </div>
              </div>
              <div className="wpqa_error" />
              <div className="wpqa_success" />
              <footer className="question-footer">
                <ul className="footer-meta">
                  <li>
                    <a href="/">
                      <i className="icon-flag" />
                      <span className="question-span">
                        {totalVotes} Bình chọn
                      </span>
                    </a>                    
                  </li>
                  <li className={"best-answer-meta" + (props.question.answered ? " meta-best-answer" : "")}>
                    <a href="/">
                      <i className="icon-comment" />
                      <span className="question-span">
                        {props.question.answers.length} Trả lời
                      </span>
                    </a>
                  </li>
                  <li className="view-stats-meta">
                    <i className="icon-eye" />
                    {props.question.views} <span className="question-span">Lượt xem</span>
                  </li>
                </ul>
                <Link className="meta-answer meta-answer-a" to={`/home/questions/${props.question.id}`}>Trả lời</Link>
              </footer>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </article>
    )
}