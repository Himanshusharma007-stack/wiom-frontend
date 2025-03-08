import React, { useEffect } from "react";
import axios from "axios";

const TaskList = ({ tasks, onEdit, refreshTasks }) => {
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

  return (
    <div className="p-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="p-4 border rounded-lg shadow-md mb-2 bg-white">
            <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            
            {/* Display Task Status */}
            <span
              className={`inline-block px-3 py-1 mt-2 text-sm font-semibold rounded ${
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
