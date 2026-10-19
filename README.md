# Tienda Virtual

An e-commerce web store built with React, Redux-Saga and Firebase: product catalog with search and filters, persistent shopping basket, three-step checkout, user accounts and an admin panel for managing products.

**Live demo:** https://tienda.burgo.dev (university project · front-end demo without backend)

## Demo sin backend

The live demo runs without Firebase. At build time Vite swaps `src/services/firebase.js` for `src/services/firebase.demo.js`, an adapter with the same API that keeps auth, products, profiles and baskets in `localStorage`, seeded with fictitious products (`src/services/demo/seed.js`). No request leaves the browser and the Firebase SDK is not bundled.

- Demo accounts: `admin@demo.local` / `demo1234` (role `ADMIN`, admin panel) and `cliente@demo.local` / `demo1234`. Sign-up works too; Google/Facebook/GitHub sign-in enter as the demo customer.
- Uploaded images are stored as data URLs (max 1.5 MB each).
- The banner at the bottom has a **Reiniciar demo** button that clears the demo data and reloads.
- To build against the real Firebase project instead: `VITE_BACKEND=firebase` plus the `VITE_FIREBASE_*` variables (see `src/services/config.js`).

## Features

- **Catalog:** home page with featured and recommended products, shop page with paginated product grid, product detail page with size and color selection.
- **Search and filters:** search by product name, filter by brand and price range (slider), sort by name or price.
- **Basket:** add/remove items and change quantities; persisted with `redux-persist` and saved to the user's Firestore document.
- **Checkout:** three steps (order summary, shipping details with phone input, payment). The credit card form validates input and confirms the order; PayPal is a placeholder. No real payment is processed.
- **Authentication:** email/password sign-up and sign-in, Google, Facebook and GitHub sign-in, password reset (Firebase Auth).
- **Account:** profile page and profile editing (name, email, address, phone, avatar and banner images).
- **Admin panel:** routes restricted to users with role `ADMIN`; add, edit and delete products, including image upload to Firebase Storage.
- Form validation with Formik + Yup, loading skeletons, responsive layout with mobile navigation.

## Tech stack

- React 17, React Router 5
- Redux 4 + Redux-Saga, redux-persist
- Firebase 8 (Authentication, Cloud Firestore, Storage)
- Vite 3, Sass
- Formik, Yup, react-select, react-compound-slider, react-phone-input-2, Ant Design icons
- Jest + Enzyme (snapshot test)
- Firebase Cloud Functions (`functions/`, optional: lowercases product names for search)
- Deployed as static files behind Caddy (SPA fallback to `index.html`; `vercel.json` keeps the equivalent rewrite)

## Getting started

The application lives in the `Tienda-virtual/` subfolder. Requirements: Node.js 16+ and a Firebase project with Authentication, Firestore and Storage enabled.

```bash
git clone https://github.com/JoseBurgoss/Tienda-virtual.git
cd Tienda-virtual/Tienda-virtual
yarn install        # or: npm install
```

Create `Tienda-virtual/.env` with the variables read in `src/services/config.js`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MSG_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Scripts:

```bash
yarn dev      # Vite dev server on http://localhost:3000
yarn build    # production build to dist/ (also copies index.html to 404.html)
yarn serve    # preview the production build
yarn test     # Jest
```

To use the admin panel, set `role: "ADMIN"` on your user document in the Firestore `users` collection. Security rules for Firestore and Storage are in `firestore.rules` and `storage.rules`.

## Project structure

```text
Tienda-virtual/
├── src/
│   ├── components/   # basket, common (navigation, filters, search), formik inputs, product
│   ├── views/        # home, shop, featured, recommended, search, view_product,
│   │                 # auth, account, checkout (step1-3), admin
│   ├── redux/        # actions, reducers, sagas, store
│   ├── routers/      # AppRouter, AdminRoute, ClientRoute, PublicRoute
│   ├── services/     # Firebase config and data-access class
│   ├── hooks/        # useBasket, useProduct, useFeaturedProducts, ...
│   └── styles/       # Sass partials
├── functions/        # Firebase Cloud Functions
└── test/             # Jest setup and snapshot test
```

## Credits

Based on the open-source [ecommerce-react](https://github.com/jgudo/ecommerce-react) project by Julius Guevarra, adapted, localized to Spanish and published as a front-end demo.

Licensed under the Apache License 2.0, as the original project. See [LICENSE](LICENSE) and [NOTICE](NOTICE) for attribution and the list of changes.

## Español

Tienda en línea hecha con React, Redux-Saga y Firebase. Incluye catálogo con búsqueda y filtros, carrito persistente, checkout en tres pasos, cuentas de usuario (correo, Google, Facebook, GitHub) y panel de administración para crear, editar y eliminar productos. Demo: https://tienda.burgo.dev (proyecto universitario; demo sin backend: los datos ficticios viven en el navegador, con cuentas `admin@demo.local` / `demo1234` y `cliente@demo.local` / `demo1234`).

---

Author: José Burgos — https://jose.burgo.dev · https://www.linkedin.com/in/jose-burgos-/
