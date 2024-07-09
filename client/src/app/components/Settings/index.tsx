import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import React, { useEffect } from "react";

enum SettingsTab {
  profile = 'profile',
  password = 'password'
}

export default function Settings() {
    const { user } = useAppSelector(getAuth);
    const [tab, setTab] = React.useState<SettingsTab>(SettingsTab.profile);
    const location = useLocation();
    
    const isActiveTab = (thisTab: SettingsTab) => {
      if (thisTab === tab) {
        return 'active-tab';
      } return '';
    }

    useEffect(() => {
      if(location.pathname === '/home/profile/edit') {
        setTab(SettingsTab.profile);
      } else 
      if (location.pathname === '/home/profile/password') {
        setTab(SettingsTab.password);
      }
    }, [location]);

    return (
        <div
        className="discy-inner-content main_full main_center col-boot-lg-8"
        style={{ minHeight: 'calc(-487.571px + 100vh)' }}
        >
        <div
          className="the-main-container the-wrap-container"
          style={{ minHeight: 'calc(-487.571px + 100vh)' }}
        >
              <main className="all-main-wrap discy-site-content float_l">
                
                <div className="the-main-inner float_l">
                  
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
                              <meta itemProp="position"/>
                              <Link to="/home">
                                <i className="icon-home font-xl mr-2" /> Trang chủ
                              </Link>
                            </span>
                            <span className="crumbs-span">/</span>
                            <span
                              className="current"
                              itemProp="itemListElement"
                              itemScope
                              itemType="https://schema.org/ListItem"
                            >
                              <meta itemProp="position" />
                              <Link to={`/home/profile/${user?.id}`}>
                                <span itemProp="name">{user?.name}</span>
                              </Link>
                            </span>
                            <span className="crumbs-span">/</span>
                            <span className="current">Chỉnh sửa thông tin</span>
                          </span>
                        </span>
                      </div>
                      <div className="breadcrumb-right d-flex align-items-center">
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="wrap-tabs">
                    <div className="menu-tabs active-menu">
                      <ul className="menu flex menu-tabs-desktop navbar-nav navbar-secondary">
                        
                        <li className={"menu-item menu-item-edit" + " " + isActiveTab(SettingsTab.profile)}>
                          <Link to="/home/profile/edit">
                            Chỉnh sửa thông tin cá nhân
                          </Link>
                        </li>
                        <li className={"menu-item menu-item-password" + " " + isActiveTab(SettingsTab.password)}>
                          <Link to="/home/profile/password">
                            Đổi mật khẩu
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                    <Outlet />
                </div>
                <div className="hide-main-inner" />
              </main>
        </div>
      </div>
    )
}