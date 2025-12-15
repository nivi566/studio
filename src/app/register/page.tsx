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

const registerFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido.' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
    const { toast } = useToast()

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    function onSubmit(data: RegisterFormValues) {
        console.log(data);
        toast({
          title: "¡Cuenta creada!",
          description: "Tu cuenta ha sido creada con éxito. Ya puedes iniciar sesión.",
        })
        form.reset();
    }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 sm:py-24">
          <Card className="w-full max-w-md mx-4">
              <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Crear una cuenta</CardTitle>
              </CardHeader>
              <CardContent>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                           <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Nombre</FormLabel>
                                      <FormControl>
                                          <Input placeholder="Tu nombre completo" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Email</FormLabel>
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
                                          <Input type="password" placeholder="Crea una contraseña" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <Button type="submit" className="w-full">Crear Cuenta</Button>
                           <CardDescription className="text-center">
                            ¿Ya tienes una cuenta?{' '}
                            <Link href="/login" className="text-primary hover:underline">
                                Inicia sesión aquí
                            </Link>
                          </CardDescription>
                      </form>
                  </Form>
              </CardContent>
          </Card>
      </main>
      <Footer />
    </div>
  );
}
