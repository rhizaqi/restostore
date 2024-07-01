const express = require('express')
const OrderController = require('../controllers/order-Controller')
const PurchaseController = require('../controllers/purchase-controller')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.get('/listOrder', OrderController.getOrder)
router.get('/:menuId/payment/midtrans/initiate', authentication, PurchaseController.initiateMidtrans)
router.patch('/payment/success', PurchaseController.donePurchase)

module.exports = router