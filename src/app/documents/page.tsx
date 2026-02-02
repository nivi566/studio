'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Printer, ArrowLeft, FileText, AlertCircle, ClipboardList } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Logo } from '@/components/icons/logo';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- TIPOS DE DATOS ---
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

          if (!docsRes.ok) throw new Error(`Error: ${docsRes.statusText}`);
          if (!usersRes.ok) throw new Error(`Error: ${usersRes.statusText}`);

          const allDocs: DocumentLine[] = await docsRes.json();
          const allUsers: UserData[] = await usersRes.json();
          
          const currentUserData = allUsers.find(u => u.usuari?.toLowerCase() === user.usuari.toLowerCase());
          const isAdmin = ['admin', 'administrador', 'treballador'].includes(currentUserData?.rol?.toLowerCase() || 'client');

          const userDocs = isAdmin 
            ? allDocs 
            : allDocs.filter(doc => doc.usuari?.toLowerCase() === user.usuari.toLowerCase());
          
          const usersMap = new Map(allUsers.map(u => [u.usuari.toLowerCase(), u]));

          const grouped = userDocs.reduce((acc, doc) => {
            if (!doc.num_factura) return acc;
            if (!acc[doc.num_factura]) {
              acc[doc.num_factura] = {
                id: doc.num_factura,
                date: doc.data,
                paymentMethod: doc.fpagament,
                status: doc.estat === 'Pagada' ? 'Pagada' : 'Pendent',
                lines: [],
                clientData: usersMap.get(doc.usuari.toLowerCase()),
              };
            }

            const unitPrice = safeParseFloat(doc.preu_unitari);
            const quantity = safeParseFloat(doc.unitats);
            const discountPercentage = safeParseFloat(doc.dte);
            const netTotal = (unitPrice * quantity) * (1 - discountPercentage / 100);

            acc[doc.num_factura].lines.push({
                concept: doc.concepte,
                quantity: quantity,
                unitPrice: unitPrice,
                discount: discountPercentage,
                netTotal: netTotal,
                vatRate: safeParseFloat(doc.iva),
            });
            return acc;
          }, {} as Record<string, any>);
          
          const processedInvoices: GroupedInvoice[] = Object.values(grouped).map((invoice: any) => {
              const subtotal = invoice.lines.reduce((sum: number, line: any) => sum + line.netTotal, 0);
              const vatDetails = invoice.lines.reduce((acc: any, line: any) => {
                  const rate = String(line.vatRate);
                  if (!acc[rate]) acc[rate] = { base: 0, amount: 0 };
                  acc[rate].base += line.netTotal;
                  acc[rate].amount += line.netTotal * (line.vatRate / 100);
                  return acc;
              }, {});
              const total = subtotal + Object.values(vatDetails).reduce((sum: number, d: any) => sum + d.amount, 0);
              return { ...invoice, subtotal, vatDetails, total };
          });

          setInvoices(processedInvoices.sort((a, b) => b.id.localeCompare(a.id)));
        } catch (e: any) {
          setError('Error al cargar las facturas.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  const handlePrint = () => window.print();
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    }
    return dateString;
  }

  // --- VISTA DETALLE DE FACTURA ---
  if (selectedInvoice) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-8 flex justify-between items-center print:hidden">
            <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al listado
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Imprimir Factura
            </Button>
          </div>

          <div id="zona-factura" className="bg-white p-8 sm:p-12 rounded-lg border shadow-lg text-slate-900">
            <header className="flex justify-between items-start pb-8 border-b">
              <div>
                <h1 className="text-3xl font-bold">FACTURA</h1>
                <p className="text-slate-500">Nº: {selectedInvoice.id}</p>
                <p className="text-slate-500">Fecha: {formatDate(selectedInvoice.date)}</p>
                <Badge className={cn("mt-2", selectedInvoice.status === 'Pagada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
                  {selectedInvoice.status}
                </Badge>
              </div>
              <Logo />
            </header>

            <section className="grid sm:grid-cols-2 gap-8 my-8 text-sm">
              <div>
                <h2 className="font-bold mb-2 text-slate-900 uppercase">De:</h2>
                <address className="not-italic text-slate-600">
                  <strong>InTrack Logistics, S.L.</strong><br/>
                  Calle Resina, 41. 28021, Madrid<br/>
                  NIF: B12345678
                </address>
              </div>
              <div>
                <h2 className="font-bold mb-2 text-slate-900 uppercase">Para:</h2>
                <address className="not-italic text-slate-600">
                  <strong>{selectedInvoice.clientData?.empresa || 'Cliente'}</strong><br/>
                  {selectedInvoice.clientData?.adreca}<br/>
                  NIF: {selectedInvoice.clientData?.fiscalid}
                </address>
              </div>
            </section>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="text-right">Cant.</TableHead>
                  <TableHead className="text-right">P. Unitario</TableHead>
                  <TableHead className="text-right">Total Neto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedInvoice.lines.map((line, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{line.concept}</TableCell>
                    <TableCell className="text-right">{line.quantity}</TableCell>
                    <TableCell className="text-right">{line.unitPrice.toFixed(2)} €</TableCell>
                    <TableCell className="text-right">{line.netTotal.toFixed(2)} €</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <section className="flex flex-col items-end mt-8 border-t pt-4">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Base Imponible:</span>
                  <span>{selectedInvoice.subtotal.toFixed(2)} €</span>
                </div>
                {Object.entries(selectedInvoice.vatDetails).map(([rate, det]: any) => (
                  <div key={rate} className="flex justify-between text-sm">
                    <span className="text-slate-500">IVA ({rate}%):</span>
                    <span>{det.amount.toFixed(2)} €</span>
                  </div>
                ))}
                <div className="flex justify-between text-xl font-bold text-orange-500 pt-2 border-t">
                  <span>TOTAL:</span>
                  <span>{selectedInvoice.total.toFixed(2)} €</span>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- VISTA LISTADO (TARJETAS COMO ALBARANES) ---
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Mis Facturas</h1>
              <p className="text-slate-500 mt-2 text-lg">Consulta y gestiona tus documentos de facturación.</p>
            </div>
            <Button variant="outline" className="hidden sm:flex" onClick={() => router.push('/dashboard')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a mi perfil
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-orange-500" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {invoices.map(invoice => (
                <Card key={invoice.id} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-800">Factura {invoice.id}</CardTitle>
                        <CardDescription className="font-medium">{formatDate(invoice.date)}</CardDescription>
                      </div>
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <ClipboardList className="h-6 w-6 text-slate-500" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <Badge className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold",
                        invoice.status === 'Pagada' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {invoice.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-right mb-6">
                      <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Importe Total</p>
                      <span className="text-4xl font-black text-orange-500">
                        {invoice.total.toFixed(2)} <span className="text-2xl">€</span>
                      </span>
                    </div>
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-7 text-lg shadow-lg shadow-orange-200 transition-all active:scale-95"
                      onClick={() => setSelectedInvoice(invoice)}
                    >
                      Ver Factura
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}