// src/pages/Analytics.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Analytics = () => {
  const navigate = useNavigate();
  
  // State for all data
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [sports, setSports] = useState([]);
  const [assets, setAssets] = useState([]);

  // Load all data from localStorage
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
  const totalItems = assets.reduce((sum, a) => sum + (a.quantity || 0), 0);

  // Dropout Risk Analysis
  const atRiskStudents = students.filter(s => {
    const attendance = parseInt(s.attendance) || 0;
    return attendance < 75 || s.feeStatus === 'Overdue';
  }).length;
  const dropoutRate = totalStudents > 0 ? ((atRiskStudents / totalStudents) * 100).toFixed(1) : 0;

  // Academic Performance
  const studentPerformance = {
    excellent: students.filter(s => (parseInt(s.attendance) || 0) >= 90).length,
    good: students.filter(s => {
      const attendance = parseInt(s.attendance) || 0;
      return attendance >= 75 && attendance < 90;
    }).length,
    average: students.filter(s => {
      const attendance = parseInt(s.attendance) || 0;
      return attendance >= 60 && attendance < 75;
    }).length,
    needsImprovement: students.filter(s => (parseInt(s.attendance) || 0) < 60).length
  };
  
  const passRate = totalStudents > 0 ? (((studentPerformance.excellent + studentPerformance.good) / totalStudents) * 100).toFixed(1) : 0;
  const districtPassRate = 78.5;
  const performanceVsDistrict = (parseFloat(passRate) - districtPassRate).toFixed(1);

  // Fee Collection Rate
  const totalFees = transactions.filter(t => t && t.type === 'Income').reduce((sum, t) => sum + (t.amount || 0), 0);
  const collectedFees = transactions.filter(t => t && t.type === 'Income' && t.status === 'Completed').reduce((sum, t) => sum + (t.amount || 0), 0);
  const feeCollectionRate = totalFees > 0 ? ((collectedFees / totalFees) * 100).toFixed(1) : 0;

  // Grade-wise Performance
  const gradePerformance = {
    '9th': { passRate: 82, students: students.filter(s => s && s.grade === '9th').length },
    '10th': { passRate: 78, students: students.filter(s => s && s.grade === '10th').length },
    '11th': { passRate: 85, students: students.filter(s => s && s.grade === '11th').length },
    '12th': { passRate: 88, students: students.filter(s => s && s.grade === '12th').length }
  };

  // Projects Data
  const projects = [
    { name: 'Science Lab Upgrade', status: 'In Progress', investment: 25000, returns: 0, roi: 0, completion: 65, benefits: 'Improved practical learning' },
    { name: 'Sports Complex', status: 'Completed', investment: 75000, returns: 15000, roi: 20, completion: 100, benefits: 'Increased enrollment by 15%' },
    { name: 'Computer Lab Expansion', status: 'Planning', investment: 50000, returns: 0, roi: 0, completion: 10, benefits: 'Digital education enhancement' },
    { name: 'Library Digitalization', status: 'In Progress', investment: 30000, returns: 5000, roi: 16.7, completion: 40, benefits: '24/7 access to resources' }
  ];

  const totalProjectInvestment = projects.reduce((sum, p) => sum + p.investment, 0);
  const totalProjectReturns = projects.reduce((sum, p) => sum + p.returns, 0);
  const overallROI = totalProjectInvestment > 0 ? ((totalProjectReturns / totalProjectInvestment) * 100).toFixed(1) : 0;

  // Get low attendance count
  const lowAttendanceCount = students.filter(s => (parseInt(s.attendance) || 0) < 75).length;
  const overdueFeesCount = students.filter(s => s && s.feeStatus === 'Overdue').length;
  const pendingTransactionsCount = transactions.filter(t => t && t.status === 'Pending').length;

  // AI Insights Generation
  const getAIInsights = () => {
    const insights = [];
    
    if (parseFloat(dropoutRate) > 10) {
      insights.push({
        type: 'warning',
        title: 'High Dropout Risk Detected',
        message: `${dropoutRate}% of students are at risk of dropping out.`,
        recommendation: 'Implement intervention programs and counseling for at-risk students.'
      });
    }
    
    if (parseFloat(feeCollectionRate) < 85) {
      insights.push({
        type: 'caution',
        title: 'Low Fee Collection Rate',
        message: `Only ${feeCollectionRate}% of fees collected. $${unpaidFees.toLocaleString()} pending.`,
        recommendation: 'Strengthen collection processes and offer payment plans.'
      });
    }
    
    if (parseFloat(attendanceRate) < 85) {
      insights.push({
        type: 'warning',
        title: 'Low Attendance Rate',
        message: `Current attendance is ${attendanceRate}%, below target of 90%.`,
        recommendation: 'Launch attendance awareness campaigns and reward regular attendance.'
      });
    }
    
    if (parseFloat(performanceVsDistrict) < 0) {
      insights.push({
        type: 'caution',
        title: 'Below District Average',
        message: `Pass rate ${passRate}% is ${Math.abs(parseFloat(performanceVsDistrict))}% below district average.`,
        recommendation: 'Implement tutoring programs and review teaching methodologies.'
      });
    }
    
    if (insights.length === 0) {
      insights.push({
        type: 'success',
        title: 'School Performing Well',
        message: 'All metrics are within acceptable ranges. Keep up the good work!',
        recommendation: 'Continue current strategies and look for areas of improvement.'
      });
    }
    
    return insights;
  };

  const insights = getAIInsights();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>📊 Full Analytics Dashboard</h1>
          <p style={{ color: '#666' }}>AI-powered insights for strategic decision making</p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* AI Insights Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>🤖 AI-Generated Insights</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {insights.map((insight, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              borderLeft: `4px solid ${insight.type === 'warning' ? '#ef4444' : insight.type === 'caution' ? '#f59e0b' : '#10b981'}`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px', marginRight: '10px' }}>
                  {insight.type === 'warning' ? '⚠️' : insight.type === 'caution' ? '🟡' : '✅'}
                </span>
                <h3 style={{ fontSize: '18px', margin: 0 }}>{insight.title}</h3>
              </div>
              <p style={{ color: '#555', marginBottom: '10px' }}>{insight.message}</p>
              <p style={{ color: '#3b82f6', fontSize: '14px' }}>
                <strong>Recommendation:</strong> {insight.recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        
        {/* Student Dropout Analysis */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '15px' }}>🎓 Student Dropout Analysis</h3>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>At-Risk Students:</span>
              <strong style={{ color: '#ef4444' }}>{atRiskStudents} / {totalStudents}</strong>
            </div>
            <div style={{ backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${(atRiskStudents / totalStudents * 100) || 0}%`, backgroundColor: '#ef4444', padding: '8px', textAlign: 'center', color: 'white', fontSize: '12px' }}>
                {dropoutRate}%
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: '#fef3c7', padding: '12px', borderRadius: '8px' }}>
            <strong>⚠️ Main Causes Identified:</strong>
            <ul style={{ margin: '8px 0 0 20px', fontSize: '12px', color: '#666' }}>
              <li>Low attendance (below 75%) - {lowAttendanceCount} students</li>
              <li>Overdue fee payments - {overdueFeesCount} students</li>
              <li>Poor academic performance</li>
            </ul>
          </div>
        </div>

        {/* Financial Performance */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '15px' }}>💰 Financial Performance</h3>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Total Income:</span>
              <strong style={{ color: '#10b981' }}>${totalIncome.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Total Expenses:</span>
              <strong style={{ color: '#ef4444' }}>${totalExpense.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Balance:</span>
              <strong style={{ color: balance >= 0 ? '#10b981' : '#ef4444' }}>${balance.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Fee Collection Rate:</span>
              <strong style={{ color: parseFloat(feeCollectionRate) >= 85 ? '#10b981' : '#f59e0b' }}>{feeCollectionRate}%</strong>
            </div>
          </div>
          {parseFloat(feeCollectionRate) < 85 && (
            <div style={{ backgroundColor: '#fef3c7', padding: '12px', borderRadius: '8px' }}>
              <strong>⚠️ Shortage Cause:</strong> Pending fees of ${unpaidFees.toLocaleString()} from {pendingTransactionsCount} transactions
            </div>
          )}
        </div>

        {/* Attendance Analytics */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '15px' }}>📋 Attendance Analytics</h3>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Current Rate:</span>
              <strong style={{ color: parseFloat(attendanceRate) >= 85 ? '#10b981' : '#f59e0b' }}>{attendanceRate}%</strong>
            </div>
            <div style={{ backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${attendanceRate}%`, backgroundColor: parseFloat(attendanceRate) >= 85 ? '#10b981' : '#f59e0b', padding: '8px', textAlign: 'center', color: 'white', fontSize: '12px' }}>
                {attendanceRate}%
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Present: {presentCount}</span>
            <span>Absent: {totalAttendance - presentCount}</span>
          </div>
          <div style={{ backgroundColor: '#dbeafe', padding: '12px', borderRadius: '8px' }}>
            <strong>📈 Improvement Opportunity:</strong> Target 90% attendance could add {Math.ceil(totalAttendance * 0.05)} more present students
          </div>
        </div>
      </div>

      {/* Academic Performance Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        
        {/* Student Performance */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '15px' }}>📚 Student Academic Performance</h3>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Pass Rate:</span>
              <strong style={{ fontSize: '24px', color: parseFloat(passRate) >= 80 ? '#10b981' : '#f59e0b' }}>{passRate}%</strong>
            </div>
            <div style={{ backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden', marginBottom: '15px' }}>
              <div style={{ width: `${passRate}%`, backgroundColor: parseFloat(passRate) >= 80 ? '#10b981' : '#f59e0b', padding: '8px', textAlign: 'center', color: 'white', fontSize: '12px' }}>
                {passRate}%
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Vs District Avg ({districtPassRate}%):</span>
              <strong style={{ color: parseFloat(performanceVsDistrict) >= 0 ? '#10b981' : '#ef4444' }}>
                {parseFloat(performanceVsDistrict) >= 0 ? '+' : ''}{performanceVsDistrict}%
              </strong>
            </div>
          </div>
          
          <div>
            <strong>Performance Distribution:</strong>
            <div style={{ marginTop: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                <span>Excellent (90%+) </span>
                <div style={{ backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden', marginTop: '2px' }}>
                  <div style={{ width: `${(studentPerformance.excellent / totalStudents * 100) || 0}%`, backgroundColor: '#10b981', padding: '4px', textAlign: 'center', color: 'white', fontSize: '11px' }}>
                    {studentPerformance.excellent}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '5px' }}>
                <span>Good (75-89%) </span>
                <div style={{ backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden', marginTop: '2px' }}>
                  <div style={{ width: `${(studentPerformance.good / totalStudents * 100) || 0}%`, backgroundColor: '#3b82f6', padding: '4px', textAlign: 'center', color: 'white', fontSize: '11px' }}>
                    {studentPerformance.good}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '5px' }}>
                <span>Average (60-74%) </span>
                <div style={{ backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden', marginTop: '2px' }}>
                  <div style={{ width: `${(studentPerformance.average / totalStudents * 100) || 0}%`, backgroundColor: '#f59e0b', padding: '4px', textAlign: 'center', color: 'white', fontSize: '11px' }}>
                    {studentPerformance.average}
                  </div>
                </div>
              </div>
              <div>
                <span>Needs Improvement (&lt;60%) </span>
                <div style={{ backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden', marginTop: '2px' }}>
                  <div style={{ width: `${(studentPerformance.needsImprovement / totalStudents * 100) || 0}%`, backgroundColor: '#ef4444', padding: '4px', textAlign: 'center', color: 'white', fontSize: '11px' }}>
                    {studentPerformance.needsImprovement}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grade-wise Comparison */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '15px' }}>📊 Grade-wise Performance vs District</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Grade</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Students</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Pass Rate</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>vs District</th>
               </tr>
            </thead>
            <tbody>
              {Object.entries(gradePerformance).map(([grade, data]) => {
                const vsDistrict = (data.passRate - districtPassRate).toFixed(1);
                return (
                  <tr key={grade} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '10px', fontWeight: '500' }}>{grade}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{data.students}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ color: data.passRate >= 80 ? '#10b981' : '#f59e0b' }}>{data.passRate}%</span>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ color: parseFloat(vsDistrict) >= 0 ? '#10b981' : '#ef4444' }}>
                        {parseFloat(vsDistrict) >= 0 ? '+' : ''}{vsDistrict}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ marginTop: '15px', backgroundColor: '#f0f9ff', padding: '12px', borderRadius: '8px' }}>
            <strong>🏆 Top Performing Grade:</strong> 12th Grade (88% pass rate)
            <br />
            <strong>⚠️ Needs Attention:</strong> 10th Grade (78% pass rate)
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>🏗️ School Projects - ROI & Benefits</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Project</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Investment</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Returns</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>ROI</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Benefits</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{project.name}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      backgroundColor: project.status === 'Completed' ? '#10b981' : project.status === 'In Progress' ? '#f59e0b' : '#6b7280',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {project.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>${project.investment.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#10b981' }}>${project.returns.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: project.roi >= 15 ? '#10b981' : '#666' }}>
                    {project.roi > 0 ? `${project.roi}%` : 'Pending'}
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#666' }}>{project.benefits}</td>
                </tr>
              ))}
            </tbody>
            <tfoot style={{ backgroundColor: '#f9fafb', fontWeight: 'bold' }}>
              <tr>
                <td style={{ padding: '12px' }}>TOTAL</td>
                <td style={{ padding: '12px' }}></td>
                <td style={{ padding: '12px', textAlign: 'right' }}>${totalProjectInvestment.toLocaleString()}</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#10b981' }}>${totalProjectReturns.toLocaleString()}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: parseFloat(overallROI) >= 15 ? '#10b981' : '#f59e0b' }}>
                  {overallROI}% ROI
                </td>
                <td style={{ padding: '12px' }}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#3b82f6' }}>{totalStudents}</p>
          <p style={{ color: '#666', fontSize: '12px' }}>Total Students</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#10b981' }}>{totalTeachers}</p>
          <p style={{ color: '#666', fontSize: '12px' }}>Total Teachers</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#8b5cf6' }}>{activeSports}</p>
          <p style={{ color: '#666', fontSize: '12px' }}>Active Sports</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#f59e0b' }}>{totalAssets}</p>
          <p style={{ color: '#666', fontSize: '12px' }}>Total Assets</p>
        </div>
      </div>

      {/* Executive Summary */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '25px', borderRadius: '10px', color: 'white' }}>
        <h3 style={{ marginBottom: '15px', color: 'white' }}>📋 Executive Summary & Recommendations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <strong>✅ Strengths:</strong>
            <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
              <li>{totalStudents} students enrolled</li>
              <li>${totalIncome.toLocaleString()} total income</li>
              <li>{activeTeachers} active teachers</li>
            </ul>
          </div>
          <div>
            <strong>⚠️ Areas for Improvement:</strong>
            <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
              <li>Reduce dropout risk ({dropoutRate}%)</li>
              <li>Improve attendance to 90%+</li>
              <li>Address pending fees (${unpaidFees.toLocaleString()})</li>
            </ul>
          </div>
          <div>
            <strong>🎯 Strategic Recommendations:</strong>
            <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
              <li>Launch after-school tutoring</li>
              <li>Implement parent engagement program</li>
              <li>Expand successful projects</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ← Back to Dashboard
        </button>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🔄 Refresh Data
        </button>
      </div>
    </div>
  );
};

export default Analytics;