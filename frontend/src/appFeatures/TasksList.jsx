const TasksList = () => {
    const tasks = [
        {
            priority: 1,
            title: "Shopping List",
            description: "milk, bread, pasta, ketchup, mustard",
            category: "Home",
        },
    ];

    const content = tasks.map((task) => (
        <li key={task.title} className="task_listItem">
            <p>{task.title}</p>
            <p>{task.description}</p>
            <div>{task.category}</div>
            <section>
                <p>{task.priority}</p>
            </section>
        </li>
    ));

    return <ul className="tasks_list">{content}</ul>;
};

export default TasksList;
