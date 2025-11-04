import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import LabTechDashboard from "../pages/LabtechDashboard";
import PhysicianDashboard from "../pages/PhysicianDashboard";
import PatientPortal from "../pages/PatientPortal";
import ProfilePage from "../pages/ProfilePage";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {user && (
          <>
            <Route path="/labtech" element={<LabTechDashboard />} />
            <Route path="/physician" element={<PhysicianDashboard />} />
            <Route path="/patient" element={<PatientPortal />} />
            <Route path="/profile" element={<ProfilePage />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
        {!user && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </BrowserRouter>
  );
}
