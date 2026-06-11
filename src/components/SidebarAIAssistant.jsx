// src/components/SidebarAIAssistant.jsx
import React, { useState, useEffect } from 'react';

const SidebarAIAssistant = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Data state
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [sports, setSports] = useState([]);
  const [assets, setAssets] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const savedStudents = localStorage.getItem('students');
      const savedTeachers = localStorage.getItem('teachers');
      const savedTransactions = localStorage.getItem('transactions');
      const savedAttendance = localStorage.getItem('attendance');
      const savedSports = localStorage.getItem('sports');
      const savedAssets = localStorage.getItem('assets');
      
      if (savedStudents) setStudents(JSON.parse(savedStudents));
      if (savedTeachers) setTeachers(JSON.parse(savedTeachers));
      if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
      if (savedAttendance) setAttendanceRecords(JSON.parse(savedAttendance));
      if (savedSports) setSports(JSON.parse(savedSports));
      if (savedAssets) setAssets(JSON.parse(savedAssets));
    };
    
    loadData();
    
    // Add welcome message
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: "👋 Hello! I'm your AI School Assistant. I can help you with:\n\n📊 Student Statistics\n💰 Financial Data\n📋 Attendance Reports\n👩‍🏫 Teacher Information\n⚽ Sports & Assets\n\nAsk me anything!"
      }
    ]);
  }, []);

  // Calculate statistics
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(t => t && t.status === 'Active').length;
  
  const unpaidFees = transactions
    .filter(t => t && t.type === 'Income' && t.status === 'Pending')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  
  const totalAttendance = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(r => r && r.status === 'Present').length;
  const attendanceRate = totalAttendance > 0 ? ((presentCount / totalAttendance) * 100).toFixed(1) : 0;
  
  const totalIncome = transactions
    .filter(t => t && t.type === 'Income' && t.status === 'Completed')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  
  const totalExpense = transactions
    .filter(t => t && t.type === 'Expense' && t.status === 'Completed')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  
  const balance = totalIncome - totalExpense;
  
  const activeSports = sports.filter(s => s && s.status === 'Active').length;
  const totalAssets = assets.length;
  
  const atRiskStudents = students.filter(s => {
    const attendance = parseInt(s.attendance) || 0;
    return attendance < 75 || s.feeStatus === 'Overdue';
  }).length;
  
  const studentPerformance = {
    excellent: students.filter(s => (parseInt(s.attendance) || 0) >= 90).length,
    good: students.filter(s => {
      const attendance = parseInt(s.attendance) || 0;
      return attendance >= 75 && attendance < 90;
    }).length,
    needsImprovement: students.filter(s => (parseInt(s.attendance) || 0) < 60).length
  };
  
  const passRate = totalStudents > 0 ? (((studentPerformance.excellent + studentPerformance.good) / totalStudents) * 100).toFixed(1) : 0;
  const collectedFees = transactions.filter(t => t && t.type === 'Income' && t.status === 'Completed').reduce((sum, t) => sum + (t.amount || 0), 0);
  const feeCollectionRate = totalIncome > 0 ? ((collectedFees / totalIncome) * 100).toFixed(1) : 0;

  // Process user questions
  const processQuestion = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Student related questions
    if (lowerQuestion.includes('how many students') || lowerQuestion.includes('total students') || lowerQuestion.includes('student count')) {
      return `📊 There are currently ${totalStudents} students enrolled in the school.`;
    }
    
    if (lowerQuestion.includes('dropout') || lowerQuestion.includes('at risk')) {
      const riskPercent = totalStudents > 0 ? ((atRiskStudents / totalStudents) * 100).toFixed(1) : 0;
      return `⚠️ ${atRiskStudents} students (${riskPercent}%) are at risk of dropping out due to low attendance (below 75%) or overdue fees.`;
    }
    
    if (lowerQuestion.includes('causes of dropout')) {
      const lowAttendance = students.filter(s => (parseInt(s.attendance) || 0) < 75).length;
      const overdueFees = students.filter(s => s && s.feeStatus === 'Overdue').length;
      return `📋 Main causes of dropout risk:\n• Low attendance (below 75%): ${lowAttendance} students\n• Overdue fee payments: ${overdueFees} students\n• Poor academic performance: ${studentPerformance.needsImprovement} students`;
    }
    
    // Financial related questions
    if (lowerQuestion.includes('fees paid') || lowerQuestion.includes('total fees collected') || lowerQuestion.includes('income')) {
      return `💰 Total fees collected: $${collectedFees.toLocaleString()}\n• Collection rate: ${feeCollectionRate}%\n• Pending fees: $${unpaidFees.toLocaleString()}`;
    }
    
    if (lowerQuestion.includes('total income')) {
      return `💰 Total income: $${totalIncome.toLocaleString()}`;
    }
    
    if (lowerQuestion.includes('total expenses') || lowerQuestion.includes('expenses')) {
      return `💸 Total expenses: $${totalExpense.toLocaleString()}`;
    }
    
    if (lowerQuestion.includes('balance') || lowerQuestion.includes('financial health')) {
      return `💵 Current balance: $${balance.toLocaleString()}\n• Status: ${balance >= 0 ? 'Positive ✅' : 'Negative ⚠️'}`;
    }
    
    if (lowerQuestion.includes('finance shortage') || lowerQuestion.includes('shortage')) {
      const pendingCount = transactions.filter(t => t && t.status === 'Pending').length;
      return `⚠️ Finance shortage causes:\n• Pending fees: $${unpaidFees.toLocaleString()}\n• High operational expenses\n• ${pendingCount} pending transactions`;
    }
    
    // Teacher related questions
    if (lowerQuestion.includes('how many teachers') || lowerQuestion.includes('total teachers')) {
      return `👩‍🏫 Total teachers: ${totalTeachers}\n• Active teachers: ${activeTeachers}\n• Teachers on leave: ${totalTeachers - activeTeachers}`;
    }
    
    // Attendance related questions
    if (lowerQuestion.includes('attendance rate') || lowerQuestion.includes('attendance percentage')) {
      return `📋 Current attendance rate: ${attendanceRate}%\n• Present: ${presentCount}\n• Absent: ${totalAttendance - presentCount}`;
    }
    
    if (lowerQuestion.includes('improve attendance')) {
      const gap = (90 - parseFloat(attendanceRate)).toFixed(1);
      const needed = Math.ceil(totalAttendance * 0.05);
      return `📈 To improve attendance:\n• Target: 90% attendance\n• Current gap: ${gap}%\n• Need ${needed} more present students daily`;
    }
    
    // Academic performance
    if (lowerQuestion.includes('pass rate') || lowerQuestion.includes('performance') || lowerQuestion.includes('academic')) {
      return `📚 Academic Performance:\n• Pass rate: ${passRate}%\n• Excellent (90%+): ${studentPerformance.excellent} students\n• Good (75-89%): ${studentPerformance.good} students\n• Needs improvement: ${studentPerformance.needsImprovement} students`;
    }
    
    // Sports related
    if (lowerQuestion.includes('sports') || lowerQuestion.includes('active sports')) {
      const totalParticipants = sports.reduce((sum, s) => sum + (s.participants || 0), 0);
      return `⚽ Sports Statistics:\n• Total sports: ${sports.length}\n• Active sports: ${activeSports}\n• Total participants: ${totalParticipants}`;
    }
    
    // Assets related
    if (lowerQuestion.includes('assets') || lowerQuestion.includes('equipment')) {
      const totalItems = assets.reduce((sum, a) => sum + (a.quantity || 0), 0);
      const maintenanceItems = assets.filter(a => a && (a.status === 'Maintenance' || a.condition === 'Needs Repair')).length;
      return `📦 Asset Management:\n• Total asset types: ${totalAssets}\n• Total items: ${totalItems}\n• Items needing maintenance: ${maintenanceItems}`;
    }
    
    // Summary / Report
    if (lowerQuestion.includes('summary') || lowerQuestion.includes('report') || lowerQuestion.includes('overview')) {
      const totalItems = assets.reduce((sum, a) => sum + (a.quantity || 0), 0);
      return `📋 SCHOOL SUMMARY REPORT
━━━━━━━━━━━━━━━━━━━━━━━

👨‍🎓 STUDENTS:
• Total: ${totalStudents}
• At-risk: ${atRiskStudents}
• Pass rate: ${passRate}%

👩‍🏫 TEACHERS:
• Total: ${totalTeachers}
• Active: ${activeTeachers}

💰 FINANCE:
• Income: $${totalIncome.toLocaleString()}
• Expenses: $${totalExpense.toLocaleString()}
• Balance: $${balance.toLocaleString()}
• Pending fees: $${unpaidFees.toLocaleString()}

📋 ATTENDANCE:
• Rate: ${attendanceRate}%
• Present: ${presentCount}

⚽ SPORTS:
• Active sports: ${activeSports}

📦 ASSETS:
• Types: ${totalAssets}
• Total items: ${totalItems}

━━━━━━━━━━━━━━━━━━━━━━━`;
    }
    
    // Help
    if (lowerQuestion.includes('help') || lowerQuestion.includes('what can you do')) {
      return `🤖 I can answer questions like:

📊 STUDENTS:
• "How many students?"
• "Dropout risk?"
• "Pass rate?"

💰 FINANCE:
• "Fees collected?"
• "Total income?"
• "Balance?"

👩‍🏫 TEACHERS:
• "How many teachers?"

📋 ATTENDANCE:
• "Attendance rate?"

⚽ OTHER:
• "Sports statistics"
• "Asset information"
• "Full summary"`;
    }
    
    return "I'm not sure about that. Try asking about:\n• Student statistics\n• Financial data\n• Attendance rates\n• Teacher information\n• Sports and assets\n• Type 'help' for options";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = processQuestion(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: response
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      type: 'bot',
      text: "👋 Hello! I'm your AI School Assistant. I can help you with:\n\n📊 Student Statistics\n💰 Financial Data\n📋 Attendance Reports\n👩‍🏫 Teacher Information\n⚽ Sports & Assets\n\nAsk me anything!"
    }]);
  };

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: isOpen ? '320px' : '60px',
      height: '100vh',
      backgroundColor: '#1e1e2d',
      color: 'white',
      transition: 'width 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      
      {/* Sidebar Header / Toggle Button */}
      <div style={{
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isOpen ? 'space-between' : 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer'
      }}>
        {isOpen ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>🤖</span>
              <div>
                <strong>AI Assistant</strong>
                <p style={{ fontSize: '11px', margin: 0, opacity: 0.7 }}>Always ready to help</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ◀
            </button>
          </>
        ) : (
          <button
            onClick={onToggle}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              writingMode: 'vertical-rl',
              padding: '10px 0'
            }}
          >
            🤖 AI
          </button>
        )}
      </div>

      {isOpen && (
        <>
          {/* Quick Actions */}
          <div style={{
            padding: '15px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <button
              onClick={() => {
                setInputMessage('How many students?');
                handleSendMessage();
              }}
              style={{
                padding: '5px 10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '15px',
                color: 'white',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              📊 Students
            </button>
            <button
              onClick={() => {
                setInputMessage('How much fees collected?');
                handleSendMessage();
              }}
              style={{
                padding: '5px 10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '15px',
                color: 'white',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              💰 Fees
            </button>
            <button
              onClick={() => {
                setInputMessage('Attendance rate?');
                handleSendMessage();
              }}
              style={{
                padding: '5px 10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '15px',
                color: 'white',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              📋 Attendance
            </button>
            <button
              onClick={() => {
                setInputMessage('Show me full summary');
                handleSendMessage();
              }}
              style={{
                padding: '5px 10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '15px',
                color: 'white',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              📈 Summary
            </button>
            <button
              onClick={clearChat}
              style={{
                padding: '5px 10px',
                backgroundColor: 'rgba(239,68,68,0.3)',
                border: 'none',
                borderRadius: '15px',
                color: 'white',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              🗑️ Clear
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  backgroundColor: message.type === 'user' ? '#8b5cf6' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  whiteSpace: 'pre-line',
                  fontSize: '13px',
                  wordBreak: 'break-word'
                }}>
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  padding: '10px 15px',
                  borderRadius: '12px',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <span style={{ animation: 'pulse 1.5s infinite' }}>●</span>
                  <span style={{ animation: 'pulse 1.5s infinite 0.2s' }}>●</span>
                  <span style={{ animation: 'pulse 1.5s infinite 0.4s' }}>●</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div style={{
            padding: '15px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            gap: '10px'
          }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                outline: 'none',
                fontSize: '13px'
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '10px 15px',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </div>

          {/* Status Indicator */}
          <div style={{
            padding: '8px 15px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: '10px',
            opacity: 0.6,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block'
            }}></span>
            AI Assistant Online • Real-time Data
          </div>
        </>
      )}
      
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          
          ::-webkit-scrollbar {
            width: 5px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.1);
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.3);
            border-radius: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default SidebarAIAssistant;