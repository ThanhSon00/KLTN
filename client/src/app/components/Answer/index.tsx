import { Answer as AnswerType, AnswerDetails, updateAnswer, createAnswerComment, Comment as CommentType, getAnswerComments } from "services/answer.service"
import { isoToDateTimeString } from "utils/date"
import parse from 'html-react-parser';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { useNavigate } from "react-router-dom";
import { Question } from "../QuestionDetails/slice/types";
import { panelActions } from "../SignUpPanel/slice";
import { panelName } from "../SignUpPanel/slice/types";
import { ReportActions } from "../CreateReportForm/slice";
import { ReportedType } from "services/report.service";
import { Avatar } from "../ReportLine";
import VoteSection, { VoteSectionType } from "../VoteSection";
import { ChangeEvent, useEffect, useState } from "react";
import { PanelSubmitButton } from "../PanelSubmitButton";
import Comment from "../Comment";
import { AlertActions } from "../AuthMessage/slice";
import ReadMore from "../ReadMore";


interface Props {
    answer: AnswerType,
    question: Question,
    highlight?: Boolean,
    updateQuestion: (question: Question) => void;
}

export default function Answer(props: Props) {
    const { user } = useAppSelector(getAuth);
    const [answer, setAnswer] = useState<AnswerType>(props.answer)
    const [commentOpened, setCommentOpened] = useState<boolean>(false);
    const [listCommentOpened, setListCommentOpened] = useState<boolean>(false);
    const [commentText, setCommentText] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleOpenReportForm = (e) => {
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

    const handleCreateComment = async (e) => {
        e.preventDefault();
        if (!commentOpened || !user) return;
        const result = await dispatch(createAnswerComment({ answerId: answer.id, content: commentText, author: user.id }));
        if (result.meta.requestStatus === 'fulfilled') {
            setAnswer({
                ...answer, 
                comments: [...answer.comments, (result.payload as CommentType)], 
                commentsAmount: answer.commentsAmount + 1 
            });
            setCommentOpened(false);
            setListCommentOpened(true);
        }
    }

    const editAnswerOnClick = (e) => {
        e.preventDefault();
        navigate(`/home/edit-answer/${props.answer.id}`);
    }

    const handleMarkBestAnswer = (e, isBestAnswer: boolean) => {
        e.preventDefault();
        markBestAnswer(isBestAnswer);
    }

    const markBestAnswer = async (isBestAnswer: boolean) => {
        const result = await dispatch(updateAnswer({ id: answer.id, isBestAnswer }));
        if (result.meta.requestStatus === 'fulfilled') {
            // setAnswer(result.payload as AnswerDetails);
            props.updateQuestion({ ...props.question, answered: isBestAnswer });
            setAnswer({...answer, details: {... answer.details, isBestAnswer: isBestAnswer } });
        }
    }

    const commentOpenedStyle = commentOpened ? { display: "block" } : { display: "none" };

    const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        event.preventDefault();
        setCommentText(event.target.value);
    }

    const loadComments = async (answerId: string) => {
        const comments = await getAnswerComments(answerId);
        setAnswer({...answer, comments: comments });
    }

    useEffect(() => {
        if (listCommentOpened) {
            loadComments(answer.id);
        }
    }, [listCommentOpened]);

    return (
        <li
        className="comment"
        itemType="https://schema.org/Answer"
        style={props.highlight? { background: "rgb(255, 255, 172)" } : {}}
    >
        
        <div className="comment-body clearfix">
        
        <div className="comment-text">
            
            <div className="d-flex align-items-center header-of-comment">
            
            <div className="author-image author__avatar author-image-42">
                <a href="/">
                <span className="author-image-span">
                    <img
                    className="avatar avatar-42 rounded-circle photo"
                    title={answer.details.author.name}
                    width={42}
                    height={42}
                    style={{ maxBlockSize: 42 }}
                    src={answer.details.author.avatar ? `${process.env.REACT_APP_SERVER_ORIGIN}` + answer.details.author.avatar : Avatar.anonymous}
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
                {answer.details.isBestAnswer && <div className="best-answer">Trả lời chính xác nhất</div>}
                <div className="comment-author">
                    <span
                    itemProp="author"
                    itemType="http://schema.org/Person"
                    >
                    <a
                        itemProp="url"
                        href="/"
                    >
                        <span itemProp="name">{answer.details.author.name}</span>
                    </a>
                    </span>
                    <span
                    className="badge-span"
                    style={{ backgroundColor: "#d9a34a" }}
                    >
                    
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
                        {answer.details.createdAt}
                    </span>
                    Trả lời vào {isoToDateTimeString(answer.details.createdAt)}
                </a>
                </div>
            </div>
            </div>
            <div className="text">
            
            <div itemProp="text" style={{ marginBottom: "15px" }}>
                <ReadMore htmlText={answer.details.content} />
            </div>
            <div className="clearfix" /> <div className="clearfix" />
            <div className="wpqa_error" />
            <div className="comment-footer-bottom">
            <VoteSection type={VoteSectionType.answer} votes={answer.details.votes} contentId={answer.id} voteStatus={answer.voteStatus} /> 
            <ul className="comment-reply comment-reply-main">
                {user && 
                    <li>
                        <a rel="nofollow" className="comment-reply-link wpqa-reply-link" href="index.html#respond" onClick={(e) => { e.preventDefault(); setCommentOpened(true) }}>
                        <i className="icon-reply" />Phản hồi </a>
                    </li>
                }
                {props.question.author.id === user?.id && !props.question.answered &&
                    <li className="wpqa-add-remove-best-answer">
                        <a
                            className="best_answer_a"
                            data-nonce="27cac7a94e"
                            href="/"
                            title="Xác nhận là câu trả lời chính xác nhất "
                            onClick={(e) => handleMarkBestAnswer(e, true)}
                        >
                            <i className="icon-check" />
                            Xác nhận trả lời phù hợp
                        </a>
                    </li>
                }
                {props.question.author.id === user?.id && answer.details.isBestAnswer &&
                    <li className="wpqa-add-remove-best-answer">
                        <a
                            className="best_answer_a"
                            data-nonce="27cac7a94e"
                            href="/"
                            title="Xác nhận là câu trả lời chính xác nhất "
                            onClick={(e) => handleMarkBestAnswer(e, false)}
                        >
                            <i className="icon-cancel" />
                            Hủy xác nhận trả lời 
                        </a>
                    </li>
                }
                {answer.commentsAmount > 0 && 
                    <li>
                        <a rel="nofollow" className="comment-reply-link wpqa-reply-link" href="/" onClick={(e) => {
                            e.preventDefault();
                            setListCommentOpened(!listCommentOpened)
                        }}>
                        <i className={listCommentOpened ? "icon-up" : "icon-down"} />{listCommentOpened ? `Ẩn phản hồi` : `Xem phản hồi (${answer.commentsAmount})`}</a>
                    </li>
                }
                <li className="clearfix last-item-answers" />
            </ul>   
            <ul className="comment-reply comment-list-links">
                <li className="question-list-details comment-list-details">
                    <i className="icon-dot-3" />
                    { 
                        user?.id === answer.details.author.id 
                            ? 
                            <ul>
                                <li>
                                    <a className="comment-edit-link edit-comment" href="/" onClick={editAnswerOnClick}>
                                    <i className="icon-pencil" />Chỉnh sửa </a>
                                </li>
                            </ul> 
                            : 
                            <ul>
                                <li className="report_activated" onClick={handleOpenReportForm}>
                                    <a className="report_c" href="index.html">
                                    <i className="icon-attention" />Báo cáo </a>
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
        <div
            id="respond"
            className="comment-respond wpqa_hide"
            style={commentOpenedStyle}
            >
            {" "}
            <div>
                <h3 className="section-title">
                    Phản hồi tới {answer.details.author.name}
                </h3>{" "}
                <div className="wpqa-cancel-link cancel-comment-reply">
                {" "}
                    <a style={{ color: 'red' }} rel="nofollow" id="cancel-comment-reply-link" href="#respond" onClick={(e) => { e.preventDefault(); setCommentOpened(false) }}>
                        Hủy
                    </a>{" "}
                </div>{" "}
            </div>
            <form
                method="post"
                id="commentform"
                className="post-section comment-form answers-form"
                onSubmit={handleCreateComment}
            >
                {" "}
                <div className="wpqa_error" />{" "}
                <div className="form-input form-textarea form-comment-normal">
                {" "}
                <textarea
                    id="comment"
                    name="comment"
                    rows={5}
                    className="form-control"
                    aria-required="true"
                    placeholder="Nội dung bình luận"
                    onChange={handleCommentChange}
                    defaultValue={""}
                />{" "}
                <i className="icon-pencil" />{" "}
                </div>{" "}
                <div className="clearfix" />{" "}
                <PanelSubmitButton name="Gửi bình luận" style={{ width: "100%", height: "35px" }}/>{" "}
            </form>{" "}
        </div>

        <ul className="children" style={{ display: listCommentOpened ? "block" : "none" }}>
            {answer.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
        </ul>
    </li>
    )
}