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
      throw new Error("Origin and destination are required.");
    }
    
    const result = await optimizeRouteAndGenerateETA(input);
    return { data: result, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unknown error occurred while optimizing the route.';
    console.error("Route Optimization Error:", error);
    return { data: null, error };
  }
}
