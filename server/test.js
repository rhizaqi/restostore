// const jwt = require('jsonwebtoken')
require('dotenv').config()
const { createToken } = require("./helpers/jwt");

// const payload = jwt.sign({name: "akuadadidalam"}, 'gimanasih')

// console.log(payload, `<<nih`);

// const check = jwt.verify(payload, 'gimanasih')

// console.log(check, `<<nih`);

const cobaBikin = createToken({
    id: 1,
    name: 'satu'
})

console.log(cobaBikin);