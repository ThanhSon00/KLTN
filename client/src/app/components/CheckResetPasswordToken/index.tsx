/**
 *
 * CheckResetPasswordToken
 *
 */
import MainPage from 'app/pages/MainPage';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNewPassword } from 'services/auth.service';
import { useAppDispatch } from 'store/hooks';

interface Props {}

export function CheckResetPasswordToken(props: Props) {
  const notInProduction = process.env.NODE_ENV != 'production'; 
  const search = document.location.hash.replace('#/reset-password', '');
  const params = new URLSearchParams(search);
  const token = params.get('token');
  const dispatch = useAppDispatch();
  const firstUpdate = useRef(true);
  const naviagate = useNavigate();
  useEffect(() => {
    if (notInProduction && firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!token) return;

    dispatch(getNewPassword({ token }));
    naviagate('/home', { replace: true});
  }, [token, dispatch]);
  return <MainPage />;
}
