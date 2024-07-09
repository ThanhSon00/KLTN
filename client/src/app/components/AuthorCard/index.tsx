import { Link } from "react-router-dom";
import { Avatar } from "../ReportLine";
import { User } from "../SignInPanel/slice/types";

interface Props {
    author: User;
}

export default function AuthorCard(props: Props) {
    return (
        <div
        className="author-image-pop-2 member-card"
      >
        <div className="post-section user-area user-area-columns_pop him-user widget-not-icon-user">
          <div className="post-inner member__info community__info">
            <div className="author-image author__avatar author-image-70">
                <Link to={`/home/profile/${props.author.id}`}>
                    <span className="author-image-span">
                    <img
                        className="avatar avatar-70 rounded-circle photo"
                        title={props.author.name}
                        src={props.author.avatar ? `${process.env.REACT_APP_SERVER_ORIGIN}${props.author.avatar}` : Avatar.anonymous}
                        style={{ maxBlockSize: "64px", minWidth: "64px", minHeight: "64px" }}
                    />
                    </span>
                </Link>
            </div>
            <div className="user-content">
              <div className="user-inner">
                <div className="user-data-columns">
                  <h4 className="member__name mb-1">
                    <Link to={`/home/profile/${props.author.id}`}>
                      {props.author.name}
                    </Link>
                  </h4>
                  <div className="user-data">
                    <ul>
                        {props.author.city && 
                            <li className="city-country">
                                <i className="icon-location" />
                                {props.author.city}
                            </li>
                        }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* End user-content */}
            <div className="user-columns-data">
              <ul className="member__stats list-unstyled mb-0 d-flex">
                <li className="user-columns-questions stats__item">
                  <Link to={`/home/profile/${props.author.id}/questions`}>
                    <i className="icon-book-open" style={{ width: "14px", "height": "14px" }}/>
                    <span className="stats__count">
                      {props.author.questions}
                    </span>
                    <span className="stats__text">
                      {' '}Câu hỏi
                    </span>
                  </Link>
                </li>
                <li className="user-columns-answers stats__item">
                  <Link to={`/home/profile/${props.author.id}/answers`}>
                    <i className="icon-comment" style={{ width: "14px", "height": "14px" }}/>
                    <span className="stats__count">
                      {props.author.answers}
                    </span>
                    <span className="stats__text">
                    {' '}Trả lời
                    </span>
                  </Link>
                </li>
                <li className="user-columns-best-answers stats__item">
                  <a href="/">
                    <i className="icon-graduation-cap" style={{ width: "14px", "height": "14px" }}/>
                    <span className="stats__count">
                      0
                    </span>
                    <span className="stats__text">
                    {' '}Trả lời tốt nhất
                    </span>
                  </a>
                </li>
                <li className="user-columns-points stats__item">
                  <a href="/">
                    <i className="icon-bucket" style={{ width: "14px", "height": "14px" }}/>
                    <span className="stats__count">
                      {props.author.points}
                    </span>
                    <span className="stats__text">
                    {' '}Điểm
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            {/* End user-columns-data */}
            <div className="user-follow-profile">
              <div className="member__actions d-flex justify-content-between">
                <Link className="btn btn__semi__height btn__primary" to={`/home/profile/${props.author.id}`}>
                    Xem trang cá nhân
                </Link>
              </div>
            </div>
            {/* End user-follow-profile */}
            <div className="clearfix" />
          </div>
          {/* End post-inner */}
        </div>
        {/* End post */}
      </div>
    )
}