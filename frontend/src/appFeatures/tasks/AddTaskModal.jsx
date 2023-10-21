import { useState } from "react";
import { PropTypes } from "prop-types";
import { Button, Modal, Group, TextInput, Textarea, Stack, Select } from "@mantine/core";
import { categories } from "./DocumentCategories";

export const AddTaskModal = ({ addTaskOpened, closeAddTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setCategory("home");
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
                </Stack>
                <Group mt="lg" justify="space-between">
                    <Button>Save</Button>
                    <Button
                        onClick={() => {
                            closeAddTask(), resetForm();
                        }}
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
