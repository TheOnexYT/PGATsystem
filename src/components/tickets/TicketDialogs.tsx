
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTicketStore } from "@/store/ticketStore";
import { TicketForm } from "./TicketForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@/models/Ticket";

// Componente para ver los detalles de un ticket
export function ViewTicketDialog() {
  const { isViewDialogOpen, closeViewDialog, currentTicket } = useTicketStore();

  if (!currentTicket) return null;

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

  const statusInfo = statusConfig[currentTicket.status];

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
        return tipo || 'No especificado';
    }
  };

  return (
    <Dialog open={isViewDialogOpen} onOpenChange={closeViewDialog}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getTipoLabel(currentTicket.category || currentTicket.title)}
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium border ${statusInfo.color}`}>
              {statusInfo.icon}
              {statusInfo.label}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="font-medium mb-1">ID:</p>
            <p className="text-gray-700 text-sm bg-gray-50 p-2 rounded">{currentTicket.id}</p>
          </div>

          <div>
            <p className="font-medium mb-1">Descripción:</p>
            <div className="text-gray-700 bg-gray-50 p-3 rounded">
              {currentTicket.description}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium mb-1">Prioridad:</p>
              <Badge variant={
                currentTicket.priority === "high" ? "destructive" : 
                currentTicket.priority === "medium" ? "default" : 
                "outline"
              }>
                {
                  currentTicket.priority === "high" ? "Alta" : 
                  currentTicket.priority === "medium" ? "Media" : 
                  "Baja"
                }
              </Badge>
            </div>
            <div>
              <p className="font-medium mb-1">Categoría:</p>
              <p className="text-gray-700">{getTipoLabel(currentTicket.category)}</p>
            </div>
            <div>
              <p className="font-medium mb-1">Usuario:</p>
              <p className="text-gray-700">{currentTicket.creator || "No especificado"}</p>
            </div>
            <div>
              <p className="font-medium mb-1">Fecha de creación:</p>
              <p className="text-gray-700">{formatDate(currentTicket.createdAt)}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={closeViewDialog}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Componente para crear un ticket
export function CreateTicketDialog() {
  const { 
    isCreateDialogOpen, 
    closeCreateDialog, 
    createTicket, 
    isLoading 
  } = useTicketStore();
  const { user } = useAuthStore();

  const handleCreateTicket = async (formData: any) => {
    try {
      // Format the data according to the API requirements
      const pqrData = {
        tipo: formData.tipo,
        descripcion: formData.descripcion,
        usuario: user?.id || user?.name || 'Usuario desconocido',
        estado: 'pendiente',
        fechaCreacion: new Date().toISOString()
      };
      
      console.log("Creating PQR with data:", pqrData);
      await createTicket(pqrData as any, pqrData.usuario);
      toast.success("PQR creado exitosamente");
      closeCreateDialog();
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Error al crear el PQR");
    }
  };

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={closeCreateDialog}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Crear nueva PQR</DialogTitle>
          <DialogDescription>
            Complete el formulario para crear una nueva PQR.
          </DialogDescription>
        </DialogHeader>
        <TicketForm onSubmit={handleCreateTicket} onCancel={closeCreateDialog} isSubmitting={isLoading} />
      </DialogContent>
    </Dialog>
  );
}

// Componente para editar un ticket
export function EditTicketDialog() {
  const { isEditDialogOpen, closeEditDialog, updateTicket, currentTicket } = useTicketStore();

  const handleSubmit = async (data: any) => {
    if (currentTicket) {
      try {
        await updateTicket(currentTicket.id, data);
        toast.success("PQR actualizada correctamente");
        closeEditDialog();
      } catch (error) {
        console.error("Error updating ticket:", error);
        toast.error("Error al actualizar la PQR");
      }
    }
  };

  if (!currentTicket) return null;

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={closeEditDialog}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Editar PQR</DialogTitle>
          <DialogDescription>
            Modifique los detalles de la PQR según sea necesario.
          </DialogDescription>
        </DialogHeader>
        <TicketForm 
          ticket={currentTicket} 
          onSubmit={handleSubmit} 
          onCancel={closeEditDialog} 
        />
      </DialogContent>
    </Dialog>
  );
}

// Componente para confirmar la eliminación de un ticket
export function DeleteTicketDialog() {
  const { 
    isDeleteDialogOpen, 
    closeDeleteDialog, 
    deleteTicket, 
    currentTicket,
    isLoading
  } = useTicketStore();

  if (!currentTicket) return null;

  const handleDelete = async () => {
    try {
      console.log(`Intentando eliminar PQR con ID: ${currentTicket.id}`);
      await deleteTicket(currentTicket.id);
      toast.success("PQR eliminada correctamente");
      closeDeleteDialog();
    } catch (error) {
      console.error("Error al eliminar PQR:", error);
      toast.error("Error al eliminar la PQR. Inténtelo de nuevo.");
    }
  };

  // Helper function to safely get a short ID
  const getShortId = (id: string | undefined) => {
    if (!id) return '...';
    return id.length > 8 ? id.substring(0, 8) + '...' : id;
  };

  // Determinar el tipo de PQR para mostrar adecuadamente
  const getTipoLabel = (tipo: string | undefined) => {
    if (!tipo) return 'PQR';
    
    switch (tipo.toLowerCase()) {
      case 'queja':
        return 'Queja';
      case 'petición':
      case 'peticion':
        return 'Petición';
      case 'reclamo':
        return 'Reclamo';
      default:
        return 'PQR';
    }
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Está seguro que desea eliminar la {getTipoLabel(currentTicket?.category || currentTicket?.title)} con ID {getShortId(currentTicket?.id)}?
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between gap-2 sm:justify-end">
          <Button variant="outline" onClick={closeDeleteDialog} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
