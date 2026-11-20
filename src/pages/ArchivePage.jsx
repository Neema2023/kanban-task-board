import { Link } from "react-router-dom";

function ArchivePage({ tasks, restoreTask, deleteTask }) {
  const archivedTasks = tasks.filter(
    (task) => task.archived || task.status === "done"
  );

  const highPriority = archivedTasks.filter(
    (task) => task.priority === "High"
  ).length;

  const mediumPriority = archivedTasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const lowPriority = archivedTasks.filter(
    (task) => task.priority === "Low"
  ).length;

  return (
    <div className="app-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <Link to="/" className="sidebar-brand">
          <span className="brand-logo">K</span>
          <span>TaskFlow</span>
        </Link>

        <nav className="sidebar-navigation">

          <Link to="/" className="sidebar-link">
            <span className="sidebar-icon">⌂</span>
            Board
          </Link>

          <Link to="/archive" className="sidebar-link active">
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
              <p className="heading-label">WORKSPACE / ARCHIVE</p>

              <h1>Task Archive</h1>

              <p>
                Keep track of completed work and manage your archived tasks.
              </p>

              <span className="heading-underline"></span>
            </div>

            <div className="archive-heading-icon">
              📦
            </div>

          </section>

          {/* STATISTICS */}
          <section className="statistics-grid">

            <div className="statistics-card">
              <div className="statistics-icon purple-icon">▣</div>
              <div>
                <h2>{archivedTasks.length}</h2>
                <p>Total archived</p>
              </div>
            </div>

            <div className="statistics-card">
              <div className="statistics-icon green-icon">✓</div>
              <div>
                <h2>
                  {archivedTasks.filter(
                    (task) => task.status === "done"
                  ).length}
                </h2>
                <p>Completed</p>
              </div>
            </div>

            <div className="statistics-card">
              <div className="statistics-icon" style={{ color: "#e64d65", background: "#ffebee" }}>
                !
              </div>
              <div>
                <h2>{highPriority}</h2>
                <p>High priority</p>
              </div>
            </div>

            <div className="statistics-card">
              <div className="statistics-icon blue-icon">★</div>
              <div>
                <h2>{mediumPriority + lowPriority}</h2>
                <p>Other priorities</p>
              </div>
            </div>

          </section>

          {/* ARCHIVE SECTION */}
          <section className="archive-main">

            <div className="archive-section-heading">
              <div>
                <h2>Archived Tasks</h2>
                <p>Your completed and archived work</p>
              </div>

              <span className="archive-count">
                {archivedTasks.length} Tasks
              </span>
            </div>

            {archivedTasks.length > 0 ? (

              <div className="archive-grid">

                {archivedTasks.map((task) => (

                  <article className="archive-card" key={task.id}>

                    <div className="archive-card-top">
                      <span className="archive-completed-icon">
                        ✓
                      </span>

                      <span className={`priority-badge priority-${(task.priority || "Medium").toLowerCase()}`}>
                        {task.priority || "Medium"}
                      </span>
                    </div>

                    <h3>{task.title}</h3>

                    <p className="archive-description">
                      {task.description || "No description provided."}
                    </p>

                    <div className="archive-card-status">
                      <span className="archive-status-dot"></span>
                      {task.archived ? "Archived" : "Completed"}
                    </div>

                    <div className="archive-card-actions">

                      <Link
                        to={`/task/${task.id}`}
                        className="archive-edit-button"
                      >
                        View Details
                      </Link>

                      <button
                        className="archive-restore-button"
                        onClick={() => restoreTask(task.id)}
                      >
                        ↶ Restore
                      </button>

                      <button
                        className="archive-delete-button"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this task permanently?"
                            )
                          ) {
                            deleteTask(task.id);
                          }
                        }}
                      >
                        🗑
                      </button>

                    </div>

                  </article>

                ))}

              </div>

            ) : (

              <div className="archive-empty-state">
                <div className="archive-empty-icon">
                  📦
                </div>

                <h2>Your archive is empty</h2>

                <p>
                  Completed or archived tasks will appear here.
                  Start organizing your work on the board.
                </p>

                <Link to="/" className="archive-empty-button">
                  Go to Board →
                </Link>
              </div>

            )}

          </section>

        </main>
      </div>

    </div>
  );
}

export default ArchivePage;