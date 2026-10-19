// Adaptador de demo: misma API pública que services/firebase.js, pero sin backend.
// Auth, "Firestore" y "Storage" se simulan en localStorage con datos ficticios.
// Vite lo usa por defecto (ver vite.config.js); con VITE_BACKEND=firebase se usa el original.
import defaultAvatar from '@/images/defaultAvatar.jpg';
import defaultBanner from '@/images/defaultBanner.jpg';
import { buildSeedProducts, DEMO_ACCOUNTS } from './demo/seed';

// Mismo prefijo que borra «Reiniciar demo» (components/common/DemoBanner.jsx).
const DEMO_PREFIX = 'tienda-demo:';
const KEYS = {
  products: `${DEMO_PREFIX}products`,
  accounts: `${DEMO_PREFIX}accounts`,
  users: `${DEMO_PREFIX}users`,
  session: `${DEMO_PREFIX}session`,
};
const PAGE_SIZE = 12;
const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw authError('storage/quota-exceeded', 'El almacenamiento local de la demo está lleno. Usa «Reiniciar demo».');
  }
};
const clone = (v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));
const delay = (value, ms = 150) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
const fail = (error, ms = 150) => new Promise((_, reject) => setTimeout(() => reject(error), ms));
const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

function authError(code, message) {
  const e = new Error(message);
  e.code = code;
  return e;
}

// Snapshots con la forma que usa la app (doc.exists, doc.data(), doc.ref.id, snap.docs...).
const docSnap = (id, data) => ({
  id,
  exists: data !== undefined && data !== null,
  ref: { id },
  data: () => clone(data ?? undefined),
});
const querySnap = (entries) => {
  const docs = entries.map(([id, data]) => docSnap(id, data));
  return {
    docs, size: docs.length, empty: docs.length === 0, forEach: (fn) => docs.forEach(fn),
  };
};

const userProfile = (email, extra = {}) => ({
  fullname: 'Usuario Demo',
  avatar: defaultAvatar,
  banner: defaultBanner,
  email,
  address: '',
  basket: [],
  mobile: { data: {} },
  role: 'USER',
  dateJoined: Date.now(),
  ...extra,
});

const seed = () => {
  if (!read(KEYS.products, null)) {
    const products = {};
    buildSeedProducts().forEach(({ id, ...p }) => { products[id] = p; });
    write(KEYS.products, products);
  }
  if (!read(KEYS.accounts, null)) {
    const accounts = {};
    const users = {};
    DEMO_ACCOUNTS.forEach(({ uid, email, password, provider, profile }) => {
      accounts[email] = { uid, password, provider, createdAt: Date.now() };
      users[uid] = userProfile(email, { ...profile, dateJoined: Date.now() });
    });
    write(KEYS.accounts, accounts);
    write(KEYS.users, users);
  }
};

class DemoBackend {
  constructor() {
    seed();
    this.listeners = new Set();
    this.pendingSignupUid = null;
    const self = this;

    this.auth = {
      currentUser: this.restoreSession(),
      onAuthStateChanged(cb) {
        self.listeners.add(cb);
        setTimeout(() => cb(self.auth.currentUser), 0);
        return () => self.listeners.delete(cb);
      },
    };
  }

  // ---- sesión ----
  makeUser = (email, account) => ({
    uid: account.uid,
    email,
    displayName: read(KEYS.users, {})[account.uid]?.fullname || null,
    photoURL: null,
    metadata: { creationTime: new Date(account.createdAt).toUTCString() },
    providerData: [{ providerId: account.provider }],
    updatePassword: (password) => this.passwordUpdate(password),
  });

  restoreSession = () => {
    const email = read(KEYS.session, null);
    const account = email && read(KEYS.accounts, {})[email];
    return account ? this.makeUser(email, account) : null;
  };

  setSession = (email) => {
    if (email) write(KEYS.session, email); else localStorage.removeItem(KEYS.session);
    this.auth.currentUser = this.restoreSession();
    const user = this.auth.currentUser;
    setTimeout(() => this.listeners.forEach((cb) => cb(user)), 0);
    return user;
  };

  // AUTH ACTIONS ------------
  createAccount = (email, password) => {
    const accounts = read(KEYS.accounts, {});
    const key = String(email).trim().toLowerCase();
    if (accounts[key]) return fail(authError('auth/email-already-in-use', 'Email already in use'));
    const account = { uid: `user-${newId()}`, password, provider: 'password', createdAt: Date.now() };
    accounts[key] = account;
    write(KEYS.accounts, accounts);
    // Como en Firebase, el cambio de sesión llega cuando el perfil ya está guardado (ver addUser).
    this.pendingSignupUid = account.uid;
    write(KEYS.session, key);
    this.auth.currentUser = this.makeUser(key, account);
    return delay({ user: this.auth.currentUser });
  };

  signIn = (email, password) => {
    const key = String(email).trim().toLowerCase();
    const account = read(KEYS.accounts, {})[key];
    if (!account) return fail(authError('auth/user-not-found', 'User not found'));
    if (account.password !== password) return fail(authError('auth/wrong-password', 'Wrong password'));
    return delay(this.setSession(key));
  };

  // Los proveedores sociales se simulan entrando con la cuenta de cliente demo.
  signInWithSocial = () => delay(this.setSession('cliente@demo.local'));

  signInWithGoogle = () => this.signInWithSocial();

  signInWithFacebook = () => this.signInWithSocial();

  signInWithGithub = () => this.signInWithSocial();

