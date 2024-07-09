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
          position: 'sticky',
          top: '300px',
          width: '770px',
          left: '30%',
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
              <h3>Đăng ký</h3>
              <p>
              Hãy đăng ký tham gia vào nền tảng câu hỏi và trả lời xã hội của chúng tôi để đặt câu hỏi, trả lời câu hỏi của người khác và kết nối với cộng đồng.
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
              Đã có tài khoản? Đăng nhập
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
