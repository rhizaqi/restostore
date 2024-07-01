const { comparePw } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const {User} = require('../models/')
const {OAuth2Client} = require(`google-auth-library`)

class UserController{
    static async register(req, res, next){
        try {
            const {fullname, email, password, address} = req.body

            let reg = await User.create({
                fullname, email, password, address, role:"Customer"
            })

            res.status(201).json({
                fullname: reg.fullname,
                email: reg.email,
                address: reg.address
            })
            
            // console.log(`Ini halaman register`);
            next()
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    
    static async login(req, res, next){
        try {
            const {email, password} = req.body

            if(!email || !password){
                throw {name:"BadRequest"}
            }

            const user = await User.findOne({
                where: {
                    email:email
                }
            })

            if(!user){
                throw {name: "UserNotFound"}
            }

            const checkUser = comparePw(password, user.password)

            if(!checkUser){
                throw {name:"Unauthorized"}
            }

            let access_token = createToken({
                id: user.id,
                role: user.role
            })

            res.status(200).json({access_token})

        } catch (error) {
          next(error)
        }
    }

    static async loginGoogle(req, res, next){

        console.log('masuk server');
        const token = req.headers['google-token']
        const client = new OAuth2Client()

        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.ID_google
            })

            const payload = ticket.getPayload()
            const email = payload.email
            let data = await User.findOne({
                where: {
                    email
                }
            })

            if(!data){
                data = await User.create({
                    fullname:payload.name, email, password: String(Math.random()), imgUrl:`-`, description: `-`, address: `-`, role: `Customer`
                })
            }

            let access_token = createToken({
                id:data.id
            })

            console.log(access_token);
            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController