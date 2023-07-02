import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OnboardingAnim } from "../../animations/Onboarding";
import GoBack from "../../assets/corner-down-left.svg";

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    let nameRef = useRef(null);
    let passwordRef = useRef(null);
    let submitRef = useRef(null);

    const onNameChange = (e) => setName(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const navigate = useNavigate();

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        OnboardingAnim(nameRef, passwordRef, submitRef);
    });

    const canSave = [name, validPassword].every(Boolean);

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
                className="flex justify-center items-center flex-col h-screen"
                id="register_page_container"
            >
                <img
                    src={GoBack}
                    alt="back to previous page"
                    onClick={() => navigate(-1)}
                    className="return_btn"
                />
                <h1 className="text-lg">Create an account</h1>
                <form onSubmit={onSubmitClicked} id="register_form">
                    <fieldset id="name_input" ref={(el) => (nameRef = el)} autoFocus>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={onNameChange}
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset id="password_input" ref={(el) => (passwordRef = el)}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={onPasswordChange}
                            required
                        />
                    </fieldset>
                    <button
                        id="register_btn"
                        aria-label="register as a user button"
                        ref={(el) => (submitRef = el)}
                        className="entry_btn"
                    >
                        Register
                    </button>
                </form>
            </section>
        </>
    );
};

export default Register;
