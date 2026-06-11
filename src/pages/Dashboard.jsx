import { useState } from "react";
import Analytics from "../components/Analytics";
import AnalysisTables from "../components/AnalysisTables";
import AdminAIAssistant from "../components/AdminAIAssistant";
import AccountManagement from "../components/AccountManagement";

export default function Dashboard() {
  const [activePanel, setActivePanel] = useState("overview");

  // Sample data for admin dashboard
  const [payments] = useState([
    { id: 1, student: "John Doe", amount: 5000, type: "Tuition", method: "Bank", date: "2026-06-01", receipt: "RCP001" },
    { id: 2, student: "Jane Smith", amount: 2000, type: "Uniform", method: "Cash", date: "2026-06-02", receipt: "RCP002" }
  ]);

  const [expenses] = useState([
    { id: 1, category: "Sports Equipment", item: "Football Balls", amount: 15000, date: "2026-06-01", vendor: "Sports Ltd" },
    { id: 2, category: "Academic Supplies", item: "Bond Papers", amount: 8000, date: "2026-06-02", vendor: "Stationery Hub" }
  ]);

  const [sports] = useState([
    { id: 1, name: "John Doe", sport: "Football", level: "Senior", status: "Active" },
    { id: 2, name: "Jane Smith", sport: "Netball", level: "Junior", status: "Active" }
  ]);

  const totalIncome = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const printReceipt = (payment) => {
    const receiptHTML = `
      <div style="font-family: Arial; width: 450px; margin: 20px; border: 2px solid #333; padding: 25px; background: white;">
        <div style="text-align: center; border-bottom: 3px solid #1a3a6b; padding-bottom: 15px;">
          <h1 style="margin: 0; color: #1a3a6b; font-size: 28px;">🎓 SCHOOL ADMIN</h1>
          <h2 style="margin: 5px 0; color: #333; font-size: 16px;">PAYMENT RECEIPT</h2>
        </div>
        <div style="margin: 20px 0; border-bottom: 1px solid #ddd; padding-bottom: 15px;">
          <h3 style="margin: 0 0 10px 0; color: #1a3a6b;">School Information</h3>
          <p style="margin: 5px 0;"><strong>Institution:</strong> Central High School</p>
          <p style="margin: 5px 0;"><strong>Location:</strong> Harare, Zimbabwe</p>
          <p style="margin: 5px 0;"><strong>Contact:</strong> +263 242 123456</p>
        </div>
        <div style="margin: 20px 0; border-bottom: 1px solid #ddd; padding-bottom: 15px;">
          <h3 style="margin: 0 0 10px 0; color: #1a3a6b;">Payment Details</h3>
          <p style="margin: 5px 0;"><strong>Receipt No:</strong> <span style="color: #1a73e8;">${payment.receipt}</span></p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${payment.date}</p>
          <p style="margin: 5px 0;"><strong>Student:</strong> ${payment.student}</p>
          <p style="margin: 5px 0;"><strong>Type:</strong> ${payment.type}</p>
          <p style="margin: 5px 0;"><strong>Method:</strong> ${payment.method}</p>
        </div>
        <div style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px;">
          <p style="margin: 0; text-align: right; font-size: 18px; color: #1a3a6b;">
            <strong>Amount: ZWL ${payment.amount}</strong>
          </p>
        </div>
        <p style="margin: 20px 0 0 0; text-align: center; font-size: 10px; color: #999;">Thank you for your payment!</p>
      </div>
    `;
    const newWindow = window.open("", "Receipt", "width=550,height=700");
    newWindow.document.write(receiptHTML);
    newWindow.document.close();
    setTimeout(() => newWindow.print(), 250);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ color: "#333", marginTop: "0", marginBottom: "30px" }}>📊 Admin Dashboard - Full Control</h1>

      {/* Main Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "15px", marginBottom: "30px" }}>
        {[
          { title: "Total Students", value: "47", icon: "👥", color: "#1a73e8" },
          { title: "Total Teachers", value: "8", icon: "👨‍🏫", color: "#34a853" },
          { title: "Total Income", value: `ZWL ${totalIncome.toLocaleString()}`, icon: "💵", color: "#fbbc04" },
          { title: "Total Expenses", value: `ZWL ${totalExpenses.toLocaleString()}`, icon: "💸", color: "#ea4335" },
          { title: "Attendance Rate", value: "93%", icon: "✅", color: "#7c3aed" }
        ].map((card, idx) => (
          <div key={idx} style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <p style={{ margin: "0 0 8px 0", color: "#999", fontSize: "12px" }}>{card.title}</p>
            <h3 style={{ margin: "0 0 10px 0", color: card.color, fontSize: "22px", fontWeight: "bold" }}>{card.value}</h3>
            <p style={{ margin: "0", fontSize: "24px" }}>{card.icon}</p>
          </div>
        ))}
      </div>

      {/* Panel Selector */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px", flexWrap: "wrap" }}>
        <button
          onClick={() => setActivePanel("overview")}
          style={{
            padding: "10px 16px",
            backgroundColor: activePanel === "overview" ? "#1a73e8" : "#e5e7eb",
            color: activePanel === "overview" ? "white" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "13px"
          }}
        >
          📊 Overview
        </button>
        <button
          onClick={() => setActivePanel("ai")}
          style={{
            padding: "10px 16px",
            backgroundColor: activePanel === "ai" ? "#7c3aed" : "#e5e7eb",
            color: activePanel === "ai" ? "white" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "13px"
          }}
        >
          🤖 AI Assistant
        </button>
        <button
          onClick={() => setActivePanel("payments")}
          style={{
            padding: "10px 16px",
            backgroundColor: activePanel === "payments" ? "#34a853" : "#e5e7eb",
            color: activePanel === "payments" ? "white" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "13px"
          }}
        >
          💵 Payments
        </button>
        <button
          onClick={() => setActivePanel("sports")}
          style={{
            padding: "10px 16px",
            backgroundColor: activePanel === "sports" ? "#9c27b0" : "#e5e7eb",
            color: activePanel === "sports" ? "white" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "13px"
          }}
        >
          ⚽ Sports
        </button>
        <button
          onClick={() => setActivePanel("accounts")}
          style={{
            padding: "10px 16px",
            backgroundColor: activePanel === "accounts" ? "#7c3aed" : "#e5e7eb",
            color: activePanel === "accounts" ? "white" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "13px"
          }}
        >
          👤 User Accounts
        </button>
      </div>

      {/* OVERVIEW PANEL */}
      {activePanel === "overview" && (
        <div>
          <Analytics />
          <h2 style={{ color: "#333", marginTop: "40px", marginBottom: "20px" }}>📋 System Overview</h2>
          <AnalysisTables />
        </div>
      )}

      {/* AI ASSISTANT PANEL */}
      {activePanel === "ai" && (
        <div>
          <AdminAIAssistant />
        </div>
      )}

      {/* PAYMENTS PANEL */}
      {activePanel === "payments" && (
        <div style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <div style={{ padding: "15px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
            <h3 style={{ margin: "0", color: "#333", fontSize: "15px" }}>💵 All Payments Record</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Student</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Amount (ZWL)</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Type</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Method</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Date</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Receipt</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px", color: "#333" }}>{payment.student}</td>
                  <td style={{ padding: "12px", fontWeight: "bold", color: "#34a853" }}>ZWL {payment.amount.toLocaleString()}</td>
                  <td style={{ padding: "12px", color: "#666" }}>{payment.type}</td>
                  <td style={{ padding: "12px", color: "#666" }}>{payment.method}</td>
                  <td style={{ padding: "12px", color: "#666" }}>{payment.date}</td>
                  <td style={{ padding: "12px", color: "#1a73e8", fontWeight: "bold" }}>{payment.receipt}</td>
                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() => printReceipt(payment)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "11px"
                      }}
                    >
                      🖨️ Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: "15px", backgroundColor: "#f9f9f9", textAlign: "right", fontWeight: "bold" }}>
            Total Income: ZWL {totalIncome.toLocaleString()}
          </div>
        </div>
      )}

      {/* SPORTS PANEL */}
      {activePanel === "sports" && (
        <div style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <div style={{ padding: "15px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
            <h3 style={{ margin: "0", color: "#333", fontSize: "15px" }}>⚽ Sports Participation</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Student Name</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Sport</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Level</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sports.map((participant) => (
                <tr key={participant.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px", color: "#333" }}>{participant.name}</td>
                  <td style={{ padding: "12px", color: "#666" }}>{participant.sport}</td>
                  <td style={{ padding: "12px", color: "#666" }}>{participant.level}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{
                      backgroundColor: "#e8f5e9",
                      color: "#2e7d32",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: "bold"
                    }}>
                      {participant.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ACCOUNTS PANEL */}
      {activePanel === "accounts" && (
        <div style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", padding: "25px" }}>
          <AccountManagement />
        </div>
      )}
    </div>
  );
}
