import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersistLogin from "../../hooks/usePersistLogin";
import { toast } from "react-toastify";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Stack,
} from "@mantine/core";

const PWD_REGEX = /^[A-z0-9!@#$%]{4,20}$/;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [persist, setPersist] = usePersistLogin();

    const onUsernameChange = (e) => setUsername(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);
    const handleToggle = () => setPersist((prev) => !prev);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //- destructure login and is loading
    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    const canSave = [username, validPassword].every(Boolean);

    const onSubmitClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                //- destructure the access token from the result of calling login with users username and valid password
                const { accessToken } = await login({ username, password }).unwrap();
                //- then set the credentials with the above access token
                //- remember set Credentials just sets the access token to state.token
                dispatch(setCredentials({ accessToken }));

                //- reset state
                setUsername("");
                setPassword("");

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
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    if (isLoading) return <p>Checking Credentials</p>;

    return (
        <section className="relative w-full h-screen flex justify-center items-center flex-col">
            <aside className="w-full px-5">
                <Link to="/" className="absolute top-20 left-10 block w-fit">
                    <span className="sr-only">go back</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2b2d42"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        id="feather feather-corner-down-left"
                        className="hidden md:block cursor-pointer"
                    >
                        <polyline points="9 10 4 15 9 20"></polyline>
                        <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                    </svg>
                </Link>
            </aside>
            <Paper unstyled component="section" p="xl" shadow="lg" className="baseFormStyling">
                <Text size="lg" fw={500}>
                    Login to your account
                </Text>

                <Divider labelPosition="center" my="lg" />

                <form onSubmit={onSubmitClicked}>
                    <Stack>
                        <TextInput
                            label="Username"
                            type="text"
                            id="username"
                            value={username}
                            onChange={onUsernameChange}
                            required
                            autoFocus
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={onPasswordChange}
                            radius="md"
                        />
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Button unstyled type="submit" className="formSubmitBtn">
                            Login
                        </Button>

                        <Checkbox
                            label="Trust this Device?"
                            aria-label="select to remain logged in when refreshing the page"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                            color="#2b2d42"
                        />
                    </Group>
                </form>
            </Paper>
        </section>
    );
};

export default Login;
