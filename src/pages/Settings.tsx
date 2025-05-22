
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Configuración guardada correctamente");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="integrations">Integraciones</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Configuración general</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveGeneral} className="space-y-6">
                  <div className="space-y-1">
                    <Label htmlFor="company">Nombre de la empresa</Label>
                    <Input id="company" defaultValue="Mi Empresa S.A." />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="timezone">Zona horaria</Label>
                    <select 
                      id="timezone" 
                      className="w-full h-10 px-3 py-2 rounded-md border"
                      defaultValue="America/Mexico_City"
                    >
                      <option value="America/Mexico_City">Ciudad de México (UTC-6)</option>
                      <option value="America/Bogota">Bogotá (UTC-5)</option>
                      <option value="America/Santiago">Santiago (UTC-4)</option>
                      <option value="America/Argentina/Buenos_Aires">Buenos Aires (UTC-3)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                    <Label htmlFor="dark-mode">Modo oscuro</Label>
                  </div>
                  
                  <Button type="submit">Guardar configuración</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de notificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificaciones por correo</h3>
                      <p className="text-sm text-gray-500">Recibe actualizaciones por correo electrónico</p>
                    </div>
                    <Switch 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificaciones en la plataforma</h3>
                      <p className="text-sm text-gray-500">Recibe notificaciones dentro de la aplicación</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button onClick={() => toast.success("Preferencias guardadas")}>
                    Guardar preferencias
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Seguridad de la cuenta</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-1">
                    <Label htmlFor="current-password">Contraseña actual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="new-password">Nueva contraseña</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Button onClick={(e) => {
                    e.preventDefault();
                    toast.success("Contraseña actualizada");
                  }}>
                    Cambiar contraseña
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integraciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Fusion Inventory</h3>
                        <p className="text-sm text-gray-500">Integración para escaneo automático de activos</p>
                      </div>
                      <Button variant="outline">Configurar</Button>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">OCS Inventory</h3>
                        <p className="text-sm text-gray-500">Integración alternativa para inventario</p>
                      </div>
                      <Button variant="outline">Configurar</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
