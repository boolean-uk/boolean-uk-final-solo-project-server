const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

const createToken = user =>{ 
    return jwt.sign({...user}, jwtSecret, {expiresIn : "2days"})
}

module.exports = createToken