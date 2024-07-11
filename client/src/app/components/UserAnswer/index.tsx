import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { Answer, AnswerDetails } from "services/answer.service";
import { getQuestion } from "services/question.service";
import { isoToDateTimeString } from "utils/date";
import { Question } from "../QuestionDetails/slice/types";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from '../ReportLine';
import AuthorCard from '../AuthorCard';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAuth } from '../SignInPanel/slice/selectors';
import { AlertActions } from '../AuthMessage/slice';
import { panelActions } from '../SignUpPanel/slice';
import { panelName } from '../SignUpPanel/slice/types';
import { ReportActions } from '../CreateReportForm/slice';
import { ReportedType } from 'services/report.service';

interface Props {
    questionId: string;
    answer: Answer;
}

export default function UserAnswer(props: Props) {
    const navigate = useNavigate();
    const { user } = useAppSelector(getAuth);
    const [question, setQuestion] = useState<Question>();
    const dispatch = useAppDispatch();

    const handleEditAnswerClick = (e) => {
      e.preventDefault();
      navigate(`/home/edit-answer/${props.answer.id}`);
    }

    const handleReportClick = (e) => {
      e.preventDefault();
      if (user) {
        dispatch(ReportActions.setReportState({ reportedContentId: props.answer.id, reportedType: ReportedType.answer }));
        dispatch(panelActions.openPanel(panelName.CREATE_REPORT));
    } else {
        dispatch(
          AlertActions.setAuthMessage({
            error: 'Bạn vui lòng đăng nhập để tiếp tục để viết báo cáo',
          }),
        );
        dispatch(panelActions.openPanel(panelName.SIGN_IN));
      }
    }

    useEffect(() => {
        const loadQuestion = async () => {
            const question = await getQuestion(props.questionId);
            setQuestion(question);
        }
        loadQuestion();
    }, [props.questionId]);
    return (
        <li
          className="comment byuser comment-author-marko even thread-even depth-1 comment-with-title comment-with-title-1 comment-best-answer not-activate-gender comment"
          id="li-comment-71"
        >
          {" "}
          <div id="comment-71" className="comment-body clearfix">
            {" "}
            <div className="comment-question-title">
              <header className="article-header">
                <div className="question-header">
                  <div className="post-meta">
                    <span className="post-date">
                      Được hỏi vào lúc:
                      <span className="date-separator" />{" "}
                      <a>
                        <span className="entry-date published">
                          {isoToDateTimeString(question?.createdAt)}
                        </span>
                      </a>
                    </span>
                  </div>
                </div>
              </header>{" "}
              <div className="clearfix" />{" "}
              <h2 className="post-title">
                <Link className="post-title" to={`/home/questions/${question?.id}`}>
                    {question?.title}

                </Link>
              </h2>
            </div>{" "}
            <div className="comment-text">
              {" "}
              <div className="d-flex align-items-center header-of-comment">
                {" "}
                <div className="author-image author__avatar author-image-42 author_image_mouseover">
                  <a href="../index.html">
                    <span className="author-image-span">
                      <img
                        className="avatar avatar-42 rounded-circle photo"
                        title={props.answer.details.author.name}
                        width={42}
                        height={42}
                        style={{  blockSize: "42px" }}
                        src={props.answer.details.author.avatar 
                          ? !props.answer.details.author.avatar.startsWith('https')
                            ? `${process.env.REACT_APP_SERVER_ORIGIN}${props.answer.details.author.avatar}` 
                            : props.answer.details.author.avatar
                          : Avatar.anonymous}
                      />
                    </span>
                  </a>
                  <AuthorCard author={props.answer.details.author} />
                </div>{" "}
                <div className="author clearfix">
                  {" "}
                  {props.answer.details.isBestAnswer && <div className="best-answer">Best Answer</div>}{" "}
                  <div className="comment-meta">
                    {" "}
                    <div className="comment-author">
                      {" "}
                      <a href="../index.html"> {props.answer.details.author.name} </a>{" "}
                      <span
                        className="badge-span"
                        style={{ backgroundColor: "#d9a34a" }}
                      >
                        {/* Enlightened */}
                      </span>{" "}
                    </div>{" "}
                    <a
                      className="comment-date"
                      itemProp="url"
                    >
                      {" "}
                      Đã trả lời vào {isoToDateTimeString(props.answer.details.createdAt)}{" "}
                    </a>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="text">
                {" "}
                <div>
                  {" "}
                  <div className="less_answer_text" style={{
                    overflow: "hidden",
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}>
                    {parse(props.answer.details.content)}
                  </div>{" "}
                  <div className="full_answer_text wpqa_hide">
                  </div>{" "}
                </div>{" "}
                <div className="clearfix" /> <div className="clearfix" />{" "}
                <div className="wpqa_error" />{" "}
                <div className="comment-footer-bottom">
                  {" "}
                  <ul className="question-vote answer-vote answer-vote-dislike">
                    {" "}
                    <li>
                      <a
                        href="#"
                        data-id={71}
                        data-type="comment"
                        data-vote-type="up"
                        className="wpqa_vote comment_vote_up vote_allow"
                        title="Thích"
                      >
                        <i className="icon-up-dir" />
                      </a>
                    </li>{" "}
                    <li className="vote_result">{props.answer.details.votes}</li>{" "}
                    <li className="li_loader">
                      <span className="loader_3 fa-spin" />
                    </li>{" "}
                    <li className="dislike_answers">
                      <a
                        href="#"
                        data-id={71}
                        data-type="comment"
                        data-vote-type="down"
                        className="wpqa_vote comment_vote_down vote_allow"
                        title="Không thích"
                      >
                        <i className="icon-down-dir" />
                      </a>
                    </li>{" "}
                  </ul>{" "}
                  <ul className="comment-reply comment-reply-main">
                    <li className='comment-share question-share question-share-2'>
                      {user?.id === props.answer.details.author.id ? 
                        <a className="report_c" href="/" onClick={handleEditAnswerClick}>
                          <i className="icon-pencil" />
                          Chỉnh sửa
                        </a> : 
                        <a className="report_c" href="/" onClick={handleReportClick}>
                          <i className="icon-attention" />
                          Báo cáo
                        </a>
                      }
                    </li>
                    <li className='clearfix last-item-answers'></li>
                  </ul>
                </div>{" "}
              </div>{" "}
              <div className="clearfix" />{" "}
            </div>{" "}
          </div>{" "}
        </li>
      );
}