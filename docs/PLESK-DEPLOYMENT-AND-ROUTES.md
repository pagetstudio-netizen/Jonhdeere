# Guide de déploiement Plesk et routes

Ce document décrit la construction du projet, son déploiement GitHub → Plesk et les routes actuellement déclarées dans l’application.

## 1. Construire le projet avant le push

Depuis la racine du projet :

```bash
npm ci
npm run check
npm test
npm run build
git diff --check
```

Le build génère :

- `dist/index.cjs` — serveur Node.js de production;
- `dist/public/` — application web et fichiers statiques.

**Important pour Plesk :** inclure le répertoire `dist/` généré dans le commit GitHub. Plesk doit tirer le build déjà compilé; il ne voit pas le build effectué dans Replit.

## 2. Paramètres de l’application Node.js dans Plesk

Configurer l’application avec :

- **Application root :** la racine du dépôt cloné;
- **Document root :** `dist/public` (relatif à l’application root);
- **Startup file :** `dist/index.cjs`;
- **Mode :** production (`NODE_ENV=production`);
- **Port :** laisser le serveur utiliser le port fourni par Plesk (`PORT`).

Le fichier `.node-version` fixe la version majeure Node à 20 pour les gestionnaires de versions tels que `nodenv`; conserve-le dans le dépôt.

Le script `npm start` lance `NODE_ENV=production node dist/index.cjs`. Ne pas utiliser `npm run dev` en production.

Après le push GitHub :

1. Dans Plesk, tirer la branche qui contient le commit.
2. Cliquer **Pull / Deploy Now** pour synchroniser et déployer le build.
3. Redémarrer l’application Node.js.
4. Vérifier les journaux Plesk et ouvrir le domaine en HTTPS.

## 3. Variables d’environnement

Créer les variables dans les réglages d’environnement Plesk — ne jamais mettre leurs valeurs dans GitHub, dans ce document ou dans le code.

### Nécessaires au démarrage

- `SUPABASE_DATABASE_URL` — prioritaire si défini;
- `DATABASE_URL` — utilisé si `SUPABASE_DATABASE_URL` n’est pas défini;
- `SESSION_SECRET`;
- `PORT` — généralement fourni par Plesk;
- `PUBLIC_APP_URL` — URL publique HTTPS, nécessaire aux callbacks qui en dépendent.

### Variables de services activés

N’ajouter que celles des services effectivement activés dans le panneau admin :

- **DrimPay :** `DRIMPAY_API_KEY`, `DRIMPAY_WEBHOOK_SECRET`;
- **WestPay dépôts :** `WESTPAY_MERCHANT_SLUG`, `WESTPAY_WEBHOOK_SECRET`;
- **AshtechPay :** `ASHTECHPAY_API_KEY` ou `ASHTECH_API_KEY`, et le secret webhook configuré;
- **SendavaPay :** `SENDAVAPAY_API_KEY`, `SENDAVAPAY_WEBHOOK_SECRET`;
- **PPayPros :** `PPAYPROS_APP_ID`, `PPAYPROS_MCH_NO`, `PPAYPROS_PRIVATE_KEY`;
- **InPay :** `INPAY_API_BASE_URL` et la clé marchand applicable;
- **Telegram :** `TELEGRAM_BOT_TOKEN` et, si utilisé, `TELEGRAM_CHAT_ID`.

Le panneau admin peut aussi contenir des réglages de fournisseur. Les secrets de production doivent rester dans les variables d’environnement protégées de Plesk.

## 4. Routes des pages web

Les routes ci-dessous sont définies dans `client/src/App.tsx`. Sauf indication contraire, les pages utilisateur demandent une session authentifiée.

### Accès public

- `/login` — connexion;
- `/register` — inscription;
- `/invitation` et `/rejoindre` — inscription avec invitation.

### Espace utilisateur

- `/` — tableau de bord;
- `/products/:id` — détail d’un produit;
- `/tasks`, `/invest`, `/orders`, `/team`, `/my-products`;
- `/checkin`, `/account`, `/change-password`;
- `/deposit`, `/robotpay`, `/withdrawal`;
- `/deposit-history`, `/deposits-history`, `/history`, `/withdrawal-history`, `/deposit-orders`;
- `/service`, `/wallet`, `/about`, `/rules`;
- `/team-details`, `/daily-bonus`, `/salary-bonus`;
- `/gift-code` — redirige vers la page compte avec le dialogue du code cadeau.

### Admin et Banker

- **Admin :** chemin non standard défini dans `client/src/lib/admin-path.ts`, avec une route enfant pour les détails d’équipe. L’accès exige également le rôle administrateur. `/admin` est volontairement renvoyé en 404.
- `/banker` — espace Banker; exige le rôle Banker.

## 5. Routes API

Les routes Express sont déclarées dans `server/routes.ts`. Toutes les routes préfixées par `/api` sont listées ci-dessous. Les contrôles d’accès réels sont ceux du middleware associé à chaque route; cette liste ne remplace pas l’authentification.

### Authentification et profil

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `POST /api/change-password`

### Produits, staking et comptes utilisateur

- `GET /api/products`
- `POST /api/products/:id/purchase`
- `POST /api/products/:id/claim-free`
- `GET /api/user/products`
- `POST /api/user/collect-earnings`
- `GET /api/staking/products`
- `POST /api/staking/purchase/:id`
- `GET /api/staking/my`

### Dépôts et fournisseurs de paiement

