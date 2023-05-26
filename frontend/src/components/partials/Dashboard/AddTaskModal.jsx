import { useState } from "react";
import { PropTypes } from "prop-types";
import { Button, Modal, Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const AddTaskModal = ({ taskMenuOpened, close }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [date, setDate] = useState(null);
    const [taskDescription, setTaskDescription] = useState("");
    const [categoryValue, setCategoryValue] = useState("home");

    const canSave = [taskTitle, taskDescription, categoryValue].every(Boolean);

    const formCancelled = () => {
        setTaskTitle("");
        setTaskDescription("");
        setDate(null);
        setCategoryValue("home");
        close(true)
    };
    
    const formSubmitted = (e) => {
        e.preventDefault();
        setTaskTitle("");
        setTaskDescription("");
        setDate(null);
        setCategoryValue("home");
    };

    return (
        <>
            <Modal opened={taskMenuOpened} onClose={close} title="Add a Task" fullScreen>
                <form className="addTaskForm" onSubmit={formSubmitted}>
                    <fieldset className="task_details">
                        <label htmlFor="task_title">Title: </label>
                        <input
                            type="text"
                            id="task_title"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                        <label htmlFor="task_description">Description: </label>
                        <textarea
                            type="text"
                            id="task_description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                        <label htmlFor="task_category">Select a Category:</label>
                        <select
                            name="category"
                            id="task_category"
                            value={categoryValue}
                            onChange={(e) => setCategoryValue(e.target.value)}
                        >
                            <option value="home">Home</option>
                            <option value="university">University</option>
                            <option value="gym">Gym</option>
                            <option value="groceries">Groceries</option>
                            <option value="work">Work</option>
                            <option value="movies">Movies</option>
                            <option value="music">Music</option>
                        </select>
                    </fieldset>
                    <fieldset className="date_select">
                        <h5>Pick a Date to complete the task by ( optional )</h5>
                        <Group position="center">
                            <DatePicker allowDeselect value={date} onChange={setDate} size="md" />
                        </Group>
                    </fieldset>
                    <Button.Group>
                        <Button className="cancel-cta" onClick={formCancelled}>
                            Cancel
                        </Button>
                        <Button
                            className="submit-cta"
                            type="submit"
                            onClick={close}
                            disabled={!canSave}
                        >
                            Save
                        </Button>
                    </Button.Group>
                </form>
            </Modal>
        </>
    );
};

AddTaskModal.propTypes = {
    taskMenuOpened: PropTypes.bool,
    close: PropTypes.func,
};

export default AddTaskModal;
