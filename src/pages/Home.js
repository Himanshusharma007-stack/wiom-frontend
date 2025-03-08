import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import axios from "axios";

const Home = () => {
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3300/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to refresh tasks after update or deletion
  const handleTaskUpdated = () => {
    fetchTasks();
    setEditingTask(null);
  };

  return (
    <div className="container mx-auto p-4">
      <TaskForm task={editingTask} onTaskUpdated={handleTaskUpdated} />
      <TaskList tasks={tasks} onEdit={setEditingTask} refreshTasks={fetchTasks} />
    </div>
  );
};

export default Home;
