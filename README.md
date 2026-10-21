<div align="center">

<img src="frontend/public/snail_icon.png" alt="SnailBet" width="110" />

# SnailBet

**Simulador web de apuestas y estadísticas de carreras de caracoles**

Proyecto full-stack desarrollado con **React, TypeScript y Express**, con autenticación, panel de estadísticas, recargas simuladas y pruebas automatizadas.

[**Ver aplicación**](https://julian-3105.vercel.app/) · [**Tecnologías**](#tecnologías) · [**Instalación**](#ejecución-local) · [**Pruebas**](#pruebas-automatizadas)

</div>

> [!IMPORTANT]
> **Proyecto demostrativo.** Las carreras, apuestas y transacciones de SnailPay son simuladas. No se utiliza dinero real ni se procesan pagos bancarios.

## Descripción

SnailBet es una aplicación web que representa un entorno de apuestas de carreras de caracoles. Permite crear una cuenta, iniciar sesión, consultar un dashboard con estadísticas de carreras y gestionar un saldo ficticio mediante una experiencia de pago simulada llamada **SnailPay**.

La aplicación está separada en un frontend React y una API REST con Express. Para la navegación utiliza **React Router DOM**, para los estilos **Tailwind CSS** y para la visualización de datos **Recharts**. Se incluyen pruebas de lógica con Vitest y pruebas end-to-end con Playwright.

## Funcionalidades

- **Registro e inicio de sesión:** validación de formularios, contraseñas cifradas con `bcryptjs` y emisión de tokens JWT.
- **Navegación con React Router DOM:** gestión de rutas dentro de la SPA y acceso a rutas protegidas; el dashboard requiere un token guardado en el navegador.
- **Dashboard:** visualización del saldo y estadísticas mediante gráficos de barras y dona creados con Recharts.
- **Simulación de carreras:** generación aleatoria de resultados para seis caracoles: Gary, Mate, Lightning, Flash, Turbo y Rocket.
- **SnailPay:** formulario para simular recargas, estados de carga, confirmaciones y errores de transacción.
- **Interfaz responsive:** componentes diseñados con Tailwind CSS y elementos gráficos de Lucide React.

> **Nota:** las estadísticas se generan de forma aleatoria para fines de demostración; no representan resultados históricos almacenados en una base de datos. La versión actual presenta estadísticas y simulación, no un motor transaccional de apuestas reales.

## Tecnologías

| Capa | Tecnologías |
| --- | --- |
| Frontend y navegación | React 19, TypeScript, Vite 8, React Router DOM 7 (`react-router-dom`) |
| Estilos e interfaz | Tailwind CSS 4, Lucide React |
| Gráficos y visualización de datos | Recharts 3 |
| Backend | Node.js, Express 5, TypeScript |
| Autenticación | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` |
| Pruebas unitarias/de lógica | Vitest, jsdom |
| Pruebas end-to-end | Playwright (Chromium, Firefox, WebKit) |
| Calidad de código | ESLint |
| Despliegue del frontend | Vercel |

## Arquitectura y estructura

```text
julian-3105-main/
├── backend/
│   ├── src/
│   │   ├── index.ts             # Aplicación Express y rutas REST
│   │   └── types/              # Tipos del backend
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/                 # Iconos y archivos públicos
│   ├── src/
│   │   ├── components/         # Login, registro, dashboard, saldo y gráficos
│   │   ├── data/               # Caracoles de la simulación
│   │   ├── types/              # Tipos del frontend
│   │   ├── utils/              # Generadores aleatorios
│   │   └── App.tsx             # Rutas de la aplicación
│   ├── tests/
│   │   ├── helper/             # Utilidades para pruebas E2E
│   │   ├── payment.spec.ts     # Flujo de recarga con Playwright
│   │   └── randomCalculations.test.ts # Pruebas con Vitest
│   ├── playwright.config.ts
│   ├── vercel.json
│   └── package.json
└── README.md
```

**Flujo general:** el frontend consume la API mediante `fetch`, utilizando la URL definida en `VITE_API_URL`. Express gestiona registro, login y respuestas del simulador de pagos. El token, los datos básicos de sesión y el saldo se almacenan en `localStorage` del navegador.

## Ejecución local

### Requisitos

- Node.js y npm compatibles con las versiones de Vite y las dependencias indicadas en los archivos `package.json`.
- Dos terminales, una para la API y otra para el frontend.

### 1. Obtener el código

```bash
git clone <URL_DEL_REPOSITORIO>
cd julian-3105-main
```

Si descargaste el ZIP, basta con descomprimirlo y entrar en el directorio del proyecto.

### 2. Configurar el backend

```bash
cd backend
npm ci
```

Crea `backend/.env`:

```dotenv
JWT_SECRET=coloca_aqui_una_clave_larga_y_aleatoria
```

**Importante:** `backend/src/index.ts` exporta la instancia de Express, pero no contiene un `app.listen(...)`. Por eso `npm run dev`, tal como está el código recibido, **no abre por sí solo un puerto HTTP**. Para ejecutar la API de forma independiente en local, agrega un punto de entrada que importe `app` y escuche un puerto (por ejemplo, el 3000), o utiliza un adaptador/runtime que aloje la aplicación Express. No es necesario modificar las rutas existentes para ello.

### 3. Configurar el frontend

En otra terminal:

```bash
cd frontend
npm ci
```

Crea `frontend/.env` con la dirección donde efectivamente esté ejecutándose la API:

```dotenv
VITE_API_URL=http://localhost:3000
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre la dirección mostrada por Vite (habitualmente `http://localhost:5173`). Para utilizar registro, login y recargas, **la API debe estar disponible** en la URL configurada.

## API REST

Las rutas actuales están definidas en `backend/src/index.ts`.

| Método | Endpoint | Propósito |
| --- | --- | --- |
| `POST` | `/api/register` | Registrar usuario (`name`, `email`, `password`) |
| `POST` | `/api/login` | Validar credenciales y devolver JWT |
| `POST` | `/api/payment` | Simular una recarga (`id`, `email`, `amount`, `card`) |
| `GET` | `/api/health` | Consultar el estado de la API simulada |

**Ejemplo de petición de pago** (valores ficticios):

```json
{
  "id": "1",
  "email": "demo@example.com",
  "amount": 100,
  "card": "4111111111111234"
}
```

### Escenarios de prueba de SnailPay

| Últimos cuatro dígitos | Resultado simulado |
| --- | --- |
| `1234` | Pago exitoso |
| `0000` | Fondos insuficientes |
| `9999` | Error de red |
| `5678` | Transacción fallida |

## Pruebas automatizadas

Ejecuta los comandos desde `frontend/`.

### Vitest — pruebas de lógica

Las pruebas existentes en `tests/randomCalculations.test.ts` verifican la cantidad de caracoles, la suma de puntos, la ausencia de puntos negativos y el rango de generación de apuestas aleatorias.

```bash
npm test -- --run
```

Para ejecución interactiva:

```bash
npm test
```

> Aunque están instaladas `@testing-library/react` y `@testing-library/jest-dom`, el código entregado no incluye todavía pruebas de renderizado de componentes. Las pruebas Vitest actuales se centran en funciones de lógica.

### Playwright — pruebas end-to-end

El proyecto incluye una prueba E2E de registro, inicio de sesión y recarga exitosa en `tests/payment.spec.ts`.

```bash
npx playwright install
npx playwright test payment.spec.ts
```

Para ejecutar todas las pruebas Playwright:

```bash
npx playwright test
```

Para consultar el reporte HTML:

```bash
npx playwright show-report
```

Playwright está configurado con proyectos para **Chromium, Firefox y WebKit**. Antes de ejecutar el flujo local, inicia el frontend en `http://localhost:5173` y asegúrate de que la API esté disponible; el helper E2E utiliza explícitamente esa URL. La configuración actual no arranca automáticamente los servidores.

El archivo `tests/example.spec.ts` contiene pruebas de ejemplo sobre el sitio de Playwright y no comprueba funcionalidades de SnailBet.

### Integración continua

Existe un workflow en `frontend/.github/workflows/playwright.yml` para lanzar Playwright en pushes y pull requests. **Su ubicación y sus comandos requieren revisión** si el directorio raíz del repositorio es `julian-3105-main/`: GitHub Actions busca workflows en `.github/workflows/` en la raíz y los comandos deben instalar dependencias desde `frontend/`. Además, las pruebas E2E necesitan que el frontend y la API estén levantados.

## Scripts útiles

| Directorio | Comando | Acción |
| --- | --- | --- |
| `frontend` | `npm run dev` | Inicia Vite |
| `frontend` | `npm run build` | Compila TypeScript y genera el bundle |
| `frontend` | `npm run preview` | Previsualiza el build |
| `frontend` | `npm run lint` | Ejecuta ESLint |
| `frontend` | `npm test -- --run` | Ejecuta Vitest una vez |
| `backend` | `npm run build` | Compila TypeScript |
| `backend` | `npm run dev` | Ejecuta el módulo en modo watch; requiere un listener/host HTTP adicional |

## Despliegue

La aplicación pública está disponible en **[julian-3105.vercel.app](https://julian-3105.vercel.app/)**.

El frontend incluye `vercel.json` con una regla de reescritura hacia `index.html` para permitir la navegación con React Router en las rutas de la SPA. Para reproducir el despliegue del frontend, configura `frontend/` como directorio raíz en Vercel, utiliza el comando `npm run build`, publica `dist/` y define `VITE_API_URL` con la URL pública de la API.

El código proporcionado no incluye la configuración de despliegue del backend; por tanto, su plataforma, URL pública y mecanismo de hosting no se documentan aquí como hechos confirmados.

## Alcance y mejoras futuras

La implementación es una demostración técnica, no una plataforma de apuestas con dinero real. Entre las mejoras posibles se encuentran integrar una base de datos persistente, validar JWT del lado del servidor en endpoints protegidos, corregir los escenarios de respuesta del simulador de pagos, ampliar los tests de componentes y automatizar el arranque de servicios en las pruebas E2E.

---

<div align="center">

**SnailBet** · React · TypeScript · Express · Vitest · Playwright

[Explorar la demo](https://julian-3105.vercel.app/)

</div>
