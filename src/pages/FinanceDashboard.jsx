import { useState, useEffect } from "react";

export default function FinanceDashboard() {
  const [activePanel, setActivePanel] = useState("payments");
  
  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem("payments");
    return saved ? JSON.parse(saved) : [
      { id: 1, student: "John Doe", amount: 5000, type: "Tuition", method: "Bank", date: "2026-06-01", receipt: "RCP001" },
      { id: 2, student: "Jane Smith", amount: 2000, type: "Uniform", method: "Cash", date: "2026-06-02", receipt: "RCP002" }
    ];
  });
  
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [
      { id: 1, category: "Sports Equipment", item: "Football Balls & Nets", amount: 15000, date: "2026-06-01", vendor: "Sports Ltd" },
      { id: 2, category: "School Equipment", item: "Classroom Desks", amount: 42000, date: "2026-06-02", vendor: "Furniture Co" },
      { id: 3, category: "Academic Supplies", item: "Bond Papers & Pencils", amount: 8000, date: "2026-06-03", vendor: "Stationery Hub" },
      { id: 4, category: "Asset Purchase", item: "Computer Lab PCs", amount: 85000, date: "2026-06-04", vendor: "Tech Solutions" }
    ];
  });
  
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  
  const [paymentForm, setPaymentForm] = useState({
    student: "",
    amount: "",
    type: "Tuition",
    method: "Bank"
  });
  
  const [expenseForm, setExpenseForm] = useState({
    category: "Sports Equipment",
    item: "",
    amount: "",
    vendor: ""
  });

  // Save payments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newPayment = {
      id: payments.length + 1,
      student: paymentForm.student,
      amount: parseInt(paymentForm.amount),
      type: paymentForm.type,
      method: paymentForm.method,
      date: new Date().toISOString().split('T')[0],
      receipt: `RCP${String(payments.length + 1).padStart(3, '0')}`
    };
    setPayments([...payments, newPayment]);
    setPaymentForm({ student: "", amount: "", type: "Tuition", method: "Bank" });
    setShowPaymentForm(false);
    alert("✅ Payment recorded! Receipt: " + newPayment.receipt);
  };

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
          <p style="margin: 5px 0;"><strong>Phone:</strong> +263 242 123456</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> admin@schooladmin.com</p>
        </div>
        
        <div style="margin: 20px 0; border-bottom: 1px solid #ddd; padding-bottom: 15px;">
          <h3 style="margin: 0 0 10px 0; color: #1a3a6b;">Payment Details</h3>
          <p style="margin: 5px 0;"><strong>Receipt No:</strong> <span style="color: #1a73e8; font-weight: bold;">${payment.receipt}</span></p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${payment.date}</p>
          <p style="margin: 5px 0;"><strong>Student Name:</strong> ${payment.student}</p>
          <p style="margin: 5px 0;"><strong>Payment Type:</strong> ${payment.type}</p>
          <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${payment.method}</p>
        </div>
        
        <div style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px;">
          <p style="margin: 0; text-align: right; font-size: 18px; color: #1a3a6b;">
            <strong>Amount: ZWL ${payment.amount}</strong>
          </p>
        </div>
        
        <div style="margin: 20px 0; text-align: center; border-top: 1px solid #ddd; padding-top: 15px;">
          <p style="margin: 5px 0; font-size: 12px; color: #666;"><strong>Thank you for your payment!</strong></p>
          <p style="margin: 5px 0; font-size: 10px; color: #999;">This receipt must be kept for records</p>
          <p style="margin: 15px 0 0 0; font-size: 10px; color: #999;">Generated on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;
    const newWindow = window.open("", "Receipt", "width=550,height=700");
    newWindow.document.write(receiptHTML);
    newWindow.document.close();
    setTimeout(() => newWindow.print(), 250);
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: expenses.length + 1,
      category: expenseForm.category,
      item: expenseForm.item,
      amount: parseInt(expenseForm.amount),
      date: new Date().toISOString().split('T')[0],
      vendor: expenseForm.vendor
    };
    setExpenses([...expenses, newExpense]);
    setExpenseForm({ category: "Sports Equipment", item: "", amount: "", vendor: "" });
    setShowExpenseForm(false);
    alert("✅ Expense recorded!");
  };

  const totalIncome = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  const expenseCategories = [
    "Sports Equipment",
    "School Equipment",
    "Academic Supplies",
    "Asset Purchase",
    "Staff Expenses",
    "Utilities",
    "Maintenance",
    "Other"
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ color: "#333", marginTop: "0" }}>💰 Finance Officer Dashboard</h1>

      {/* Financial Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "40px" }}>
        {[
          { title: "Total Income", value: `ZWL ${totalIncome.toLocaleString()}`, icon: "💵", color: "#34a853" },
          { title: "Total Expenses", value: `ZWL ${totalExpenses.toLocaleString()}`, icon: "💸", color: "#ea4335" },
          { title: "Balance", value: `ZWL ${balance.toLocaleString()}`, icon: "💎", color: "#1a73e8" }
        ].map((card, idx) => (
          <div key={idx} style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <p style={{ margin: "0 0 10px 0", color: "#999", fontSize: "13px" }}>{card.title}</p>
              <h3 style={{ margin: "0", color: card.color, fontSize: "24px", fontWeight: "bold" }}>{card.value}</h3>
            </div>
            <div style={{ fontSize: "35px" }}>{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Panel Selector */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <button
          onClick={() => setActivePanel("payments")}
          style={{
            padding: "12px 30px",
            backgroundColor: activePanel === "payments" ? "#34a853" : "#e5e7eb",
            color: activePanel === "payments" ? "white" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px"
          }}
        >
          💵 Payments ({payments.length})
        </button>
        <button
          onClick={() => setActivePanel("expenses")}
          style={{
            padding: "12px 30px",
            backgroundColor: activePanel === "expenses" ? "#ea4335" : "#e5e7eb",
            color: activePanel === "expenses" ? "white" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px"
          }}
        >
          💸 Expenses ({expenses.length})
        </button>
      </div>

      {/* PAYMENTS PANEL */}
      {activePanel === "payments" && (
        <div>
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#34a853",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginBottom: "20px",
              fontWeight: "bold"
            }}
          >
            {showPaymentForm ? "❌ Cancel" : "➕ Record Payment"}
          </button>

          {showPaymentForm && (
            <div style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "8px",
              marginBottom: "25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>💵 Record Student Payment</h3>
              <form onSubmit={handlePaymentSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Student Name *</label>
                    <input
                      type="text"
                      placeholder="Enter student name"
                      value={paymentForm.student}
                      onChange={(e) => setPaymentForm({ ...paymentForm, student: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Amount (ZWL) *</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={paymentForm.amount}
                      onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Payment Type *</label>
                    <select
                      value={paymentForm.type}
                      onChange={(e) => setPaymentForm({ ...paymentForm, type: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                    >
                      <option value="Tuition">Tuition</option>
                      <option value="Uniform">Uniform</option>
                      <option value="Transport">Transport</option>
                      <option value="Activity">Activity</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Payment Method *</label>
                    <select
                      value={paymentForm.method}
                      onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                    >
                      <option value="Cash">💵 Cash</option>
                      <option value="Bank">🏦 Bank Transfer</option>
                      <option value="Ecocash">📱 Ecocash</option>
                      <option value="ZiG">💳 ZiG</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#34a853",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "15px",
                    fontWeight: "bold"
                  }}
                >
                  💾 Record Payment
                </button>
              </form>
            </div>
          )}

          {/* Payments Table */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden"
          }}>
            <div style={{ padding: "15px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
              <h3 style={{ margin: "0", color: "#333", fontSize: "15px" }}>📊 Student Payments Record</h3>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f9f9f9" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Student Name</th>
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
                          padding: "6px 12px",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        🖨️ Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EXPENSES PANEL */}
      {activePanel === "expenses" && (
        <div>
          <button
            onClick={() => setShowExpenseForm(!showExpenseForm)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ea4335",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginBottom: "20px",
              fontWeight: "bold"
            }}
          >
            {showExpenseForm ? "❌ Cancel" : "➕ Record Expense"}
          </button>

          {showExpenseForm && (
            <div style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "8px",
              marginBottom: "25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>💸 Record School Expense</h3>
              <form onSubmit={handleExpenseSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Expense Category *</label>
                    <select
                      value={expenseForm.category}
                      onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                    >
                      {expenseCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Item Description *</label>
                    <input
                      type="text"
                      placeholder="e.g., Football Balls, Desk Chairs, Bond Papers"
                      value={expenseForm.item}
                      onChange={(e) => setExpenseForm({ ...expenseForm, item: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Amount (ZWL) *</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={expenseForm.amount}
                      onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Vendor/Supplier *</label>
                    <input
                      type="text"
                      placeholder="e.g., Sports Ltd, Stationery Hub"
                      value={expenseForm.vendor}
                      onChange={(e) => setExpenseForm({ ...expenseForm, vendor: e.target.value })}
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
                    backgroundColor: "#ea4335",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "15px",
                    fontWeight: "bold"
                  }}
                >
                  💾 Record Expense
                </button>
              </form>
            </div>
          )}

          {/* Expense Categories Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "25px" }}>
            {expenseCategories.map((category) => {
              const categoryTotal = expenses
                .filter(e => e.category === category)
                .reduce((sum, e) => sum + e.amount, 0);
              return (
                <div key={category} style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "6px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  borderLeft: "4px solid #ea4335"
                }}>
                  <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#666", fontWeight: "600" }}>{category}</p>
                  <p style={{ margin: "0", fontSize: "18px", fontWeight: "bold", color: "#333" }}>ZWL {categoryTotal.toLocaleString()}</p>
                </div>
              );
            })}
          </div>

          {/* Expenses Table */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden"
          }}>
            <div style={{ padding: "15px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
              <h3 style={{ margin: "0", color: "#333", fontSize: "15px" }}>📊 All School Expenses</h3>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f9f9f9" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Category</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Item Description</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Vendor</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Amount (ZWL)</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: "20px", textAlign: "center", color: "#999" }}>No expenses recorded yet</td>
                  </tr>
                ) : (
                  expenses.map((expense) => (
                    <tr key={expense.id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "12px" }}>
                        <span style={{
                          backgroundColor: "#ffe5e5",
                          color: "#ea4335",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "bold"
                        }}>
                          {expense.category}
                        </span>
                      </td>
                      <td style={{ padding: "12px", color: "#333" }}>{expense.item}</td>
                      <td style={{ padding: "12px", color: "#666" }}>{expense.vendor}</td>
                      <td style={{ padding: "12px", fontWeight: "bold", color: "#ea4335" }}>ZWL {expense.amount.toLocaleString()}</td>
                      <td style={{ padding: "12px", color: "#666" }}>{expense.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
