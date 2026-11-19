
import Column from "../components/Column";

function BoardPage({ tasks }) {

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  );

  return (
    <div className="board-page">

      <header className="board-header">
        <div>
          <h1>My Kanban Board</h1>
          <p>Organize your tasks and track your progress.</p>
        </div>
      </header>

      <div className="kanban-board">

        <Column
          title="To Do"
          tasks={todoTasks}
        />

        <Column
          title="In Progress"
          tasks={inProgressTasks}
        />

        <Column
          title="Done"
          tasks={doneTasks}
        />

      </div>

    </div>
  );
}

export default BoardPage;
