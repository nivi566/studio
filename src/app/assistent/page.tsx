'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, User, Loader2, Bot, Sparkles } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy el asistente virtual de InTrack. ¿En qué puedo ayudarte con tus envíos hoy?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/mistral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error en la conexión.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-10 px-4">
        
        <Card className="w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl rounded-[24px] overflow-hidden border-none bg-white">
          
          {/* HEADER: AZUL MARINO CORPORATIVO (#0b212f) */}
          <CardHeader style={{ backgroundColor: '#0b212f' }} className="text-white py-5 px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div style={{ backgroundColor: 'rgba(243, 156, 18, 0.2)' }} className="p-2.5 rounded-xl border border-[#f39c12]/30">
                  <Bot className="h-6 w-6" style={{ color: '#f39c12' }} />
                </div>
                <div>
                  <CardTitle className="text-xl font-black tracking-tight italic">Asistente InTrack</CardTitle>
                  <p style={{ color: '#f39c12' }} className="text-[10px] font-black tracking-[0.2em] uppercase">Soporte Inteligente</p>
                </div>
              </div>
              <Sparkles className="h-5 w-5 opacity-30 text-orange-400" />
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-slate-50/50">
            <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-8 space-y-6">
              {messages.map((msg, index) => (
                <div key={index} className={cn('flex items-start gap-4', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {msg.role === 'assistant' && (
                    <Avatar className="h-10 w-10 border border-slate-200 shadow-sm bg-white">
                      <AvatarImage src="/logoi.png" />
                      <AvatarFallback>IT</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div 
                    className={cn(
                      'rounded-[22px] px-6 py-4 max-w-[80%] shadow-sm text-[15px] leading-relaxed',
                      msg.role === 'user' 
                        ? 'text-white rounded-tr-none font-medium' 
                        : 'bg-white text-[#0b212f] border border-slate-200 rounded-tl-none'
                    )}
                    style={msg.role === 'user' ? { backgroundColor: '#f39c12' } : {}}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>

                  {msg.role === 'user' && (
                    <Avatar className="h-10 w-10 border shadow-sm">
                      <AvatarFallback style={{ backgroundColor: '#0b212f' }} className="text-white font-bold text-xs">YO</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border shadow-sm bg-white"><AvatarImage src="/logoi.png" /></Avatar>
                  <div className="rounded-[22px] px-8 py-4 bg-white border border-slate-200 flex items-center gap-3">
                    <Loader2 className="h-4 w-4 animate-spin" style={{ color: '#f39c12' }} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">InTrack está escribiendo...</span>
                  </div>
                </div>
              )}
            </div>

            {/* BARRA DE ENTRADA */}
            <div className="p-6 bg-white border-t border-slate-100">
              <form onSubmit={handleSubmit} className="flex items-center gap-3 relative max-w-3xl mx-auto">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu consulta logística..."
                  className="w-full rounded-full bg-slate-50 border border-slate-200 h-14 px-8 pr-16 focus:outline-none focus:border-[#f39c12] transition-all text-slate-800 shadow-inner"
                  style={{ fontSize: '15px' }}
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 h-10 w-10 text-white rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
                  style={{ backgroundColor: '#f39c12' }}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
