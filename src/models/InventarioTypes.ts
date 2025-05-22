
// Tipos de dispositivos para el inventario

export interface BaseDispositivoInventario {
  id: number;
  nombre: string;
  entidad: string;
  estado: 'Activo' | 'Inactivo' | 'Mantenimiento' | 'Operativo';
  fabricante: string;
  modelo: string;
  localizacion: string;
  ultimaAct: string;
}

export interface Computador extends BaseDispositivoInventario {
  noSerie: string;
  tipo: 'Servidor' | 'Portátil' | 'Desktop';
  so: string;
  procesador: string;
}

export interface Monitor extends BaseDispositivoInventario {
  noSerie: string;
  tipo: 'LCD' | 'LED' | 'OLED' | 'IPS';
  pulgadas: number;
  resolucion: string;
}

export interface Impresora extends BaseDispositivoInventario {
  noSerie: string;
  tipo: 'Láser' | 'Inyección' | 'Térmica' | 'Matriz de puntos';
  conectividad: string[];
  consumibles: string[];
}

export interface Celular extends BaseDispositivoInventario {
  imei: string;
  numeroTelefono?: string;
  sistemaOperativo: string;
  memoria: string;
  asignadoA?: string;
}
