
export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketStatus = 'open' | 'in-progress' | 'closed';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  assignedTo: string | null;
  creator: string;
  category?: string;
  company?: string;
  attachments?: string[];
  comments?: TicketComment[];
}

export interface TicketComment {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
}
