import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Answer, getAnswers } from "services/answer.service";
import { useAppDispatch } from "store/hooks";
import { isoToDateTimeString } from 'utils/date';
import { Avatar } from '../ReportLine';
import { removeHtmlTags } from 'utils/removeHtmlTags';

interface Props {
    isActive: boolean;
}

export default function LatestAnswers(props: Props) {
    const isActiveTab = props.isActive ? ' active-tab' : '';
    const [answers, setAnswers] = useState<Answer[]>([]);
    const loadData = async () => {
        const answers = await getAnswers({ amount: 3, page: 1, sortDesc: 'createdAt' });
        setAnswers(answers);
    };

    useEffect(() => {
        loadData();
    }, []);
    return (
        <div
            className={"tab-inner-wrap tab-inner-wraptabs-widget-2" + isActiveTab}
            style={{ display: props.isActive ? 'block' : 'none' }}
            >
            <div className="user-notifications user-profile-area">
                <ul>
                    {answers.map((answer) => 
                        <li className="notifications__item d-flex" key={answer.id}>
                            <span className="span-icon author__avatar" style={{ minWidth: '25px'}}>
                                <Link to={"/home/profile/" + answer.details.author.id}>
                                    <img
                                        style={{     
                                            blockSize: '25px',
                                            minWidth: '25px',
                                            minHeight: '25px', 
                                        }}
                                        className="avatar avatar-25 rounded-circle photo"
                                        title={answer.details.author.name}
                                        src={answer.details.author.avatar ? `${process.env.REACT_APP_SERVER_ORIGIN}${answer.details.author.avatar}` :  Avatar.anonymous}
                                    />
                                </Link>
                            </span>
                            <div className="notification__body">
                                <Link className="author__name" to={"/home/profile/" + answer.details.author.id}>{answer.details.author.name}</Link> đã trả lời:  
                                <span className="question-title">
                                    <Link className="notification__question notification__question-dark" to={"/home/questions/" + answer.questionId}
                                        style={{ 
                                            overflow: "hidden",
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",                        
                                        }}>
                                        {parse(removeHtmlTags(answer.details.content))}
                                    </Link>
                                </span>
                                <span className="notifications-date notification__date d-block mt-2">
                                    {isoToDateTimeString(answer.details.createdAt)}
                                </span>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}