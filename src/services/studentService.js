// Initialize default students by grade
export const initializeStudents = () => {
  const existingStudents = localStorage.getItem("studentsByGrade");
  if (!existingStudents) {
    const defaultStudents = {
      "Grade 10A": [
        {
          id: 1,
          name: "John Doe",
          parentName: "Mr. David Doe",
          parentPhone: "+263 242 123456",
          email: "john@email.com",
          homeAddress: "123 Main Street, Harare",
          nationality: "Zimbabwean",
          status: "Active",
          enrollmentDate: "2026-01-15",
          english: 75,
          math: 85,
          science: 92,
          finalGrade: "A"
        },
        {
          id: 2,
          name: "Jane Smith",
          parentName: "Mrs. Sarah Smith",
          parentPhone: "+263 242 234567",
          email: "jane@email.com",
          homeAddress: "456 Oak Avenue, Harare",
          nationality: "Zimbabwean",
          status: "Active",
          enrollmentDate: "2026-01-15",
          english: 88,
          math: 79,
          science: 85,
          finalGrade: "A"
        }
      ],
      "Grade 10B": [
        {
          id: 3,
          name: "Mike Johnson",
          parentName: "Mr. James Johnson",
          parentPhone: "+263 242 345678",
          email: "mike@email.com",
          homeAddress: "789 Pine Road, Harare",
          nationality: "South African",
          status: "Active",
          enrollmentDate: "2026-02-01",
          english: 65,
          math: 72,
          science: 68,
          finalGrade: "C"
        }
      ],
      "Grade 11A": [],
      "Grade 11B": [],
      "Grade 12A": [],
      "Grade 12B": []
    };
    localStorage.setItem("studentsByGrade", JSON.stringify(defaultStudents));
  }
};

// Get students for specific grade
export const getStudentsByGrade = (grade) => {
  const allStudents = localStorage.getItem("studentsByGrade");
  if (!allStudents) {
    initializeStudents();
    return getStudentsByGrade(grade);
  }
  const students = JSON.parse(allStudents);
  return students[grade] || [];
};

// Add student to grade
export const addStudentToGrade = (grade, studentData) => {
  const allStudents = JSON.parse(localStorage.getItem("studentsByGrade"));
  if (!allStudents[grade]) {
    allStudents[grade] = [];
  }
  
  const newStudent = {
    id: Math.max(...(allStudents[grade].map(s => s.id) || [0])) + 1,
    ...studentData,
    enrollmentDate: new Date().toISOString().split('T')[0],
    english: studentData.english || 0,
    math: studentData.math || 0,
    science: studentData.science || 0,
    finalGrade: studentData.finalGrade || "-"
  };
  
  allStudents[grade].push(newStudent);
  localStorage.setItem("studentsByGrade", JSON.stringify(allStudents));
  return newStudent;
};

// Update student scores
export const updateStudentScores = (grade, studentId, scores) => {
  const allStudents = JSON.parse(localStorage.getItem("studentsByGrade"));
  const gradeStudents = allStudents[grade];
  
  const student = gradeStudents.find(s => s.id === studentId);
  if (student) {
    student.english = scores.english;
    student.math = scores.math;
    student.science = scores.science;
    student.finalGrade = scores.finalGrade;
  }
  
  localStorage.setItem("studentsByGrade", JSON.stringify(allStudents));
  return student;
};

// Get all students (for admin view)
export const getAllStudents = () => {
  const allStudents = JSON.parse(localStorage.getItem("studentsByGrade"));
  const result = [];
  Object.keys(allStudents).forEach(grade => {
    result.push(...allStudents[grade].map(s => ({ ...s, grade })));
  });
  return result;
};

// Get students by multiple grades (for admin)
export const getStudentsByGrades = (grades) => {
  const allStudents = JSON.parse(localStorage.getItem("studentsByGrade"));
  const result = [];
  grades.forEach(grade => {
    if (allStudents[grade]) {
      result.push(...allStudents[grade].map(s => ({ ...s, grade })));
    }
  });
  return result;
};
