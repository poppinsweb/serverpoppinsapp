const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
const evaluationRouter = require('./routes/evaluation.routes.js');
app.use('/api', evaluationRouter);

const categoriesRouter = require('./routes/categories.routes.js');
app.use('/api', categoriesRouter);

const usersRouter  = require('./routes/users.routes.js');
app.use('/api', usersRouter);

const childrenRouter = require('./routes/children.routes.js');
app.use('/api', childrenRouter);

// *******************************************************************
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
// Inicia el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
