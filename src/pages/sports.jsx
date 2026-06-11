// src/pages/Sports.jsx
import React, { useState, useEffect } from 'react';

const Sports = () => {
  const [sports, setSports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    participants: '',
    equipment: '',
    venue: '',
    coach: '',
    status: 'Active',
    schedule: ''
  });

  const statuses = ['Active', 'Seasonal', 'Inactive'];

  // Load sports from localStorage on component mount
  useEffect(() => {
    const savedSports = localStorage.getItem('sports');
    if (savedSports) {
      setSports(JSON.parse(savedSports));
    } else {
      // Default data
      const defaultSports = [
        { id: 1, name: 'Football', participants: 22, equipment: 'Ball, Goals, Jerseys', venue: 'Football Field', coach: 'Coach Smith', status: 'Active', schedule: 'Mon/Wed/Fri 3:00 PM' },
        { id: 2, name: 'Basketball', participants: 12, equipment: 'Balls, Hoops, Jerseys', venue: 'Basketball Court', coach: 'Coach Johnson', status: 'Active', schedule: 'Tue/Thu 4:00 PM' },
        { id: 3, name: 'Tennis', participants: 8, equipment: 'Rackets, Balls, Nets', venue: 'Tennis Court', coach: 'Coach Williams', status: 'Active', schedule: 'Mon/Wed 2:00 PM' },
        { id: 4, name: 'Swimming', participants: 15, equipment: 'Swim caps, Goggles, Kickboards', venue: 'Swimming Pool', coach: 'Coach Brown', status: 'Active', schedule: 'Tue/Thu/Fri 7:00 AM' },
        { id: 5, name: 'Athletics', participants: 30, equipment: 'Track spikes, Starting blocks', venue: 'Track Field', coach: 'Coach Davis', status: 'Active', schedule: 'Mon/Wed/Fri 4:30 PM' },
        { id: 6, name: 'Volleyball', participants: 10, equipment: 'Volleyballs, Net, Knee pads', venue: 'Gymnasium', coach: 'Coach Miller', status: 'Seasonal', schedule: 'Tue/Thu 3:30 PM' },
        { id: 7, name: 'Cricket', participants: 18, equipment: 'Bats, Balls, Stumps, Pads', venue: 'Cricket Ground', coach: 'Coach Wilson', status: 'Active', schedule: 'Sat/Sun 8:00 AM' }
      ];
      setSports(defaultSports);
      localStorage.setItem('sports', JSON.stringify(defaultSports));
    }
  }, []);

  // Save sports to localStorage whenever they change
  useEffect(() => {
    if (sports.length > 0) {
      localStorage.setItem('sports', JSON.stringify(sports));
    }
  }, [sports]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.participants || !formData.venue) {
      alert('Please fill all required fields');
      return;
    }

    let updatedSports;
    if (editingId) {
      updatedSports = sports.map(sport => 
        sport.id === editingId 
          ? { ...formData, id: editingId, participants: parseInt(formData.participants) }
          : sport
      );
      setSports(updatedSports);
    } else {
      const newSport = {
        id: sports.length + 1,
        ...formData,
        participants: parseInt(formData.participants)
      };
      updatedSports = [...sports, newSport];
      setSports(updatedSports);
    }
    
    // Trigger storage event for dashboard
    window.dispatchEvent(new Event('storage'));
    resetForm();
  };

  const handleEdit = (sport) => {
    setEditingId(sport.id);
    setFormData({
      name: sport.name,
      participants: sport.participants.toString(),
      equipment: sport.equipment,
      venue: sport.venue,
      coach: sport.coach,
      status: sport.status,
      schedule: sport.schedule
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sport?')) {
      const updatedSports = sports.filter(sport => sport.id !== id);
      setSports(updatedSports);
      // Trigger storage event for dashboard
      window.dispatchEvent(new Event('storage'));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      participants: '',
      equipment: '',
      venue: '',
      coach: '',
      status: 'Active',
      schedule: ''
    });
  };

  const totalParticipants = sports.reduce((sum, sport) => sum + sport.participants, 0);
  const activeSports = sports.filter(s => s.status === 'Active').length;
  const seasonalSports = sports.filter(s => s.status === 'Seasonal').length;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Sports Management</h1>
        <p style={{ color: '#666' }}>Manage school sports teams, equipment, and activities</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Total Sports</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{sports.length}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Active Sports</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#10b981' }}>{activeSports}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Total Participants</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#f59e0b' }}>{totalParticipants}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #8b5cf6' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Seasonal</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{seasonalSports}</p>
        </div>
      </div>

      <button
        onClick={() => setShowForm(true)}
        style={{
          backgroundColor: '#10b981',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          fontSize: '16px'
        }}
      >
        + Add New Sport
      </button>

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
            maxWidth: '500px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Sport' : 'Add New Sport'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Sport Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Number of Participants *</label>
                <input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  required
                  min="1"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Equipment Needed</label>
                <input
                  type="text"
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Venue *</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Coach Name</label>
                <input
                  type="text"
                  name="coach"
                  value={formData.coach}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Schedule</label>
                <input
                  type="text"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
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
                  style={{ padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  {editingId ? 'Update' : 'Add'} Sport
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Sport Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Participants</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Equipment</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Venue</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Coach</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Schedule</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sports.map((sport) => (
              <tr key={sport.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{sport.name}</td>
                <td style={{ padding: '12px' }}>{sport.participants}</td>
                <td style={{ padding: '12px' }}>{sport.equipment}</td>
                <td style={{ padding: '12px' }}>{sport.venue}</td>
                <td style={{ padding: '12px' }}>{sport.coach}</td>
                <td style={{ padding: '12px' }}>{sport.schedule}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: sport.status === 'Active' ? '#10b981' : sport.status === 'Seasonal' ? '#f59e0b' : '#6b7280',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {sport.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => handleEdit(sport)}
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
                    onClick={() => handleDelete(sport.id)}
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
        {sports.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No sports found. Click "Add New Sport" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Sports;