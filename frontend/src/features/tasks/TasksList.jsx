import { Table } from "@mantine/core";
// import { HiFlag } from "react-icons/hi2";

const TasksList = () => {
    const elements = [
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon", edit: "yes" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen", edit: "yes" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium", edit: "yes" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium", edit: "yes" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium", edit: "yes" },
    ];

    const rows = elements.map((element) => (
        <tr key={element.name}>
            <td>{element.position}</td>
            <td>{element.name}</td>
            <td>{element.symbol}</td>
            <td>{element.mass}</td>
            <td>{element.edit}</td>
        </tr>
    ));

    return (
        <Table>
            <thead>
                <tr>
                    <th>Task Title and date created</th>
                    <th>Task category</th>
                    <th>Task priority</th>
                    <th>Task completed status</th>
                    <th>Task Edit Button</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};

export default TasksList;
