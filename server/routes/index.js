const express = require('express')
const router = express.Router()
const routerUser = require('./user')
const routerMenu = require('./menu')
const routerOrder = require('./order')

router.use('/user', routerUser)
router.use('/menu', routerMenu)
router.use('/order', routerOrder)


module.exports = router

//routes plural