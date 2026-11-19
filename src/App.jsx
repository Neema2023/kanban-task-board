
import initialTasks from "./data/initialTasks";
import BoardPage from "./pages/BoardPage";
import "./App.css";

function App() {
  return (
    <BoardPage tasks={initialTasks} />
  );
}

export default App;
