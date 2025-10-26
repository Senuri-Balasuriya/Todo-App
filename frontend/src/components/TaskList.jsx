import { useEffect, useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const response = await fetch("https://localhost:7027/api/task");
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    }
  };

  const handleDone = async (id) => {
    const response = await fetch(`https://localhost:7027/api/task/${id}/done`, {
      method: "PUT",
    });
    if (response.ok) loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="mb-4 text-2xl font-bold text-white">Pending Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No pending tasks</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between p-4 rounded-lg shadow-md bg-blue-50"
            >
              <div>
                <h3 className="text-lg font-bold text-blue-900">{t.title}</h3>
                <p className="text-sm text-gray-500">{t.description}</p>
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
