# Setup Backend Fegurd Spa

## 📋 Requisitos previos

Antes de instalar las dependencias, necesitas tener instalado:

### 1. **Node.js y npm**
- Descarga desde: https://nodejs.org/  
- Descarga la versión LTS (recomendado)
- Verifica la instalación:
  ```bash
  node --version
  npm --version
  ```

### 2. **MongoDB**
Elige una de estas opciones:

#### Opción A: MongoDB local (Windows)
1. Descarga desde: https://www.mongodb.com/try/download/community
2. Ejecuta el instalador
3. Verifica: `mongod --version`

#### Opción B: MongoDB Atlas (Nube - recomendado)
1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea cuenta gratis
3. Crea un cluster
4. Obtén la connection string
5. Copia en `.env` → `MONGODB_URI`

---

## 🚀 Instalación rápida

### Paso 1: Ejecutar el script de instalación
```bash
# Windows - Doble click en:
install-dependencies.bat

# O manualmente:
npm install
```

### Paso 2: Configurar credenciales de Twilio

Ve a https://www.twilio.com:
1. Crea una cuenta (obtienen $15 USD gratis)
2. Accede a Console
3. Copia:
   - **Account SID** 
   - **Auth Token**
4. Compra un número WhatsApp (~$1)

Actualiza el archivo `.env`:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_token_aqui
TWILIO_WHATSAPP_NUMBER=+1234567890
```

### Paso 3: Configurar .env

Actualiza los siguientes valores en `.env`:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/fegurd-spa
# O si usas MongoDB Atlas:
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/fegurd-spa

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_token_aqui
TWILIO_WHATSAPP_NUMBER=+1234567890

# Fegurd Spa
FEGURD_WHATSAPP=+573127072996
FEGURD_EMAIL=pagosyreservas@fegurdspa.com
```

### Paso 4: Iniciar el servidor

```bash
# Modo desarrollo (con auto-reload)
npm run dev

# Modo producción
npm start
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:5000
✅ MongoDB conectado correctamente
📱 WhatsApp integrado con Twilio
```

---

## 🧪 Pruebas

### Verificar que el servidor está corriendo:
```bash
curl http://localhost:5000/api/health
```

Respuesta esperada:
```json
{
  "status": "✅ Servidor corriendo",
  "mongodb": "✅ Conectado",
  "twilio": "✅ Configurado"
}
```

### Crear una reserva de prueba:
```bash
curl -X POST http://localhost:5000/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "telefono": "+573127072996",
    "email": "juan@example.com",
    "servicio": "Masaje Relajante",
    "fecha": "2026-04-15",
    "hora": "10:00 AM",
    "notas": "Sin alergias"
  }'
```

---

## 📱 Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/reservas` | Crear nueva reserva |
| `GET` | `/api/reservas` | Obtener todas las reservas |
| `GET` | `/api/reservas/:id` | Obtener reserva por ID |
| `PUT` | `/api/reservas/:id` | Actualizar reserva |
| `DELETE` | `/api/reservas/:id` | Cancelar reserva (envía WhatsApp) |
| `GET` | `/api/health` | Estado del servidor |

---

## ⚠️ Troubleshooting

### Error: "npm: command not found"
- Asegúrate de tener Node.js instalado
- Reinicia tu terminal después de instalar Node.js
- Verifica el PATH: `echo $PATH` (Mac/Linux) o `echo %PATH%` (Windows)

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB está corriendo (si es local)
- Si usas MongoDB Atlas, verifica la connection string en `.env`
- Verifica que tu IP está en la whitelist de Atlas

### Error: "Twilio credentials invalid"
- Verifica que los datos en `.env` son correctos
- No uses comillas en `.env`: `TWILIO_ACCOUNT_SID=AC...` ✓
- Verifica que tu número de WhatsApp es válido

---

## 📦 Dependencias instaladas

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **twilio**: SDK para WhatsApp
- **cors**: Compartir recursos entre sitios
- **dotenv**: Variables de entorno
- **nodemon**: Auto-reload en desarrollo

---

## 🔒 Seguridad

**IMPORTANTE:** Nunca hagas commit del archivo `.env` a Git. Añade a `.gitignore`:
```
.env
node_modules/
.DS_Store
```

---

¿Necesitas ayuda? Contacta: pagosyreservas@fegurdspa.com
