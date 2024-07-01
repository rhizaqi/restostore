const { Menu, Order } = require('../models/')

class MenuController{
    static async getMenu (req, res, next){
        try {
            let data = await Menu.findAll()

            // console.log(data);
            res.status(200).json(data)
            next()
        } catch (error) {
            next(error)
        }
    }
   
    static async menuById (req, res, next){
        try {
            const {id} = req.params
            let data = await Menu.findByPk(id)

            // console.log(data);
            res.status(200).json(data)
            next()
        } catch (error) {
            next(error)
        }
    }

    static async addMenu(req, res, next){
        try {
            const {name, price, description, imgUrl} = req.body

            let add = await Menu.create({
                name, price, description, imgUrl
            })

            res.status(201).json(add)
            
            next()
        } catch (error) {
            next(error)
        }
    }

    static async editMenu(req, res, next){
        try {

            const {id} = req.params

            const {name, price, description, imgUrl} = req.body

            // findbyPk(id)

            await Menu.update({
                name, price, description, imgUrl
            },{ where: {
                id
            }})

            let edited = await Menu.findByPk(id)

            res.status(201).json(edited)
            
            next()
        } catch (error) {
            next(error)
        }
    }

    static async deleteMenu(req, res, next){
        try {
            const {id} = req.params

            let deleted = await Menu.findByPk(id)

            await Menu.destroy({
                where: {
                    id
                }
            })

            res.status(201).json({
                message: `${deleted.name} has been deleted`
            })

            next()
        } catch (error) {
            next(error)
        }
    }

    static async addOrder(req, res, next){
        try {
            const {id} = req.params
            
            let data = await Menu.findByPk(id, {include:Order})

            await Order.create({
                menuId:id,
                userId:req.user.id,
                statusOrder: false,
                statusPayment: false
            })

            res.status(201).json(data)

        } catch (error) {
            next(error)
        }
    }

}

module.exports = MenuController