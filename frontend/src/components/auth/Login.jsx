import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const onSubmitClicked = (e) => {
        e.preventDefault();
        console.log("loggin in");
        //! - THIS IS WHERE WE ADD THE TOKENS AND CHECK THE LOGIN DETAILS
    };

    return (
        <form className="login_form">
            <section className="login_bg">
                <fieldset className="email">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onEmailChange}
                        placeholder="Enter your email address"
                        autoFocus
                    />
                </fieldset>
                <fieldset className="password">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onPasswordChange}
                        placeholder="Enter your password"
                    />
                </fieldset>
                <button className="login_cta" onClick={onSubmitClicked}>
                    login
                </button>
            </section>
        </form>
    );
};

export default Login;
