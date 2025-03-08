import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <TaskForm task={editingTask} />
      <TaskList onEdit={setEditingTask} />
    </div>
  );
};

export default Home;
