/**
 *
 * SignupForm
 *
 */
import { register } from 'services/auth.service';
import React, { useState } from 'react';
import { AuthMessage } from 'app/components/AuthMessage';
import { PanelSubmitButton } from 'app/components/PanelSubmitButton';
import { selectPanelState } from '../SignUpPanel/slice/selectors';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { panelName } from '../SignUpPanel/slice/types';

interface Props {}

export function SignupForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const { popUp } = useAppSelector(selectPanelState);

  const handleUsernameChange = e => {
    setName(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(register({ email, password, confirmPassword, name }));
  };

  return (
    <div
      className="panel-pop-content"
      style={{ display: popUp === panelName.SIGN_UP ? 'block' : 'none' }}
    >
      <input
        type="hidden"
        name="_wp_http_referer"
        defaultValue="/demo/themes/Discy/Main/?show=most-answered"
      />
      <form
        method="post"
        className="signup_form wpqa_form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <AuthMessage />
        <div className="form-inputs clearfix">
          <p className="username_field">
            <label htmlFor="user_name_826">
              Username<span className="required">*</span>
            </label>
            <input
              type="text"
              className="required-item form-control"
              name="user_name"
              id="user_name_826"
              placeholder="username"
              required
              onChange={handleUsernameChange}
            />
            <i className="icon-user" />
          </p>
          <p className="email_field">
            <label htmlFor="email_826">
              E-Mail<span className="required">*</span>
            </label>
            <input
              className="form-control"
              autoComplete="email"
              type="text"
              name="email"
              id="email_826"
              placeholder="email"
              required
              onChange={handleEmailChange}
            />
            <i className="icon-mail" />
          </p>
          <p className="password_field">
            <label htmlFor="pass1_826">
              Password<span className="required">*</span>
            </label>
            <input
              type="password"
              className="required-item form-control"
              name="pass1"
              id="pass1_826"
              autoComplete="off"
              placeholder="password"
              required
              onChange={handlePasswordChange}
            />
            <i className="icon-lock-open" />
          </p>
          <p className="password_2_field">
            <label htmlFor="pass2_826">
              Confirm Password<span className="required">*</span>
            </label>
            <input
              type="password"
              className="required-item form-control"
              name="pass2"
              id="pass2_826"
              autoComplete="off"
              placeholder="confirm password"
              required
              onChange={handleConfirmPasswordChange}
            />
            <i className="icon-lock" />
          </p>
        </div>
        <div className="clearfix" />
        <div className="wpqa_error_mobile">
          <div className="wpqa_error" />
        </div>
        <PanelSubmitButton name="Register" />
        <input type="hidden" name="form_type" defaultValue="wpqa-signup" />
        <input
          type="hidden"
          name="action"
          defaultValue="wpqa_ajax_signup_process"
        />
        <input
          type="hidden"
          name="redirect_to"
          defaultValue="https://2code.info/demo/themes/Discy/Main/?show=most-answered"
        />
        <input
          type="hidden"
          name="_wp_http_referer"
          defaultValue="/demo/themes/Discy/Main/?show=most-answered"
        />
      </form>
    </div>
  );
}
