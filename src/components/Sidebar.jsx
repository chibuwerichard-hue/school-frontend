import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const role = localStorage.getItem("role") || "ADMIN";

  const menuItems = {
    "ADMIN": [
      { path: "/admin-dashboard", label: "Dashboard", icon: "📊" },
      { path: "/students", label: "Students", icon: "👥" },
      { path: "/teachers", label: "Teachers", icon: "👨‍🏫" },
      { path: "/attendance", label: "Attendance", icon: "✅" },
      { path: "/finance", label: "Finance", icon: "💰" },
      { path: "/sports", label: "Sports", icon: "⚽" },
      { path: "/assets", label: "Assets", icon: "🏢" }
    ],
    "TEACHER": [
      { path: "/teacher-dashboard", label: "My Dashboard", icon: "📊" },
      { path: "/teacher-dashboard", label: "Grades", icon: "📝" },
      { path: "/teacher-dashboard", label: "Classes", icon: "👥" }
    ],
    "FINANCE_OFFICER": [
      { path: "/finance-dashboard", label: "Finance", icon: "💰" },
      { path: "/finance-dashboard", label: "Payments", icon: "💵" },
      { path: "/finance-dashboard", label: "Expenses", icon: "💸" }
    ],
    "SPORTS_COORDINATOR": [
      { path: "/sports-dashboard", label: "Sports", icon: "⚽" },
      { path: "/sports-dashboard", label: "Participants", icon: "👥" },
      { path: "/sports-dashboard", label: "Competitions", icon: "🏆" }
    ]
  };

  const items = menuItems[role] || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={{
      width: collapsed ? "80px" : "250px",
      backgroundColor: "#1a3a6b",
      color: "white",
      height: "100vh",
      overflow: "auto",
      transition: "width 0.3s",
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 1000,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <div style={{ padding: "20px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{
          background: "none",
          border: "none",
          color: "white",
          fontSize: "20px",
          cursor: "pointer"
        }}>
          {collapsed ? "▶️" : "◀️"}
        </button>
        {!collapsed && <h2 style={{ margin: "10px 0 0 0", fontSize: "16px" }}>School Admin</h2>}
      </div>

      <nav style={{ padding: "20px 0" }}>
        {items.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              padding: "15px 20px",
              cursor: "pointer",
              backgroundColor: location.pathname === item.path ? "rgba(255,255,255,0.2)" : "transparent",
              borderLeft: location.pathname === item.path ? "4px solid #4a9eff" : "none",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              transition: "all 0.3s"
            }}
          >
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            {!collapsed && <span style={{ fontSize: "14px" }}>{item.label}</span>}
          </div>
        ))}
      </nav>

      <div style={{ position: "absolute", bottom: "20px", width: "100%", padding: "0 20px", boxSizing: "border-box" }}>
        <button onClick={handleLogout} style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#ea4335",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold"
        }}>
          {collapsed ? "🚪" : "Logout"}
        </button>
      </div>
    </div>
  );
}
