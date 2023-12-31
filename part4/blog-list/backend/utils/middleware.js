const jwt = require('jsonwebtoken')

const User = require('../models/user')

const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ','')
  }

  return null
}
const tokenExtractor = (req, res, next) => {
  req.token = getTokenFrom(req)
  next()
}

const userExtractor = async (req, res, next) => {
  const token = getTokenFrom(req)

  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    req.user = await User.findById(decodedToken.id)
  }

  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: 'Unknown endpoint'
  })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}
