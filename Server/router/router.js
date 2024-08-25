const express = require('express')
const router = express.Router()
const register =require('../controller/register')
const {loginVal,regVal} = require('../zodschema/user')
const validate = require('../middleware/validate')
const jwtAuth = require('../middleware/jwtauth')
const loginUser = require('../controller/login')
const checkAuth = require('../controller/checkAuth')
const multer  = require('multer')
const upload = require('../middleware/multerSetting')
const updateProfile = require('../controller/updateProfile')

router.post('/register',validate(regVal),register)
router.post('/loginuser',validate(loginVal),loginUser)
router.get('/checkauth',jwtAuth,checkAuth)
router.post('/profileupdate',upload.single('photo'),updateProfile)

module.exports = router;