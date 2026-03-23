
import { NextRequest, NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';


// Vérifier la validité d'un SBT par HMAC
export async function POST(req: NextRequest) {
  const { sbt } = await req.json();
  if (!sbt || typeof sbt !== 'string') {
    return NextResponse.json({ valid: false, error: 'SBT manquant ou invalide' }, { status: 400 });
  }
  const secretKey = process.env.SBT_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ valid: false, error: 'Clé secrète manquante' }, { status: 500 });
  }
  // Le SBT attendu est l'HMAC-SHA256 de "SBT" avec la clé secrète
  const expectedSbt = CryptoJS.HmacSHA256('SBT', secretKey).toString(CryptoJS.enc.Hex);
  const isValid = sbt === expectedSbt;
  return NextResponse.json({ valid: isValid });
}


// Brûler un SBT (exemple, ici on ne gère pas d'état car tout SBT est calculé dynamiquement)
export async function PUT(req: NextRequest) {
  const { sbt, secret } = await req.json();
  if (!sbt || typeof sbt !== 'string') {
    return NextResponse.json({ success: false, error: 'SBT manquant ou invalide' }, { status: 400 });
  }
  const secretKey = process.env.SBT_SECRET_KEY;
  if (!secretKey || secret !== secretKey) {
    return NextResponse.json({ success: false, error: 'Clé secrète invalide' }, { status: 403 });
  }
  // Ici, on ne gère pas de base de données, donc on ne peut pas vraiment "brûler" le SBT
  // À implémenter selon la logique métier réelle
  return NextResponse.json({ success: true });
}
