/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import { useEffect, useRef } from 'react';
import * as React from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAuth } from './components/SignInPanel/slice/selectors';
import { authActions } from './components/SignInPanel/slice';
import { CheckResetPasswordToken } from './components/CheckResetPasswordToken';
import { CheckVerifyEmailToken } from './components/CheckVerifyEmailToken';
import { User } from './components/SignInPanel/slice/types';
import MainPage from './pages/MainPage';
import LandingPage from './pages/LandingPage';
import QuestionDetails from './components/QuestionDetails';
import EditQuestionForm from './components/EditQuestionForm';
import Auth from './components/Auth';
import EditCommentForm from './components/EditCommentForm';
import SearchSection from './components/SearchSection';
export function App() {
  const { user } = useAppSelector(getAuth);
  const dispatch = useAppDispatch();
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current && process.env.NODE_ENV != 'production') {
      firstUpdate.current = false;
      return;
    }

    if (user) return;

    verifyUser()
      .then(user => {
        dispatch(authActions.setUser(user));
      })
      .catch(() => {});
  }, [user, dispatch]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reset-password" element={<CheckResetPasswordToken />} />
        <Route path="/verify-email" element={<CheckVerifyEmailToken />} />

        <Route path="/home" element={<MainPage />}>

          <Route element={<Auth />}>
            <Route path="edit-question/:id" element={<EditQuestionForm />} />
            <Route path="edit-answer/:id/details/:answerDetailsId" element={<EditCommentForm />} />
          </Route>

          <Route path="questions/:id" element={<QuestionDetails />} />
          <Route path="search" element={<SearchSection />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

async function verifyUser(): Promise<User> {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/auth/who-am-i`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const jsonObj = await response.json();
  const myPromise: Promise<User> = new Promise((resolve, reject) => {
    if (response.ok && response.status !== 204) {
      resolve(jsonObj);
    } /*if (response.status === 204) */ else {
      reject();
    }
  });
  return myPromise;
}
