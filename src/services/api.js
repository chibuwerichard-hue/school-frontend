// API Service
const API_URL = import.meta.env.VITE_API_URL || 'https://admin-system-backend-1.onrender.com';

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
    console.log('Attempting login for:', email);
    console.log('Using API URL:', API_URL);
    
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Login response:', data);

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
    return await response.json();
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
    return await response.json();
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
    return await response.json();
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

// ... rest of the functions remain the same

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
