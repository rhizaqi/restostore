const express = require('express')
const app = express()

const errorHandler = (err, req, res, next) => {
    
    console.log(err.name);
    switch (err.name) {
        case "BadRequest":
            res.status(400).json({
                message:"Please insert your email/password"
            })
            break;

        case "Unauthorized":
            res.status(400).json({
                message:"Invalid email/password"
            })
            break;

        case "UserNotFound":
            res.status(400).json({
                message:"Please register first"
            })
            break;
    
        default:
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error"
            })
            break;
    }
}

module.exports = errorHandler