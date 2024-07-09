import { getAuth } from "app/components/SignInPanel/slice/selectors";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import load from "load-script"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Notification from "app/components/Notification";
import { selectAdmin } from "app/components/AdminLogin/slice/selectors";
import { Admin } from "app/components/AdminLogin/slice/types";
import { AdminActions } from "app/components/AdminLogin/slice";
import { selectPanelState } from "app/components/SignUpPanel/slice/selectors";
import { panelName } from "app/components/SignUpPanel/slice/types";
import { adminLogout } from "services/auth.service";

enum SideMenuState {
    Open = "open",
    Close = "close",
}

enum TabType {
  Dashboard = "dashboard",
  Report = "report",
}
  
export default function AdminSite() {
  const navigate = useNavigate();
  const { popUp } = useAppSelector(selectPanelState)
  const [activeTab, setActiveTab] = useState<TabType>(TabType.Dashboard);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const firstUpdate = useRef(true);
  const { admin: user } = useAppSelector(selectAdmin);
  const [sideMenuState, setSideMenuState] = useState<SideMenuState>(SideMenuState.Open);
  const [subMenuDropdownState, setSubMenuDropdownState] = useState<boolean>(false);
  const handleChangeSideMenuClick = (e) => {
      e.preventDefault();
      const revertState = sideMenuState === SideMenuState.Open ? SideMenuState.Close : SideMenuState.Open;
      setSideMenuState(revertState);
  }

  const handleAvatarClick = (e) => {
    e.preventDefault();
    setSubMenuDropdownState(!subMenuDropdownState);
  }

  const isActiveTab = (type: TabType) => {
    return type === activeTab ? " active" : "";
  }

  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch(adminLogout());
  }
  // const emptyFunction = () => { };
  // const scripts = [
  //   // 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js'
  //   // '/scripts/jquery.min.js', '/scripts/popper.js', '/scripts/jquery.blockui.min.js', '/scripts/jquery.slimscroll.js', '/scripts/feather.min.js', '/scripts/bootstrap.min.js', '/scripts/bootstrap-switch.min.js', '/scripts/jquery.waypoints.min.js', '/scripts/jquery.counterup.min.js', '/scripts/app.js', '/scripts/layout.js', '/scripts/theme-color.js', '/scripts/material.min.js', '/scripts/index.js', '/scripts/xy.js', '/scripts/Animated.js', '/scripts/home-data2.js', '/scripts/jquery.sparkline.js', '/scripts/sparkline-data.js'
  // ];
  

  useEffect(() => {
      if (firstUpdate.current && process.env.NODE_ENV === 'development') {
          firstUpdate.current = false;
          return;
      }

      // for (const script of scripts) {
      //     load(script, { async: false } , emptyFunction);
      // }

      if (location.pathname === "/admin/dashboard") {
        setActiveTab(TabType.Dashboard);
      } else if (location.pathname === "/admin/report") {
        setActiveTab(TabType.Report);
      }

      if (user) return;
      
      verfiyAdmin().then(admin => {
        dispatch(AdminActions.setAdmin(admin));
      }).catch(() => {
        navigate("/admin/login");
      });      
  }, [location, user])
      
  return (        
  <div className={"page-header-fixed sidemenu-closed-hidelogo page-content-white page-md header-white white-sidebar-color logo-indigo" + (sideMenuState === SideMenuState.Open ? "" : " sidemenu-closed")}>
    <div className="page-wrapper">
      {/* start header */}
      <div className="page-header navbar navbar-fixed-top">
        <div className="page-header-inner ">
          {/* logo start */}
          <div className="page-logo">
            <a href="https://www.einfosoft.com/templates/admin/smart/source/light/index.html">
              <span className="logo-icon material-icons fa-rotate-45">
                school
              </span>
              <span className="logo-default">HCMUTE</span>{" "}
            </a>
          </div>
          {/* logo end */}
          <ul className="nav navbar-nav navbar-left in">
            <li>
              <a
                href="#"
                className="menu-toggler sidebar-toggler"
                onClick={handleChangeSideMenuClick}
              >
                <i className="icon-menu" />
              </a>
            </li>
          </ul>
          <form
            className="search-form-opened"
            action="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard2.html#"
            method="GET"
          >
            <div className="input-group" style={{ display: 'none' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm..."
                name="query"
              />
              <span className="input-group-btn">
                <a href="/" className="btn submit">
                  <i className="icon-magnifier" />
                </a>
              </span>
            </div>
          </form>
          {/* start mobile menu */}
          <a
            className="menu-toggler responsive-toggler"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
          >
            <span />
          </a>
          {/* end mobile menu */}
          {/* start header menu */}
          <div className="top-menu">
            <ul className="nav navbar-nav pull-right">
              <li className="dropdown dropdown-user">
                <a
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  data-hover="dropdown"
                  data-close-others="true"
                  onClick={handleAvatarClick}
                >
                  <img
                    alt=""
                    className="img-circle "
                    style={{ maxBlockSize: "29px", minWidth: "29px" }}
                    src={ `${process.env.REACT_APP_SERVER_ORIGIN}${user?.avatar}` }
                  />
                  <span className="username username-hide-on-mobile"> {user?.name}</span>
                </a>
                <ul className={"dropdown-menu dropdown-menu-default" + (subMenuDropdownState ? " show" : "")}>
                  <li>
                    <a href="/" onClick={handleLogoutClick}>
                      <i className="icon-logout" /> Đăng xuất {" "}
                    </a>
                  </li>
                </ul>
              </li>
              {/* end manage user dropdown */}
            </ul>
          </div>
        </div>
      </div>
      {/* end header */}
      {/* start color quick setting */}
      {/* end color quick setting */}
      {/* start page container */}
      <div className="page-container">
        {/* start sidebar menu */}
        <div className="sidebar-container">
          <div className="sidemenu-container navbar-collapse collapse fixed-menu">
            <div id="remove-scroll" className="left-sidemenu">
              <div
                className="slimScrollDiv"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "auto",
                  height: 1107
                }}
              >
                <ul
                  className={"sidemenu  page-header-fixed slimscroll-style" + (sideMenuState === SideMenuState.Open ? "" : " sidemenu-closed")}
                  data-keep-expanded="false"
                  data-auto-scroll="true"
                  data-slide-speed={200}
                  style={{
                    paddingTop: 20,
                    overflow: "hidden",
                    width: "auto",
                    height: 1107
                  }}
                >
                  <li className="sidebar-toggler-wrapper hide">
                    <div className="sidebar-toggler">
                      <span />
                    </div>
                  </li>
                  <li className="sidebar-user-panel">
                    <div className="sidebar-user">
                      <div className="sidebar-user-picture">
                        <img
                          alt="image"
                          style={{ maxBlockSize: "70px", maxWidth: "70px", maxHeight: "70px" }}
                          src={ `${process.env.REACT_APP_SERVER_ORIGIN}${user?.avatar}` }
                        />
                      </div>
                      <div className="sidebar-user-details">
                        <div className="user-name">{user?.name}</div>
                        <div className="user-role">Người quản lý</div>
                      </div>
                    </div>
                  </li>
                  <li className={"nav-item" + isActiveTab(TabType.Dashboard)}>
                    <Link to="/admin/dashboard" className="nav-link nav-toggle">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-airplay"
                        >
                          <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                          <polygon points="12 15 17 21 7 21 12 15" />
                        </svg>
                        <span className="title"> Bảng thống kê</span>
                        <span className="selected" />
                    </Link>
                  </li>
                  <li className={"nav-item" + isActiveTab(TabType.Report)}>
                    <Link to="/admin/report" className="nav-link nav-toggle">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-calendar"
                        >
                          <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                          <line x1={16} y1={2} x2={16} y2={6} />
                          <line x1={8} y1={2} x2={8} y2={6} />
                          <line x1={3} y1={10} x2={21} y2={10} />
                      </svg>
                      <span className="title">Quản lý báo cáo</span>
                      <span className="selected" />
                    </Link>
                  </li>

                </ul>
                <div
                  className="slimScrollBar"
                  style={{
                    background: "rgb(158, 165, 171)",
                    width: 5,
                    position: "absolute",
                    top: 0,
                    opacity: "0.4",
                    display: "none",
                    borderRadius: 7,
                    zIndex: 99,
                    right: 1,
                    height: "786.048px"
                  }}
                />
                <div
                  className="slimScrollRail"
                  style={{
                    width: 5,
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    display: "none",
                    borderRadius: 7,
                    background: "rgb(51, 51, 51)",
                    opacity: "0.2",
                    zIndex: 90,
                    right: 1
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* end sidebar menu */}
        {/* start page content */}
        <div className="page-content-wrapper">
          <Outlet />
        </div>
        {/* end page content */}
        {/* start chat sidebar */}
        <div className="chat-sidebar-container" data-close-on-body-click="false">
          <div className="chat-sidebar">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  href="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard2.html#quick_sidebar_tab_1"
                  className="nav-link active tab-icon"
                  data-bs-toggle="tab"
                  aria-selected="true"
                  role="tab"
                >
                  {" "}
                  <i className="material-icons">chat</i>Chat
                  <span className="badge badge-danger">4</span>
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  href="https://www.einfosoft.com/templates/admin/smart/source/light/dashboard2.html#quick_sidebar_tab_3"
                  className="nav-link tab-icon"
                  data-bs-toggle="tab"
                  aria-selected="false"
                  tabIndex={-1}
                  role="tab"
                >
                  {" "}
                  <i className="material-icons">settings</i>
                  Settings
                </a>
              </li>
            </ul>
            <div className="tab-content">
              {/* Start User Chat */}
              <div
                className="tab-pane active chat-sidebar-chat in active show"
                role="tabpanel"
                id="quick_sidebar_tab_1"
              >
                <div className="chat-sidebar-list">
                  <div
                    className="slimScrollDiv"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "auto",
                      height: 1107
                    }}
                  >
                    <div
                      className="chat-sidebar-chat-users slimscroll-style"
                      data-rail-color="#ddd"
                      data-wrapper-class="chat-sidebar-list"
                      style={{ overflow: "hidden", width: "auto", height: 1107 }}
                    >
                      <div className="chat-header">
                        <h5 className="list-heading">Online</h5>
                      </div>
                      <ul className="media-list list-items">
                        <li className="media">
                          <img
                            className="media-object"
                            src="./images/user3.jpg"
                            width={35}
                            height={35}
                            alt="..."
                          />
                          <i className="online dot" />
                          <div className="media-body">
                            <h5 className="media-heading">John Deo</h5>
                            <div className="media-heading-sub">Spine Surgeon</div>
                          </div>
                        </li>
                        <li className="media">
                          <div className="media-status">
                            <span className="badge badge-success">5</span>
                          </div>{" "}
                          <img
                            className="media-object"
                            src="./images/user1.jpg"
                            width={35}
                            height={35}
                            alt="..."
                          />
                          <i className="busy dot" />
                          <div className="media-body">
                            <h5 className="media-heading">Rajesh</h5>
                            <div className="media-heading-sub">Director</div>
                          </div>
                        </li>
                        <li className="media">
                          <img
                            className="media-object"
                            src="./images/user5.jpg"
                            width={35}
                            height={35}
                            alt="..."
                          />
                          <i className="away dot" />
                          <div className="media-body">
                            <h5 className="media-heading">Jacob Ryan</h5>
                            <div className="media-heading-sub">Ortho Surgeon</div>
                          </div>
                        </li>
                        <li className="media">
                          <div className="media-status">
                            <span className="badge badge-danger">8</span>
                          </div>{" "}
                          <img
                            className="media-object"
                            src="./images/user4.jpg"
                            width={35}
                            height={35}
                            alt="..."
                          />
                          <i className="online dot" />
                          <div className="media-body">
                            <h5 className="media-heading">Kehn Anderson</h5>
                            <div className="media-heading-sub">CEO</div>
                          </div>
                        </li>
                        <li className="media">
                          <img
                            className="media-object"
                            src="./images/user2.jpg"
                            width={35}
                            height={35}
                            alt="..."
                          />
                          <i className="busy dot" />
                          <div className="media-body">
                            <h5 className="media-heading">Sarah Smith</h5>
                            <div className="media-heading-sub">Anaesthetics</div>
                          </div>
                        </li>
                        <li className="media">
                          <img
                            className="media-object"
                            src="./images/user7.jpg"
                            width={35}
                            height={35}
                            alt="..."
                          />
                          <i className="online dot" />
                          <div className="media-body">
                            <h5 className="media-heading">Vlad Cardella</h5>
                            <div className="media-heading-sub">Cardiologist</div>
                          </div>
                        </li>
                      </ul>
                      <div className="chat-header">
                        <h5 className="list-heading">Offline</h5>
                      </div>
                      <ul className="media-list list-items">
                        <li className="media">
                          <div className="media-status">
                            <span className="badge badge-warning">4</span>
                          </div>{" "}
                          <img
                            className="media-object"
                            src="./images/user6.jpg"
                            width={35}
                            height={35}
                            alt="..."
                          />
                          <i className="offline dot" />
                          <div className="media-body">
                            <h5 className="media-heading">Jennifer Maklen</h5>
                            <div className="media-heading-sub">Nurse</div>
                            <div className="media-heading-small">
                              Last seen 01:20 AM
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <img
                            className="media-object"
                            src="./images/user8.jpg"
                            width={35}
                            height={35}
                            alt="..."
                          />
                          <i className="offline dot" />
                          <div className="media-body">
                            <h5 className="media-heading">Lina Smith</h5>
                            <div className="media-heading-sub">Ortho Surgeon</div>
                            <div className="media-heading-small">
                              Last seen 11:14 PM
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <div className="media-status">
                            <span className="badge badge-success">9</span>
                          </div>{" "}
                          <img
                            className="media-object"
                            src="./images/user9.jpg"
                            width={35}
                            height={35}
                            alt="..."
                          />
                          <i className="offline dot" />
                          <div className="media-body">
                            <h5 className="media-heading">Jeff Adam</h5>
                            <div className="media-heading-sub">Compounder</div>
                            <div className="media-heading-small">
                              Last seen 3:31 PM
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <img
                            className="media-object"
                            src="./images/user10.jpg"
                            width={35}
                            height={35}
                            alt="..."
                          />
                          <i className="offline dot" />
                          <div className="media-body">
                            <h5 className="media-heading">Anjelina Cardella</h5>
                            <div className="media-heading-sub">
                              Physiotherapist
                            </div>
                            <div className="media-heading-small">
                              Last seen 7:45 PM
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="slimScrollBar"
                      style={{
                        background: "rgb(158, 165, 171)",
                        width: 5,
                        position: "absolute",
                        top: 0,
                        opacity: "0.4",
                        display: "none",
                        borderRadius: 7,
                        zIndex: 99,
                        right: 1,
                        height: 1107
                      }}
                    />
                    <div
                      className="slimScrollRail"
                      style={{
                        width: 5,
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        display: "none",
                        borderRadius: 7,
                        background: "rgb(51, 51, 51)",
                        opacity: "0.2",
                        zIndex: 90,
                        right: 1
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* End User Chat */}
              {/* Start Setting Panel */}
              <div
                className="tab-pane chat-sidebar-settings"
                role="tabpanel"
                id="quick_sidebar_tab_3"
              >
                <div
                  className="slimScrollDiv"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    width: "auto",
                    height: 1107
                  }}
                >
                  <div
                    className="chat-sidebar-settings-list slimscroll-style"
                    data-height="NaN"
                    style={{ height: 1107, overflow: "hidden", width: "auto" }}
                  >
                    <div className="chat-header">
                      <h5 className="list-heading">Layout Settings</h5>
                    </div>
                    <div className="chatpane inner-content ">
                      <div className="settings-list">
                        <div className="setting-item">
                          <div className="setting-text">Sidebar Position</div>
                          <div className="setting-set">
                            <select className="sidebar-pos-option form-control input-inline input-sm input-small ">
                              <option value="left">
                                Left
                              </option>
                              <option value="right">Right</option>
                            </select>
                          </div>
                        </div>
                        <div className="setting-item">
                          <div className="setting-text">Header</div>
                          <div className="setting-set">
                            <select className="page-header-option form-control input-inline input-sm input-small ">
                              <option value="fixed">
                                Fixed
                              </option>
                              <option value="default">Default</option>
                            </select>
                          </div>
                        </div>
                        <div className="setting-item">
                          <div className="setting-text">Footer</div>
                          <div className="setting-set">
                            <select className="page-footer-option form-control input-inline input-sm input-small ">
                              <option value="fixed">Fixed</option>
                              <option value="default">
                                Default
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="chat-header">
                        <h5 className="list-heading">Account Settings</h5>
                      </div>
                      <div className="settings-list">
                        <div className="setting-item">
                          <div className="setting-text">Notifications</div>
                          <div className="setting-set">
                            <div className="switch">
                              <label
                                className="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-checked is-upgraded"
                                htmlFor="switch-1"
                                data-upgraded=",MaterialSwitch,MaterialRipple"
                              >
                                <input
                                  type="checkbox"
                                  id="switch-1"
                                  className="mdl-switch__input"
                                  
                                />
                                <div className="mdl-switch__track" />
                                <div className="mdl-switch__thumb">
                                  <span className="mdl-switch__focus-helper" />
                                </div>
                                <span
                                  className="mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center"
                                  data-upgraded=",MaterialRipple"
                                >
                                  <span className="mdl-ripple" />
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="setting-item">
                          <div className="setting-text">Show Online</div>
                          <div className="setting-set">
                            <div className="switch">
                              <label
                                className="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-checked is-upgraded"
                                htmlFor="switch-7"
                                data-upgraded=",MaterialSwitch,MaterialRipple"
                              >
                                <input
                                  type="checkbox"
                                  id="switch-7"
                                  className="mdl-switch__input"
                                  
                                />
                                <div className="mdl-switch__track" />
                                <div className="mdl-switch__thumb">
                                  <span className="mdl-switch__focus-helper" />
                                </div>
                                <span
                                  className="mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center"
                                  data-upgraded=",MaterialRipple"
                                >
                                  <span className="mdl-ripple" />
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="setting-item">
                          <div className="setting-text">Status</div>
                          <div className="setting-set">
                            <div className="switch">
                              <label
                                className="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-checked is-upgraded"
                                htmlFor="switch-2"
                                data-upgraded=",MaterialSwitch,MaterialRipple"
                              >
                                <input
                                  type="checkbox"
                                  id="switch-2"
                                  className="mdl-switch__input"
                                  
                                />
                                <div className="mdl-switch__track" />
                                <div className="mdl-switch__thumb">
                                  <span className="mdl-switch__focus-helper" />
                                </div>
                                <span
                                  className="mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center"
                                  data-upgraded=",MaterialRipple"
                                >
                                  <span className="mdl-ripple" />
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="setting-item">
                          <div className="setting-text">2 Steps Verification</div>
                          <div className="setting-set">
                            <div className="switch">
                              <label
                                className="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-checked is-upgraded"
                                htmlFor="switch-3"
                                data-upgraded=",MaterialSwitch,MaterialRipple"
                              >
                                <input
                                  type="checkbox"
                                  id="switch-3"
                                  className="mdl-switch__input"
                                  
                                />
                                <div className="mdl-switch__track" />
                                <div className="mdl-switch__thumb">
                                  <span className="mdl-switch__focus-helper" />
                                </div>
                                <span
                                  className="mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center"
                                  data-upgraded=",MaterialRipple"
                                >
                                  <span className="mdl-ripple" />
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="chat-header">
                        <h5 className="list-heading">General Settings</h5>
                      </div>
                      <div className="settings-list">
                        <div className="setting-item">
                          <div className="setting-text">Location</div>
                          <div className="setting-set">
                            <div className="switch">
                              <label
                                className="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-checked is-upgraded"
                                htmlFor="switch-4"
                                data-upgraded=",MaterialSwitch,MaterialRipple"
                              >
                                <input
                                  type="checkbox"
                                  id="switch-4"
                                  className="mdl-switch__input"
                                  
                                />
                                <div className="mdl-switch__track" />
                                <div className="mdl-switch__thumb">
                                  <span className="mdl-switch__focus-helper" />
                                </div>
                                <span
                                  className="mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center"
                                  data-upgraded=",MaterialRipple"
                                >
                                  <span className="mdl-ripple" />
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="setting-item">
                          <div className="setting-text">Save Histry</div>
                          <div className="setting-set">
                            <div className="switch">
                              <label
                                className="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-checked is-upgraded"
                                htmlFor="switch-5"
                                data-upgraded=",MaterialSwitch,MaterialRipple"
                              >
                                <input
                                  type="checkbox"
                                  id="switch-5"
                                  className="mdl-switch__input"
                                  
                                />
                                <div className="mdl-switch__track" />
                                <div className="mdl-switch__thumb">
                                  <span className="mdl-switch__focus-helper" />
                                </div>
                                <span
                                  className="mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center"
                                  data-upgraded=",MaterialRipple"
                                >
                                  <span className="mdl-ripple" />
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="setting-item">
                          <div className="setting-text">Auto Updates</div>
                          <div className="setting-set">
                            <div className="switch">
                              <label
                                className="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-checked is-upgraded"
                                htmlFor="switch-6"
                                data-upgraded=",MaterialSwitch,MaterialRipple"
                              >
                                <input
                                  type="checkbox"
                                  id="switch-6"
                                  className="mdl-switch__input"
                                  
                                />
                                <div className="mdl-switch__track" />
                                <div className="mdl-switch__thumb">
                                  <span className="mdl-switch__focus-helper" />
                                </div>
                                <span
                                  className="mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center"
                                  data-upgraded=",MaterialRipple"
                                >
                                  <span className="mdl-ripple" />
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="slimScrollBar"
                    style={{
                      background: "rgb(158, 165, 171)",
                      width: 5,
                      position: "absolute",
                      top: 0,
                      opacity: "0.4",
                      display: "none",
                      borderRadius: 7,
                      zIndex: 99,
                      right: 1
                    }}
                  />
                  <div
                    className="slimScrollRail"
                    style={{
                      width: 5,
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      display: "none",
                      borderRadius: 7,
                      background: "rgb(51, 51, 51)",
                      opacity: "0.2",
                      zIndex: 90,
                      right: 1
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end chat sidebar */}
      </div>
      {/* end page container */}
      {/* start footer */}
      {/* end footer */}
    </div>

    {popUp === panelName.SOLUTION && <div className="modal-backdrop fade show" />}
  </div>)
}

async function verfiyAdmin(): Promise<Admin> {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v2/auth/who-am-i`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const jsonObj = await response.json();
  const myPromise: Promise<Admin> = new Promise((resolve, reject) => {
    if (response.ok && response.status !== 204) {
      resolve(jsonObj);
    } /*if (response.status === 204) */ else {
      reject();
    }
  });
  return myPromise;
}
