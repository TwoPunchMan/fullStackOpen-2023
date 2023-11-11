const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('express-async-errors')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

mongoose.set('strictQuery', false)

logger.info('Connecting to the MongoDB...')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to the MongoDB!')
  })
  .catch(error => {
    logger.error('Error connecting to the MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
