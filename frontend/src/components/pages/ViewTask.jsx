import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { IoArrowBack } from "react-icons/io5";

const ViewTask = () => {
    const navigate = useNavigate();

    const handleEditRedirect = () => {
        navigate(`/dashboard`);
    };

    return (
        <>
            <IoArrowBack size={25} onClick={() => navigate(-1)} className="return_btn" />
            <article>
                <p></p>
                <h2></h2>
                <p></p>
                <p></p>
                <p>Completed</p>
                <p>created on:</p>
                <p>last updated:</p>
                <section className="task_actions">
                    <Button className="warning color_tranisiton">Delete Task</Button>
                    <Button className="filled color_tranisiton" onClick={handleEditRedirect}>
                        Update Task
                    </Button>
                </section>
            </article>
        </>
    );
};

export default ViewTask;
