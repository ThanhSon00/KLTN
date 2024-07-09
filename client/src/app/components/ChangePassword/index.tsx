import React, { useEffect } from "react";
import { PanelSubmitButton } from "../PanelSubmitButton";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { updateUser } from "services/user.service";
import { AuthMessage } from "../AuthMessage";
import { AlertActions } from "../AuthMessage/slice";

export default function ChangePassword() {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const { user } = useAppSelector(getAuth);
    const dispatch = useAppDispatch();

    const handleChangePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmPassword = (e: any) => {
        setConfirmPassword(e.target.value);
    }

    const resetState = () => {
        setPassword('');
        setConfirmPassword('');
    }
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!user) return;
        if (password !== confirmPassword) {
            dispatch(AlertActions.setAuthMessage({ error: 'Mật khẩu mới và mật khẩu xác thực không giống nhau'}));
            return;
        }

        const result = await dispatch(updateUser({ id: user.id, userBody: { password, confirmPassword } }));
        if (result.meta.requestStatus === 'fulfilled') {
            resetState();
        }
        window.scrollTo(0, 0);
    };

    return (
        <form
            className="edit-profile-form block-section-div wpqa_form wpqa-readonly change-password-ajax"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            >
            <AuthMessage />
            <div className="form-inputs clearfix">
                <div className="page-sections" id="change-password">
                    <div className="page-section">
                        <div className="page-wrap-content">
                        <h2 className="post-title-2">
                            <i className="icon-lock" />
                            Đổi mật khẩu
                        </h2>{" "}
                        <p className="login-password">
                            {" "}
                            <label htmlFor="newpassword_144">
                            Mật khẩu mới<span className="required">*</span>
                            </label>{" "}
                            <input
                            id="newpassword_144"
                            className="required-item form-control"
                            autoComplete="new-password"
                            type="password"
                            name="pass1"
                            placeholder="Mật khẩu mới"
                            onChange={handleChangePassword}
                            value={password}
                            required
                            />{" "}
                            <i className="icon-lock-open" />{" "}
                        </p>{" "}
                        <p className="login-password">
                            {" "}
                            <label htmlFor="newpassword2_144">
                            Nhập lại mật khẩu mới<span className="required">*</span>
                            </label>{" "}
                            <input
                            id="newpassword2_144"
                            className="required-item form-control"
                            autoComplete="new-password"
                            type="password"
                            name="pass2"
                            placeholder="Nhập lại mật khẩu mới"
                            onChange={handleChangeConfirmPassword}
                            value={confirmPassword}
                            required
                            />{" "}
                            <i className="icon-lock-open" />{" "}
                        </p>{" "}
                        </div>{" "}
                    </div>{" "}
                </div>{" "}
            </div>
            <PanelSubmitButton name="Đổi mật khẩu"/>
            </form>

    )
}