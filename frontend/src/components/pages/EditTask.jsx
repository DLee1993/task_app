//! - THIS IS WHERE WE SELECT TASK BY ID WITH TASKSLICE
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IoArrowBack } from "react-icons/io5";

const EditTask = () => {
    //! - Add the original values to the useState
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("home");
    const [date, setDate] = useState(null);

    const navigate = useNavigate();

    const canSave = [title, description].every(Boolean);

    const onSaveTaskClicked = async (e) => {
        e.preventDefault();
        console.log("this is where we save the form");
    };

    const deleteTask = () => {
        console.log("this is where we delete the task, maybe add a confirm modal??");
    };

    return (
        <>
            <IoArrowBack size={25} onClick={() => navigate(-1)} className="return_btn" />
            <form className="editTaskForm" onSubmit={onSaveTaskClicked}>
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
                    <Button onClick={deleteTask} className="warning color_transition">
                        Delete Task
                    </Button>
                    <Button type="submit" disabled={!canSave} className="filled color_transition">
                        Update Task
                    </Button>
                </Button.Group>
            </form>
        </>
    );
};

export default EditTask;