- `GET /api/payment-channels`
- `GET /api/payment-numbers`
- `GET /api/soleaspay/services`
- `POST /api/deposits`
- `GET /api/deposits/:id/verify`
- `GET /api/deposits/history`
- `GET /api/deposit/provider/:country`
- `GET /api/drimpay/operators/:country`
- `POST /api/drimpay/payin`
- `GET /api/deposits/:id/drimpay-status`
- `GET /api/ashtechpay/countries`
- `POST /api/ashtechpay/collect`
- `GET /api/deposits/:id/ashtechpay-status`
- `GET /api/sendavapay/operators/:country`
- `POST /api/sendavapay/create`
- `POST /api/sendavapay/initiate`
- `POST /api/sendavapay/submit-otp`
- `POST /api/sendavapay/retry`
- `GET /api/deposits/:id/sendavapay-status`

### Callbacks et webhooks fournisseurs

- `GET /api/westpay/callback`
- `POST /api/webhooks/westpay`
- `POST /api/webhooks/drimpay`
- `POST /api/webhooks/ashtechpay`
- `POST /api/webhooks/sendavapay`
- `GET /api/ppaypros/return`
- `POST /api/webhooks/ppaypros/payin`
- `POST /api/webhooks/ppaypros/payout`
- `POST /api/webhooks/inpay`

Les URL callback/webhook configurées dans les comptes fournisseurs doivent pointer vers le domaine Plesk en HTTPS. La validation des signatures est effectuée côté serveur lorsqu’elle est prise en charge par le fournisseur.

### Retraits, portefeuilles et données utilisateur

- `POST /api/withdrawals`
- `GET /api/withdrawals/history`
- `POST /api/withdrawal-fee/prepare` — ancienne route désactivée, répond HTTP 410.
- `GET /api/wallets`
- `POST /api/wallets`
- `DELETE /api/wallets/:id`
- `PATCH /api/wallets/:id/default`
- `GET /api/team/stats`
- `GET /api/team/details`
- `GET /api/tasks`
- `POST /api/tasks/:id/claim`
- `POST /api/claim-daily-bonus`
- `GET /api/daily-bonus-status`
- `GET /api/transactions`
- `GET /api/settings`
- `GET /api/settings/links`
- `GET /api/settings/withdrawal`
- `GET /api/countries`
- `POST /api/gift-codes/claim`

### Admin

- `GET /api/admin/stats`
- `GET /api/admin/deposits`
- `POST /api/admin/deposits/:id/drimpay/status`
- `GET /api/admin/deposits/soleaspay-stats`
- `POST /api/admin/deposits/:id/approve`
- `POST /api/admin/deposits/:id/reject`
- `POST /api/admin/verify-pin`
- `GET /api/admin/withdrawals`
- `POST /api/admin/withdrawals/:id/approve`
- `POST /api/admin/withdrawals/:id/reject`
- `POST /api/admin/withdrawals/:id/inpay`
- `POST /api/admin/withdrawals/:id/drimpay`
- `POST /api/admin/withdrawals/:id/drimpay/status`
- `POST /api/admin/withdrawals/:id/ppaypros`
- `POST /api/admin/withdrawals/:id/ppaypros/status`
- `GET /api/admin/users`
- `GET /api/admin/users/:id/team`
- `POST /api/admin/users/:id/:action`
- `GET /api/admin/users/:id/products`
- `GET /api/admin/products/all`
- `POST /api/admin/products`
- `PATCH /api/admin/products/:id`
- `DELETE /api/admin/products/:id`
- `GET /api/admin/payment-numbers`
- `POST /api/admin/payment-numbers`
- `PUT /api/admin/payment-numbers/:id`
- `DELETE /api/admin/payment-numbers/:id`
- `GET /api/admin/channels`
- `POST /api/admin/channels`
- `PATCH /api/admin/channels/:id`
- `DELETE /api/admin/channels/:id`
- `GET /api/admin/settings`
- `POST /api/admin/settings`
- `GET /api/admin/countries`
- `POST /api/admin/countries`
- `PUT /api/admin/countries/:id`
- `DELETE /api/admin/countries/:id`
- `GET /api/admin/drimpay/balance/:country`
- `GET /api/admin/inpay/balance/:country`
- `GET /api/admin/blocked-ips`
- `POST /api/admin/blocked-ips`
- `DELETE /api/admin/blocked-ips/:ip`
- `POST /api/admin/reset-stats`
- `GET /api/admin/gift-codes`
- `POST /api/admin/gift-codes`
- `DELETE /api/admin/gift-codes/:id`
- `GET /api/admin/staking/products`
- `POST /api/admin/staking/products`
- `PUT /api/admin/staking/products/:id`
- `DELETE /api/admin/staking/products/:id`
- `GET /api/admin/staking/stakings`

### Banker

- `GET /api/banker/deposits`
- `GET /api/banker/withdrawals`
- `POST /api/banker/deposits/:id/approve`
- `POST /api/banker/deposits/:id/reject`
- `POST /api/banker/withdrawals/:id/approve`
- `POST /api/banker/withdrawals/:id/reject`

## 6. Contrôles après déploiement

1. Vérifier dans Plesk que l’application est démarrée et que les journaux ne contiennent pas d’erreur de démarrage ou de connexion à la base.
2. Ouvrir `/login` sur le domaine HTTPS.
3. Vérifier que les fichiers de `dist/public` sont servis correctement.
4. Se connecter et tester une lecture utilisateur non financière, puis vérifier les pages Admin/Banker avec leurs comptes autorisés.
5. Vérifier les webhooks dans les journaux fournisseur et Plesk avant d’activer les paiements réels.

Ne pas lancer `npm run db:push` sur la base de production dans le cadre d’un simple déploiement de code. N’appliquer une migration que si une modification de schéma est réellement prévue.