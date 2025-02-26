import "./App.css";
import { useEffect, useState } from "react";
import { LandingPage } from "./components/home/LandingPage";
import MerchandisePage from "./components/MerchandisePage";
import Eventpage from "./components/Events/Eventpage";
import EventRegistration from "./components/Events/EventRegistration";
import { DashboardPage } from "./components/protected_routes/DashboardPage";
import Signup from "./components/login/Signup";
import Login from "./components/login/Login";
import EmailVerify from "./components/login/EmailVerify";
import ResetPassword from "./components/login/ResetPassword";
import ForgotPassword from "./components/login/ForgotPassword";
import PageNotFound from "./components/PageNotFound";
import { WorkshopPage } from "./components/workshop/WorkshopPage";

import { ProtectedRoute } from "./components/protected_routes/AuthRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notifications from "./components/protected_routes/Notifications";
import { Toaster } from "react-hot-toast";
import { logoutCall } from "./services/http/auth";

function App() {
  const [user, setUser] = useState("");

  const handleLogout = async () => {
    setUser("");
    localStorage.removeItem("sid");
    localStorage.removeItem("providerID");
    await logoutCall();
  };

  const setActiveUser = () => {
    const sid = localStorage.getItem("sid");
    setUser(sid ?? "");
  };

  useEffect(setActiveUser, [user]);

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<LandingPage setUser={setUser} />} />
          <Route element={<ProtectedRoute accessAllowed={!!user} />}>
            <Route
              path="/dashboard"
              element={<DashboardPage logout={handleLogout} />}
            />
          </Route>
          <Route>
            <Route
              path="/merchandise"
              element={
                <ProtectedRoute accessAllowed={!!user}>
                  <MerchandisePage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route>
            <Route
              path="/notifications"
              element={
                // <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Notifications user={user} />
                // </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/events" element={<Eventpage />} />
          <Route path="/eventregistration" element={<EventRegistration />} />
          <Route
            path="/signup"
            element={<Signup user={user} setActiveUser={setActiveUser} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setActiveUser={setActiveUser} />}
          />
          <Route path="/verify" element={<EmailVerify />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/workshop" element={<WorkshopPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            backgroundColor: "#141414",
            borderRadius: "6px",
            fontSize: "16px",
            padding: "6px",
            color: "white",
            borderTop: "1px solid #b60000",
            borderLeft: "1px solid #b60000",
            borderBottom: "1px solid #532e8f",
            borderRight: "1px solid #532e8f",
            zIndex: 1005,
            textAlign: "center",
          },
        }}
      />
    </>
  );
}

export default App;
