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
  const notInProduction = process.env.NODE_ENV != 'production'; 
  const search = document.location.hash.replace('#/verify-email', '');
  const params = new URLSearchParams(search);
  const token = params.get('token');
  const dispatch = useAppDispatch();
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (notInProduction && firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    
    if (!token) return;

    dispatch(verifyEmail({ token }));
  }, [token, dispatch]);

  return <MainPage />;
}