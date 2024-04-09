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
        dispatch(AlertActions.setAlertMessage({ success: '' }));
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
      {user && !user.isEmailVerified && (
        <div className="alert-message warning">
          <i className="icon-flag"></i>
          <p>
            A confirmation mail has been sent to your registered email account,
            If you have not received the confirmation mail, kindly Click here to
            re-send another confirmation mail.
          </p>
        </div>
      )}
      {error && (
        <div className="alert-message error">
          <i className="icon-cancel"></i>
          <p>{error}</p>
        </div>
      )}
    </>
  );
}
