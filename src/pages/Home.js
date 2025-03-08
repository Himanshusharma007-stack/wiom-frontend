import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [editingTask, setEditingTask] = useState(null);
  const [refreshTasks, setRefreshTasks] = useState(false);

  // Function to trigger a refresh of TaskList
  const handleTaskUpdate = () => {
    setRefreshTasks((prev) => !prev); // Toggle state to trigger re-fetch
    setEditingTask(null); // Reset editing task after update
  };

  return (
    <div className="container mx-auto p-4">
      <TaskForm task={editingTask} onTaskUpdated={handleTaskUpdate} />
      <TaskList onEdit={setEditingTask} refresh={refreshTasks} />
    </div>
  );
};

export default Home;
