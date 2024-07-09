/**
 *
 * AlertMessage
 *
 */
import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { select } from './slice/selectors';
import { useEffect } from 'react';
import { AlertActions } from './slice';
import { getAuth } from '../SignInPanel/slice/selectors';
interface Props {}

export function AlertMessage(props: Props) {
  const { success, warning, error } = useAppSelector(select);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getAuth);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(AlertActions.setAlertMessage({ success: '', error: '' }));
      }, 5000);
    }
  }, [success, warning, dispatch]);

  return (
    <>
      {success && (
        <div className="alert-message success">
          <i className="icon-check"></i>
          <p> {success} </p>
        </div>
      )}
      {warning && (
        <div className="alert-message warning">
          <i className="icon-flag"></i>
          <p>{warning}</p>
        </div>
      )}
      {error && (
        <div className="alert-message error">
          <i className="icon-cancel"></i>
          <p>{error}</p>
        </div>
      )}
      {user && !user.isEmailVerified && (
        <div className="alert-message warning">
          <i className="icon-flag"></i>
          <p>
            Mail xác thực đã được gửi đến email mà bạn đăng ký cho tài khoản này.
          </p>
        </div>
      )}
      {user && user.isBanned && (
        <div className="alert-message error">
          <i className="icon-cancel"></i>
          <p>
            Tài khoản của bạn đã bị khóa, vui lòng liên hệ với quản trị viên để được hỗ trợ.
          </p>
        </div>
      )}
    </>
  );
}
