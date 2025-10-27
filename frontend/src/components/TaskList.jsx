import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:7000";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from backend
  const loadTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/task`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      // Only keep pending tasks
      const pendingTasks = data.filter((t) => t.status.toLowerCase() === "pending");
      setTasks(pendingTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  // Mark task as done
  const handleDone = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/task/${id}/done`, {
        method: "PUT",
      });
      if (response.ok) loadTasks();
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="w-full max-w-5xl p-4 mx-auto space-y-8">
      <h2 className="mb-4 text-2xl font-bold text-white capitalize">
        Pending Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-300">No pending tasks</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between p-4 rounded-lg shadow-md bg-blue-50"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900">{t.title}</h3>
                <p className="text-sm text-gray-700">{t.description}</p>
              </div>
              <button
                onClick={() => handleDone(t.id)}
                className="px-3 py-1 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
              >
                Done
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
