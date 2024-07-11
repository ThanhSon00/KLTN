import { AnswerDetails, Comment as CommentType, updateAnswerComment} from "services/answer.service"
import { Avatar } from "../ReportLine";
import { Link } from "react-router-dom";
import { isoToDateString } from "utils/date";
import VoteSection, { VoteSectionType } from "../VoteSection";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { useState } from "react";
import { PanelSubmitButton } from "../PanelSubmitButton";
interface Props {
  comment: CommentType;
}

export default function Comment(props: Props) {
  const [comment, setComment] = useState(props.comment);
  const { user } = useAppSelector(getAuth);
  const [editCommentOpened, setCommentOpened] = useState(false);
  const [commentContent, setCommentContent] = useState(props.comment.details.content);
  const editCommentOpenedStyle = editCommentOpened ? { display: "block" } : { display: "none" };
  const commentOpenedStyle = editCommentOpened ? { display: "none" } : { display: "block" };
  const dispatch = useAppDispatch();

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const editCommmentOnClick = (e) => {
    e.preventDefault();
    setCommentOpened(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateAnswerComment({ id: props.comment.answerId ,commentId: props.comment.id, content: commentContent }));
    if (result.meta.requestStatus === "fulfilled") {
      setComment((result.payload as CommentType));
      setCommentOpened(false);
    }
  }

  return (
    <li
      className="comment"
      itemType="https://schema.org/answerExplanation"
    >
      
      <div className="comment-body clearfix" style={commentOpenedStyle}>
        
        <div className="comment-text">
          
          <div className="d-flex align-items-center header-of-comment">
            
            <div className="author-image author__avatar author-image-42">
              <Link to={`/home/profile/${comment.details.author.id}`}>
                <span className="author-image-span">
                  <img
                    style={{ maxBlockSize: "42px" }}
                    className="avatar avatar-42 rounded-circle photo"
                    title={comment.details.author.name}
                    width={42}
                    height={42}
                    src={comment.details.author.avatar 
                      ? !comment.details.author.avatar.startsWith('https') 
                        ? `${process.env.REACT_APP_SERVER_ORIGIN}${comment.details.author.avatar}`  
                        : comment.details.author.avatar
                      : Avatar.anonymous}
                  />
                </span>
              </Link>
              <div className="author-image-pop-2 member-card" data-user={1}>
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
                    
                    <Link to={`/home/profile/${comment.details.author.id}`}>
                      <span itemProp="name">{comment.details.author.name}</span>
                    </Link>
                  </span>
                </div>
                <a
                  className="comment-date"
                  itemProp="url"
                >
                  
                  <span
                    className="wpqa_hide"
                    itemProp="dateCreated"
                  >
                  </span>
                  Đã phản hồi vào {`${isoToDateString(comment.details.createdAt)}`}
                </a>
              </div>
            </div>
          </div>
          <div className="text">
            
            <div itemProp="text">
              
              <p style={{ marginBottom: "0" }}>
                {comment.details.content}
              </p>
            </div>
            <div className="clearfix" /> <div className="clearfix" />
            <div className="wpqa_error" />
            <div className="comment-footer-bottom">
              
              <ul className="comment-reply" style={{ width: "100%" }}>
                
                <li className="comment-reaction-votes">
                  
                  <VoteSection votes={comment.details.votes} contentId={comment.id} type={VoteSectionType.comment} voteStatus={comment.voteStatus}/>
                </li>
                {user && user.id === comment.details.author.id && 
                  <li className="comment-share question-share question-share-2" style={{ marginTop: "19px" }}>
                    <a className="comment-edit-link edit-comment" href="/" onClick={editCommmentOnClick}>
                      <i className="icon-pencil"></i>Chỉnh sửa 
                    </a>
                  </li>
                }
              </ul>
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </div>
      <div
            id="respond"
            className="comment-respond wpqa_hide"
            style={editCommentOpenedStyle}
            >
            {" "}
            <div>
                <h3 className="section-title">
                    Chỉnh sửa nội dung
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
                onSubmit={handleSubmit}
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
                    onChange={handleCommentChange}
                    defaultValue={comment.details.content}
                />{" "}
                <i className="icon-pencil" />{" "}
                </div>{" "}
                <div className="clearfix" />{" "}
                <PanelSubmitButton name="Cập nhật nội dung" style={{ width: "100%", height: "35px" }}/>{" "}
            </form>{" "}
        </div>
    </li>
  )
}