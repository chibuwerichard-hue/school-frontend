import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Finance() {
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('payments');

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        setLoading(true);
        const [paymentsData, expensesData] = await Promise.all([
          api.getPayments(),
          api.getExpenses(),
        ]);
        setPayments(Array.isArray(paymentsData) ? paymentsData : []);
        setExpenses(Array.isArray(expensesData) ? expensesData : []);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load finance data');
        setPayments([]);
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading Finance Data...</h2>
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

  const totalPayments = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>💰 Finance</h1>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#dcfce7',
          borderRadius: '8px',
          border: '1px solid #86efac',
        }}>
          <h3 style={{ color: '#166534', margin: '0 0 10px 0' }}>Total Payments</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534', margin: 0 }}>
            ${totalPayments.toFixed(2)}
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
            {payments.length} transactions
          </p>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#fee2e2',
          borderRadius: '8px',
          border: '1px solid #fca5a5',
        }}>
          <h3 style={{ color: '#991b1b', margin: '0 0 10px 0' }}>Total Expenses</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#991b1b', margin: 0 }}>
            ${totalExpenses.toFixed(2)}
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
            {expenses.length} transactions
          </p>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#dbeafe',
          borderRadius: '8px',
          border: '1px solid #93c5fd',
        }}>
          <h3 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>Balance</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af', margin: 0 }}>
            ${(totalPayments - totalExpenses).toFixed(2)}
          </p>
          <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
            {totalPayments > totalExpenses ? 'Surplus' : 'Deficit'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '2px solid #e5e7eb',
      }}>
        <button
          onClick={() => setActiveTab('payments')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'payments' ? '#1e3a8a' : '#f3f4f6',
            color: activeTab === 'payments' ? 'white' : '#1f2937',
            border: 'none',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Payments ({payments.length})
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'expenses' ? '#1e3a8a' : '#f3f4f6',
            color: activeTab === 'expenses' ? 'white' : '#1f2937',
            border: 'none',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Expenses ({expenses.length})
        </button>
      </div>

      {/* Payments Table */}
      {activeTab === 'payments' && (
        <div>
          {payments.length === 0 ? (
            <p style={{ fontSize: '16px', color: '#666' }}>No payments recorded</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}>
                <thead style={{ backgroundColor: '#1e3a8a', color: 'white' }}>
                  <tr>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Student</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Amount</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={payment.id || index} style={{
                      borderBottom: '1px solid #ddd',
                      backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff',
                    }}>
                      <td style={{ padding: '12px' }}>{payment.id || '-'}</td>
                      <td style={{ padding: '12px' }}>{payment.studentName || '-'}</td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#166534' }}>
                        ${payment.amount || 0}
                      </td>
                      <td style={{ padding: '12px' }}>{payment.date || '-'}</td>
                      <td style={{
                        padding: '12px',
                        backgroundColor: payment.status === 'PAID' ? '#dcfce7' : '#fef3c7',
                        borderRadius: '4px',
                      }}>
                        {payment.status || '-'}
                      </td>
                      <td style={{ padding: '12px' }}>{payment.description || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Expenses Table */}
      {activeTab === 'expenses' && (
        <div>
          {expenses.length === 0 ? (
            <p style={{ fontSize: '16px', color: '#666' }}>No expenses recorded</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}>
                <thead style={{ backgroundColor: '#1e3a8a', color: 'white' }}>
                  <tr>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Category</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Amount</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={expense.id || index} style={{
                      borderBottom: '1px solid #ddd',
                      backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff',
                    }}>
                      <td style={{ padding: '12px' }}>{expense.id || '-'}</td>
                      <td style={{ padding: '12px' }}>{expense.category || '-'}</td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#991b1b' }}>
                        ${expense.amount || 0}
                      </td>
                      <td style={{ padding: '12px' }}>{expense.date || '-'}</td>
                      <td style={{ padding: '12px' }}>{expense.description || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
