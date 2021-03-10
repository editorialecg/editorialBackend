const express = require('express')
const router = express.Router()
const cors = require('cors')

const controller = require('./controller')

const corsOptions = {
    origin: [process.env.CORS,process.env.CORS2]
}

// GET
router.get('/allebookfront', cors(corsOptions), (req, res) => {
    controller.getAllEbook(req,res)
})

router.get('/oneebook/:id', cors(corsOptions), (req,res) =>{
    controller.getOneEbook(req,res)
})

router.get('/myebook/:username', cors(corsOptions), (req,res) =>{
    controller.getMyEbook(req,res)
})

router.get('/viewmypdf/:username/:id', cors(corsOptions), (req,res) =>{
    controller.getPdf(req,res)
})

// POST
router.post('/createebookfront', cors(corsOptions), (req,res) =>{
    controller.uploadEbookFront(req,res)
})

router.post('/createebookpdf', cors(corsOptions), (req,res) =>{
    controller.uploadPdf(req,res)
})

// PUT
router.put('/ebookpayed/:username/:front/:idpdf', cors(corsOptions), (req,res) =>{
    controller.ebookPay(req,res)
})

module.exports = router