const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')

const app = express()

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected!')
  })
  .catch(error => console.log(error.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
