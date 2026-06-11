// src/pages/Teachers.jsx
import React, { useState, useEffect } from 'react';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    status: 'Active',
    joinDate: ''
  });

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science', 'Physical Education', 'Art'];
  const statuses = ['Active', 'On Leave', 'Inactive'];

  // Load teachers from localStorage on component mount
  useEffect(() => {
    const savedTeachers = localStorage.getItem('teachers');
    if (savedTeachers) {
      setTeachers(JSON.parse(savedTeachers));
    } else {
      // Default data
      const defaultTeachers = [
        { id: 1, name: 'Dr. Sarah Johnson', subject: 'Mathematics', email: 'sarah.johnson@school.com', phone: '+1234567890', qualification: 'PhD in Mathematics', experience: '8 years', status: 'Active', joinDate: '2020-08-15' },
        { id: 2, name: 'Prof. Michael Chen', subject: 'Physics', email: 'michael.chen@school.com', phone: '+1234567891', qualification: 'MSc in Physics', experience: '6 years', status: 'Active', joinDate: '2021-01-10' },
        { id: 3, name: 'Ms. Emily Brown', subject: 'English', email: 'emily.brown@school.com', phone: '+1234567892', qualification: 'MA in English', experience: '5 years', status: 'Active', joinDate: '2021-08-20' },
        { id: 4, name: 'Dr. James Wilson', subject: 'Chemistry', email: 'james.wilson@school.com', phone: '+1234567893', qualification: 'PhD in Chemistry', experience: '10 years', status: 'Active', joinDate: '2019-06-01' },
        { id: 5, name: 'Prof. Lisa Davis', subject: 'Biology', email: 'lisa.davis@school.com', phone: '+1234567894', qualification: 'MSc in Biology', experience: '7 years', status: 'On Leave', joinDate: '2020-03-12' },
        { id: 6, name: 'Mr. Robert Taylor', subject: 'History', email: 'robert.taylor@school.com', phone: '+1234567895', qualification: 'MA in History', experience: '4 years', status: 'Active', joinDate: '2022-01-05' }
      ];
      setTeachers(defaultTeachers);
      localStorage.setItem('teachers', JSON.stringify(defaultTeachers));
    }
  }, []);

  // Save teachers to localStorage whenever they change
  useEffect(() => {
    if (teachers.length > 0) {
      localStorage.setItem('teachers', JSON.stringify(teachers));
    }
  }, [teachers]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.subject || !formData.email || !formData.joinDate) {
      alert('Please fill all required fields');
      return;
    }

    let updatedTeachers;
    if (editingId) {
      updatedTeachers = teachers.map(teacher => 
        teacher.id === editingId ? { ...formData, id: editingId } : teacher
      );
      setTeachers(updatedTeachers);
    } else {
      const newTeacher = {
        id: teachers.length + 1,
        ...formData
      };
      updatedTeachers = [...teachers, newTeacher];
      setTeachers(updatedTeachers);
    }
    
    // Trigger storage event for dashboard
    window.dispatchEvent(new Event('storage'));
    resetForm();
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher.id);
    setFormData({
      name: teacher.name,
      subject: teacher.subject,
      email: teacher.email,
      phone: teacher.phone,
      qualification: teacher.qualification,
      experience: teacher.experience,
      status: teacher.status,
      joinDate: teacher.joinDate
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      const updatedTeachers = teachers.filter(teacher => teacher.id !== id);
      setTeachers(updatedTeachers);
      // Trigger storage event for dashboard
      window.dispatchEvent(new Event('storage'));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      subject: '',
      email: '',
      phone: '',
      qualification: '',
      experience: '',
      status: 'Active',
      joinDate: ''
    });
  };

  const activeTeachers = teachers.filter(t => t.status === 'Active').length;
  const onLeaveTeachers = teachers.filter(t => t.status === 'On Leave').length;
  const totalTeachers = teachers.length;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Teacher Management</h1>
        <p style={{ color: '#666' }}>Manage all teachers, their subjects, and contact information</p>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Total Teachers</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{totalTeachers}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Active Teachers</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#10b981' }}>{activeTeachers}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>On Leave</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#f59e0b' }}>{onLeaveTeachers}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #8b5cf6' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Subjects</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{subjects.length}</p>
        </div>
      </div>

      {/* Add Teacher Button */}
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
        + Add New Teacher
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
            <h2 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Teacher' : 'Add New Teacher'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
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
                    {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 5 years"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Join Date *</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  required
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
                  {editingId ? 'Update' : 'Add'} Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teachers Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Subject</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Qualification</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Experience</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Join Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{teacher.name}</td>
                <td style={{ padding: '12px' }}>{teacher.subject}</td>
                <td style={{ padding: '12px' }}>{teacher.email}</td>
                <td style={{ padding: '12px' }}>{teacher.phone}</td>
                <td style={{ padding: '12px' }}>{teacher.qualification}</td>
                <td style={{ padding: '12px' }}>{teacher.experience}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: teacher.status === 'Active' ? '#10b981' : teacher.status === 'On Leave' ? '#f59e0b' : '#6b7280',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {teacher.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{teacher.joinDate}</td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => handleEdit(teacher)}
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
                    onClick={() => handleDelete(teacher.id)}
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
        {teachers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No teachers found. Click "Add New Teacher" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;