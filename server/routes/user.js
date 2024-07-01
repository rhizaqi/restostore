const express = require('express')
const UserController = require('../controllers/user-Controller')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.loginGoogle)

module.exports = router