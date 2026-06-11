import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email") || "";
  const role = localStorage.getItem("role") || "";

  const roleDisplay = {
    "ADMIN": "👑 Administrator",
    "TEACHER": "👨‍🏫 Teacher",
    "FINANCE_OFFICER": "💰 Finance Officer",
    "SPORTS_COORDINATOR": "⚽ Sports Coordinator"
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("grade");
    navigate("/login");
  };

  return (
    <div style={{
      backgroundColor: "white",
      padding: "20px 30px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <p style={{ margin: "0", color: "#999", fontSize: "13px" }}>Logged in as:</p>
        <h2 style={{ margin: "5px 0 0 0", color: "#333", fontSize: "16px" }}>
          {name} <span style={{ color: "#7c3aed", fontWeight: "bold" }}>({roleDisplay[role] || role})</span>
        </h2>
        <p style={{ margin: "3px 0 0 0", color: "#999", fontSize: "12px" }}>{email}</p>
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#ea4335",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "13px"
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}
