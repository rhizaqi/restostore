const express = require('express')
const MenuController = require('../controllers/menu-Controller')
const router = express.Router()
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.get('/listMenu', authentication, authorization, MenuController.getMenu)
router.post('/add', authentication, authorization, MenuController.addMenu)
router.get('/listMenu/:id', authentication, authorization, MenuController.menuById)
router.put('/edit/:id', authentication, authorization, MenuController.editMenu)
router.delete('/delete/:id', authentication, authorization, MenuController.deleteMenu)
router.post('/addOrder/:id', authentication, authorization, MenuController.addOrder)

module.exports = router

//menu
//