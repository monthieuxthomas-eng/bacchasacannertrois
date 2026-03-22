This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/route.ts`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Routes

This directory contains example API routes for the headless API app.

For more details, see [route.js file convention](https://nextjs.org/docs/app/api-reference/file-conventions/route).

# BacchaScannerDeux SBT

Application Next.js pour vérifier et brûler des SBT (soulbound tokens) via QR code.

## Fonctionnalités
- Scan (ou saisie) d’un QR code représentant un SBT
- Vérification de la validité du SBT
- Brûlage (burn) du SBT côté backend (après usage)
- Interface mobile-first, optimisée iPhone
- Backend sécurisé (clé secrète en variable d’environnement)

## Démarrage local

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Créer un fichier `.env.local` à la racine :
   ```env
   SBT_SECRET_KEY=VOTRE_CLE_SECRETE
   ```
3. Lancer le serveur :
   ```bash
   npm run dev
   ```

## Déploiement Vercel

- Poussez le projet sur GitHub.
- Sur Vercel, importez le repo et configurez la variable d’environnement `SBT_SECRET_KEY` dans les paramètres du projet.
- Le fichier `.env.example` sert de référence pour les variables à définir.
- La configuration par défaut (vercel.json) est adaptée à Next.js.

## Sécurité
- La clé secrète n’est jamais exposée côté frontend.
- Le backend vérifie la clé pour toute opération de burn.

## À faire
- Remplacer l’input texte par un vrai scanner QR (ex: `react-qr-reader` ou équivalent compatible Next.js)
- Remplacer le stockage en mémoire par une base de données si besoin

---

**Exemple de SBT valides pour test :**
- SBT-1234
- SBT-5678
