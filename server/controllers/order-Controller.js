const { Order, Menu } = require('../models/')


class OrderController{
    static async getOrder(req, res, next){
        try {
            
            let data = await Order.findAll({include:Menu})

            console.log(data);
            res.status(200).json(data)
            next()
        } catch (error) {
            next(error)
        }
    }
    
    
}

module.exports = OrderController