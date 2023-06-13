import { useState, useEffect } from "react";
import { useAddNewTaskMutation } from "../../../appFeatures/tasks/tasksSlice";
import { Modal, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { PropTypes } from "prop-types";

const AddTaskModal = ({ opened, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("home");
    const [date, setDate] = useState(null);

    const cancelForm = () => {
        setTitle("");
        setDescription("");
        setCategory("home");
        setDate(null);
        onClose(true);
    };

    const [addNewNote, { isLoading, isSuccess, isError, error }] = useAddNewTaskMutation();

    const canSave = [title, description].every(Boolean) && !isLoading;

    const onSaveTaskClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewNote({
                user: "645dd507c4aff17007b29a7f",
                task_title: title,
                task_description: description,
                category,
                toBeCompletedBy: date,
            });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setTitle("");
            setDescription("");
            setCategory("home");
            setDate(null);
            onClose(true);
        }

        if (isError) {
            console.log(error);
        }
    }, [isSuccess, isError, error, onClose]);

    return (
        <Modal opened={opened} onClose={cancelForm} title="Add a new Task" centered fullScreen>
            <form className="addTaskForm" onSubmit={onSaveTaskClicked}>
                <fieldset className="task_title">
                    <label htmlFor="task_title">Title:</label>
                    <input
                        type="text"
                        id="task_title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </fieldset>
                <fieldset className="task_description">
                    <label htmlFor="task_description">Description:</label>
                    <textarea
                        type="text"
                        id="task_description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </fieldset>
                <fieldset className="task_category">
                    <select
                        name="task_category"
                        id="task_category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="university">University</option>
                        <option value="social">Social</option>
                        <option value="exercise">Exercise</option>
                        <option value="health">Health</option>
                    </select>
                </fieldset>
                <fieldset className="date_select">
                    <DateInput
                        value={date}
                        onChange={setDate}
                        label="Date input ( optional )"
                        placeholder="Set yourself a date to complete the task"
                        maw={400}
                        mx="auto"
                    />
                </fieldset>
                <Button.Group className="form_btn_group">
                    <Button onClick={cancelForm} className="outline color_transition">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={!canSave} className="filled color_transition">
                        Submit
                    </Button>
                </Button.Group>
            </form>
        </Modal>
    );
};

AddTaskModal.propTypes = {
    opened: PropTypes.bool,
    onClose: PropTypes.func,
};

export default AddTaskModal;
