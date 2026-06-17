// API Service
const API_URL = 'https://admin-system-backend-1.onrender.com';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

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
    
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        email: data.email,
        role: data.role,
        id: data.id
      }));
      return data;
    } else {
      throw new Error('Invalid response format');
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

export const getStudents = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/students`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch students');
    return await response.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};

export const getTeachers = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/teachers`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch teachers');
    return await response.json();
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
};

export const getAttendanceByDate = async (date) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/attendance?date=${date}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch attendance');
    return await response.json();
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return [];
  }
};

export const getPayments = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/payments`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch payments');
    return await response.json();
  } catch (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
};

export const getExpenses = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/expenses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch expenses');
    return await response.json();
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

export const getSportsParticipants = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/sports/participants`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch participants');
    return await response.json();
  } catch (error) {
    console.error('Error fetching participants:', error);
    return [];
  }
};

export const getSportsCompetitions = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/sports/competitions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch competitions');
    return await response.json();
  } catch (error) {
    console.error('Error fetching competitions:', error);
    return [];
  }
};

export const getAssets = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/assets`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch assets');
    return await response.json();
  } catch (error) {
    console.error('Error fetching assets:', error);
    return [];
  }
};

const api = {
  login,
  logout,
  getCurrentUser,
  getStudents,
  getTeachers,
  getAttendanceByDate,
  getPayments,
  getExpenses,
  getSportsParticipants,
  getSportsCompetitions,
  getAssets,
};

export default api;