const { User } = require('../models/')

const authorization = async (req, res, next) => {
    try {
        console.log(req.user, `<<<<<`);
        const {id} = req.user

        let user = await User.findByPk(id)

        if(!user){
            throw {name:"Unauthorized"}
        }

        // kondisi admin dan customer

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authorization