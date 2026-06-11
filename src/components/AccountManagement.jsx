import { useState, useEffect } from "react";
import { getAllAccounts, createAccount, deleteAccount } from "../services/accountService";

export default function AccountManagement() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "TEACHER",
    grade: "Grade 10A",
    password: "DefaultPass@123"
  });

  // Load accounts on mount
  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    const allAccounts = getAllAccounts();
    setAccounts(allAccounts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    if (accounts.find(a => a.email === formData.email)) {
      alert("❌ This email already exists!");
      return;
    }

    const newAccount = createAccount({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      grade: formData.role === "TEACHER" ? formData.grade : "N/A",
      password: formData.password
    });

    setAccounts([...accounts, newAccount]);
    setFormData({ name: "", email: "", role: "TEACHER", grade: "Grade 10A", password: "DefaultPass@123" });
    setShowForm(false);
    
    alert(`✅ Account created successfully!\n\n📧 Email: ${formData.email}\n🔑 Password: ${formData.password}\n\nThe user can now login with these credentials!`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      deleteAccount(id);
      setAccounts(accounts.filter(a => a.id !== id));
      alert("✅ Account deleted!");
    }
  };

  return (
    <div>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>👤 Account Management</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "14px"
        }}
      >
        {showForm ? "❌ Cancel" : "➕ Create New Account"}
      </button>

      {showForm && (
        <div style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "8px",
          marginBottom: "25px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>🆕 Create User Account</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Email Address *</label>
                <input
                  type="email"
                  placeholder="user@school.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                >
                  <option value="TEACHER">👨‍🏫 Teacher</option>
                  <option value="FINANCE_OFFICER">💰 Finance Officer</option>
                  <option value="SPORTS_COORDINATOR">⚽ Sports Coordinator</option>
                </select>
              </div>
              {formData.role === "TEACHER" && (
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Grade Assignment *</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                  >
                    <option value="Grade 10A">Grade 10A</option>
                    <option value="Grade 10B">Grade 10B</option>
                    <option value="Grade 11A">Grade 11A</option>
                    <option value="Grade 11B">Grade 11B</option>
                    <option value="Grade 12A">Grade 12A</option>
                    <option value="Grade 12B">Grade 12B</option>
                  </select>
                </div>
              )}
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Password *</label>
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "15px",
                fontWeight: "bold"
              }}
            >
              💾 Create Account
            </button>
          </form>
        </div>
      )}

      {/* Accounts Table */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        <div style={{ padding: "15px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
          <h3 style={{ margin: "0", color: "#333", fontSize: "15px" }}>📋 All User Accounts ({accounts.length})</h3>
        </div>
        {accounts.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
            No accounts created yet
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Name</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Email</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Role</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Grade/Dept</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Password</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Created</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px", fontWeight: "bold", color: "#333" }}>{account.name}</td>
                  <td style={{ padding: "12px", color: "#1a73e8" }}>{account.email}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{
                      backgroundColor: account.role === "TEACHER" ? "#e3f2fd" : account.role === "FINANCE_OFFICER" ? "#f3e5f5" : "#e8f5e9",
                      color: account.role === "TEACHER" ? "#1a73e8" : account.role === "FINANCE_OFFICER" ? "#7c3aed" : "#34a853",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: "bold"
                    }}>
                      {account.role === "TEACHER" ? "👨‍🏫 Teacher" : account.role === "FINANCE_OFFICER" ? "💰 Finance" : "⚽ Sports"}
                    </span>
                  </td>
                  <td style={{ padding: "12px", color: "#666" }}>{account.grade}</td>
                  <td style={{ padding: "12px", color: "#666", fontFamily: "monospace", fontSize: "11px" }}>{account.password}</td>
                  <td style={{ padding: "12px", color: "#666" }}>{account.createdDate}</td>
                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() => handleDelete(account.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#ea4335",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "11px",
                        fontWeight: "bold"
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Info Box */}
      <div style={{
        marginTop: "20px",
        backgroundColor: "#e3f2fd",
        border: "1px solid #1a73e8",
        padding: "15px",
        borderRadius: "6px",
        fontSize: "12px"
      }}>
        <p style={{ margin: "0 0 8px 0", fontWeight: "bold", color: "#1a73e8" }}>ℹ️ How it works:</p>
        <ul style={{ margin: "0", paddingLeft: "20px", color: "#1565c0" }}>
          <li>Create accounts above with email and password</li>
          <li>Newly created accounts can login IMMEDIATELY</li>
          <li>Teachers see only their assigned grade</li>
          <li>Finance Officers & Sports Coordinators access their modules</li>
        </ul>
      </div>
    </div>
  );
}
