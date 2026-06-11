// src/pages/Finance.jsx
import React, { useState, useEffect } from 'react';

const Finance = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Income',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Cash',
    status: 'Pending',
    student: '',
    description: ''
  });

  const incomeCategories = ['Tuition Fees', 'Admission Fees', 'Sports Fees', 'Library Fees', 'Transport Fees', 'Exam Fees'];
  const expenseCategories = ['Teacher Salaries', 'Maintenance', 'Equipment', 'Utilities', 'Stationery', 'Events'];
  const paymentMethods = ['Cash', 'Bank Transfer', 'Credit Card', 'Check'];
  const statuses = ['Completed', 'Pending', 'Failed'];

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Default data
      const defaultTransactions = [
        { id: 1, type: 'Income', category: 'Tuition Fees', amount: 50000, date: '2024-01-15', paymentMethod: 'Bank Transfer', status: 'Completed', student: 'John Doe' },
        { id: 2, type: 'Income', category: 'Admission Fees', amount: 15000, date: '2024-01-10', paymentMethod: 'Cash', status: 'Completed', student: 'Jane Smith' },
        { id: 3, type: 'Expense', category: 'Teacher Salaries', amount: 25000, date: '2024-01-05', paymentMethod: 'Bank Transfer', status: 'Completed', description: 'January salaries' },
        { id: 4, type: 'Expense', category: 'Maintenance', amount: 5000, date: '2024-01-12', paymentMethod: 'Cash', status: 'Completed', description: 'Building repairs' },
        { id: 5, type: 'Income', category: 'Sports Fees', amount: 8000, date: '2024-01-20', paymentMethod: 'Credit Card', status: 'Pending', student: 'Mike Wilson' },
        { id: 6, type: 'Expense', category: 'Equipment', amount: 12000, date: '2024-01-18', paymentMethod: 'Bank Transfer', status: 'Completed', description: 'New sports equipment' },
        { id: 7, type: 'Income', category: 'Library Fees', amount: 3000, date: '2024-01-22', paymentMethod: 'Cash', status: 'Completed', student: 'Sarah Brown' },
        { id: 8, type: 'Expense', category: 'Utilities', amount: 3500, date: '2024-01-25', paymentMethod: 'Bank Transfer', status: 'Pending', description: 'Electricity bill' }
      ];
      setTransactions(defaultTransactions);
      localStorage.setItem('transactions', JSON.stringify(defaultTransactions));
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount) {
      alert('Please fill all required fields');
      return;
    }

    let updatedTransactions;
    if (editingId) {
      updatedTransactions = transactions.map(transaction => 
        transaction.id === editingId ? { ...formData, id: editingId, amount: parseFloat(formData.amount) } : transaction
      );
      setTransactions(updatedTransactions);
    } else {
      const newTransaction = {
        id: transactions.length + 1,
        ...formData,
        amount: parseFloat(formData.amount)
      };
      updatedTransactions = [...transactions, newTransaction];
      setTransactions(updatedTransactions);
    }
    
    // Trigger storage event for dashboard
    window.dispatchEvent(new Event('storage'));
    resetForm();
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setFormData({
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount.toString(),
      date: transaction.date,
      paymentMethod: transaction.paymentMethod,
      status: transaction.status,
      student: transaction.student || '',
      description: transaction.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      setTransactions(updatedTransactions);
      // Trigger storage event for dashboard
      window.dispatchEvent(new Event('storage'));
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      type: 'Income',
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'Cash',
      status: 'Pending',
      student: '',
      description: ''
    });
  };

  const totalIncome = transactions.filter(t => t.type === 'Income' && t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense' && t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;
  const pendingAmount = transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Finance & Fees Management</h1>
        <p style={{ color: '#666' }}>Track income, expenses, and manage financial transactions</p>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Total Income</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#10b981' }}>${totalIncome.toLocaleString()}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #ef4444' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Total Expenses</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#ef4444' }}>${totalExpense.toLocaleString()}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Balance</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: balance >= 0 ? '#10b981' : '#ef4444' }}>${balance.toLocaleString()}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>Pending Amount</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#f59e0b' }}>${pendingAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Add Transaction Button */}
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
        + Add Transaction
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
            maxWidth: '500px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Transaction' : 'Add Transaction'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Transaction Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="">Select Category</option>
                  {(formData.type === 'Income' ? incomeCategories : expenseCategories).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Amount *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  {paymentMethods.map(method => <option key={method} value={method}>{method}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
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

              {formData.type === 'Income' && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Student Name</label>
                  <input
                    type="text"
                    name="student"
                    value={formData.student}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
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
                  {editingId ? 'Update' : 'Add'} Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Amount</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Payment Method</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Details</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: transaction.type === 'Income' ? '#10b981' : '#ef4444',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {transaction.type}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{transaction.category}</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: transaction.type === 'Income' ? '#10b981' : '#ef4444' }}>
                  ${transaction.amount.toLocaleString()}
                </td>
                <td style={{ padding: '12px' }}>{transaction.date}</td>
                <td style={{ padding: '12px' }}>{transaction.paymentMethod}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    backgroundColor: transaction.status === 'Completed' ? '#10b981' : transaction.status === 'Pending' ? '#f59e0b' : '#ef4444',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {transaction.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  {transaction.student || transaction.description || '-'}
                </td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => handleEdit(transaction)}
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
                    onClick={() => handleDelete(transaction.id)}
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
        {transactions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No transactions found. Click "Add Transaction" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Finance;