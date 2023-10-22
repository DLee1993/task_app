import { useState } from "react";
import { PropTypes } from "prop-types";
import { Button, Modal, Group, TextInput, Textarea, Stack, Select, Checkbox } from "@mantine/core";
import { categories } from "./DocumentCategories";

export const EditTaskModal = ({ editTaskOpened, closeEditTask }) => {
    //! - all state needs to have an initial value of the current task

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [completed, setCompleted] = useState(true);

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
                        onChange={(event) => setCompleted(event.currentTarget.checked)}
                        label="Mark as complete"
                    />
                </Stack>
                <Group mt="lg" justify="space-between">
                    <Button>Save</Button>
                    <Button onClick={closeEditTask}>Cancel</Button>
                </Group>
            </form>
        </Modal>
    );
};

EditTaskModal.propTypes = {
    editTaskOpened: PropTypes.bool,
    closeEditTask: PropTypes.func,
};
