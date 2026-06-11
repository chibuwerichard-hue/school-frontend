export default function Analytics() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
      {/* Pass Rate Chart */}
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ margin: "0 0 15px 0", fontSize: "15px", color: "#333" }}>📊 Pass Rate by Grade</h3>
        <div style={{ height: "150px", display: "flex", alignItems: "flex-end", justifyContent: "space-around", gap: "10px" }}>
          {[
            { grade: "G10", rate: 85 },
            { grade: "G11", rate: 78 },
            { grade: "G12", rate: 92 }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", flex: 1 }}>
              <div style={{
                height: `${item.rate}px`,
                backgroundColor: "#3b82f6",
                borderRadius: "4px",
                marginBottom: "8px"
              }}></div>
              <p style={{ margin: "0", fontSize: "12px", fontWeight: "bold" }}>{item.rate}%</p>
              <p style={{ margin: "4px 0 0 0", fontSize: "11px", color: "#999" }}>{item.grade}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fees Collection */}
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ margin: "0 0 15px 0", fontSize: "15px", color: "#333" }}>💰 Fee Collection</h3>
        {[
          { status: "Paid", amount: 75, color: "#34a853" },
          { status: "Partial", amount: 15, color: "#fbbc04" },
          { status: "Unpaid", amount: 10, color: "#ea4335" }
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "12px" }}>
              <span>{item.status}</span>
              <span>{item.amount}%</span>
            </div>
            <div style={{ height: "8px", backgroundColor: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${item.amount}%`, backgroundColor: item.color }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Assets Analysis */}
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ margin: "0 0 15px 0", fontSize: "15px", color: "#333" }}>🏢 Assets Status</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {[
            { label: "Total", value: "245", color: "#3b82f6" },
            { label: "Good", value: "189", color: "#34a853" },
            { label: "Repair", value: "42", color: "#fbbc04" },
            { label: "Poor", value: "14", color: "#ea4335" }
          ].map((item, i) => (
            <div key={i} style={{
              backgroundColor: "#f9f9f9",
              padding: "12px",
              borderRadius: "6px",
              borderLeft: `3px solid ${item.color}`
            }}>
              <p style={{ margin: "0", fontSize: "11px", color: "#999" }}>{item.label}</p>
              <p style={{ margin: "5px 0 0 0", fontSize: "18px", fontWeight: "bold", color: "#333" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sports Participation */}
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ margin: "0 0 15px 0", fontSize: "15px", color: "#333" }}>⚽ Sports Participation</h3>
        {[
          { sport: "Football", count: 45 },
          { sport: "Basketball", count: 32 },
          { sport: "Athletics", count: 67 }
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <div style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              backgroundColor: "#7c3aed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "12px"
            }}>
              {item.count}
            </div>
            <p style={{ margin: "0", fontSize: "13px", color: "#333" }}>{item.sport}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
