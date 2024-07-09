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

function SignInPanel(): JSX.Element {
  const { popUp } = useAppSelector(selectPanelState);
  const dispatch = useDispatch();
  

  return (
    <div
      className="panel-pop panel-pop-image"
      data-width={770}
      id="login-panel"
      style={{
        position: 'sticky',
        top: '300px',
        width: '770px',
        left: "30%",
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
            <h3>Đăng nhập</h3>
            <p>
              Đăng nhập vào nền tảng câu hỏi và trả lời xã hội của chúng tôi để đặt câu hỏi, trả lời câu hỏi của người khác và kết nối với cộng đồng. 
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
            Đăng ký tại đây
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
