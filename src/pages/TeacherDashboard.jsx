import { useState, useEffect } from "react";
import { getStudentsByGrade, addStudentToGrade, updateStudentScores } from "../services/studentService";

export default function TeacherDashboard() {
  const [activePanel, setActivePanel] = useState("enrollment");
  
  // Get current teacher info
  const currentTeacher = localStorage.getItem("name") || "Teacher";
  const currentGrade = localStorage.getItem("grade") || "Grade 10A";
  const teacherEmail = localStorage.getItem("email") || "";

  const [students, setStudents] = useState([]);

  // Load students for this teacher's grade
  useEffect(() => {
    const gradeStudents = getStudentsByGrade(currentGrade);
    setStudents(gradeStudents);
  }, [currentGrade]);

  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [showScoresForm, setShowScoresForm] = useState(false);
  
  const [enrollmentForm, setEnrollmentForm] = useState({
    name: "",
    parentName: "",
    parentPhone: "",
    email: "",
    homeAddress: "",
    nationality: "Zimbabwean",
    status: "Active"
  });

  const [scoresForm, setScoresForm] = useState({
    studentId: "",
    english: "",
    math: "",
    science: ""
  });

  const handleEnrollmentSubmit = (e) => {
    e.preventDefault();
    const newStudent = addStudentToGrade(currentGrade, enrollmentForm);
    setStudents([...students, newStudent]);
    setEnrollmentForm({
      name: "",
      parentName: "",
      parentPhone: "",
      email: "",
      homeAddress: "",
      nationality: "Zimbabwean",
      status: "Active"
    });
    setShowEnrollmentForm(false);
    alert("✅ Student enrolled in " + currentGrade + " successfully!");
  };

  const calculateGrade = (english, math, science) => {
    const avg = (english + math + science) / 3;
    if (avg >= 80) return "A";
    if (avg >= 70) return "B";
    if (avg >= 60) return "C";
    if (avg >= 50) return "D";
    return "F";
  };

  const handleScoresSubmit = (e) => {
    e.preventDefault();
    const finalGrade = calculateGrade(
      parseInt(scoresForm.english),
      parseInt(scoresForm.math),
      parseInt(scoresForm.science)
    );

    updateStudentScores(currentGrade, parseInt(scoresForm.studentId), {
      english: parseInt(scoresForm.english),
      math: parseInt(scoresForm.math),
      science: parseInt(scoresForm.science),
      finalGrade: finalGrade
    });

    const updatedStudents = students.map(s => {
      if (s.id === parseInt(scoresForm.studentId)) {
        return {
          ...s,
          english: parseInt(scoresForm.english),
          math: parseInt(scoresForm.math),
          science: parseInt(scoresForm.science),
          finalGrade: finalGrade
        };
      }
      return s;
    });

    setStudents(updatedStudents);
    setScoresForm({ studentId: "", english: "", math: "", science: "" });
    setShowScoresForm(false);
    alert("✅ Scores updated successfully!");
  };

  const passRate = students.length > 0 
    ? ((students.filter(s => s.finalGrade !== "-" && s.finalGrade !== "D" && s.finalGrade !== "F").length / students.length) * 100).toFixed(1)
    : "0";
  
  const avgScore = students.length > 0 && students.some(s => s.english)
    ? (students.reduce((sum, s) => sum + ((s.english + s.math + s.science) / 3 || 0), 0) / students.length).toFixed(0)
    : "0";

  return (
    <div style={{ padding: "40px" }}>
      <div style={{ marginBottom: "30px", backgroundColor: "#e3f2fd", padding: "20px", borderRadius: "8px", border: "2px solid #1a73e8" }}>
        <h1 style={{ color: "#1a73e8", marginTop: "0", marginBottom: "10px" }}>👨‍🏫 {currentTeacher}'s Class Dashboard</h1>
        <h2 style={{ color: "#333", margin: "0", fontSize: "24px" }}>📚 {currentGrade}</h2>
        <p style={{ color: "#666", margin: "8px 0 0 0", fontSize: "13px" }}>✅ Only you can see and manage your class data</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "40px" }}>
        {[
          { title: "My Students", value: students.length, icon: "👥", color: "#1a73e8" },
          { title: "Active", value: students.filter(s => s.status === "Active").length, icon: "✅", color: "#34a853" },
          { title: "Pass Rate", value: `${passRate}%`, icon: "📈", color: "#fbbc04" },
          { title: "Average", value: avgScore, icon: "⭐", color: "#7c3aed" }
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
              <h3 style={{ margin: "0", color: card.color, fontSize: "28px", fontWeight: "bold" }}>{card.value}</h3>
            </div>
            <div style={{ fontSize: "35px" }}>{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Panel Selector */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <button
          onClick={() => setActivePanel("enrollment")}
          style={{
            padding: "12px 30px",
            backgroundColor: activePanel === "enrollment" ? "#1a73e8" : "#e5e7eb",
            color: activePanel === "enrollment" ? "white" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px"
          }}
        >
          📋 My Students ({students.length})
        </button>
        <button
          onClick={() => setActivePanel("grades")}
          style={{
            padding: "12px 30px",
            backgroundColor: activePanel === "grades" ? "#34a853" : "#e5e7eb",
            color: activePanel === "grades" ? "white" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px"
          }}
        >
          📊 Grades & Performance
        </button>
      </div>

      {/* ENROLLMENT PANEL */}
      {activePanel === "enrollment" && (
        <div>
          <button
            onClick={() => setShowEnrollmentForm(!showEnrollmentForm)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#1a73e8",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginBottom: "20px",
              fontWeight: "bold"
            }}
          >
            {showEnrollmentForm ? "❌ Cancel" : "➕ Add Student to My Class"}
          </button>

          {showEnrollmentForm && (
            <div style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "8px",
              marginBottom: "25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>📝 Enroll New Student in {currentGrade}</h3>
              <form onSubmit={handleEnrollmentSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Student Name *</label>
                    <input
                      type="text"
                      placeholder="Enter student name"
                      value={enrollmentForm.name}
                      onChange={(e) => setEnrollmentForm({ ...enrollmentForm, name: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="student@email.com"
                      value={enrollmentForm.email}
                      onChange={(e) => setEnrollmentForm({ ...enrollmentForm, email: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Nationality *</label>
                    <select
                      value={enrollmentForm.nationality}
                      onChange={(e) => setEnrollmentForm({ ...enrollmentForm, nationality: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                    >
                      <option value="Zimbabwean">Zimbabwean</option>
                      <option value="South African">South African</option>
                      <option value="Botswanan">Botswanan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Parent/Guardian Name *</label>
                    <input
                      type="text"
                      placeholder="Parent name"
                      value={enrollmentForm.parentName}
                      onChange={(e) => setEnrollmentForm({ ...enrollmentForm, parentName: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Parent Phone *</label>
                    <input
                      type="tel"
                      placeholder="+263 242 123456"
                      value={enrollmentForm.parentPhone}
                      onChange={(e) => setEnrollmentForm({ ...enrollmentForm, parentPhone: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Status *</label>
                    <select
                      value={enrollmentForm.status}
                      onChange={(e) => setEnrollmentForm({ ...enrollmentForm, status: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Home Address *</label>
                    <textarea
                      placeholder="Street address, Harare"
                      value={enrollmentForm.homeAddress}
                      onChange={(e) => setEnrollmentForm({ ...enrollmentForm, homeAddress: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box", minHeight: "60px" }}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#1a73e8",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "15px",
                    fontWeight: "bold"
                  }}
                >
                  💾 Add Student
                </button>
              </form>
            </div>
          )}

          {/* Students Table */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden"
          }}>
            <div style={{ padding: "15px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
              <h3 style={{ margin: "0", color: "#333", fontSize: "15px" }}>📋 Students in {currentGrade}</h3>
            </div>
            {students.length === 0 ? (
              <div style={{ padding: "30px", textAlign: "center", color: "#999" }}>
                <p style={{ margin: "0" }}>No students enrolled yet</p>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9f9f9" }}>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Name</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Parent</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Phone</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Email</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Address</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Nationality</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "12px", fontWeight: "bold", color: "#333" }}>{student.name}</td>
                      <td style={{ padding: "12px", color: "#666" }}>{student.parentName}</td>
                      <td style={{ padding: "12px", color: "#666" }}>{student.parentPhone}</td>
                      <td style={{ padding: "12px", color: "#1a73e8" }}>{student.email}</td>
                      <td style={{ padding: "12px", color: "#666", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{student.homeAddress}</td>
                      <td style={{ padding: "12px", color: "#666" }}>{student.nationality}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{
                          backgroundColor: student.status === "Active" ? "#e8f5e9" : "#ffebee",
                          color: student.status === "Active" ? "#2e7d32" : "#c62828",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "bold"
                        }}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* GRADES PANEL */}
      {activePanel === "grades" && (
        <div>
          <button
            onClick={() => setShowScoresForm(!showScoresForm)}
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
            {showScoresForm ? "❌ Cancel" : "➕ Add/Update Scores"}
          </button>

          {showScoresForm && (
            <div style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "8px",
              marginBottom: "25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>📝 Add/Update Student Scores</h3>
              <form onSubmit={handleScoresSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Select Student *</label>
                    <select
                      value={scoresForm.studentId}
                      onChange={(e) => setScoresForm({ ...scoresForm, studentId: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    >
                      <option value="">-- Select Student --</option>
                      {students.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>English (0-100) *</label>
                    <input
                      type="number"
                      placeholder="0-100"
                      value={scoresForm.english}
                      onChange={(e) => setScoresForm({ ...scoresForm, english: e.target.value })}
                      max="100"
                      min="0"
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Math (0-100) *</label>
                    <input
                      type="number"
                      placeholder="0-100"
                      value={scoresForm.math}
                      onChange={(e) => setScoresForm({ ...scoresForm, math: e.target.value })}
                      max="100"
                      min="0"
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "600", color: "#666", display: "block", marginBottom: "5px" }}>Science (0-100) *</label>
                    <input
                      type="number"
                      placeholder="0-100"
                      value={scoresForm.science}
                      onChange={(e) => setScoresForm({ ...scoresForm, science: e.target.value })}
                      max="100"
                      min="0"
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
                    backgroundColor: "#34a853",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "15px",
                    fontWeight: "bold"
                  }}
                >
                  💾 Save Scores
                </button>
              </form>
            </div>
          )}

          {/* Performance Table */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden"
          }}>
            <div style={{ padding: "15px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
              <h3 style={{ margin: "0", color: "#333", fontSize: "15px" }}>📊 Student Performance & Grades</h3>
            </div>
            {students.length === 0 ? (
              <div style={{ padding: "30px", textAlign: "center", color: "#999" }}>
                <p style={{ margin: "0" }}>No students to grade yet</p>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9f9f9" }}>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Name</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>English</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Math</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Science</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Average</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Grade</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#666" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const avg = student.english && student.math && student.science 
                      ? ((student.english + student.math + student.science) / 3).toFixed(1)
                      : "-";
                    return (
                      <tr key={student.id} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "12px", fontWeight: "bold", color: "#333" }}>{student.name}</td>
                        <td style={{ padding: "12px", color: "#333" }}>{student.english || "-"}</td>
                        <td style={{ padding: "12px", color: "#333" }}>{student.math || "-"}</td>
                        <td style={{ padding: "12px", color: "#333" }}>{student.science || "-"}</td>
                        <td style={{ padding: "12px", fontWeight: "bold", color: "#1a73e8" }}>{avg}</td>
                        <td style={{ padding: "12px", fontWeight: "bold", color: student.finalGrade >= "C" ? "#34a853" : "#ea4335" }}>
                          {student.finalGrade}
                        </td>
                        <td style={{ padding: "12px" }}>
                          <span style={{
                            backgroundColor: student.finalGrade >= "C" ? "#e8f5e9" : "#ffebee",
                            color: student.finalGrade >= "C" ? "#2e7d32" : "#c62828",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontWeight: "bold"
                          }}>
                            {student.finalGrade >= "C" ? "✅ Pass" : "❌ Fail"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
