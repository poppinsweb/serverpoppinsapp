const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importar el paquete cors
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// URL de conexión a MongoDB Atlas desde variables de entorno
const dbUri = process.env.DB_URI;

// Conectar a MongoDB Atlas
mongoose.connect(dbUri, {
   
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

// Rutas
const evaluationRouter = require('./routes/evaluation');
app.use('/evaluation', evaluationRouter);

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
