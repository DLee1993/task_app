const TasksList = () => {
    const tasks = [
        {
            priority: 1,
            title: "Shopping List",
            description: "milk, bread, pasta, ketchup, mustard",
            category: "Home",
        },
        {
            priority: 2,
            title: "Second List",
            description: "milk, bread, pasta, ketchup, mustard",
            category: "University",
        },
        {
            priority: 3,
            title: "Shopping List",
            description: "milk, bread, pasta, ketchup, mustard",
            category: "Home",
        },
        {
            priority: 4,
            title: "Second List",
            description: "milk, bread, pasta, ketchup, mustard",
            category: "University",
        },
    ];

    const content = tasks.map((task) => (
        <li key={task.priority}>
            <div>{task.priority}</div>
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.category}</div>
        </li>
    ));

    return <ul>{content}</ul>;
};

export default TasksList;
