const express = require('express')
const { login } = require('./controller')

const router = express.Router()

const { signup } = require('./controller')

router.post("/signup", signup)

router.post("/login", login)

module.exports = router