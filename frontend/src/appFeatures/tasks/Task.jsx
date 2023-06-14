import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Text, Checkbox } from "@mantine/core";

const Task = ({ taskId }) => {
    // const navigate = useNavigate();

    // const handleRedirect = () => navigate(`/dashboard/tasks/${taskId}`);

    return (
        <tr>
            <td className="title">
                <Text>Title</Text>
            </td>
            <td className="description">
                <Text>description</Text>
            </td>
            <td className="category">category</td>
            <td className="completed">
                <Checkbox size="sm" />
            </td>
            <td className="viewTask">
                <Link to={`/dashboard/tasks/${taskId}`}>View</Link>
            </td>
        </tr>
    );
};

Task.propTypes = {
    taskId: PropTypes.string,
    editTaskOpen: PropTypes.func,
};

export default Task;
