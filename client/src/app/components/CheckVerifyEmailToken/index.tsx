/**
 *
 * CheckVerifyEmailToken
 *
 */
import * as React from 'react';
import MainPage from 'app/pages/MainPage';
import { useEffect, useRef } from 'react';
import { verifyEmail } from 'services/auth.service';
import { useAppDispatch } from 'store/hooks';

interface Props {}

export function CheckVerifyEmailToken(props: Props) {
  const params = new URLSearchParams(document.location.search);
  const token = params.get('token');
  const dispatch = useAppDispatch();
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!token) return;

    dispatch(verifyEmail({ token }));
  }, [token, dispatch]);

  return <MainPage />;
}
