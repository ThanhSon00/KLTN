/**
 *
 * AuthMessage
 *
 */
import * as React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectAuthMessageState } from './slice/selectors';
import { AlertActions } from './slice';

interface Props {}

export function AuthMessage(props: Props) {
  const { error, success } = useAppSelector(selectAuthMessageState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        dispatch(AlertActions.clearAllMessage());
      }, 5000);
    }
  }, [error, success, dispatch]);
  return (
    <>
      <div className="wpqa_error" style={{ display: error ? 'block' : 'none' }}>
        <span className="required-error">
          <strong> Lỗi </strong>: {error}
        </span>
      </div>
      <div
        className="wpqa_success"
        style={{ display: success ? 'block' : 'none' }}
      >
        {success}
      </div>
    </>
  );
}
