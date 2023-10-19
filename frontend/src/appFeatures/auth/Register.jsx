import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAddNewUserMutation } from "../users/usersSlice";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import homeSVG from "../../assets/home.svg";
import { toast } from "react-toastify";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Stack,
} from "@mantine/core";

const PWD_REGEX = /^[A-z0-9!@#$%]{4,20}$/;

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
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    if (isLoading) return <p>Checking Credentials</p>;

    return (
        <section className="relative w-full h-screen flex justify-center items-center flex-col">
            <aside className="absolute top-[5%] left-[10%]">
                <Link to="/" className="block w-8">
                    <span className="sr-only">go back</span>
                    <img src={homeSVG} alt="" />
                </Link>
            </aside>
            <Paper unstyled component="section" p="xl" shadow="lg" className="baseFormStyling">
                <Text size="lg" fw={500}>
                    Create an account
                </Text>

                <Divider labelPosition="center" my="lg" />

                <form onSubmit={onSubmitClicked}>
                    <Stack>
                        <TextInput
                            label="Name"
                            aria-label="enter your name"
                            type="text"
                            id="name"
                            value={username}
                            onChange={onNameChange}
                            required
                            autoFocus
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            aria-label="enter a password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={onPasswordChange}
                            radius="md"
                        />
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Button
                            unstyled
                            type="submit"
                            aria-label="click to register as a user"
                            className="formSubmitBtn"
                        >
                            Register
                        </Button>

                        {/* <Checkbox
                            label="Trust this Device?"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                            classNames={{ input: "bg-blue" }}
                        /> */}
                    </Group>
                </form>
                <Link to="/login" className="block text-center sm:text-left underline mt-10">
                    Already have an account? Login now
                </Link>
            </Paper>
        </section>
    );
};

export default Register;
