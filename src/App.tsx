import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import GetInvolved from "./pages/GetInvolved";
import Media from "./pages/Media";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import BlogManager from "./pages/admin/BlogManager";
import EventsManager from "./pages/admin/EventsManager";
import MeetingsManager from "./pages/admin/MeetingsManager";
import ResourcesManager from "./pages/admin/ResourcesManager";
import AnnouncementsManager from "./pages/admin/AnnouncementsManager";
import MediaLibraryManager from "./pages/admin/MediaLibraryManager";
import FeedbackViewer from "./pages/admin/FeedbackViewer";
import NewsletterViewer from "./pages/admin/NewsletterViewer";
import UserManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";
import MigrateResources from "./pages/admin/MigrateResources";
import SetupAdmin from "./pages/admin/SetupAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/neighborhood" element={<About />} />
          <Route path="/about/weca" element={<About />} />
          <Route path="/about/board" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/calendar" element={<Events />} />
          <Route path="/events/upcoming" element={<Events />} />
          <Route path="/events/minutes" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/newsletters" element={<Blog />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/city-services" element={<Resources />} />
          <Route path="/resources/planning" element={<Resources />} />
          <Route path="/resources/forms" element={<Resources />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/get-involved/volunteer" element={<GetInvolved />} />
          <Route path="/get-involved/donate" element={<GetInvolved />} />
          <Route path="/get-involved/surveys" element={<GetInvolved />} />
          <Route path="/get-involved/faq" element={<GetInvolved />} />
          <Route path="/media" element={<Media />} />
          <Route path="/media/photos" element={<Media />} />
          <Route path="/media/videos" element={<Media />} />
          <Route path="/media/social" element={<Media />} />
          
          {/* Admin Routes */}
          <Route path="/admin/setup" element={<SetupAdmin />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="events" element={<EventsManager />} />
            <Route path="meetings" element={<MeetingsManager />} />
            <Route path="resources" element={<ResourcesManager />} />
            <Route path="announcements" element={<AnnouncementsManager />} />
            <Route path="media" element={<MediaLibraryManager />} />
            <Route path="feedback" element={<FeedbackViewer />} />
            <Route path="newsletter" element={<NewsletterViewer />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="migrate" element={<MigrateResources />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
