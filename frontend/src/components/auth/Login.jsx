import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
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
            <ToastContainer theme="dark" position="bottom-center" />
            <Button className="go_back_link_cta" variant="outline" onClick={() => navigate(-1)}>
                <IoArrowBack />
            </Button>
            <form className="login_form">
                <FormControl className="form-control-container" isRequired autoFocus>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        type="email"
                        aria-label="email_input"
                        value={email}
                        onChange={onEmailChange}
                    />
                </FormControl>
                <FormControl className="form-control-container" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        aria-label="password_input"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </FormControl>
                <section className="submit_btn_flex_container">
                    <Button
                        type="submit"
                        onClick={onSubmitClicked}
                        variant="solid"
                        className="form_submit_btn"
                        disabled={!canSave}
                    >
                        Login
                    </Button>
                </section>
            </form>
        </section>
    );
};

export default Login;
