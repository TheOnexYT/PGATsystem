
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart } from "lucide-react";

export default function Reports() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Reportes</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5" />
              Tickets por estado
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Gráfico de tickets por estado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              Distribución de activos
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Gráfico de distribución de activos</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas generales</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40 bg-gray-50">
          <p className="text-gray-500">Próximamente: Panel de estadísticas generales</p>
        </CardContent>
      </Card>
    </div>
  );
}
