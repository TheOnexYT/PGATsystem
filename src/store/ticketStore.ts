import { create } from 'zustand';
import { Ticket, TicketPriority, TicketStatus } from '@/models/Ticket';
import { pqrService } from '@/api/pqrService';

interface TicketFilters {
  search: string;
  status: TicketStatus | 'all';
  priority: TicketPriority | 'all';
  category: string | 'all';
  assignee: string | 'all';
  company: string | 'all';
}

interface TicketState {
  tickets: Ticket[];
  isLoading: boolean;
  error: string | null;
  filters: TicketFilters;
  isCreateDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  isViewDialogOpen: boolean;
  currentTicket: Ticket | null;
  
  // Acciones para filtros
  setFilter: (key: keyof TicketFilters, value: string) => void;
  resetFilters: () => void;
  
  // Acciones para diálogos
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  openEditDialog: (ticket: Ticket) => void;
  closeEditDialog: () => void;
  openDeleteDialog: (ticket: Ticket) => void;
  closeDeleteDialog: () => void;
  openViewDialog: (ticket: Ticket) => void;
  closeViewDialog: () => void;
  
  // Acciones de carga
  fetchTickets: () => Promise<void>;
  
  // Acciones CRUD
  createTicket: (ticket: Omit<Ticket, 'id' | 'createdAt'>, creatorName: string) => Promise<void>;
  updateTicket: (id: string, ticketData: Partial<Ticket>) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
  
  // Métodos auxiliares
  getFilteredTickets: () => Ticket[];
}

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: [],
  isLoading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all',
    assignee: 'all',
    company: 'all',
  },
  isCreateDialogOpen: false,
  isEditDialogOpen: false,
  isDeleteDialogOpen: false,
  isViewDialogOpen: false,
  currentTicket: null,

  // Implementación de acciones para filtros
  setFilter: (key, value) => 
    set(state => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    })),
  
  resetFilters: () => 
    set({
      filters: {
        search: '',
        status: 'all',
        priority: 'all',
        category: 'all',
        assignee: 'all',
        company: 'all',
      }
    }),
  
  // Implementación de acciones para diálogos
  openCreateDialog: () => set({ isCreateDialogOpen: true }),
  closeCreateDialog: () => set({ isCreateDialogOpen: false }),
  
  openEditDialog: (ticket) => set({ 
    isEditDialogOpen: true,
    currentTicket: ticket
  }),
  closeEditDialog: () => set({ 
    isEditDialogOpen: false,
    currentTicket: null
  }),
  
  openDeleteDialog: (ticket) => set({ 
    isDeleteDialogOpen: true,
    currentTicket: ticket
  }),
  closeDeleteDialog: () => set({ 
    isDeleteDialogOpen: false,
    currentTicket: null
  }),
  
  openViewDialog: (ticket) => set({ 
    isViewDialogOpen: true,
    currentTicket: ticket
  }),
  closeViewDialog: () => set({ 
    isViewDialogOpen: false,
    currentTicket: null
  }),
  
  // Implementación de acciones de carga
  fetchTickets: async () => {
    set({ isLoading: true, error: null });
    try {
      const tickets = await pqrService.getAllTickets();
      set({ tickets, isLoading: false });
    } catch (error) {
      console.error('Error fetchings tickets:', error);
      set({ error: 'Error al cargar tickets', isLoading: false });
    }
  },
  
  // Implementación de acciones CRUD
  createTicket: async (ticketData, creatorName) => {
    set({ isLoading: true, error: null });
    try {
      console.log("In store, creating ticket with data:", ticketData);
      
      // Pass the data directly to the service as it's already formatted correctly
      const newTicket = await pqrService.createTicket(ticketData);
      
      set(state => ({
        tickets: [...state.tickets, newTicket],
        isLoading: false,
        isCreateDialogOpen: false
      }));
    } catch (error) {
      console.error('Error creating ticket:', error);
      set({ error: 'Error al crear ticket', isLoading: false });
    }
  },
  
  updateTicket: async (id, ticketData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTicket = await pqrService.updateTicket(id, ticketData);
      
      set(state => ({
        tickets: state.tickets.map(ticket => 
          ticket.id === id ? updatedTicket : ticket
        ),
        isLoading: false,
        isEditDialogOpen: false,
        currentTicket: null
      }));
    } catch (error) {
      console.error('Error updating ticket:', error);
      set({ error: 'Error al actualizar ticket', isLoading: false });
    }
  },
  
  deleteTicket: async (id) => {
    set({ isLoading: true, error: null });
    try {
      console.log(`Store: Intentando eliminar PQR con ID: ${id}`);
      await pqrService.deleteTicket(id);
      
      set(state => ({
        tickets: state.tickets.filter(ticket => ticket.id !== id),
        isLoading: false,
        isDeleteDialogOpen: false,
        currentTicket: null
      }));
      
      console.log(`Store: PQR con ID ${id} eliminada exitosamente`);
    } catch (error) {
      console.error('Error al eliminar PQR:', error);
      set({ error: 'Error al eliminar PQR', isLoading: false });
      // Mantenemos el diálogo abierto para que el usuario pueda intentar de nuevo
      throw error;
    }
  },
  
  // Métodos auxiliares
  getFilteredTickets: () => {
    const { tickets, filters } = get();
    
    return tickets.filter(ticket => {
      // Filtro por texto de búsqueda
      const searchMatch = filters.search === '' || 
        ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.id.toLowerCase().includes(filters.search.toLowerCase());
      
      // Filtro por estado
      const statusMatch = filters.status === 'all' || ticket.status === filters.status;
      
      // Filtro por prioridad
      const priorityMatch = filters.priority === 'all' || ticket.priority === filters.priority;
      
      // Filtro por categoría
      const categoryMatch = filters.category === 'all' || ticket.category === filters.category;
      
      // Filtro por asignado
      const assigneeMatch = filters.assignee === 'all' || 
        (filters.assignee === 'unassigned' && ticket.assignedTo === null) ||
        (ticket.assignedTo && ticket.assignedTo === filters.assignee);
      
      // Filtro por empresa
      const companyMatch = filters.company === 'all' || ticket.company === filters.company;
      
      return searchMatch && statusMatch && priorityMatch && 
             categoryMatch && assigneeMatch && companyMatch;
    });
  }
}));
