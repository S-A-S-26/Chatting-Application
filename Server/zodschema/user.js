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

const statusVal =z.object({
    status:z
    .string()
    .max(120,{message:"minimum 3 characters required for status"})
    .trim()
    .optional(),
    _id:z
    .string()
})

const userNameVal =z.object({
    username:z
    .string({message:"password required"})
    .min(3,{message:"minimum 3 characters required for username"})
    .max(20,{message:"minimum 3 characters required for username"})
    .trim(),
    _id:z
    .string()
})

module.exports = {loginVal,regVal,userNameVal,statusVal}