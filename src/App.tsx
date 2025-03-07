
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
          <Route path="/history" element={<NotFound />} />
          <Route path="/history/heritage" element={<NotFound />} />
          <Route path="/history/florida-artillery" element={<NotFound />} />
          
          {/* Regimental Coin route */}
          <Route path="/regimental-coin" element={<NotFound />} />
          
          {/* Activities routes */}
          <Route path="/activities" element={<NotFound />} />
          <Route path="/activities/events" element={<NotFound />} />
          <Route path="/activities/community" element={<NotFound />} />
          <Route path="/activities/events/st-barbaras-day" element={<NotFound />} />
          <Route path="/activities/events/softball" element={<NotFound />} />
          <Route path="/activities/events/golf" element={<NotFound />} />
          <Route path="/activities/events/5k" element={<NotFound />} />
          
          {/* Newsletter routes */}
          <Route path="/newsletter" element={<NotFound />} />
          <Route path="/newsletter/latest" element={<NotFound />} />
          <Route path="/newsletter/archive" element={<NotFound />} />
          
          {/* Support routes */}
          <Route path="/support" element={<NotFound />} />
          <Route path="/support/donate" element={<NotFound />} />
          <Route path="/support/volunteer" element={<NotFound />} />
          
          {/* Photos routes */}
          <Route path="/photos" element={<NotFound />} />
          <Route path="/photos/gallery" element={<NotFound />} />
          <Route path="/photos/historical" element={<NotFound />} />
          
          {/* Membership route */}
          <Route path="/membership" element={<NotFound />} />
          
          {/* More routes */}
          <Route path="/more" element={<NotFound />} />
          <Route path="/more/contact" element={<NotFound />} />
          <Route path="/more/faqs" element={<NotFound />} />
          
          {/* Legal routes */}
          <Route path="/privacy-policy" element={<NotFound />} />
          <Route path="/terms-of-service" element={<NotFound />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
