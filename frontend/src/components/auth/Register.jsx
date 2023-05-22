import { useEffect, useState } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const Register = () => {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    const canSave = [validEmail, validPassword].every(Boolean);

    const onSaveUserClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            console.log("able to save");
            //! - IF INPUTS ARE VALID ADD A NEW USER
        }
    };

    return (
        <>
            <form className="login_form" onSubmit={onSaveUserClicked}>
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
                    <button type="submit" className="login_cta" disabled={!canSave}>
                        register
                    </button>
                </section>
            </form>
        </>
    );
};

export default Register;
