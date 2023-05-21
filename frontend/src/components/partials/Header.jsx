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
import { useState } from "react";

const Header = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const [addTaskModalOpened, { open: openTaskModal, close: closeTaskModal }] =
        useDisclosure(false);
    const [profileDrawOpened, { open: openProfileDraw, close: closeProfileDraw }] =
        useDisclosure(false);

    const titleChanged = (e) => {
        if (e.target.value !== 0) setTitle(e.target.value);
    };
    const descriptionChanged = (e) => {
        if (e.target.value !== 0) setDescription(e.target.value);
    };

    const canSave = [title, description].every(Boolean);

    const addTaskFormSubmitted = (e) => {
        e.preventDefault();
        //! - THIS IS WHERE WE VALIDATE
        canSave
            ? console.log({ title, description, category })
            : toast.error("Please Fill in all Fields");
        setTitle("");
        setDescription("");
        setCategory("");
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
                        <Menu.Item color="red" icon={<SlExclamation />}>
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

            <Modal opened={addTaskModalOpened} onClose={closeTaskModal}>
                <h1>Add a Task</h1>
                <Box maw={300} mx="auto">
                    <form onSubmit={addTaskFormSubmitted}>
                        <TextInput
                            withAsterisk
                            label="Title"
                            placeholder="Task title"
                            value={title}
                            onChange={titleChanged}
                        />

                        <Textarea
                            placeholder="Describe your tasks"
                            label="Title Description"
                            value={description}
                            onChange={descriptionChanged}
                            withAsterisk
                        />

                        <NativeSelect
                            data={["", "Home", "Work"]}
                            label="Task Category"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        />

                        <Group position="right" mt="md">
                            <Button type="submit" onClick={closeTaskModal} disabled={!canSave}>Submit</Button>
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
        </>
    );
};

export default Header;
