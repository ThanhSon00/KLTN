import { useEffect, useState } from "react";
import UserAbout from "../UserAbout";
import UserQuestions from "../UserQuestions";
import UserAnswers from "../UserAnswers";
import { Link, useLocation, useParams } from "react-router-dom";
import { User } from "../SignInPanel/slice/types";
import { getUser } from "services/user.service";
import { getAuth } from "../SignInPanel/slice/selectors";
import { useAppSelector } from "store/hooks";
import { AlertMessage } from "../AlertMessage";
import UserNotifications from "../UserNotifications";
import UserNoAnswer from "../UserNoAnswer";

export enum TabName {
    questions = 'questions',
    answers = 'answers',
    about = 'about',
    noAnswer = 'no-answer',
    notifications = 'notifications',
}

interface Props {
    activeTab: TabName;
}

export default function ProfileSection(props: Props) {
    const { id } = useParams();
    const { user: userLogged } = useAppSelector(getAuth);
    const [isHover, setIsHover] = useState(false);
    const [tab, setTab] = useState<string>(props.activeTab);
    const [user, setUser] = useState<User>();
    const openTab = (tabName: TabName) => {
        setTab(tabName);
    }

    const isActiveTab = (tabName: TabName) => {
        if (tab === tabName) {
            return 'active-tab';
        } return '';
    }

    const loadData = async (userId: string) => {
        const user = await getUser(userId);
        user.avatar &&= `${process.env.REACT_APP_SERVER_ORIGIN}${user.avatar}`;
        user.cover &&= `${process.env.REACT_APP_SERVER_ORIGIN}${user.cover}`;
        setUser(user);
    }

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    useEffect(() => {
        if (id) loadData(id);
    }, [id])

    return (
        <>
            <AlertMessage />
            <div className="breadcrumbs d-flex align-items-center justify-content-between w-100 mb-4 breadcrumbs_1">
                <div className="breadcrumbs-wrap d-flex align-items-center justify-content-between w-100">
                
                <div className="breadcrumb-left">
                    <span className="crumbs">
                    
                    <span
                        className="breadcrumb-item"
                        itemScope
                        itemType="https://schema.org/BreadcrumbList"
                    >
                        
                        <span
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                        >
                        <meta itemProp="position" />
                        <Link to="/home">
                            <span itemProp="name">
                                <i className="icon-home font-xl mr-2" />
                                Trang chủ
                            </span>
                        </Link>
                        </span>
                        <span className="crumbs-span">/</span>{user?.name}
                    </span>
                    </span>
                </div>
                <div className="breadcrumb-right d-flex align-items-center">
                    
                    <div className="question-navigation edit-profile">
                        {id === userLogged?.id && <>
                            <Link to="/home/profile/edit">
                                <i className="icon-pencil" />
                                    Chỉnh sửa thông tin
                            </Link>
                        </>}
                    </div>
                    <div className="clearfix" />
                </div>
                </div>
            </div>
            <div className="clearfix" />
            <div className="activate-post-stats page-visits-user" data-id={11718} />
            <div className="wrap-tabs">
                <div className="menu-tabs active-menu">
                    <ul className="menu flex menu-tabs-desktop navbar-nav navbar-secondary">
                        
                        <li className={`menu-item ${isActiveTab(TabName.about)}`}>
                            <Link to={`/home/profile/${user?.id}`} onClick={() => { setTab(TabName.about) }}>
                                Về bản thân
                            </Link>
                        </li>

                        <li className={`menu-item ${isActiveTab(TabName.questions)}`}>
                            <Link to={`/home/profile/${user?.id}/questions`} onClick={() => { setTab(TabName.questions) }}>
                                Danh sách câu hỏi
                            </Link>
                        </li>
                        <li className={`menu-item ${isActiveTab(TabName.answers)}`} onClick={() => { setTab(TabName.answers) }}>
                            <Link to={`/home/profile/${user?.id}/answers`}>
                                Danh sách câu trả lời
                            </Link>
                        </li>
                        {/* <li className="menu-item wpqa-best_answers">
                        
                            <a href="best-answers/index.html"> Best Answers</a>
                        </li> */}

                        <li className={`menu-item ${isActiveTab(TabName.noAnswer)}`} onClick={() => { setTab(TabName.noAnswer) }}>
                            <Link to={`/home/profile/${user?.id}/no-answer`} >
                                Câu hỏi chưa được trả lời
                            </Link>
                        </li>
                        <li className="flexMenu-viewMore">
                        <a href="#" onClick={(e) => { e.preventDefault() }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <i className="icon-dot-3" />
                        </a>
                        <ul
                            className="flexMenu-popup"
                            style={isHover ? { position: "absolute" } : { display: "none", position: "absolute" }}
                            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                        >
                            <li className="menu-item wpqa-asked">
                                <Link to={`/home/profile/${user?.id}/notifications`} onClick={() => {
                                    openTab(TabName.notifications);
                                }}>
                                    Thông báo
                                </Link>
                            </li>
                        </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="wpqa_hide mobile-tabs">
                <span className="styled-select">
                <select className="form-control home_categories">
                    <option value="index.html">About</option>
                    <option value="questions/index.html"> Questions</option>
                    <option value="polls/index.html"> Polls</option>
                    <option value="answers/index.html"> Answers</option>
                    <option value="best-answers/index.html"> Best Answers</option>
                    <option value="asked-questions/index.html">
                    Waiting Questions
                    </option>
                    <option value="asked/index.html"> Asked Questions</option>
                    <option value="followed/index.html"> Followed</option>
                    <option value="favorites/index.html"> Favorites</option>
                    <option value="groups/index.html"> Groups</option>
                    <option value="joined-groups/index.html"> Joined Groups</option>
                    <option value="managed-groups/index.html"> Managed Groups</option>
                    <option value="paid-questions/index.html"> Paid Questions</option>
                    <option value="posts/index.html"> Posts</option>
                    <option value="comments/index.html"> Comments</option>
                    <option value="followers-questions/index.html">
                    Followers Questions
                    </option>
                    <option value="followers-answers/index.html">
                    Followers Answers
                    </option>
                    <option value="followers-posts/index.html">
                    Followers Posts
                    </option>
                    <option value="followers-comments/index.html">
                    Followers Comments
                    </option>
                </select>
                </span>
            </div>
            {tab === TabName.about && user && <UserAbout user={user} />}
            {tab === TabName.questions && user && <UserQuestions user={user}/>}
            {tab === TabName.answers && user && <UserAnswers user={user} />}
            {tab === TabName.noAnswer && user && <UserNoAnswer user={user} />}
            {tab === TabName.notifications && user && <UserNotifications />}
        </>
    )
}
  