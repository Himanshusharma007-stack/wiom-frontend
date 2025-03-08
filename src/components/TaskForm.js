import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ task, onTaskUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(""); // New state for status

  // Sync state when task changes
  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setStatus(task?.status || "pending"); // Default to "pending" if not provided
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, status }; // Include status

    try {
      if (task) {
        await axios.put(`http://localhost:3300/api/tasks/${task._id}`, newTask);
      } else {
        await axios.post("http://localhost:3300/api/tasks", newTask);
      }
      onTaskUpdated(); // Refresh task list
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        {task ? "Edit Task" : "Create Task"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 p-2 rounded w-full text-gray-700"
          placeholder="Task Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 p-2 rounded w-full text-gray-700"
          placeholder="Task Description"
          rows="3"
        ></textarea>
        
        {/* Status Dropdown */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 p-2 rounded w-full text-gray-700"
          required
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition duration-300"
        >
          {task ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
