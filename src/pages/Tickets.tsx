import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCcw } from "lucide-react";
import { useTicketStore } from "@/store/ticketStore";
import { TicketCard } from "@/components/tickets/TicketCard";
import { TicketFilters } from "@/components/tickets/TicketFilters";
import { 
  ViewTicketDialog, 
  CreateTicketDialog, 
  EditTicketDialog, 
  DeleteTicketDialog 
} from "@/components/tickets/TicketDialogs";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/components/ui/use-toast";

export default function Tickets() {
  const { 
    getFilteredTickets, 
    openCreateDialog,
    fetchTickets,
    isLoading,
    error
  } = useTicketStore();
  
  const { user } = useAuthStore();
  const isAdmin = true;
  const filteredTickets = getFilteredTickets();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("Fetching tickets...");
    fetchTickets().catch(err => {
      console.error("Error fetching tickets:", err);
      toast({
        title: "Error",
        description: "No se pudieron cargar los PQRs. Verifica que hayas iniciado sesión correctamente.",
        variant: "destructive"
      });
    });
  }, [fetchTickets, toast]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">PQRs</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => fetchTickets()} disabled={isLoading}>
            <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" /> Nueva PQR
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <TicketFilters />
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center p-8 border rounded-md">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-8 mb-4 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
            <p>Cargando PQRs...</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-center p-8 text-red-500 border border-red-300 rounded-lg">
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => fetchTickets()}
          >
            Reintentar
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          ) : (
            <div className="text-center p-8 border rounded-lg">
              <p className="text-gray-500">No se encontraron PQRs</p>
            </div>
          )}
        </div>
      )}

      {/* Dialogs for CRUD operations */}
      <ViewTicketDialog />
      <CreateTicketDialog />
      <EditTicketDialog />
      <DeleteTicketDialog />
    </div>
  );
}
