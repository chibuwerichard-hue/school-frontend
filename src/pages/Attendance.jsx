import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const data = await api.getAttendanceByDate(selectedDate);
        setAttendance(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load attendance');
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [selectedDate]);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading Attendance...</h2>
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
      <h1>✅ Attendance</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
          }}
        />
      </div>

      <p style={{ fontSize: '16px', color: '#666' }}>
        Total Records: <strong>{attendance.length}</strong>
      </p>

      {attendance.length === 0 ? (
        <p style={{ fontSize: '16px', color: '#666' }}>No attendance records for this date</p>
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
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Student ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Student Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Time In</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => (
                <tr key={record.id || index} style={{
                  borderBottom: '1px solid #ddd',
                  backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff',
                }}>
                  <td style={{ padding: '12px' }}>{record.studentId || '-'}</td>
                  <td style={{ padding: '12px' }}>{record.studentName || '-'}</td>
                  <td style={{ padding: '12px' }}>{record.date || '-'}</td>
                  <td style={{
                    padding: '12px',
                    backgroundColor: record.status === 'PRESENT' ? '#dcfce7' : '#fee2e2',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    color: record.status === 'PRESENT' ? '#166534' : '#991b1b',
                  }}>
                    {record.status || '-'}
                  </td>
                  <td style={{ padding: '12px' }}>{record.timeIn || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
