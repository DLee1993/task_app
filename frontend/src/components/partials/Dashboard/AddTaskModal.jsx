/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal } from "@mantine/core";

const AddTaskModal = ({ taskMenuOpened, close }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    return (
        <Modal opened={taskMenuOpened} onClose={close} title="Add a Task">
            <form className="addTaskForm">
                <fieldset className="task_title">
                    <label htmlFor="task_title">Title: </label>
                    <input
                        type="text"
                        id="task_title"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                </fieldset>
                <fieldset className="task_description">
                    <label htmlFor="task_description">Description: </label>
                    <textarea
                        type="text"
                        id="task_description"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </fieldset>
                <Button.Group>
                    <Button className="cancelTask-cta" onClick={close}>
                        Cancel
                    </Button>
                    <Button className="nextInput-cta">Next</Button>
                </Button.Group>
            </form>
        </Modal>
    );
};

export default AddTaskModal;
