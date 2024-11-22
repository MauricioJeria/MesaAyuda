export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  resuelto: boolean;
  createdAt: string;
  location?: string;
  attachments?: any[];
}
