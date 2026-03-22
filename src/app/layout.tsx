import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BacchaScannerDeux',
  description: 'Vérification et burn de SBT via QR code',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
