import { Table, Checkbox, Badge } from "@mantine/core";
import { HiFlag, HiAcademicCap } from "react-icons/hi2";

const TasksList = () => {
    return (
        <>
            <section className="filter_tasks">this is for the search bar</section>
            <section className="open_tasks">
                <Table>
                    <tbody>
                        <tr>
                            <td className="task_status">
                                <Checkbox />
                            </td>
                            <td className="task_details">
                                <h2>Task name</h2>
                                <p>Today At 16:45</p>
                            </td>
                            <td className="task_category">
                                <Badge>
                                    <span className="category_icon">
                                        <HiAcademicCap />
                                    </span>
                                    <span className="category_name">University</span>
                                </Badge>
                                <Badge>
                                    <span className="task_priority">
                                        <HiFlag />
                                    </span>
                                    <span className="priority_num">1</span>
                                </Badge>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </section>
            <section className="completed_tasks">this is for completed tasks</section>
        </>
    );
};

export default TasksList;
