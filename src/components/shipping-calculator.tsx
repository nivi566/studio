'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Box, Weight } from 'lucide-react';

const weightSchema = z.object({
  origin: z.string().min(2, { message: 'El origen es requerido.' }),
  destination: z.string().min(2, { message: 'El destino es requerido.' }),
  weight: z.coerce.number().min(0.1, { message: 'El peso debe ser mayor a 0.' }),
  length: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
});

const dimensionsSchema = z.object({
  origin: z.string().min(2, { message: 'El origen es requerido.' }),
  destination: z.string().min(2, { message: 'El destino es requerido.' }),
  length: z.coerce.number().min(1, { message: 'El largo debe ser mayor a 0.' }),
  width: z.coerce.number().min(1, { message: 'El ancho debe ser mayor a 0.' }),
  height: z.coerce.number().min(1, { message: 'La altura debe ser mayor a 0.' }),
  weight: z.coerce.number().optional(),
});

type FormValues = z.infer<typeof weightSchema> | z.infer<typeof dimensionsSchema>;

const defaultFormValues = {
  origin: '',
  destination: '',
  weight: undefined,
  length: undefined,
  width: undefined,
  height: undefined,
};

export function ShippingCalculator() {
  const [calculationType, setCalculationType] = useState('weight');
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const formSchema = calculationType === 'weight' ? weightSchema : dimensionsSchema;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = (values: FormValues) => {
    const baseRate = 5; // Tarifa base
    let cost = baseRate;

    if ('weight' in values && values.weight) {
      // Cálculo por peso volumétrico
      const volumetricWeight = ((values.length ?? 10) * (values.width ?? 10) * (values.height ?? 10)) / 5000;
      const chargeableWeight = Math.max(values.weight, volumetricWeight);
      cost += chargeableWeight * 0.8;
    } else if ('length' in values && values.length && values.width && values.height) {
      // Cálculo por dimensiones
      const volume = (values.length * values.width * values.height) / 1000; // a litros
      cost += volume * 1.5;
    }

    // Simular factor distancia (muy simplificado)
    cost += (values.origin.length + values.destination.length) * 0.1;
    
    setShippingCost(parseFloat(cost.toFixed(2)));
  };
  
  const handleTabChange = (value: string) => {
    setCalculationType(value);
    form.reset(defaultFormValues);
    setShippingCost(null);
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calculator className="h-7 w-7" />
          Calcula tu envío al instante
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origen</FormLabel>
                    <FormControl>
                      <Input placeholder="Ciudad de origen" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destino</FormLabel>
                    <FormControl>
                      <Input placeholder="Ciudad de destino" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Tabs value={calculationType} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="weight">
                  <Weight className="h-4 w-4 mr-2" /> Por Peso
                </TabsTrigger>
                <TabsTrigger value="dimensions">
                  <Box className="h-4 w-4 mr-2" /> Por Dimensiones
                </TabsTrigger>
              </TabsList>
              <TabsContent value="weight" className="mt-6">
                 <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ej: 5.5" {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="dimensions" className="mt-6">
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Largo (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="cm" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ancho (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="cm" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alto (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="cm" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button type="submit" className="w-full" size="lg">
              Calcular envío
            </Button>
          </form>
        </FormProvider>
        
        {shippingCost !== null && (
          <div className="mt-6 p-4 bg-secondary rounded-lg text-center">
            <p className="text-sm text-secondary-foreground">Coste estimado del envío:</p>
            <p className="text-2xl font-bold text-primary">{shippingCost} €</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
