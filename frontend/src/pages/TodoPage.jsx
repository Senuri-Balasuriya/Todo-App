import backgroundImage from "../assets/background4.jpg";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TodoPage() {
  const refreshPage = () => window.location.reload();

  return (
    <div
      className="flex flex-col items-center min-h-screen py-10 bg-center bg-cover "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="px-6 py-2 mb-6 text-4xl font-bold text-white bg-white bg-opacity-10 rounded-xl">
        To-Do Task Manager
      </h1>
      <TaskForm onTaskAdded={refreshPage} />
      <TaskList />
    </div>
  );
}
