import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const data = await api.getTeachers();
        setTeachers(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load teachers');
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading Teachers...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>👨‍🏫 Teachers ({teachers.length})</h1>
      
      {teachers.length === 0 ? (
        <p style={{ fontSize: '16px', color: '#666' }}>No teachers found</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>
            <thead style={{ backgroundColor: '#1e3a8a', color: 'white' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Subject</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Qualification</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={teacher.id || index} style={{
                  borderBottom: '1px solid #ddd',
                  backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff',
                }}>
                  <td style={{ padding: '12px' }}>{teacher.id || '-'}</td>
                  <td style={{ padding: '12px' }}>{teacher.name || '-'}</td>
                  <td style={{ padding: '12px' }}>{teacher.email || '-'}</td>
                  <td style={{ padding: '12px' }}>{teacher.subject || '-'}</td>
                  <td style={{ padding: '12px' }}>{teacher.qualification || '-'}</td>
                  <td style={{ padding: '12px' }}>{teacher.phone || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
