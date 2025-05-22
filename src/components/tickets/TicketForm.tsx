
import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Ticket } from "@/models/Ticket";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface TicketFormProps {
  ticket?: Ticket;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// Create a schema for ticket form
const ticketFormSchema = z.object({
  tipo: z.string().min(1, { message: "El tipo de PQR es obligatorio" }),
  descripcion: z.string().min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
  estado: z.string().optional()
});

export function TicketForm({ ticket, onSubmit, onCancel, isSubmitting = false }: TicketFormProps) {
  const form = useForm({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      tipo: ticket?.category || "",
      descripcion: ticket?.description || "",
      estado: ticket?.status || "open"
    }
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de PQR</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de PQR" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="petición">Petición</SelectItem>
                  <SelectItem value="queja">Queja</SelectItem>
                  <SelectItem value="reclamo">Reclamo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="Descripción del problema" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {ticket && (
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="open">Pendiente</SelectItem>
                    <SelectItem value="in-progress">En Progreso</SelectItem>
                    <SelectItem value="closed">Completado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {ticket ? "Actualizar PQR" : "Crear PQR"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
