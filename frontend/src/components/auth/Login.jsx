import { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    FormHelperText,
    useToast,
} from "@chakra-ui/react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const isError = email || password === "";

    const notification = useToast();

    const onSubmitClicked = (e) => {
        e.preventDefault();
        isError
            ? notification({
                  title: "Error",
                  description: "Please Enter the correct account details",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
              })
            : console.log("logging in");
        //! - THIS IS WHERE WE ADD THE TOKENS AND CHECK THE LOGIN DETAILS
    };

    return (
        <section className="login_page_container">
            <form className="login_form">
                <FormControl className="form-control-container">
                    <FormLabel>Email address</FormLabel>
                    <Input
                        type="email"
                        aria-label="email_input"
                        value={email}
                        onChange={onEmailChange}
                    />
                    {!isError ? (
                        <FormHelperText>We will never share your email.</FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl className="form-control-container">
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        aria-label="password_input"
                        value={password}
                        onChange={onPasswordChange}
                    />
                    {!isError ? (
                        <FormHelperText>We will never share your email.</FormHelperText>
                    ) : (
                        <FormErrorMessage>Password is required.</FormErrorMessage>
                    )}
                </FormControl>
                <button type="submit" onClick={onSubmitClicked}>
                    Login
                </button>
            </form>
        </section>
    );
};

export default Login;
