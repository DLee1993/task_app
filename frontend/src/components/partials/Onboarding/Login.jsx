import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";
import { OnboardingAnim } from "../../../animations/Onboarding";

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    let usernameRef = useRef(null);
    let passwordRef = useRef(null);
    let submitRef = useRef(null);

    const onUsernameChange = (e) => setUsername(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const navigate = useNavigate();

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        OnboardingAnim(usernameRef, passwordRef, submitRef);
    });

    const canSave = [username, validPassword].every(Boolean);

    const onSubmitClicked = (e) => {
        e.preventDefault();
        canSave
            ? console.log("Logging in")
            : toast.error("Please Enter Valid Credentials", {
                  theme: "colored",
              });
        //! - THIS IS WHERE WE ADD THE TOKENS AND CHECK THE REGISTER DETAILS
    };

    return (
        <>
            <section className="login_page_container">
                <IoArrowBack size={25} onClick={() => navigate(-1)} className="return_btn" />
                <form onSubmit={onSubmitClicked}>
                    <section className="outer-login_flex_container">
                        <fieldset className="username_input" ref={(el) => (usernameRef = el)} autoFocus>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={onUsernameChange}
                                required
                            />
                        </fieldset>
                        <fieldset className="password_input" ref={(el) => (passwordRef = el)}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={onPasswordChange}
                                required
                            />
                        </fieldset>
                    </section>
                    <button
                        className="login_btn form_btn filled color_transition"
                        ref={(el) => (submitRef = el)}
                    >
                        Login
                    </button>
                </form>
            </section>
        </>
    );
};

export default Login;
