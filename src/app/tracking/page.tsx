"use client";

import { useState } from 'react';

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // CONFIGURACIÓN: Reemplaza esto con tu URL de SheetDB
  const SHEETDB_URL = "https://sheetdb.io/api/v1/nmk5zmlkneovd";

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // IMPORTANTE: ?sheet=tracking le dice a la API que SOLO mire esa pestaña
      const response = await fetch(`${SHEETDB_URL}/search?sheet=tracking&tracking_code=${trackingCode.toUpperCase()}`);
      const data = await response.json();

      if (data.length > 0) {
        setResult(data[0]);
      } else {
        setError('Codi de seguiment no trobat. Revisa que sigui correcte.');
      }
    } catch (err) {
      setError('Error en la connexió. Torna-ho a intentar.');
    } finally {
      setLoading(false);
    }
  };

  // Lógica de la barra de progreso basada en tu Excel
  const getProgress = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'entregado' || s === 'lliurat') return { width: '100%', color: 'bg-green-500' };
    if (s === 'en transito' || s === 'en trànsit') return { width: '50%', color: 'bg-blue-500' };
    return { width: '15%', color: 'bg-yellow-500' }; // Procesando o Almacén
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Localitza el teu enviament
        </h1>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-10">
          <input
            type="text"
            placeholder="Ex: TRK-001"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {loading ? 'Cercant...' : 'Cercar'}
          </button>
        </form>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {/* Tarjeta de Resultados */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Estat de l'enviament</p>
                <h2 className="text-xl font-bold text-gray-800">{result.status}</h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 uppercase tracking-wider">Codi</p>
                <p className="font-mono font-bold text-blue-600">{result.tracking_code}</p>
              </div>
            </div>

            {/* Barra de Progreso */}
            <div className="relative pt-1 mb-8">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: getProgress(result.status).width }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgress(result.status).color} transition-all duration-500`}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Almacén</span>
                <span>En Trànsit</span>
                <span>Lliurat</span>
              </div>
            </div>

            {/* Detalles */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Origen</p>
                <p className="font-medium text-gray-800">{result.origen}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Destí</p>
                <p className="font-medium text-gray-800">{result.destination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ubicació Actual</p>
                <p className="font-medium text-gray-800">{result.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data Prevista (ETA)</p>
                <p className="font-medium text-gray-800">{result.eta}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}