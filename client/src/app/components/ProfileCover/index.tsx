import { useAppDispatch, useAppSelector } from "store/hooks"
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { countUserQuestions } from "services/question.service";
import { ReportActions } from "../CreateReportForm/slice";
import { ReportedType } from "services/report.service";
import { panelName } from "../SignUpPanel/slice/types";
import { panelActions } from "../SignUpPanel/slice";
import { User } from "../SignInPanel/slice/types";
import { getUser } from "services/user.service";
import { getAuth } from "../SignInPanel/slice/selectors";
import { Avatar } from "../ReportLine";
import { AlertActions } from "../AuthMessage/slice";

export default function ProfileCover() {
    const { user: userLogged } = useAppSelector(getAuth);
    const location = useLocation();
    const { id } = useParams();
    const [user, setUser] = useState<User>();
    const [questionsCount, setQuestionCount] = useState(0);
    const dispatch = useAppDispatch();
    const loadData = async (userId: string) => {
      const result = await countUserQuestions(userId);
      setQuestionCount(result);

      if (userId !== userLogged?.id) {
        const user = await getUser(userId);
        user.avatar &&= `${process.env.REACT_APP_SERVER_ORIGIN}${user.avatar}`;
        user.cover &&= `${process.env.REACT_APP_SERVER_ORIGIN}${user.cover}`;
        setUser(user);
      } else setUser(userLogged);
    }

    const handleOpenReportClick = (e) => {
      e.preventDefault();
      if (!id) return;
      if (user) {
        dispatch(ReportActions.setReportState({ reportedContentId: id, reportedType: ReportedType.user }));
        dispatch(panelActions.openPanel(panelName.CREATE_REPORT));
      } else {
        dispatch(
          AlertActions.setAuthMessage({
            error: 'Bạn vui lòng đăng nhập để tiếp tục để viết báo cáo',
          }),
        );
        dispatch(panelActions.openPanel(panelName.SIGN_IN));
      }
    };

    useEffect(() => {
      if (id && location.pathname.includes(`/home/profile/${id}`)) loadData(id);
    }, [id])
    return (
        <div className="wpqa-profile-cover wpqa-profile-cover-only wpqa-profile-not-widget">
          <div>
            <div className="wpqa-cover-background" style={ user?.cover ?  { backgroundImage: `url(${user?.cover})` } : {}}>
              <div className="cover-opacity" />
              <div className="wpqa-cover-inner the-main-container container-boot">
                
                <div className="wpqa-cover-content">
                  <div className="post-section user-area user-advanced user-cover">
                    
                    <div className="post-inner">
                      
                      <div className="user-head-area">
                        
                        <div className="author-image author__avatar author-image-84">
                          <a href={`/home/profile/${user?.id}`}>
                            <span className="author-image-span">
                              <img
                                className="avatar avatar-84 rounded-circle photo"
                                alt=""
                                width={84}
                                height={84}
                                style={{ maxBlockSize: "84px" }}
                                src={user?.avatar || Avatar.anonymous}
                              />
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="user-content">
                        <div className="user-inner">
                          <h4>
                            <a href={`/home/profile/${user?.id}`}>{user?.name}</a>
                          </h4>
                          <span
                            className="badge-span"
                            style={{ backgroundColor: "#0d0e11" }}
                          >
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wpqa-cover-right">
                    {userLogged && <>
                      <div className="question-list-details">
                        <i className="icon-dot-3" />
                        <ul className="question-link-list">
                          {userLogged.id === user?.id ? <>
                            <li className="edit-profile-cover">
                              <Link to="/home/profile/edit">
                                <i className="icon-cog" />
                                  Chỉnh sửa thông tin  
                              </Link>  
                            </li>
                          </> : <>
                            <li className="report_activated report-user-li">
                              <a className="report_user" href="/" onClick={handleOpenReportClick}>
                                <i className="icon-flag" />
                                <span>Báo cáo người dùng</span>
                              </a>
                            </li>
                          </>}
                        </ul>
                      </div>
                    </>}
                    <div className="empty-cover-div" />
                    <div className="wpqa-cover-buttons wpqa-cover-visits">
                      <i className="icon-eye" />
                      <span className="cover-count">{user?.views} </span>Lượt xem
                    </div>
                    <div className="wpqa-cover-buttons wpqa-cover-followers">
                      <i className="icon-users" />
                      <span className="cover-count follow-cover-count">0 </span>
                      Người theo dõi
                    </div>
                    <div>
                      <a
                        className="wpqa-cover-buttons wpqa-cover-questions"
                        href="questions/index.html"
                      >
                        <i className="icon-book-open" />
                        <span className="cover-count">{questionsCount}</span>Câu hỏi
                      </a>
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
        </div>
    )
}
  