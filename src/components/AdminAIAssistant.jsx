import { useState, useRef, useEffect } from "react";
import { getAllStudents, getStudentsByGrade } from "../services/studentService";
import { getAllAccounts } from "../services/accountService";

export default function AdminAIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "👋 Hello! I'm your School AI Assistant. I can help you with:\n• Total students & breakdown by grade\n• Payment statistics\n• Student performance & pass rates\n• Teacher information\n• Expense tracking\n\nWhat would you like to know?",
      time: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get school data
  const getSchoolData = () => {
    const students = getAllStudents();
    const accounts = getAllAccounts();
    const teachers = accounts.filter(a => a.role === "TEACHER");
    const payments = JSON.parse(localStorage.getItem("payments") || "[]");
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

    // Calculate statistics
    const gradeStats = {};
    students.forEach(student => {
      if (!gradeStats[student.grade]) {
        gradeStats[student.grade] = {
          total: 0,
          active: 0,
          passed: 0,
          failed: 0,
          avgScore: 0
        };
      }
      gradeStats[student.grade].total++;
      if (student.status === "Active") gradeStats[student.grade].active++;
      if (student.finalGrade >= "C" && student.finalGrade !== "-") {
        gradeStats[student.grade].passed++;
      } else if (student.finalGrade !== "-") {
        gradeStats[student.grade].failed++;
      }
    });

    const totalIncome = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    return {
      totalStudents: students.length,
      activeStudents: students.filter(s => s.status === "Active").length,
      gradeStats,
      teachers: teachers.length,
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      totalPayments: payments.length,
      totalExpenseRecords: expenses.length
    };
  };

  // Process user question and get AI response
  const getAIResponse = (question) => {
    const data = getSchoolData();
    const lowerQuestion = question.toLowerCase();

    // Total Students Queries
    if (lowerQuestion.includes("how many students") || lowerQuestion.includes("total students") || lowerQuestion.includes("number of students")) {
      return `📊 **School Enrollment Report**\n\n📌 Total Students: ${data.totalStudents}\n✅ Active Students: ${data.activeStudents}\n📚 Inactive Students: ${data.totalStudents - data.activeStudents}\n\n**By Grade:**\n${Object.entries(data.gradeStats).map(([grade, stats]) => `• ${grade}: ${stats.total} students (${stats.active} active)`).join('\n')}`;
    }

    // Grade-specific queries
    if (lowerQuestion.includes("grade 10a") || lowerQuestion.includes("10a")) {
      const gradeData = data.gradeStats["Grade 10A"];
      if (gradeData) {
        return `📚 **Grade 10A Report**\n\n👥 Total Students: ${gradeData.total}\n✅ Active: ${gradeData.active}\n📈 Passed: ${gradeData.passed}\n❌ Failed: ${gradeData.failed}\n📊 Pass Rate: ${((gradeData.passed / gradeData.total) * 100).toFixed(1)}%`;
      }
    }

    if (lowerQuestion.includes("grade 10b") || lowerQuestion.includes("10b")) {
      const gradeData = data.gradeStats["Grade 10B"];
      if (gradeData) {
        return `📚 **Grade 10B Report**\n\n👥 Total Students: ${gradeData.total}\n✅ Active: ${gradeData.active}\n📈 Passed: ${gradeData.passed}\n❌ Failed: ${gradeData.failed}\n📊 Pass Rate: ${((gradeData.passed / gradeData.total) * 100).toFixed(1)}%`;
      }
    }

    // Payment Queries
    if (lowerQuestion.includes("how much paid") || lowerQuestion.includes("total payment") || lowerQuestion.includes("total income")) {
      return `💵 **Financial Report**\n\n💰 Total Income: ZWL ${data.totalIncome.toLocaleString()}\n💸 Total Expenses: ZWL ${data.totalExpenses.toLocaleString()}\n💎 Balance: ZWL ${data.balance.toLocaleString()}\n📊 Number of Payments: ${data.totalPayments}`;
    }

    if (lowerQuestion.includes("payment today") || lowerQuestion.includes("today payment")) {
      return `📅 **Today's Payments**\n\n💰 Total collected today: ZWL 0\n📝 Number of payments: 0\n\n💡 Tip: Payments are tracked on Finance panel`;
    }

    // Teacher Queries
    if (lowerQuestion.includes("how many teachers") || lowerQuestion.includes("total teachers") || lowerQuestion.includes("number of teachers")) {
      return `👨‍🏫 **Teaching Staff Report**\n\n👥 Total Teachers: ${data.teachers}\n📚 Grades Covered: ${Object.keys(data.gradeStats).length}\n\nTeachers per Grade:\n${Object.entries(data.gradeStats).map(([grade]) => `• ${grade}: 1 teacher`).join('\n')}`;
    }

    // Pass Rate Queries
    if (lowerQuestion.includes("pass rate") || lowerQuestion.includes("performance") || lowerQuestion.includes("how many passed")) {
      const totalPassed = Object.values(data.gradeStats).reduce((sum, g) => sum + g.passed, 0);
      const totalStudentsWithGrades = Object.values(data.gradeStats).reduce((sum, g) => sum + (g.passed + g.failed), 0);
      const passRate = totalStudentsWithGrades > 0 ? ((totalPassed / totalStudentsWithGrades) * 100).toFixed(1) : "N/A";
      return `📈 **Performance Summary**\n\n📊 Overall Pass Rate: ${passRate}%\n✅ Total Passed: ${totalPassed}\n❌ Total Failed: ${Object.values(data.gradeStats).reduce((sum, g) => sum + g.failed, 0)}\n👥 Students with Grades: ${totalStudentsWithGrades}`;
    }

    // Finance Queries
    if (lowerQuestion.includes("finance") || lowerQuestion.includes("expense") || lowerQuestion.includes("money")) {
      return `💰 **Financial Overview**\n\n💵 Total Income: ZWL ${data.totalIncome.toLocaleString()}\n💸 Total Expenses: ZWL ${data.totalExpenses.toLocaleString()}\n💎 Net Balance: ZWL ${data.balance.toLocaleString()}\n📊 Profit Margin: ${data.totalIncome > 0 ? ((data.balance / data.totalIncome) * 100).toFixed(1) : 0}%`;
    }

    // Enrollment Status
    if (lowerQuestion.includes("enrollment") || lowerQuestion.includes("active students")) {
      return `📋 **Enrollment Status**\n\n👥 Total Enrolled: ${data.totalStudents}\n✅ Active Students: ${data.activeStudents}\n📍 Enrollment Rate: ${((data.activeStudents / data.totalStudents) * 100).toFixed(1)}%\n\n📚 Grade Distribution:\n${Object.entries(data.gradeStats).map(([grade, stats]) => `• ${grade}: ${stats.total} (${((stats.active/stats.total)*100).toFixed(0)}% active)`).join('\n')}`;
    }

    // Default response
    return `I can help you with:\n\n📊 Student queries: "How many students?", "Grade 10A report"\n💰 Finance queries: "How much paid?", "Total expenses?"\n👨‍🏫 Staff queries: "How many teachers?"\n📈 Performance: "What's the pass rate?"\n\nAsk me anything about your school's operations!`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
      time: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const aiMessage = {
        id: messages.length + 2,
        sender: "ai",
        text: aiResponse,
        time: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickQuestion = (question) => {
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: question,
      time: new Date()
    };

    setMessages([...messages, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(question);
      const aiMessage = {
        id: messages.length + 2,
        sender: "ai",
        text: aiResponse,
        time: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      height: "600px"
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#7c3aed",
        color: "white",
        padding: "15px 20px",
        fontWeight: "bold",
        fontSize: "15px"
      }}>
        🤖 AI Assistant - School Decision Maker
      </div>

      {/* Messages Container */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        backgroundColor: "#f9fafb"
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              marginBottom: "15px",
              display: "flex",
              justifyContent: message.sender === "user" ? "flex-end" : "flex-start"
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px 15px",
                borderRadius: "8px",
                backgroundColor: message.sender === "user" ? "#7c3aed" : "#e3f2fd",
                color: message.sender === "user" ? "white" : "#333",
                fontSize: "13px",
                lineHeight: "1.5",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word"
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "15px" }}>
            <div style={{
              padding: "12px 15px",
              borderRadius: "8px",
              backgroundColor: "#e3f2fd",
              color: "#333",
              fontSize: "13px"
            }}>
              ⏳ Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div style={{
        padding: "10px 20px",
        borderTop: "1px solid #eee",
        backgroundColor: "#f9fafb",
        maxHeight: "80px",
        overflowY: "auto"
      }}>
        <p style={{ margin: "0 0 8px 0", fontSize: "11px", fontWeight: "600", color: "#666" }}>Quick Questions:</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            "📊 How many students?",
            "💰 How much paid?",
            "📈 What's pass rate?",
            "👨‍🏫 How many teachers?"
          ].map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickQuestion(q)}
              disabled={isLoading}
              style={{
                padding: "6px 12px",
                backgroundColor: "#e3f2fd",
                color: "#1a73e8",
                border: "1px solid #90caf9",
                borderRadius: "4px",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontSize: "11px",
                fontWeight: "600",
                whiteSpace: "nowrap"
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        style={{
          padding: "15px 20px",
          borderTop: "1px solid #eee",
          display: "flex",
          gap: "10px"
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about students, payments, performance..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "13px",
            fontFamily: "inherit"
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: isLoading || !inputValue.trim() ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "13px"
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
