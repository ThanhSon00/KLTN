import { useEffect, useState } from "react";
import { adminLogin } from "services/auth.service";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectAdmin } from "./slice/selectors";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const { admin } = useAppSelector(selectAdmin);
    const handelNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(adminLogin({ name, password }));
    }

    useEffect(() => {
        if (admin) {
            navigate('/admin/dashboard');
        }
    }, [admin]);

    return (
    <div className="main">
        <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                <div className="signin-image">
                    <figure>
                        <img src="/images/signin.jpg" alt="sing up image" />
                    </figure>
                </div>
                <div className="signin-form">
                    <h2 className="form-title" style={{ fontFamily: 'sans-serif' }}>Đăng nhập</h2>
                    <form className="register-form" id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="">
                        <input
                            name="username"
                            type="text"
                            placeholder="Tên tài khoản"
                            className="form-control input-height"
                            required
                            onChange={handelNameChange}
                        />{" "}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="">
                        <input
                            name="pwd"
                            type="password"
                            placeholder="Mật khẩu"
                            className="form-control input-height"
                            required
                            onChange={handlePasswordChange}
                        />{" "}
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                        type="checkbox"
                        name="remember-me"
                        id="remember-me"
                        className="agree-term"
                        />
                        {' '}
                        <label htmlFor="remember-me" className="label-agree-term">
                        Ghi nhớ đăng nhập
                        </label>
                    </div>
                    <div className="form-group form-button">
                        <button
                        className="btn btn-round btn-primary"
                        name="signin"
                        id="signin"
                        >
                        Đăng nhập
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </section>
    </div>)
}