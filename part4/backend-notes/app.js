const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const noteRouter = require('./controllers/notes')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

mongoose.set('strictQuery', false)

logger.info('Connecting to the MongoDB...', config.MONGODB_URI)

mongoose.connect(config.PORT)
  .then(() => {
    logger.info('Connected to MongoDB!')
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', noteRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
