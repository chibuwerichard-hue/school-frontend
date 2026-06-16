import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await api.getStudents();
        setStudents(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load students');
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading Students...</h2>
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
      <h1>👨‍🎓 Students ({students.length})</h1>
      
      {students.length === 0 ? (
        <p style={{ fontSize: '16px', color: '#666' }}>No students found</p>
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
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Grade</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Parent</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id || index} style={{
                  borderBottom: '1px solid #ddd',
                  backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}>
                  <td style={{ padding: '12px' }}>{student.id || '-'}</td>
                  <td style={{ padding: '12px' }}>{student.name || '-'}</td>
                  <td style={{ padding: '12px' }}>{student.email || '-'}</td>
                  <td style={{ padding: '12px' }}>{student.grade || '-'}</td>
                  <td style={{ padding: '12px' }}>{student.parentName || '-'}</td>
                  <td style={{ padding: '12px' }}>{student.phone || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
