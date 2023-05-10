import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);
    const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);

    const verifyUser = (e) => {
        e.preventDefault();
        setUsername("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <section className="register_page_container">
            <Link to="/" className="prev_page--link">
                <FaArrowLeft />
            </Link>
            <section className="register_form">
                <form onSubmit={verifyUser} className="register_user--form">
                    <fieldset className="username_elements">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            aria-label="username"
                            id="username"
                            name="username"
                            value={username}
                            onChange={onUsernameChanged}
                            autoFocus
                        />
                    </fieldset>
                    <fieldset className="name_elements">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            aria-label="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onPasswordChanged}
                        />
                    </fieldset>
                    <fieldset className="name_elements">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            aria-label="confirmPassword"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onConfirmPasswordChanged}
                        />
                    </fieldset>
                    <button className="submit_btn">Register</button>
                </form>
            </section>
            <section className="third_party-signIn-options">
                <div className="divider">
                    <div className="line1"></div>
                    <div className="line2">or</div>
                    <div className="line3"></div>
                </div>
                <button className="google-signIn-goes-here">Register with Google</button>
            </section>
        </section>
    );
};

export default Register;
