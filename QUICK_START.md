# 🚀 ¡Instalación Completada!

## ✅ Lo que hemos hecho:

1. **✓ Creada estructura del backend Node.js**
   - Carpeta: `c:\Users\anait\OneDrive\Desktop\fegurd-backend\`
   
2. **✓ Instaladas todas las dependencias**
   - Express (servidor web)
   - Mongoose (MongoDB)
   - Twilio (WhatsApp)
   - CORS, dotenv, bodyParser, etc.

3. **✓ Creados todos los archivos necesarios**
   - `server.js` - Servidor principal
   - Modelos, controladores, rutas
   - Servicio de WhatsApp

4. **✓ Actualizado el HTML del formulario**
   - `prototype.html` - Ahora conecta con el backend
   - Función `confirmBooking()` enviará datos al servidor

---

## 📋 Próximos Pasos:

### 1️⃣ Instalar MongoDB

**Opción A: Local (Windows)**
- Descarga: https://www.mongodb.com/try/download/community
- Ejecuta el instalador
- Inicia el servicio `mongod`

**Opción B: MongoDB Atlas (Nube - Recomendado)**
- Ve a: https://www.mongodb.com/cloud/atlas
- Crea una cuenta gratis
- Crea un cluster gratuito
- Copia la connection string
- Pégalo en `.env` → `MONGODB_URI`

### 2️⃣ Obtener Credenciales de Twilio

1. Ve a: https://www.twilio.com
2. Crea una cuenta (obtienen $15 USD gratis)
3. Dashboard → Console → Account Info
4. **Copia:**
   - Account SID
   - Auth Token
5. **Compra un número WhatsApp** (~$1)
6. **Pega en `.env`**

### 3️⃣ Configurar el archivo `.env`

Abre: `c:\Users\anait\OneDrive\Desktop\fegurd-backend\.env`

**Actualiza estos valores:**

```env
# MongoDB (elegir UNO)
# Opción local:
MONGODB_URI=mongodb://localhost:27017/fegurd-spa

# Opción Atlas:
MONGODB_URI=mongodb+srv://USUARIO:CONTRASEÑA@cluster.mongodb.net/fegurd-spa

# Twilio (de tu cuenta)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_token_aqui
TWILIO_WHATSAPP_NUMBER=+1234567890

# No cambiar
FEGURD_WHATSAPP=+573127072996
FEGURD_EMAIL=pagosyreservas@fegurdspa.com
```

### 4️⃣ Iniciar el servidor

Abre PowerShell (en la carpeta del backend):

```powershell
# Establecer ruta de Node.js
$env:Path = "C:\nodejs\node-v18.19.0-win-x64;" + $env:Path

# Iniciar en modo desarrollo
npm run dev
```

**Deberías ver:**
```
🚀 Servidor corriendo en http://localhost:5000
✅ MongoDB conectado correctamente
📱 WhatsApp integrado con Twilio
```

### 5️⃣ Probar el backend

Abre otra PowerShell:

```powershell
# Verificar que está corriendo
$env:Path = "C:\nodejs\node-v18.19.0-win-x64;" + $env:Path
curl http://localhost:5000/api/health
```

Deberías ver:
```json
{
  "status": "✅ Servidor corriendo",
  "mongodb": "✅ Conectado",
  "twilio": "✅ Configurado"
}
```

### 6️⃣ Abrir la página en el navegador

- Abre: `file:///c:/Users/anait/OneDrive/Desktop/fegurd-page/prototype.html`
- O local: `http://localhost:8000` (si tienes un servidor local)
- **Prueba hacer una reserva** - Deberás recibir un WhatsApp de confirmación

---

## 🧪 Enviar Reserva de Prueba

```powershell
# PowerShell
$env:Path = "C:\nodejs\node-v18.19.0-win-x64;" + $env:Path

$body = @{
    nombre = "Tu Nombre"
    telefono = "+573127072996"
    email = "tu@email.com"
    servicio = "Masaje Relajante"
    fecha = "2026-04-15"
    hora = "10:00 AM"
    notas = "Test"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/reservas" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

---

## 📁 Estructura Created

```
fegurd-backend/
├── src/
│   ├── models/Reserva.js           ←  Esquema MongoDB
│   ├── controllers/reservasController.js  ← Lógica
│   ├── routes/reservas.js          ← Endpoints
│   └── services/whatsappService.js ← Twilio
├── .env                            ← EDITAR AQUÍ
├── .env.example                    ← Referencia
├── package.json                    ← Dependencias instaladas ✓
├── server.js                       ← Servidor principal
├── README.md                       ← Documentación
├── SETUP.md                        ← Setup guide
└── install-dependencies.bat        ← Script instalación
```

---

## 🔗 Links útiles

- **Node.js**: https://nodejs.org
- **MongoDB Local**: https://www.mongodb.com/try/download/community
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Twilio**: https://www.twilio.com
- **Documentación API**: Abre `README.md` en la carpeta del backend

---

## ⚠️ IMPORTANTE

1. **No hagas push del `.env` a GitHub**
   - Contiene credenciales privadas
   - Ya está en `.gitignore`

2. **Mantén `MONGODB_URI` seguro**
   - Nunca compartas en públicodebian

3. **Las credenciales de Twilio son privadas**
   - Si las compartes, una persona puede robar $$$

---

## 🆘 Si algo no funciona

**Error: "npm: command not found"**
```powershell
# Establecer Path nuevamente
$env:Path = "C:\nodejs\node-v18.19.0-win-x64;" + $env:Path
npm --version
```

**Error: "Cannot connect to MongoDB"**
- Verifica que MongoDB esté corriendo (`mongod`)
- O verifica la connection string en `.env`

**Error: "Twilio credentials invalid"**
- Verifica que los datos NO tengan comillas en `.env`
- Revisa Account SID y Auth Token en Twilio Dashboard

---

## 📞 Contacto

Si necesitas ayuda:
- **Email**: pagosyreservas@fegurdspa.com
- **WhatsApp**: +573127072996

---

**¡Listo para hacer reservas! 🎉**
