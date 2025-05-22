
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
  Monitor
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Monitor as MonitorType } from '@/models/InventarioTypes';

// Datos de ejemplo para monitores
const monitoresData: MonitorType[] = [
  {
    id: 1001,
    nombre: "Monitor Principal Diseño",
    entidad: "Corporación ABC",
    estado: "Activo",
    fabricante: "LG",
    modelo: "UltraWide 34WN80C-B",
    localizacion: "Departamento de Diseño - Estación 4",
    ultimaAct: "2025-05-18T10:45:00Z",
    noSerie: "LG-UW-34-123456",
    tipo: "IPS",
    pulgadas: 34,
    resolucion: "3440x1440"
  },
  {
    id: 1002,
    nombre: "Monitor Sala Conferencias",
    entidad: "Empresa XYZ",
    estado: "Activo",
    fabricante: "Samsung",
    modelo: "Odyssey G7",
    localizacion: "Sala de Conferencias Principal",
    ultimaAct: "2025-05-10T14:30:00Z",
    noSerie: "SM-ODY-G7-234567",
    tipo: "LED",
    pulgadas: 32,
    resolucion: "2560x1440"
  },
  {
    id: 1003,
    nombre: "Monitor Recepción",
    entidad: "Corporación ABC",
    estado: "Inactivo",
    fabricante: "Dell",
    modelo: "P2419H",
    localizacion: "Recepción - Área de Espera",
    ultimaAct: "2025-04-25T09:15:00Z",
    noSerie: "DL-P24-345678",
    tipo: "LCD",
    pulgadas: 24,
    resolucion: "1920x1080"
  },
  {
    id: 1004,
    nombre: "Monitor Desarrollo",
    entidad: "Empresa XYZ",
    estado: "Activo",
    fabricante: "ASUS",
    modelo: "ProArt PA278QV",
    localizacion: "Departamento IT - Cubículo 12",
    ultimaAct: "2025-05-16T11:20:00Z",
    noSerie: "AS-PA-456789",
    tipo: "IPS",
    pulgadas: 27,
    resolucion: "2560x1440"
  },
  {
    id: 1005,
    nombre: "Monitor Gerencia",
    entidad: "Corporación ABC",
    estado: "Mantenimiento",
    fabricante: "AOC",
    modelo: "CQ32G1",
    localizacion: "Oficina Gerencia General",
    ultimaAct: "2025-05-05T16:40:00Z",
    noSerie: "AOC-CQ32-567890",
    tipo: "LED",
    pulgadas: 32,
    resolucion: "2560x1440"
  }
];

const InventarioMonitores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(monitoresData);
  const [sortField, setSortField] = useState<keyof MonitorType | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterTipo, setFilterTipo] = useState<string>('todos');
  const [filterFabricante, setFilterFabricante] = useState<string>('todos');

  // Extract unique values for filters
  const fabricantes = Array.from(new Set(monitoresData.map(item => item.fabricante)));
  const tipos = Array.from(new Set(monitoresData.map(item => item.tipo)));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, filterEstado, filterTipo, filterFabricante);
  };

  const handleSortClick = (field: keyof MonitorType) => {
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
    let filtered = monitoresData;
    
    // Apply text search
    if (search) {
      filtered = filtered.filter(item => 
        item.nombre.toLowerCase().includes(search.toLowerCase()) ||
        item.noSerie.toLowerCase().includes(search.toLowerCase()) ||
        item.modelo.toLowerCase().includes(search.toLowerCase()) ||
        item.resolucion.toLowerCase().includes(search.toLowerCase())
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

  const renderSortIcon = (field: keyof MonitorType) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ArrowUp className="inline h-4 w-4 ml-1" /> : 
      <ArrowDown className="inline h-4 w-4 ml-1" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventario - Monitores</h1>
          <p className="text-gray-500 dark:text-gray-400">
            <Link to="/inventario" className="hover:underline">Inventario</Link> / Monitores
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Exportar</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Nuevo monitor</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Monitores</CardTitle>
              <CardDescription>Gestiona los monitores y pantallas</CardDescription>
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
                </SelectContent>
              </Select>
              
              <Select value={filterTipo} onValueChange={handleTipoFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  {tipos.map(tipo => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
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
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('pulgadas')}>
                    Pulgadas {renderSortIcon('pulgadas')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('resolucion')}>
                    Resolución {renderSortIcon('resolucion')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('fabricante')}>
                    Fabricante {renderSortIcon('fabricante')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('modelo')}>
                    Modelo {renderSortIcon('modelo')}
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
                          <Monitor className="h-4 w-4 text-gray-500" />
                          <span>{item.nombre}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell>{item.pulgadas}"</TableCell>
                      <TableCell>{item.resolucion}</TableCell>
                      <TableCell>{item.fabricante}</TableCell>
                      <TableCell>{item.modelo}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.estado === 'Activo'
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
                      No se encontraron monitores que coincidan con los filtros aplicados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredData.length} de {monitoresData.length} monitores
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

export default InventarioMonitores;
