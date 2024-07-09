import * as React from 'react';
import { LostPasswordPanel } from 'app/components/LostPasswordPanel';
import SignInPanel from 'app/components/SignInPanel';
import { getAuth } from 'app/components/SignInPanel/slice/selectors';
import SignUpPanel from 'app/components/SignUpPanel';
import WrapPop from 'app/components/WrapPop';
import { useAppSelector } from 'store/hooks';
import Header from 'app/components/Header';
import CallAction from 'app/components/CallAction';
import { GlobalStyle } from 'styles/global-styles';
import MainContent from 'app/components/MainContent';
import Footer from 'app/components/Footer';
import { AskQuestionPanel } from 'app/components/AskQuestionPanel';
import ProfileCover from 'app/components/ProfileCover';
import { useLocation } from 'react-router-dom';
import CreateReportForm from 'app/components/CreateReportForm';

function MainPage(): React.ReactElement {
  const firstUpdate = React.useRef(true);
  const { user } = useAppSelector(getAuth);
  const location = useLocation();
  const [path, setPath] = React.useState(location.pathname);
  const inProfileSection = 
    path !== '/home/profile/password' && 
    path !== '/home/profile/edit' &&
    path.includes('/home/profile');

    React.useEffect(() => {
      if (firstUpdate.current && process.env.NODE_ENV === 'development') {
        firstUpdate.current = false;
        return;
      }
  
      setPath(location.pathname);
      window.scrollTo(0, 0);
    }, [location]);
  
  return (
    <div id="wrap" className={user ? 'wrap-login' : 'wrap-not-login'}>
      <WrapPop />
      <Header />
      {!user && <><SignInPanel /><SignUpPanel /><LostPasswordPanel /></>}
      {!user && !inProfileSection && <CallAction />}
      {inProfileSection && <ProfileCover />}
      <AskQuestionPanel />
      <CreateReportForm />
      <MainContent />
      <Footer />
      <GlobalStyle />
    </div>
  );
}

export default MainPage;
