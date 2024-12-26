import { apiClient } from '../utils/apiClient';

export const projectService = {
  getProjects: async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await apiClient.get('/user/projects/', token);
      // Map response to include only name and title fields
      return response.map((project) => ({
        id: project.id,
        name: project.name,
        isEditing: false,
        tasks: project.tasks.map((task) => ({
          id: task.id,
          title: task.title,
          completed: task.completed,
        })),
      }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  createProject: async (projectData) => {
    const token = localStorage.getItem('accessToken');
    try {
      const project = await apiClient.post('/user/projects/', projectData, token);
      return {
        id: project.id,
        name: project.name,
        isEditing: false,
        tasks: project.tasks.map((task) => ({
          id: task.id,
          title: task.title,
          completed: task.completed,
        })),
      };
    } catch (error) {
      console.error('Error creating project:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      throw error;
    }
  },

  updateProject: async (projectId, projectData) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await apiClient.put(`/projects/${projectId}/`, projectData, token);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  deleteProject: async (projectId) => {
    const token = localStorage.getItem('accessToken');
    try {
      await apiClient.delete(`/projects/${projectId}/`, token);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },
};