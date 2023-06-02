import { useState } from "react";
import { PropTypes } from "prop-types";
import { Button, Modal, Group } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

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
        close(true);
    };

    const formSubmitted = (e) => {
        e.preventDefault();
        setTaskTitle("");
        setTaskDescription("");
        setDate(null);
        setCategoryValue("home");
        console.log({
            title: taskTitle,
            description: taskDescription,
            category: categoryValue,
            date,
        });
    };

    return (
        <>
            <Modal
                opened={taskMenuOpened}
                onClose={close}
                title="Add a Task"
                fullScreen
                className="addTaskModal"
            >
                <form className="addTaskForm" onSubmit={formSubmitted}>
                    <section className="flex_container">
                        <fieldset className="task_details">
                            <fieldset>
                                <label htmlFor="task_title">Title: </label>
                                <input
                                    type="text"
                                    id="task_title"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="task_description">Description: </label>
                                <textarea
                                    type="text"
                                    id="task_description"
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                />
                            </fieldset>
                        </fieldset>
                        <fieldset className="date_select">
                            <fieldset>
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
                            <DatePickerInput
                                label="Pick date ( optional )"
                                placeholder="Pick date"
                                value={date}
                                onChange={setDate}
                            />
                        </fieldset>
                    </section>
                    <Group className="addTask_btns">
                        <Button className="cancel-cta outline" onClick={formCancelled}>
                            Cancel
                        </Button>
                        <Button
                            className="save-cta filled"
                            type="submit"
                            onClick={close}
                            disabled={!canSave}
                        >
                            Save
                        </Button>
                    </Group>
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
