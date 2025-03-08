import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3300/api/tasks").then((res) => setTasks(res.data));
  }, []);

  return (
    <div className="p-4">
      {tasks.map((task) => (
        <div key={task._id} className="p-3 border rounded mb-2">
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => onEdit(task)} className="text-blue-500">Edit</button>
          <button onClick={() => axios.delete(`http://localhost:3300/api/tasks/${task._id}`).then(() => window.location.reload())} className="text-red-500 ml-2">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
