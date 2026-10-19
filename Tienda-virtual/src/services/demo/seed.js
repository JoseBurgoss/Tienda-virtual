// Datos ficticios para la demo sin backend. Las imágenes son SVG generados aquí mismo
// (sin depender de ningún almacenamiento externo).

const ICONS = {
  headphones: '<path d="M70 140v-30a50 50 0 0 1 100 0v30" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/><rect x="58" y="128" width="28" height="46" rx="12" fill="#fff"/><rect x="154" y="128" width="28" height="46" rx="12" fill="#fff"/>',
  watch: '<rect x="98" y="52" width="44" height="30" rx="8" fill="#fff" opacity=".7"/><rect x="98" y="158" width="44" height="30" rx="8" fill="#fff" opacity=".7"/><rect x="84" y="80" width="72" height="80" rx="22" fill="#fff"/><circle cx="120" cy="120" r="22" fill="none" stroke="currentColor" stroke-width="6"/>',
  phone: '<rect x="88" y="50" width="64" height="140" rx="14" fill="#fff"/><rect x="96" y="64" width="48" height="104" rx="6" fill="currentColor" opacity=".35"/><circle cx="120" cy="178" r="5" fill="currentColor"/>',
  laptop: '<rect x="66" y="70" width="108" height="72" rx="8" fill="#fff"/><rect x="74" y="78" width="92" height="56" rx="4" fill="currentColor" opacity=".35"/><path d="M50 152h140l-10 16H60z" fill="#fff"/>',
  camera: '<rect x="58" y="86" width="124" height="82" rx="14" fill="#fff"/><rect x="92" y="72" width="40" height="18" rx="5" fill="#fff"/><circle cx="120" cy="127" r="26" fill="currentColor" opacity=".45"/><circle cx="120" cy="127" r="14" fill="#fff"/>',
  gamepad: '<path d="M78 98h84a30 30 0 0 1 28 40l-8 22a16 16 0 0 1-26 6l-14-14H98l-14 14a16 16 0 0 1-26-6l-8-22a30 30 0 0 1 28-40z" fill="#fff"/><path d="M90 120h20M100 110v20" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><circle cx="146" cy="114" r="6" fill="currentColor"/><circle cx="158" cy="128" r="6" fill="currentColor"/>',
  speaker: '<rect x="84" y="52" width="72" height="136" rx="16" fill="#fff"/><circle cx="120" cy="140" r="26" fill="currentColor" opacity=".45"/><circle cx="120" cy="86" r="11" fill="currentColor" opacity=".45"/>',
  keyboard: '<rect x="46" y="92" width="148" height="62" rx="10" fill="#fff"/><g fill="currentColor" opacity=".45"><rect x="58" y="104" width="16" height="12" rx="3"/><rect x="80" y="104" width="16" height="12" rx="3"/><rect x="102" y="104" width="16" height="12" rx="3"/><rect x="124" y="104" width="16" height="12" rx="3"/><rect x="146" y="104" width="16" height="12" rx="3"/><rect x="168" y="104" width="14" height="12" rx="3"/><rect x="80" y="128" width="80" height="12" rx="3"/></g>',
  drive: '<rect x="74" y="62" width="92" height="116" rx="12" fill="#fff"/><circle cx="120" cy="112" r="28" fill="currentColor" opacity=".35"/><circle cx="120" cy="112" r="6" fill="#fff"/><rect x="92" y="156" width="56" height="8" rx="4" fill="currentColor" opacity=".45"/>',
  vr: '<path d="M60 100h120a14 14 0 0 1 14 14v28a14 14 0 0 1-14 14h-30l-12-16h-36l-12 16H60a14 14 0 0 1-14-14v-28a14 14 0 0 1 14-14z" fill="#fff"/><circle cx="92" cy="128" r="12" fill="currentColor" opacity=".45"/><circle cx="148" cy="128" r="12" fill="currentColor" opacity=".45"/>',
};

