import { useState, useEffect } from "react";
import { categories } from "./DocumentCategories";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../appFeatures/tasks/tasksSlice";
import { PropTypes } from "prop-types";
import { Button, Modal, Group, TextInput, Textarea, Stack, Select, Checkbox } from "@mantine/core";

import { toast } from "react-toastify";

export const EditTaskModal = ({ editTaskOpened, closeEditTask, task }) => {
    const [title, setTitle] = useState(task?.task_title);
    const [description, setDescription] = useState(task?.task_description);
    const [category, setCategory] = useState(task?.category);
    const [completed, setCompleted] = useState(task.completed);

    const [deleteTask, { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] =
        useDeleteTaskMutation();
    const [updateTask, { isLoading, isSuccess, isError, error }] = useUpdateTaskMutation();

    const canSave = [title, description].every(Boolean) && !isLoading;

    useEffect(() => {
        if (isSuccess) {
            closeEditTask();
            toast.info("Task Updated");
        }
        if (isDeleteSuccess) {
            closeEditTask();
            toast.error("Task Deleted");
        }

        if (isError) {
            toast.error(error.data.message, {
                toastId: "saveErrorToast",
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        if (isDeleteError) {
            toast.error(deleteError.data.message, {
                toastId: "deleteErrorToast",
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    }, [isSuccess, isDeleteSuccess, isDeleteError, isError, error, deleteError, closeEditTask]);

    const checkMark = () => {
        setCompleted(!completed);
    };

    const onSaveTaskClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await updateTask({
                id: task.id,
                user: task.user,
                task_title: title,
                task_description: description,
                category,
                completed: completed,
            });
        }
    };

    const onDeleteTaskClicked = async () => {
        await deleteTask({ id: task.id });
    };

    return (
        <Modal opened={editTaskOpened} onClose={closeEditTask} title="Edit Task" centered>
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
                    />
                    <Textarea
                        required
                        id="task_description"
                        label="Description"
                        placeholder="Add task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        autosize
                        minRows={4}
                        maxRows={6}
                    />
                    <Select
                        id="task_category"
                        label="Category (optional)"
                        placeholder="Pick value"
                        value={category}
                        onChange={setCategory}
                        data={categories}
                        clearable
                    />
                    <Checkbox
                        mt="lg"
                        mb="lg"
                        checked={completed}
                        onChange={checkMark}
                        label="Mark as complete"
                        aria-label="checkbox to mark task as complete or incomplete"
                    />
                </Stack>
                <Group mt="lg" justify="space-between">
                    <Group>
                        <Button onClick={onSaveTaskClicked} color="teal">
                            Save
                        </Button>
                        <Button color="red" onClick={onDeleteTaskClicked}>
                            Delete
                        </Button>
                    </Group>
                    <Button onClick={closeEditTask} color="rgba(43, 45, 66, 1)" variant="outline">
                        Cancel
                    </Button>
                </Group>
            </form>
        </Modal>
    );
};

EditTaskModal.propTypes = {
    editTaskOpened: PropTypes.bool,
    closeEditTask: PropTypes.func,
    task: PropTypes.object,
};
