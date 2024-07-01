const {hashSync, compareSync} = require('bcryptjs')

const hashPw = (password)=>{
    return hashSync(password, 8)
}

const comparePw = (password, hash)=>{
    return compareSync(password, hash)
}

module.exports = {
    hashPw, comparePw
}