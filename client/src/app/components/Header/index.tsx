/* eslint-disable no-lone-blocks */
import React from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAuth } from '../SignInPanel/slice/selectors';
import { UserMenu } from '../UserMenu';
import { panelActions } from '../SignUpPanel/slice';
import { panelName } from '../SignUpPanel/slice/types';

function Header() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getAuth);
  return (
    <div className="hidden-header header-dark mobile_bar_active">
      <header
        className="header"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        <div className="the-main-container header-container">
          <div className="mobile-menu">
            <div className="mobile-menu-click" data-menu="mobile-menu-main">
              <i className="icon-menu" />
            </div>
          </div>
          <div className="right-header float_r">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <a
                  title="Sign In"
                  className="sign-in-lock mob-sign-in"
                  href="log-in/index.html"
                  data-toggle="modal"
                >
                  <i className="icon-lock" />
                </a>
                <a
                  className="button-default button-sign-in"
                  href="log-in/index.html"
                  data-toggle="modal"
                  onClick={e => {
                    e.preventDefault();
                    console.log(
                      dispatch(panelActions.openPanel(panelName.SIGN_IN)),
                    );
                  }}
                >
                  Sign In
                </a>
                <a
                  className="button-default-2 button-sign-up"
                  href="signup/index.html"
                  onClick={e => {
                    e.preventDefault();
                    dispatch(panelActions.openPanel(panelName.SIGN_UP));
                  }}
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
          <div className="left-header float_l">
            <h2 className="screen-reader-text site_logo">Discy</h2>
            <a
              className="logo float_l logo-img"
              href="index.html"
              title="Discy"
            >
              <img
                title="Discy"
                height={45}
                width={137}
                className="default_screen"
                alt="Discy Logo"
                src={process.env.PUBLIC_URL + '/images/logo.png'}
              />
              <img
                title="Discy"
                height={45}
                width={137}
                className="retina_screen"
                alt="Discy Logo"
                src={process.env.PUBLIC_URL + `/images/logo-2x.png`}
              />
            </a>
            <div className="mid-header float_l">
              <div className="header-search float_r">
                <form
                  role="search"
                  className="searchform main-search-form"
                  method="get"
                  action="https://2code.info/demo/themes/Discy/Main/search/"
                >
                  <div className="search-wrapper">
                    <input
                      type="search"
                      className="live-search live-search-icon"
                      autoComplete="off"
                      placeholder="Type Search Words"
                      name="search"
                      defaultValue="Type something to search"
                    />
                    <div className="loader_2 search_loader" />
                    <div className="search-results results-empty" />
                    <input
                      type="hidden"
                      name="search_type"
                      className="search_type"
                      defaultValue="questions"
                    />
                    <div className="search-click" />
                    <button type="submit" aria-label="Search">
                      <i className="icon-search" />
                    </button>
                  </div>
                </form>
              </div>
              <nav
                className="nav float_l"
                itemScope
                itemType="https://schema.org/SiteNavigationElement"
              >
                <h3 className="screen-reader-text">Discy Navigation</h3>
                <ul id="menu-header" className="menu">
                  <li
                    id="menu-item-75"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-64 current_page_item menu-item-75"
                  >
                    <a href="index.html">Home</a>
                  </li>
                  <li
                    id="menu-item-76"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-76"
                  >
                    <a href="about-us/index.html">About Us</a>
                  </li>
                  <li
                    id="menu-item-77"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-77"
                  >
                    <a href="blog/index.html">Blog</a>
                  </li>
                  <li
                    id="menu-item-78"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-78"
                  >
                    <a href="contact-us/index.html">Contact Us</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className="mobile-bar main-mobile-bar">
        <div className="the-main-container">
          <div className="mobile-bar-content">
            <div className="the-main-container">
              <div className="mobile-bar-search">
                <a href="search/index.html">
                  <i className="icon-search" />
                  Search
                </a>
                <form
                  role="search"
                  method="get"
                  className="searchform main-search-form"
                  action="https://2code.info/demo/themes/Discy/Main/search/"
                >
                  <i className="icon-left-open" />
                  <input
                    type="search"
                    className="live-search"
                    autoComplete="off"
                    name="search"
                    defaultValue="Hit enter to search"
                  />
                  <div className="loader_2 search_loader" />
                  <div className="search-results results-empty" />
                  <input
                    type="hidden"
                    name="search_type"
                    className="search_type"
                    defaultValue="questions"
                  />
                </form>
              </div>
              <div className="mobile-bar-ask">
                <a
                  target="_self"
                  className="wpqa-question"
                  href="add-question/index.html"
                >
                  <i className="icon-help-circled" />
                  Ask A Question
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  setLoginPopUp: PropTypes.func,
};

export default Header;

{
  /* <div>
<A href="https://www.reactboilerplate.com/">
  <Img src={Banner} alt="react-boilerplate - Logo" />
</A>
<NavBar>
  <HeaderLink to="/">
    <FormattedMessage {...messages.home} />
  </HeaderLink>
  <HeaderLink to="/features">
    <FormattedMessage {...messages.features} />
  </HeaderLink>
</NavBar>
</div> */
}
