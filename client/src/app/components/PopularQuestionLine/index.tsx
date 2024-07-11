import { Link } from "react-router-dom";
import { Question } from "../QuestionDetails/slice/types"
import { Avatar } from "../ReportLine";

interface Props {
    question: Question;
}

export default function PopularQuestionLine({ question }: Props) {
    return (<>
        <li className="notifications__item question-item list-item-type-question d-flex widget-posts-text widget-no-img" >
            <span className="span-icon author__avatar">
                <Link to={`/home/questions/${question.id}`}>
                    <img
                        className="avatar avatar-20 rounded-circle photo"
                        title={question.author.name}
                        width={20}
                        height={20}
                        style={{ maxBlockSize: '20px' }}
                        src={question.author.avatar 
                            ? !question.author.avatar.startsWith('https') 
                                ? `${process.env.REACT_APP_SERVER_ORIGIN}${question.author.avatar}` 
                                : question.author.avatar
                            : Avatar.anonymous}
                    />
                </Link>
            </span>
            <div>
                <h3 className="question__title">
                    <Link className="color-dark" title={question.title} to={`/home/questions/${question.id}`} rel="bookmark"
                        style={{ 
                            overflow: "hidden",
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",        
                        }}>
                        <i className="icon-ios-paper-outline wpqa_hide" />
                        {question.title}
                    </Link>
                </h3>
                <ul className="widget-post-meta question-item__meta list-unstyled mb-0 d-flex align-items-center">
                    <li key={question.id}>
                        <a
                        className="post-meta-comment"
                        >
                        <i className="icon-comment" />{question.answers.length} Trả lời
                        </a>
                    </li>
                </ul>
            </div>
        </li>
    </>)
}