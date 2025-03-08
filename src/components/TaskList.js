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
      {tasks.map((task) => (
        <div key={task._id} className="p-3 border rounded mb-2">
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => onEdit(task)} className="text-blue-500">Edit</button>
          <button onClick={() => handleDelete(task._id)} className="text-red-500 ml-2">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
