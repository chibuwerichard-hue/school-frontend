export default function AnalysisTables() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
      {/* Student Performance Table */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
          <h3 style={{ margin: "0", color: "#333" }}>🎓 Student Performance Analysis</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>Grade</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>Pass Rate</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {[
              { grade: "10A", rate: "88%", trend: "↑ +5%" },
              { grade: "10B", rate: "82%", trend: "↑ +2%" },
              { grade: "11A", rate: "91%", trend: "↓ -1%" },
              { grade: "11B", rate: "78%", trend: "↑ +8%" },
              { grade: "12A", rate: "95%", trend: "↑ +3%" }
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px", color: "#333" }}>{row.grade}</td>
                <td style={{ padding: "12px", color: "#333", fontWeight: "bold" }}>{row.rate}</td>
                <td style={{ padding: "12px", color: row.trend.includes("↑") ? "#34a853" : "#ea4335" }}>{row.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dropout Analysis Table */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
          <h3 style={{ margin: "0", color: "#333" }}>📉 Dropout Analysis</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>Cause</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>Count</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>%</th>
            </tr>
          </thead>
          <tbody>
            {[
              { cause: "Financial Issues", count: "12", percent: "45%" },
              { cause: "Illness", count: "5", percent: "18%" },
              { cause: "Family Issues", count: "6", percent: "22%" },
              { cause: "Poor Performance", count: "4", percent: "15%" }
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px", color: "#333" }}>{row.cause}</td>
                <td style={{ padding: "12px", color: "#333", fontWeight: "bold" }}>{row.count}</td>
                <td style={{ padding: "12px", color: "#ea4335" }}>{row.percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assets Purchase History */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
          <h3 style={{ margin: "0", color: "#333" }}>📦 Asset Purchase History (2024)</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>Category</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>Purchased</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {[
              { category: "IT Equipment", count: "34", value: "ZWL 85,000" },
              { category: "Furniture", count: "28", value: "ZWL 42,000" },
              { category: "Lab Equipment", count: "15", value: "ZWL 120,000" },
              { category: "Sports Equipment", count: "42", value: "ZWL 28,000" }
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px", color: "#333" }}>{row.category}</td>
                <td style={{ padding: "12px", color: "#333", fontWeight: "bold" }}>{row.count}</td>
                <td style={{ padding: "12px", color: "#1a73e8" }}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Finance Summary */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
          <h3 style={{ margin: "0", color: "#333" }}>💳 Finance Summary (Current Term)</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>Category</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>Amount</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", color: "#666" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { category: "Total Expected", amount: "ZWL 600,000", status: "Target" },
              { category: "Collected", amount: "ZWL 450,000", status: "✅ On Track" },
              { category: "Outstanding", amount: "ZWL 150,000", status: "⚠️ Follow Up" },
              { category: "Overhead Costs", amount: "ZWL 280,000", status: "💰 Paid" }
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px", color: "#333" }}>{row.category}</td>
                <td style={{ padding: "12px", color: "#333", fontWeight: "bold" }}>{row.amount}</td>
                <td style={{ padding: "12px", color: "#666" }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
