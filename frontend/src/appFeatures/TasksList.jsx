import { Table } from "@mantine/core";

const TasksList = () => {
    const tasks = [
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
    ];

    const rows = tasks.map((task) => (
        <tr key={task.name}>
            <td>{task.position}</td>
            <td>{task.name}</td>
            <td>{task.symbol}</td>
            <td>{task.mass}</td>
        </tr>
    ));

    return (
        <Table highlightOnHover className="task_list" verticalSpacing="sm">
            <thead>
                <tr>
                    <th>Task position</th>
                    <th>Task name</th>
                    <th>Symbol</th>
                    <th>Atomic mass</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};

export default TasksList;
