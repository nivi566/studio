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
import { Loader2, Printer, ArrowLeft, ClipboardList, User, Home, FileText } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- TIPOS ---
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
  estat: string;
  albara: string; 
};

type UserData = { usuari: string; empresa: string; fiscalid: string; adreca: string; rol: string; telefon: string; };

type GroupedInvoice = {
  id: string; 
  albaranId: string;
  date: string; 
  status: string;
  lines: any[]; 
  subtotal: number; 
  vatDetails: any; 
  total: number;
  paymentMethod: string; 
  clientData?: UserData;
  tipoDocumento: 'Factura' | 'Albarán';
};

const safeParseFloat = (v: any) => {
  const s = String(v || '0').replace(/,/g, '.').replace(/[€%]/g, '').trim();
  return isNaN(parseFloat(s)) ? 0 : parseFloat(s);
};

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="animate-spin text-[#f39200]" /></div>}>
      <DocumentsContent />
    </Suspense>
  );
}

function DocumentsContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const lang = searchParams.get('lang') || 'es';
  const t = {
    es: { title: "Mis Documentos", sub: "Facturas y albaranes vinculados", factura: "Factura", albaran: "Albarán", volver: "Volver", perfil: "Mi Perfil", inicio: "Inicio", imprimir: "Imprimir", concepto: "Concepto", cant: "Cant.", precio: "P. Unitario", totalNeto: "Total Neto", total: "TOTAL", base: "Base Imponible", formaPago: "Forma de pago", registro: "Inscrita en el Registro Mercantil de Madrid, Tomo 1234, Folio 56, Hoja M-78901.", rgpd: "De acuerdo con la normativa vigente en protección de datos (RGPD), le informamos que sus datos forman parte de un fichero propiedad de InTrack Logistics, S.L." },
    ca: { title: "Els meus Documents", sub: "Factures i albarans vinculats", factura: "Factura", albaran: "Albarà", volver: "Tornar", perfil: "El meu Perfil", inicio: "Inici", imprimir: "Imprimir", concepto: "Concepte", cant: "Quant.", precio: "P. Unitari", totalNeto: "Total Net", total: "TOTAL", base: "Base Imponible", formaPago: "Forma de pagament", registro: "Inscrita en el Registre Mercantil de Madrid, Tom 1234, Foli 56, Full M-78901.", rgpd: "D'acord amb la normativa vigent en protecció de dades (RGPD), l'informem que les seves dades formen part d'un fitxer propietat d'InTrack Logistics, S.L." },
    en: { title: "My Documents", sub: "Linked invoices and delivery notes", factura: "Invoice", albaran: "Delivery Note", volver: "Back", perfil: "My Profile", inicio: "Home", imprimir: "Print", concepto: "Concept", cant: "Qty.", precio: "Unit Price", totalNeto: "Net Total", total: "TOTAL", base: "Tax Base", formaPago: "Payment method", registro: "Registered in the Mercantile Registry of Madrid, Volume 1234, Folio 56, Page M-78901.", rgpd: "In accordance with current regulations on data protection (GDPR), we inform you that your data is part of a file owned by InTrack Logistics, S.L." }
  }[lang as 'es'|'ca'|'en'] || t.es;

  const [documents, setDocuments] = useState<GroupedInvoice[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<GroupedInvoice | null>(null);
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
            const docId = doc.num_factura || doc.albara;
            if (!docId) return acc;

            if (!acc[docId]) {
              acc[docId] = {
                id: docId,
                albaranId: doc.albara || '',
                date: doc.data,
                paymentMethod: doc.fpagament,
                status: doc.estat === 'Pagada' ? 'Pagada' : 'Pendent',
                lines: [],
                clientData: usersMap.get(doc.usuari.toLowerCase()),
                tipoDocumento: doc.num_factura ? 'Factura' : 'Albarán'
              };
            }
            const up = safeParseFloat(doc.preu_unitari);
            const q = safeParseFloat(doc.unitats);
            const d = safeParseFloat(doc.dte);
            const net = (up * q) * (1 - d / 100);
            acc[docId].lines.push({ concept: doc.concepte, quantity: q, unitPrice: up, discount: d, netTotal: net, vatRate: safeParseFloat(doc.iva) });
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

          setDocuments(processed.sort((a, b) => b.id.localeCompare(a.id)));

          const urlId = searchParams.get('id');
          if (urlId) {
            const found = processed.find(i => i.id === urlId);
            if (found) setSelectedDoc(found);
          }
        } catch (e) { console.error(e); } finally { setIsLoading(false); }
      };
      fetchData();
    }
  }, [user, searchParams]);

  const formatDate = (ds: string) => {
    const p = ds.split('/');
    return p.length === 3 ? new Date(`${p[2]}-${p[1]}-${p[0]}`).toLocaleDateString(lang === 'ca' ? 'ca-ES' : 'es-ES', { day: '2-digit', month: 'long', year: 'numeric' }) : ds;
  };

  if (selectedDoc) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between print:hidden">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedDoc(null)}><ArrowLeft className="mr-2 h-4 w-4"/>{t.volver}</Button>
              <Button variant="ghost" onClick={() => router.push('/')}><Home className="mr-2 h-4 w-4 text-[#f39200]"/>{t.inicio}</Button>
            </div>
            <Button className="bg-[#f39200] hover:bg-[#d88200] text-white font-bold" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4"/>{t.imprimir}</Button>
          </div>

          <div className="bg-white p-10 rounded-lg border shadow-sm text-slate-900 max-w-5xl mx-auto border-t-8 border-t-[#f39200]">
            <div className="flex justify-between items-start border-b pb-8">
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-1 tracking-tighter uppercase">
                  {selectedDoc.tipoDocumento === 'Albarán' ? t.albaran : t.factura}
                </h1>
                <p className="text-slate-500 font-medium text-lg">Nº: {selectedDoc.id}</p>
                {selectedDoc.albaranId && selectedDoc.tipoDocumento === 'Factura' && (
                    <p className="text-[#f39200] font-bold text-sm">Albarán: {selectedDoc.albaranId}</p>
                )}
                <p className="text-slate-500 font-medium">{formatDate(selectedDoc.date)}</p>
                <Badge className={cn("mt-3 px-3 py-1", selectedDoc.status === 'Pagada' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200')}>
                  {selectedDoc.status}
                </Badge>
              </div>
              <Logo />
            </div>

            <div className="grid grid-cols-2 gap-12 my-10 text-sm">
              <div>
                <h2 className="font-bold text-slate-900 uppercase mb-3 tracking-wider text-xs">De:</h2>
                <div className="text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800 text-base">InTrack Logistics, S.L.</p>
                  <p>Calle Resina, 41, 28021, Madrid, España</p>
                  <p>NIF: B12345678</p>
                </div>
              </div>
              <div>
                <h2 className="font-bold text-slate-900 uppercase mb-3 tracking-wider text-xs">Para:</h2>
                <div className="text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800 text-base">{selectedDoc.clientData?.empresa || 'Cliente'}</p>
                  <p>{selectedDoc.clientData?.adreca}</p>
                  <p>NIF: {selectedDoc.clientData?.fiscalid}</p>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-slate-800">{t.concepto}</TableHead>
                  <TableHead className="text-right font-bold text-slate-800">{t.cant}</TableHead>
                  <TableHead className="text-right font-bold text-slate-800">{t.precio}</TableHead>
                  <TableHead className="text-right font-bold text-slate-800">{t.totalNeto}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedDoc.lines.map((l, i) => (
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
              <div className="w-64 space-y-2 border-t pt-4 text-right">
                <div className="flex justify-between text-slate-500 text-sm">
                  <span>{t.base}:</span>
                  <span className="font-bold text-slate-800">{selectedDoc.subtotal.toFixed(2)} €</span>
                </div>
                {Object.entries(selectedDoc.vatDetails).map(([r, d]: any) => (
                  <div key={r} className="flex justify-between text-slate-500 text-sm">
                    <span>IVA ({r}%):</span>
                    <span className="font-bold text-slate-800">{d.amount.toFixed(2)} €</span>
                  </div>
                ))}
                <div className="flex justify-between pt-4 text-[#f39200] border-t font-black">
                  <span className="text-lg">{t.total}:</span>
                  <span className="text-2xl">{selectedDoc.total.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t text-[10px] text-slate-400 leading-relaxed">
              <p className="font-bold mb-1 text-slate-500 italic">{t.formaPago}: {selectedDoc.paymentMethod || 'Transferencia'}</p>
              <p className="mb-4 text-slate-400 font-medium italic">{t.registro}</p>
              <p>{t.rgpd}</p>
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
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{t.title}</h1>
            <p className="text-slate-500 mt-1">{t.sub}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white" onClick={() => router.push('/')}>
              <Home className="mr-2 h-4 w-4 text-[#f39200]" /> {t.inicio}
            </Button>
            <Button variant="outline" className="bg-white border-slate-200" onClick={() => router.push('/dashboard')}>
              <User className="mr-2 h-4 w-4 text-[#f39200]" /> {t.perfil}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-[#f39200]" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documents.map(doc => (
              <Card key={doc.id} className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group">
                <CardHeader className="pb-2 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold group-hover:text-[#f39200] transition-colors">
                      {doc.tipoDocumento === 'Albarán' ? t.albaran : t.factura} {doc.id}
                    </CardTitle>
                    <CardDescription className="font-medium text-slate-400">{formatDate(doc.date)}</CardDescription>
                  </div>
                  <div className="p-2 bg-orange-50 rounded-lg">
                    {doc.tipoDocumento === 'Albarán' ? <FileText className="h-6 w-6 text-[#f39200]" /> : <ClipboardList className="h-6 w-6 text-[#f39200]" />}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Badge className={cn("mb-4 px-3 py-1", doc.status === 'Pagada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                    {doc.status}
                  </Badge>
                  <div className="text-right mb-6">
                    <p className="text-4xl font-black text-slate-900 group-hover:text-[#f39200] transition-colors">
                      {doc.total.toFixed(2)} <span className="text-xl">€</span>
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-[#f39200] hover:bg-[#d88200] text-white font-bold py-7 text-lg shadow-lg shadow-orange-100 transition-transform active:scale-95" 
                    onClick={() => setSelectedDoc(doc)}
                  >
                    Ver {doc.tipoDocumento === 'Albarán' ? t.albaran : t.factura}
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