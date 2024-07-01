const midtransClient = require('midtrans-client')
const { Menu, Order, User } = require('../models/')
const axios = require('axios')
const authorization = require('../middleware/authorization')

class PurchaseController{
    static async initiateMidtrans(req, res, next){
        try {

            const {menuId} = req.params
            const {id} = req.user

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.YOUR_SERVER_KEY
            });
        
            let menu = await Menu.findByPk(menuId)

            // const orderId = Math.random().toString()
            const amount = menu.price

            const user = await User.findByPk(id)

            //ini bikin order
            let data = await Menu.findByPk(menuId, {include:Order})

            let order = await Order.create({
                 menuId:menuId,
                 userId:req.user.id,
                 statusOrder: true,
                 statusPayment: false
             })

            let parameter = {
                //data detail order
                "transaction_details": {
                    "order_id": order.id,
                    "gross_amount": amount
                },
                //data jenis pembayaran
                "credit_card":{
                    "secure" : true
                },
                //data detail customer
                "customer_details": {
                    "fullname": user.fullname,
                    "email": user.email,
                    "address": user.address,
                    "role": user.role,
                }
            };
        
           const transaction = await snap.createTransaction(parameter)
           let transactionToken = transaction.token;
 
            res.status(200).json({
                message: "Order has been created",  transactionToken,
                idOrder: order.id
            })
        } catch (error) {
            next(error)
        }
    }

    static async donePurchase(req, res, next){
        try {
            const {orderId} = req.body

            console.log(orderId, 98789067585);

            const order = await Order.findByPk(orderId)

            await Order.update({
                statusPayment: true
            }, {where:{
                id:orderId
            }})

            res.json({
                message:"thanks for buying"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PurchaseController