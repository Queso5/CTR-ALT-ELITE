import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import KanbanBoard from "./components/KanbanBoard";
import ProjectDetails from "./components/ProjectDetails";
// import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
// import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";
import RegisterPage from "./components/RegisterPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/dashboard" element={<KanbanBoard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/project/:index" element={<ProjectDetails />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
