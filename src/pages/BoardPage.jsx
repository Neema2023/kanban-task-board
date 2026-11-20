
import { useState } from "react";
import { Link } from "react-router-dom";
import Column from "../components/Column";
import useTaskFilter from "../hooks/useTaskFilter";

function BoardPage({
  tasks,
  addTask,
  moveTask,
  deleteTask,
  archiveTask,
}) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [priority, setPriority] = useState("All");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");

  const activeTasks = tasks.filter(
    (task) => !task.archived && task.status !== "done"
  );

  const completedTasks = tasks.filter(
    (task) => !task.archived && task.status === "done"
  );

  const visibleTasks = tasks.filter((task) => !task.archived);

  const filteredTasks = useTaskFilter(
    visibleTasks,
    appliedSearch,
    priority
  );

  const todoTasks = filteredTasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress"
  );

  const doneTasks = filteredTasks.filter(
    (task) => task.status === "done"
  );

  function handleSearch(event) {
    event.preventDefault();
    setAppliedSearch(searchTerm.trim());
  }

  function handleAddTask(event) {
    event.preventDefault();

    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim(),
      priority: newPriority,
      status: "todo",
      archived: false,
    });

    setTitle("");
    setDescription("");
    setNewPriority("Medium");
    setShowForm(false);
  }

  function clearSearch() {
    setSearchTerm("");
    setAppliedSearch("");
    setPriority("All");
  }

  return (
    <div className="app-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <Link to="/" className="sidebar-brand">
          <span className="brand-logo">K</span>
          <span>TaskFlow</span>
        </Link>

        <nav className="sidebar-navigation">

          <Link to="/" className="sidebar-link active">
            <span className="sidebar-icon">⌂</span>
            Board
          </Link>

          <Link to="/archive" className="sidebar-link">
            <span className="sidebar-icon">▣</span>
            Archive
          </Link>

        </nav>

        

      </aside>

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* TOP BAR */}
        <header className="dashboard-topbar">

          <div className="topbar-date">
            <span className="online-dot"></span>
            Your productivity workspace
          </div>

          

        </header>

        <main className="dashboard-content">

          {/* PAGE HEADING */}
          <section className="dashboard-heading">

            <div>
              <p className="heading-label">WORKSPACE</p>

              <h1>My Kanban Board</h1>

              <p>
                Organize your tasks and track your progress.
              </p>

              <span className="heading-underline"></span>
            </div>

            <button
              type="button"
              className="primary-add-button heading-add-button"
              onClick={() => setShowForm(true)}
            >
              <span>＋</span>
              Add Task
            </button>

          </section>

          {/* STATISTICS */}
          <section className="statistics-grid">

            <div className="statistics-card">
              <div className="statistics-icon purple-icon">▣</div>
              <div>
                <h2>{visibleTasks.length}</h2>
                <p>Total Tasks</p>
              </div>
            </div>

            <div className="statistics-card">
              <div className="statistics-icon blue-icon">◷</div>
              <div>
                <h2>
                  {visibleTasks.filter(
                    (task) => task.status === "todo"
                  ).length}
                </h2>
                <p>To Do</p>
              </div>
            </div>

            <div className="statistics-card">
              <div className="statistics-icon orange-icon">↻</div>
              <div>
                <h2>
                  {visibleTasks.filter(
                    (task) => task.status === "in-progress"
                  ).length}
                </h2>
                <p>In Progress</p>
              </div>
            </div>

            <div className="statistics-card">
              <div className="statistics-icon green-icon">✓</div>
              <div>
                <h2>{completedTasks.length}</h2>
                <p>Completed</p>
              </div>
            </div>

          </section>

          {/* SEARCH AND FILTER TOOLBAR */}
          <section className="toolbar">

            <form
              className="search-container"
              onSubmit={handleSearch}
            >
              <span className="search-symbol">⌕</span>

              <input
                type="search"
                placeholder="Search tasks by title or description..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              <button type="submit">
                Search
              </button>
            </form>

            <div className="filter-container">
              <span>▼</span>

              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value)
                }
                aria-label="Filter by priority"
              >
                <option value="All">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            

          </section>

          {/* KANBAN COLUMNS */}
          {filteredTasks.length > 0 ? (

            <section className="kanban-board">

              <Column
                title="To Do"
                status="todo"
                tasks={todoTasks}
                moveTask={moveTask}
                deleteTask={deleteTask}
                archiveTask={archiveTask}
              />

              <Column
                title="In Progress"
                status="in-progress"
                tasks={inProgressTasks}
                moveTask={moveTask}
                deleteTask={deleteTask}
                archiveTask={archiveTask}
              />

              <Column
                title="Done"
                status="done"
                tasks={doneTasks}
                moveTask={moveTask}
                deleteTask={deleteTask}
                archiveTask={archiveTask}
              />

            </section>

          ) : (

            <div className="empty-search">
              <span>🔎</span>
              <h3>No tasks found</h3>
              <p>
                Try another search term or change your priority filter.
              </p>

              <button onClick={clearSearch}>
                Clear Filters
              </button>
            </div>

          )}

        </main>
      </div>

      {/* ADD TASK MODAL */}
      {showForm && (

        <div
          className="modal-overlay"
          onClick={() => setShowForm(false)}
        >

          <section
            className="add-task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-task-heading"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="modal-heading">

              <div className="modal-title-group">
                <span className="modal-plus">＋</span>
                <h2 id="add-task-heading">Add Task</h2>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                ×
              </button>

            </div>

            <form onSubmit={handleAddTask}>

              <div className="modal-field">
                <label htmlFor="new-title">
                  Task Title <span>*</span>
                </label>

                <input
                  id="new-title"
                  type="text"
                  placeholder="Enter task title..."
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  required
                  autoFocus
                />
              </div>

              <div className="modal-field">
                <label htmlFor="new-description">
                  Description
                </label>

                <textarea
                  id="new-description"
                  rows="4"
                  placeholder="Describe what needs to be done..."
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                />
              </div>

              <div className="modal-fields-row">

                <div className="modal-field">
                  <label htmlFor="new-priority">
                    Priority
                  </label>

                  <select
                    id="new-priority"
                    value={newPriority}
                    onChange={(event) =>
                      setNewPriority(event.target.value)
                    }
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="modal-field">
                  <label>Initial Status</label>
                  <input value="To Do" readOnly />
                </div>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="modal-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-submit"
                >
                  ✈ Add Task
                </button>

              </div>

            </form>

          </section>
        </div>
      )}

    </div>
  );
}

export default BoardPage;
