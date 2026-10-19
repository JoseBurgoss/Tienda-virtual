import { DemoBanner, Preloader } from '@/components/common';
import 'normalize.css/normalize.css';
import React from 'react';
import { render } from 'react-dom';
import 'react-phone-input-2/lib/style.css';
import { onAuthStateFail, onAuthStateSuccess } from '@/redux/actions/authActions';
import configureStore from '@/redux/store/store';
import '@/styles/style.scss';
import WebFont from 'webfontloader';
import App from './App';
import firebase from '@/services/firebase';

WebFont.load({
  google: {
    families: ['Tajawal']
  }
});

const { store, persistor } = configureStore();
const root = document.getElementById('app');

const isDemo = import.meta.env.VITE_BACKEND !== 'firebase';

// Aviso fijo de la demo sin backend, fuera del árbol de la app para que no se re-renderice.
if (isDemo) {
  const banner = document.createElement('div');
  document.body.appendChild(banner);
  render(<DemoBanner />, banner);
}

// Render the preloader on initial load
render(<Preloader />, root);

firebase.auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(onAuthStateSuccess(user));
  } else {
    store.dispatch(onAuthStateFail('Fallo al autenticar'));
  }
  // then render the app after checking the auth state
  render(<App store={store} persistor={persistor} />, root);
});

// El build no genera /sw.js: en la demo se omite el registro (en Vercel devolvía index.html).
if (process.env.NODE_ENV === 'production' && !isDemo && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registrado: ', registration);
    }).catch((registrationError) => {
      console.log('SW registro fallo: ', registrationError);
    });
  });
}
