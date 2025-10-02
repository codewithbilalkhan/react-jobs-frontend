// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  endpoints: {
    auth: {
      login: `${API_BASE_URL}/auth/login`,
      signup: `${API_BASE_URL}/auth/signup`,
      me: `${API_BASE_URL}/auth/me`
    },
    jobs: {
      list: `${API_BASE_URL}/jobs`,
      single: (id) => `${API_BASE_URL}/jobs/${id}`,
      create: `${API_BASE_URL}/jobs`,
      update: (id) => `${API_BASE_URL}/jobs/${id}`,
      delete: (id) => `${API_BASE_URL}/jobs/${id}`
    }
  }
};

export default API_CONFIG;