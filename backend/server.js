
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;



// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS: permitir frontend publicado y desarrollo local
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Origen no permitido por CORS'));
  }
}));

// Procesamiento de solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100
});

app.use('/api/', limiter);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    application: 'ADEQUI',
    message: 'API funcionando correctamente'
  });
});

// API Routes
app.use('/api/solve', require('./routes/solveRoutes'));
app.use('/api/formulas', require('./routes/formulaRoutes'));
app.use('/api/branches', require('./routes/branchRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));
app.use('/api/periodic-table', require('./routes/periodicTableRoutes'));


 // Ruta del frontend
const frontendPath = path.join(__dirname, '../frontend');

// Servir archivos HTML, CSS, JS e imágenes
app.use(express.static(frontendPath));

// Mostrar ADEQUI al entrar a la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development'
      ? err.message
      : 'Internal server error'
  });
});

// Run server locally only
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`ADEQUI server running on port ${PORT}`);
  });
}

// Exportar Express para Vercel
module.exports = app;
