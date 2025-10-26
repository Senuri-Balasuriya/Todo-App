import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TodoPage() {
  const refreshPage = () => window.location.reload();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">To-Do Task Manager</h1>
      <TaskForm onTaskAdded={refreshPage} />
      <TaskList />
    </div>
  );
}
