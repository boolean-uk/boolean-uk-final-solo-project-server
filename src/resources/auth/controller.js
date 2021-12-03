const prisma = require('../..//utils/dbClient')
const bycript = require('bcrypt')
const createToken = require('../../utils/authentification');
const crypto = require('crypto')

const rounds = 9;

async function signup(req, res){ 

    const { email: userEmail, password : userPassword } = req.body
    
    const hashedPass = await bycript.hash(userPassword, rounds)

    const random_uname = crypto.randomBytes(15).toString('hex');
    
    console.log({userEmail, userPassword, hashedPass, random_uname})

    try {

        const user = await prisma.user.create({
            data: { 
                email : userEmail,
                password : hashedPass,
                username : random_uname
            }
        })

        const token = createToken(user)
        
        console.log({token})
        res.status(200).json({token})
    } catch (error) {
    
        console.error({error})

        res.status(500).json({})
    }

}

module.exports = {signup}