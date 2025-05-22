
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-6 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900">
            <AlertTriangle size={48} className="text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Oops! Página no encontrada
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Button asChild className="w-full sm:w-auto">
          <a href="/">Volver al Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
