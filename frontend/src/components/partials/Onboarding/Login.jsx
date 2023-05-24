import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const Login = () => {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const navigate = useNavigate();
    const errorNotification = "custom-error-id";

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    const canSave = [validEmail, validPassword].every(Boolean);

    const onSubmitClicked = (e) => {
        e.preventDefault();
        canSave
            ? console.log("Logging in")
            : toast.error("Incorrect Credentials", {
                  theme: "dark",
                  position: "bottom-center",
                  toastId: errorNotification,
              });
        //! - THIS IS WHERE WE ADD THE TOKENS AND CHECK THE LOGIN DETAILS
    };

    return (
        <section className="login_page_container">
            <ToastContainer />
            <IoArrowBack onClick={() => navigate(-1)} />
            <form onSubmit={onSubmitClicked}>
                <fieldset className="email_input">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={email} onChange={onEmailChange} />
                </fieldset>
                <fieldset className="password_input">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </fieldset>
            </form>
        </section>
    );
};

export default Login;
