import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import SkipLink from "@/components/SkipLink";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

// Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const Priorities = lazy(() => import("./pages/Priorities"));
const Support = lazy(() => import("./pages/Support"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Resources = lazy(() => import("./pages/Resources"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const FAQ = lazy(() => import("./pages/FAQ"));
const VolunteerSignup = lazy(() => import("./pages/VolunteerSignup"));
const VolunteerForm = lazy(() => import("./pages/VolunteerForm"));
const Surveys = lazy(() => import("./pages/Surveys"));

const Media = lazy(() => import("./pages/Media"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SupportAdvertise = lazy(() => import("./pages/SupportAdvertise"));
const SupportSponsor = lazy(() => import("./pages/SupportSponsor"));
const SupportContribute = lazy(() => import("./pages/SupportContribute"));
const ResourcesWECA = lazy(() => import("./pages/ResourcesWECA"));
const ResourcesArchives = lazy(() => import("./pages/ResourcesArchives"));
const ResourcesCityServices = lazy(() => import("./pages/ResourcesCityServices"));
const NewsUpdates = lazy(() => import("./pages/NewsUpdates"));
const CharterBylaws = lazy(() => import("./pages/CharterBylaws"));
const Login = lazy(() => import("./pages/admin/Login"));
const SetupAdmin = lazy(() => import("./pages/admin/SetupAdmin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const BlogManager = lazy(() => import("./pages/admin/BlogManager"));
const EventsManager = lazy(() => import("./pages/admin/EventsManager"));
const MeetingsManager = lazy(() => import("./pages/admin/MeetingsManager"));
const ResourcesManager = lazy(() => import("./pages/admin/ResourcesManager"));
const AnnouncementsManager = lazy(() => import("./pages/admin/AnnouncementsManager"));
const MediaLibraryManager = lazy(() => import("./pages/admin/MediaLibraryManager"));
const FeedbackViewer = lazy(() => import("./pages/admin/FeedbackViewer"));
const NewsletterViewer = lazy(() => import("./pages/admin/NewsletterViewer"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const Settings = lazy(() => import("./pages/admin/Settings"));

const AIAssistant = lazy(() => import("./pages/admin/AIAssistant"));
const AdsManager = lazy(() => import("./pages/admin/AdsManager"));
const NotificationSettings = lazy(() => import("./pages/admin/NotificationSettings"));
const VolunteerManager = lazy(() => import("./pages/admin/VolunteerManager"));
const PagesManager = lazy(() => import("./pages/admin/PagesManager"));
const SEOAnalyzer = lazy(() => import("./pages/admin/SEOAnalyzer"));
const AdvertiseManager = lazy(() => import("./pages/admin/AdvertiseManager"));
const LeadershipManager = lazy(() => import("./pages/admin/LeadershipManager"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
        <LanguageProvider>
          <SkipLink />
          <Suspense fallback={<LoadingSkeleton />}>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/neighborhood" element={<About />} />
            <Route path="/about/weca" element={<About />} />
            <Route path="/about/board" element={<About />} />
            <Route path="/priorities" element={<Priorities />} />
            <Route path="/support" element={<Support />} />
            <Route path="/support/advertise" element={<SupportAdvertise />} />
            <Route path="/support/sponsor" element={<SupportSponsor />} />
            <Route path="/support/contribute" element={<SupportContribute />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/calendar" element={<Events />} />
            <Route path="/events/upcoming" element={<Events />} />
            <Route path="/events/minutes" element={<Events />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/news/updates" element={<NewsUpdates />} />
            <Route path="/news/newsletters" element={<NewsUpdates />} />
            <Route path="/resources/charter-bylaws" element={<CharterBylaws />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/weca" element={<ResourcesWECA />} />
            <Route path="/resources/archives" element={<ResourcesArchives />} />
            <Route path="/resources/city-services" element={<ResourcesCityServices />} />
            <Route path="/resources/planning" element={<Resources />} />
            <Route path="/resources/forms" element={<Resources />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/get-involved/volunteer" element={<VolunteerSignup />} />
            <Route path="/get-involved/volunteer/:slug" element={<VolunteerForm />} />
            
            <Route path="/get-involved/donate" element={<SupportContribute />} />
            <Route path="/get-involved/surveys" element={<Surveys />} />
            <Route path="/get-involved/faq" element={<FAQ />} />
            <Route path="/media" element={<Media />} />
            <Route path="/media/photos" element={<Media />} />
            <Route path="/media/videos" element={<Media />} />
            <Route path="/media/social" element={<Media />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="ai-assistant" element={<AIAssistant />} />
              <Route path="blog" element={<BlogManager />} />
              <Route path="events" element={<EventsManager />} />
              <Route path="meetings" element={<MeetingsManager />} />
              <Route path="resources" element={<ResourcesManager />} />
              <Route path="announcements" element={<AnnouncementsManager />} />
              <Route path="ads" element={<AdsManager />} />
              <Route path="media" element={<MediaLibraryManager />} />
              <Route path="feedback" element={<FeedbackViewer />} />
              <Route path="newsletter" element={<NewsletterViewer />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="notifications" element={<NotificationSettings />} />
              
              <Route path="volunteers" element={<VolunteerManager />} />
              <Route path="pages" element={<PagesManager />} />
              <Route path="seo-analyzer" element={<SEOAnalyzer />} />
              <Route path="advertise" element={<AdvertiseManager />} />
              <Route path="leadership" element={<LeadershipManager />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
