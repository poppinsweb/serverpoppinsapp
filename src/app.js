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

const usersRouter  = require('./routes/users.routes.js');
const childrenRouter = require('./routes/children.routes.js');

const childrenResponseRouter = require('./routes/childrenResponse.routes.js');

app.use('/api', evaluationRouter);
app.use('/api', independenceRouter);
app.use('/api', skillsGroomingRouter);
app.use('/api', skillsDressingRouter);
app.use('/api', skillsFeedingRouter);
app.use('/api', habitsFeedingRouter);
app.use('/api', habitsSleepingRouter);
app.use('/api', responsabilitiesRouter);
app.use('/api', aditionalsRouter);

app.use('/api', usersRouter);
app.use('/api', childrenRouter);

app.use('/api', childrenResponseRouter);

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
