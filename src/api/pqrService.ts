
import { apiClient } from './apiClient';
import { Ticket, TicketComment } from '@/models/Ticket';

export interface PqrTicket {
  _id: string;
  usuario: string;
  tipo: string;
  descripcion: string;
  estado: string;
  fechaCreacion: string;
  __v: number;
}

// Transform backend ticket format to our app's format
const mapPqrToTicket = (pqr: any): Ticket => {
  return {
    id: pqr._id || pqr.id,
    title: pqr.tipo || "",
    description: pqr.descripcion,
    status: mapApiStatus(pqr.estado),
    priority: "medium", // Default priority as it's not in the API
    createdAt: pqr.fechaCreacion,
    assignedTo: pqr.assignedTo || null,
    creator: pqr.usuario,
    category: pqr.tipo || "",
    company: pqr.empresa || ""
  };
};

// Map our app's ticket format to API's PQR format
const mapTicketToPqr = (ticketData: Partial<Ticket>): any => {
  return {
    tipo: ticketData.category || ticketData.title,
    descripcion: ticketData.description,
    estado: mapStatusToApi(ticketData.status || 'open'),
    // We don't map other fields as they're not used in the API
  };
};

// Map API status to our app's status format
const mapApiStatus = (apiStatus: string): 'open' | 'in-progress' | 'closed' => {
  switch (apiStatus?.toLowerCase()) {
    case 'en_proceso':
    case 'en proceso':
      return 'in-progress';
    case 'completada':
    case 'cerrada':  
      return 'closed';
    case 'pendiente':
    default:
      return 'open';
  }
};

// Map our app's status to API status format
const mapStatusToApi = (status: string): string => {
  switch (status) {
    case 'in-progress':
      return 'en_proceso';
    case 'closed':
      return 'completada';
    case 'open':
    default:
      return 'pendiente';
  }
};

// Directly use PQR data format for creating a ticket
const preparePqrData = (data: any): any => {
  return {
    usuario: data.usuario || '',
    tipo: data.tipo || '',
    descripcion: data.descripcion || '',
    estado: data.estado || 'pendiente',
    fechaCreacion: data.fechaCreacion || new Date().toISOString()
  };
};

export const pqrService = {
  async getAllTickets(): Promise<Ticket[]> {
    try {
      const response = await apiClient.get('/pqr/todas');
      console.log("API response data:", response.data);
      return Array.isArray(response.data) ? response.data.map(mapPqrToTicket) : [];
    } catch (error) {
      console.error('Get all tickets error:', error);
      throw error;
    }
  },

  async getTicketById(id: string): Promise<Ticket> {
    try {
      const response = await apiClient.get(`/pqr/${id}`);
      return mapPqrToTicket(response.data);
    } catch (error) {
      console.error('Get ticket by id error:', error);
      throw error;
    }
  },

  async createTicket(ticketData: any): Promise<Ticket> {
    try {
      // Prepare data in the format the API expects
      const pqrData = preparePqrData(ticketData);
      
      // Log the data being sent to the API
      console.log("Creating PQR with data:", JSON.stringify(pqrData, null, 2));
      
      const response = await apiClient.post('/pqr', pqrData);
      console.log("API create response:", response.data);
      return mapPqrToTicket(response.data);
    } catch (error) {
      console.error('Create ticket error:', error);
      throw error;
    }
  },

  async updateTicket(id: string, ticketData: Partial<Ticket>): Promise<Ticket> {
    try {
      // If only updating status, use the specific endpoint
      if (Object.keys(ticketData).length === 1 && ticketData.status) {
        console.log(`Updating ticket status: ${id} to ${mapStatusToApi(ticketData.status)}`);
        const response = await apiClient.patch(`/pqr/${id}/estado`, {
          nuevoEstado: mapStatusToApi(ticketData.status)
        });
        return mapPqrToTicket(response.data);
      } else {
        // For full updates
        const pqrData = mapTicketToPqr(ticketData);
        const response = await apiClient.patch(`/pqr/${id}`, pqrData);
        return mapPqrToTicket(response.data);
      }
    } catch (error) {
      console.error('Update ticket error:', error);
      throw error;
    }
  },

  async deleteTicket(id: string): Promise<void> {
    try {
      console.log(`Eliminando PQR con ID: ${id}`);
      // Utilizamos la URL específica proporcionada
      await apiClient.delete(`/pqr/${id}`);
      console.log(`PQR con ID ${id} eliminada exitosamente`);
    } catch (error) {
      console.error('Error al eliminar PQR:', error);
      throw error;
    }
  },

  async getComments(ticketId: string): Promise<TicketComment[]> {
    try {
      const response = await apiClient.get(`/pqr/${ticketId}/comentarios`);
      return response.data.map((comment: any) => ({
        id: comment._id || comment.id,
        content: comment.contenido || comment.content,
        createdAt: comment.fechaCreacion || comment.created_at,
        createdBy: comment.usuario || comment.created_by
      }));
    } catch (error) {
      console.error('Get comments error:', error);
      throw error;
    }
  },

  async addComment(ticketId: string, content: string): Promise<TicketComment> {
    try {
      const response = await apiClient.post(`/pqr/${ticketId}/comentario`, { 
        contenido: content
      });
      return {
        id: response.data._id || response.data.id,
        content: response.data.contenido || response.data.content,
        createdAt: response.data.fechaCreacion || response.data.created_at,
        createdBy: response.data.usuario || response.data.created_by
      };
    } catch (error) {
      console.error('Add comment error:', error);
      throw error;
    }
  }
};
