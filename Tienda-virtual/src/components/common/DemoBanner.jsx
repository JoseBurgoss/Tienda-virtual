import React from 'react';

// Claves que usa la demo: datos del adaptador (services/firebase.demo.js) y redux-persist.
const DEMO_PREFIX = 'tienda-demo:';
const PERSIST_KEY = 'persist:root';

const resetDemo = () => {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(DEMO_PREFIX) || k === PERSIST_KEY)
      .forEach((k) => localStorage.removeItem(k));
  } catch (e) { /* almacenamiento no disponible */ }
  window.location.assign('/');
};

const DemoBanner = () => (
  <aside className="demo-banner" aria-label="Aviso de demo">
    <span className="demo-banner-text">
      Proyecto universitario · demo sin backend
    </span>
    <button className="demo-banner-reset" type="button" onClick={resetDemo}>
      Reiniciar demo
    </button>
  </aside>
);

export default DemoBanner;
