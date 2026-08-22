import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Seasonal from "./pages/Seasonal";
import CitySearch from "./pages/CitySearch";
import ActivitySearch from "./pages/ActivitySearch";
import MyTrips from "./pages/MyTrips";
import CreateTrip from "./pages/CreateTrip";
import ItineraryView from "./pages/ItineraryView";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import BudgetPage from "./pages/BudgetPage";
import CalendarPage from "./pages/CalendarPage";
import Community from "./pages/Community";
import SharedTrip from "./pages/SharedTrip";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seasonal" element={<Seasonal />} />
        <Route path="/search/cities" element={<CitySearch />} />
        <Route path="/search/activities" element={<ActivitySearch />} />
        <Route path="/trips" element={<MyTrips />} />
        <Route path="/trips/new" element={<CreateTrip />} />
        <Route path="/trips/:id" element={<ItineraryView />} />
        <Route path="/trips/:id/build" element={<ItineraryBuilder />} />
        <Route path="/trips/:id/budget" element={<BudgetPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/share/:token" element={<SharedTrip />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
