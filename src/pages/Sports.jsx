import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Sports() {
  const [participants, setParticipants] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('participants');

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        setLoading(true);
        const [participantsData, competitionsData, statsData] = await Promise.all([
          api.getSportsParticipants(),
          api.getSportsCompetitions(),
          api.getSportsStats(),
        ]);
        setParticipants(Array.isArray(participantsData) ? participantsData : []);
        setCompetitions(Array.isArray(competitionsData) ? competitionsData : []);
        setStats(statsData || {});
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load sports data');
        setParticipants([]);
        setCompetitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading Sports Data...</h2>
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
      <h1>⚽ Sports</h1>

      {/* Stats Cards */}
      {stats && (
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
            <h4 style={{ color: '#1e40af', margin: '0 0 5px 0' }}>Total Participants</h4>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e40af', margin: 0 }}>
              {participants.length}
            </p>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#fce7f3',
            borderRadius: '8px',
            border: '1px solid #fbcfe8',
          }}>
            <h4 style={{ color: '#be185d', margin: '0 0 5px 0' }}>Total Competitions</h4>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#be185d', margin: 0 }}>
              {competitions.length}
            </p>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#dcfce7',
            borderRadius: '8px',
            border: '1px solid #86efac',
          }}>
            <h4 style={{ color: '#166534', margin: '0 0 5px 0' }}>Medals Won</h4>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#166534', margin: 0 }}>
              {stats.medalCount || 0}
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '2px solid #e5e7eb',
      }}>
        <button
          onClick={() => setActiveTab('participants')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'participants' ? '#1e3a8a' : '#f3f4f6',
            color: activeTab === 'participants' ? 'white' : '#1f2937',
            border: 'none',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Participants ({participants.length})
        </button>
        <button
          onClick={() => setActiveTab('competitions')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'competitions' ? '#1e3a8a' : '#f3f4f6',
            color: activeTab === 'competitions' ? 'white' : '#1f2937',
            border: 'none',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Competitions ({competitions.length})
        </button>
      </div>

      {/* Participants Table */}
      {activeTab === 'participants' && (
        <div>
          {participants.length === 0 ? (
            <p style={{ fontSize: '16px', color: '#666' }}>No participants found</p>
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
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Sport</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Grade</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Medals</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant, index) => (
                    <tr key={participant.id || index} style={{
                      borderBottom: '1px solid #ddd',
                      backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff',
                    }}>
                      <td style={{ padding: '12px' }}>{participant.id || '-'}</td>
                      <td style={{ padding: '12px' }}>{participant.name || '-'}</td>
                      <td style={{ padding: '12px' }}>{participant.sport || '-'}</td>
                      <td style={{ padding: '12px' }}>{participant.grade || '-'}</td>
                      <td style={{
                        padding: '12px',
                        backgroundColor: participant.status === 'ACTIVE' ? '#dcfce7' : '#f3f4f6',
                        borderRadius: '4px',
                      }}>
                        {participant.status || '-'}
                      </td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#d97706' }}>
                        🏆 {participant.medals || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Competitions Table */}
      {activeTab === 'competitions' && (
        <div>
          {competitions.length === 0 ? (
            <p style={{ fontSize: '16px', color: '#666' }}>No competitions found</p>
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
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Sport</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Location</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {competitions.map((competition, index) => (
                    <tr key={competition.id || index} style={{
                      borderBottom: '1px solid #ddd',
                      backgroundColor: index % 2 === 0 ? '#f9fafb' : '#fff',
                    }}>
                      <td style={{ padding: '12px' }}>{competition.id || '-'}</td>
                      <td style={{ padding: '12px' }}>{competition.name || '-'}</td>
                      <td style={{ padding: '12px' }}>{competition.sport || '-'}</td>
                      <td style={{ padding: '12px' }}>{competition.date || '-'}</td>
                      <td style={{ padding: '12px' }}>{competition.location || '-'}</td>
                      <td style={{
                        padding: '12px',
                        backgroundColor: competition.status === 'COMPLETED' ? '#dcfce7' : '#fef3c7',
                        borderRadius: '4px',
                      }}>
                        {competition.status || '-'}
                      </td>
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
