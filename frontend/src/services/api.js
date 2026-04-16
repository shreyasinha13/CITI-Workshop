import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong";

    if (error.response) {
      const detail = error.response.data?.detail;

      if (typeof detail === "string") {
        message = detail;
      } else if (Array.isArray(detail)) {
        message = detail.map((e) => e.msg).join(", ");
      } else {
        message = JSON.stringify(error.response.data);
      }
    } else if (error.request) {
      message = "No response from server (backend not reachable)";
    } else {
      message = error.message;
    }

    return Promise.reject(new Error(message));
  }
);

export const getEmployees = (params = {}) =>
  api.get('/employees', { params }).then((r) => r.data)

// export const createEmployee = (data) =>
//   api.post('/employees', data).then((r) => r.data)

// export const updateEmployee = (id, data) =>
//   api.put(`/employees/${id}`, data).then((r) => r.data)

export const createEmployee = (data) =>
  api.post('/employees', {
    ...data,
    performance_rating: parseInt(data.performance_rating), // ✅ FIX
    training_completed: data.training_completed ? "Yes" : "No",
  }).then((r) => r.data)

export const updateEmployee = (id, data) =>
  api.put(`/employees/${id}`, {
    ...data,
    performance_rating: parseInt(data.performance_rating), // ✅ FIX
    training_completed: data.training_completed ? "Yes" : "No",
  }).then((r) => r.data)

export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`).then((r) => r.data)

export const getHighPerformers = () =>
  api.get('/employees/high-performers').then((r) => r.data)

export const getStats = () =>
  api.get('/employees/stats').then((r) => r.data)

export default api
