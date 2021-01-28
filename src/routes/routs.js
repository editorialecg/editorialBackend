const express = require('express');
const router = express.Router();
const cors = require('cors');
const path = require('path');


const controller = require('../controllers/controller');

const multipart = require('connect-multiparty');  

const Path = path.join(__dirname,'UEbooks');


const multipartMiddleware = multipart({
    uploadDir: Path
});


var corsOptions = {
    origin: ['http://localhost:4200', process.env.CORS],
}

// Metodos GET
router.get('/api/users', (req,res) => {
    controller.getAll(req, res);
});

router.get('/api/:username', (req,res) => {
    controller.getOneUser(req,res);
});

//Metodos POST
router.post('/api/saveuser',cors(corsOptions), (req,res) =>{
    controller.saveUser(req,res);
});

router.post('/api/loginuser', cors(corsOptions), (req,res) =>{
    controller.loginUser(req,res);
});

router.post('/api/ebooks', multipartMiddleware , cors(corsOptions), (req,res) =>{
    controller.uploadEbook(req,res);
});

router.get('/api/getebooks', cors(corsOptions), (req,res) => {
    controller.getEbook(req,res);
});

module.exports = router;