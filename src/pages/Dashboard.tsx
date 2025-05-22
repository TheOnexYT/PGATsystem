
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Database, Ticket, AlertTriangle, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";

// Datos de ejemplo para las gráficas
const activityData = [
  { name: 'Lun', activos: 40, tickets: 24 },
  { name: 'Mar', activos: 30, tickets: 13 },
  { name: 'Mié', activos: 20, tickets: 38 },
  { name: 'Jue', activos: 27, tickets: 17 },
  { name: 'Vie', activos: 18, tickets: 25 },
  { name: 'Sáb', activos: 23, tickets: 12 },
  { name: 'Dom', activos: 34, tickets: 19 },
];

const ticketStatusData = [
  { name: 'Abiertos', value: 42, color: '#f97316' },
  { name: 'En progreso', value: 28, color: '#3b82f6' },
  { name: 'Resueltos', value: 89, color: '#16a34a' },
];

const inventarioData = [
  { id: 1, nombre: 'Laptop Dell XPS 13', tipo: 'Computadora', estado: 'Activo', ubicacion: 'Oficina central' },
  { id: 2, nombre: 'Monitor LG 27"', tipo: 'Monitor', estado: 'Activo', ubicacion: 'Oficina central' },
  { id: 3, nombre: 'iPhone 13 Pro', tipo: 'Móvil', estado: 'Mantenimiento', ubicacion: 'Soporte técnico' },
  { id: 4, nombre: 'Servidor HP ProLiant', tipo: 'Servidor', estado: 'Activo', ubicacion: 'Sala de servidores' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">Generar reporte</Button>
          <Button>Actualizar datos</Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stats-card">
          <CardContent className="p-6 flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
              <Database className="text-blue-600 dark:text-blue-300" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Activos totales</p>
              <h3 className="text-2xl font-bold">1,284</h3>
              <p className="text-xs text-green-600 dark:text-green-400">+3% esta semana</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-6 flex items-center">
            <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mr-4">
              <AlertTriangle className="text-amber-600 dark:text-amber-300" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alertas activas</p>
              <h3 className="text-2xl font-bold">24</h3>
              <p className="text-xs text-red-600 dark:text-red-400">+12% esta semana</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-6 flex items-center">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mr-4">
              <Ticket className="text-indigo-600 dark:text-indigo-300" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tickets abiertos</p>
              <h3 className="text-2xl font-bold">42</h3>
              <p className="text-xs text-amber-600 dark:text-amber-400">-5% esta semana</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="stats-card">
          <CardContent className="p-6 flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
              <CheckCircle className="text-green-600 dark:text-green-300" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Mantenimientos</p>
              <h3 className="text-2xl font-bold">18</h3>
              <p className="text-xs text-green-600 dark:text-green-400">A tiempo</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Actividad semanal</CardTitle>
            <CardDescription>Nuevos activos y tickets registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activos" name="Activos" fill="#3b82f6" />
                <Bar dataKey="tickets" name="Tickets" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Estado de tickets</CardTitle>
            <CardDescription>Distribución de tickets por estado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ticketStatusData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                    <div className="h-2.5 rounded-full transition-all duration-500" 
                         style={{ width: `${(item.value / 150) * 100}%`, backgroundColor: item.color }}></div>
                  </div>
                  <div className="flex items-center justify-between min-w-[100px]">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-bold">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 space-y-2">
              <h4 className="font-medium">Tickets recientes</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <span className="font-medium">TICKET-1824</span>
                  <span className="text-sm px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded">Abierto</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <span className="font-medium">TICKET-1823</span>
                  <span className="text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">En progreso</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <span className="font-medium">TICKET-1822</span>
                  <span className="text-sm px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">Resuelto</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Assets */}
      <Card>
        <CardHeader>
          <CardTitle>Activos recientes</CardTitle>
          <CardDescription>Últimos activos registrados o actualizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="pb-2 font-medium">ID</th>
                  <th className="pb-2 font-medium">Nombre</th>
                  <th className="pb-2 font-medium">Tipo</th>
                  <th className="pb-2 font-medium">Estado</th>
                  <th className="pb-2 font-medium">Ubicación</th>
                </tr>
              </thead>
              <tbody>
                {inventarioData.map((item) => (
                  <tr key={item.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 text-sm">{item.id}</td>
                    <td className="py-3 text-sm font-medium">{item.nombre}</td>
                    <td className="py-3 text-sm">{item.tipo}</td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.estado === 'Activo' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                          : 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                      }`}>
                        {item.estado}
                      </span>
                    </td>
                    <td className="py-3 text-sm">{item.ubicacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Button variant="link">Ver todos los activos →</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
