/**
 *
 * SignInPanel
 *
 */
import React from 'react';
import { useAppSelector } from 'store/hooks';
import { useDispatch } from 'react-redux';
import { selectPanelState } from '../SignUpPanel/slice/selectors';
import { panelName } from '../SignUpPanel/slice/types';
import { panelActions } from '../SignUpPanel/slice';
import { SigninForm } from '../SigninForm';

function SignInPanel() {
  const { popUp } = useAppSelector(selectPanelState);
  const dispatch = useDispatch();

  return (
    <div
      className="panel-pop panel-pop-image"
      data-width={770}
      id="login-panel"
      style={{
        top: '7%',
        width: '770px',
        marginLeft: '-385px',
        display: popUp === panelName.SIGN_IN ? 'block' : 'none',
      }}
    >
      <i
        className="icon-cancel"
        role="button"
        tabIndex={0}
        onClick={e => {
          e.preventDefault();
          dispatch(panelActions.closePanel());
        }}
      />
      <div className="pop-border-radius">
        <div className="panel-image-content">
          <div className="panel-image-opacity" />
          <div className="panel-image-inner">
            <h3>Sign In</h3>
            <p>
              Login to our social questions &amp; Answers Engine to ask
              questions answer people’s questions &amp; connect with other
              people.
            </p>
          </div>
          <a
            href="/"
            className="signup-panel button-default"
            onClick={e => {
              e.preventDefault();
              dispatch(panelActions.openPanel(panelName.SIGN_UP));
            }}
          >
            Sign Up Here
          </a>
        </div>
        <SigninForm />
      </div>
      <div className="pop-footer wpqa_hide">
        Don't have account,
        <a
          href="signup/index.html"
          className="signup-panel"
          onClick={e => {
            e.preventDefault();
            dispatch(panelActions.openPanel(panelName.SIGN_UP));
          }}
        >
          Sign Up Here
        </a>
      </div>
    </div>
  );
}

SignInPanel.propTypes = {};

export default SignInPanel;
