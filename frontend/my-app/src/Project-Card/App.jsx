import React, { useState } from "react";
import ProjectCard from "./ProjectCard";

const App = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Project Alpha",
      tasks: [
        { name: "Task 1", completed: false, time: "2024-06-15T10:00" },
        { name: "Task 2", completed: false, time: "2024-06-15T12:00" },
      ],
    },
  ]);

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={handleDeleteProject}
        />
      ))}
    </div>
  );
};

export default App;
