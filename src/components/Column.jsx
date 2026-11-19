
import TaskCard from "./TaskCard";

function Column({ title, tasks }) {
  return (
    <div className="kanban-column">

      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>

    </div>
  );
}

export default Column;
