import { LostPasswordForm } from 'app/components/LostPasswordForm';
import { PanelFooter } from 'app/components/PanelFooter';
import { getAuth } from 'app/components/SignInPanel/slice/selectors';
import { panelActions } from 'app/components/SignUpPanel/slice';
import { selectPanelState } from 'app/components/SignUpPanel/slice/selectors';
import { panelName } from 'app/components/SignUpPanel/slice/types';
import { SigninForm } from 'app/components/SigninForm';
import { SignupForm } from 'app/components/SignupForm';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LandingStyle } from 'styles/landing-styles';

function LandingPage() {
  const origin = window.location.origin.toString();
  const dispatch = useAppDispatch();
  const { popUp } = useAppSelector(selectPanelState);
  const { user } = useAppSelector(getAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    } else dispatch(panelActions.openPanel(panelName.SIGN_IN));
  }, [dispatch, navigate, user]);

  return (
    <>
      <div
        className="discy-custom-width login-page-cover"
        style={{ zIndex: -1 }}
      />
      <div
        className="the-main-container"
        style={{
          display: 'flex',
          flexFlow: 'column',
          height: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <header className="header-login">
          <a
            className="logo float_l logo-img"
            href="https://2code.info/demo/themes/Discy/Try/"
            title="Discy"
          >
            <img
              title="Discy"
              height={45}
              width={137}
              className="default_screen"
              alt="Discy Logo"
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
            />
            <img
              title="Discy"
              height={45}
              width={137}
              className="retina_screen"
              alt="Discy Logo"
              src={`${process.env.PUBLIC_URL}/images/logo-2x.png`}
            />
          </a>
          <nav
            className="nav float_r"
            itemScope
            itemType="https://schema.org/SiteNavigationElement"
          >
            <h3 className="screen-reader-text">Discy Navigation</h3>
            <ul id="menu-company" className="menu">
              <li
                id="menu-item-71"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-71"
              >
                <a href="https://2code.info/demo/themes/Discy/Try/users/">
                  Meet The Team
                </a>
              </li>
              <li
                id="menu-item-72"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-72"
              >
                <a href="https://2code.info/demo/themes/Discy/Try/blog/">
                  Blog
                </a>
              </li>
              <li
                id="menu-item-73"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-73"
              >
                <a href="https://2code.info/demo/themes/Discy/Try/about-us/">
                  About Us
                </a>
              </li>
              <li
                id="menu-item-74"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-74"
              >
                <a href="https://2code.info/demo/themes/Discy/Try/contact-us/">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
          <div className="mobile-menu">
            <div className="mobile-menu-click" data-menu="mobile-menu-main">
              <i className="icon-menu" />
            </div>
          </div>
        </header>
        <aside
          className="mobile-aside mobile-menu-main mobile-menu-wrap gray-mobile-menu"
          data-menu="mobile-menu-main"
        >
          <h3 className="screen-reader-text">Mobile menu</h3>
          <div className="mobile-aside-inner">
            <div className="mobile-aside-inner-inner">
              <a href="/" className="mobile-aside-close">
                <i className="icon-cancel" />
                <span className="screen-reader-text">Close</span>
              </a>
              <div className="mobile-menu-top mobile--top">
                <div className="widget widget_ask">
                  <a
                    target="_self"
                    className="button-default wpqa-question"
                    href="https://2code.info/demo/themes/Discy/Try/add-question/"
                  >
                    Ask A Question
                  </a>
                </div>
              </div>
              <ul id="nav_menu" className="menu">
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-71">
                  <a href="https://2code.info/demo/themes/Discy/Try/users/">
                    Meet The Team
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-72">
                  <a href="https://2code.info/demo/themes/Discy/Try/blog/">
                    Blog
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-73">
                  <a href="https://2code.info/demo/themes/Discy/Try/about-us/">
                    About Us
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-74">
                  <a href="https://2code.info/demo/themes/Discy/Try/contact-us/">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <main className="discy-login-wrap">
          <div className="centered">
            <div className="login-text-col col8">
              <h2>Join the world's biggest Q &amp; A network!</h2>
              <p>
                Login to our social questions &amp; Answers Engine to ask
                questions answer people’s qustions &amp; connect with other
                people.
              </p>
            </div>
            <div className="login-forms-col col4">
              <div className="put-wrap-pop"> </div>
              <div className="panel-login panel-un-login" id="login-panel">
                <div className="pop-border-radius">
                  <div className="pop-header">
                    <h3>
                      {popUp === panelName.SIGN_IN && 'Sign In'}
                      {popUp === panelName.SIGN_UP && 'Sign Up'}
                      {popUp === panelName.LOST_PASSWORD && 'Forgot Password'}
                    </h3>
                  </div>
                  <SignupForm />
                  <SigninForm />
                  <LostPasswordForm />
                </div>
                <PanelFooter />
              </div>
            </div>
          </div>
        </main>
        <footer className="footer-login">
          <p className="copyrights">
            © 2024 Discy. All Rights Reserved
            <br />
            With Love by
            <a href="https://2code.info/" target="_blank" rel="noreferrer">
              2code
            </a>
          </p>
        </footer>
      </div>
      <LandingStyle />
    </>
  );
}

export default memo(LandingPage);
