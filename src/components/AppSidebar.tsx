
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  Ticket, 
  FolderOpen, 
  Users, 
  Settings, 
  BarChart2, 
  Menu, 
  X,
  BookOpen, 
  Workflow, 
  Bell,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarItem = {
  name: string;
  icon: React.ElementType;
  path: string;
};

const mainItems: SidebarItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Inventario', icon: Database, path: '/inventario' },
  { name: 'Tickets', icon: Ticket, path: '/tickets' },
  { name: 'Proyectos', icon: FolderOpen, path: '/proyectos' },
  { name: 'Base de conocimiento', icon: BookOpen, path: '/conocimiento' },
  { name: 'Flujos de trabajo', icon: Workflow, path: '/flujos' },
  { name: 'Reportes', icon: BarChart2, path: '/reportes' },
];

const bottomItems: SidebarItem[] = [
  { name: 'Empresas', icon: Building2, path: '/empresas' },
  { name: 'Usuarios', icon: Users, path: '/usuarios' },
  { name: 'Notificaciones', icon: Bell, path: '/notificaciones' },
  { name: 'Configuración', icon: Settings, path: '/configuracion' },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarClasses = cn(
    "h-screen bg-sidebar fixed left-0 top-0 z-30 flex flex-col",
    "border-r border-sidebar-border transition-all duration-300",
    isMobile
      ? mobileOpen
        ? "w-64 translate-x-0"
        : "w-64 -translate-x-full"
      : collapsed
        ? "w-16"
        : "w-64"
  );

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const SidebarItem = ({ item }: { item: SidebarItem }) => {
    const Icon = item.icon;
    return (
      <Link to={item.path}>
        <div className={cn(
          "flex items-center py-3 px-4 my-1 rounded-md text-sidebar-foreground",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
          "cursor-pointer",
        )}>
          <Icon size={20} className="min-w-[20px]" />
          {(!collapsed || isMobile) && <span className="ml-3">{item.name}</span>}
        </div>
      </Link>
    );
  };

  const MobileToggle = () => {
    if (!isMobile) return null;
    return (
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
    );
  };

  // Add overlay for mobile
  const MobileOverlay = () => {
    if (!isMobile || !mobileOpen) return null;
    return (
      <div 
        className="fixed inset-0 bg-black/30 z-20 md:hidden"
        onClick={() => setMobileOpen(false)}
      />
    );
  };

  const DesktopToggle = () => {
    if (isMobile) return null;
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="self-end mr-2 mt-2"
      >
        <Menu size={20} />
      </Button>
    );
  };

  return (
    <>
      <MobileToggle />
      <MobileOverlay />
      <div className={sidebarClasses}>
        <div className="flex items-center p-4">
          {(!collapsed || isMobile) ? (
            <div className="font-bold text-lg text-sidebar-primary">PGAT</div>
          ) : (
            <div className="font-bold text-lg text-sidebar-primary w-full text-center">P</div>
          )}
          <div className="flex-grow" />
          <DesktopToggle />
        </div>
        
        <div className="flex-grow overflow-y-auto px-2">
          <div className="mb-6">
            {mainItems.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
          </div>
          
          <div className="mt-auto">
            {bottomItems.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AppSidebar;
