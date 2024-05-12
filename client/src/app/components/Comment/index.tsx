import { AnswerDetails } from "services/answer.service"
import { isoToDateString } from "utils/date"
import parse from 'html-react-parser';
import { useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { useNavigate } from "react-router-dom";
import { Question } from "../QuestionDetails/slice/types";

interface Props {
    comment: AnswerDetails,
    question: Question,
    key: string
}


export default function Comment(props: Props) {
    const { user } = useAppSelector(getAuth);
    const navigate = useNavigate();

    const editCommentOnClick = (e) => {
        e.preventDefault();
        navigate(`/home/edit-answer/${props.question.id}/details/${props.comment.id}`);
    }

    return (
        <li
        className="comment"
        itemType="https://schema.org/Answer"
        itemProp="suggestedAnswer"
    >
        
        <div className="comment-body clearfix">
        
        <div className="comment-text">
            
            <div className="d-flex align-items-center header-of-comment">
            
            <div className="author-image author__avatar author-image-42">
                <a href="/">
                <span className="author-image-span">
                    <img
                    className="avatar avatar-42 rounded-circle photo"
                    title={props.comment.author.name}
                    width={42}
                    height={42}
                    src={`${process.env.REACT_APP_CLIENT_ORIGIN}${props.comment.author.avatar}`}
                    />
                </span>
                </a>
                <div className="author-image-pop-2 member-card" data-user={5}>
                <div className="author-pop-loader">
                    <div className="loader_2" />
                </div>
                </div>
            </div>
            <div className="author clearfix">
                <div className="comment-meta">
                <div className="comment-author">
                    <span
                    itemProp="author"
                    itemType="http://schema.org/Person"
                    >
                    <a
                        itemProp="url"
                        href="/"
                    >
                        <span itemProp="name">{props.comment.author.name}</span>
                    </a>
                    </span>
                    <span
                    className="badge-span"
                    style={{ backgroundColor: "#d9a34a" }}
                    >
                    Comming Soon
                    </span>
                </div>
                <a
                    href="/"
                    className="comment-date"
                    itemProp="url"
                >
                    
                    <span
                    className="wpqa_hide"
                    itemProp="dateCreated"
                    >
                        {props.comment.createdAt}
                    </span>
                    Added an answer on {isoToDateString(props.comment.createdAt)}
                </a>
                </div>
            </div>
            </div>
            <div className="text">
            
            <div itemProp="text">
                {
                    parse(props.comment.content)   
                }
            </div>
            <div className="clearfix" /> <div className="clearfix" />
            <div className="wpqa_error" />
            <div className="comment-footer-bottom">
            <ul className="question-vote answer-vote answer-vote-dislike">
                <li>
                    <a href="#" data-id={61} data-type="comment" data-vote-type="up" className="wpqa_vote comment_vote_up vote_allow" title="Like">
                    <i className="icon-up-dir" />
                    </a>
                </li>
                <li className="vote_result" itemProp="upvoteCount">{props.comment.voteCount}</li>
                <li className="li_loader">
                    <span className="loader_3 fa-spin" />
                </li>
                <li className="dislike_answers">
                    <a href="#" data-id={61} data-type="comment" data-vote-type="down" className="wpqa_vote comment_vote_down vote_allow" title="Dislike">
                    <i className="icon-down-dir" />
                    </a>
                </li>
            </ul>
            <ul className="comment-reply comment-reply-main">
            <li>
                <a rel="nofollow" className="comment-reply-link wpqa-reply-link" href="index.html#respond" data-id={61} data-post_id={118} aria-label="Reply to John Peter">
                <i className="icon-reply" />Reply </a>
            </li>
            <li className="comment-share question-share question-share-2">
                <i className="icon-share" />
                <span>Share</span>
                <div className="post-share">
                <span>
                    <i className="icon-share" />
                    <span>Share</span>
                </span>
                <ul className="social-icons list-unstyled mb-0 d-flex align-items-center">
                    <li className="share-facebook">
                    <a target="_blank" href="http://www.facebook.com/sharer.php?u=https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#comment-61&t=Yes%2C+I+understand+it.+I+hear+a+lot+of+this+incorrect+grammar+from+my+wife.+I+would+expect+that+the+person+that+spoke+this+was+possibly+Chinese.+In+Chinese+there">
                        <i className="icon-facebook" />
                        <span>Share on <span>Facebook</span>
                        </span>
                    </a>
                    </li>
                    <li className="share-twitter">
                    <a target="_blank" href="http://twitter.com/share?text=Yes%2C+I+understand+it.+I+hear+a+lot+of+this+incorrect+grammar+from+my+wife.+I+would+expect+that+the+person+that+spoke+this+was+possibly+Chinese.+In+Chinese+there&url=https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#comment-61">
                        <i className="icon-twitter" />
                        <span>Share on Twitter</span>
                    </a>
                    </li>
                    <li className="share-linkedin">
                    <a target="_blank" href="http://www.linkedin.com/shareArticle?mini=true&url=https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#comment-61&title=Yes%2C+I+understand+it.+I+hear+a+lot+of+this+incorrect+grammar+from+my+wife.+I+would+expect+that+the+person+that+spoke+this+was+possibly+Chinese.+In+Chinese+there">
                        <i className="icon-linkedin" />
                        <span>Share on LinkedIn</span>
                    </a>
                    </li>
                    <li className="share-whatsapp">
                    <a target="_blank" href="https://api.whatsapp.com/send?text=Yes%2C+I+understand+it.+I+hear+a+lot+of+this+incorrect+grammar+from+my+wife.+I+would+expect+that+the+person+that+spoke+this+was+possibly+Chinese.+In+Chinese+there%20-%20https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#comment-61">
                        <i className="fab fa-whatsapp" />
                        <span>Share on WhatsApp</span>
                    </a>
                    </li>
                </ul>
                </div>
            </li>
            <li className="clearfix last-item-answers" />
            </ul>
            <ul className="comment-reply comment-list-links">
            <li className="question-list-details comment-list-details">
                <i className="icon-dot-3" />
                { 
                    user?.id === props.comment.author.id 
                        ? 
                        <ul>
                            <li>
                                <a className="comment-edit-link edit-comment" href="/" onClick={editCommentOnClick}>
                                <i className="icon-pencil"></i>Edit </a>
                            </li>
                            <li>
                                <a className="delete-comment delete-answer" href="/">
                                <i className="icon-trash"></i>Delete </a>
                            </li>
                        </ul> 
                        : 
                        <ul>
                            <li className="report_activated">
                                <a className="report_c" href="index.html">
                                <i className="icon-attention" />Report </a>
                            </li>
                        </ul>
                }
            </li>
            <li className="clearfix last-item-answers" />
            </ul>

            </div>
            </div>
            <div className="clearfix" />
        </div>
        </div>
    </li>
    )
}