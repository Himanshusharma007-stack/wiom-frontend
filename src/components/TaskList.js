import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = ({ tasks, onEdit, refreshTasks }) => {
  useEffect(() => {
    refreshTasks(); // Fetch tasks when component mounts
  }, []);

  const handleToggleComplete = async (taskId, subtaskId = null) => {
    try {
      const url = subtaskId
        ? `http://localhost:3300/api/tasks/${taskId}/subtasks/${subtaskId}/toggle`
        : `http://localhost:3300/api/tasks/${taskId}/toggle`;

      await axios.patch(url);
      refreshTasks(); // Refresh tasks after toggling
    } catch (error) {
      console.error("Error updating task/subtask status:", error);
    }
  };

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
          <div key={task._id} className="p-4 border rounded-lg shadow-md mb-4 bg-white">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task._id)}
                className="mr-2"
              />
              <h3 className={`font-bold text-lg ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                {task.title}
              </h3>
            </div>
            <p className="text-gray-600">{task.description}</p>

            {/* Subtasks */}
            {task.subtasks.length > 0 && (
              <div className="mt-3 ml-5">
                <h4 className="font-semibold">Subtasks:</h4>
                {task.subtasks.map((subtask) => (
                  <div key={subtask._id} className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => handleToggleComplete(task._id, subtask._id)}
                      className="mr-2"
                    />
                    <span className={subtask.completed ? "line-through text-gray-400" : "text-gray-800"}>
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3">
              <button onClick={() => onEdit(task)} className="text-blue-500 hover:underline mr-4">
                Edit
              </button>
              <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:underline">
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
