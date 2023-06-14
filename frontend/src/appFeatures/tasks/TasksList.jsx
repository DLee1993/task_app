import Task from "./Task";
import { PropTypes } from "prop-types";
import { Table, ScrollArea } from "@mantine/core";

const TasksList = () => {
    let content;
    content = <Task />;

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

TasksList.propTypes = {
    editMenuOpen: PropTypes.func,
    close: PropTypes.func,
};

export default TasksList;
