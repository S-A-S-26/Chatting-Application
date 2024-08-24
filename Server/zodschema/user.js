const z = require('zod')

const loginVal = z
.object({
    phone:z
    .string({message:"password required"})
    .min(10,{message:"minimum 10 digits required for phone number"})
    .max(10,{message:"minimum 10 digits required for phone number"})
    .trim(),
    password:z
    .string({message:"password required"})
    .min(3,{message:"minimum 3 characters required for password"})
    .max(20,{message:"minimum 3 characters required for password"})
    .trim(),
})

const regVal =loginVal.extend({
    username:z
    .string({message:"password required"})
    .min(3,{message:"minimum 3 characters required for username"})
    .max(20,{message:"minimum 3 characters required for username"})
    .trim(),
})

module.exports = {loginVal,regVal}