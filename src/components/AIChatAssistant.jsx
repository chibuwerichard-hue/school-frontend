// src/components/AIChatAssistant.jsx
import React, { useState, useEffect } from 'react';

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        text: "👋 Hello! I'm your AI School Assistant. You can ask me questions like:\n\n• How many students are enrolled?\n• What is the total fees collected?\n• How many teachers are active?\n• What is the attendance rate?\n• Show me financial summary\n• How many students are at risk of dropping out?\n• What is the pass rate?\n• Sports statistics?\n• Asset information?"
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
  
  const totalIncome = transactions
    .filter(t => t && t.type === 'Income' && t.status === 'Completed')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  
  const totalExpense = transactions
    .filter(t => t && t.type === 'Expense' && t.status === 'Completed')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  
  const balance = totalIncome - totalExpense;
  
  const totalAttendance = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(r => r && r.status === 'Present').length;
  const attendanceRate = totalAttendance > 0 ? ((presentCount / totalAttendance) * 100).toFixed(1) : 0;
  
  const activeSports = sports.filter(s => s && s.status === 'Active').length;
  const totalAssets = assets.length;
  
  // Dropout risk
  const atRiskStudents = students.filter(s => {
    const attendance = parseInt(s.attendance) || 0;
    return attendance < 75 || s.feeStatus === 'Overdue';
  }).length;
  const dropoutRate = totalStudents > 0 ? ((atRiskStudents / totalStudents) * 100).toFixed(1) : 0;
  
  // Academic performance
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
      return `⚠️ ${atRiskStudents} students (${dropoutRate}%) are at risk of dropping out due to low attendance (below 75%) or overdue fees.`;
    }
    
    if (lowerQuestion.includes('causes of dropout')) {
      return `📋 Main causes of dropout risk:\n• Low attendance (below 75%): ${students.filter(s => (parseInt(s.attendance) || 0) < 75).length} students\n• Overdue fee payments: ${students.filter(s => s && s.feeStatus === 'Overdue').length} students\n• Poor academic performance: ${studentPerformance.needsImprovement} students`;
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
      return `💵 Current balance: $${balance.toLocaleString()}\n• Status: ${balance >= 0 ? 'Positive' : 'Negative'}`;
    }
    
    if (lowerQuestion.includes('finance shortage') || lowerQuestion.includes('shortage')) {
      return `⚠️ Finance shortage causes:\n• Pending fees: $${unpaidFees.toLocaleString()}\n• High operational expenses\n• ${pendingTransactionsCount()} pending transactions`;
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
      return `📈 To improve attendance:\n• Target: 90% attendance\n• Current gap: ${(90 - parseFloat(attendanceRate)).toFixed(1)}%\n• Need ${Math.ceil(totalAttendance * 0.05)} more present students daily`;
    }
    
    // Academic performance
    if (lowerQuestion.includes('pass rate') || lowerQuestion.includes('performance') || lowerQuestion.includes('academic')) {
      return `📚 Academic Performance:\n• Pass rate: ${passRate}%\n• Excellent (90%+): ${studentPerformance.excellent} students\n• Good (75-89%): ${studentPerformance.good} students\n• Needs improvement: ${studentPerformance.needsImprovement} students`;
    }
    
    if (lowerQuestion.includes('grade performance')) {
      return getGradePerformance();
    }
    
    // Sports related
    if (lowerQuestion.includes('sports') || lowerQuestion.includes('active sports')) {
      return `⚽ Sports Statistics:\n• Total sports: ${sports.length}\n• Active sports: ${activeSports}\n• Total participants: ${sports.reduce((sum, s) => sum + (s.participants || 0), 0)}`;
    }
    
    // Assets related
    if (lowerQuestion.includes('assets') || lowerQuestion.includes('equipment')) {
      return `📦 Asset Management:\n• Total asset types: ${totalAssets}\n• Total items: ${assets.reduce((sum, a) => sum + (a.quantity || 0), 0)}\n• Items needing maintenance: ${assets.filter(a => a && (a.status === 'Maintenance' || a.condition === 'Needs Repair')).length}`;
    }
    
    // Projects related
    if (lowerQuestion.includes('projects') || lowerQuestion.includes('roi')) {
      return getProjectsInfo();
    }
    
    // Financial improvement
    if (lowerQuestion.includes('improve finance') || lowerQuestion.includes('finance improvement')) {
      return `💡 Recommendations to improve finance:\n1. Collect pending fees: $${unpaidFees.toLocaleString()}\n2. Reduce operational costs by 10%\n3. Launch new revenue streams\n4. Optimize resource utilization`;
    }
    
    // Student performance improvement
    if (lowerQuestion.includes('improve performance')) {
      return `🎯 Action plan to improve student performance:\n1. After-school tutoring for ${studentPerformance.needsImprovement} struggling students\n2. Parent-teacher meetings\n3. Regular assessments\n4. Mentorship program`;
    }
    
    // Summary / Report
    if (lowerQuestion.includes('summary') || lowerQuestion.includes('report') || lowerQuestion.includes('overview')) {
      return getSchoolSummary();
    }
    
    // Help
    if (lowerQuestion.includes('help') || lowerQuestion.includes('what can you do') || lowerQuestion.includes('questions')) {
      return getHelpMessage();
    }
    
    return "I'm not sure about that. You can ask me about:\n• Student enrollment and dropout rates\n• Financial status (income, expenses, fees)\n• Teacher statistics\n• Attendance rates\n• Academic performance\n• Sports and assets\n• Projects and ROI\n• Type 'help' for more options";
  };
  
  const pendingTransactionsCount = () => {
    return transactions.filter(t => t && t.status === 'Pending').length;
  };
  
  const getGradePerformance = () => {
    const grades = ['9th', '10th', '11th', '12th'];
    let response = "📊 Grade-wise Performance:\n";
    grades.forEach(grade => {
      const gradeStudents = students.filter(s => s && s.grade === grade);
      const avgAttendance = gradeStudents.length > 0 
        ? (gradeStudents.reduce((sum, s) => sum + (parseInt(s.attendance) || 0), 0) / gradeStudents.length).toFixed(1)
        : 0;
      response += `• ${grade} Grade: ${avgAttendance}% attendance (${gradeStudents.length} students)\n`;
    });
    return response;
  };
  
  const getProjectsInfo = () => {
    const projects = [
      { name: 'Science Lab Upgrade', status: 'In Progress', roi: 0 },
      { name: 'Sports Complex', status: 'Completed', roi: 20 },
      { name: 'Computer Lab Expansion', status: 'Planning', roi: 0 },
      { name: 'Library Digitalization', status: 'In Progress', roi: 16.7 }
    ];
    
    let response = "🏗️ School Projects:\n";
    projects.forEach(project => {
      response += `• ${project.name}: ${project.status} (ROI: ${project.roi > 0 ? project.roi + '%' : 'Pending'})\n`;
    });
    response += `\nTotal project investment: $180,000\nTotal returns: $20,000\nOverall ROI: 11.1%`;
    return response;
  };
  
  const getSchoolSummary = () => {
    return `📋 SCHOOL SUMMARY REPORT
━━━━━━━━━━━━━━━━━━━━━━━

👨‍🎓 STUDENTS:
• Total: ${totalStudents}
• At-risk: ${atRiskStudents} (${dropoutRate}%)
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
• Absent: ${totalAttendance - presentCount}

⚽ SPORTS:
• Active sports: ${activeSports}
• Total participants: ${sports.reduce((sum, s) => sum + (s.participants || 0), 0)}

📦 ASSETS:
• Types: ${totalAssets}
• Total items: ${assets.reduce((sum, a) => sum + (a.quantity || 0), 0)}

━━━━━━━━━━━━━━━━━━━━━━━
Type "help" for questions I can answer`;
  };
  
  const getHelpMessage = () => {
    return `🤖 I can answer questions like:

📊 STUDENTS:
• "How many students are enrolled?"
• "How many students are at risk of dropping out?"
• "What causes dropout?"
• "What is the pass rate?"
• "Show grade performance"

💰 FINANCE:
• "How much fees have been paid?"
• "What is total income?"
• "What are total expenses?"
• "What is the balance?"
• "What causes finance shortage?"
• "How to improve finance?"

👩‍🏫 TEACHERS:
• "How many teachers are there?"
• "How many active teachers?"

📋 ATTENDANCE:
• "What is attendance rate?"
• "How to improve attendance?"

⚽ SPORTS & ASSETS:
• "Sports statistics"
• "Asset information"

📈 REPORTS:
• "Show me school summary"
• "Give me a full report"
• "Performance overview"`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Process and add bot response after delay
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

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#8b5cf6',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        🤖
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '400px',
          height: '600px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#8b5cf6',
            color: 'white',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>🤖 AI School Assistant</strong>
              <p style={{ fontSize: '11px', margin: '5px 0 0', opacity: 0.9 }}>Ask me anything about your school</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
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
                  maxWidth: '80%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  backgroundColor: message.type === 'user' ? '#8b5cf6' : '#f3f4f6',
                  color: message.type === 'user' ? 'white' : '#333',
                  whiteSpace: 'pre-line',
                  fontSize: '14px'
                }}>
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  backgroundColor: '#f3f4f6',
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

          {/* Input */}
          <div style={{
            padding: '15px',
            borderTop: '1px solid #e5e7eb',
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
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '10px 20px',
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
        </div>
      )}

      {/* Add animation keyframes */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default AIChatAssistant;