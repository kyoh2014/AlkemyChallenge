const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/index');

const app = express();

// Connection to routes
app.use(morgan('dev', {}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: '*/*' }));
app.use(cors());
app.use('/api', router);

// Connection to routes that do not exist
app.use((req, res, next) => {res.status(404).json({ msg : "Error 404, No se ha encontrado la pagina" })});

module.exports = app;