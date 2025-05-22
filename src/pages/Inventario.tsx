
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  Laptop,
  Monitor,
  Smartphone,
  Server,
  Printer,
  HardDrive
} from 'lucide-react';

// Datos de ejemplo
const inventarioItems = [
  { 
    id: "INV-001", 
    nombre: "Laptop Dell XPS 13", 
    tipo: "Computadora", 
    icono: Laptop,
    serial: "XPS13-2023-45678",
    estado: "Activo", 
    sistema: "Windows 11 Pro",
    asignado: "Juan Pérez",
    ubicacion: "Oficina central", 
    ultimoEscaneo: "2023-05-15",
    empresa: "Empresa A"
  },
  { 
    id: "INV-002", 
    nombre: "Monitor LG 27\" Ultrafine", 
    tipo: "Monitor", 
    icono: Monitor,
    serial: "LG-UF-987654",
    estado: "Activo", 
    sistema: "N/A",
    asignado: "María Rodríguez",
    ubicacion: "Oficina central", 
    ultimoEscaneo: "2023-05-12",
    empresa: "Empresa A"
  },
  { 
    id: "INV-003", 
    nombre: "iPhone 13 Pro", 
    tipo: "Móvil", 
    icono: Smartphone,
    serial: "IP13P-AB12345",
    estado: "Mantenimiento", 
    sistema: "iOS 16",
    asignado: "Carlos López",
    ubicacion: "Soporte técnico", 
    ultimoEscaneo: "2023-05-11",
    empresa: "Empresa B"
  },
  { 
    id: "INV-004", 
    nombre: "Servidor HP ProLiant DL380", 
    tipo: "Servidor", 
    icono: Server,
    serial: "HPL-DL380-123456",
    estado: "Activo", 
    sistema: "Ubuntu Server 22.04",
    asignado: "Equipo IT",
    ubicacion: "Sala de servidores", 
    ultimoEscaneo: "2023-05-14",
    empresa: "Empresa A"
  },
  { 
    id: "INV-005", 
    nombre: "Impresora HP LaserJet Pro", 
    tipo: "Impresora", 
    icono: Printer,
    serial: "HPLJ-7623412",
    estado: "Inactivo", 
    sistema: "N/A",
    asignado: "Recepción",
    ubicacion: "Recepción", 
    ultimoEscaneo: "2023-05-10",
    empresa: "Empresa C"
  },
  { 
    id: "INV-006", 
    nombre: "Disco externo Seagate 2TB", 
    tipo: "Almacenamiento", 
    icono: HardDrive,
    serial: "SG-2TB-765432",
    estado: "Activo", 
    sistema: "N/A",
    asignado: "Ana Torres",
    ubicacion: "Departamento financiero", 
    ultimoEscaneo: "2023-05-09",
    empresa: "Empresa B"
  },
];

const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(inventarioItems);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredItems(inventarioItems);
    } else {
      const filtered = inventarioItems.filter(item =>
        item.nombre.toLowerCase().includes(term.toLowerCase()) ||
        item.id.toLowerCase().includes(term.toLowerCase()) ||
        item.serial.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const TipoIcono = ({ tipo }: { tipo: string }) => {
    const iconProps = { size: 16, className: "text-gray-600 dark:text-gray-300" };
    
    switch (tipo) {
      case "Computadora": return <Laptop {...iconProps} />;
      case "Monitor": return <Monitor {...iconProps} />;
      case "Móvil": return <Smartphone {...iconProps} />;
      case "Servidor": return <Server {...iconProps} />;
      case "Impresora": return <Printer {...iconProps} />;
      case "Almacenamiento": return <HardDrive {...iconProps} />;
      default: return <HardDrive {...iconProps} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Inventario</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filtros</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Exportar</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Nuevo activo</span>
          </Button>
        </div>
      </div>
      
      {/* Categorías de inventario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/inventario/computadores">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Laptop size={24} />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Computadores</h3>
                <p className="text-sm text-muted-foreground">Gestionar computadores</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/inventario/monitores">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Monitor size={24} />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Monitores</h3>
                <p className="text-sm text-muted-foreground">Gestionar monitores</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/inventario/impresoras">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Printer size={24} />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Impresoras</h3>
                <p className="text-sm text-muted-foreground">Gestionar impresoras</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/inventario/celulares">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Smartphone size={24} />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">Celulares</h3>
                <p className="text-sm text-muted-foreground">Gestionar celulares</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Activos tecnológicos</CardTitle>
              <CardDescription>Gestione todos los activos registrados en el sistema</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por nombre, ID..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="todos">
            <TabsList className="mb-4">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="activos">Activos</TabsTrigger>
              <TabsTrigger value="mantenimiento">En mantenimiento</TabsTrigger>
              <TabsTrigger value="inactivos">Inactivos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="todos" className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left pb-3 pl-4">ID</th>
                      <th className="text-left pb-3">Nombre</th>
                      <th className="text-left pb-3">Tipo</th>
                      <th className="text-left pb-3">Estado</th>
                      <th className="text-left pb-3">Asignado a</th>
                      <th className="text-left pb-3">Ubicación</th>
                      <th className="text-left pb-3">Empresa</th>
                      <th className="text-left pb-3">Último escaneo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <tr key={item.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-3 pl-4">{item.id}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <TipoIcono tipo={item.tipo} />
                              <span>{item.nombre}</span>
                            </div>
                          </td>
                          <td className="py-3">{item.tipo}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              item.estado === 'Activo' 
                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                : item.estado === 'Mantenimiento'
                                ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                                : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                            }`}>
                              {item.estado}
                            </span>
                          </td>
                          <td className="py-3">{item.asignado}</td>
                          <td className="py-3">{item.ubicacion}</td>
                          <td className="py-3">{item.empresa}</td>
                          <td className="py-3">{item.ultimoEscaneo}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-4 text-center text-gray-500">
                          No se encontraron activos que coincidan con tu búsqueda
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Mostrando {filteredItems.length} de {inventarioItems.length} activos
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
            </TabsContent>
            
            <TabsContent value="activos">
              <div className="p-4 text-center">
                <p className="text-gray-500">Filtro de activos aplicado</p>
              </div>
            </TabsContent>
            
            <TabsContent value="mantenimiento">
              <div className="p-4 text-center">
                <p className="text-gray-500">Filtro de mantenimiento aplicado</p>
              </div>
            </TabsContent>
            
            <TabsContent value="inactivos">
              <div className="p-4 text-center">
                <p className="text-gray-500">Filtro de inactivos aplicado</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventario;
