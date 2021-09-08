const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let message

    const token = req.header('authorization')
    if (token == null || !token) {
        message = "Access Denied"
        console.log(message)
        return res.status(401).json({
            message: message
        })
    }

    try {
        // console.log(token)
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        // verified
        // console.log(verified._id)
        req.user = verified
        // console.log(req.user)
        next()
    } catch (error) {
        res.status(400).json({
            message: "Invalid Token"
        })
        console.log(`error: ${error}`)
        // console.log(`message: Invalid Token`)
    }
}