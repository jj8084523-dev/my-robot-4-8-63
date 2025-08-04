
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Events from "./pages/Events/Events";
import EventDetail from "./pages/Events/EventDetail";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RegisterSuccess from "./pages/Auth/RegisterSuccess";
import ForgotPassword from "./pages/Auth/ForgotPassword";

// Parent Dashboard Pages
import ParentDashboard from "./pages/Parent/Dashboard";

// Student Dashboard Pages
import StudentDashboard from "./pages/Student/Dashboard";

// Coordinator Dashboard Pages
import CoordinatorDashboard from "./pages/Coordinator/Dashboard";
import CoordinatorAttendance from "./pages/Coordinator/Attendance";

// Admin Dashboard Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminCourses from "./pages/Admin/Courses";
import AdminUsers from "./pages/Admin/Users";
import AdminAttendance from "./pages/Admin/Attendance";
import AdminPayments from "./pages/Admin/Payments";
import AdminGallery from "./pages/Admin/Gallery";
import AdminAchievements from "./pages/Admin/Achievements";
import AdminEvents from "./pages/Admin/Events";
import AdminCoordinators from "./pages/Admin/Coordinators";
import AdminReports from "./pages/Admin/Reports";
import AdminProfile from "./pages/Admin/Profile";
import AdminSettings from "./pages/Admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Authentication Pages */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/registration-success" element={<RegisterSuccess />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          
          {/* Parent Dashboard Pages */}
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          
          {/* Student Dashboard Pages */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          
          {/* Coordinator Dashboard Pages */}
          <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
          <Route path="/coordinator/attendance" element={<CoordinatorAttendance />} />
          
          {/* Admin Dashboard Pages */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/achievements" element={<AdminAchievements />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/coordinators" element={<AdminCoordinators />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
