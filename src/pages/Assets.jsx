// src/pages/Assets.jsx
import React, { useState, useEffect } from 'react';

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    quantity: '',
    condition: 'Good',
    location: '',
    purchaseDate: '',
    status: 'Active'
  });

  const categories = ['Electronics', 'Furniture', 'Equipment', 'Books', 'Sports', 'Supplies'];
  const conditions = ['Excellent', 'Good', 'Fair', 'Needs Repair', 'Damaged'];
  const statuses = ['Active', 'Maintenance', 'Retired'];

  // Load assets from localStorage on component mount
  useEffect(() => {
    const savedAssets = localStorage.getItem('assets');
    if (savedAssets) {
      setAssets(JSON.parse(savedAssets));
    } else {
      // Default data
      const defaultAssets = [
        { id: 1, name: 'Library Books', category: 'Books', quantity: 1250, condition: 'Good', location: 'Library', purchaseDate: '2023-01-15', status: 'Active' },
        { id: 2, name: 'Science Lab Equipment', category: 'Equipment', quantity: 45, condition: 'Excellent', location: 'Science Lab', purchaseDate: '2023-03-20', status: 'Active' },
        { id: 3, name: 'Sports Equipment', category: 'Sports', quantity: 200, condition: 'Fair', location: 'Gymnasium', purchaseDate: '2023-02-10', status: 'Active' },
        { id: 4, name: 'Classroom Desks', category: 'Furniture', quantity: 150, condition: 'Good', location: 'Various Classrooms', purchaseDate: '2022-11-05', status: 'Active' },
        { id: 5, name: 'Computers', category: 'Electronics', quantity: 60, condition: 'Excellent', location: 'Computer Lab', purchaseDate: '2023-06-01', status: 'Active' },
        { id: 6, name: 'Projectors', category: 'Electronics', quantity: 12, condition: 'Good', location: 'Classrooms', purchaseDate: '2023-01-20', status: 'Active' },
        { id: 7, name: 'Whiteboards', category: 'Supplies', quantity: 35, condition: 'Needs Repair', location: 'All Classrooms', purchaseDate: '2023-04-12', status: 'Maintenance' },
        { id: 8, name: 'Air Conditioners', category: 'Electronics', quantity: 20, condition: 'Good', location: 'Whole School', purchaseDate: '2022-09-15', status: 'Active' }
      ];
      setAssets(defaultAssets);
      localStorage.setItem('assets', JSON.stringify(defaultAssets));
    }
  }, []);

  // Save assets to localStorage whenever they change
  useEffect(() => {
    if (assets.length > 0) {
      localStorage.setItem('assets', JSON.stringify(assets));
    }
  }, [assets]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.location || !formData.purchaseDate) {
      alert('Please fill all required fields');
      return;
    }

    let updatedAssets;
    if (editingId) {
      updatedAssets = assets.map(asset => 
        asset.id === editingId 
          ? { ...formData, id: editingId, quantity: parseInt(formData.quantity) }
          : asset
      );
      setAssets(updatedAssets);
    } else {
      const newAsset = {
        id: assets.length + 1,
        ...formData,
        quantity: parseInt(formData.quantity)
      };
      updatedAssets = [...assets, newAsset];
      setAssets(updatedAssets);
    }
    
    // Trigger storage event for dashboard
    window.dispatchEvent(new Event('storage'));
    resetForm();
  };

  const handleEdit = (asset) => {
    setEditingId(asset.id);
    setFormData({
      name: asset.name,
      category: asset.category,
      quantity: asset.quantity.toString(),
      condition: asset.condition,
      location: asset.location,
      purchaseDate: asset.purchaseDate,
      status: asset.status
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      const updatedAssets = assets.filter(asset => asset.id !== id);
      setAssets(updatedAssets);
      // Trigger storage event for dashboard
      window.dispatchEvent(new Event('storage'));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Electronics',
      quantity: '',
      condition: 'Good',
      location: '',
      purchaseDate: '',
      status: 'Active'
    });
  };

  const getConditionColor = (condition) => {
    const colors = {
      'Excellent': '#10b981',
      'Good': '#3b82f6',
      'Fair': '#f59e0b',
      'Needs Repair': '#ef4444',
      'Damaged': '#6b7280'
    };
    return colors[condition] || '#6b7280';
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? '#10b981' : status === 'Maintenance' ? '#f59e0b' : '#6b7280';
  };

  const totalItems = assets.reduce((sum, asset) => sum + asset.quantity, 0);
  const needsMaintenance = assets.filter(a => a.status === 'Maintenance' || a.condition === 'Needs Repair').length;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Asset Management</h1>
        <p style={{ color: '#666' }}>Track and manage all school assets and equipment</p>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Total Assets</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{assets.length}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Total Items</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{totalItems}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Needs Maintenance</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#f59e0b' }}>{needsMaintenance}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #8b5cf6' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Categories</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{categories.length}</p>
        </div>
      </div>

      {/* Add Asset Button */}
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
        + Add New Asset
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
            <h2 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Asset' : 'Add New Asset'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Asset Name *</label>
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
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Condition *</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  >
                    {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                  </select>
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Purchase Date *</label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
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
                  {editingId ? 'Update' : 'Add'} Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assets Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Asset Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Quantity</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Condition</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Location</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Purchase Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{asset.name}</td>
                <td style={{ padding: '12px' }}>{asset.category}</td>
                <td style={{ padding: '12px' }}>{asset.quantity}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: getConditionColor(asset.condition),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {asset.condition}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{asset.location}</td>
                <td style={{ padding: '12px' }}>{asset.purchaseDate}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: getStatusColor(asset.status),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {asset.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => handleEdit(asset)}
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
                    onClick={() => handleDelete(asset.id)}
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
        {assets.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No assets found. Click "Add New Asset" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Assets;