  signOut = () => {
    this.setSession(null);
    return delay(undefined);
  };

  passwordReset = () => delay(undefined);

  addUser = (id, user) => {
    const users = read(KEYS.users, {});
    users[id] = clone(user);
    write(KEYS.users, users);
    if (this.pendingSignupUid === id) {
      this.pendingSignupUid = null;
      const current = this.auth.currentUser;
      setTimeout(() => this.listeners.forEach((cb) => cb(current)), 0);
    }
    return delay(undefined, 50);
  };

  getUser = (id) => delay(docSnap(id, read(KEYS.users, {})[id]), 50);

  checkPassword = (password) => {
    const user = this.auth.currentUser;
    const account = user && read(KEYS.accounts, {})[user.email];
    if (!account || account.password !== password) {
      return Promise.reject(authError('auth/wrong-password', 'Wrong password'));
    }
    return Promise.resolve(account);
  };

  passwordUpdate = (password) => {
    const user = this.auth.currentUser;
    const accounts = read(KEYS.accounts, {});
    if (user && accounts[user.email]) {
      accounts[user.email].password = password;
      write(KEYS.accounts, accounts);
    }
    return delay(undefined);
  };

  changePassword = (currentPassword, newPassword) => this.checkPassword(currentPassword)
    .then(() => this.passwordUpdate(newPassword))
    .then(() => 'Password updated successfully!');

  reauthenticate = (currentPassword) => this.checkPassword(currentPassword);

  updateEmail = (currentPassword, newEmail) => this.checkPassword(currentPassword).then(() => {
    const accounts = read(KEYS.accounts, {});
    const oldKey = this.auth.currentUser.email;
    const newKey = String(newEmail).trim().toLowerCase();
    if (accounts[newKey]) throw authError('auth/email-already-in-use', 'Email already in use');
    accounts[newKey] = accounts[oldKey];
    delete accounts[oldKey];
    write(KEYS.accounts, accounts);
    write(KEYS.session, newKey);
    this.auth.currentUser = this.restoreSession();
    return 'Email Successfully updated';
  });

  updateProfile = (id, updates) => {
    const users = read(KEYS.users, {});
    users[id] = { ...users[id], ...clone(updates) };
    write(KEYS.users, users);
    return delay(undefined);
  };

  onAuthStateChanged = () => (this.auth.currentUser
    ? Promise.resolve(this.auth.currentUser)
    : Promise.reject(new Error('Auth State Changed failed')));

  saveBasketItems = (items, userId) => this.updateProfile(userId, { basket: items });

  setAuthPersistence = () => Promise.resolve();

  // PRODUCT ACTIONS --------------
  productEntries = () => Object.entries(read(KEYS.products, {}));

  getSingleProduct = (id) => delay(docSnap(id, read(KEYS.products, {})[id]));

  getProducts = (lastRefKey) => {
    const all = this.productEntries().sort(([a], [b]) => (a < b ? -1 : 1));
    const start = lastRefKey ? all.findIndex(([id]) => id === lastRefKey) + 1 : 0;
    const page = all.slice(start, start + PAGE_SIZE);
    const products = page.map(([id, data]) => ({ id, ...clone(data) }));
    const lastKey = page.length ? page[page.length - 1][0] : null;
    return delay(lastRefKey ? { products, lastKey } : { products, lastKey, total: all.length }, 300);
  };

  searchProducts = (searchKey) => {
    const key = String(searchKey).toLowerCase().trim();
    const words = key.split(' ').filter(Boolean);
    const products = this.productEntries()
      .filter(([, p]) => (p.name_lower || p.name.toLowerCase()).includes(key)
        || (p.keywords || []).some((k) => words.includes(String(k).toLowerCase()))
        || String(p.brand).toLowerCase().includes(key))
      .slice(0, PAGE_SIZE)
      .map(([id, data]) => ({ id, ...clone(data) }));
    return delay({ products, lastKey: null }, 250);
  };

  getFeaturedProducts = (itemsCount = 12) => delay(querySnap(
    this.productEntries().filter(([, p]) => p.isFeatured).slice(0, itemsCount),
  ), 250);

  getRecommendedProducts = (itemsCount = 12) => delay(querySnap(
    this.productEntries().filter(([, p]) => p.isRecommended).slice(0, itemsCount),
  ), 250);

  addProduct = (id, product) => {
    const products = read(KEYS.products, {});
    products[id] = clone(product);
    write(KEYS.products, products);
    return delay(undefined);
  };

  generateKey = () => `prod-${newId()}`;

  // "Storage": la imagen se guarda como data URL en localStorage.
  storeImage = (id, folder, imageFile) => new Promise((resolve, reject) => {
    if (typeof imageFile === 'string') { resolve(imageFile); return; }
    if (!imageFile || imageFile.size > MAX_IMAGE_BYTES) {
      reject(new Error('En la demo las imágenes deben pesar menos de 1,5 MB.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No se pudo leer la imagen.'));
    reader.readAsDataURL(imageFile);
  });

  deleteImage = () => Promise.resolve();

  editProduct = (id, updates) => {
    const products = read(KEYS.products, {});
    products[id] = { ...products[id], ...clone(updates) };
    write(KEYS.products, products);
    return delay(undefined);
  };

  removeProduct = (id) => {
    const products = read(KEYS.products, {});
    delete products[id];
    write(KEYS.products, products);
    return delay(undefined);
  };
}

const demoInstance = new DemoBackend();

export default demoInstance;
