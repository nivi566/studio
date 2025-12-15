
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast"

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  password: z.string().min(1, { message: 'La contraseña es requerida.' }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
    const { toast } = useToast()

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function onSubmit(data: LoginFormValues) {
        console.log(data);
        toast({
          title: "¡Sesión iniciada!",
          description: "Bienvenido de nuevo.",
        })
        form.reset();
    }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 sm:py-24">
          <Card className="w-full max-w-md mx-4">
              <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
              </CardHeader>
              <CardContent>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Usuario</FormLabel>
                                      <FormControl>
                                          <Input type="email" placeholder="tu@email.com" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Contraseña</FormLabel>
                                      <FormControl>
                                          <Input type="password" placeholder="Tu contraseña" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                           <div className="flex items-center justify-between">
                                <Link href="#" className="text-sm text-primary hover:underline">
                                    ¿Has olvidado tu contraseña?
                                </Link>
                            </div>
                          <Button type="submit" className="w-full">Iniciar Sesión</Button>
                      </form>
                  </Form>
              </CardContent>
          </Card>
      </main>
      <Footer />
    </div>
  );
}
