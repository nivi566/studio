import { z } from "zod";

export const RouteOptimizationFormSchema = z.object({
  origin: z.string().min(2, "El origen es requerido."),
  destination: z.string().min(2, "El destino es requerido."),
  packageWeight: z.coerce.number().min(0.1, "El peso debe ser positivo."),
  packageDimensions: z.string().min(3, "Las dimensiones son requeridas."),
  departureTime: z.date({
    required_error: "La fecha de salida es requerida.",
  }),
  weatherConditions: z.string().optional(),
  trafficIncidents: z.string().optional(),
});

export type RouteOptimizationFormValues = z.infer<typeof RouteOptimizationFormSchema>;
