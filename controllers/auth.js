require('../config/db')
const Users = require('../models/user')
const authValidation = require('../validations/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function getUser(userId) {
    return new Promise ((resolve, reject) => {
        const user = Users.findById(userId)
        if (user) {
            resolve(user)
        } else {
            reject('User Not Found')
        }
    })
}

exports.getUsername = async (userId) => {
    try {
        const user = await getUser(userId)
        return user.name
    } catch (error) {
        console.error(error)
    }
}

// find user
exports.getMyData = async (req, res) => {
    try {
        let message

        async function user(userId) {
            try {
                const user = await getUser(userId)
                return user
            } catch (error) {
                console.error(error)
            }
        }

        const dataUser = await user(req.user._id) 

        // const dataUser = await Users.findOne({ _id: req.user._id })

        // const username = await this.getUsername(req.user._id)

        message = `User ${dataUser.name} found`

        res.status(201).json({
            status: "succeess",
            message: message,
            user: dataUser
        })
        // console.log(message)

    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
} 

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
        message = `User ${dataUser.name} registered susccessfully`
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
        })
        console.log(`error: ${error.message}`)
    }
}

// update user
exports.updateUser = async (req, res) => {
    
    try {
        // console.log(req.body.password === undefined)
        // console.log(req.body)

        let message

        // check email exist
        const user = await Users.countDocuments({ email: req.body.email })
        message = "Email already exist"
        if (user > 1) {
            console.log(`error: ${message}`)
            return res.json({
                status: "error",
                message: message
            }).status(400)
        }

        const words = req.body.name.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        const name = words.join(" ");

        if (req.body.password === undefined) {
            // validate request
            await authValidation.updateUser(req.body)
            
            await Users.updateOne({ _id: req.params.userId }, {
                name: name,
                email: req.body.email,
            })
        } else {
            // validate request
            await authValidation.registerUser(req.body)

            // hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            
            await Users.updateOne({ _id: req.params.userId }, {
                name: name,
                email: req.body.email,
                password: hashedPassword
            })
        }

        const dataUser = await Users.findById(req.params.userId)

        message = `User ${dataUser.name} updated susccessfully`

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
        console.log(`error: ${error}`)
    }
}

// logout user
exports.logoutUser = async (req, res) => {
    try {
        let message

        message = "Signed out successfully"

        const user = await Users.findOne({_id:req.params.userId})

        res.json({
            status: "success",
            message: message,
        }).status(201)
        console.log(`${user.name} ${message}`)

    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}
 
// login user
exports.loginUser = async (req, res) => {
    try {
        let message

        // validate request
        const { error } = await authValidation.loginUser(req.body)

        // if(error) return res.status(400).send(error.details[0].message)
        if (error) {
            console.log(`error: ${error.details[0].message}`)
            return res.json({
                status: "error",
                message: error.details[0].message
            }).status(400)
        }

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
        const token = jwt.sign({
            _id : user._id
        }, process.env.TOKEN_SECRET)
        
        message = `Signed in successfully`
        res.header('authorization', token).json({
            status: "success",
            message: "Signed in successfully",
            token: token,
            user: user
        }).status(200)
        console.log(`${user.name} ${message}`)
    } catch (error) {
        res.json({
            status: "error",
            message: error.details[0].message
        }).status(400)
        console.log(`error: ${error}`)
    }
}