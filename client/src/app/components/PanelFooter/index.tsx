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
          Chưa có tài khoản? 
          <a
            href="/"
            className="signup-panel"
            onClick={e => {
              e.preventDefault();
              dispatch(panelActions.openPanel(panelName.SIGN_UP));
            }}
          > Đăng ký tại đây
          </a>
        </div>
      )}
      {popUp === panelName.SIGN_UP && (
        <div className="pop-footer">
          Đã có tài khoản? 
          <a
            href="/"
            className="login-panel"
            onClick={e => {
              e.preventDefault();
              dispatch(panelActions.openPanel(panelName.SIGN_IN));
            }}
          > Đăng nhập ngay
          </a>
        </div>
      )}
      {popUp === panelName.LOST_PASSWORD && (
        <div className="pop-footer">
          Đã có tài khoản? 
          <a
            href="/"
            className="login-panel"
            onClick={e => {
              e.preventDefault();
              dispatch(panelActions.openPanel(panelName.SIGN_IN));
            }}
            > Đăng nhập ngay
          </a>
        </div>
      )}
    </>
  );
}
