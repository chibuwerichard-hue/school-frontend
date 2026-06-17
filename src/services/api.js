// API Service - Hardcoded URL for Vercel
const API_URL = 'https://admin-system-backend-1.onrender.com';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// API call with auth headers
const apiCall = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return null;
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// STUDENTS
export const getStudents = async () => {
  try {
    return await apiCall('/api/students');
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};

export const getStudent = async (id) => {
  try {
    return await apiCall(`/api/students/${id}`);
  } catch (error) {
    console.error('Error fetching student:', error);
    return null;
  }
};

export const createStudent = async (studentData) => {
  try {
    return await apiCall('/api/students', 'POST', studentData);
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    return await apiCall(`/api/students/${id}`, 'PUT', studentData);
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    return await apiCall(`/api/students/${id}`, 'DELETE');
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

// TEACHERS
export const getTeachers = async () => {
  try {
    return await apiCall('/api/teachers');
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
};

export const getTeacher = async (id) => {
  try {
    return await apiCall(`/api/teachers/${id}`);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    return null;
  }
};

export const createTeacher = async (teacherData) => {
  try {
    return await apiCall('/api/teachers', 'POST', teacherData);
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw error;
  }
};

export const updateTeacher = async (id, teacherData) => {
  try {
    return await apiCall(`/api/teachers/${id}`, 'PUT', teacherData);
  } catch (error) {
    console.error('Error updating teacher:', error);
    throw error;
  }
};

export const deleteTeacher = async (id) => {
  try {
    return await apiCall(`/api/teachers/${id}`, 'DELETE');
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};

// ATTENDANCE
export const getAttendance = async () => {
  try {
    return await apiCall('/api/attendance');
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return [];
  }
};

export const getAttendanceByDate = async (date) => {
  try {
    return await apiCall(`/api/attendance?date=${date}`);
  } catch (error) {
    console.error('Error fetching attendance by date:', error);
    return [];
  }
};

export const recordAttendance = async (attendanceData) => {
  try {
    return await apiCall('/api/attendance', 'POST', attendanceData);
  } catch (error) {
    console.error('Error recording attendance:', error);
    throw error;
  }
};

// PAYMENTS
export const getPayments = async () => {
  try {
    return await apiCall('/api/payments');
  } catch (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
};

export const getPaymentById = async (id) => {
  try {
    return await apiCall(`/api/payments/${id}`);
  } catch (error) {
    console.error('Error fetching payment:', error);
    return null;
  }
};

export const createPayment = async (paymentData) => {
  try {
    return await apiCall('/api/payments', 'POST', paymentData);
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

// EXPENSES
export const getExpenses = async () => {
  try {
    return await apiCall('/api/expenses');
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

export const createExpense = async (expenseData) => {
  try {
    return await apiCall('/api/expenses', 'POST', expenseData);
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};

export const getFinanceReport = async () => {
  try {
    return await apiCall('/api/finance/report');
  } catch (error) {
    console.error('Error fetching finance report:', error);
    return null;
  }
};

// SPORTS
export const getSportsParticipants = async () => {
  try {
    return await apiCall('/api/sports/participants');
  } catch (error) {
    console.error('Error fetching sports participants:', error);
    return [];
  }
};

export const getSportsCompetitions = async () => {
  try {
    return await apiCall('/api/sports/competitions');
  } catch (error) {
    console.error('Error fetching competitions:', error);
    return [];
  }
};

export const createCompetition = async (competitionData) => {
  try {
    return await apiCall('/api/sports/competitions', 'POST', competitionData);
  } catch (error) {
    console.error('Error creating competition:', error);
    throw error;
  }
};

export const getSportsStats = async () => {
  try {
    return await apiCall('/api/sports/stats');
  } catch (error) {
    console.error('Error fetching sports stats:', error);
    return null;
  }
};

// ASSETS
export const getAssets = async () => {
  try {
    return await apiCall('/api/assets');
  } catch (error) {
    console.error('Error fetching assets:', error);
    return [];
  }
};

export const createAsset = async (assetData) => {
  try {
    return await apiCall('/api/assets', 'POST', assetData);
  } catch (error) {
    console.error('Error creating asset:', error);
    throw error;
  }
};

export const updateAsset = async (id, assetData) => {
  try {
    return await apiCall(`/api/assets/${id}`, 'PUT', assetData);
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
};

// AUTHENTICATION
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// NAMED EXPORT FOR COMPATIBILITY
export const api = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAttendance,
  getAttendanceByDate,
  recordAttendance,
  getPayments,
  getPaymentById,
  createPayment,
  getExpenses,
  createExpense,
  getFinanceReport,
  getSportsParticipants,
  getSportsCompetitions,
  createCompetition,
  getSportsStats,
  getAssets,
  createAsset,
  updateAsset,
  login,
  logout,
  getCurrentUser,
};

// DEFAULT EXPORT
export default api;