require('../config/db')
const Users = require('../models/user')
const authValidation = require('../validations/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// register user
exports.registerUser = async (req, res) => {
    try {
        let message

        // validate request
        await authValidation.registerUser(req.body)

        // check email exist
        const user = await Users.findOne({ email: req.body.email })
        message = "Email already exist"
        if (user) {
            console.log(`error: ${message}`)
            return res.json({
                status: "error",
                message: message
            }).status(400)
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // register user
        const words = req.body.name.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        const name = words.join(" ");

        const dataUser = await Users.create({
            name: name,
            email: req.body.email.toLowerCase(),
            password: hashedPassword
        })
        message = `User ${dataUser.name} was created susccessfully`
        res.json({
            status: "success",
            message: message,
            data: dataUser
        }).status(201)
        console.log(message)
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error.message}`)
    }
}

// login user
exports.loginUser = async (req, res) => {
    try {
        let message

        // validate request
        await authValidation.loginUser(req.body)

        // check email exist
        const user = await Users.findOne({ email: req.body.email })
        message = "Email doesn't exist"
        if (!user) {
            console.log(`error: ${message}`)
            return res.json({
                status: "error",
                message: message
            }).status(400)
        }

        // validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        message = "Invalid password"
        if (!validPassword) {
            console.log(`error: ${message}`)
            return res.json({
                status: "error",
                message: message
            }).status(400)
        }

        // login success
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET)
        
        message = "Login success"
        res.header('authorization', token).json({
            status: "success",
            message: message,
            token: token,
            user: user
        }).status(200)
        // console.log(token)
    } catch (error) {
        res.json({
            status: "error",
            message: error.details[0].message
        }).status(400)
        console.log(`error: ${error}`)
    }
}