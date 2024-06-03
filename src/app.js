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
const independenceRouter = require('./routes/independence.routes.js');
const skillsGroomingRouter = require('./routes/skillsGrooming.routes.js');
const skillsDressingRouter = require('./routes/skillsDressing.routes.js');
const skillsFeedingRouter = require('./routes/skillsFeeding.routes.js');
const habitsFeedingRouter = require('./routes/habitsFeeding.routes.js');
const habitsSleepingRouter = require('./routes/habitsSleeping.routes.js');
const responsabilitiesRouter = require('./routes/responsabilities.routes.js');
const aditionalsRouter = require('./routes/aditionals.routes.js');

app.use('/evaluations', evaluationRouter);
app.use('/evaluations', independenceRouter);
app.use('/evaluations', skillsGroomingRouter);
app.use('/evaluations', skillsDressingRouter);
app.use('/evaluations', skillsFeedingRouter);
app.use('/evaluations', habitsFeedingRouter);
app.use('/evaluations', habitsSleepingRouter);
app.use('/evaluations', responsabilitiesRouter);
app.use('/evaluations', aditionalsRouter);

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
