const mongoose = require('mongoose')
const supertest = require('supertest')

const User = require('../models/user')

const app = require('../app')

const api = supertest(app)

beforeMany(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.close()
})
