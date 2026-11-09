const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = 'clave_secreta_laboratorio_2024';

// 1. Endpoint público: Generación de token JWT
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'Segura123!') {
    const token = jwt.sign(
      { user: username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ message: 'Autenticación exitosa', token });
  }

  return res.status(401).json({ error: 'Credenciales inválidas' });
});

// Middleware de validación de token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso denegado: falta cabecera Authorization' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(400).json({ error: 'Formato inválido. Uso: Bearer <token>' });
  }

  jwt.verify(parts[1], JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    req.user = decoded;
    next();
  });
}

// 2. Endpoint sensible protegido 1: Administración
app.get('/api/admin', verifyToken, (req, res) => {
  res.json({
    status: 'success',
    mensaje: 'Acceso concedido a zona protegida de administración',
    usuario: req.user
  });
});

// 3. Endpoint sensible protegido 2: Reportes confidenciales 
app.get('/api/reportes', verifyToken, (req, res) => {
  res.json({
    status: 'success',
    mensaje: 'Acceso concedido a reportes sensibles de auditoría',
    usuario: req.user
  });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API en ejecución en http://localhost:${PORT}`);
});
