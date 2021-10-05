const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, () => {
    console.log('Connected to Database')
});
