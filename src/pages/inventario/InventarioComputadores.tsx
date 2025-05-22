
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  ArrowUp,
  ArrowDown,
  Server,
  Laptop
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Computador } from '@/models/InventarioTypes';

// Datos de ejemplo para computadores
const computadoresData: Computador[] = [
  {
    id: 12345,
    nombre: "Servidor Principal",
    entidad: "Empresa XYZ",
    estado: "Operativo",
    fabricante: "Dell",
    noSerie: "SN-987654321",
    tipo: "Servidor",
    modelo: "PowerEdge R740",
    so: "Ubuntu Server 22.04",
    localizacion: "Centro de Datos - Rack 12",
    ultimaAct: "2025-05-15T14:30:00Z",
    procesador: "Intel Xeon Silver 4210"
  },
  {
    id: 12346,
    nombre: "Laptop Desarrollo",
    entidad: "Empresa XYZ",
    estado: "Activo",
    fabricante: "Lenovo",
    noSerie: "LN-87654321",
    tipo: "Portátil",
    modelo: "ThinkPad T490",
    so: "Windows 11 Pro",
    localizacion: "Departamento IT - Desarrollo",
    ultimaAct: "2025-05-10T09:15:00Z",
    procesador: "Intel Core i7-10510U"
  },
  {
    id: 12347,
    nombre: "Servidor Backup",
    entidad: "Empresa ABC",
    estado: "Activo",
    fabricante: "HP",
    noSerie: "HP-45678901",
    tipo: "Servidor",
    modelo: "ProLiant DL380 Gen10",
    so: "Windows Server 2022",
    localizacion: "Centro de Datos - Rack 5",
    ultimaAct: "2025-05-12T11:45:00Z",
    procesador: "Intel Xeon Gold 6230"
  },
  {
    id: 12348,
    nombre: "Desktop Contabilidad",
    entidad: "Empresa XYZ",
    estado: "Inactivo",
    fabricante: "Dell",
    noSerie: "DL-12345678",
    tipo: "Desktop",
    modelo: "OptiPlex 7080",
    so: "Windows 10 Enterprise",
    localizacion: "Departamento Contabilidad",
    ultimaAct: "2025-04-28T16:20:00Z",
    procesador: "Intel Core i5-10500"
  },
  {
    id: 12349,
    nombre: "Laptop Gerencia",
    entidad: "Empresa ABC",
    estado: "Activo",
    fabricante: "Apple",
    noSerie: "AP-87654321",
    tipo: "Portátil",
    modelo: "MacBook Pro 16",
    so: "macOS Monterey",
    localizacion: "Oficina Gerencia",
    ultimaAct: "2025-05-14T08:30:00Z",
    procesador: "Apple M1 Pro"
  }
];

const InventarioComputadores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(computadoresData);
  const [sortField, setSortField] = useState<keyof Computador | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterTipo, setFilterTipo] = useState<string>('todos');
  const [filterFabricante, setFilterFabricante] = useState<string>('todos');

  // Extract unique values for filters
  const fabricantes = Array.from(new Set(computadoresData.map(item => item.fabricante)));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, filterEstado, filterTipo, filterFabricante);
  };

  const handleSortClick = (field: keyof Computador) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
    
    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      
      if (valueA < valueB) return isAsc ? 1 : -1;
      if (valueA > valueB) return isAsc ? -1 : 1;
      return 0;
    });
    
    setFilteredData(sortedData);
  };

  const applyFilters = (
    search: string = searchTerm, 
    estado: string = filterEstado,
    tipo: string = filterTipo,
    fabricante: string = filterFabricante
  ) => {
    let filtered = computadoresData;
    
    // Apply text search
    if (search) {
      filtered = filtered.filter(item => 
        item.nombre.toLowerCase().includes(search.toLowerCase()) ||
        item.noSerie.toLowerCase().includes(search.toLowerCase()) ||
        item.modelo.toLowerCase().includes(search.toLowerCase()) ||
        item.procesador.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply estado filter
    if (estado !== 'todos') {
      filtered = filtered.filter(item => item.estado === estado);
    }
    
    // Apply tipo filter
    if (tipo !== 'todos') {
      filtered = filtered.filter(item => item.tipo === tipo);
    }
    
    // Apply fabricante filter
    if (fabricante !== 'todos') {
      filtered = filtered.filter(item => item.fabricante === fabricante);
    }
    
    setFilteredData(filtered);
  };

  const handleEstadoFilter = (value: string) => {
    setFilterEstado(value);
    applyFilters(searchTerm, value, filterTipo, filterFabricante);
  };

  const handleTipoFilter = (value: string) => {
    setFilterTipo(value);
    applyFilters(searchTerm, filterEstado, value, filterFabricante);
  };

  const handleFabricanteFilter = (value: string) => {
    setFilterFabricante(value);
    applyFilters(searchTerm, filterEstado, filterTipo, value);
  };

  const renderSortIcon = (field: keyof Computador) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ArrowUp className="inline h-4 w-4 ml-1" /> : 
      <ArrowDown className="inline h-4 w-4 ml-1" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventario - Computadores</h1>
          <p className="text-gray-500 dark:text-gray-400">
            <Link to="/inventario" className="hover:underline">Inventario</Link> / Computadores
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Exportar</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Nuevo computador</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Computadores</CardTitle>
              <CardDescription>Gestiona tus servidores, laptops y equipos de escritorio</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por nombre, serie..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter size={16} />
              <span className="text-sm font-medium">Filtros:</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Select value={filterEstado} onValueChange={handleEstadoFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                  <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                  <SelectItem value="Operativo">Operativo</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterTipo} onValueChange={handleTipoFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="Servidor">Servidor</SelectItem>
                  <SelectItem value="Portátil">Portátil</SelectItem>
                  <SelectItem value="Desktop">Desktop</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterFabricante} onValueChange={handleFabricanteFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Fabricante" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los fabricantes</SelectItem>
                  {fabricantes.map(fab => (
                    <SelectItem key={fab} value={fab}>{fab}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('id')}>
                    ID {renderSortIcon('id')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('nombre')}>
                    Nombre {renderSortIcon('nombre')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('tipo')}>
                    Tipo {renderSortIcon('tipo')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('modelo')}>
                    Modelo {renderSortIcon('modelo')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('fabricante')}>
                    Fabricante {renderSortIcon('fabricante')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('so')}>
                    Sistema Operativo {renderSortIcon('so')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('procesador')}>
                    Procesador {renderSortIcon('procesador')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('estado')}>
                    Estado {renderSortIcon('estado')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('localizacion')}>
                    Localización {renderSortIcon('localizacion')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.tipo === 'Servidor' ? 
                            <Server className="h-4 w-4 text-gray-500" /> : 
                            <Laptop className="h-4 w-4 text-gray-500" />
                          }
                          <span>{item.nombre}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell>{item.modelo}</TableCell>
                      <TableCell>{item.fabricante}</TableCell>
                      <TableCell>{item.so}</TableCell>
                      <TableCell>{item.procesador}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.estado === 'Activo' || item.estado === 'Operativo'
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : item.estado === 'Mantenimiento'
                            ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                            : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                        }`}>
                          {item.estado}
                        </span>
                      </TableCell>
                      <TableCell>{item.localizacion}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No se encontraron computadores que coincidan con los filtros aplicados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredData.length} de {computadoresData.length} computadores
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventarioComputadores;
