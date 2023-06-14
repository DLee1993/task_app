import Task from "./Task";
import { Table, ScrollArea } from "@mantine/core";

const TasksList = () => {
    let content;
    <Task />;

    return (
        <>
            <ScrollArea>
                <Table
                    className="tasks_list"
                    striped
                    highlightOnHover
                    verticalSpacing="md"
                    horizontalSpacing="lg"
                    fontSize="md"
                >
                    <thead>
                        <tr>
                            <th className="title">Title</th>
                            <th className="description">Description</th>
                            <th className="category">Category</th>
                            <th className="completed">Completed</th>
                            <th className="viewTask"></th>
                        </tr>
                    </thead>
                    <tbody>{content}</tbody>
                </Table>
            </ScrollArea>
        </>
    );
};

export default TasksList;
