require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8000', 'http://127.0.0.1:5000', '*'],
  credentials: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error conectando MongoDB:', error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/reservas', require('./src/routes/reservas'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ Servidor corriendo',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? '✅ Conectado' : '❌ Desconectado',
    twilio: process.env.TWILIO_ACCOUNT_SID ? '✅ Configurado' : '❌ Sin configurar'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    mensaje: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error desconocido'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📱 WhatsApp integrado con Twilio`);
});
