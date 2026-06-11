// src/pages/Students.jsx
import React, { useState, useEffect } from 'react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    section: '',
    rollNumber: '',
    parentName: '',
    phone: '',
    email: '',
    address: '',
    feeStatus: 'Pending',
    attendance: '',
    enrollmentDate: ''
  });

  const grades = ['9th', '10th', '11th', '12th'];
  const sections = ['A', 'B', 'C', 'D'];
  const feeStatuses = ['Paid', 'Pending', 'Overdue', 'Scholarship'];

  // Load students from localStorage on component mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      // Default data
      const defaultStudents = [
        { id: 1, name: 'John Doe', grade: '10th', section: 'A', rollNumber: '1001', parentName: 'Mr. Robert Doe', phone: '+1234567890', email: 'john.doe@student.com', address: '123 Main St, City', feeStatus: 'Paid', attendance: '95%', enrollmentDate: '2023-08-15' },
        { id: 2, name: 'Jane Smith', grade: '10th', section: 'B', rollNumber: '1002', parentName: 'Mrs. Mary Smith', phone: '+1234567891', email: 'jane.smith@student.com', address: '456 Oak Ave, City', feeStatus: 'Pending', attendance: '88%', enrollmentDate: '2023-08-15' },
        { id: 3, name: 'Mike Wilson', grade: '9th', section: 'A', rollNumber: '901', parentName: 'Mr. James Wilson', phone: '+1234567892', email: 'mike.wilson@student.com', address: '789 Pine Rd, City', feeStatus: 'Paid', attendance: '92%', enrollmentDate: '2023-08-16' },
        { id: 4, name: 'Sarah Brown', grade: '11th', section: 'C', rollNumber: '1101', parentName: 'Mrs. Lisa Brown', phone: '+1234567893', email: 'sarah.brown@student.com', address: '321 Elm St, City', feeStatus: 'Paid', attendance: '97%', enrollmentDate: '2023-08-14' },
        { id: 5, name: 'Emily Davis', grade: '12th', section: 'A', rollNumber: '1201', parentName: 'Mr. David Davis', phone: '+1234567894', email: 'emily.davis@student.com', address: '654 Cedar Ln, City', feeStatus: 'Overdue', attendance: '78%', enrollmentDate: '2023-08-13' },
        { id: 6, name: 'James Johnson', grade: '9th', section: 'B', rollNumber: '902', parentName: 'Mrs. Patricia Johnson', phone: '+1234567895', email: 'james.johnson@student.com', address: '987 Birch Blvd, City', feeStatus: 'Paid', attendance: '91%', enrollmentDate: '2023-08-16' },
        { id: 7, name: 'Lisa Anderson', grade: '10th', section: 'A', rollNumber: '1003', parentName: 'Mr. Mark Anderson', phone: '+1234567896', email: 'lisa.anderson@student.com', address: '147 Maple Dr, City', feeStatus: 'Pending', attendance: '85%', enrollmentDate: '2023-08-15' }
      ];
      setStudents(defaultStudents);
      localStorage.setItem('students', JSON.stringify(defaultStudents));
    }
  }, []);

  // Save students to localStorage whenever they change
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.grade || !formData.section || !formData.rollNumber || !formData.parentName || !formData.phone) {
      alert('Please fill all required fields');
      return;
    }

    let updatedStudents;
    if (editingId) {
      updatedStudents = students.map(student => 
        student.id === editingId ? { ...formData, id: editingId } : student
      );
      setStudents(updatedStudents);
    } else {
      const newStudent = {
        id: students.length + 1,
        ...formData
      };
      updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
    }
    
    // Trigger storage event for dashboard
    window.dispatchEvent(new Event('storage'));
    resetForm();
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      grade: student.grade,
      section: student.section,
      rollNumber: student.rollNumber,
      parentName: student.parentName,
      phone: student.phone,
      email: student.email,
      address: student.address,
      feeStatus: student.feeStatus,
      attendance: student.attendance,
      enrollmentDate: student.enrollmentDate
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      const updatedStudents = students.filter(student => student.id !== id);
      setStudents(updatedStudents);
      // Trigger storage event for dashboard
      window.dispatchEvent(new Event('storage'));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      grade: '',
      section: '',
      rollNumber: '',
      parentName: '',
      phone: '',
      email: '',
      address: '',
      feeStatus: 'Pending',
      attendance: '',
      enrollmentDate: ''
    });
  };

  const totalStudents = students.length;
  const paidFees = students.filter(s => s.feeStatus === 'Paid').length;
  const pendingFees = students.filter(s => s.feeStatus === 'Pending').length;
  const overdueFees = students.filter(s => s.feeStatus === 'Overdue').length;
  const avgAttendance = totalStudents > 0 ? (students.reduce((sum, s) => sum + parseInt(s.attendance), 0) / totalStudents).toFixed(1) : 0;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Student Management</h1>
        <p style={{ color: '#666' }}>Manage all students, their academic records, and fee status</p>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Total Students</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{totalStudents}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Fees Paid</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#10b981' }}>{paidFees}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Fees Pending</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#f59e0b' }}>{pendingFees + overdueFees}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #8b5cf6' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Avg Attendance</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{avgAttendance}%</p>
        </div>
      </div>

      {/* Add Student Button */}
      <button
        onClick={() => setShowForm(true)}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          fontSize: '16px'
        }}
      >
        + Add New Student
      </button>

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
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Student' : 'Add New Student'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Student Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Roll Number *</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Parent/Guardian Name *</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fee Status</label>
                  <select
                    name="feeStatus"
                    value={formData.feeStatus}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    {feeStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Attendance (%)</label>
                  <input
                    type="text"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleInputChange}
                    placeholder="e.g., 95%"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Enrollment Date</label>
                <input
                  type="date"
                  name="enrollmentDate"
                  value={formData.enrollmentDate}
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
                  {editingId ? 'Update' : 'Add'} Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Students Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Roll No</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Student Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Grade</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Section</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Parent Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Fee Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Attendance</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{student.rollNumber}</td>
                <td style={{ padding: '12px' }}>{student.name}</td>
                <td style={{ padding: '12px' }}>{student.grade}</td>
                <td style={{ padding: '12px' }}>{student.section}</td>
                <td style={{ padding: '12px' }}>{student.parentName}</td>
                <td style={{ padding: '12px' }}>{student.phone}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: student.feeStatus === 'Paid' ? '#10b981' : student.feeStatus === 'Pending' ? '#f59e0b' : '#ef4444',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {student.feeStatus}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: parseInt(student.attendance) >= 90 ? '#10b981' : parseInt(student.attendance) >= 75 ? '#f59e0b' : '#ef4444',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {student.attendance}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => handleEdit(student)}
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
                    onClick={() => handleDelete(student.id)}
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
        {students.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No students found. Click "Add New Student" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;