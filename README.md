# 🛀 Fegurd Spa - Backend API

Backend completo para gestionar reservas de spa con integración **Twilio WhatsApp** y **MongoDB**.

## 🚀 Inicio Rápido

### Requisitos
- **Node.js** 16+ → [Descarga aquí](https://nodejs.org)
- **MongoDB** → Local o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Twilio Account** (gratis) → [Crear cuenta](https://www.twilio.com)

### Instalación

```bash
# 1. Clonar e instalar dependencias
npm install

# 2. Configurar variables de entorno
# Edita el archivo .env con tus credenciales

# 3. Iniciar el servidor
npm run dev
```

---

## 📁 Estructura del Proyecto

```
fegurd-backend/
├── src/
│   ├── models/           # Esquemas de MongoDB
│   │   └── Reserva.js    # Modelo de reservas
│   ├── controllers/       # Lógica de negocio
│   │   └── reservasController.js
│   ├── routes/           # Endpoints API
│   │   └── reservas.js
│   └── services/         # Servicios externos
│       └── whatsappService.js
├── .env                  # Variables de entorno (NO COMMITEAR)
├── .env.example          # Plantilla de .env
├── package.json          # Dependencias
├── server.js             # Punto de entrada
└── README.md             # Este archivo
```

---

## ⚙️ Configuración

### 1. Archivo `.env`

```env
# Puerto
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/fegurd-spa
# O MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/fegurd-spa

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+1234567890

# Fegurd Info
FEGURD_WHATSAPP=+573127072996
FEGURD_EMAIL=pagosyreservas@fegurdspa.com
FEGURD_DIRECCION=Calle 52B #80A-28, Interior 201, Barrio Calasanz

# Entorno
NODE_ENV=development
```

### 2. Obtener Credenciales de Twilio

1. Ir a https://www.twilio.com
2. Crear cuenta (obtienen $15 USD de prueba)
3. Dashboard → Ir a Console
4. Copiar:
   - **Account SID**
   - **Auth Token**
5. Comprar número WhatsApp Business (~$1/mes)
6. Pegarcredenciales en `.env`

### 3. Configurar MongoDB

#### Opción A: MongoDB Local
```bash
# Descargar desde https://www.mongodb.com/try/download/community
mongod  # Ejecutar en terminal
```

#### Opción B: MongoDB Atlas (Recomendado)
1. Crear cuenta en https://www.mongodb.com/cloud/atlas
2. Crear cluster gratuito
3. Obtener connection string
4. Pegar en `.env` → `MONGODB_URI`

---

## 🔌 Endpoints API

### Crear Reserva
```http
POST /api/reservas
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "telefono": "+573127072996",
  "email": "juan@example.com",
  "servicio": "Masaje Relajante",
  "fecha": "2026-04-15",
  "hora": "10:00 AM",
  "notas": "Sin alergias",
  "terapeuta": "Alexandra"
}
```

**Respuesta:**
```json
{
  "success": true,
  "mensaje": "✅ Reserva creada exitosamente. Confirmación enviada por WhatsApp.",
  "data": {
    "_id": "665a1b2c3d4e5f6g7h8i9j0k",
    "nombre": "Juan Pérez",
    ...
  },
  "whatsappEnviado": true
}
```

---

### Obtener Todas las Reservas
```http
GET /api/reservas?estado=pendiente&fecha=2026-04-15
```

**Parámetros:**
- `estado`: pendiente, confirmada, cancelada, completada
- `fecha`: formato YYYY-MM-DD
- `telefono`: número de cliente

---

### Obtener Reserva por ID
```http
GET /api/reservas/665a1b2c3d4e5f6g7h8i9j0k
```

---

### Actualizar Reserva
```http
PUT /api/reservas/665a1b2c3d4e5f6g7h8i9j0k
Content-Type: application/json

{
  "estado": "confirmada",
  "terapeuta": "Sofia",
  "notas": "Confirmada con Sofia"
}
```

---

### Cancelar Reserva
```http
DELETE /api/reservas/665a1b2c3d4e5f6g7h8i9j0k
```

Envía automáticamente un WhatsApp de cancelación al cliente.

---

### Health Check
```http
GET /api/health
```

Respuesta:
```json
{
  "status": "✅ Servidor corriendo",
  "mongodb": "✅ Conectado",
  "twilio": "✅ Configurado"
}
```

---

## 🧪 Pruebas

### Con cURL
```bash
# Crear reserva
curl -X POST http://localhost:5000/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "telefono": "+573127072996",
    "email": "test@example.com",
    "servicio": "Masaje Relajante",
    "fecha": "2026-04-15",
    "hora": "10:00 AM",
    "notas": "Test"
  }'

# Health check
curl http://localhost:5000/api/health
```

### Con Postman
1. Descargar [Postman](https://www.postman.com)
2. Importar archivos de ejemplo en `/postman/`
3. Configurar URL base: `http://localhost:5000`
4. Ejecutar solicitudes

---

## 📱 Mensajes WhatsApp Automáticos

### 1. Confirmación de Reserva
Cuando se crea una reserva:
```
✅ ¡Reserva confirmada en Fegurd Spa!

👤 Hola Juan,

📋 DETALLES DE TU CITA:
🛎️ Servicio: Masaje Relajante
📅 Fecha: 2026-04-15
⏰ Hora: 10:00 AM
...
```

### 2. Recordatorio 24 horas antes
Se envía automáticamente:
```
📢 ¡Recordatorio de tu cita mañana!

Hola Juan,

Te recordamos que mañana a las 10:00 AM...
```

### 3. Cancelación
Si se cancela la reserva:
```
❌ Cita cancelada en Fegurd Spa

Hola Juan,

Informamos que tu cita del 15/04/2026...
```

---

## 🔒 Seguridad

### Never commit .env
```bash
# Agregar a .gitignore
.env
.env.local
node_modules/
```

### Validaciones
- ✅ Teléfono requerido
- ✅ Email opcional pero validado
- ✅ Fecha no puede ser en el pasado
- ✅ Hora debe estar en formato válido
- ✅ Servicio debe ser de la lista predefinida

### Rate Limiting (Próximamente)
```bash
npm install express-rate-limit
```

---

## 🚨 Troubleshooting

### Error: "Cannot connect to MongoDB"
```bash
# Verificar que MongoDB está corriendo
mongod

# O verificar connection string en .env
MONGODB_URI=mongodb://localhost:27017/fegurd-spa
```

### Error: "Twilio credentials invalid"
```bash
# Verificar formato en .env (sin comillas)
TWILIO_ACCOUNT_SID=ACxxxxxxxx  ✓
TWILIO_ACCOUNT_SID="ACxxxxxxxx"  ✗
```

### Error: "npm: command not found"
```bash
# Verificar Node.js
node --version
npm --version

# Reinstalar si es necesario
# https://nodejs.org
```

---

## 📊 Base de Datos

### Esquema Reserva
```javascript
{
  nombre: String,           // Requerido
  telefono: String,         // Requerido
  email: String,            // Opcional
  servicio: String,         // Requerido
  fecha: Date,              // Requerido
  hora: String,             // Requerido
  notas: String,            // Opcional
  terapeuta: String,        // Nombre del terapeuta
  estado: String,           // pendiente, confirmada, cancelada, completada
  whatsappEnviado: Boolean, // Seguimiento
  createdAt: Date,          // Auto
  updatedAt: Date           // Auto
}
```

---

## 🚀 Deploy

### Heroku
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Crear app
heroku create fegurd-spa-api

# Configurar variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set TWILIO_ACCOUNT_SID=AC...

# Deploy
git push heroku main
```

### AWS/DigitalOcean/VPS
```bash
# SSH a tu servidor
ssh user@ip

# Clonar repo
git clone https://github.com/tu-repo.git

# Instalar dependencias
npm install

# Usar PM2 para ejecutar en background
npm install -g pm2
pm2 start server.js --name "fegurd-spa"
pm2 startup
pm2 save
```

---

## 📚 Documentación API Completa

Ver [API_DOCS.md](./API_DOCS.md)

---

## 💡 Tips & Tricks

1. **Usar variables de entorno**: Nunca hardcodear tokens/credenciales
2. **Validar en el frontend Y backend**: Validar dos veces
3. **Usar middleware**: Para CORS, parse JSON, etc.
4. **Logs detallados**: Facilita debugging
5. **Tests**: Escribir tests antes de deploy

---

## 🤝 Contribuir

1. Fork este repositorio
2. Crear rama: `git checkout -b feature/nueva-feature`
3. Commit: `git commit -m "Agregar nueva feature"`
4. Push: `git push origin feature/nueva-feature`
5. Pull Request

---

##📞 Soporte

- **Email**: pagosyreservas@fegurdspa.com
- **WhatsApp**: +573127072996
- **Instagram**: @fegurdspa

---

## 📄 Licencia

MIT - Libre para usar y modificar

---

**Última actualización**: Abril 9, 2026
