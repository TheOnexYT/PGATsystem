
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useTicketStore } from "@/store/ticketStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const login = useAuthStore(state => state.login);
  const fetchTickets = useTicketStore(state => state.fetchTickets);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", { email, password });
      const success = await login(email, password);
      console.log("Login result:", success);
      
      if (success) {
        // Load tickets after successful login
        await fetchTickets();
        toast.success("Inicio de sesión exitoso");
        navigate("/dashboard");
      } else {
        toast.error("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Login error details:", error);
      toast.error("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 3.2A9 9 0 1 0 20.8 14a9 9 0 0 0-10.8-10.8z" />
                <path d="M13.4 14.8a5 5 0 0 1 7.8-5.6" />
                <path d="M6.6 9.2a5 5 0 0 0-2.2 6" />
                <path d="M12 8v4l3 2" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Registrarse
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
