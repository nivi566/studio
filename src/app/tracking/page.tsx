"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // CONFIGURACIÓN: Reemplaza con tu URL real de SheetDB
  const SHEETDB_URL = "https://sheetdb.io/api/v1/nmk5zmlkneovd";

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Importante: sheet=tracking para no tocar tus otras pestañas
      const response = await fetch(`${SHEETDB_URL}/search?sheet=tracking&tracking_code=${trackingCode.toUpperCase()}`);
      
      if (!response.ok) throw new Error('Error en la red');
      
      const data = await response.json();

      if (data && data.length > 0) {
        setResult(data[0]);
      } else {
        setError('Código de seguimiento no encontrado. Por favor, verifica el código (Ej: TRK-001).');
      }
    } catch (err) {
      setError('Hubo un error en la conexión. Verifica tu URL de SheetDB.');
    } finally {
      setLoading(false);
    }
  };

  const getProgress = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('entregado') || s.includes('lliurat')) return { width: '100%', color: 'bg-green-500' };
    if (s.includes('transito') || s.includes('trànsit')) return { width: '50%', color: 'bg-blue-500' };
    return { width: '15%', color: 'bg-orange-500' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sección Hero con el patrón de la web */}
      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-orange-500 hover:underline text-sm mb-6 inline-block font-medium">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Localiza tu envío
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Introduce tu código de seguimiento para ver el estado actual de tu paquete.
          </p>

          <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="TRK-001"
              className="w-full p-4 pr-32 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-black bg-white shadow-sm"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-md font-bold transition-colors disabled:opacity-50"
            >
              {loading ? '...' : 'Buscar'}
            </button>
          </form>
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm">
              ⚠️ {error}
            </div>
          )}
        </div>
      </section>

      {/* Resultados con diseño profesional */}
      {result && (
        <section className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-500">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Estado</p>
                <p className="text-xl font-bold text-gray-900">{result.status}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase">Referencia</p>
                <p className="text-xl font-mono font-bold text-orange-500">{result.tracking_code}</p>
              </div>
            </div>

            <div className="p-8">
              {/* Barra de progreso */}
              <div className="mb-10">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getProgress(result.status).color} transition-all duration-1000`}
                    style={{ width: getProgress(result.status).width }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 uppercase">
                  <span>Procesando</span>
                  <span>En Tránsito</span>
                  <span>Entregado</span>
                </div>
              </div>

              {/* Grid de información (usando tus columnas del Excel) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DetailBox label="Origen" value={result.origen} icon="📍" />
                <DetailBox label="Destino" value={result.destination} icon="🏁" />
                <DetailBox label="Ubicación Actual" value={result.location} icon="🚚" />
                <DetailBox label="Fecha Estimada (ETA)" value={result.eta} icon="📅" />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function DetailBox({ label, value, icon }: { label: string, value: string, icon: string }) {
  return (
    <div className="flex items-start space-x-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase">{label}</p>
        <p className="text-gray-900 font-semibold">{value || 'No disponible'}</p>
      </div>
    </div>
  );
}