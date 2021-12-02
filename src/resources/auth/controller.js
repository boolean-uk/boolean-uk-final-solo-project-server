const prisma = require('../..//utils/dbClient')
const bycript = require('bcrypt')
const createToken = require('../../utils/authentification');
const crypto = require('crypto');

const rounds = 9;

async function signup(req, res){ 

    const { email: userEmail, password : userPassword } = req.body
    
    const hashedPass = await bycript.hash(userPassword, rounds)

    const random_uname = crypto.randomBytes(15).toString('hex');

    try {

        const user = await prisma.user.create({
            data: { 
                email : userEmail,
                password : hashedPass,
                username : random_uname
            }
        })

        const token = createToken(user)
        
        res.status(200).json({token})
    } catch (error) {
    
        console.error({error})

        res.status(500).json({})
    }

}

async function login(req, res) {

    const {email: inputEmail, password: inputPassword} = req.body

    if(!inputEmail || !inputPassword) { 
        res.status(400).json({ error: "Username or Password is missing\n Please verify the credentials have been added accordingly and try again!"})
    }
    
    try {
        
        const user = await prisma.user.findUnique({ 
            where : { 
                email : inputEmail
            }
        })
        
        if(!user){ 
            res.status(401).json({ error : "Authentification failed."})
        }
        
        const match = await bycript.compare( inputPassword, user.password)

        if (match) { 
            const userToTokenise = {  
                ...user
            }

            delete userToTokenise.password
            delete userToTokenise.username

            // userToTokenise.forEach((username, password) => {
            //     delete userToTokenise[username, password]
            // });

            const token = createToken(userToTokenise)

            res.status(201).json({token})
        } else { 
            res.status(401).json({ error : "Authentification failed."})
        }

    } catch (error) {
        
        console.error({error})

        res.status(500).json({ error: error.message })
    }
    
}

module.exports = {signup, login}