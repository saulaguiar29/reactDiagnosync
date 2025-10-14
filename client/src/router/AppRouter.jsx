import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import LabTechDashboard from "../pages/LabTechDashboard";
import PhysicianDashboard from "../pages/PhysicianDashboard";
import PatientPortal from "../pages/PatientPortal";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/labtech" element={<LabTechDashboard />} />
        <Route path="/physician" element={<PhysicianDashboard />} />
        <Route path="/patient" element={<PatientPortal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
