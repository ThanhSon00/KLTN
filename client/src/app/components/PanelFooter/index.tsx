/* eslint-disable prettier/prettier */
/**
 *
 * PanelFooter
 *
 */
import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPanelState } from '../SignUpPanel/slice/selectors';
import { panelName } from '../SignUpPanel/slice/types';
import { panelActions } from '../SignUpPanel/slice';

interface Props {}

export function 
PanelFooter(props: Props) {
  const { popUp } = useAppSelector(selectPanelState);
  const dispatch = useAppDispatch();

  return (
    <>
      {popUp === panelName.SIGN_IN && (
        <div className="pop-footer">
          Don't have account, 
          <a
            href="/"
            className="signup-panel"
            onClick={e => {
              e.preventDefault();
              dispatch(panelActions.openPanel(panelName.SIGN_UP));
            }}
          > Sign Up Here
          </a>
        </div>
      )}
      {popUp === panelName.SIGN_UP && (
        <div className="pop-footer">
          Have an account? 
          <a
            href="/"
            className="login-panel"
            onClick={e => {
              e.preventDefault();
              dispatch(panelActions.openPanel(panelName.SIGN_IN));
            }}
          > Sign In Now
          </a>
        </div>
      )}
      {popUp === panelName.LOST_PASSWORD && (
        <div className="pop-footer">
          Have an account? 
          <a
            href="/"
            className="login-panel"
            onClick={e => {
              e.preventDefault();
              dispatch(panelActions.openPanel(panelName.SIGN_IN));
            }}
          > Sign In Now
          </a>
        </div>
      )}
    </>
  );
}
