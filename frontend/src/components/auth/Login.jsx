import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);

    const navigate = useNavigate();

    const toastWarning = () => {
        toast("Please enter valid credentials", {
            position: "top-right",
            type: "error",
            toastId: "input-error",
            theme: "dark",
            draggable: true,
            rtl: false,
            closeOnClick: true,
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnFocusLoss: true,
        });
    };

    const canSave = [username, password].every(Boolean);

    const verifyUser = (e) => {
      e.preventDefault();
      if (canSave) {
          navigate('/dashboard')
      } else {
          toastWarning();
      }
  };

    return (
        <section className="login_page_container">
            <ToastContainer />
            <Link to="/" className="prev_page--link">
                <FaArrowLeft />
            </Link>
            <section className="login_container">
                <section className="login_form">
                    <form onSubmit={verifyUser} className="login_user--form">
                        <fieldset className="username_fieldset">
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
                        <fieldset className="password_fieldset">
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
                        <button className="submit_btn">Login</button>
                    </form>
                </section>
            </section>
        </section>
    );
};

export default Login;
