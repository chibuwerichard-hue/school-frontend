import React, { useState } from 'react';

const FinanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddAsset, setShowAddAsset] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-01-15', type: 'Payment', category: 'School Fees', amount: 50000, student: 'Alice Johnson', status: 'Completed' },
    { id: 2, date: '2024-01-20', type: 'Expense', category: 'Salaries', amount: 25000, description: 'January Salaries', status: 'Completed' },
    { id: 3, date: '2024-01-25', type: 'Payment', category: 'Library Fees', amount: 5000, student: 'Bob Smith', status: 'Pending' },
    { id: 4, date: '2024-01-28', type: 'Expense', category: 'Maintenance', amount: 3000, description: 'Building Repairs', status: 'Completed' },
  ]);

  const [assets, setAssets] = useState([
    { id: 1, name: 'School Building', category: 'Property', purchasePrice: 500000, currentValue: 480000, condition: 'Good', purchaseDate: '2010-01-01' },
    { id: 2, name: 'Computer Lab', category: 'Equipment', purchasePrice: 50000, currentValue: 35000, condition: 'Fair', purchaseDate: '2020-06-15' },
    { id: 3, name: 'Football Equipment', category: 'Sports Gear', purchasePrice: 10000, currentValue: 8000, condition: 'Good', purchaseDate: '2022-08-20' },
  ]);

  const [newPayment, setNewPayment] = useState({ student: '', amount: '', category: 'School Fees', date: new Date().toISOString().split('T')[0] });
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
  const [newAsset, setNewAsset] = useState({ name: '', category: 'Equipment', purchasePrice: '', condition: 'Good', purchaseDate: new Date().toISOString().split('T')[0] });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const addPayment = () => {
    const payment = { id: transactions.length + 1, ...newPayment, type: 'Payment', status: 'Completed' };
    setTransactions([...transactions, payment]);
    setShowAddPayment(false);
    setNewPayment({ student: '', amount: '', category: 'School Fees', date: new Date().toISOString().split('T')[0] });
    alert('✅ Payment added successfully!');
  };

  const addExpense = () => {
    const expense = { id: transactions.length + 1, ...newExpense, type: 'Expense', status: 'Completed' };
    setTransactions([...transactions, expense]);
    setShowAddExpense(false);
    setNewExpense({ category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
    alert('✅ Expense added successfully!');
  };

  const addAsset = () => {
    const asset = { id: assets.length + 1, ...newAsset, purchasePrice: parseFloat(newAsset.purchasePrice), currentValue: parseFloat(newAsset.purchasePrice) };
    setAssets([...assets, asset]);
    setShowAddAsset(false);
    setNewAsset({ name: '', category: 'Equipment', purchasePrice: '', condition: 'Good', purchaseDate: new Date().toISOString().split('T')[0] });
    alert('✅ Asset added successfully!');
  };

  const totalPayments = transactions.filter(t => t.type === 'Payment').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  const totalAssets = assets.reduce((sum, a) => sum + a.currentValue, 0);
  const balance = totalPayments - totalExpenses;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-800 to-yellow-900 text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">💰 Finance Dashboard</h1>
              <p className="text-yellow-200 mt-1">Welcome back, {user.email}</p>
            </div>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-green-600 text-2xl mb-2">💰</div>
            <div className="text-2xl font-bold">${totalPayments.toLocaleString()}</div>
            <div className="text-gray-600">Total Payments</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-red-600 text-2xl mb-2">📉</div>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <div className="text-gray-600">Total Expenses</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-blue-600 text-2xl mb-2">⚖️</div>
            <div className="text-2xl font-bold">${balance.toLocaleString()}</div>
            <div className="text-gray-600">Balance</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-purple-600 text-2xl mb-2">🏢</div>
            <div className="text-2xl font-bold">${totalAssets.toLocaleString()}</div>
            <div className="text-gray-600">Total Assets</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setShowAddPayment(true)} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">+ Add Payment</button>
          <button onClick={() => setShowAddExpense(true)} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">+ Add Expense</button>
          <button onClick={() => setShowAddAsset(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">+ Add Asset</button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <div className="flex">
              <button onClick={() => setActiveTab('transactions')} className={`px-6 py-3 font-semibold ${activeTab === 'transactions' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-600'}`}>Transactions</button>
              <button onClick={() => setActiveTab('assets')} className={`px-6 py-3 font-semibold ${activeTab === 'assets' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-600'}`}>Assets</button>
              <button onClick={() => setActiveTab('reports')} className={`px-6 py-3 font-semibold ${activeTab === 'reports' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-600'}`}>Reports</button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'transactions' && (
              <div>
                <h2 className="text-xl font-bold mb-4">All Transactions</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr><th className="px-4 py-2 text-left">Date</th><th className="px-4 py-2 text-left">Type</th><th className="px-4 py-2 text-left">Category</th><th className="px-4 py-2 text-left">Description/Student</th><th className="px-4 py-2 text-left">Amount</th><th className="px-4 py-2 text-left">Status</th></tr>
                    </thead>
                    <tbody>
                      {transactions.map(t => (
                        <tr key={t.id} className="border-t">
                          <td className="px-4 py-2">{t.date}</td>
                          <td className="px-4 py-2"><span className={`px-2 py-1 rounded text-sm ${t.type === 'Payment' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{t.type}</span></td>
                          <td className="px-4 py-2">{t.category}</td>
                          <td className="px-4 py-2">{t.student || t.description || '-'}</td>
                          <td className="px-4 py-2 font-bold">${t.amount.toLocaleString()}</td>
                          <td className="px-4 py-2"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{t.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'assets' && (
              <div>
                <h2 className="text-xl font-bold mb-4">School Assets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assets.map(a => (
                    <div key={a.id} className="border rounded-lg p-4">
                      <h3 className="font-bold text-lg">{a.name}</h3>
                      <p className="text-sm text-gray-600">Category: {a.category}</p>
                      <p className="text-sm">Purchase Price: ${a.purchasePrice.toLocaleString()}</p>
                      <p className="text-sm">Current Value: ${a.currentValue.toLocaleString()}</p>
                      <p className="text-sm">Condition: {a.condition}</p>
                      <p className="text-sm">Purchase Date: {a.purchaseDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Financial Reports</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Monthly Summary</h3>
                    <p>Total Income: ${totalPayments.toLocaleString()}</p>
                    <p>Total Expenses: ${totalExpenses.toLocaleString()}</p>
                    <p>Net Profit: ${balance.toLocaleString()}</p>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Download Report</button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Asset Depreciation Report</h3>
                    <p>Total Asset Value: ${totalAssets.toLocaleString()}</p>
                    <p>Number of Assets: {assets.length}</p>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Generate Asset Report</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAddPayment && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-lg p-6 w-96"><h3 className="text-xl font-bold mb-4">Add Payment</h3>
        <input type="text" placeholder="Student Name" className="w-full border rounded px-3 py-2 mb-3" value={newPayment.student} onChange={e => setNewPayment({...newPayment, student: e.target.value})} />
        <input type="number" placeholder="Amount" className="w-full border rounded px-3 py-2 mb-3" value={newPayment.amount} onChange={e => setNewPayment({...newPayment, amount: e.target.value})} />
        <select className="w-full border rounded px-3 py-2 mb-3" value={newPayment.category} onChange={e => setNewPayment({...newPayment, category: e.target.value})}><option>School Fees</option><option>Library Fees</option><option>Sports Fees</option><option>Other</option></select>
        <div className="flex gap-2"><button onClick={addPayment} className="bg-green-600 text-white px-4 py-2 rounded flex-1">Add</button><button onClick={() => setShowAddPayment(false)} className="bg-gray-300 px-4 py-2 rounded flex-1">Cancel</button></div>
      </div></div>)}

      {/* Add Expense Modal */}
      {showAddExpense && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-lg p-6 w-96"><h3 className="text-xl font-bold mb-4">Add Expense</h3>
        <input type="text" placeholder="Category" className="w-full border rounded px-3 py-2 mb-3" value={newExpense.category} onChange={e => setNewExpense({...newExpense, category: e.target.value})} />
        <input type="number" placeholder="Amount" className="w-full border rounded px-3 py-2 mb-3" value={newExpense.amount} onChange={e => setNewExpense({...newExpense, amount: e.target.value})} />
        <textarea placeholder="Description" className="w-full border rounded px-3 py-2 mb-3" rows="2" value={newExpense.description} onChange={e => setNewExpense({...newExpense, description: e.target.value})} />
        <div className="flex gap-2"><button onClick={addExpense} className="bg-red-600 text-white px-4 py-2 rounded flex-1">Add</button><button onClick={() => setShowAddExpense(false)} className="bg-gray-300 px-4 py-2 rounded flex-1">Cancel</button></div>
      </div></div>)}

      {/* Add Asset Modal */}
      {showAddAsset && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-lg p-6 w-96"><h3 className="text-xl font-bold mb-4">Add Asset</h3>
        <input type="text" placeholder="Asset Name" className="w-full border rounded px-3 py-2 mb-3" value={newAsset.name} onChange={e => setNewAsset({...newAsset, name: e.target.value})} />
        <input type="number" placeholder="Purchase Price" className="w-full border rounded px-3 py-2 mb-3" value={newAsset.purchasePrice} onChange={e => setNewAsset({...newAsset, purchasePrice: e.target.value})} />
        <select className="w-full border rounded px-3 py-2 mb-3" value={newAsset.condition} onChange={e => setNewAsset({...newAsset, condition: e.target.value})}><option>Good</option><option>Fair</option><option>Poor</option></select>
        <div className="flex gap-2"><button onClick={addAsset} className="bg-blue-600 text-white px-4 py-2 rounded flex-1">Add</button><button onClick={() => setShowAddAsset(false)} className="bg-gray-300 px-4 py-2 rounded flex-1">Cancel</button></div>
      </div></div>)}
    </div>
  );
};

export default FinanceDashboard;
