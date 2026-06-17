// API Service
const API_URL = 'https://admin-system-backend-1.onrender.com';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const getHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if response is OK
    if (!response.ok) {
      const text = await response.text();
      console.error('Server response:', text);
      throw new Error(`Login failed: ${response.status} ${response.statusText}`);
    }

    // Get response as text first to debug
    const text = await response.text();
    console.log('Raw response:', text);
    
    // Parse JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse JSON:', text);
      throw new Error('Invalid response format from server');
    }
    
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        email: data.email,
        role: data.role,
        id: data.id
      }));
      return data;
    } else {
      throw new Error(data.error || 'Invalid response format');
    }
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

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/api/admin/users`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const getStudents = async () => {
  try {
    const response = await fetch(`${API_URL}/api/students`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch students');
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching students:', error);
    try {
      const users = await getUsers();
      return users.filter(user => user.role === 'STUDENT');
    } catch (fallbackError) {
      return [];
    }
  }
};

export const getTeachers = async () => {
  try {
    const response = await fetch(`${API_URL}/api/teachers`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch teachers');
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    try {
      const users = await getUsers();
      return users.filter(user => user.role === 'TEACHER');
    } catch (fallbackError) {
      return [];
    }
  }
};

export const getAdmins = async () => {
  try {
    const users = await getUsers();
    return users.filter(user => user.role === 'ADMIN');
  } catch (error) {
    console.error('Error fetching admins:', error);
    return [];
  }
};

export const getFinanceOfficers = async () => {
  try {
    const users = await getUsers();
    return users.filter(user => user.role === 'FINANCE_OFFICER');
  } catch (error) {
    console.error('Error fetching finance officers:', error);
    return [];
  }
};

export const getSportsCoordinators = async () => {
  try {
    const users = await getUsers();
    return users.filter(user => user.role === 'SPORTS_COORDINATOR');
  } catch (error) {
    console.error('Error fetching sports coordinators:', error);
    return [];
  }
};

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/admin/users`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete user');
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const getAttendanceByDate = async (date) => {
  try {
    const response = await fetch(`${API_URL}/api/attendance?date=${date}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch attendance');
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return { date, message: 'Attendance data not available', data: [] };
  }
};

export const getPayments = async () => {
  try {
    const response = await fetch(`${API_URL}/api/payments`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch payments');
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return { message: 'Payments data not available', data: [] };
  }
};

export const getExpenses = async () => {
  try {
    const response = await fetch(`${API_URL}/api/expenses`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch expenses');
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return { message: 'Expenses data not available', data: [] };
  }
};

export const getSportsParticipants = async () => {
  try {
    const response = await fetch(`${API_URL}/api/sports/participants`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch participants');
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching participants:', error);
    return { message: 'Participants data not available', data: [] };
  }
};

export const getSportsCompetitions = async () => {
  try {
    const response = await fetch(`${API_URL}/api/sports/competitions`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch competitions');
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching competitions:', error);
    return { message: 'Competitions data not available', data: [] };
  }
};

export const getAssets = async () => {
  try {
    const response = await fetch(`${API_URL}/api/assets`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch assets');
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching assets:', error);
    return { message: 'Assets data not available', data: [] };
  }
};

export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/health`);
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Health check error:', error);
    return { status: 'DOWN', error: error.message };
  }
};

const api = {
  login,
  logout,
  getCurrentUser,
  getUsers,
  getStudents,
  getTeachers,
  getAdmins,
  getFinanceOfficers,
  getSportsCoordinators,
  createUser,
  deleteUser,
  getAttendanceByDate,
  getPayments,
  getExpenses,
  getSportsParticipants,
  getSportsCompetitions,
  getAssets,
  healthCheck,
};

export default api;
