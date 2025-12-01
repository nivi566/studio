'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RouteOptimizationFormSchema, type RouteOptimizationFormValues } from '@/lib/types';
import { getOptimizedRoute } from '@/app/actions';
import { type RouteOptimizationOutput } from '@/ai/flows/route-optimization-eta';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, Route, Clock, Droplets, Gauge, Sparkles, MapPin, BarChart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export function RouteOptimizer() {
  const [result, setResult] = useState<RouteOptimizationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RouteOptimizationFormValues>({
    resolver: zodResolver(RouteOptimizationFormSchema),
    defaultValues: {
      origin: '',
      destination: '',
      packageWeight: 1,
      packageDimensions: '',
      weatherConditions: 'Despejado',
      trafficIncidents: 'Ninguno',
    },
  });

  useEffect(() => {
    try {
      const savedData = sessionStorage.getItem('heroFormData');
      if (savedData) {
        const { origin, destination, packageWeight, packageDimensions } = JSON.parse(savedData);
        if (origin) form.setValue('origin', origin);
        if (destination) form.setValue('destination', destination);
        if (packageWeight) form.setValue('packageWeight', Number(packageWeight));
        if (packageDimensions) form.setValue('packageDimensions', packageDimensions);

        // Clean up the stored data
        sessionStorage.removeItem('heroFormData');
      }
    } catch (error) {
      console.error("Could not parse hero form data from sessionStorage", error);
    }
  }, [form]);

  async function onSubmit(values: RouteOptimizationFormValues) {
    setIsLoading(true);
    setResult(null);

    const apiInput = {
      ...values,
      departureTime: values.departureTime.toISOString(),
    };
    
    const response = await getOptimizedRoute(apiInput);

    if (response.error || !response.data) {
      toast({
        variant: 'destructive',
        title: 'Error de Optimización',
        description: response.error || 'No se pudo obtener una ruta optimizada.',
      });
    } else {
      setResult(response.data);
    }
    
    setIsLoading(false);
  }

  return (
    <section id="ai-optimizer" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center justify-center gap-3">
            <Sparkles className="text-primary" /> Optimizador de Rutas con IA
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nuestra IA analiza múltiples factores para garantizar la ruta más rápida y eficiente para tu envío, recalculando en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Planifica tu envío</CardTitle>
              <CardDescription>Introduce los detalles para encontrar la ruta óptima.</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="origin" render={({ field }) => (
                            <FormItem><FormLabel>Origen</FormLabel><FormControl><Input placeholder="Ciudad de origen" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="destination" render={({ field }) => (
                            <FormItem><FormLabel>Destino</FormLabel><FormControl><Input placeholder="Ciudad de destino" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="packageWeight" render={({ field }) => (
                            <FormItem><FormLabel>Peso (kg)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="packageDimensions" render={({ field }) => (
                            <FormItem><FormLabel>Dimensiones (LxAnxAl cm)</FormLabel><FormControl><Input placeholder="40x30x20" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                    </div>
                    <FormField control={form.control} name="departureTime" render={({ field }) => (
                        <FormItem><FormLabel>Fecha de Salida</FormLabel><FormControl><DatePicker date={field.value} setDate={field.onChange} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading} className="w-full" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Route className="mr-2 h-4 w-4" />}
                    Optimizar Ruta
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          <div className="min-h-[400px]">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-muted rounded-lg">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground">Analizando rutas...</h3>
                <p className="text-muted-foreground">Nuestra IA está calculando la mejor opción para ti.</p>
              </div>
            )}
            {result && (
              <Card className="shadow-lg animate-in fade-in-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="text-primary"/> Ruta Optimizada
                  </CardTitle>
                  <CardDescription>Estos son los resultados del análisis de nuestra IA.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold text-foreground">Ruta Sugerida:</p>
                    <p className="text-muted-foreground">{result.optimizedRoute}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" /><div><p className="font-semibold">Llegada Estimada</p><p>{new Date(result.estimatedArrivalTime).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}</p></div></div>
                    <div className="flex items-start gap-2"><Route className="h-4 w-4 mt-0.5 text-primary shrink-0" /><div><p className="font-semibold">Distancia Total</p><p>{result.travelDistance} km</p></div></div>
                    <div className="flex items-start gap-2"><Droplets className="h-4 w-4 mt-0.5 text-primary shrink-0" /><div><p className="font-semibold">Combustible Estimado</p><p>{result.estimatedFuelConsumption} litros</p></div></div>
                    <div className="flex items-start gap-2"><Gauge className="h-4 w-4 mt-0.5 text-primary shrink-0" /><div><p className="font-semibold">Eficiencia de Ruta</p><p>{Math.round(result.routeEfficiencyScore * 100)}%</p></div></div>
                  </div>
                  {result.potentialDelays && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Posibles Retrasos</AlertTitle>
                      <AlertDescription>{result.potentialDelays}</AlertDescription>
                    </Alert>
                  )}
                  <div>
                    <p className="text-sm font-medium mb-2 text-foreground">Puntuación de Eficiencia</p>
                    <Progress value={result.routeEfficiencyScore * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )}
            {!isLoading && !result && (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-muted/50 rounded-lg border-2 border-dashed">
                <BarChart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground">Esperando datos</h3>
                <p className="text-muted-foreground">Los resultados de la optimización aparecerán aquí.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
