import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Services from "./pages/Services";
import DigitalMarketing from "./pages/DigitalMarketing";
import Blog from "./pages/Blog";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import RequestDemo from "./pages/RequestDemo";
import NotFound from "./pages/NotFound";
import CompDashboard from "./components/companyDashboard/CompDashboard";
import Employees from "./components/companyDashboard/Employees";
import EmpDashboard from "./components/companyDashboard/EmpDashboard";
import Dashboard from "./pages/Dashboard";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/services" element={<Services />} />
          <Route path="/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
           <Route path="/compDashboard" element={<CompDashboard />} />
          <Route path="/request-demo" element={<RequestDemo />} />
           <Route path="/employees" element={<Employees/>} />
            <Route path="/empdashboard" element={<EmpDashboard/>} />

          {/* Catch-all route for 404 Not Found */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