export const productArt = (icon, hue) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" color="hsl(${hue} 45% 32%)">`
    + `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 60% 62%)"/><stop offset="1" stop-color="hsl(${(hue + 30) % 360} 55% 42%)"/></linearGradient></defs>`
    + `<rect width="240" height="240" fill="url(#g)"/><circle cx="196" cy="40" r="70" fill="#fff" opacity=".08"/>${ICONS[icon]}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const DAY = 24 * 60 * 60 * 1000;
const BASE_DATE = new Date('2024-03-01T12:00:00Z').getTime();

const raw = [
  ['Audífonos inalámbricos Aura', 'Sony', 129, 'headphones', 210, [40, 44], ['#1f2937', '#e5e7eb'], ['audio', 'audifonos', 'bluetooth'], true, false],
  ['Reloj inteligente Pulso 2', 'Garmin', 199, 'watch', 150, [40, 44, 46], ['#111827', '#b45309'], ['reloj', 'fitness', 'smartwatch'], true, true],
  ['Teléfono Nébula X', 'Samsung', 649, 'phone', 260, [150, 160], ['#0f172a', '#93c5fd'], ['telefono', 'android', 'movil'], true, false],
  ['Portátil Ligera 14', 'Lenovo', 899, 'laptop', 200, [330, 356], ['#334155', '#cbd5e1'], ['portatil', 'laptop', 'oficina'], true, true],
  ['Cámara compacta Lumen', 'Fujifilm', 549, 'camera', 20, [100, 120], ['#111827', '#d6d3d1'], ['camara', 'fotografia'], false, true],
  ['Control inalámbrico Arcade', 'Nintendo', 69, 'gamepad', 0, [150], ['#dc2626', '#2563eb'], ['control', 'gaming', 'consola'], true, false],
  ['Parlante portátil Eco', 'LG', 89, 'speaker', 170, [180, 200], ['#065f46', '#f5f5f4'], ['audio', 'parlante', 'bluetooth'], false, true],
  ['Teclado mecánico Brisa', 'Logitech', 119, 'keyboard', 280, [360, 440], ['#18181b', '#fafafa'], ['teclado', 'gaming', 'oficina'], true, true],
  ['Disco externo Bóveda 2 TB', 'Western Digital', 79, 'drive', 230, [110], ['#1e3a8a', '#111827'], ['almacenamiento', 'disco', 'backup'], false, true],
  ['Visor de realidad virtual Horizonte', 'HTC', 399, 'vr', 300, [180], ['#f4f4f5', '#27272a'], ['vr', 'gaming', 'realidad virtual'], false, false],
  ['Audífonos deportivos Ritmo', 'Xiaomi', 49, 'headphones', 340, [38, 42], ['#ea580c', '#0f172a'], ['audio', 'deporte', 'bluetooth'], false, true],
  ['Teléfono Brisa Lite', 'Xiaomi', 279, 'phone', 190, [150], ['#14532d', '#e2e8f0'], ['telefono', 'android', 'economico'], false, false],
  ['Portátil Creativa 16', 'Asus', 1299, 'laptop', 320, [356, 406], ['#312e81', '#e5e7eb'], ['portatil', 'diseño', 'creativo'], true, false],
  ['Teclado compacto Nube', 'Razer', 99, 'keyboard', 120, [300], ['#22c55e', '#111827'], ['teclado', 'gaming'], false, false],
];

export const buildSeedProducts = () => raw.map(([name, brand, price, icon, hue, sizes, availableColors, keywords, isFeatured, isRecommended], i) => {
  const id = `demo-${String(i + 1).padStart(2, '0')}`;
  const image = productArt(icon, hue);
  return {
    id,
    name,
    name_lower: name.toLowerCase(),
    brand,
    price,
    maxQuantity: 10,
    quantity: 1,
    description: `${name} de ${brand}. Producto ficticio creado para la demo de la tienda: los datos se guardan solo en este navegador.`,
    keywords,
    sizes,
    availableColors,
    isFeatured,
    isRecommended,
    dateAdded: BASE_DATE - i * DAY,
    image,
    imageCollection: [{ id: `${id}-img`, url: image }],
  };
});

export const DEMO_ACCOUNTS = [
  {
    uid: 'demo-admin', email: 'admin@demo.local', password: 'demo1234', provider: 'password',
    profile: { fullname: 'Admin Demo', role: 'ADMIN' },
  },
  {
    uid: 'demo-user', email: 'cliente@demo.local', password: 'demo1234', provider: 'password',
    profile: { fullname: 'Cliente Demo', role: 'USER' },
  },
];
