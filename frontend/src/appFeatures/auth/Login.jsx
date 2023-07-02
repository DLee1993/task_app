import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OnboardingAnim } from "../../animations/Onboarding";
import GoBack from "../../assets/corner-down-left.svg";

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
                  position: toast.POSITION.BOTTOM_CENTER,
              });
        //! - THIS IS WHERE WE ADD THE TOKENS AND CHECK THE REGISTER DETAILS
    };

    return (
        <>
            <section
                className="flex justify-evenly items-center flex-col h-screen"
                id="login_page_container"
            >
                <img
                    src={GoBack}
                    alt="back to previous page"
                    onClick={() => navigate(-1)}
                    className="hidden md:block md:absolute md:top-5 md:left-5 cursor-pointer"
                />
                <h1 className="text-lg">Login to your account</h1>
                <form onSubmit={onSubmitClicked} id="login_form">
                    <fieldset
                        id="username_input"
                        ref={(el) => (usernameRef = el)}
                        className="flex flex-col mb-10"
                    >
                        <label htmlFor="username" className="text-lg pb-2">
                            Username
                        </label>
                        <input
                            className="h-10 w-80 bg-fadedBlack text-fadedWhite pl-2"
                            type="text"
                            id="username"
                            value={username}
                            onChange={onUsernameChange}
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset
                        id="password_input"
                        ref={(el) => (passwordRef = el)}
                        className="flex flex-col mb-16"
                    >
                        <label htmlFor="password" className="text-lg pb-2">
                            Password
                        </label>
                        <input
                            className="h-10 w-80 bg-fadedBlack text-fadedWhite pl-2"
                            type="password"
                            id="password"
                            value={password}
                            onChange={onPasswordChange}
                            required
                        />
                    </fieldset>
                    <button
                        id="login_btn"
                        aria-label="login into your account button"
                        ref={(el) => (submitRef = el)}
                        className="w-full sm:max-w-xs h-10 sm:h-12 text-lg flex justify-center items-center bg-transparent border-brightPurple border-2 hover:bg-brightPurple hover:border-transparent transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </section>
        </>
    );
};

export default Login;
