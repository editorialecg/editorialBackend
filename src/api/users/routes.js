const express = require('express')
const controller = require('./controller')
const cors = require('cors')

const router = express.Router()

const corsOptions = {
    origin: [process.env.CORS,process.env.CORS2]
}

// GET
router.get('/oneuser/:username', cors(corsOptions), (req, res) => {
    controller.getOneUser(req, res)
})

router.get('/configuser/:username', cors(corsOptions), (req,res) =>{
    controller.configUser(req,res)
})

// POST 
router.post('/loginuser', cors(corsOptions), (req, res) => {
    controller.loginUser(req, res)
})

router.post('/createuser', cors(corsOptions), (req, res) => {
    controller.createUser(req, res)
})

router.post('/confirmemail/:username', cors(corsOptions), (req,res) =>{
    controller.confirmEmail(req,res)
})

router.post('/confirmpassword/:username', cors(corsOptions), (req,res) =>{
    controller.confirmPassword(req,res)
})

router.post('/confirmuser', cors(corsOptions), (req,res) =>{
    controller.confirmUser(req,res)
})


// PUT
router.put('/changepassword/:username', cors(corsOptions), (req,res) =>{
    controller.changePassword(req,res)
})

router.put('/updateuser/:username', cors(corsOptions), (req,res) =>{
    controller.updateUser(req,res)
})

module.exports = router