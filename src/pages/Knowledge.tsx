
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Book, FileText, Folder } from "lucide-react";

export default function Knowledge() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Base de Conocimiento</h1>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input className="pl-10" placeholder="Buscar en la base de conocimiento..." />
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Folder className="mr-2 h-5 w-5 text-blue-500" />
              Guías de configuración
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-gray-400" />
                <a href="#" className="text-blue-500 hover:underline">Configuración de impresoras en red</a>
              </li>
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-gray-400" />
                <a href="#" className="text-blue-500 hover:underline">Instalación del cliente VPN</a>
              </li>
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-gray-400" />
                <a href="#" className="text-blue-500 hover:underline">Configuración de acceso remoto</a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Folder className="mr-2 h-5 w-5 text-green-500" />
              Solución de problemas comunes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-gray-400" />
                <a href="#" className="text-blue-500 hover:underline">Solución a problemas de red</a>
              </li>
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-gray-400" />
                <a href="#" className="text-blue-500 hover:underline">Errores comunes de Windows</a>
              </li>
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-gray-400" />
                <a href="#" className="text-blue-500 hover:underline">Problemas de acceso al correo</a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5 text-purple-500" />
              Manuales de usuario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-gray-400" />
                <a href="#" className="text-blue-500 hover:underline">Manual del sistema CRM</a>
              </li>
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-gray-400" />
                <a href="#" className="text-blue-500 hover:underline">Guía de usuario ERP</a>
              </li>
              <li className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-gray-400" />
                <a href="#" className="text-blue-500 hover:underline">Manual de herramientas ofimáticas</a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
