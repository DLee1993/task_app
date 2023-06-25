import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewTaskMutation } from "../../appFeatures/tasks/tasksSlice";
import { toast } from "react-toastify";
import Header from "../Dashboard/Header";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("home");
    const navigate = useNavigate();

    const [addNewTask, { isLoading, isSuccess, isError, error }] = useAddNewTaskMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard");
            setTitle("");
            setDescription("");
            setCategory("home");
            toast.success("New Task added", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
        if (isError) {
            toast.error(`${error.data.message}`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            setTitle("");
        }
    }, [isSuccess, isError, error, navigate]);

    const canSave = [title, description, category].every(Boolean) && !isLoading;

    const onSaveTaskClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewTask({
                user: "645dd507c4aff17007b29a7f", //! - CHANGE THIS TO THE LOGGED IN USER
                task_title: title,
                task_description: description,
                category,
            });
        }
    };

    return (
        <>
            <Header />
            <section className="add_task_form_container">
                <form className="addTaskForm" onSubmit={onSaveTaskClicked}>
                    <section>
                        <fieldset className="task_title">
                            <label htmlFor="task_title">Title:</label>
                            <input
                                type="text"
                                id="task_title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
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
                        <section className="form_btn_group">
                            <button
                                type="submit"
                                className="form_btn filled color_transition"
                                aria-label="submit new task button"
                                disabled={!canSave}
                            >
                                Submit
                            </button>
                        </section>
                    </section>
                </form>
            </section>
        </>
    );
};

export default AddTask;
