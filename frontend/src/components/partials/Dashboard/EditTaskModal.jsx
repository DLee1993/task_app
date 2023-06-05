import { useState } from "react";
import { PropTypes } from "prop-types";
import { Button, Modal, Group } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { toast } from "react-toastify";

const EditTaskModal = ({ editTaskOpened, close }) => {
    //!- The default value needs to be the original tasks values !!!!!
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newDate, setNewDate] = useState(null);
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newCategoryValue, setNewCategoryValue] = useState("home");
    const [completed, setCompleted] = useState("home");

    const markAsComplete = () => {
        setCompleted(!completed);
        close(true);
        toast.success("Task Completed!");
    };

    const formCancelled = () => {
        setNewTaskTitle("");
        setNewTaskDescription("");
        setNewDate(null);
        setNewCategoryValue("home");
        close(true);
    };

    const formSubmitted = (e) => {
        e.preventDefault();
        setNewTaskTitle("");
        setNewTaskDescription("");
        setNewDate(null);
        setNewCategoryValue("home");
        console.log({
            title: newTaskTitle,
            description: newTaskDescription,
            category: newCategoryValue,
            newDate,
        });
    };

    return (
        <>
            <Modal
                opened={editTaskOpened}
                onClose={close}
                title="Edit a Task"
                fullScreen
                className="editTaskModal"
            >
                <form className="editTaskForm" onSubmit={formSubmitted}>
                    <section className="editTask_flex_container">
                        <section className="task_details">
                            <fieldset>
                                <label htmlFor="task_title">Change Title: </label>
                                <input
                                    type="text"
                                    id="task_title"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="task_description">Change Description: </label>
                                <textarea
                                    type="text"
                                    id="task_description"
                                    value={newTaskDescription}
                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                />
                            </fieldset>
                        </section>
                        <section className="select_options">
                            <fieldset>
                                <label htmlFor="task_category">Select a new Category:</label>
                                <select
                                    name="category"
                                    id="task_category"
                                    value={newCategoryValue}
                                    onChange={(e) => setNewCategoryValue(e.target.value)}
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
                                label="Pick a new Date ( optional )"
                                placeholder="Pick Date"
                                value={newDate}
                                onChange={setNewDate}
                            />
                        </section>
                    </section>
                    <Group className="editTask_btns">
                        <Button
                            className="cancel-cta outline color_transition"
                            onClick={formCancelled}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="markAsComplete-cta outline color_transition"
                            onClick={markAsComplete}
                        >
                            Mark as Complete
                        </Button>
                        <Button
                            className="save-cta filled color_transition"
                            type="submit"
                            onClick={close}
                        >
                            Save
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
};

EditTaskModal.propTypes = {
    editTaskOpened: PropTypes.bool,
    close: PropTypes.func,
};

export default EditTaskModal;
