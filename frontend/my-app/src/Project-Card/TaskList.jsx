import React from "react";

const TaskList = ({ tasks, setTasks }) => {
  const handleTaskToggle = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskToggle(index)}
            />
            {task.name}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
