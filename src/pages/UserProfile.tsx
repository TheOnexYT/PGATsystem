
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { User } from "lucide-react";

export default function UserProfile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update the user profile through an API
    toast.success("Perfil actualizado correctamente");
    setIsEditing(false);
  };

  if (!user) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mi perfil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-gray-100 rounded-full w-32 h-32 flex items-center justify-center mb-4">
                <User className="h-16 w-16 text-gray-400" />
              </div>
              <CardTitle>{user.name}</CardTitle>
              <div className="text-gray-500">{user.email}</div>
              <div className="mt-2">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {user.role}
                </span>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Editar perfil
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Información personal</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Guardar</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              ) : (
                <dl className="divide-y divide-gray-100">
                  <div className="py-4 grid grid-cols-3">
                    <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                    <dd className="col-span-2 text-sm">{user.name}</dd>
                  </div>
                  <div className="py-4 grid grid-cols-3">
                    <dt className="text-sm font-medium text-gray-500">Correo electrónico</dt>
                    <dd className="col-span-2 text-sm">{user.email}</dd>
                  </div>
                  <div className="py-4 grid grid-cols-3">
                    <dt className="text-sm font-medium text-gray-500">Rol</dt>
                    <dd className="col-span-2 text-sm capitalize">{user.role}</dd>
                  </div>
                </dl>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
