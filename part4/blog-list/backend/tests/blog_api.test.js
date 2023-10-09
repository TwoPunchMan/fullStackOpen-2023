const mongoose = require('mongoose')
const supertest = require('supertest')

const blogListHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = blogListHelper.blogs
    .map(blog => new Blog(blog))

  const blogListArray = blogObjects.map(blog => blog.save())
  await Promise.all(blogListArray)
})

test('blogs are JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('GET all blogs', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(blogListHelper.blogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
