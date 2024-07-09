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
        position:'sticky',
        top: '300px',
        width: '770px',
        left: '30%',
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
            <h3>Quên mật khẩu</h3>
            <p>
              Quên mật khẩu? Vui lòng nhập địa chỉ email của bạn. Bạn sẽ nhận được một liên kết và tạo mật khẩu mới qua email. 
            </p>
          </div>
        </div>
        <LostPasswordForm />
      </div>
      <div className="pop-footer wpqa_hide">
        Đã có tài khoản?
        <a href="log-in/index.html" className="login-panel">
          Đăng nhập ngay
        </a>
      </div>
    </div>
  );
}
