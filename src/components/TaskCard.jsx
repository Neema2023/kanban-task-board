
function TaskCard({ task }) {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>

        <span className={`priority priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <p>{task.description}</p>
    </div>
  );
}

export default TaskCard;
