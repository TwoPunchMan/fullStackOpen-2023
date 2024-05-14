const mongoose = require('mongoose')
const supertest = require('supertest')

const User = require('../models/user')

const app = require('../app')

const api = supertest(app)

describe('test for one user in dB', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('create user with bad password', async () => {
    const newUser = {
      username: 'princessZelda',
      password: 'ze',
      name: 'link'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password needs to be at least 3 or more characters')
  })

  test('create user with no username', async () => {
    const newUser = {
      password: 'dogcoin',
      name: 'bender rodriguez'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
