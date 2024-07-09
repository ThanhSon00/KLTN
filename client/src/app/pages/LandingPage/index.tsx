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
            href="/#/home"
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
          </nav>
          <div className="mobile-menu">
            <div className="mobile-menu-click" data-menu="mobile-menu-main">
              <i className="icon-menu" />
            </div>
          </div>
        </header>
        <main className="discy-login-wrap">
          <div className="centered">
            <div className="login-text-col col8">
              <h2>Hãy tham gia vào mạng lưới hỏi và đáp HCMUTE</h2>
              <p>
                Đăng nhập vào nền tảng câu hỏi và trả lời xã hội của chúng tôi để đặt câu hỏi, trả lời câu hỏi của người khác và kết nối với cộng đồng. 
              </p>
            </div>
            <div className="login-forms-col col4">
              <div className="put-wrap-pop"> </div>
              <div className="panel-login panel-un-login" id="login-panel">
                <div className="pop-border-radius">
                  <div className="pop-header">
                    <h3>
                      {popUp === panelName.SIGN_IN && 'Đăng nhập'}
                      {popUp === panelName.SIGN_UP && 'Đăng ký'}
                      {popUp === panelName.LOST_PASSWORD && 'Quên mật khẩu'}
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
      </div>
      <LandingStyle />
    </>
  );
}

export default memo(LandingPage);
