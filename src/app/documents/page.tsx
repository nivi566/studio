'use client';

// Esta línea soluciona el error de Netlify
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Printer, ArrowLeft, FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Logo } from '@/components/icons/logo';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ... (El resto de tus tipos y funciones auxiliares se mantienen igual)
type DocumentLine = {
  num_factura: string;
  data: string;
  usuari: string;
  concepte: string;
  preu_unitari: string;
  unitats: string;
  iva: string;
  dte: string;
  fpagament: string;
  albara: string;
  estat: 'Pagada' | 'Pendent';
};

type UserData = {
  usuari: string;
  empresa: string;
  fiscalid: string;
  adreca: string;
  rol: string;
  telefon: string;
};

type VatDetail = {
    base: number;
    amount: number;
}

type GroupedInvoice = {
  id: string;
  date: string;
  status: 'Pagada' | 'Pendent';
  lines: {
    concept: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    netTotal: number;
    vatRate: number;
  }[];
  subtotal: number;
  vatDetails: Record<string, VatDetail>;
  total: number;
  paymentMethod: string;
  clientData?: UserData;
};

const safeParseFloat = (value: string | number | null | undefined, defaultValue = 0): number => {
    if (value === null || value === undefined) return defaultValue;
    const stringValue = String(value).replace(/,/g, '.').replace(/€/g, '').trim();
    const parsed = parseFloat(stringValue);
    return isNaN(parsed) ? defaultValue : parsed;
};

// COMPONENTE PRINCIPAL QUE AHORA INCLUYE SUSPENSE PARA MAYOR SEGURIDAD
export default function DocumentsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    }>
      <DocumentsContent />
    </Suspense>
  );
}

