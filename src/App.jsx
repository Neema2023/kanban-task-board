import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import initialTasks from "./data/initialTasks";
import useLocalStorage from "./hooks/useLocalStorage";

import BoardPage from "./pages/BoardPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import ArchivePage from "./pages/ArchivePage";

import "./App.css";

function AppContent() {

  // Global application state
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage or initial data
  useEffect(() => {
    let timer;

    const loadTasks = () => {
      const savedTasks = localStorage.getItem("kanbanTasks");

      if (savedTasks !== null) {
        try {
          const parsedTasks = JSON.parse(savedTasks);

          if (!Array.isArray(parsedTasks)) {
            throw new Error("Invalid saved task data");
          }

          setTasks(parsedTasks);
          setIsLoading(false);
        } catch (error) {
          console.error("Unable to load saved tasks:", error);

          timer = setTimeout(() => {
            setTasks(initialTasks);
            setIsLoading(false);
          }, 400);
        }
      } else {
        timer = setTimeout(() => {
          setTasks(initialTasks);
          setIsLoading(false);
        }, 400);
      }
    };

    loadTasks();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Automatically save tasks
  useLocalStorage("kanbanTasks", tasks, !isLoading);

  // Add a new task
  const addTask = (newTask) => {
    setTasks((previousTasks) => [
      ...previousTasks,
      {
        ...newTask,
        id: Date.now(),
        archived: false
      }
    ]);
  };

  // Move a task between columns
  const moveTask = (taskId, newStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus, archived: false }
          : task
      )
    );
  };

  // Update task details
  const updateTask = (taskId, updatedData) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updatedData }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  };

  // Archive a completed task
  const archiveTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, archived: true, status: "done" }
          : task
      )
    );
  };

  // Restore an archived task
  const restoreTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, archived: false, status: "done" }
          : task
      )
    );
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <h2>Preparing your workspace</h2>
        <p>Loading your Kanban tasks...</p>
      </div>
    );
  }

  return (
    <Routes>

      <Route
        path="/"
        element={
          <BoardPage
            tasks={tasks}
            addTask={addTask}
            moveTask={moveTask}
            deleteTask={deleteTask}
            archiveTask={archiveTask}
          />
        }
      />

      <Route
        path="/archive"
        element={
          <ArchivePage
            tasks={tasks}
            restoreTask={restoreTask}
            deleteTask={deleteTask}
          />
        }
      />

      <Route
        path="/task/:id"
        element={
          <TaskDetailPage
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        }
      />

      <Route
        path="*"
        element={
          <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <a href="/">Return to Board</a>
          </div>
        }
      />

    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;