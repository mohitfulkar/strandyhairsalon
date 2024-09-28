import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner.js";
import ProtectedRoutes from "./components/ProtectedRoute.js";
import PublicRoutes from "./components/PublicRoute.js";
import ApplyStylist from "./pages/ApplyStylist.js";
import NotificationPage from "./pages/NotificationPage.js";
import Users from "./pages/admin/Users.js";
import Stylists from "./pages/admin/Stylists.js";
import Profile from "./pages/stylist/Profile.js";
import BookingPage from "./pages/BookingPage.js";
import Appointments from "./pages/Appointments.js";
import StylistAppointments from "./pages/stylist/StylistAppointments.js";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/apply-Stylist"
              element={
                <ProtectedRoutes>
                  <ApplyStylist />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoutes>
                  <Users />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/stylists"
              element={
                <ProtectedRoutes>
                  <Stylists />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/stylist/profile/:id"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/stylist/book-appointment/:stylistId"
              element={
                <ProtectedRoutes>
                  <BookingPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoutes>
                  <NotificationPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoutes>
                  <Register />
                </PublicRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoutes>
                  <Appointments />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/stylist-appointments"
              element={
                <ProtectedRoutes>
                  <StylistAppointments />
                </ProtectedRoutes>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
