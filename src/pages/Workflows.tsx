
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Workflows() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Flujos de Trabajo</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Proceso de soporte técnico</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-40 bg-gray-50">
            <p className="text-gray-500">Diagrama del flujo de trabajo de soporte técnico</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Proceso de aprovisionamiento de equipos</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-40 bg-gray-50">
            <p className="text-gray-500">Diagrama del flujo de trabajo de aprovisionamiento</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Proceso de gestión de incidentes</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-40 bg-gray-50">
            <p className="text-gray-500">Diagrama del flujo de trabajo de gestión de incidentes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
