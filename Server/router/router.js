const express = require('express')
const router = express.Router()
const register =require('../controller/register')
const userValidation = require('../zodschema/user')
const validate = require('../middleware/validate')

router.post('/register',validate(userValidation),register)

module.exports = router;