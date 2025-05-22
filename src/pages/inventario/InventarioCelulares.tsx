
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
  Smartphone
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Celular } from '@/models/InventarioTypes';

// Datos de ejemplo para celulares
const celularesData: Celular[] = [
  {
    id: 3001,
    nombre: "iPhone 14 Pro - Gerencia",
    entidad: "Empresa XYZ",
    estado: "Activo",
    fabricante: "Apple",
    modelo: "iPhone 14 Pro",
    localizacion: "Oficina Gerencia General",
    ultimaAct: "2025-05-16T10:30:00Z",
    imei: "352396118560529",
    numeroTelefono: "+511234567890",
    sistemaOperativo: "iOS 17",
    memoria: "256GB",
    asignadoA: "Carlos Mendoza"
  },
  {
    id: 3002,
    nombre: "Samsung S22 Ultra - Marketing",
    entidad: "Corporación ABC",
    estado: "Activo",
    fabricante: "Samsung",
    modelo: "Galaxy S22 Ultra",
    localizacion: "Departamento Marketing",
    ultimaAct: "2025-05-10T14:45:00Z",
    imei: "358534112571285",
    numeroTelefono: "+511987654321",
    sistemaOperativo: "Android 14",
    memoria: "512GB",
    asignadoA: "Ana López"
  },
  {
    id: 3003,
    nombre: "Google Pixel 7 - Diseño",
    entidad: "Empresa XYZ",
    estado: "Mantenimiento",
    fabricante: "Google",
    modelo: "Pixel 7",
    localizacion: "Departamento Diseño",
    ultimaAct: "2025-05-02T09:20:00Z",
    imei: "351678095412365",
    numeroTelefono: "+511556677889",
    sistemaOperativo: "Android 14",
    memoria: "128GB",
    asignadoA: "Luis Torres"
  },
  {
    id: 3004,
    nombre: "Xiaomi Mi 12 - Ventas",
    entidad: "Corporación ABC",
    estado: "Activo",
    fabricante: "Xiaomi",
    modelo: "Mi 12",
    localizacion: "Departamento Ventas",
    ultimaAct: "2025-05-14T11:10:00Z",
    imei: "862345907165423",
    numeroTelefono: "+511223344556",
    sistemaOperativo: "Android 13",
    memoria: "256GB",
    asignadoA: "Marta Jiménez"
  },
  {
    id: 3005,
    nombre: "iPhone 13 - Soporte Técnico",
    entidad: "Empresa XYZ",
    estado: "Inactivo",
    fabricante: "Apple",
    modelo: "iPhone 13",
    localizacion: "Departamento IT",
    ultimaAct: "2025-04-25T15:40:00Z",
    imei: "356729084516273",
    sistemaOperativo: "iOS 16",
    memoria: "128GB"
  }
];

const InventarioCelulares = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(celularesData);
  const [sortField, setSortField] = useState<keyof Celular | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterSO, setFilterSO] = useState<string>('todos');
  const [filterFabricante, setFilterFabricante] = useState<string>('todos');

  // Extract unique values for filters
  const fabricantes = Array.from(new Set(celularesData.map(item => item.fabricante)));
  const sistemasOperativos = Array.from(new Set(celularesData.map(item => item.sistemaOperativo)));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, filterEstado, filterSO, filterFabricante);
  };

  const handleSortClick = (field: keyof Celular) => {
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
    so: string = filterSO,
    fabricante: string = filterFabricante
  ) => {
    let filtered = celularesData;
    
    // Apply text search
    if (search) {
      filtered = filtered.filter(item => 
        item.nombre.toLowerCase().includes(search.toLowerCase()) ||
        item.imei.toLowerCase().includes(search.toLowerCase()) ||
        item.modelo.toLowerCase().includes(search.toLowerCase()) ||
        (item.numeroTelefono && item.numeroTelefono.toLowerCase().includes(search.toLowerCase())) ||
        (item.asignadoA && item.asignadoA.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    // Apply estado filter
    if (estado !== 'todos') {
      filtered = filtered.filter(item => item.estado === estado);
    }
    
    // Apply sistema operativo filter
    if (so !== 'todos') {
      filtered = filtered.filter(item => item.sistemaOperativo === so);
    }
    
    // Apply fabricante filter
    if (fabricante !== 'todos') {
      filtered = filtered.filter(item => item.fabricante === fabricante);
    }
    
    setFilteredData(filtered);
  };

  const handleEstadoFilter = (value: string) => {
    setFilterEstado(value);
    applyFilters(searchTerm, value, filterSO, filterFabricante);
  };

  const handleSOFilter = (value: string) => {
    setFilterSO(value);
    applyFilters(searchTerm, filterEstado, value, filterFabricante);
  };

  const handleFabricanteFilter = (value: string) => {
    setFilterFabricante(value);
    applyFilters(searchTerm, filterEstado, filterSO, value);
  };

  const renderSortIcon = (field: keyof Celular) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ArrowUp className="inline h-4 w-4 ml-1" /> : 
      <ArrowDown className="inline h-4 w-4 ml-1" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inventario - Celulares</h1>
          <p className="text-gray-500 dark:text-gray-400">
            <Link to="/inventario" className="hover:underline">Inventario</Link> / Celulares
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Exportar</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Nuevo celular</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Celulares</CardTitle>
              <CardDescription>Gestiona los celulares y dispositivos móviles</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por nombre, IMEI, número..."
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
              
              <Select value={filterSO} onValueChange={handleSOFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sistema Operativo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los SO</SelectItem>
                  {sistemasOperativos.map(so => (
                    <SelectItem key={so} value={so}>{so}</SelectItem>
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
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('fabricante')}>
                    Fabricante {renderSortIcon('fabricante')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('modelo')}>
                    Modelo {renderSortIcon('modelo')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('sistemaOperativo')}>
                    S.O. {renderSortIcon('sistemaOperativo')}
                  </TableHead>
                  <TableHead>IMEI</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('asignadoA')}>
                    Asignado a {renderSortIcon('asignadoA')}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSortClick('estado')}>
                    Estado {renderSortIcon('estado')}
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
                          <Smartphone className="h-4 w-4 text-gray-500" />
                          <span>{item.nombre}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.fabricante}</TableCell>
                      <TableCell>{item.modelo}</TableCell>
                      <TableCell>{item.sistemaOperativo}</TableCell>
                      <TableCell>{item.imei}</TableCell>
                      <TableCell>{item.numeroTelefono || "-"}</TableCell>
                      <TableCell>{item.asignadoA || "No asignado"}</TableCell>
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
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No se encontraron celulares que coincidan con los filtros aplicados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredData.length} de {celularesData.length} celulares
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

export default InventarioCelulares;
