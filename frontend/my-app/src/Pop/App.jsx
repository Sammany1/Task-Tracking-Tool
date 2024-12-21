import React from 'react';
import ReactDOM from 'react-dom';
import ProjectCard from './ProjectCard';
import styles from './Project.module.css';

const App = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', isEditing: false, tasks: [] },
  ]);

  const updateProject = (projectId, updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => (project.id === projectId ? updatedProject : project))
    );
  };

  return (
    <div className={styles.todoApp}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} updateProject={updateProject} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));