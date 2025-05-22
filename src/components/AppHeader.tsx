
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, User, ChevronDown, Sun, Moon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from '@/store/authStore';

export function AppHeader() {
  const { toast } = useToast();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Toggle class on document.documentElement
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: `Tema ${newTheme === 'light' ? 'claro' : 'oscuro'} activado`,
      duration: 2000,
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    navigate("/");
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm py-2 px-4 flex items-center justify-between">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-9 h-9"
            type="search"
            placeholder="Buscar activos, tickets, etc..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
        
        <Link to="/notificaciones">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Bell size={18} />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{user?.name || "Usuario"}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email || "usuario@ejemplo.com"}</div>
              </div>
              <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/perfil")}>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/configuracion")}>
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AppHeader;
