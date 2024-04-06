/**
 *
 * LostPasswordForm
 *
 */
import * as React from 'react';
import { AuthMessage } from '../AuthMessage';
import { PanelSubmitButton } from '../PanelSubmitButton';
import { forgotPassword } from 'services/auth.service';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPanelState } from '../SignUpPanel/slice/selectors';
import { panelName } from '../SignUpPanel/slice/types';

interface Props {}

export function LostPasswordForm(props: Props) {
  const [email, setEmail] = React.useState('');
  const dispatch = useAppDispatch();
  const { popUp } = useAppSelector(selectPanelState);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <div
      className="panel-pop-content"
      style={{ display: popUp === panelName.LOST_PASSWORD ? 'block' : 'none' }}
    >
      <form className="wpqa-lost-password wpqa_form" onSubmit={handleSubmit}>
        <div className="wpqa_error_desktop wpqa_hide">
          <div className="wpqa_error" />
        </div>
        <div className="wpqa_success" />
        <AuthMessage />
        <div className="form-inputs clearfix">
          <p>
            <label htmlFor="user_mail_900">
              E-Mail<span className="required">*</span>
            </label>
            <input
              type="email"
              className="required-item form-control"
              name="user_mail"
              id="user_mail_900"
              onChange={handleEmailChange}
              required
            />
            <i className="icon-mail" />
          </p>
        </div>
        <div className="clearfix" />
        <div className="wpqa_error_mobile wpqa_hide">
          <div className="wpqa_error" />
        </div>
        <PanelSubmitButton name="Request new password" />
      </form>
    </div>
  );
}
