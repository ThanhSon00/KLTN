/**
 *
 * SigninForm
 *
 */
import * as React from 'react';
import { PanelSubmitButton } from '../PanelSubmitButton';
import { useState } from 'react';
import { login } from 'services/auth.service';
import { panelActions } from '../SignUpPanel/slice';
import { panelName } from '../SignUpPanel/slice/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPanelState } from '../SignUpPanel/slice/selectors';
import { AuthMessage } from '../AuthMessage';

interface Props {}

export function SigninForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { popUp } = useAppSelector(selectPanelState);
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleForgotPasswordClick = e => {
    e.preventDefault();
    dispatch(panelActions.openPanel(panelName.LOST_PASSWORD));
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      refreshPage();
    };
  };

  React.useEffect(() => {
    if (popUp !== panelName.SIGN_IN) {
      setEmail('');
      setPassword('');
    }
  }, [popUp])

  return (
    <div
      className="panel-pop-content"
      style={{ display: popUp === panelName.SIGN_IN ? 'block' : 'none' }}
    >
      <form
        className="wpqa_form login-form wpqa_login"
        method="post"
        action="/"
        onSubmit={handleSubmit}
      >
        <AuthMessage />
        <div className="form-inputs clearfix">
          <p className="login-text">
            <label htmlFor="username_528">
              E-mail<span className="required">*</span>
            </label>
            <input
              id="username_528"
              className="required-item form-control"
              autoComplete="email"
              type="email"
              name="log"
              placeholder="e-mail"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <i className="icon-user" />
          </p>
          <p className="login-password">
            <label htmlFor="password_528">
              Mật khẩu<span className="required">*</span>
            </label>
            <input
              id="password_528"
              className="required-item form-control"
              autoComplete="current-password"
              type="password"
              name="pwd"
              placeholder="Mật khẩu"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <i className="icon-lock-open" />
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="wpqa_checkbox_p rememberme normal_label d-flex align-items-center mb-1">
            <label className="mb-0">
              <span className="wpqa_checkbox">
                <input
                  type="checkbox"
                  name="rememberme"
                  defaultValue="forever"
                  defaultChecked={true}
                />
              </span>
              <span className="wpqa_checkbox_span">Ghi nhớ đăng nhập</span>
            </label>
          </div>
          <a
            href="lost-password/index.html"
            className="font-weight-bold color-dark mb-1 lost-password"
            onClick={handleForgotPasswordClick}
          >
            Quên mật khẩu?
          </a>
        </div>
        <div className="clearfix" />
        <div className="wpqa_error_mobile">
          <div className="wpqa_error" />
        </div>
        <PanelSubmitButton name="Đăng nhập" />
        <input
          type="hidden"
          name="redirect_to"
          defaultValue="https://2code.info/demo/themes/Discy/Main/?show=most-answered"
        />
        <input type="hidden" name="form_type" defaultValue="wpqa-login" />
        <input
          type="hidden"
          name="action"
          defaultValue="wpqa_ajax_login_process"
        />
      </form>
    </div>
  );
}
