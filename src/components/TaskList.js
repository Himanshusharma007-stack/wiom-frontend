import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = ({ tasks, onEdit, refreshTasks }) => {
  const [filteredStatus, setFilteredStatus] = useState("all"); // State to track selected status

  useEffect(() => {
    refreshTasks(); // Fetch tasks when component mounts
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3300/api/tasks/${taskId}`);
      refreshTasks(); // Refresh the task list after deleting
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Filter tasks based on the selected status
  const filteredTasks = tasks.filter((task) => {
    if (filteredStatus === "all") return true;
    return task.status === filteredStatus;
  });

  return (
    <div className="p-4">
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="text-gray-700 font-semibold mr-2">Filter by Status:</label>
        <select
          value={filteredStatus}
          onChange={(e) => setFilteredStatus(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task._id} className="p-4 border rounded-lg shadow-md mb-2 bg-white">
            <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>

            {/* Display Task Status */}
            <span
              className={`inline-block px-3 py-1 mt-2 text-sm font-semibold rounded uppercase ${
                task.status === "completed"
                  ? "bg-green-500 text-white"
                  : task.status === "in-progress"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              {task.status}
            </span>

            <div className="mt-3">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-500 hover:underline mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
