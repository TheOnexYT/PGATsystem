
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, X, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { useTicketStore } from "@/store/ticketStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function TicketFilters() {
  const { filters, setFilter, resetFilters, tickets } = useTicketStore();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Extraer valores únicos para los filtros
  const uniqueCategories = Array.from(
    new Set(tickets.map((ticket) => ticket.category).filter(Boolean) as string[])
  );
  
  const uniqueCompanies = Array.from(
    new Set(tickets.map((ticket) => ticket.company).filter(Boolean) as string[])
  );
  
  const uniqueAssignees = Array.from(
    new Set(tickets.map((ticket) => ticket.assignedTo).filter((assignee) => assignee !== null) as string[])
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter("search", e.target.value);
  };

  const handleReset = () => {
    resetFilters();
    setIsFiltersOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar tickets..."
            className="pl-8"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filtros
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filtrar tickets</SheetTitle>
              <SheetDescription>
                Ajuste los filtros para encontrar los tickets que necesita.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Estado</h3>
                <Select 
                  value={filters.status} 
                  onValueChange={(value) => setFilter("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="open">Abiertos</SelectItem>
                    <SelectItem value="in-progress">En progreso</SelectItem>
                    <SelectItem value="closed">Cerrados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Prioridad</h3>
                <Select 
                  value={filters.priority} 
                  onValueChange={(value) => setFilter("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {uniqueCategories.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Categoría</h3>
                  <Select 
                    value={filters.category} 
                    onValueChange={(value) => setFilter("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {uniqueCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {uniqueCompanies.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Empresa</h3>
                  <Select 
                    value={filters.company} 
                    onValueChange={(value) => setFilter("company", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {uniqueCompanies.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Asignado a</h3>
                <Select 
                  value={filters.assignee} 
                  onValueChange={(value) => setFilter("assignee", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por asignación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="unassigned">Sin asignar</SelectItem>
                    {uniqueAssignees.map((assignee) => (
                      <SelectItem key={assignee} value={assignee}>
                        {assignee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={handleReset} className="mr-2">
                <X className="h-4 w-4 mr-2" />
                Reiniciar filtros
              </Button>
              <Button onClick={() => setIsFiltersOpen(false)}>
                Aplicar filtros
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Filtros rápidos para estados */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filters.status === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('status', 'all')}
        >
          Todos
        </Button>
        <Button
          variant={filters.status === 'open' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('status', 'open')}
          className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
        >
          <AlertCircle className="h-3 w-3 mr-1" />
          Abiertos
        </Button>
        <Button
          variant={filters.status === 'in-progress' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('status', 'in-progress')}
          className="text-yellow-600 border-yellow-200 bg-yellow-50 hover:bg-yellow-100 hover:text-yellow-700"
        >
          <Clock className="h-3 w-3 mr-1" />
          En progreso
        </Button>
        <Button
          variant={filters.status === 'closed' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('status', 'closed')}
          className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700"
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          Cerrados
        </Button>
      </div>
    </div>
  );
}
