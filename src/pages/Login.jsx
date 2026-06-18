import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('admin@school.com');
  const [password, setPassword] = useState('anything');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Login form submitted with:', email, password);
      const result = await login(email, password);
      console.log('Login result in component:', result);
      
      if (!result.success) {
        setError(result.error || 'Login failed');
      } else {
        console.log('Login successful! Redirecting to dashboard...');
        // The App component will automatically show Dashboard when user is set
      }
    } catch (err) {
      console.error('Login component error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '50px auto', 
      padding: '30px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        School Management System Login
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Enter your password"
            required
          />
        </div>
        
        {error && (
          <div style={{ 
            color: 'red', 
            marginBottom: '15px', 
            padding: '10px', 
            background: '#ffebee', 
            borderRadius: '4px',
            wordBreak: 'break-word'
          }}>
            ❌ {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        background: '#f5f5f5', 
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666'
      }}>
        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Test credentials:</p>
        <p style={{ margin: '5px 0' }}>Admin: admin@school.com (any password)</p>
        <p style={{ margin: '5px 0' }}>Teacher: teacher@school.com (any password)</p>
      </div>
    </div>
  );
}

export default Login;