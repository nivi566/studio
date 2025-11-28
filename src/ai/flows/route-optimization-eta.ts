'use server';

/**
 * @fileOverview Optimizes delivery routes using AI and generates estimated time of arrival (ETA).
 *
 * - optimizeRouteAndGenerateETA - A function that handles the route optimization and ETA generation process.
 * - RouteOptimizationInput - The input type for the optimizeRouteAndGenerateETA function.
 * - RouteOptimizationOutput - The return type for the optimizeRouteAndGenerateETA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RouteOptimizationInputSchema = z.object({
  origin: z.string().describe('The starting location for the delivery.'),
  destination: z.string().describe('The final delivery location.'),
  packageWeight: z.number().describe('The weight of the package in kilograms.'),
  packageDimensions: z.string().describe('The dimensions of the package (e.g., 10x10x10 cm).'),
  departureTime: z.string().describe('The desired departure time for the delivery (e.g., 2024-08-01T10:00:00Z).'),
  weatherConditions: z.string().optional().describe('Current weather conditions along the route.'),
  trafficIncidents: z.string().optional().describe('Any reported traffic incidents along the route.'),
});
export type RouteOptimizationInput = z.infer<typeof RouteOptimizationInputSchema>;

const RouteOptimizationOutputSchema = z.object({
  optimizedRoute: z.string().describe('The optimized delivery route.'),
  estimatedArrivalTime: z.string().describe('The estimated time of arrival at the destination (e.g., 2024-08-01T14:30:00Z).'),
  travelDistance: z.number().describe('The total travel distance in kilometers.'),
  estimatedFuelConsumption: z.number().describe('The estimated fuel consumption in liters.'),
  potentialDelays: z.string().optional().describe('Any potential delays and their estimated impact on the ETA.'),
  routeEfficiencyScore: z.number().describe('A score between 0 and 1 representing the route efficiency, considering time, distance, and fuel consumption.'),
});
export type RouteOptimizationOutput = z.infer<typeof RouteOptimizationOutputSchema>;

export async function optimizeRouteAndGenerateETA(input: RouteOptimizationInput): Promise<RouteOptimizationOutput> {
  return optimizeRouteAndGenerateETAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'routeOptimizationPrompt',
  input: {schema: RouteOptimizationInputSchema},
  output: {schema: RouteOptimizationOutputSchema},
  prompt: `You are an AI-powered route optimization expert. Analyze the provided information to determine the most efficient delivery route and estimate the arrival time.

  Origin: {{{origin}}}
  Destination: {{{destination}}}
  Package Weight: {{{packageWeight}}} kg
  Package Dimensions: {{{packageDimensions}}}
  Departure Time: {{{departureTime}}}
  Weather Conditions: {{{weatherConditions}}}
  Traffic Incidents: {{{trafficIncidents}}}

  Consider factors such as distance, traffic, weather conditions, and potential delays to provide an accurate ETA. Also, estimate fuel consumption and provide a route efficiency score.

  Ensure that the optimized route is clearly described, and the estimated arrival time is formatted consistently. Clearly state the distance, fuel consumption, any potential delays, and the route efficiency score.
  
  Optimize the route to minimize delivery time and fuel consumption, ensuring the package arrives safely and on time.
  `, 
});

const optimizeRouteAndGenerateETAFlow = ai.defineFlow(
  {
    name: 'optimizeRouteAndGenerateETAFlow',
    inputSchema: RouteOptimizationInputSchema,
    outputSchema: RouteOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
