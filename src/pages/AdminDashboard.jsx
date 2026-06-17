import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ students: 0, teachers: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("role");
    if (user !== "ADMIN") {
      navigate("/login");
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const students = await api.getStudents();
      const teachers = await api.getTeachers();
      setStats({
        students: students?.length || 0,
        teachers: teachers?.length || 0,
        total: (students?.length || 0) + (teachers?.length || 0)
      });
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
        <h1 style={{ margin: 0 }}>School Management System Dashboard</h1>
        <div>
          <span style={{ marginRight: "20px" }}>Welcome, {localStorage.getItem("email")} (ADMIN)</span>
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
          <h3 style={{ margin: "0 0 10px 0", color: "#6b7280" }}>Total Students</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#1e3a8a", margin: 0 }}>
            {stats.students}
          </p>
        </div>

        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#6b7280" }}>Total Teachers</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#059669", margin: 0 }}>
            {stats.teachers}
          </p>
        </div>

        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#6b7280" }}>Total Users</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#7c3aed", margin: 0 }}>
            {stats.total}
          </p>
        </div>
      </div>

      {/* System Users Table */}
      <div style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ marginTop: 0 }}>System Users</h2>
        <table style={{
          width: "100%",
          borderCollapse: "collapse"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6" }}>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>ID</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Role</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, email: "admin@school.com", role: "ADMIN", status: "Active" },
              { id: 2, email: "teacher@school.com", role: "TEACHER", status: "Active" },
              { id: 3, email: "finance@school.com", role: "FINANCE_OFFICER", status: "Active" },
              { id: 4, email: "sports@school.com", role: "SPORTS_COORDINATOR", status: "Active" }
            ].map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "12px" }}>{user.id}</td>
                <td style={{ padding: "12px" }}>{user.email}</td>
                <td style={{ padding: "12px" }}>{user.role}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{
                    backgroundColor: "#dcfce7",
                    color: "#166534",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px"
                  }}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}