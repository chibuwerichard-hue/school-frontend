import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you with school management today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [aiPredictions, setAiPredictions] = useState({
    passRatePrediction: "85%",
    dropoutRisk: "12%",
    budgetForecast: "$45,000",
    sportsRecommendation: "Football team needs more resources"
  });
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      const [usersRes] = await Promise.all([
        axios.get('http://localhost:8080/api/admin/users', config),
      ]);
      setUsers(usersRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleAIChat = () => {
    setShowAIChat(!showAIChat);
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { role: 'user', content: chatInput };
    setChatMessages([...chatMessages, userMessage]);
    setChatInput('');
    
    // Simulate AI response based on user input
    setTimeout(() => {
      let aiResponse = '';
      const input = chatInput.toLowerCase();
      
      if (input.includes('pass rate') || input.includes('performance')) {
        aiResponse = `📊 Based on current data, the predicted pass rate is ${aiPredictions.passRatePrediction}. Students in Grade 10 are showing improvement of 12% this semester.`;
      } else if (input.includes('dropout') || input.includes('risk')) {
        aiResponse = `⚠️ The current dropout risk is ${aiPredictions.dropoutRisk}. 3 students have been identified as high risk. Recommendation: Schedule parent-teacher meetings.`;
      } else if (input.includes('budget') || input.includes('finance')) {
        aiResponse = `💰 The budget forecast for next quarter is ${aiPredictions.budgetForecast}. Expenses are 15% lower than projected.`;
      } else if (input.includes('sports') || input.includes('team')) {
        aiResponse = `⚽ ${aiPredictions.sportsRecommendation}. The basketball team has a 78% win rate this season.`;
      } else if (input.includes('student') || input.includes('enrollment')) {
        aiResponse = `👨‍🎓 Total enrollment is ${users.length} users. Student population has grown 8% compared to last year.`;
      } else if (input.includes('teacher')) {
        aiResponse = `👨‍🏫 You have ${users.filter(u => u.role === 'TEACHER').length} teachers currently active. Average teacher satisfaction is 4.6/5.`;
      } else {
        aiResponse = `I can help you with information about:\n- Student performance & pass rates\n- Dropout risk analysis\n- Budget forecasting\n- Sports team recommendations\n- Enrollment statistics\n\nWhat would you like to know?`;
      }
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    }, 1000);
  };

  // Revenue data for chart
  const revenueData = [65000, 72000, 81000, 78000, 92000, 88000, 95000];
  const days = ['Jun 03', 'Jun 04', 'Jun 05', 'Jun 06', 'Jun 07', 'Jun 08', 'Jun 09'];
  const maxRevenue = Math.max(...revenueData);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-gradient-to-b from-blue-900 to-indigo-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            {sidebarOpen && <span className="text-xl font-bold">School Management</span>}
          </div>
        </div>

        {/* AI Chat Button - Prominently placed */}
        <div className="px-4 py-4">
          <button
            onClick={handleAIChat}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all ${showAIChat ? 'bg-blue-600 shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            </div>
            {sidebarOpen && (
              <div className="ml-3 flex-1 text-left">
                <p className="font-semibold">AI Assistant</p>
                <p className="text-xs text-blue-300">Ask me anything!</p>
              </div>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {/* Dashboard */}
          <button onClick={() => { setActiveMenu('dashboard'); setShowAIChat(false); }} className={`w-full flex items-center px-6 py-3 text-left transition ${activeMenu === 'dashboard' && !showAIChat ? 'bg-white/20 border-l-4 border-white' : 'hover:bg-white/10'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </button>

          {/* Academic Operations */}
          <div className="px-6 mt-6 mb-2">
            {sidebarOpen && <p className="text-xs text-blue-300 uppercase tracking-wider">Academic Operations</p>}
          </div>
          <button onClick={() => { setActiveMenu('students'); setShowAIChat(false); }} className="w-full flex items-center px-6 py-3 text-left hover:bg-white/10 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {sidebarOpen && <span className="ml-3">Students</span>}
          </button>
          <button onClick={() => { setActiveMenu('teachers'); setShowAIChat(false); }} className="w-full flex items-center px-6 py-3 text-left hover:bg-white/10 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {sidebarOpen && <span className="ml-3">Teachers</span>}
          </button>

          {/* Finance & Assets */}
          <div className="px-6 mt-6 mb-2">
            {sidebarOpen && <p className="text-xs text-blue-300 uppercase tracking-wider">Finance & Assets</p>}
          </div>
          <button onClick={() => { setActiveMenu('finance'); setShowAIChat(false); }} className="w-full flex items-center px-6 py-3 text-left hover:bg-white/10 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {sidebarOpen && <span className="ml-3">Finance</span>}
          </button>
          <button onClick={() => { setActiveMenu('assets'); setShowAIChat(false); }} className="w-full flex items-center px-6 py-3 text-left hover:bg-white/10 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {sidebarOpen && <span className="ml-3">Assets</span>}
          </button>

          {/* Sports */}
          <div className="px-6 mt-6 mb-2">
            {sidebarOpen && <p className="text-xs text-blue-300 uppercase tracking-wider">Sports</p>}
          </div>
          <button onClick={() => { setActiveMenu('sports'); setShowAIChat(false); }} className="w-full flex items-center px-6 py-3 text-left hover:bg-white/10 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {sidebarOpen && <span className="ml-3">Sports Events</span>}
          </button>

          {/* Reports & Analytics */}
          <div className="px-6 mt-6 mb-2">
            {sidebarOpen && <p className="text-xs text-blue-300 uppercase tracking-wider">Reports & Analytics</p>}
          </div>
          <button onClick={() => { setActiveMenu('reports'); setShowAIChat(false); }} className="w-full flex items-center px-6 py-3 text-left hover:bg-white/10 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {sidebarOpen && <span className="ml-3">Reports</span>}
          </button>

          {/* Users */}
          <div className="px-6 mt-6 mb-2">
            {sidebarOpen && <p className="text-xs text-blue-300 uppercase tracking-wider">User Management</p>}
          </div>
          <button onClick={() => { setActiveMenu('users'); setShowAIChat(false); }} className="w-full flex items-center px-6 py-3 text-left hover:bg-white/10 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {sidebarOpen && <span className="ml-3">Users</span>}
          </button>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">A</span>
            </div>
            {sidebarOpen && (
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium truncate">{user.email || 'Admin'}</p>
                <p className="text-xs text-blue-300">Administrator</p>
              </div>
            )}
            <button onClick={handleLogout} className="text-white/70 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            {showAIChat ? 'AI Assistant Chat' : 'Admin Dashboard'}
          </h1>
          <div className="w-10"></div>
        </div>

        <div className="p-6">
          {showAIChat ? (
            // AI Chat Interface
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-120px)] flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl rounded-lg p-3 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <div className="flex items-center mb-1">
                        {msg.role === 'assistant' && (
                          <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        )}
                        <span className="text-xs font-semibold">{msg.role === 'user' ? 'You' : 'AI Assistant'}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {chatMessages.length === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <button onClick={() => setChatInput('What is the current pass rate?')} className="text-left p-3 border rounded-lg hover:bg-gray-50 transition">
                      <p className="font-semibold text-sm">📊 Pass Rate</p>
                      <p className="text-xs text-gray-500">Check current student pass rate</p>
                    </button>
                    <button onClick={() => setChatInput('Show me dropout risk analysis')} className="text-left p-3 border rounded-lg hover:bg-gray-50 transition">
                      <p className="font-semibold text-sm">⚠️ Dropout Risk</p>
                      <p className="text-xs text-gray-500">Analyze student dropout risk</p>
                    </button>
                    <button onClick={() => setChatInput('What is the budget forecast?')} className="text-left p-3 border rounded-lg hover:bg-gray-50 transition">
                      <p className="font-semibold text-sm">💰 Budget Forecast</p>
                      <p className="text-xs text-gray-500">Financial projections</p>
                    </button>
                    <button onClick={() => setChatInput('Sports team recommendations')} className="text-left p-3 border rounded-lg hover:bg-gray-50 transition">
                      <p className="font-semibold text-sm">⚽ Sports</p>
                      <p className="text-xs text-gray-500">Get AI sports recommendations</p>
                    </button>
                  </div>
                )}
              </div>
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Ask me anything about school management..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={sendChatMessage} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Send
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">AI Assistant can help with student performance, finances, sports, and more!</p>
              </div>
            </div>
          ) : (
            <>
              {/* Welcome Section */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500">Welcome back! 👋</p>
              </div>

              {/* AI Insights Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4">
                  <div className="text-sm opacity-90">📊 AI Predict: Pass Rate</div>
                  <div className="text-2xl font-bold">{aiPredictions.passRatePrediction}</div>
                  <div className="text-xs mt-1">↑ 5% from last semester</div>
                </div>
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">
                  <div className="text-sm opacity-90">⚠️ AI Alert: Dropout Risk</div>
                  <div className="text-2xl font-bold">{aiPredictions.dropoutRisk}</div>
                  <div className="text-xs mt-1">Intervention recommended</div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4">
                  <div className="text-sm opacity-90">💰 AI Forecast: Budget</div>
                  <div className="text-2xl font-bold">{aiPredictions.budgetForecast}</div>
                  <div className="text-xs mt-1">Next quarter projection</div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4">
                  <div className="text-sm opacity-90">⚽ AI Sports Recommendation</div>
                  <div className="text-sm font-bold truncate">{aiPredictions.sportsRecommendation}</div>
                  <div className="text-xs mt-1">Optimized allocation</div>
                </div>
              </div>

              {/* Revenue Chart Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview (Last 7 Days)</h3>
                <div className="h-64">
                  <div className="flex items-end justify-between space-x-2 h-48">
                    {revenueData.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600" style={{ height: `${(value / maxRevenue) * 100}%`, minHeight: '4px' }}></div>
                        <div className="text-xs text-gray-500 mt-2">{days[index]}</div>
                        <div className="text-xs font-semibold text-gray-700">${(value / 1000).toFixed(0)}K</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Booking Status Distribution */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Distribution</h3>
                  <div className="space-y-4">
                    <div><div className="flex justify-between text-sm mb-1"><span>Active Students</span><span className="font-semibold">75%</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div></div></div>
                    <div><div className="flex justify-between text-sm mb-1"><span>Pending Applications</span><span className="font-semibold">15%</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div></div></div>
                    <div><div className="flex justify-between text-sm mb-1"><span>Inactive</span><span className="font-semibold">10%</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div></div></div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Users</h3>
                  {users.length === 0 ? <p className="text-gray-500 text-center py-8">No recent users</p> : (
                    <div className="space-y-3">
                      {users.slice(0, 3).map(u => (
                        <div key={u.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div><p className="font-medium text-gray-800">{u.email}</p><p className="text-xs text-gray-500">{u.role}</p></div>
                          <span className="text-xs text-green-600">Active</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;