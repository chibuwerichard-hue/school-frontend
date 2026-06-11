import { useState } from "react";

export default function SportsDashboard() {
  const [participants, setParticipants] = useState([
    { id: 1, name: "John Doe", sport: "Football", level: "Senior", status: "Active" },
    { id: 2, name: "Jane Smith", sport: "Netball", level: "Junior", status: "Active" },
    { id: 3, name: "Mike Johnson", sport: "Athletics", level: "Senior", status: "Active" }
  ]);
  const [competitions, setCompetitions] = useState([
    { id: 1, event: "Football Match", date: "2026-06-15", opponent: "District Team", result: "Won 3-1", level: "District" },
    { id: 2, event: "Athletics", date: "2026-06-10", opponent: "Regional", result: "Won 5 medals", level: "Zonal" }
  ]);
  const [showParticipantForm, setShowParticipantForm] = useState(false);
  const [participantForm, setParticipantForm] = useState({
    name: "",
    sport: "Football",
    level: "Senior"
  });

  const handleAddParticipant = (e) => {
    e.preventDefault();
    const newParticipant = {
      id: participants.length + 1,
      name: participantForm.name,
      sport: participantForm.sport,
      level: participantForm.level,
      status: "Active"
    };
    setParticipants([...participants, newParticipant]);
    setParticipantForm({ name: "", sport: "Football", level: "Senior" });
    setShowParticipantForm(false);
    alert("✅ Participant added!");
  };

  const sportStats = {
    Football: 45,
    Netball: 32,
    Athletics: 67,
    Basketball: 28
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ color: "#333", marginTop: "0" }}>⚽ Sports Coordinator Dashboard</h1>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "40px" }}>
        {[
          { title: "Total Participants", value: participants.length, icon: "👥", color: "#1a73e8" },
          { title: "Sports", value: Object.keys(sportStats).length, icon: "⚽", color: "#34a853" },
          { title: "Competitions", value: competitions.length, icon: "🏆", color: "#fbbc04" },
          { title: "Win Rate", value: "80%", icon: "🎯", color: "#7c3aed" }
        ].map((card, idx) => (
          <div key={idx} style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <p style={{ margin: "0 0 8px 0", color: "#999", fontSize: "12px" }}>{card.title}</p>
              <h3 style={{ margin: "0", color: card.color, fontSize: "24px", fontWeight: "bold" }}>{card.value}</h3>
            </div>
            <div style={{ fontSize: "30px" }}>{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Add Participant Button */}
      <button
        onClick={() => setShowParticipantForm(!showParticipantForm)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
          fontWeight: "bold"
        }}
      >
        {showParticipantForm ? "❌ Cancel" : "➕ Add Participant"}
      </button>

      {/* Participant Form */}
      {showParticipantForm && (
        <div style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <form onSubmit={handleAddParticipant}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
              <input
                type="text"
                placeholder="Student Name"
                value={participantForm.name}
                onChange={(e) => setParticipantForm({ ...participantForm, name: e.target.value })}
                style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", gridColumn: "1 / -1" }}
                required
              />
              <select
                value={participantForm.sport}
                onChange={(e) => setParticipantForm({ ...participantForm, sport: e.target.value })}
                style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px" }}
              >
                <option value="Football">⚽ Football</option>
                <option value="Netball">🏀 Netball</option>
                <option value="Basketball">🏀 Basketball</option>
                <option value="Athletics">🏃 Athletics</option>
              </select>
              <select
                value={participantForm.level}
                onChange={(e) => setParticipantForm({ ...participantForm, level: e.target.value })}
                style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px" }}
              >
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
              <button type="submit" style={{
                gridColumn: "1 / -1",
                padding: "10px",
                backgroundColor: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}>
                💾 Add Participant
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Participants & Competitions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Participants */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          overflow: "hidden"
        }}>
          <div style={{ padding: "15px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
            <h3 style={{ margin: "0", color: "#333", fontSize: "15px" }}>👥 Sports Participants</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={{ padding: "10px", textAlign: "left", fontWeight: "600" }}>Name</th>
                <th style={{ padding: "10px", textAlign: "left", fontWeight: "600" }}>Sport</th>
                <th style={{ padding: "10px", textAlign: "left", fontWeight: "600" }}>Level</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>{p.name}</td>
                  <td style={{ padding: "10px" }}>{p.sport}</td>
                  <td style={{ padding: "10px" }}>{p.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Competitions */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          overflow: "hidden"
        }}>
          <div style={{ padding: "15px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
            <h3 style={{ margin: "0", color: "#333", fontSize: "15px" }}>🏆 Competition Results</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={{ padding: "10px", textAlign: "left", fontWeight: "600" }}>Event</th>
                <th style={{ padding: "10px", textAlign: "left", fontWeight: "600" }}>Level</th>
                <th style={{ padding: "10px", textAlign: "left", fontWeight: "600" }}>Result</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((comp) => (
                <tr key={comp.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>{comp.event}</td>
                  <td style={{ padding: "10px" }}>{comp.level}</td>
                  <td style={{ padding: "10px", color: "#34a853", fontWeight: "bold" }}>{comp.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sports Statistics */}
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>📊 Participation by Sport</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
          {Object.entries(sportStats).map(([sport, count], idx) => (
            <div key={idx} style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}>
              <p style={{ margin: "0 0 10px 0", fontSize: "28px" }}>
                {sport === "Football" ? "⚽" : sport === "Netball" ? "🏀" : sport === "Athletics" ? "🏃" : "🏀"}
              </p>
              <h3 style={{ margin: "0 0 5px 0", color: "#333" }}>{sport}</h3>
              <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold", color: "#7c3aed" }}>{count}</p>
              <p style={{ margin: "5px 0 0 0", fontSize: "11px", color: "#999" }}>participants</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
