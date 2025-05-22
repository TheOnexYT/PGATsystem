
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Projects() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Proyectos</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="bg-blue-50">
            <CardTitle>Migración de servidores</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-4 text-sm">
              Migración de servidores locales a la nube para mejorar la escalabilidad.
            </p>
            <div className="text-xs text-gray-500">
              Estado: <span className="text-blue-500 font-medium">En progreso</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="bg-green-50">
            <CardTitle>Actualización de equipos</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-4 text-sm">
              Renovación de equipos portátiles del departamento comercial.
            </p>
            <div className="text-xs text-gray-500">
              Estado: <span className="text-green-500 font-medium">Completado</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="bg-yellow-50">
            <CardTitle>Implementación VPN</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-4 text-sm">
              Configuración de VPN para acceso remoto seguro a recursos corporativos.
            </p>
            <div className="text-xs text-gray-500">
              Estado: <span className="text-yellow-500 font-medium">Planificación</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
