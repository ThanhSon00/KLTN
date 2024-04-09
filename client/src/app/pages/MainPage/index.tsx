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

function MainPage() {
  const { user } = useAppSelector(getAuth);
  return (
    <div id="wrap" className={user ? 'wrap-login' : 'wrap-not-login'}>
      <WrapPop />
      <AskQuestionPanel />
      {!user && (
        <>
          <SignInPanel />
          <SignUpPanel />
          <LostPasswordPanel />
        </>
      )}

      <Header />
      {!user && <CallAction />}
      <GlobalStyle />
      <MainContent />
      <Footer />
    </div>
  );
}

export default MainPage;
