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
import { Loader2, Printer, ArrowLeft, ClipboardList, User } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- TIPOS ---
type DocumentLine = {
  num_factura: string; data: string; usuari: string; concepte: string;
  preu_unitari: string; unitats: string; iva: string; dte: string;
  fpagament: string; estat: 'Pagada' | 'Pendent';
};

type UserData = { usuari: string; empresa: string; fiscalid: string; adreca: string; rol: string; telefon: string; };

type GroupedInvoice = {
  id: string; date: string; status: 'Pagada' | 'Pendent';
  lines: any[]; subtotal: number; vatDetails: any; total: number;
  paymentMethod: string; clientData?: UserData;
};

const safeParseFloat = (v: any) => {
  const s = String(v || '0').replace(/,/g, '.').replace(/[€%]/g, '').trim();
  return isNaN(parseFloat(s)) ? 0 : parseFloat(s);
};

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="animate-spin text-orange-500" /></div>}>
      <DocumentsContent />
    </Suspense>
  );
}

function DocumentsContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [invoices, setInvoices] = useState<GroupedInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<GroupedInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.usuari) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const [docsRes, usersRes] = await Promise.all([
            fetch('https://sheetdb.io/api/v1/nmk5zmlkneovd?sheet=documents'),
            fetch('https://sheetdb.io/api/v1/nmk5zmlkneovd?sheet=usuari')
          ]);
          const allDocs: DocumentLine[] = await docsRes.json();
          const allUsers: UserData[] = await usersRes.json();
          
          const currentUserData = allUsers.find(u => u.usuari?.toLowerCase() === user.usuari.toLowerCase());
          const isAdmin = ['admin', 'administrador', 'treballador'].includes(currentUserData?.rol?.toLowerCase() || 'client');
          const userDocs = isAdmin ? allDocs : allDocs.filter(doc => doc.usuari?.toLowerCase() === user.usuari.toLowerCase());
          const usersMap = new Map(allUsers.map(u => [u.usuari.toLowerCase(), u]));

          const grouped = userDocs.reduce((acc, doc) => {
            if (!doc.num_factura) return acc;
            if (!acc[doc.num_factura]) {
              acc[doc.num_factura] = {
                id: doc.num_factura, date: doc.data, paymentMethod: doc.fpagament,
                status: doc.estat === 'Pagada' ? 'Pagada' : 'Pendent',
                lines: [], clientData: usersMap.get(doc.usuari.toLowerCase()),
              };
            }
            const up = safeParseFloat(doc.preu_unitari);
            const q = safeParseFloat(doc.unitats);
            const d = safeParseFloat(doc.dte);
            const net = (up * q) * (1 - d / 100);
            acc[doc.num_factura].lines.push({ concept: doc.concepte, quantity: q, unitPrice: up, discount: d, netTotal: net, vatRate: safeParseFloat(doc.iva) });
            return acc;
          }, {} as any);
          
          const processed: GroupedInvoice[] = Object.values(grouped).map((inv: any) => {
            const sub = inv.lines.reduce((s: number, l: any) => s + l.netTotal, 0);
            const vats = inv.lines.reduce((a: any, l: any) => {
              const r = String(l.vatRate);
              if (!a[r]) a[r] = { base: 0, amount: 0 };
              a[r].base += l.netTotal; a[r].amount += l.netTotal * (l.vatRate / 100);
              return a;
            }, {});
            const tot = sub + Object.values(vats).reduce((s: number, d: any) => s + d.amount, 0);
            return { ...inv, subtotal: sub, vatDetails: vats, total: tot };
          });

          const sorted = processed.sort((a, b) => b.id.localeCompare(a.id));
          setInvoices(sorted);

          const urlId = searchParams.get('id');
          if (urlId) {
            const found = sorted.find(i => i.id === urlId);
            if (found) setSelectedInvoice(found);
          }
        } catch (e) { console.error(e); } finally { setIsLoading(false); }
      };
      fetchData();
    }
  }, [user, searchParams]);

  const formatDate = (ds: string) => {
    const p = ds.split('/');
    return p.length === 3 ? new Date(`${p[2]}-${p[1]}-${p[0]}`).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }) : ds;
  };

  if (selectedInvoice) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between print:hidden">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedInvoice(null)}><ArrowLeft className="mr-2 h-4 w-4"/>Volver al listado</Button>
              <Button variant="ghost" onClick={() => router.push('/dashboard')}><User className="mr-2 h-4 w-4"/>Mi Perfil</Button>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4"/>Imprimir</Button>
          </div>

          <div className="bg-white p-10 rounded-lg border shadow-sm text-slate-900 max-w-5xl mx-auto border-t-8 border-t-orange-500">
            <div className="flex justify-between items-start border-b pb-8">
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-1 tracking-tighter uppercase">Factura</h1>
                <p className="text-slate-500 font-medium text-lg">Nº: {selectedInvoice.id}</p>
                <p className="text-slate-500 font-medium">Fecha: {formatDate(selectedInvoice.date)}</p>
                <Badge className={cn("mt-3 px-3 py-1", selectedInvoice.status === 'Pagada' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200')}>
                  {selectedInvoice.status}
                </Badge>
              </div>
              <Logo />
            </div>

            <div className="grid grid-cols-2 gap-12 my-10 text-sm">
              <div>
                <h2 className="font-bold text-slate-900 uppercase mb-3 tracking-wider text-xs">De:</h2>
                <div className="text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800 text-base">InTrack Logistics, S.L.</p>
                  <p>Calle Resina, 41</p>
                  <p>28021, Madrid, España</p>
                  <p>NIF: B12345678</p>
                </div>
              </div>
              <div>
                <h2 className="font-bold text-slate-900 uppercase mb-3 tracking-wider text-xs">Para:</h2>
                <div className="text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800 text-base">{selectedInvoice.clientData?.empresa || 'Cliente'}</p>
                  <p>{selectedInvoice.clientData?.adreca}</p>
                  <p>NIF: {selectedInvoice.clientData?.fiscalid}</p>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-slate-800">Concepto</TableHead>
                  <TableHead className="text-right font-bold text-slate-800">Cant.</TableHead>
                  <TableHead className="text-right font-bold text-slate-800">P. Unitario</TableHead>
                  <TableHead className="text-right font-bold text-slate-800">Total Neto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedInvoice.lines.map((l, i) => (
                  <TableRow key={i} className="border-b">
                    <TableCell className="py-4 font-medium text-slate-700">{l.concept}</TableCell>
                    <TableCell className="text-right">{l.quantity}</TableCell>
                    <TableCell className="text-right">{l.unitPrice.toFixed(2)} €</TableCell>
                    <TableCell className="text-right font-bold text-slate-900">{l.netTotal.toFixed(2)} €</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-10 flex flex-col items-end space-y-2">
              <div className="w-64 space-y-2 border-t pt-4">
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>Base Imponible:</span>
                  <span className="font-bold text-slate-800">{selectedInvoice.subtotal.toFixed(2)} €</span>
                </div>
                {Object.entries(selectedInvoice.vatDetails).map(([r, d]: any) => (
                  <div key={r} className="flex justify-between text-slate-500 text-sm">
                    <span>IVA ({r}%):</span>
                    <span className="font-bold text-slate-800">{d.amount.toFixed(2)} €</span>
                  </div>
                ))}
                <div className="flex justify-between pt-4 text-orange-600 border-t">
                  <span className="text-lg font-black tracking-tighter">TOTAL:</span>
                  <span className="text-2xl font-black tracking-tight">{selectedInvoice.total.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t text-[10px] text-slate-400 leading-relaxed">
              <p className="font-bold mb-1 text-slate-500">Forma de pago: {selectedInvoice.paymentMethod || 'Transferencia'}</p>
              <p className="mb-4 text-slate-400 font-medium italic">Inscrita en el Registro Mercantil de Madrid, Tomo 1234, Folio 56, Hoja M-78901.</p>
              <p>De acuerdo con la normativa vigente en protección de datos (RGPD), le informamos que sus datos forman parte de un fichero propiedad de InTrack Logistics, S.L.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mis Facturas</h1>
            <p className="text-slate-500 mt-1">Gestione sus documentos y pagos</p>
          </div>
          <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50 shadow-sm" onClick={() => router.push('/dashboard')}>
            <User className="mr-2 h-4 w-4 text-orange-500" /> Volver al perfil
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-orange-500" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {invoices.map(inv => (
              <Card key={inv.id} className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group">
                <CardHeader className="pb-2 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold group-hover:text-orange-500 transition-colors">Factura {inv.id}</CardTitle>
                    <CardDescription className="font-medium text-slate-400">{formatDate(inv.date)}</CardDescription>
                  </div>
                  <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                    <ClipboardList className="h-6 w-6 text-orange-500" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Badge className={cn("mb-4 px-3 py-1", inv.status === 'Pagada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700 border-none')}>
                    {inv.status}
                  </Badge>
                  <div className="text-right mb-6">
                    <p className="text-4xl font-black text-slate-900 group-hover:text-orange-500 transition-colors">
                      {inv.total.toFixed(2)} <span className="text-xl">€</span>
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-7 text-lg shadow-lg shadow-orange-100 transition-transform active:scale-95" 
                    onClick={() => setSelectedInvoice(inv)}
                  >
                    Ver Factura
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}