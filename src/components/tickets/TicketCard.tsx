
import { Button } from "@/components/ui/button";
import { Ticket } from "@/models/Ticket";
import { AlertCircle, CheckCircle, Clock, MoreVertical, Edit, Trash, Eye, Check } from "lucide-react";
import { useTicketStore } from "@/store/ticketStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const { openViewDialog, openEditDialog, openDeleteDialog, updateTicket } = useTicketStore();
  const { user } = useAuthStore();
  
  // Temporarily set all users as admins since backend doesn't support roles
  const isAdmin = true;

  // Configuración para el indicador de estado
  const statusConfig = {
    "open": {
      label: "Pendiente",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      icon: <AlertCircle className="w-3 h-3" />
    },
    "in-progress": {
      label: "En proceso",
      color: "bg-yellow-50 text-yellow-700 border-yellow-200",
      icon: <Clock className="w-3 h-3" />
    },
    "closed": {
      label: "Completada",
      color: "bg-green-50 text-green-700 border-green-200",
      icon: <CheckCircle className="w-3 h-3" />
    }
  };
  
  const statusInfo = statusConfig[ticket.status];

  // Configuración para el indicador de prioridad
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Alta</Badge>;
      case 'medium':
        return <Badge>Media</Badge>;
      default:
        return <Badge variant="outline">Baja</Badge>;
    }
  };

  // Manejar cambio de estado rápido
  const handleStatusChange = async (newStatus: 'open' | 'in-progress' | 'closed') => {
    try {
      await updateTicket(ticket.id, { status: newStatus });
      toast.success(`Estado actualizado a "${statusConfig[newStatus].label}"`);
    } catch (error) {
      toast.error("Error al actualizar el estado");
      console.error("Status update error:", error);
    }
  };

  // Formatear fecha para mostrarla más claramente
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-CO', { 
        dateStyle: 'medium',
        timeStyle: 'short' 
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Determinar el tipo de PQR para mostrar adecuadamente
  const getTipoLabel = (tipo: string) => {
    switch (tipo?.toLowerCase()) {
      case 'queja':
        return 'Queja';
      case 'petición':
      case 'peticion':
        return 'Petición';
      case 'reclamo':
        return 'Reclamo';
      default:
        return tipo || '';
    }
  };
  
  // Obtener versión acortada del ID para mostrar
  const getShortId = (id: string | undefined) => {
    if (!id) return '...';
    return id.length > 8 ? id.substring(0, 8) + '...' : id;
  };

  const handleEdit = () => {
    openEditDialog(ticket);
  };

  const handleDelete = () => {
    openDeleteDialog(ticket);
  };

  return (
    <div className="relative overflow-hidden bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Barra lateral de estado */}
      <div 
        className={`absolute top-0 left-0 w-1 h-full ${
          ticket.status === 'open' ? 'bg-blue-500' :
          ticket.status === 'in-progress' ? 'bg-yellow-500' :
          'bg-green-500'
        }`}
      />
      
      <div className="p-6 pl-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{getTipoLabel(ticket.category || ticket.title)}</h3>
            <span className="text-gray-500 text-sm">ID: {getShortId(ticket.id)}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium border ${statusInfo.color}`}>
              {statusInfo.icon}
              {statusInfo.label}
            </span>
            
            {isAdmin && (
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                  onClick={handleEdit}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-100"
                  onClick={handleDelete}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openViewDialog(ticket)}>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Ver detalles</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={() => handleStatusChange('open')}
                  disabled={ticket.status === 'open'}
                >
                  <AlertCircle className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Marcar como Pendiente</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={() => handleStatusChange('in-progress')}
                  disabled={ticket.status === 'in-progress'}
                >
                  <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                  <span>Marcar como En Proceso</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={() => handleStatusChange('closed')}
                  disabled={ticket.status === 'closed'}
                >
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span>Marcar como Completada</span>
                </DropdownMenuItem>
                
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleEdit}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={handleDelete}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{ticket.description}</p>
        
        <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
          {ticket.category && (
            <div className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
              {getTipoLabel(ticket.category)}
            </div>
          )}
          {getPriorityBadge(ticket.priority)}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-6 text-xs text-gray-500">
            <div>
              <span className="font-medium">ID:</span> {ticket.id}
            </div>
            <div>
              <span className="font-medium">Creado:</span> {formatDate(ticket.createdAt)}
            </div>
            <div>
              <span className="font-medium">Usuario:</span> {ticket.creator || "N/A"}
            </div>
          </div>
          
          {/* Removed the two Edit and Delete buttons that were here */}
        </div>
      </div>
    </div>
  );
}
