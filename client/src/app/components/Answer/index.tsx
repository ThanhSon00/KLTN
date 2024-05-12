interface User {
    name: string;
    avatar: string;
    email: string;
}

interface Props {
    content: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export default function Answer(props: Props) {
    return (
        <li
        className="comment byuser comment-author-john even thread-even depth-1 not-activate-gender comment"
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
                            alt="John Peter"
                            title="John Peter"
                            width={42}
                            height={42}
                            src={`${process.env.REACT_APP_CLIENT_ORIGIN}${props.user.avatar}`}
                        />
                    </span>
                    </a>
                    <div className="author-image-pop-2 member-card" data-user={2}>
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
                            href="https://2code.info/demo/themes/Discy/Main/profile/john/"
                        >
                            
                            <span itemProp="name">{props.user.name}</span>
                        </a>
                        </span>
                        <span
                        className="badge-span"
                        style={{ backgroundColor: "#d9a34a" }}
                        >
                        Coming soon
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
                        2023-04-19T02:00:52+00:00
                        </span>
                        Added an answer on April 19, 2023 at 2:00 am
                    </a>
                    </div>
                </div>
                </div>
                <div className="text">
                
                <div itemProp="text">
                    
                    <p>
                    Yes, I understand it. I hear a lot of this incorrect grammar
                    from my wife. I would expect that the person that spoke this
                    was possibly Chinese. In Chinese there are no tenses or
                    plurals. No he or she pronouns. The context tells all. So it
                    might have been a direct translation from Chinese.
                    </p>
                </div>
                <div className="clearfix" /> <div className="clearfix" />
                <div className="wpqa_error" />
                <div className="comment-footer-bottom">
                    
                    <ul className="comment-reply">
                    
                    <li className="comment-reaction-votes">
                        
                        <ul className="question-vote answer-vote answer-vote-dislike">
                        
                        <li>
                            <a
                            href="#"
                            data-id={61}
                            data-type="comment"
                            data-vote-type="up"
                            className="wpqa_vote comment_vote_up vote_allow"
                            title="Like"
                            >
                            <i className="icon-up-dir" />
                            </a>
                        </li>
                        <li className="vote_result" itemProp="upvoteCount">
                            133
                        </li>
                        <li className="li_loader">
                            <span className="loader_3 fa-spin" />
                        </li>
                        <li className="dislike_answers">
                            <a
                            href="#"
                            data-id={61}
                            data-type="comment"
                            data-vote-type="down"
                            className="wpqa_vote comment_vote_down vote_allow"
                            title="Dislike"
                            >
                            <i className="icon-down-dir" />
                            </a>
                        </li>
                        </ul>
                    </li>
                    <li>
                        <a
                        rel="nofollow"
                        className="comment-reply-link wpqa-reply-link"
                        href="https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#respond"
                        data-id={61}
                        data-post_id={118}
                        aria-label="Reply to John Peter"
                        >
                        <i className="icon-reply" />
                        Reply
                        </a>
                    </li>
                    <li className="comment-share question-share question-share-2">
                        
                        <i className="icon-share" /> <span>Share</span>
                        <div className="post-share">
                        
                        <span>
                            <i className="icon-share" />
                            <span>Share</span>
                        </span>
                        <ul className="social-icons list-unstyled mb-0 d-flex align-items-center">
                            
                            <li className="share-facebook">
                            
                            <a
                                target="_blank"
                                href="http://www.facebook.com/sharer.php?u=https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#comment-61&t=Yes%2C+I+understand+it.+I+hear+a+lot+of+this+incorrect+grammar+from+my+wife.+I+would+expect+that+the+person+that+spoke+this+was+possibly+Chinese.+In+Chinese+there"
                            >
                                
                                <i className="icon-facebook" />
                                <span>
                                Share on <span>Facebook</span>
                                </span>
                            </a>
                            </li>
                            <li className="share-twitter">
                            
                            <a
                                target="_blank"
                                href="http://twitter.com/share?text=Yes%2C+I+understand+it.+I+hear+a+lot+of+this+incorrect+grammar+from+my+wife.+I+would+expect+that+the+person+that+spoke+this+was+possibly+Chinese.+In+Chinese+there&url=https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#comment-61"
                            >
                                
                                <i className="icon-twitter" />
                                <span>Share on Twitter</span>
                            </a>
                            </li>
                            <li className="share-linkedin">
                            
                            <a
                                target="_blank"
                                href="http://www.linkedin.com/shareArticle?mini=true&url=https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#comment-61&title=Yes%2C+I+understand+it.+I+hear+a+lot+of+this+incorrect+grammar+from+my+wife.+I+would+expect+that+the+person+that+spoke+this+was+possibly+Chinese.+In+Chinese+there"
                            >
                                
                                <i className="icon-linkedin" />
                                <span>Share on LinkedIn</span>
                            </a>
                            </li>
                            <li className="share-whatsapp">
                            
                            <a
                                target="_blank"
                                href="https://api.whatsapp.com/send?text=Yes%2C+I+understand+it.+I+hear+a+lot+of+this+incorrect+grammar+from+my+wife.+I+would+expect+that+the+person+that+spoke+this+was+possibly+Chinese.+In+Chinese+there - https://2code.info/demo/themes/Discy/Main/question/is-this-statement-i-see-him-last-night-can-be-understood-as-i-saw-him-last-night/#comment-61"
                            >
                                
                                <i className="fab fa-whatsapp" />
                                <span>Share on WhatsApp</span>
                            </a>
                            </li>
                        </ul>
                        </div>
                    </li>
                    <li className="question-list-details comment-list-details">
                        
                        <i className="icon-dot-3" />
                        <ul>
                        
                        <li className="report_activated">
                            <a className="report_c" href="/">
                            <i className="icon-attention" />
                            Report
                            </a>
                        </li>
                        </ul>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="clearfix" />
            </div>
        </div>
    </li>
    )
}