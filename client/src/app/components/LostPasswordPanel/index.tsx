/**
 *
 * LostPasswordPanel
 *
 */
import * as React from 'react';
import { useAppSelector } from 'store/hooks';
import { panelActions } from '../SignUpPanel/slice';
import { selectPanelState } from '../SignUpPanel/slice/selectors';
import { panelName } from '../SignUpPanel/slice/types';
import { useDispatch } from 'react-redux';
import { LostPasswordForm } from '../LostPasswordForm';

interface Props {}

export function LostPasswordPanel(props: Props) {
  const dispatch = useDispatch();
  const { popUp } = useAppSelector(selectPanelState);

  return (
    <div
      className="panel-pop panel-pop-image"
      data-width={770}
      id="lost-password"
      style={{
        top: '7%',
        width: '770px',
        marginLeft: '-385px',
        display: popUp === panelName.LOST_PASSWORD ? 'block' : 'none',
      }}
    >
      <i
        className="icon-cancel"
        onClick={e => {
          e.preventDefault();
          dispatch(panelActions.closePanel());
        }}
      />
      <div className="pop-border-radius">
        <div className="panel-image-content">
          <div className="panel-image-opacity" />
          <div className="panel-image-inner">
            <h3>Forgot Password</h3>
            <p>
              Lost your password? Please enter your email address. You will
              receive a link and will create a new password via email.
            </p>
          </div>
        </div>
        <LostPasswordForm />
      </div>
      <div className="pop-footer wpqa_hide">
        Have an account?
        <a href="log-in/index.html" className="login-panel">
          Sign In Now
        </a>
      </div>
    </div>
  );
}
