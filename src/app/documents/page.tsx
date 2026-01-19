'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Printer, ArrowLeft, FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Logo } from '@/components/icons/logo';

type DocumentLine = {
  num_factura: string;
  data: string;
  usuari: string;
  concepte: string;
  preu_unitari: string;
  unitats: string;
};

type UserFiscalData = {
  usuari: string;
  empresa: string;
  fiscalid: string;
  adreca: string;
};

type GroupedInvoice = {
  id: string;
  date: string;
  lines: {
    concept: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  vat: number;
  total: number;
};

export default function DocumentsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [invoices, setInvoices] = useState<GroupedInvoice[]>([]);
  const [fiscalData, setFiscalData] = useState<UserFiscalData | null>(null);
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

          if (!docsRes.ok || !usersRes.ok) {
            let errorMsg = 'Error al obtener los datos.';
            if (!docsRes.ok) {
                errorMsg += ` Error en facturas: ${docsRes.statusText}.`
            }
            if (!usersRes.ok) {
                errorMsg += ` Error en usuarios: ${usersRes.statusText}.`
            }
            throw new Error(errorMsg);
          }

          const allDocs: DocumentLine[] = await docsRes.json();
          const allUsers: UserFiscalData[] = await usersRes.json();
          
          const userDocs = allDocs.filter(doc => doc.usuari && doc.usuari.toLowerCase() === user.usuari.toLowerCase());
          const userFiscalData = allUsers.find(u => u.usuari && u.usuari.toLowerCase() === user.usuari.toLowerCase()) || null;
          
          if (userDocs.length === 0) {
            setInvoices([]);
            setIsLoading(false);
            return;
          }

          setFiscalData(userFiscalData);

          const grouped = userDocs.reduce((acc, doc) => {
            const { num_factura, data, concepte, preu_unitari, unitats } = doc;
            if (!num_factura) return acc; // Skip lines without an invoice number

            if (!acc[num_factura]) {
              acc[num_factura] = {
                id: num_factura,
                date: data,
                lines: [],
              };
            }
            // Robust parsing
            const unitPrice = parseFloat(String(preu_unitari || '0').replace(/[^0-9,.]/g, "").replace(',', '.'));
            const quantity = parseInt(String(unitats || '0'), 10);
            
            if (!isNaN(unitPrice) && !isNaN(quantity)) {
                const lineTotal = unitPrice * quantity;
                acc[num_factura].lines.push({
                    concept: concepte,
                    quantity: quantity,
                    unitPrice: unitPrice,
                    total: lineTotal,
                });
            }
            return acc;
          }, {} as Record<string, any>);
          
          const processedInvoices = Object.values(grouped).map(invoice => {
              const subtotal = invoice.lines.reduce((sum: number, line: any) => sum + line.total, 0);
              const vat = subtotal * 0.21;
              const total = subtotal + vat;
              return { ...invoice, subtotal, vat, total };
          });

          setInvoices(processedInvoices.sort((a, b) => {
              try {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
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
  }, [user]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
      try {
        // Attempt to parse dates like YYYY-MM-DD or MM/DD/YYYY
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // Handle DD/MM/YYYY format if needed
            const parts = dateString.split('/');
            if (parts.length === 3) {
                const [day, month, year] = parts;
                const isoDate = new Date(`${year}-${month}-${day}`);
                 if (!isNaN(isoDate.getTime())) return isoDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
            }
            return dateString; // fallback to original string
        }
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
      } catch (e) {
          return dateString;
      }
  }

  if (authLoading || !user) {
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
    return (
      <div className="flex min-h-screen flex-col bg-background print:bg-white">
        <Header />
        <main className="flex-1 py-12 sm:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-8 flex justify-between items-center">
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
                    NIF: B12345678
                  </address>
                </div>
                <div>
                  <h2 className="font-semibold text-foreground mb-2">Para:</h2>
                  {fiscalData ? (
                    <address className="not-italic text-sm text-muted-foreground">
                      <strong>{fiscalData.empresa}</strong><br/>
                      {fiscalData.adreca}<br/>
                      ID Fiscal: {fiscalData.fiscalid}
                    </address>
                  ) : (
                    <p className="text-sm text-destructive">Datos fiscales no encontrados.</p>
                  )}
                </div>
              </section>

              <section>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-2/4">Concepto</TableHead>
                      <TableHead className="text-right">Unidades</TableHead>
                      <TableHead className="text-right">Precio Unitario</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.lines.map((line, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{line.concept}</TableCell>
                        <TableCell className="text-right">{line.quantity}</TableCell>
                        <TableCell className="text-right">{line.unitPrice.toFixed(2)} €</TableCell>
                        <TableCell className="text-right">{line.total.toFixed(2)} €</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </section>

              <section className="flex justify-end mt-8">
                <div className="w-full max-w-xs space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium text-foreground">{selectedInvoice.subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IVA (21%):</span>
                    <span className="font-medium text-foreground">{selectedInvoice.vat.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                    <span className="text-foreground">TOTAL:</span>
                    <span className="text-primary">{selectedInvoice.total.toFixed(2)} €</span>
                  </div>
                </div>
              </section>
              
              <footer className="mt-12 pt-4 border-t text-center text-xs text-muted-foreground">
                  <p>Gracias por su confianza.</p>
              </footer>
            </div>
          </div>
        </main>
        <Footer />
      </div>
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
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg">Factura {invoice.id}</CardTitle>
                                    <CardDescription>{formatDate(invoice.date)}</CardDescription>
                                </div>
                                <FileText className="h-8 w-8 text-muted-foreground" />
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
