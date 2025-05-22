
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Inventario from "./pages/Inventario";
import InventarioComputadores from "./pages/inventario/InventarioComputadores";
import InventarioMonitores from "./pages/inventario/InventarioMonitores";
import InventarioImpresoras from "./pages/inventario/InventarioImpresoras";
import InventarioCelulares from "./pages/inventario/InventarioCelulares";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import Tickets from "./pages/Tickets";
import Projects from "./pages/Projects";
import Knowledge from "./pages/Knowledge";
import Workflows from "./pages/Workflows";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Unauthorized";

// Create QueryClient outside of the component
const queryClient = new QueryClient();

const App = () => {
  // Move the hook inside the component function
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventario" element={<Inventario />} />
                <Route path="/inventario/computadores" element={<InventarioComputadores />} />
                <Route path="/inventario/monitores" element={<InventarioMonitores />} />
                <Route path="/inventario/impresoras" element={<InventarioImpresoras />} />
                <Route path="/inventario/celulares" element={<InventarioCelulares />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/proyectos" element={<Projects />} />
                <Route path="/conocimiento" element={<Knowledge />} />
                <Route path="/flujos" element={<Workflows />} />
                <Route path="/reportes" element={<Reports />} />
                <Route path="/notificaciones" element={<Notifications />} />
                <Route path="/perfil" element={<UserProfile />} />
                
                {/* Admin-only routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/configuracion" element={<Settings />} />
                  <Route path="/empresas" element={<div className="p-8">Página de empresas</div>} />
                  <Route path="/usuarios" element={<div className="p-8">Gestión de usuarios</div>} />
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
