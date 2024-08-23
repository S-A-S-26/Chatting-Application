const validate = (zodSchema)=> async (req,res,next) => {
    try {
        const data = await zodSchema.parseAsync(req.body)
        req.body = data
        next()
    } catch (error) {
        console.log("zod error",error)
        return res.status(400).json({msg: error.errors[0].message})
    }
}

module.exports = validate