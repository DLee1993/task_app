import { useNavigate } from "react-router-dom";
import { Table, Text, ScrollArea } from "@mantine/core";
import { BsPencilSquare } from "react-icons/bs";

const TasksList = () => {
    const navigate = useNavigate();
    const tasks = [
        {
            priority: 1,
            title: "Shopping List",
            description: "milk, bread, pasta, ketchup, mustard",
            category: "Home",
        },
        {
            priority: 2,
            title: "Shopping",
            description: "milk, bread, pasta, ketchup, mustard",
            category: "Home",
        },
        {
            priority: 3,
            title: "List",
            description: "milk, bread, pasta, ketchup, mustard",
            category: "Home",
        },
        {
            priority: 4,
            title: "Test",
            description: "milk, bread, pasta, ketchup, mustard",
            category: "Home",
        },
        {
            priority: 5,
            title: "Shop",
            description: "milk, bread, pasta, ketchup, mustard",
            category: "Home",
        },
        {
            priority: 6,
            title: "testing",
            description: "milk, bread, pasta, ketchup, mustard",
            category: "Home",
        },
    ];

    const editTask = (taskName) => {
        navigate(`/dashboard/task/${taskName}`);
    };

    const content = tasks.map((task) => (
        <tr key={task.title}>
            <td className="title">
                <Text>{task.title}</Text>
            </td>
            <td className="description">
                <Text>{task.description}</Text>
            </td>
            <td className="category">{task.category}</td>
            <td className="priority">{task.priority}</td>
            <td className="edit">
                <BsPencilSquare
                    className="edit_btn color_transition"
                    size={25}
                    onClick={() => editTask(task.title)}
                    style={{ cursor: "pointer" }}
                />
            </td>
        </tr>
    ));

    return (
        <ScrollArea h={450}>
            <Table
                className="tasks_list"
                striped
                highlightOnHover
                verticalSpacing="md"
                fontSize="md"
            >
                <thead>
                    <tr>
                        <th className="title">Title</th>
                        <th className="description">Description</th>
                        <th className="category">Category</th>
                        <th className="priority">Priority</th>
                        <th className="edit"></th>
                    </tr>
                </thead>
                <tbody>{content}</tbody>
            </Table>
        </ScrollArea>
    );
};

export default TasksList;
