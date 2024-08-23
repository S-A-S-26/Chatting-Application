const z = require('zod')

const userValidation = z
.object({
    username:z
    .string({message:"password required"})
    .min(3,{message:"minimum 3 characters required for username"})
    .max(20,{message:"minimum 3 characters required for username"})
    .trim(),
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

module.exports = userValidation