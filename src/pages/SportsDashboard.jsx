import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function SportsDashboard() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("participants");

  useEffect(() => {
    const user = localStorage.getItem("role");
    if (user !== "SPORTS_COORDINATOR") {
      navigate("/login");
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const participantsData = await api.getSportsParticipants();
      const competitionsData = await api.getSportsCompetitions();
      setParticipants(participantsData || []);
      setCompetitions(competitionsData || []);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ margin: 0 }}>Sports Coordinator Dashboard</h1>
        <div>
          <span style={{ marginRight: "20px" }}>Welcome, {localStorage.getItem("email")} (SPORTS COORDINATOR)</span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}>
        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#6b7280" }}>Total Participants</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#1e3a8a", margin: 0 }}>
            {participants.length}
          </p>
        </div>

        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#6b7280" }}>Total Competitions</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#059669", margin: 0 }}>
            {competitions.length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("participants")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "participants" ? "#1e3a8a" : "#e5e7eb",
            color: activeTab === "participants" ? "white" : "black",
            border: "none",
            borderRadius: "4px 4px 0 0",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          Participants ({participants.length})
        </button>
        <button
          onClick={() => setActiveTab("competitions")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "competitions" ? "#1e3a8a" : "#e5e7eb",
            color: activeTab === "competitions" ? "white" : "black",
            border: "none",
            borderRadius: "4px 4px 0 0",
            cursor: "pointer"
          }}
        >
          Competitions ({competitions.length})
        </button>
      </div>

      {/* Participants Table */}
      {activeTab === "participants" && (
        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginTop: 0 }}>⚽ Participants</h2>
          {loading ? (
            <p>Loading...</p>
          ) : participants.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No participants registered yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>ID</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Name</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Sport</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Grade</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr key={participant.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px" }}>{participant.id || "-"}</td>
                    <td style={{ padding: "12px" }}>{participant.name || "-"}</td>
                    <td style={{ padding: "12px" }}>{participant.sport || "-"}</td>
                    <td style={{ padding: "12px" }}>{participant.grade || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Competitions Table */}
      {activeTab === "competitions" && (
        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginTop: 0 }}>🏆 Competitions</h2>
          {loading ? (
            <p>Loading...</p>
          ) : competitions.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No competitions scheduled yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>ID</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Name</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Sport</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {competitions.map((competition) => (
                  <tr key={competition.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px" }}>{competition.id || "-"}</td>
                    <td style={{ padding: "12px" }}>{competition.name || "-"}</td>
                    <td style={{ padding: "12px" }}>{competition.sport || "-"}</td>
                    <td style={{ padding: "12px" }}>{competition.date || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}