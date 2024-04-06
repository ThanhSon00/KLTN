/**
 *
 * CheckResetPasswordToken
 *
 */
import MainPage from 'app/pages/MainPage';
import { useEffect, useRef } from 'react';
import { getNewPassword } from 'services/auth.service';
import { useAppDispatch } from 'store/hooks';

interface Props {}

export function CheckResetPasswordToken(props: Props) {
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

    dispatch(getNewPassword({ token }));
  }, [token, dispatch]);
  return <MainPage />;
}
