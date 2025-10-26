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
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pending Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No pending tasks</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg text-gray-700">{t.title}</h3>
                <p className="text-gray-500 text-sm">{t.description}</p>
              </div>
              <button
                onClick={() => handleDone(t.id)}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
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
