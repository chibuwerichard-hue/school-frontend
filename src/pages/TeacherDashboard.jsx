import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("role");
    if (user !== "TEACHER") {
      navigate("/login");
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const data = await api.getStudents();
      setStudents(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error loading students:", error);
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
        <h1 style={{ margin: 0 }}>Teacher Dashboard</h1>
        <div>
          <span style={{ marginRight: "20px" }}>Welcome, {localStorage.getItem("email")} (TEACHER)</span>
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

      {/* Stats Card */}
      <div style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#6b7280" }}>Total Students</h3>
        <p style={{ fontSize: "32px", fontWeight: "bold", color: "#1e3a8a", margin: 0 }}>
          {students.length}
        </p>
      </div>

      {/* Students Table */}
      <div style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ marginTop: 0 }}>👨‍🎓 My Students</h2>
        {loading ? (
          <p>Loading...</p>
        ) : students.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No students enrolled yet.</p>
        ) : (
          <table style={{
            width: "100%",
            borderCollapse: "collapse"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#f3f4f6" }}>
                <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>ID</th>
                <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Name</th>
                <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Email</th>
                <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px" }}>{student.id || "-"}</td>
                  <td style={{ padding: "12px" }}>{student.name || "-"}</td>
                  <td style={{ padding: "12px" }}>{student.email || "-"}</td>
                  <td style={{ padding: "12px" }}>{student.grade || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}