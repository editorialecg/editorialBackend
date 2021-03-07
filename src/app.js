const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const compression = require('compression');
const helmet = require('helmet')


// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
/* app.use(compression());
app.use(helmet());
 */
// db
const db = require('./loaders/db');

// Routes
app.use(require('./routes/routes'));


module.exports = app;


