// src/pages/Attendance.jsx
import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterGrade, setFilterGrade] = useState('all');
  const [formData, setFormData] = useState({
    studentName: '',
    grade: '',
    section: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
    subject: '',
    teacher: ''
  });

  const grades = ['9th', '10th', '11th', '12th'];
  const sections = ['A', 'B', 'C', 'D'];
  const statuses = ['Present', 'Absent', 'Late', 'Excused'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science'];

  // Load attendance records from localStorage on component mount
  useEffect(() => {
    const savedAttendance = localStorage.getItem('attendance');
    if (savedAttendance) {
      setAttendanceRecords(JSON.parse(savedAttendance));
    } else {
      // Default data
      const defaultAttendance = [
        { id: 1, studentName: 'John Doe', grade: '10th', section: 'A', date: '2024-01-15', status: 'Present', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson' },
        { id: 2, studentName: 'Jane Smith', grade: '10th', section: 'B', date: '2024-01-15', status: 'Absent', subject: 'Physics', teacher: 'Prof. Michael Chen' },
        { id: 3, studentName: 'Mike Wilson', grade: '9th', section: 'A', date: '2024-01-15', status: 'Present', subject: 'English', teacher: 'Ms. Emily Brown' },
        { id: 4, studentName: 'Sarah Brown', grade: '11th', section: 'C', date: '2024-01-15', status: 'Late', subject: 'Chemistry', teacher: 'Dr. James Wilson' },
        { id: 5, studentName: 'Emily Davis', grade: '12th', section: 'A', date: '2024-01-15', status: 'Present', subject: 'Biology', teacher: 'Prof. Lisa Davis' },
        { id: 6, studentName: 'James Johnson', grade: '9th', section: 'B', date: '2024-01-15', status: 'Present', subject: 'History', teacher: 'Mr. Robert Taylor' },
        { id: 7, studentName: 'Lisa Anderson', grade: '10th', section: 'A', date: '2024-01-15', status: 'Absent', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson' }
      ];
      setAttendanceRecords(defaultAttendance);
      localStorage.setItem('attendance', JSON.stringify(defaultAttendance));
    }
  }, []);

  // Save attendance records to localStorage whenever they change
  useEffect(() => {
    if (attendanceRecords.length > 0) {
      localStorage.setItem('attendance', JSON.stringify(attendanceRecords));
    }
  }, [attendanceRecords]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.grade || !formData.section || !formData.subject) {
      alert('Please fill all required fields');
      return;
    }

    let updatedRecords;
    if (editingId) {
      updatedRecords = attendanceRecords.map(record => 
        record.id === editingId ? { ...formData, id: editingId } : record
      );
      setAttendanceRecords(updatedRecords);
    } else {
      const newRecord = {
        id: attendanceRecords.length + 1,
        ...formData
      };
      updatedRecords = [...attendanceRecords, newRecord];
      setAttendanceRecords(updatedRecords);
    }
    
    // Trigger storage event for dashboard
    window.dispatchEvent(new Event('storage'));
    resetForm();
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setFormData({
      studentName: record.studentName,
      grade: record.grade,
      section: record.section,
      date: record.date,
      status: record.status,
      subject: record.subject,
      teacher: record.teacher
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      const updatedRecords = attendanceRecords.filter(record => record.id !== id);
      setAttendanceRecords(updatedRecords);
      // Trigger storage event for dashboard
      window.dispatchEvent(new Event('storage'));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      studentName: '',
      grade: '',
      section: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Present',
      subject: '',
      teacher: ''
    });
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesDate = filterDate === '' || record.date === filterDate;
    const matchesGrade = filterGrade === 'all' || record.grade === filterGrade;
    return matchesDate && matchesGrade;
  });

  const totalRecords = filteredRecords.length;
  const presentCount = filteredRecords.filter(r => r.status === 'Present').length;
  const absentCount = filteredRecords.filter(r => r.status === 'Absent').length;
  const lateCount = filteredRecords.filter(r => r.status === 'Late').length;
  const attendanceRate = totalRecords > 0 ? ((presentCount / totalRecords) * 100).toFixed(1) : 0;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Attendance Management</h1>
        <p style={{ color: '#666' }}>Track and manage student attendance records</p>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Total Records</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{totalRecords}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Present</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#10b981' }}>{presentCount}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #ef4444' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Absent</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#ef4444' }}>{absentCount}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Attendance Rate</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#f59e0b' }}>{attendanceRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '15px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Filter by Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Filter by Grade</label>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="all">All Grades</option>
              {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
            </select>
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            + Mark Attendance
          </button>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '500px'
          }}>
            <h2 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Attendance Record' : 'Mark Attendance'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Student Name *</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Grade *</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    <option value="">Select Grade</option>
                    {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Section *</label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    <option value="">Select Section</option>
                    {sections.map(section => <option key={section} value={section}>{section}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Teacher Name</label>
                <input
                  type="text"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{ padding: '10px 20px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  {editingId ? 'Update' : 'Save'} Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attendance Records Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Student Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Grade</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Section</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Subject</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Teacher</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{record.studentName}</td>
                <td style={{ padding: '12px' }}>{record.grade}</td>
                <td style={{ padding: '12px' }}>{record.section}</td>
                <td style={{ padding: '12px' }}>{record.subject}</td>
                <td style={{ padding: '12px' }}>{record.date}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: record.status === 'Present' ? '#10b981' : record.status === 'Absent' ? '#ef4444' : record.status === 'Late' ? '#f59e0b' : '#8b5cf6',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {record.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{record.teacher}</td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => handleEdit(record)}
                    style={{
                      marginRight: '8px',
                      padding: '5px 10px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRecords.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No attendance records found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;