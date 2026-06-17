import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function FinanceDashboard() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("payments");

  useEffect(() => {
    const user = localStorage.getItem("role");
    if (user !== "FINANCE_OFFICER") {
      navigate("/login");
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const paymentsData = await api.getPayments();
      const expensesData = await api.getExpenses();
      setPayments(paymentsData || []);
      setExpenses(expensesData || []);
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

  const totalPayments = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

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
        <h1 style={{ margin: 0 }}>Finance Dashboard</h1>
        <div>
          <span style={{ marginRight: "20px" }}>Welcome, {localStorage.getItem("email")} (FINANCE OFFICER)</span>
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
          <h3 style={{ margin: "0 0 10px 0", color: "#6b7280" }}>Total Payments</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#059669", margin: 0 }}>
            ${totalPayments.toFixed(2)}
          </p>
        </div>

        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#6b7280" }}>Total Expenses</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#dc2626", margin: 0 }}>
            ${totalExpenses.toFixed(2)}
          </p>
        </div>

        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#6b7280" }}>Balance</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#1e3a8a", margin: 0 }}>
            ${(totalPayments - totalExpenses).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("payments")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "payments" ? "#1e3a8a" : "#e5e7eb",
            color: activeTab === "payments" ? "white" : "black",
            border: "none",
            borderRadius: "4px 4px 0 0",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          Payments ({payments.length})
        </button>
        <button
          onClick={() => setActiveTab("expenses")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "expenses" ? "#1e3a8a" : "#e5e7eb",
            color: activeTab === "expenses" ? "white" : "black",
            border: "none",
            borderRadius: "4px 4px 0 0",
            cursor: "pointer"
          }}
        >
          Expenses ({expenses.length})
        </button>
      </div>

      {/* Payments Table */}
      {activeTab === "payments" && (
        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginTop: 0 }}>💰 Payments</h2>
          {loading ? (
            <p>Loading...</p>
          ) : payments.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No payments recorded yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>ID</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Student</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Amount</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px" }}>{payment.id || "-"}</td>
                    <td style={{ padding: "12px" }}>{payment.studentName || "-"}</td>
                    <td style={{ padding: "12px", fontWeight: "bold", color: "#059669" }}>
                      ${payment.amount || 0}
                    </td>
                    <td style={{ padding: "12px" }}>{payment.date || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Expenses Table */}
      {activeTab === "expenses" && (
        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginTop: 0 }}>📊 Expenses</h2>
          {loading ? (
            <p>Loading...</p>
          ) : expenses.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No expenses recorded yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>ID</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Category</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Amount</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px" }}>{expense.id || "-"}</td>
                    <td style={{ padding: "12px" }}>{expense.category || "-"}</td>
                    <td style={{ padding: "12px", fontWeight: "bold", color: "#dc2626" }}>
                      ${expense.amount || 0}
                    </td>
                    <td style={{ padding: "12px" }}>{expense.date || "-"}</td>
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