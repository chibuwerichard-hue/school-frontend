import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@school.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Call backend API for login
      const data = await api.login(email, password);
      
      if (data && data.token) {
        // Save to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        localStorage.setItem("role", data.user?.role || "ADMIN");
        localStorage.setItem("name", data.user?.name || "User");

        // Route by role
        const roleRoutes = {
          "ADMIN": "/admin-dashboard",
          "TEACHER": "/teacher-dashboard",
          "FINANCE_OFFICER": "/finance-dashboard",
          "SPORTS_COORDINATOR": "/sports-dashboard"
        };
        
        navigate(roleRoutes[data.user?.role] || "/admin-dashboard");
      } else {
        setError("❌ Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("❌ Login failed. Check credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        width: "100%",
        maxWidth: "450px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ margin: "0 0 10px 0", color: "#1f2937", fontSize: "28px" }}>🎓 School Admin</h1>
          <p style={{ margin: "0", color: "#6b7280", fontSize: "14px" }}>Education Management System</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            padding: "12px 15px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "13px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#374151"
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                fontSize: "13px",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#374151"
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                fontSize: "13px",
                boxSizing: "border-box",
                fontFamily: "inherit"
              }}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              backgroundColor: loading ? "#9ca3af" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "⏳ Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={{
          marginTop: "25px",
          paddingTop: "20px",
          borderTop: "1px solid #e5e7eb",
          backgroundColor: "#f9fafb",
          padding: "15px",
          borderRadius: "6px",
          fontSize: "12px"
        }}>
          <p style={{ margin: "0 0 10px 0", fontWeight: "600", color: "#374151" }}>📝 Test Accounts:</p>
          {[
            { role: "👑 Admin", email: "admin@school.com" },
            { role: "👨‍🏫 Teacher", email: "teacher@school.com" },
            { role: "💰 Finance", email: "finance@school.com" },
            { role: "⚽ Sports", email: "sports@school.com" }
          ].map((demo, i) => (
            <p key={i} style={{ margin: "5px 0", color: "#6b7280" }}>
              {demo.role}: <strong>{demo.email}</strong>
            </p>
          ))}
          <p style={{ margin: "8px 0 0 0", color: "#9ca3af" }}>Password: <strong>Admin@123</strong></p>
        </div>
      </div>
    </div>
  );
}