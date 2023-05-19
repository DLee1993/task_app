import { Checkbox } from "@mantine/core";

const Task = () => {
    return (
        <li>
            <Checkbox />
            <p className="task_details">
                Task Title <span>today at 06:45am</span>
            </p>
        </li>
    );
};

export default Task;
