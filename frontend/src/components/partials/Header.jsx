import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDisclosure } from "@mantine/hooks";
import {
    Menu,
    Button,
    Modal,
    Drawer,
    NativeSelect,
    TextInput,
    Textarea,
    Group,
    Box,
} from "@mantine/core";
import { SlSettings, SlExclamation, SlPencil } from "react-icons/sl";
import { RiAccountPinCircleFill } from "react-icons/ri";

const Header = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Home");
    const [priority, setPriority] = useState(1);
    const [description, setDescription] = useState("");

    const [addTaskModalOpened, { open: openTaskModal, close: closeTaskModal }] =
        useDisclosure(false);

    const [profileDrawOpened, { open: openProfileDraw, close: closeProfileDraw }] =
        useDisclosure(false);

    const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
        useDisclosure(false);

    const titleChanged = (e) => {
        if (e.target.value !== 0) setTitle(e.target.value);
    };

    const descriptionChanged = (e) => {
        if (e.target.value !== 0) setDescription(e.target.value);
    };

    const canSave = [title, description, priority, category].every(Boolean);

    const addTaskFormSubmitted = (e) => {
        e.preventDefault();
        //! - THIS IS WHERE WE ADD THE TASK TO THE DATABASE
        canSave
            ? console.log({ title, description, category, priority })
            : toast.error("Please Fill in all Fields");

        setTitle("");
        setDescription("");
        setCategory("");
    };

    const deleteAccount = () => {
        alert("Account deleted from action");
        closeDeleteModal(true);
    };

    return (
        <>
            <ToastContainer />
            <nav>
                <Menu width={200}>
                    <Menu.Target>
                        <Button>Toggle menu</Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>CRUD</Menu.Label>
                        <Menu.Item icon={<SlPencil />} onClick={openTaskModal}>
                            Add Task
                        </Menu.Item>
                        <Menu.Item icon={<SlSettings />} onClick={openProfileDraw}>
                            Profile
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Item color="red" icon={<SlExclamation />} onClick={openDeleteModal}>
                            Delete my account
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                <h1>dashboard</h1>
                <RiAccountPinCircleFill
                    className="profile-shortcut_icon"
                    onClick={openProfileDraw}
                />
            </nav>

            <Modal opened={addTaskModalOpened} onClose={closeTaskModal} className="add-task_modal">
                <h1 className="add-task_modal-header">Add a Task</h1>
                <Box>
                    <form onSubmit={addTaskFormSubmitted} className="add-task_form">
                        <TextInput
                            label="Title"
                            placeholder="Task title"
                            value={title}
                            onChange={titleChanged}
                            required
                        />

                        <Textarea
                            placeholder="Describe your tasks"
                            label="Title Description"
                            value={description}
                            onChange={descriptionChanged}
                            required
                        />

                        <NativeSelect
                            data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                            label="Task Priority"
                            value={priority}
                            onChange={(event) => setPriority(event.target.value)}
                            required
                        />

                        <NativeSelect
                            data={[
                                "Home",
                                "Work",
                                "Grocery",
                                "Fitness",
                                "University",
                                "health",
                                "Music",
                                "Movies",
                            ]}
                            label="Task Category"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            required
                        />

                        <Group position="right" mt="md">
                            <Button type="submit" onClick={closeTaskModal} disabled={!canSave}>
                                Submit
                            </Button>
                        </Group>
                    </form>
                </Box>
            </Modal>

            <Drawer
                className="profile_side-menu"
                opened={profileDrawOpened}
                onClose={closeProfileDraw}
                position="right"
            >
                USER PROFILE SIDE DRAW
            </Drawer>

            <Modal
                opened={deleteModalOpened}
                onClose={closeDeleteModal}
                className="delete_account-modal"
                title="Delete Your account?"
            >
                <p>
                    <SlExclamation /> Warning
                </p>
                <p>This Action will remove your account permanently!</p>
                <section className="account_cta">
                    <button onClick={closeDeleteModal}>Cancel</button>
                    <button onClick={deleteAccount}>Confirm</button>
                </section>
            </Modal>
        </>
    );
};

export default Header;
