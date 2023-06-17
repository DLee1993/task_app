import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewTaskMutation } from "../../appFeatures/tasks/tasksSlice";
import { Modal, Button } from "@mantine/core";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";

const AddTaskModal = ({ opened, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("home");
    const navigate = useNavigate();

    const [addNewTask, { isLoading, isSuccess, isError, error }] = useAddNewTaskMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard");
            onClose(true);
            setTitle("");
            setDescription("");
            setCategory("home");
        }
        if (isError) {
            toast.error(`${error.data.message}`);
            setTitle("");
        }
    }, [isSuccess, isError, error, navigate, onClose]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setCategory("home");
        onClose(true);
    };

    const canSave = [title, description, category].every(Boolean) && !isLoading;

    const onSaveTaskClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewTask({
                user: "645dd507c4aff17007b29a7f",
                task_title: title,
                task_description: description,
                category,
            });
        } else {
            toast.error(`${error.data.message}`);
        }
    };

    return (
        <Modal opened={opened} onClose={resetForm} title="Add a new Task" centered fullScreen>
            <form className="addTaskForm" onSubmit={onSaveTaskClicked}>
                <section>
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
                </section>
                <section>
                    <fieldset className="task_category">
                        <label htmlFor="task_category">Pick a category for your task:</label>
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
                    <Button.Group className="form_btn_group">
                        <Button onClick={resetForm} className="outline color_transition">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!canSave}
                            className="filled color_transition"
                        >
                            Submit
                        </Button>
                    </Button.Group>
                </section>
            </form>
        </Modal>
    );
};

AddTaskModal.propTypes = {
    opened: PropTypes.bool,
    onClose: PropTypes.func,
};

export default AddTaskModal;
