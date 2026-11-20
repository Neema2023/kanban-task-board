
import TaskCard from "./TaskCard";

function Column({
  title,
  status,
  tasks,
  moveTask,
  deleteTask,
  archiveTask,
}) {
  const columnClasses = {
    todo: "todo-column",
    "in-progress": "progress-column",
    done: "done-column",
  };

  return (
    <section className={`kanban-column ${columnClasses[status]}`}>

      <header className="column-header">

        <div className="column-title">
          <span className="column-dot"></span>
          <h2>{title}</h2>
        </div>

        <span className="column-count">
          {tasks.length}
        </span>

      </header>

      <div className="column-content">

        {tasks.length > 0 ? (

          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              moveTask={moveTask}
              deleteTask={deleteTask}
              archiveTask={archiveTask}
            />
          ))

        ) : (

          <div className="empty-column">
            <span>📋</span>
            <p>No tasks here yet</p>
          </div>

        )}

      </div>

    </section>
  );
}

export default Column;
