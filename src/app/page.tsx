"use client";
import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

export default function Home() {
  const [sbt, setSbt] = useState('');
  const [result, setResult] = useState<null | { valid: boolean }>(null);
  const [burned, setBurned] = useState(false);
  const [error, setError] = useState('');


  // Callback du scan QR
  const handleQrScan = (codes: { rawValue: string }[]) => {
    if (codes && codes[0]?.rawValue) {
      setSbt(codes[0].rawValue);
      setResult(null);
      setBurned(false);
      setError('');
    }
  };

  const verifySbt = async () => {
    setError('');
    setResult(null);
    setBurned(false);
    try {
      const res = await fetch('/api/sbt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sbt }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('Erreur lors de la vérification');
    }
  };

  const burnSbt = async () => {
    setError('');
    try {
      const res = await fetch('/api/sbt', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sbt, secret: '' }), // La clé secrète doit être fournie côté backend uniquement
      });
      const data = await res.json();
      if (data.success) setBurned(true);
      else setError(data.error || 'Erreur lors du burn');
    } catch (err) {
      setError('Erreur lors du burn');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-xs bg-white rounded shadow p-4 flex flex-col gap-4">
        <h1 className="text-xl font-bold text-center">Vérification SBT</h1>
        {/* Scanner QR natif mobile-first */}
        <div className="w-full flex flex-col items-center">
          <Scanner
            onScan={handleQrScan}
            onError={() => setError('Erreur accès caméra ou scan')}
            constraints={{ facingMode: 'environment' }}
            styles={{ container: { width: '100%', maxWidth: 320, margin: '0 auto', borderRadius: 8, overflow: 'hidden' }, video: { width: '100%' } }}
          />
        </div>
        {/* Saisie manuelle possible en fallback */}
        <input
          className="border p-2 rounded mt-2"
          placeholder="Ou entrez le SBT manuellement"
          value={sbt}
          onChange={e => setSbt(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white rounded p-2 font-semibold"
          onClick={verifySbt}
          disabled={!sbt}
        >
          Vérifier
        </button>
        {result && (
          <div className={result.valid ? 'text-green-600' : 'text-red-600'}>
            {result.valid ? 'SBT VALIDE' : 'SBT INVALIDE'}
          </div>
        )}
        {result?.valid && !burned && (
          <button
            className="bg-red-600 text-white rounded p-2 font-semibold"
            onClick={burnSbt}
          >
            Brûler le SBT
          </button>
        )}
        {burned && <div className="text-orange-600">SBT brûlé !</div>}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </main>
  );
}
