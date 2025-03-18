
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// History routes
import History from "./pages/History";
import Heritage from "./pages/Heritage";
import FloridaArtillery from "./pages/FloridaArtillery";
import StBarbara from "./pages/StBarbara";

// Regimental Coin route
import RegimentalCoin from "./pages/RegimentalCoin";

// Activities routes
import Activities from "./pages/Activities";
import Events from "./pages/Events";
import Community from "./pages/Community";
import StBarbarasDay from "./pages/StBarbarasDay";
import Softball from "./pages/Softball";
import Golf from "./pages/Golf";
import Run from "./pages/Run";

// Newsletter routes
import Newsletter from "./pages/Newsletter";
import LatestNewsletter from "./pages/LatestNewsletter";
import NewsletterArchive from "./pages/NewsletterArchive";

// Support routes
import Support from "./pages/Support";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";

// Photos routes
import Photos from "./pages/Photos";
import Gallery from "./pages/Gallery";
import HistoricalPhotos from "./pages/HistoricalPhotos";

// Membership route
import Membership from "./pages/Membership";

// More routes
import More from "./pages/More";
import Contact from "./pages/Contact";
import Faqs from "./pages/Faqs";

// Legal routes
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* History routes */}
          <Route path="/history" element={<History />} />
          <Route path="/history/heritage" element={<Heritage />} />
          <Route path="/history/florida-artillery" element={<FloridaArtillery />} />
          <Route path="/history/st-barbara" element={<StBarbara />} />
          
          {/* Regimental Coin route */}
          <Route path="/regimental-coin" element={<RegimentalCoin />} />
          
          {/* Activities routes */}
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/events" element={<Events />} />
          <Route path="/activities/community" element={<Community />} />
          <Route path="/activities/events/st-barbaras-day" element={<StBarbarasDay />} />
          <Route path="/activities/events/softball" element={<Softball />} />
          <Route path="/activities/events/golf" element={<Golf />} />
          <Route path="/activities/events/5k" element={<Run />} />
          
          {/* Newsletter routes */}
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/newsletter/latest" element={<LatestNewsletter />} />
          <Route path="/newsletter/archive" element={<NewsletterArchive />} />
          
          {/* Support routes */}
          <Route path="/support" element={<Support />} />
          <Route path="/support/donate" element={<Donate />} />
          <Route path="/support/volunteer" element={<Volunteer />} />
          
          {/* Photos routes */}
          <Route path="/photos" element={<Photos />} />
          <Route path="/photos/gallery" element={<Gallery />} />
          <Route path="/photos/historical" element={<HistoricalPhotos />} />
          
          {/* Membership route */}
          <Route path="/membership" element={<Membership />} />
          
          {/* More routes */}
          <Route path="/more" element={<More />} />
          <Route path="/more/contact" element={<Contact />} />
          <Route path="/more/faqs" element={<Faqs />} />
          
          {/* Legal routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
