
import { Link } from "react-router-dom";

function TaskCard({
  task,
  moveTask,
  deleteTask,
  archiveTask,
}) {
  const nextStatus = {
    todo: "in-progress",
    "in-progress": "done",
    done: "todo",
  };

  const nextLabel = {
    todo: "Start Task →",
    "in-progress": "Mark Done ✓",
    done: "Move to To Do ↶",
  };

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Completed",
  };

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      deleteTask(task.id);
    }
  }

  return (
    <article
      className={`task-card ${
        task.status === "done"
          ? "card-done"
          : task.status === "in-progress"
          ? "card-in-progress"
          : ""
      }`}
    >

      <Link
        to={`/task/${task.id}`}
        className="task-card-link"
      >

        <div className="task-card-heading">

          <h3>{task.title}</h3>

          <span
            className={`priority-badge priority-${(
              task.priority || "Medium"
            ).toLowerCase()}`}
          >
            {task.priority || "Medium"}
          </span>

        </div>

        <p className="task-description">
          {task.description || "No description provided."}
        </p>

        <div className="task-card-footer">

          <span className="task-status-label">
            {task.status === "done" ? "✓ " : "◷ "}
            {statusLabels[task.status]}
          </span>

          <span className="task-view-icon">›</span>

        </div>

      </Link>

      <div className="task-actions">

        <button
          type="button"
          className="task-move-button"
          onClick={() =>
            moveTask(task.id, nextStatus[task.status])
          }
        >
          {nextLabel[task.status]}
        </button>

        {task.status === "done" && (
          <button
            type="button"
            className="task-archive-button"
            onClick={() => archiveTask(task.id)}
          >
            Archive
          </button>
        )}

        <button
          type="button"
          className="task-delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

    </article>
  );
}

export default TaskCard;
