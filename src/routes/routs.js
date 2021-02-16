const express = require('express');
const router = express.Router();
const cors = require('cors');

const controller = require('../controllers/controller');

var corsOptions = {
    origin: ['http://localhost:4200', process.env.CORS],
}

// Metodos GET
router.get('/api/users', cors(corsOptions), (req,res) => {
    controller.getAll(req, res);
});

router.get('/api/user/:username', cors(corsOptions), (req,res) => {
    controller.getOneUser(req,res);
});

router.get('/api/getebooks', cors(corsOptions), (req,res) => {
    controller.getEbook(req,res);
});

router.get('/api/ebookId/:id', cors(corsOptions), (req,res) =>{
    controller.getOneEbook(req,res)
});

router.get('/api/getpdf/:username/:id', cors(corsOptions), (req,res) =>{
    controller.getPdf(req,res)
});

router.get('/api/getMyEbook/:username', cors(corsOptions), (req,res) =>{
    controller.getMyEbook(req,res)
});

//Metodos POST
router.post('/api/saveuser',cors(corsOptions), (req,res) =>{
    controller.saveUser(req,res);
});

router.post('/api/loginuser', cors(corsOptions), (req,res) =>{
    controller.loginUser(req,res);
});

router.post('/api/ebooks', cors(corsOptions), (req,res) =>{
    controller.uploadEbook(req,res);
});

router.post('/api/uploadpdf', cors(corsOptions), (req,res) => {
    controller.uploadPdf(req,res);
});


//Metodos PUT
router.put('/api/verifedEmail/:username', cors(corsOptions), (req,res) =>{
    controller.verifedEmail(req,res);
})

module.exports = router;