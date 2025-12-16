// src/app/assistent/page.tsx
'use client';

import React, {useState, useRef, useEffect} from 'react';
import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent} from '@/components/ui/card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Send, Loader2, User, Bot} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {AlertCircle} from 'lucide-react';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {text: input, sender: 'user'};
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: input}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Hi ha hagut un problema amb la resposta del servidor.'
        );
      }

      const data = await response.json();
      const botMessage: Message = {text: data.reply, sender: 'bot'};
      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      setError(
        err.message || 'No s`ha pogut connectar amb l`assistent. Prova-ho de nou.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center py-8 sm:py-12">
        <div className="w-full max-w-3xl mx-auto px-4 flex flex-col h-[80vh]">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Assistent Virtual
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Fes-me una pregunta i faré tot el possible per ajudar-te.
            </p>
          </div>

          <Card className="flex-1 flex flex-col">
            <CardContent className="flex-1 p-4 sm:p-6 overflow-y-auto">
              <div className="space-y-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-start gap-3',
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}>
                    {msg.sender === 'bot' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl',
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted text-muted-foreground rounded-bl-none'
                      )}>
                      <p className="text-sm break-words">{msg.text}</p>
                    </div>
                    {msg.sender === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-muted">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <div className="p-4 border-t">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Escriu el teu missatge..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">Enviar</span>
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
