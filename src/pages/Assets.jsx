import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        const data = await api.getAssets();
        setAssets(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load assets');
        setAssets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading Assets...</h2>
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

  // Calculate asset statistics
  const totalValue = assets.reduce((sum, asset) => sum + (asset.value || 0), 0);
  const goodCondition = assets.filter(a => a.condition === 'GOOD').length;
  const needsMaintenance = assets.filter(a => a.condition === 'MAINTENANCE').length;

  return (
    <div style={{ padding: '20px' }}>
      <h1>🏢 Assets</h1>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '15px',
        marginBottom: '30px',
      }}>
        <div style={{
          padding: '15px',
          backgroundColor: '#dbeafe',
          borderRadius: '8px',
          border: '1px solid #93c5fd',
        }}>
          <h4 style={{ color: '#1e40af', margin: '0 0 5px 0' }}>Total Assets</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e40af', margin: 0 }}>
            {assets.length}
          </p>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: '#dcfce7',
          borderRadius: '8px',
          border: '1px solid #86efac',
        }}>
          <h4 style={{ color: '#166534', margin: '0 0 5px 0' }}>Total Value</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#166534', margin: 0 }}>
            ${totalValue.toFixed(2)}
          </p>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: '#dcfce7',
          borderRadius: '8px',
          border: '1px solid #86efac',
        }}>
          <h4 style={{ color: '#166534', margin: '0 0 5px 0' }}>Good Condition</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#166534', margin: 0 }}>
            {goodCondition}
          </p>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: '#fef3c7',
          borderRadius: '8px',
          border: '1px solid #fcd34d',
        }}>
          <h4 style={{ color: '#b45309', margin: '0 0 5px 0' }}>Needs Maintenance</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#b45309', margin: 0 }}>
            {needsMaintenance}
          </p>
        </div>
      </div>

      {/* Assets Table */}
      {assets.length === 0 ? (
        <p style={{ fontSize: '16px', color: '#666' }}>No assets found</p>
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
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Category</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Value</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Condition</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Location</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Purchased Date</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={asset.id || index} style={{
                  borderBottom: '1px solid #ddd',
                  backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff',
                }}>
                  <td style={{ padding: '12px' }}>{asset.id || '-'}</td>
                  <td style={{ padding: '12px' }}>{asset.name || '-'}</td>
                  <td style={{ padding: '12px' }}>{asset.category || '-'}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#1e40af' }}>
                    ${asset.value || 0}
                  </td>
                  <td style={{
                    padding: '12px',
                    backgroundColor: 
                      asset.condition === 'GOOD' ? '#dcfce7' :
                      asset.condition === 'MAINTENANCE' ? '#fef3c7' :
                      '#fee2e2',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    color:
                      asset.condition === 'GOOD' ? '#166534' :
                      asset.condition === 'MAINTENANCE' ? '#b45309' :
                      '#991b1b',
                  }}>
                    {asset.condition || '-'}
                  </td>
                  <td style={{ padding: '12px' }}>{asset.location || '-'}</td>
                  <td style={{ padding: '12px' }}>{asset.purchasedDate || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
