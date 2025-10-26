import { useState } from "react";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("Please enter a title!");

    const response = await fetch("https://localhost:7027/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      onTaskAdded();
    } else {
      alert("Error adding task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md mb-6 w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold mb-3 text-gray-700">Add New Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </form>
  );
}