function DocumentsContent() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [invoices, setInvoices] = useState<GroupedInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<GroupedInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.usuari) {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const [docsRes, usersRes] = await Promise.all([
            fetch('https://sheetdb.io/api/v1/nmk5zmlkneovd?sheet=documents'),
            fetch('https://sheetdb.io/api/v1/nmk5zmlkneovd?sheet=usuari')
          ]);

          if (!docsRes.ok) throw new Error(`Error al obtener los documentos: ${docsRes.statusText}`);
          if (!usersRes.ok) throw new Error(`Error al obtener los usuarios: ${usersRes.statusText}`);

          const allDocs: DocumentLine[] = await docsRes.json();
          const allUsers: UserData[] = await usersRes.json();
          
          const currentUserData = allUsers.find(u => u.usuari && u.usuari.toLowerCase() === user.usuari.toLowerCase());
          const currentUserRole = currentUserData?.rol?.toLowerCase() || 'client';

          const isAdmin = ['admin', 'administrador', 'treballador'].includes(currentUserRole);

          const userDocs = isAdmin 
            ? allDocs 
            : allDocs.filter(doc => doc.usuari && doc.usuari.toLowerCase() === user.usuari.toLowerCase());
          
          if (userDocs.length === 0) {
            setInvoices([]);
            setIsLoading(false);
            return;
          }

          const usersMap = new Map(allUsers.map(u => [u.usuari.toLowerCase(), u]));

          const grouped = userDocs.reduce((acc, doc) => {
            const { num_factura, data, concepte, preu_unitari, unitats, iva, dte, fpagament, estat } = doc;
            if (!num_factura) return acc;

            if (!acc[num_factura]) {
              acc[num_factura] = {
                id: num_factura,
                date: data,
                paymentMethod: fpagament,
                status: estat === 'Pagada' ? 'Pagada' : 'Pendent',
                lines: [],
                clientData: usersMap.get(doc.usuari.toLowerCase()),
              };
            }

            const unitPrice = safeParseFloat(preu_unitari);
            const quantity = safeParseFloat(unitats);
            const discountPercentage = safeParseFloat(dte);
            const vatRate = safeParseFloat(iva);
            
            const grossTotal = unitPrice * quantity;
            const discountAmount = grossTotal * (discountPercentage / 100);
            const netTotal = grossTotal - discountAmount;

            acc[num_factura].lines.push({
                concept: concepte,
                quantity: quantity,
                unitPrice: unitPrice,
                discount: discountPercentage,
                netTotal: netTotal,
                vatRate: vatRate,
            });
            
            return acc;
          }, {} as Record<string, any>);
          
          const processedInvoices: GroupedInvoice[] = Object.values(grouped).map((invoice: any) => {
              const subtotal = invoice.lines.reduce((sum: number, line: any) => sum + line.netTotal, 0);
              const vatDetails = invoice.lines.reduce((acc: Record<string, VatDetail>, line: any) => {
                  const rate = String(line.vatRate);
                  if (!acc[rate]) {
                      acc[rate] = { base: 0, amount: 0 };
                  }
                  acc[rate].base += line.netTotal;
                  acc[rate].amount += line.netTotal * (line.vatRate / 100);
                  return acc;
              }, {});
              
              const totalVat = Object.values(vatDetails).reduce((sum, detail) => sum + detail.amount, 0);
              const total = subtotal + totalVat;

              return { ...invoice, subtotal, vatDetails, total };
          });

          setInvoices(processedInvoices.sort((a, b) => {
            try {
              const dateA = new Date(a.date.split('/').reverse().join('-')).getTime();
              const dateB = new Date(b.date.split('/').reverse().join('-')).getTime();
              return dateB - dateA;
            } catch {
              return 0;
            }
          }));
          
        } catch (e: any) {
          setError(e.message || 'Ha habido un problema al cargar tus facturas.');
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (invoices.length > 0) {
      const invoiceIdFromQuery = searchParams.get('id');
      if (invoiceIdFromQuery) {
        const invoiceToSelect = invoices.find(inv => inv.id === invoiceIdFromQuery);
        if (invoiceToSelect) {
          setSelectedInvoice(invoiceToSelect);
        }
      }
    }
  }, [invoices, searchParams]);

  // ... (Aquí sigue el resto de tu código de renderizado igual que lo tenías)
  // handlePrint, formatDate, y los returns de la UI...
  const handlePrint = () => window.print();
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const parts = dateString.split('/');
      if (parts.length === 3) {
          const [day, month, year] = parts;
          const isoDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
          if (!isNaN(isoDate.getTime())) return isoDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
      }
      return dateString;
    } catch (e) { return dateString; }
  }

  if (authLoading || (!user && !isLoading)) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header /><main className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></main><Footer />
      </div>
    );
  }

  // --- COPIA AQUÍ TUS RETURNS DE LA UI (EL DEL SELECTEDINVOICE Y EL LISTADO) ---
  // (Los he omitido por brevedad pero deben ir dentro de este DocumentsContent)
  
  if (selectedInvoice) {
    // ... tu bloque de selectedInvoice
    return (
        <div className="container mx-auto px-4 py-8">
            <Button onClick={() => setSelectedInvoice(null)}><ArrowLeft className="mr-2"/>Volver</Button>
            <div id="zona-factura" className="p-8 border mt-4">
                <h1 className="text-2xl font-bold">Factura {selectedInvoice.id}</h1>
                <p>Total: {selectedInvoice.total.toFixed(2)} €</p>
                {/* Agrega aquí el resto de tu tabla de factura */}
            </div>
        </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Mis Facturas</h1>
        {isLoading ? <Loader2 className="animate-spin" /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {invoices.map(inv => (
                    <Card key={inv.id} className="p-4">
                        <CardTitle>Factura {inv.id}</CardTitle>
                        <p className="text-2xl font-bold">{inv.total.toFixed(2)} €</p>
                        <Button className="w-full mt-4" onClick={() => setSelectedInvoice(inv)}>Ver</Button>
                    </Card>
                ))}
            </div>
        )}
      </main>
      <Footer />
    </div>
  );
}