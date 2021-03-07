const express = require('express')
const router = express.Router()

const users = require('../api/users/routes')
const ebooks = require('../api/ebooks/routes')


router.use('/user', users);

router.use('/ebook', ebooks)


module.exports = router;