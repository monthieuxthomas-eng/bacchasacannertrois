import { NextRequest, NextResponse } from 'next/server';

// Stockage en mémoire (exemple simple, à remplacer par une base de données en production)
const sbtStore: Record<string, { valid: boolean }> = {
  'SBT-1234': { valid: true },
  'SBT-5678': { valid: true },
};

// Vérifier la validité d'un SBT
export async function POST(req: NextRequest) {
  const { sbt } = await req.json();
  if (!sbt || typeof sbt !== 'string') {
    return NextResponse.json({ valid: false, error: 'SBT manquant ou invalide' }, { status: 400 });
  }
  const found = sbtStore[sbt];
  return NextResponse.json({ valid: !!found && found.valid });
}

// Brûler un SBT (le rendre invalide)
export async function PUT(req: NextRequest) {
  const { sbt, secret } = await req.json();
  if (!sbt || typeof sbt !== 'string') {
    return NextResponse.json({ success: false, error: 'SBT manquant ou invalide' }, { status: 400 });
  }
  const secretKey = process.env.SBT_SECRET_KEY;
  if (!secretKey || secret !== secretKey) {
    return NextResponse.json({ success: false, error: 'Clé secrète invalide' }, { status: 403 });
  }
  if (!sbtStore[sbt] || !sbtStore[sbt].valid) {
    return NextResponse.json({ success: false, error: 'SBT déjà brûlé ou inexistant' }, { status: 404 });
  }
  sbtStore[sbt].valid = false;
  return NextResponse.json({ success: true });
}
