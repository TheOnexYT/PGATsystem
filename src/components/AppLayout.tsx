
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function AppLayout() {
  const isMobile = useIsMobile();
  
  // Offset for sidebar
  const contentStyles = {
    marginLeft: isMobile ? '0' : '16rem', // 16rem = 64 (sidebar width)
    transition: 'margin-left 0.3s ease',
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      <AppSidebar />
      
      <div className="flex-1" style={contentStyles}>
        <AppHeader />
        
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      
      <Toaster />
      <Sonner />
    </div>
  );
}

export default AppLayout;
