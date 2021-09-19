const express = require('express')
const app = express()
const port = 3000
const host = 'localhost'
const productRouter = require('./routes/product')
const customerRouter = require('./routes/customer')
const dessertRouter = require('./routes/dessert')
const expertiseRouter = require('./routes/expertise')
const certificationRouter = require('./routes/certification')
const authRouter = require('./routes/auth')
const path = require('path')
const cors = require('cors')


// const verifyFile = require('./middleware/verifyFile')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// app.use(cors({ origin: ['http://localhost:8080'], }))
const corsOptions ={
    origin:'http://localhost:8080', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*')
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    //     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    //     res.setHeader('Access-Control-Allow-Credentials', true)

    //     // res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//     // res.setHeader("Access-Control-Max-Age", 3600);
//     // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept, Authorization');
//     // res.setHeader("Access-Control-Allow-Credentials", "true");

//     next()
// })

app.use('/api/v1', productRouter)
app.use('/api/v1', customerRouter)
app.use('/api/v1', dessertRouter)
app.use('/api/v1', expertiseRouter)
app.use('/api/v1', certificationRouter)
app.use('/api/v1', authRouter)
app.use('/images', express.static(path.join(__dirname, 'images')))

app.listen(port, () => {
    console.log(`beprocerage listening at http://${host}:${port}`)
})