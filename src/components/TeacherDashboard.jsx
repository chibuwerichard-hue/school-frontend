import React, { useState } from 'react';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newScore, setNewScore] = useState({ subject: '', score: '' });
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [students] = useState([
    { id: 1, name: 'Alice Johnson', class: 'Grade 10A', scores: { Math: 85, Science: 88, English: 92 }, attendance: 95, passRate: 100 },
    { id: 2, name: 'Bob Smith', class: 'Grade 10A', scores: { Math: 72, Science: 68, English: 75 }, attendance: 88, passRate: 67 },
    { id: 3, name: 'Charlie Brown', class: 'Grade 10B', scores: { Math: 45, Science: 50, English: 48 }, attendance: 70, passRate: 33 },
    { id: 4, name: 'Diana Prince', class: 'Grade 10B', scores: { Math: 92, Science: 95, English: 90 }, attendance: 98, passRate: 100 },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const addScore = (studentId) => {
    alert(`Score added for student ${studentId}: ${newScore.subject} - ${newScore.score}`);
    setNewScore({ subject: '', score: '' });
    setSelectedStudent(null);
  };

  const classAverage = (students.reduce((sum, s) => {
    const avg = Object.values(s.scores).reduce((a,b) => a+b, 0) / Object.values(s.scores).length;
    return sum + avg;
  }, 0) / students.length).toFixed(1);

  const passRate = (students.filter(s => s.passRate >= 50).length / students.length * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 text-white p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div><h1 className="text-3xl font-bold">👨‍🏫 Teacher Dashboard</h1><p className="text-green-200">Welcome back, {user.email}</p></div>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">Logout</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6"><div className="text-green-600 text-2xl mb-2">👨‍🎓</div><div className="text-2xl font-bold">{students.length}</div><div className="text-gray-600">My Students</div></div>
          <div className="bg-white rounded-lg shadow p-6"><div className="text-yellow-600 text-2xl mb-2">📊</div><div className="text-2xl font-bold">{classAverage}%</div><div className="text-gray-600">Class Average</div></div>
          <div className="bg-white rounded-lg shadow p-6"><div className="text-blue-600 text-2xl mb-2">📈</div><div className="text-2xl font-bold">{passRate}%</div><div className="text-gray-600">Pass Rate</div></div>
          <div className="bg-white rounded-lg shadow p-6"><div className="text-purple-600 text-2xl mb-2">✅</div><div className="text-2xl font-bold">87%</div><div className="text-gray-600">Attendance Rate</div></div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b"><div className="flex">
            <button onClick={() => setActiveTab('students')} className={`px-6 py-3 font-semibold ${activeTab === 'students' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}>My Students</button>
            <button onClick={() => setActiveTab('scores')} className={`px-6 py-3 font-semibold ${activeTab === 'scores' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}>Manage Scores</button>
            <button onClick={() => setActiveTab('performance')} className={`px-6 py-3 font-semibold ${activeTab === 'performance' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}>Performance Analytics</button>
          </div></div>

          <div className="p-6">
            {activeTab === 'students' && (
              <div>
                <h2 className="text-xl font-bold mb-4">My Students</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map(s => (
                    <div key={s.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                      <h3 className="font-bold text-lg">{s.name}</h3>
                      <p className="text-gray-600">Class: {s.class}</p>
                      <p className="text-sm">📊 Average: {(Object.values(s.scores).reduce((a,b)=>a+b,0)/3).toFixed(1)}%</p>
                      <p className="text-sm">✅ Attendance: {s.attendance}%</p>
                      <p className="text-sm">📈 Pass Rate: {s.passRate}%</p>
                      <button onClick={() => setSelectedStudent(s)} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">View Details</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'scores' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Add/Edit Student Scores</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50"><tr><th className="px-4 py-2">Student</th><th className="px-4 py-2">Math</th><th className="px-4 py-2">Science</th><th className="px-4 py-2">English</th><th className="px-4 py-2">Average</th><th className="px-4 py-2">Action</th></tr></thead>
                    <tbody>
                      {students.map(s => {
                        const avg = (Object.values(s.scores).reduce((a,b)=>a+b,0)/3).toFixed(1);
                        return (<tr key={s.id} className="border-t"><td className="px-4 py-2">{s.name}</td><td className="px-4 py-2">{s.scores.Math}</td><td className="px-4 py-2">{s.scores.Science}</td><td className="px-4 py-2">{s.scores.English}</td><td className="px-4 py-2 font-bold">{avg}%</td><td className="px-4 py-2"><button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Edit Scores</button></td></tr>);
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Performance Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-3">🏆 Top Performers</h3>
                    {students.sort((a,b) => (Object.values(b.scores).reduce((x,y)=>x+y,0)/3) - (Object.values(a.scores).reduce((x,y)=>x+y,0)/3)).slice(0,3).map(s => (
                      <div key={s.id} className="flex justify-between py-2 border-b"><span>{s.name}</span><span className="text-green-600 font-bold">{Object.values(s.scores).reduce((a,b)=>a+b,0)/3}%</span></div>
                    ))}
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-3">⚠️ Needs Improvement</h3>
                    {students.sort((a,b) => (Object.values(a.scores).reduce((x,y)=>x+y,0)/3) - (Object.values(b.scores).reduce((x,y)=>x+y,0)/3)).slice(0,3).map(s => (
                      <div key={s.id} className="flex justify-between py-2 border-b"><span>{s.name}</span><span className="text-red-600 font-bold">{Object.values(s.scores).reduce((a,b)=>a+b,0)/3}%</span></div>
                    ))}
                  </div>
                  <div className="border rounded-lg p-4 col-span-2">
                    <h3 className="font-bold mb-3">📊 Class Performance Summary</h3>
                    <p>Total Students: {students.length}</p>
                    <p>Passing Students: {students.filter(s => s.passRate >= 50).length}</p>
                    <p>Failing Students: {students.filter(s => s.passRate < 50).length}</p>
                    <p>Class Average: {classAverage}%</p>
                    <p>Overall Pass Rate: {passRate}%</p>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Generate Report</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">{selectedStudent.name}</h3>
            <p>Class: {selectedStudent.class}</p>
            <p>Attendance: {selectedStudent.attendance}%</p>
            <p>Pass Rate: {selectedStudent.passRate}%</p>
            <div className="mt-4"><h4 className="font-semibold">Scores:</h4>
              {Object.entries(selectedStudent.scores).map(([subject, score]) => (<p key={subject}>{subject}: {score}%</p>))}
            </div>
            <button onClick={() => setSelectedStudent(null)} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded w-full">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
