const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const compression = require('compression');
const helmet = require('helmet')

// Setting
app.set('port', process.env.PORT || 3000); // Set Port
app.set('views',path.join(__dirname,'views')); // Set path View
app.set('view engine', 'ejs'); // Set View


// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(compression());
app.use(helmet());

// db
const dbConnect = require('./db');

// Routes
app.use(require('./routes/routs'));

// Server
app.listen(app.get('port'), () => {
    console.log(`Server run on port`, app.get('port'));
});

