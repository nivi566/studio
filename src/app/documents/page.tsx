'use client';

import React, { useState, useEffect } from 'react';
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
          setError(e.message || 'Ha habido un problema al cargar tus facturas. Por favor, inténtalo de nuevo más tarde.');
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


  const handlePrint = () => {
    window.print();
  };

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
      } catch (e) {
          return dateString;
      }
  }

  if (authLoading || (!user && !isLoading)) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }
  
  if (selectedInvoice) {
    const { clientData } = selectedInvoice;
    const printStyles = `
      @media print {
        body * {
          visibility: hidden;
        }
        #zona-factura, #zona-factura * {
          visibility: visible;
        }
        #zona-factura {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          margin: 0;
          padding: 0;
          border: none;
          box-shadow: none;
        }
      }
    `;

    return (
      <>
        <style>{printStyles}</style>
        <div className="bg-background print:bg-white">
          <div className="container mx-auto px-4 py-8 print:p-0">
            <div className="mb-8 flex justify-between items-center print:hidden">
              <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
                <ArrowLeft className="mr-2" />
                Volver al listado
              </Button>
              <Button onClick={handlePrint}>
                <Printer className="mr-2" />
                Imprimir PDF
              </Button>
            </div>

            <div id="zona-factura" className="bg-card text-card-foreground p-8 sm:p-12 rounded-lg border shadow-lg">
              <header className="flex justify-between items-start pb-8 border-b">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">FACTURA</h1>
                  <p className="text-muted-foreground">Nº: {selectedInvoice.id}</p>
                  <p className="text-muted-foreground">Fecha: {formatDate(selectedInvoice.date)}</p>
                  <Badge className={cn(
                      "mt-2",
                      selectedInvoice.status === 'Pagada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  )}>
                      {selectedInvoice.status}
                  </Badge>
                </div>
                <Logo />
              </header>

              <section className="grid sm:grid-cols-2 gap-8 my-8">
                <div>
                  <h2 className="font-semibold text-foreground mb-2">De:</h2>
                  <address className="not-italic text-sm text-muted-foreground">
                    <strong>InTrack Logistics, S.L.</strong><br/>
                    Calle Resina, 41<br/>
                    28021, Madrid, España<br/>
                    NIF: B12345678<br/>
                    Tel: +34 912 345 678
                  </address>
                </div>
                <div>
                  <h2 className="font-semibold text-foreground mb-2">Para:</h2>
                  {clientData ? (
                    <address className="not-italic text-sm text-muted-foreground">
                      <strong>{clientData.empresa}</strong><br/>
                      {clientData.adreca}<br/>
                      NIF: {clientData.fiscalid}<br/>
                      Tel: {clientData.telefon}
                    </address>
                  ) : (
                    <p className="text-sm text-destructive">Datos fiscales del cliente no disponibles.</p>
                  )}
                </div>
              </section>

              <section>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-2/5">Concepto</TableHead>
                      <TableHead className="text-right">Cant.</TableHead>
                      <TableHead className="text-right">P. Unitario</TableHead>
                      <TableHead className="text-right">Dto. %</TableHead>
                      <TableHead className="text-right">Total Neto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.lines.map((line, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{line.concept}</TableCell>
                        <TableCell className="text-right">{line.quantity}</TableCell>
                        <TableCell className="text-right">{line.unitPrice.toFixed(2)} €</TableCell>
                        <TableCell className="text-right">{line.discount.toFixed(2)}%</TableCell>
                        <TableCell className="text-right">{line.netTotal.toFixed(2)} €</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </section>

              <section className="flex flex-col items-end mt-8">
                <div className="w-full max-w-sm space-y-4">
                    <div className="space-y-2 border-t pt-4">
                        {Object.entries(selectedInvoice.vatDetails).map(([rate, details]) => (
                            <div key={rate} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Base Imponible ({rate}%):</span>
                                <span className="font-medium text-foreground">{details.base.toFixed(2)} €</span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2 border-t pt-2">
                         {Object.entries(selectedInvoice.vatDetails).map(([rate, details]) => (
                            <div key={rate} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Cuota IVA ({rate}%):</span>
                                <span className="font-medium text-foreground">{details.amount.toFixed(2)} €</span>
                            </div>
                        ))}
                    </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                    <span className="text-foreground">TOTAL FACTURA:</span>
                    <span className="text-primary">{selectedInvoice.total.toFixed(2)} €</span>
                  </div>
                </div>
              </section>
              
              <footer className="mt-12 pt-4 border-t text-xs text-muted-foreground space-y-4">
                  {selectedInvoice.paymentMethod && <p><strong>Forma de pago:</strong> {selectedInvoice.paymentMethod}</p>}
                  <p>Inscrita en el Registro Mercantil de Madrid, Tomo 1234, Folio 56, Hoja M-78901.</p>
                  <p>En cumplimiento de la Ley Orgánica de Protección de Datos y Garantía de Derechos Digitales (LOPDGDD 3/2018), le informamos que sus datos serán tratados con la finalidad de gestionar la relación comercial. Puede ejercer sus derechos en info@intrack-logistics.es.</p>
              </footer>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4">
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Mis Facturas</h1>
                <p className="mt-2 text-lg text-muted-foreground">Aquí puedes consultar y descargar tus facturas.</p>
            </div>
            
            {isLoading ? (
                <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : error ? (
                <Alert variant="destructive" className="max-w-2xl mx-auto">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : invoices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {invoices.map(invoice => (
                        <Card key={invoice.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex flex-row items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">Factura {invoice.id}</CardTitle>
                                        <CardDescription>{formatDate(invoice.date)}</CardDescription>
                                    </div>
                                    <FileText className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <div className="pt-2">
                                     <Badge className={cn(
                                        "font-semibold",
                                        invoice.status === 'Pagada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    )}>
                                        {invoice.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-end">
                                <p className="text-3xl font-bold text-right text-primary mb-4">{invoice.total.toFixed(2)} €</p>
                                <Button className="w-full" onClick={() => setSelectedInvoice(invoice)}>
                                    Ver Factura
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 max-w-2xl mx-auto">
                     <Card className="p-8">
                        <CardHeader>
                            <CardTitle>No hay facturas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">De momento no tienes ninguna factura generada. Cuando tengas una, aparecerá aquí.</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

    
