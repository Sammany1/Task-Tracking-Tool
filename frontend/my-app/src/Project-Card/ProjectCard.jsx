import React, { useState, useEffect } from "react";
import "./ProjectCard.css";
import TaskList from "./TaskList";
import CalendarIntegration from "./CalendarIntegration";

const ProjectCard = ({ project, onDelete }) => {
  const [tasks, setTasks] = useState(project.tasks || []);
  const [progress, setProgress] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    setProgress(totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0);
  }, [tasks]);

  const handleMarkAsDone = () => {
    const updatedTasks = tasks.map((task) => ({ ...task, completed: true }));
    setTasks(updatedTasks);
    setProgress(100);
  };

  const handleDelete = () => {
    onDelete(project.id);
  };

  const handleDeadlineChange = (e) => {
    const selectedDeadline = new Date(e.target.value);
    const taskTimes = tasks.map((task) => new Date(task.time));

    if (taskTimes.some((taskTime) => taskTime > selectedDeadline)) {
      setError("Deadline cannot be earlier than any task time.");
    } else {
      setError("");
      setDeadline(e.target.value);
    }
  };

  useEffect(() => {
    if (deadline) {
      const deadlineTime = new Date(deadline).getTime();
      const reminderTime = deadlineTime - 3600000; 
      const now = Date.now();

      if (reminderTime > now) {
        const timer = setTimeout(() => {
          alert(`Reminder: Project "${project.title}" deadline in 1 hour!`);
        }, reminderTime - now);

        return () => clearTimeout(timer);
      }
    }
  }, [deadline, project.title]);

  return (
    <div className="project-card">
      <h2>{project.title}</h2>

      <TaskList tasks={tasks} setTasks={setTasks} />

      <div className="progress-container">
        <label>Progress:</label>
        <progress value={progress} max="100"></progress>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="controls">
        <button onClick={handleMarkAsDone}>Mark All as Done</button>
        <button onClick={handleDelete} className="delete-btn">
          Delete Project
        </button>
      </div>

      <div className="deadline-container">
        <label>Set Deadline:</label>
        <input type="datetime-local" onChange={handleDeadlineChange} />
        {error && <p className="error">{error}</p>}
      </div>

      <CalendarIntegration projectTitle={project.title} deadline={deadline} />
    </div>
  );
};

export default ProjectCard;
