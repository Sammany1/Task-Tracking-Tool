'use client';
import React, { useState, useRef } from 'react';
import ProgressBar from '../../../../components/ui/ProgressBar';
import '../../../../styles/globals.css';
import styles from './project.module.css';
import { taskService } from '../../../../services/taskService';
import { projectService } from '../../../../services/projectService';

const ProjectCard = ({ project, updateProject, deleteProject }) => {
  const { id, name, isEditing: projectIsEditing, tasks: initialTasks } = project;
  const [tasks, setTasks] = useState(initialTasks || []);
  const [isEditing, setIsEditing] = useState(projectIsEditing || false);
  const [projectName, setProjectName] = useState(name || '');
  const inputRef = useRef();

  const reloadProject = async () => {
    console.log('Reloading project...');
    try {
      const updatedProject = await projectService.getProjectById(id);
      setTasks(updatedProject.tasks || []);
      updateProject(id, updatedProject);
    } catch (error) {
      console.error('Error reloading project:', error);
    }
  };

  const handleAddTask = async () => {
    const text = inputRef.current.value;
    if (!text.trim()) return;
    const newTask = {
      id: Date.now(),
      title: text,
      completed: false,
      project: id,
    };
    try {
      await taskService.createTask(newTask);
      await reloadProject();
      inputRef.current.value = '';
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleToggleTask = async (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, completed: !task.completed, project: id  };
    try {
      await taskService.updateTask(taskId, updatedTask);
      await reloadProject();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      await reloadProject();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  const handleProjectNameClick = () => {
    setIsEditing(true);
  };

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectNameBlur = async () => {
    try {
      await updateProject(id, { name: projectName, isEditing: false });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className="card todoCard">
      <div className={styles.cardHeader}>
        {isEditing ? (
          <input
            type="text"
            value={projectName}
            onChange={handleProjectNameChange}
            onBlur={handleProjectNameBlur}
            placeholder="Enter Project Name"
            className={styles.titleInput}
            autoFocus
          />
        ) : (
          <h2
            className="card-title"
            onClick={handleProjectNameClick}
          >
            {projectName || 'Untitled Project'}
          </h2>
        )}
        {!isEditing && (
          <button className={styles.deleteCardBtn} onClick={() => deleteProject(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.trashIcon}
              width="20"
              height="20"
            >
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3-9h8v10H9V10zm5-6V3c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v1H5c-.55 0-1 .45-1 1s.45-1 1-1h1v13c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5h1c.55 0 1-.45 1-1s-.45-1-1-1h-4z" />
            </svg>
          </button>
        )}
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <span
              className={`${styles.taskText} ${
                task.completed ? styles.completed : ''
              }`}
            >
              {task.title}
            </span>
            <span
              className={`${styles.checkbox} ${
                task.completed ? styles.checked : ''
              }`}
              onClick={() => handleToggleTask(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={styles.checkboxIcon}
              >
                <circle cx="12" cy="12" r="9" className={styles.checkboxCircle} />
                <path d="M10 15l-3-3 1.41-1.41L10 12.17l5.59-5.59L17 8l-7 7z" />
              </svg>
            </span>
            <button
              style={{ background: 'none', width: '20px' }}
              className={styles.deleteBtn}
              onClick={() => handleDeleteTask(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.trashIcon}
                width="20"
                height="20"
              >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3-9h8v10H9V10zm5-6V3c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v1H5c-.55 0-1 .45-1 1s.45-1 1-1h1v13c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5h1c.55 0 1-.45 1-1s-.45-1-1-1h-4z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.inputWrapper}>
        <input ref={inputRef} placeholder="Add Task..." className="input" />
        <button className={styles.todoBtn} onClick={handleAddTask}>
          +
        </button>
      </div>
      <ProgressBar
        progress={tasks.length ? (completedTasks / tasks.length) * 100 : 0}
      />
    </div>
  );
};

export default ProjectCard;