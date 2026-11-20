import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function TaskDetailPage({ tasks, updateTask, deleteTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((item) => String(item.id) === id);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "todo");
  const [priority, setPriority] = useState(task?.priority || "Medium");

  if (!task) {
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

          <header className="dashboard-topbar">
            <div className="topbar-date">
              <span className="online-dot"></span>
              Your productivity workspace
            </div>
          </header>

          <main className="dashboard-content">

            <div className="not-found">
              <h1>Task Not Found</h1>
              <p>The task you are looking for does not exist.</p>
              <Link to="/" className="primary-button">
                Back to Board
              </Link>
            </div>

          </main>
        </div>

      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    updateTask(task.id, {
      title: title.trim(),
      description: description.trim(),
      status,
      priority
    });

    navigate("/");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
      navigate("/");
    }
  };

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
              <p className="heading-label">TASK MANAGEMENT / EDIT TASK</p>

              <h1>Edit Task</h1>

              <p>
                Update your task information and manage its progress.
              </p>

              <span className="heading-underline"></span>
            </div>

            <Link to="/" className="cancel-button">
              ← Back to Board
            </Link>

          </section>

          {/* DETAIL CARD */}
          <div className="detail-card">

            <form onSubmit={handleSubmit} className="detail-form">

              <div className="form-group">
                <label htmlFor="edit-title">Task Title</label>
                <input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="5"
                />
              </div>

              <div className="detail-form-grid">
                <div className="form-group">
                  <label htmlFor="edit-status">Status</label>
                  <select
                    id="edit-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-priority">Priority</label>
                  <select
                    id="edit-priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="detail-actions">
                <button type="submit" className="primary-button">
                  Save Changes
                </button>

                <button
                  type="button"
                  className="danger-button"
                  onClick={handleDelete}
                >
                  Delete Task
                </button>

                <Link to="/" className="cancel-button">
                  Cancel
                </Link>
              </div>

            </form>
          </div>

        </main>
      </div>

    </div>
  );
}

export default TaskDetailPage;