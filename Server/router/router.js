const express = require('express')
const router = express.Router()
const register = require('../controller/register')
const { loginVal, regVal, userNameVal, statusVal } = require('../zodschema/user')
const validate = require('../middleware/validate')
const jwtAuth = require('../middleware/jwtauth')
const loginUser = require('../controller/login')
const checkAuth = require('../controller/checkAuth')
const multer = require('multer')
const upload = require('../middleware/multerSetting')
const updateProfile = require('../controller/updateProfile')
const updateUserData = require('../controller/updateUserData')
const searchUser = require('../controller/searchUser')
const userChatProfiles = require('../controller/userChatProfiles')
const createChat = require('../controller/createChat')


router.post('/register', validate(regVal), register)
router.post('/loginuser', validate(loginVal), loginUser)
router.get('/checkauth', jwtAuth, checkAuth)
router.post('/profileupdate', upload.single('photo'), updateProfile)
router.patch('/updateusername', validate(userNameVal), jwtAuth, updateUserData.userNameUpdate)
router.patch('/updatestatus', jwtAuth, validate(statusVal), updateUserData.statusUpdate)
router.get('/searchuser', searchUser)
router.get('/userchatprofiles', userChatProfiles)
router.post('/sendmessage', createChat)

module.exports = router;
