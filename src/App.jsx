import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import SportsDashboard from "./pages/SportsDashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Finance from "./pages/Finance";
import Attendance from "./pages/Attendance";
import Sports from "./pages/Sports";
import Assets from "./pages/Assets";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const isLoggedIn = () => localStorage.getItem("token") !== null;

const ProtectedLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: "250px", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
        <Header />
        <div style={{ padding: "30px" }}>
          {children}
        </div>
      </div>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? <ProtectedLayout>{children}</ProtectedLayout> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/teacher-dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/finance-dashboard" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
        <Route path="/sports-dashboard" element={<ProtectedRoute><SportsDashboard /></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
        <Route path="/teachers" element={<ProtectedRoute><Teachers /></ProtectedRoute>} />
        <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
        <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
        <Route path="/sports" element={<ProtectedRoute><Sports /></ProtectedRoute>} />
        <Route path="/assets" element={<ProtectedRoute><Assets /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
