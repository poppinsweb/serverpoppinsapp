const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore= require('connect-mongo');
const cors = require('cors');
const dotenv = require('dotenv');
const XLSL = require('xlsx');

dotenv.config();
const app = express();
const port = 5000;

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
    cookie: { 
        maxAge: 1000 * 60 * 60 *24 *7 // 1 semana
     } 
}));

// Rutas
const evaluationRouter = require('./routes/evaluation.routes.js');
app.use('/api', evaluationRouter);

const usersRouter  = require('./routes/users.routes.js');
app.use('/api', usersRouter);

const childrenRouter = require('./routes/children.routes.js');
app.use('/api', childrenRouter);

const completeEvaluationRouter = require('./routes/completeEvaluation.routes.js');
app.use('/api', completeEvaluationRouter);

const evaluationTokenRouter = require('./routes/evaluationTokens.routes.js');
app.use('/api', evaluationTokenRouter);

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
