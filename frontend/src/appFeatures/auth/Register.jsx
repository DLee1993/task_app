import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAddNewUserMutation } from "../users/usersSlice";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { toast } from "react-toastify";

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onNameChange = (e) => setUsername(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const [addNewUser, { isLoading: newUserLoading, isSuccess, isError, error }] =
        useAddNewUserMutation();
    const [login, { isLoading }] = useLoginMutation();

    const resetForm = () => {
        setUsername("");
        setPassword("");
    };

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if (isSuccess) {
            resetForm();
        }
        if (isError) {
            toast.error(`${error.data.message}`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            resetForm();
        }
    }, [isSuccess, isError, error, navigate]);

    const canSave = [username, validPassword].every(Boolean) && !newUserLoading;

    const onSubmitClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewUser({ username, password });
            try {
                //- destructure the access token from the result of calling login with users username and valid password
                const { accessToken } = await login({ username, password }).unwrap();
                
                //- then set the credentials with the above access token
                //- remember set Credentials just sets the access token to state.token
                dispatch(setCredentials({ accessToken }));

                //- navigate to dashboard
                navigate("/dashboard");
            } catch (error) {
                //- add custom toasts for errors
                if (!error.status) {
                    toast.error("No server response");
                } else if (error.status === 400) {
                    toast.error("Missing Username or Password");
                } else if (error.status === 401) {
                    toast.error("Unauthorized Access");
                } else {
                    toast.error(error.data?.message);
                }
            }
        } else {
            toast.error("Please Enter Valid Credentials", {
                theme: "colored",
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    if (isLoading) return <p>Checking Credentials</p>;

    return (
        <>
            <section
                className="flex justify-evenly items-center flex-col h-screen"
                id="register_page_container"
            >
                <div className="w-full px-5">
                    <a href="/" className="block w-fit">
                        <span className="sr-only">go back</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#c1c2c5"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            id="feather feather-corner-down-left"
                            className="hidden md:block cursor-pointer"
                        >
                            <polyline points="9 10 4 15 9 20"></polyline>
                            <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                        </svg>
                    </a>
                </div>
                <h1 className="text-lg">Create an account</h1>
                <form onSubmit={onSubmitClicked} id="register_form" className="min-h-[25rem]">
                    <fieldset id="name_input" className="flex flex-col mb-10">
                        <label htmlFor="name" className="text-lg pb-2">
                            Name
                        </label>
                        <input
                            className="h-10 w-80 bg-fadedBlack text-fadedWhite pl-2"
                            type="text"
                            id="name"
                            value={username}
                            onChange={onNameChange}
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset id="password_input" className="flex flex-col mb-10">
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
                        id="register_btn"
                        aria-label="register as a user button"
                        className="w-full sm:max-w-xs h-10 sm:h-12 text-lg flex justify-center items-center bg-transparent border-brightPurple border-2 hover:bg-brightPurple hover:border-transparent transition duration-200"
                    >
                        Register
                    </button>
                </form>
            </section>
        </>
    );
};

export default Register;
