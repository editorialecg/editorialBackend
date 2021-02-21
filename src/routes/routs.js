const express = require('express');
const router = express.Router();
const cors = require('cors');

const controller = require('../controllers/controller');

var corsOptions = {
    origin: ['http://localhost:4200', process.env.CORS],
}

// Metodos GET
router.get('/api/users', cors(corsOptions), (req,res) => {
    controller.controller.getAll(req, res);
});

router.get('/api/user/:username', cors(corsOptions), (req,res) => {
    controller.controller.getOneUser(req,res);
});

router.get('/api/getebooks', cors(corsOptions), (req,res) => {
    controller.controller.getEbook(req,res);
});

router.get('/api/ebookId/:id', cors(corsOptions), (req,res) =>{
    controller.controller.getOneEbook(req,res)
});

router.get('/api/viewPdf', cors(corsOptions), (req,res) =>{
    controller.controller.viewPdf(req,res)
});

router.get('/api/getpdf/:username/:id', cors(corsOptions), (req,res) =>{
    controller.controller.getPdf(req,res)
});

router.get('/api/getMyEbook/:username', cors(corsOptions), (req,res) =>{
    controller.controller.getMyEbook(req,res)
});

//Metodos POST
router.post('/api/saveuser',cors(corsOptions), (req,res) =>{
    controller.controller.saveUser(req,res);
});

router.post('/api/loginuser', cors(corsOptions), (req,res) =>{
    controller.controller.loginUser(req,res);
});

router.post('/api/ebooks', cors(corsOptions), (req,res) =>{
    controller.controller.uploadEbook(req,res);
});

router.post('/api/uploadpdf', cors(corsOptions), (req,res) => {
    controller.controller.uploadPdf(req,res);
});


//Metodos PUT
router.put('/api/verifedEmail/:username', cors(corsOptions), (req,res) =>{
    controller.controller.verifedEmail(req,res);
});

router.put('/api/ebookpay/:user/:front/:pdf', cors(corsOptions), (req,res) => {
    controller.controller.ebookPay(req,res)
});

module.exports = router;