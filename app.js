const express = require('express')
const app = express()
const port = 80
const host = 'beprocerage.herokuapp.com'
const dessertRouter = require('./routes/dessert')
const expertiseRouter = require('./routes/expertise')
const certificationRouter = require('./routes/certification')
const assesorRouter = require('./routes/assesor')
const privilegeRouter = require('./routes/privilege')
const contactRouter = require('./routes/contact')
const socialmediaRouter = require('./routes/socialmedia')
const blogRouter = require('./routes/blog')
const testimonialRouter = require('./routes/testimonial')
const photoRouter = require('./routes/photo')
const profileRouter = require('./routes/profile')
const clientRouter = require('./routes/client')
const meaRouter = require('./routes/mea')
const fieldRouter = require('./routes/field')
const categoryRouter = require('./routes/category')
const competencyunitRouter = require('./routes/competencyunit')
const inboxRouter = require('./routes/inbox')
const authRouter = require('./routes/auth')
const path = require('path')
const cors = require('cors')


// const verifyFile = require('./middleware/verifyFile')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// app.use(cors({ origin: ['http://103.148.113.86:8080'], }))
const corsOptions ={
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    origin:'https://procerage.herokuapp.com/', 
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//         res.setHeader('Access-Control-Allow-Origin', '*')
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//         res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//         res.setHeader('Access-Control-Allow-Credentials', true)

//         // res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//     // res.setHeader("Access-Control-Max-Age", 3600);
//     // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept, Authorization');
//     // res.setHeader("Access-Control-Allow-Credentials", "true");

//     next()
// })

app.use('/api/v1', dessertRouter)
app.use('/api/v1', [
    expertiseRouter, 
    certificationRouter, 
    assesorRouter, 
    privilegeRouter, 
    contactRouter, 
    socialmediaRouter, 
    blogRouter,
    testimonialRouter,
    photoRouter, 
    profileRouter, 
    clientRouter,
    meaRouter,
    fieldRouter,
    categoryRouter,
    competencyunitRouter,
    inboxRouter,
    authRouter 
])
app.use('/images', express.static(path.join(__dirname, 'images')))

app.listen(process.env.PORT || port, () => {
    console.log(`beprocerage listening at http://${host}:${port}`)
})