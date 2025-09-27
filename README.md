```markdown
# TiendaVirtual / Virtual Store

A modern e-commerce web application built with React and Firebase, featuring shopping cart functionality, user authentication, and real-time data synchronization.

Una aplicación web de comercio electrónico moderna construida con React y Firebase, con funcionalidad de carrito de compras, autenticación de usuarios y sincronización de datos en tiempo real.

## 🚀 Features / Características

### English
- **Product Management**: Browse, search, and filter product catalog
- **Shopping Cart**: Add, remove, and modify product quantities  
- **User Authentication**: Firebase-based user registration and login
- **Real-time Updates**: Live synchronization of cart and product data
- **Responsive Design**: Mobile-friendly user interface
- **State Persistence**: Cart contents preserved across browser sessions
- **Payment Integration**: Credit card and PayPal payment options
- **Image Management**: Product image upload and storage

### Español
- **Gestión de Productos**: Navegar, buscar y filtrar catálogo de productos
- **Carrito de Compras**: Agregar, eliminar y modificar cantidades de productos
- **Autenticación de Usuarios**: Registro e inicio de sesión basado en Firebase
- **Actualizaciones en Tiempo Real**: Sincronización en vivo de carrito y datos de productos
- **Diseño Responsivo**: Interfaz amigable para móviles
- **Persistencia de Estado**: Contenido del carrito preservado entre sesiones
- **Integración de Pagos**: Opciones de pago con tarjeta de crédito y PayPal
- **Gestión de Imágenes**: Carga y almacenamiento de imágenes de productos

## 🛠️ Technology Stack / Stack Tecnológico

| Technology | Version | Purpose / Propósito |
|------------|---------|---------------------|
| React | 17.0.2 | Frontend framework / Framework frontend |
| Firebase | 8.4.3 | Backend services / Servicios backend |
| Redux | 4.1.0 | State management / Gestión de estado |
| Vite | 3.0.2 | Build tool / Herramienta de construcción |
| Formik | 2.2.6 | Form handling / Manejo de formularios |
| Ant Design | 4.6.2 | UI components / Componentes UI | [1](#0-0) 

## 📋 Prerequisites / Prerrequisitos

### English
- Node.js (version 14 or higher)
- npm or yarn package manager
- Firebase account and project setup

### Español
- Node.js (versión 14 o superior)
- Gestor de paquetes npm o yarn
- Cuenta de Firebase y configuración de proyecto

## 🚀 Installation & Setup / Instalación y Configuración

### English

1. **Clone the repository**
   ```bash
   git clone https://github.com/JoseBurgoss/Tienda-virtual.git
   cd Tienda-virtual
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication, Firestore Database, and Storage
   - Copy your Firebase config and create a `.env` file in the root directory
   - Add your Firebase configuration variables

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run serve
   ```

### Español

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/JoseBurgoss/Tienda-virtual.git
   cd Tienda-virtual
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase**
   - Crear un proyecto Firebase en [Firebase Console](https://console.firebase.google.com)
   - Habilitar Authentication, Firestore Database y Storage
   - Copiar tu configuración de Firebase y crear un archivo `.env` en el directorio raíz
   - Agregar las variables de configuración de Firebase

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   ```

6. **Previsualizar construcción de producción**
   ```bash
   npm run serve
   ```

## 📜 Available Scripts / Scripts Disponibles [2](#0-1) 

### English
- `npm run dev`: Starts Vite development server with hot reload
- `npm run build`: Creates optimized production build with SPA fallback
- `npm run serve`: Previews production build locally
- `npm run test`: Runs Jest test suite with cross-environment support

### Español
- `npm run dev`: Inicia el servidor de desarrollo Vite con recarga en caliente
- `npm run build`: Crea una construcción de producción optimizada con respaldo SPA
- `npm run serve`: Previsualiza la construcción de producción localmente
- `npm run test`: Ejecuta la suite de pruebas Jest con soporte multi-entorno

## 🏗️ Project Structure / Estructura del Proyecto

```
Tienda-virtual/
├── src/
│   ├── components/          # Reusable UI components / Componentes UI reutilizables
│   │   └── common/         # Common components like SearchBar
│   ├── views/              # Page components / Componentes de página
│   │   ├── account/        # User account management
│   │   ├── checkout/       # Checkout process
│   │   └── error/          # Error pages
│   ├── redux/              # State management / Gestión de estado
│   ├── hooks/              # Custom React hooks
│   ├── constants/          # App constants and routes
│   └── firebase/           # Firebase configuration
├── public/                 # Static assets / Recursos estáticos
└── package.json           # Dependencies and scripts
```

## 🔧 Key Features Implementation / Implementación de Características Clave

### Search Functionality / Funcionalidad de Búsqueda
The application includes a sophisticated search system with recent search history: [3](#0-2) 

### Payment Integration / Integración de Pagos
Multiple payment methods are supported including credit cards and PayPal: [4](#0-3) 

### User Account Management / Gestión de Cuentas de Usuario
Complete user profile management with form validation: [5](#0-4) 

## 🌐 Deployment / Despliegue

### English
The application is configured for deployment with Firebase Hosting. The build process automatically creates a SPA fallback by copying `index.html` to `404.html`.

### Español
La aplicación está configurada para despliegue con Firebase Hosting. El proceso de construcción automáticamente crea un respaldo SPA copiando `index.html` a `404.html`.

## 📝 License / Licencia

MIT License - see LICENSE file for details / Licencia MIT - ver archivo LICENSE para detalles

## 👨‍💻 Author / Autor

**Julius Guevarra** - Original Developer / Desarrollador Original [6](#0-5) 

## 🤝 Contributing / Contribuir

### English
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Español
1. Hacer fork del repositorio
2. Crear tu rama de característica (`git checkout -b feature/CaracteristicaIncreible`)
3. Hacer commit de tus cambios (`git commit -m 'Agregar CaracteristicaIncreible'`)
4. Push a la rama (`git push origin feature/CaracteristicaIncreible`)
5. Abrir un Pull Request
```
