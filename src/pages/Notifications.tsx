
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check } from "lucide-react";

export default function Notifications() {
  const mockNotifications = [
    {
      id: 1,
      title: "Ticket asignado",
      message: "Se te ha asignado el ticket TCK-002: Acceso a sistema",
      date: "2023-05-18T10:30:00",
      read: false
    },
    {
      id: 2,
      title: "Actualización de ticket",
      message: "El ticket TCK-001 ha sido actualizado con nueva información",
      date: "2023-05-17T15:45:00",
      read: true
    },
    {
      id: 3,
      title: "Nuevo activo registrado",
      message: "Se ha registrado un nuevo portátil en el inventario",
      date: "2023-05-16T09:20:00",
      read: true
    },
    {
      id: 4,
      title: "Alerta de mantenimiento",
      message: "Mantenimiento programado para servidores mañana a las 22:00",
      date: "2023-05-15T14:10:00",
      read: false
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Notificaciones</h1>
        <button className="text-blue-500 text-sm hover:underline flex items-center">
          <Check className="h-4 w-4 mr-1" /> Marcar todas como leídas
        </button>
      </div>
      
      <div className="space-y-4">
        {mockNotifications.map(notification => (
          <Card 
            key={notification.id} 
            className={`overflow-hidden ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
          >
            <div className="p-4">
              <div className="flex gap-3">
                <div className={`mt-1 flex-shrink-0 rounded-full p-2 ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                  <Bell className={`h-4 w-4 ${notification.read ? 'text-gray-500' : 'text-blue-500'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${notification.read ? '' : 'font-semibold'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
