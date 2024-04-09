/**
 *
 * SignUpPanel
 *
 */

import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { useDispatch } from 'react-redux';
import { selectPanelState } from './slice/selectors';
import { panelName } from './slice/types';
import { panelActions } from './slice';
import { SignupForm } from 'app/components/SignupForm';

function SignUpPanel() {
  const dispatch = useDispatch();
  const { popUp } = useAppSelector(selectPanelState);

  return (
    <>
      <div
        className="panel-pop panel-pop-image"
        data-width={770}
        id="signup-panel"
        style={{
          top: '7%',
          width: '770px',
          marginLeft: '-385px',
          display: popUp === panelName.SIGN_UP ? 'block' : 'none',
        }}
      >
        <i
          className="icon-cancel"
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch(panelActions.closePanel());
          }}
        />
        <div className="pop-border-radius">
          <div className="panel-image-content">
            <div className="panel-image-opacity" />
            <div className="panel-image-inner">
              <h3>Sign Up</h3>
              <p>
                Sign Up to our social questions and Answers Engine to ask
                questions, answer people’s questions, and connect with other
                people.
              </p>
            </div>
            <a
              href="log-in/index.html"
              className="login-panel button-default"
              onClick={e => {
                e.preventDefault();
                dispatch(panelActions.openPanel(panelName.SIGN_IN));
              }}
            >
              Have an account? Sign In
            </a>
          </div>
          {/* End panel-image-content */}
          <SignupForm />
          {/* End panel-pop-content */}
        </div>
        {/* End pop-border-radius */}
        <div className="pop-footer wpqa_hide">
          Have an account?
          <a
            href="log-in/index.html"
            className="login-panel"
            onClick={e => {
              e.preventDefault();
              dispatch(panelActions.openPanel(panelName.SIGN_IN));
            }}
          >
            Sign In Now
          </a>
        </div>
        {/* End pop-footer */}
      </div>
    </>
  );
}

SignUpPanel.propTypes = {};

export default memo(SignUpPanel);
