
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-red-500 mb-4">
        <ShieldAlert size={64} />
      </div>
      <h1 className="text-3xl font-bold mb-2">Acceso no autorizado</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        No tienes los permisos necesarios para acceder a esta sección.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate(-1)}>Volver</Button>
        <Button variant="outline" onClick={() => navigate("/")}>Ir al inicio</Button>
      </div>
    </div>
  );
}
