import { useState, useRef, useEffect } from "react";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "👋 Hi! I'm your School Management AI. Ask me about fees, dropouts, pass rates, or assets!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { type: "user", text: userMessage }]);
    setLoading(true);

    try {
      // Simulate AI response with predefined answers
      let botResponse = "I'm here to help! ";
      
      if (userMessage.toLowerCase().includes("fee")) {
        botResponse = "📊 Fee Collection Status: 75% collected (ZWL 450,000 out of ZWL 600,000). Outstanding fees: ZWL 150,000. Follow up needed for 20+ students.";
      } else if (userMessage.toLowerCase().includes("dropout")) {
        botResponse = "📉 Dropout Analysis: Main causes - Financial issues (45%), Family issues (22%), Poor performance (15%), Illness (18%). Recommend financial assistance program.";
      } else if (userMessage.toLowerCase().includes("pass rate")) {
        botResponse = "📈 Pass Rate Analysis: Grade 10: 85%, Grade 11: 82%, Grade 12: 90%. Overall: 85%. Trend: +3% improvement from last term. Well done!";
      } else if (userMessage.toLowerCase().includes("asset")) {
        botResponse = "🏢 Asset Summary: Total 245 assets. Good condition: 189 (77%), Needs repair: 42 (17%), Depreciated: 14 (6%). Total value: ZWL 1.2M. Key purchases: IT Equipment (34), Furniture (28).";
      } else if (userMessage.toLowerCase().includes("sport")) {
        botResponse = "⚽ Sports Participation: Football: 45 students, Basketball: 32, Netball: 28, Athletics: 67. Total: 172 students (68% participation). Excellent engagement!";
      } else if (userMessage.toLowerCase().includes("improve")) {
        botResponse = "💡 Recommendations: 1) Implement scholarship program for financial cases, 2) Extra tuition for struggling students, 3) Incentivize sports participation, 4) Regular asset maintenance schedule.";
      } else {
        botResponse = "That's a good question! I can help with: fees, dropouts, pass rates, assets, sports, or improvements. Ask me anything!";
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { type: "bot", text: botResponse }]);
        setLoading(false);
      }, 800);
    } catch (err) {
      setMessages(prev => [...prev, { type: "bot", text: "❌ Error processing request" }]);
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: "100%",
      height: "600px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      <div style={{ padding: "15px", borderBottom: "1px solid #eee", backgroundColor: "#7c3aed" }}>
        <h3 style={{ margin: "0", color: "white", fontSize: "16px" }}>🤖 AI Management Assistant</h3>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%",
            backgroundColor: msg.type === "user" ? "#7c3aed" : "#f0f0f0",
            color: msg.type === "user" ? "white" : "#333",
            padding: "12px 15px",
            borderRadius: "8px",
            wordWrap: "break-word",
            fontSize: "13px",
            lineHeight: "1.5"
          }}>
            {msg.text}
          </div>
        ))}
        {loading && <div style={{ color: "#999", fontSize: "12px" }}>⏳ Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: "12px", borderTop: "1px solid #eee", display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about fees, dropouts..."
          style={{
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "12px",
            fontFamily: "inherit"
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            padding: "8px 16px",
            backgroundColor: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "12px"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
