import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAuth } from '../SignInPanel/slice/selectors';
import { panelActions } from '../SignUpPanel/slice';
import { panelName } from '../SignUpPanel/slice/types';
import { AlertActions } from '../AuthMessage/slice';
import { Link, Outlet, useLocation, useOutlet } from 'react-router-dom';
import InitialSection from '../InitialSection';
import { countUserAnswers } from 'services/answer.service';
import { countUserQuestions } from 'services/question.service';
import RightSideBar from '../RightSideBar';
import LeftSideBarQuestion from '../LeftSideBarQuestion';

enum Tabs {
  HOME = 0,
  PROFILE = 1,
  NOTIFICATION = 2,
}

export default function DisplayContent() {
    const outlet = useOutlet();
    const { user } = useAppSelector(getAuth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(Tabs.HOME);
    const [questionsCount, setQuestionsCount] = useState(0);
    const [answersCount, setAnswersCount] = useState(0);
  
    const loadStatics = async (userId: string) => {
      setAnswersCount(await countUserAnswers(userId));
      setQuestionsCount(await countUserQuestions(userId));
    }

    const handleAskQuestionClick = e => {
        e.preventDefault();
        if (user) {
          dispatch(panelActions.openPanel(panelName.ASK_QUESTION));
        } else {
          dispatch(
            AlertActions.setAuthMessage({
              error: 'Bạn vui lòng đăng nhập để tiếp tục được đặt câu hỏi',
            }),
          );
          dispatch(panelActions.openPanel(panelName.SIGN_IN));
        }
    };

    const isActiveTab = thisTab => {
      if (thisTab === activeTab) {
        return 'current_page_item current-menu-item';
      } return '';
    }

    useEffect(() => {
      if (location.pathname.includes(`/home/profile/${user?.id}/notifications`))  { 
        setActiveTab(Tabs.NOTIFICATION);
      } else
      if (location.pathname.includes('/home/profile'))  { 
        setActiveTab(Tabs.PROFILE);
      } else
      if (location.pathname.includes('/home')) {
        setActiveTab(Tabs.HOME);
      }
      if (user) loadStatics(user.id);
    }, [location, user])

    return (
        <>
          <div
            className="discy-inner-content menu_sidebar"
            style={{ minHeight: 'calc(-487.571px + 100vh)' }}
          >
            <div
              className="the-main-container "
              style={{ minHeight: 'calc(-487.571px + 100vh)' }}
            >
                        <main
                className="all-main-wrap discy-site-content float_l"
              >
              <div className="the-main-inner float_l">

                  {outlet ? (
                    <Outlet />
                  ) : <InitialSection />}
                  </div>
                  <aside
                    className="sidebar sidebar-width float_l fixed-sidebar"
                    style={{ position:'sticky', top: '0' }}
                  >

                      <h3 className="screen-reader-text">Sidebar</h3>
                      <RightSideBar />
                  </aside>
              </main>
              <nav
                className="nav_menu float_r fixed_nav_menu"
                style={{position: 'sticky', top: '-25px' }} 

              >
                  <h3 className="screen-reader-text">Explore</h3>
                  <ul id="menu-explore-not-login" className="menu">
                    <li className={"menu-item menu-item-type-post_type menu-item-object-page menu-item-home page_item page-item-64 menu-item-128" + " " + isActiveTab(Tabs.HOME)}>
                      <Link to="/home">
                        <i className="icon-home" />
                        Trang chủ
                      </Link>
                    </li>
                    {user && 
                      <li className={"wpqa-menu wpqa-profile-nav menu-item menu-item-type-custom menu-item-object-custom menu-item-91 li-profile" + " " + isActiveTab(Tabs.PROFILE)}>
                        <Link to={`/home/profile/${user.id}`}>
                          <i className="icon-vcard"></i>
                          Thông tin cá nhân
                        </Link>
                      </li>
                    }
                    <LeftSideBarQuestion />
                    {user && 
                      <li className={"wpqa-menu wpqa-poll-nav menu-item menu-item-type-custom menu-item-object-custom menu-item-135 li-poll" + " " + isActiveTab(Tabs.NOTIFICATION)}>
                        <Link to={`/home/profile/${user?.id}/notifications`}>
                          <i className="icon-megaphone" />
                          Thông báo
                        </Link>
                      </li>
                    }
                  </ul>
              </nav>
            </div>
          </div>
        </>
    )
}