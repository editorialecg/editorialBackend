const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();


// Setting
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');


// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// db
const dbConnect = require('./db');

// Routes
app.use(require('./routes/routs'));

// Server
app.listen(app.get('port'), () => {
    console.log(`Server run on ${process.env.API_HOST} port`, app.get('port'));
});

