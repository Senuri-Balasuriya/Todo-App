import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:7000";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("Please enter a title!");

    try {
      const response = await fetch(`${API_URL}/api/task`, {
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
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg p-4 mx-auto mb-6 shadow-md bg-blue-50 rounded-xl"
    >
      <h2 className="mb-3 text-xl font-bold text-blue-900">Add New Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white transition bg-blue-800 rounded-md hover:bg-blue-900"
      >
        Add Task
      </button>
    </form>
  );
}
