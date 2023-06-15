import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";
import { OnboardingAnim } from "../../animations/Onboarding";

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
              });
        //! - THIS IS WHERE WE ADD THE TOKENS AND CHECK THE REGISTER DETAILS
    };

    return (
        <>
            <section className="register_page_container">
                <IoArrowBack size={25} onClick={() => navigate(-1)} className="return_btn" />
                <form onSubmit={onSubmitClicked}>
                    <section className="outer-register_flex_container">
                        <fieldset className="name_input" ref={(el) => (nameRef = el)} autoFocus>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={onNameChange}
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
                    <button className="register_btn form_btn filled" ref={(el) => (submitRef = el)}>
                        register
                    </button>
                </form>
            </section>
        </>
    );
};

export default Register;
