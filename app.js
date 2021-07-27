const express = require('express')
const app = express()
const port = 3000
const host = '103.14.20.210'
const productRouter = require('./routes/product')
const customerRouter = require('./routes/customer')
const dessertRouter = require('./routes/dessert')
const authRouter = require('./routes/auth')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/api/v1', productRouter)
app.use('/api/v1', customerRouter)
app.use('/api/v1', dessertRouter)
app.use('/api/v1', authRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`)
})