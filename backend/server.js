const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const erorrHandler = require('./middlewares/error')
const colors = require('colors')
const userRouter = require('./routes/user')
const clubRouter = require('./routes/club')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config({path: './config/config.env'})

const app = express()

connectDB()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/club', clubRouter)

app.use(erorrHandler)

app.listen(process.env.PORT, () => {
   console.log((`Server listening on port ${process.env.PORT}`).yellow.bold)
})

process.on('unhandledRejection', (err, promise) => {
   console.log((`Error: ${err}`).red)
})

