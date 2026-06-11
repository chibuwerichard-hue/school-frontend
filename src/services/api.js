import axios from "axios";

console.log("API Config: baseURL = http://localhost:8080");

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  console.log("Request to:", config.baseURL + config.url);
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => {
    console.log("Calling login API with:", { email, password });
    return api.post("/api/auth/login", { email, password });
  },
};

export const studentAPI = {
  getAll: () => api.get("/api/students/all"),
  getById: (id) => api.get("/api/students/" + id),
  create: (student) => api.post("/api/students/create", student),
  update: (id, student) => api.put("/api/students/update/" + id, student),
  delete: (id) => api.delete("/api/students/" + id),
  getByStatus: (status) => api.get("/api/students/status/" + status),
  getByGrade: (grade) => api.get("/api/students/grade/" + grade),
};

export const teacherAPI = {
  getAll: () => api.get("/api/teachers/all"),
  getById: (id) => api.get("/api/teachers/" + id),
  create: (teacher) => api.post("/api/teachers/create", teacher),
  update: (id, teacher) => api.put("/api/teachers/update/" + id, teacher),
  getBySubject: (subject) => api.get("/api/teachers/subject/" + subject),
};

export const resultAPI = {
  getAll: () => api.get("/api/results"),
  getById: (id) => api.get("/api/results/" + id),
  create: (result) => api.post("/api/results/create", result),
  update: (id, result) => api.put("/api/results/update/" + id, result),
  getByStudent: (id) => api.get("/api/results/student/" + id),
  getByYear: (year) => api.get("/api/results/year/" + year),
};

export const attendanceAPI = {
  getAll: () => api.get("/api/attendance"),
  getById: (id) => api.get("/api/attendance/" + id),
  create: (attendance) => api.post("/api/attendance/create", attendance),
  update: (id, attendance) => api.put("/api/attendance/update/" + id, attendance),
  getByStudent: (id) => api.get("/api/attendance/student/" + id),
  getByDateRange: (start, end) => 
    api.get(`/api/attendance/range?start=${start}&end=${end}`),
};

export const sportsAPI = {
  getAll: () => api.get("/api/sports"),
  getById: (id) => api.get("/api/sports/" + id),
  create: (sport) => api.post("/api/sports/create", sport),
  update: (id, sport) => api.put("/api/sports/update/" + id, sport),
  delete: (id) => api.delete("/api/sports/" + id),
  getByStudent: (id) => api.get("/api/sports/student/" + id),
  getByName: (name) => api.get("/api/sports/sport/" + name),
};

export const feeAPI = {
  getAll: () => api.get("/api/fees"),
  getById: (id) => api.get("/api/fees/" + id),
  create: (fee) => api.post("/api/fees/create", fee),
  update: (id, fee) => api.put("/api/fees/update/" + id, fee),
  getByStudent: (id) => api.get("/api/fees/student/" + id),
  getByStatus: (status) => api.get("/api/fees/status/" + status),
};

export const paymentAPI = {
  getAll: () => api.get("/api/payments"),
  getById: (id) => api.get("/api/payments/" + id),
  create: (payment) => api.post("/api/payments/create", payment),
  update: (id, payment) => api.put("/api/payments/update/" + id, payment),
  getByStudent: (id) => api.get("/api/payments/student/" + id),
  getByReceipt: (receipt) => api.get("/api/payments/receipt/" + receipt),
};

export const userAPI = {
  getById: (id) => api.get("/api/users/" + id),
  getByEmail: (email) => api.get("/api/users/email/" + email),
  create: (user) => api.post("/api/users/create", user),
};

export default api;