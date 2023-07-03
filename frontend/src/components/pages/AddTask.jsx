import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewTaskMutation } from "../../appFeatures/tasks/tasksSlice";
import { toast } from "react-toastify";
import Header from "../partials/Header";

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
            <Header title={"Add a new Task"} />
            <section
                id="add_task_form_container"
                className="flex justify-center items-center flex-col h-screen sm:h-full min-h-[650px] sm:min-h-0 sm:mt-10"
            >
                <form
                    id="addTaskForm"
                    onSubmit={onSaveTaskClicked}
                    className="w-full flex justify-evenly items-center flex-col sm:flex-row"
                >
                    <section className="sm:min-h-[350px] flex justify-between items-center flex-col">
                        <fieldset id="task_title_input" className="flex flex-col">
                            <label htmlFor="task_title" className="text-lg pb-2">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="task_title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                                className="bg-fadedBlack w-80 h-10 text-fadedWhite pl-1"
                            />
                        </fieldset>
                        <fieldset id="task_description_input" className="flex flex-col">
                            <label htmlFor="task_description" className="text-lg pb-2">
                                Description:
                            </label>
                            <textarea
                                type="text"
                                id="task_description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-fadedBlack w-80 h-52 text-fadedWhite pl-1 resize-none"
                            />
                        </fieldset>
                    </section>
                    <section className="sm:min-h-[350px] flex justify-between items-end flex-col mb-14 sm:mb-0">
                        <fieldset id="task_category_input" className="flex flex-col">
                            <label htmlFor="task_category" className="text-lg pb-2">
                                Task Category: ( optional )
                            </label>
                            <select
                                name="task_category"
                                id="task_category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-fadedBlack w-80 h-10 text-fadedWhite pl-1"
                            >
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                                <option value="university">University</option>
                                <option value="social">Social</option>
                                <option value="exercise">Exercise</option>
                                <option value="health">Health</option>
                            </select>
                        </fieldset>
                        <section id="form_btn_group" className="w-full my-10 sm:my-0">
                            <button
                                type="submit"
                                id="form_btn filled color_transition"
                                aria-label="submit new task button"
                                disabled={!canSave}
                                className="w-full cursor-pointer sm:max-w-xs h-10 sm:h-12 text-lg flex justify-center items-center bg-transparent border-brightPurple border-2 hover:bg-brightPurple hover:border-transparent transition duration-200"
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
