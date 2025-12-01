'use server';

import { 
  optimizeRouteAndGenerateETA, 
  type RouteOptimizationInput, 
  type RouteOptimizationOutput 
} from '@/ai/flows/route-optimization-eta';

export async function getOptimizedRoute(input: RouteOptimizationInput): Promise<{ data: RouteOptimizationOutput | null; error: string | null; }> {
  try {
    // Basic server-side validation can be added here if needed
    if (!input.origin || !input.destination) {
      return { data: null, error: "El origen y el destino son obligatorios." };
    }
    if (!input.packageWeight || input.packageWeight <= 0) {
      return { data: null, error: "El peso del paquete debe ser un número positivo."};
    }
     if (!input.packageDimensions) {
      return { data: null, error: "Las dimensiones del paquete son obligatorias."};
    }
    
    const result = await optimizeRouteAndGenerateETA(input);
    return { data: result, error: null };
  } catch (e) {
    console.error("Route Optimization Error:", e);
    const error = e instanceof Error ? e.message : 'Ha ocurrido un error desconocido al optimizar la ruta.';
    return { data: null, error };
  }
}
