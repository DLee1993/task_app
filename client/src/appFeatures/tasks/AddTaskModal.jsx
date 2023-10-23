import { useState, useEffect } from "react";
import { useAddNewTaskMutation } from "../../appFeatures/tasks/tasksSlice";
import { selectAllUsers } from "../../appFeatures/users/usersSlice";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { categories } from "./DocumentCategories";
import { PropTypes } from "prop-types";
import { Button, Modal, Group, TextInput, Textarea, Stack, Select } from "@mantine/core";
import { toast } from "react-toastify";

export const AddTaskModal = ({ addTaskOpened, closeAddTask }) => {
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [addNewTask, { isLoading, isSuccess, isError, error }] = useAddNewTaskMutation();
    const canSave = [title, description].every(Boolean) && !isLoading;
    const { username } = useAuth();
    const users = useSelector(selectAllUsers);
    let taskCreator;

    users.forEach((user) => {
        if (user.username === username) {
            taskCreator = user._id;
        }
    });

    useEffect(() => {
        if (isSuccess) {
            resetForm();
            toast.success("New Task added");
            closeAddTask();
        }
        if (isError) {
            toast.error(`${error.data.message}`);
            setTitle("");
            setTitleError(error.data.message);
        }
    }, [isSuccess, isError, error, closeAddTask]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setCategory("");
        setTitleError("");
    };

    const onSaveTaskClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewTask({
                user: `${taskCreator}`,
                task_title: title,
                task_description: description,
                category,
            });
        }
    };

    return (
        <Modal opened={addTaskOpened} onClose={closeAddTask} title="Add a New Task" centered>
            <form>
                <Stack>
                    <TextInput
                        required
                        id="task_title"
                        label="Title"
                        placeholder="Add task title"
                        radius="md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        aria-label="add task title"
                    />
                    <TextInput
                        value={titleError}
                        role="alert"
                        className="sr-only"
                        unstyled
                        readOnly
                        tabIndex={-1}
                    />
                    <Textarea
                        required
                        id="task_description"
                        label="Description"
                        placeholder="Add task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        aria-label="add task description"
                        autosize
                        minRows={4}
                        maxRows={6}
                    />
                    <Select
                        id="task_category"
                        label="Category (optional)"
                        placeholder="Pick value"
                        aria-label="press enter to select an option"
                        value={category}
                        onChange={setCategory}
                        data={categories}
                        clearable
                    />
                </Stack>
                <Group mt="lg" justify="space-between">
                    <Button
                        disabled={!canSave}
                        onClick={onSaveTaskClicked}
                        color="teal"
                        aria-label="press enter to save new task"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => {
                            closeAddTask(), resetForm();
                        }}
                        color="rgba(43, 45, 66, 1)"
                        variant="outline"
                        aria-label="press enter to cancel new task"
                    >
                        Cancel
                    </Button>
                </Group>
            </form>
        </Modal>
    );
};

AddTaskModal.propTypes = {
    addTaskOpened: PropTypes.bool,
    closeAddTask: PropTypes.func,
};
