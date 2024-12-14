const API_BASE_URL = 'http://127.0.0.1:8000/';

export const apiClient = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Request failed');
      }
      return result;
    } catch (error) {
      return Promise.reject(error.message || 'An error occurred. Please try again.');
    }
  },
  
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Request failed');
      }
      return result;
    } catch (error) {
      return Promise.reject(error.message || 'An error occurred. Please try again.');
    }
  },

  put: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Request failed');
      }
      return result;
    } catch (error) {
      return Promise.reject(error.message || 'An error occurred. Please try again.');
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Request failed');
      }
      return result;
    } catch (error) {
      return Promise.reject(error.message || 'An error occurred. Please try again.');
    }
  },

  login: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }
      return result;
    } catch (error) {
      return Promise.reject(error.message || 'Invalid credentials. Please try again.');
    }
  },

  createUser: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Signup failed');
      }
      return result;
    } catch (error) {
      return Promise.reject(error.message || 'An error occurred. Please try again.');
    }
  },
};