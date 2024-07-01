const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY

const createToken = (payload) =>{
    return jwt.sign(payload, secret)
}

const verifyToken = (token) =>{
    return jwt.verify(token, secret)
}

module.exports = {
    createToken, verifyToken
}