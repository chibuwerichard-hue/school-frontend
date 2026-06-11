import React, { useState } from 'react';

const SportsDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showAddResult, setShowAddResult] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [events, setEvents] = useState([
    { id: 1, name: 'Football Tournament', date: '2024-02-15', venue: 'Main Field', teams: 4, status: 'Upcoming' },
    { id: 2, name: 'Basketball Championship', date: '2024-02-20', venue: 'Indoor Arena', teams: 6, status: 'Upcoming' },
    { id: 3, name: 'Annual Sports Day', date: '2024-03-10', venue: 'Sports Complex', teams: 12, status: 'Coming Soon' },
  ]);

  const [teams, setTeams] = useState([
    { id: 1, name: 'Football Team A', sport: 'Football', captain: 'John Doe', players: 15, wins: 8, losses: 2 },
    { id: 2, name: 'Football Team B', sport: 'Football', captain: 'Jane Smith', players: 14, wins: 5, losses: 5 },
    { id: 3, name: 'Basketball Eagles', sport: 'Basketball', captain: 'Mike Johnson', players: 12, wins: 7, losses: 3 },
    { id: 4, name: 'Basketball Tigers', sport: 'Basketball', captain: 'Sarah Williams', players: 12, wins: 4, losses: 6 },
  ]);

  const [results, setResults] = useState([
    { id: 1, event: 'Football Tournament', winner: 'Team A', score: '3-1', date: '2024-02-01' },
    { id: 2, event: 'Basketball Championship', winner: 'Eagles', score: '85-72', date: '2024-02-05' },
  ]);

  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '' });
  const [newTeam, setNewTeam] = useState({ name: '', sport: 'Football', captain: '', players: '' });
  const [newResult, setNewResult] = useState({ event: '', winner: '', score: '' });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const addEvent = () => {
    const event = { id: events.length + 1, ...newEvent, teams: 0, status: 'Upcoming' };
    setEvents([...events, event]);
    setShowAddEvent(false);
    setNewEvent({ name: '', date: '', venue: '' });
    alert('✅ Sports event added successfully!');
  };

  const addTeam = () => {
    const team = { id: teams.length + 1, ...newTeam, players: parseInt(newTeam.players), wins: 0, losses: 0 };
    setTeams([...teams, team]);
    setShowAddTeam(false);
    setNewTeam({ name: '', sport: 'Football', captain: '', players: '' });
    alert('✅ Team added successfully!');
  };

  const addResult = () => {
    const result = { id: results.length + 1, ...newResult, date: new Date().toISOString().split('T')[0] };
    setResults([...results, result]);
    setShowAddResult(false);
    setNewResult({ event: '', winner: '', score: '' });
    alert('✅ Match result added successfully!');
  };

  const totalWins = teams.reduce((sum, t) => sum + t.wins, 0);
  const totalParticipants = teams.reduce((sum, t) => sum + t.players, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">⚽ Sports Dashboard</h1>
              <p className="text-purple-200 mt-1">Welcome back, {user.email}</p>
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
            <div className="text-purple-600 text-2xl mb-2">⚽</div>
            <div className="text-2xl font-bold">{events.length}</div>
            <div className="text-gray-600">Total Events</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-green-600 text-2xl mb-2">🏆</div>
            <div className="text-2xl font-bold">{teams.length}</div>
            <div className="text-gray-600">Active Teams</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-blue-600 text-2xl mb-2">👥</div>
            <div className="text-2xl font-bold">{totalParticipants}</div>
            <div className="text-gray-600">Total Participants</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-yellow-600 text-2xl mb-2">🥇</div>
            <div className="text-2xl font-bold">{totalWins}</div>
            <div className="text-gray-600">Total Wins</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setShowAddEvent(true)} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">+ Create Event</button>
          <button onClick={() => setShowAddTeam(true)} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">+ Add Team</button>
          <button onClick={() => setShowAddResult(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">+ Add Result</button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <div className="flex">
              <button onClick={() => setActiveTab('events')} className={`px-6 py-3 font-semibold ${activeTab === 'events' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}>Upcoming Events</button>
              <button onClick={() => setActiveTab('teams')} className={`px-6 py-3 font-semibold ${activeTab === 'teams' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}>Teams & Participants</button>
              <button onClick={() => setActiveTab('results')} className={`px-6 py-3 font-semibold ${activeTab === 'results' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}>Match Results & Wins</button>
              <button onClick={() => setActiveTab('leaders')} className={`px-6 py-3 font-semibold ${activeTab === 'leaders' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}>Team Leaders</button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'events' && (
              <div>
                <h2 className="text-xl font-bold mb-4">📅 Upcoming Sports Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {events.map(e => (
                    <div key={e.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                      <h3 className="font-bold text-lg">{e.name}</h3>
                      <p className="text-gray-600">📅 {e.date}</p>
                      <p className="text-gray-600">📍 {e.venue}</p>
                      <p className="text-gray-600">👥 {e.teams} Teams</p>
                      <span className="inline-block mt-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{e.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'teams' && (
              <div>
                <h2 className="text-xl font-bold mb-4">🏅 Sports Teams & Participants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teams.map(t => (
                    <div key={t.id} className="border rounded-lg p-4">
                      <h3 className="font-bold text-lg">{t.name}</h3>
                      <p className="text-gray-600">Sport: {t.sport}</p>
                      <p className="text-gray-600">Captain: {t.captain}</p>
                      <p className="text-gray-600">Players: {t.players}</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-green-600">Wins: {t.wins}</span>
                        <span className="text-red-600">Losses: {t.losses}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div>
                <h2 className="text-xl font-bold mb-4">🏆 Match Results & Wins</h2>
                <div className="space-y-4">
                  {results.map(r => (
                    <div key={r.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="text-center flex-1">
                          <p className="font-bold">{r.event}</p>
                          <p className="text-2xl font-bold text-green-600">{r.winner}</p>
                          <p className="text-gray-600">Winner</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold">{r.score}</p>
                          <p className="text-gray-600 text-sm">{r.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'leaders' && (
              <div>
                <h2 className="text-xl font-bold mb-4">👑 Team Leaders & Captains</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teams.map(t => (
                    <div key={t.id} className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-white">
                      <h3 className="font-bold text-lg">{t.name}</h3>
                      <p className="text-gray-700">👤 Captain: <span className="font-semibold">{t.captain}</span></p>
                      <p className="text-gray-700">🏆 Sport: {t.sport}</p>
                      <p className="text-gray-700">📊 Record: {t.wins}W - {t.losses}L</p>
                      <p className="text-gray-700">👥 Team Size: {t.players} players</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-lg p-6 w-96"><h3 className="text-xl font-bold mb-4">Create Sports Event</h3>
        <input type="text" placeholder="Event Name" className="w-full border rounded px-3 py-2 mb-3" value={newEvent.name} onChange={e => setNewEvent({...newEvent, name: e.target.value})} />
        <input type="date" className="w-full border rounded px-3 py-2 mb-3" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
        <input type="text" placeholder="Venue" className="w-full border rounded px-3 py-2 mb-3" value={newEvent.venue} onChange={e => setNewEvent({...newEvent, venue: e.target.value})} />
        <div className="flex gap-2"><button onClick={addEvent} className="bg-purple-600 text-white px-4 py-2 rounded flex-1">Create</button><button onClick={() => setShowAddEvent(false)} className="bg-gray-300 px-4 py-2 rounded flex-1">Cancel</button></div>
      </div></div>)}

      {/* Add Team Modal */}
      {showAddTeam && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-lg p-6 w-96"><h3 className="text-xl font-bold mb-4">Add New Team</h3>
        <input type="text" placeholder="Team Name" className="w-full border rounded px-3 py-2 mb-3" value={newTeam.name} onChange={e => setNewTeam({...newTeam, name: e.target.value})} />
        <select className="w-full border rounded px-3 py-2 mb-3" value={newTeam.sport} onChange={e => setNewTeam({...newTeam, sport: e.target.value})}><option>Football</option><option>Basketball</option><option>Tennis</option><option>Cricket</option></select>
        <input type="text" placeholder="Team Captain" className="w-full border rounded px-3 py-2 mb-3" value={newTeam.captain} onChange={e => setNewTeam({...newTeam, captain: e.target.value})} />
        <input type="number" placeholder="Number of Players" className="w-full border rounded px-3 py-2 mb-3" value={newTeam.players} onChange={e => setNewTeam({...newTeam, players: e.target.value})} />
        <div className="flex gap-2"><button onClick={addTeam} className="bg-green-600 text-white px-4 py-2 rounded flex-1">Add Team</button><button onClick={() => setShowAddTeam(false)} className="bg-gray-300 px-4 py-2 rounded flex-1">Cancel</button></div>
      </div></div>)}

      {/* Add Result Modal */}
      {showAddResult && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white rounded-lg p-6 w-96"><h3 className="text-xl font-bold mb-4">Add Match Result</h3>
        <input type="text" placeholder="Event Name" className="w-full border rounded px-3 py-2 mb-3" value={newResult.event} onChange={e => setNewResult({...newResult, event: e.target.value})} />
        <input type="text" placeholder="Winner Team" className="w-full border rounded px-3 py-2 mb-3" value={newResult.winner} onChange={e => setNewResult({...newResult, winner: e.target.value})} />
        <input type="text" placeholder="Score (e.g., 3-1)" className="w-full border rounded px-3 py-2 mb-3" value={newResult.score} onChange={e => setNewResult({...newResult, score: e.target.value})} />
        <div className="flex gap-2"><button onClick={addResult} className="bg-blue-600 text-white px-4 py-2 rounded flex-1">Add Result</button><button onClick={() => setShowAddResult(false)} className="bg-gray-300 px-4 py-2 rounded flex-1">Cancel</button></div>
      </div></div>)}
    </div>
  );
};

export default SportsDashboard;
