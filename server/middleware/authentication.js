const { verifyToken } = require("../helpers/jwt");
const { User } = require('../models/')

const authentication = async (req, res, next) =>{
    try {
        const {authorization} = req.headers

        if(!authorization){
            throw {name: "Unauthorized"}
        }

        const token = authorization.split(" ")[1]
        const checkToken = verifyToken(token)

         if(!checkToken){
            throw{name:"InvalidToken"}
        }

        let id = checkToken.id

        let user = await User.findByPk(id)

        if(!user){
            throw {name:"Unauthorized"}
        }

        req.user = {
            id: checkToken.id,
            role: checkToken.role
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication
