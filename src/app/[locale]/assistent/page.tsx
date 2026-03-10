'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, User, Loader2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy el asistente virtual de InTrack. ¿En qué puedo ayudarte?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/mistral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      const errorMessage: Message = { role: 'assistant', content: 'Lo siento, ha ocurrido un error. Inténtalo de nuevo más tarde.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-900">
      <Header />
      <main className="flex-1 relative flex items-center justify-center py-12 overflow-hidden">
        
        {/* Imagen de fondo modo espejo */}
        <Image
          src="/camion.png"
          alt="InTrack Background Mirror"
          fill
          className="object-cover opacity-40 -scale-x-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

        <Card className="relative z-10 w-full max-w-2xl h-[70vh] flex flex-col bg-white/95 backdrop-blur-sm shadow-2xl border-none">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 font-black italic tracking-tighter">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/logoi.png" alt="InTrack Logo" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              Asistente Virtual
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
            <div ref={scrollAreaRef} className="flex-1 overflow-y-auto pr-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-3',
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {msg.role === 'assistant' && (
                    <Avatar className="h-8 w-8">
                       <AvatarImage src="/logoi.png" alt="Asistente" />
                       <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'rounded-lg px-4 py-2 max-w-[80%] font-medium',
                      msg.role === 'user'
                        ? 'bg-[#f39c12] text-white'
                        : 'bg-muted text-slate-900'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                   {msg.role === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-900 text-white text-xs font-bold">YO</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                     <AvatarImage src="/logoi.png" alt="Asistente" />
                     <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-[#f39c12]" />
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-4 border-t">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta..."
                disabled={isLoading}
                className="bg-slate-50 border-slate-200"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} className="bg-[#f39c12] hover:bg-slate-900 text-white">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
