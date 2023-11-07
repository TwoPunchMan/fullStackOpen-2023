const mongoose = require('mongoose')
const supertest = require('supertest')

const blogListHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const app = require('../app')
const { constant } = require('lodash')

const api = supertest(app)

let authorization

describe('blogs api', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    // test user
    const user = blogListHelper.users[0]
    await api.post('/api/users').send(user)
    const res = await api.post('/api/login').send(user)
    authorization = `Bearer ${res.body.token}`

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

  test('unique identifier for a blog is named \'id\'', async () => {
    const res = await api.get('/api/blogs')
    const firstBlog = res.body[0]
    expect(firstBlog.id).toBeDefined()
  })

  test('POSTing a new blog increases the total blogs by 1', async () => {
    const newBlog = {
      title: 'This is a test',
      author: 'Testy McTesterson',
      url: 'http://stopdrugtesting.org',
      likes: 2023
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authorization)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogListHelper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(blogListHelper.blogs.length + 1)

    const testBlogContent = blogsAtEnd.map(blog => blog.title)
    expect(testBlogContent).toContain('This is a test')
  })

  test('if there are no likes, set likes to 0', async () => {
    const noLikesBlog = {
      title: 'Facebook is evil and should be destroyed',
      author: 'Meditated MF Doom',
      url: 'http://talesofphantasia.dev'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authorization)
      .send(noLikesBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogListHelper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(blogListHelper.blogs.length + 1)
  })

  test('if title/url missing, status 400', async () => {
    const noTitleBlog = {
      author: 'Blankenfield blankenship',
      likes: 987
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authorization)
      .send(noTitleBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('deleting a blog with id', async () => {
    const blogsAtStart = await blogListHelper.blogsInDB()
    const deletedBlog = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${deletedBlog.id}`)
      .set('Authorization', authorization)
      .expect(204)

    const blogsLeft = await blogListHelper.blogsInDB()
    console.log('blogsleft', blogsLeft)

    expect(blogsLeft).toHaveLength(blogListHelper.blogs.length - 1)

    const titles = blogsLeft.map(blog => blog.title)
    expect(titles).not.toContain(deletedBlog.title)
  })

  test('updating a blog for amount of likes', async () => {

    const blogsAtStart = await blogListHelper.blogsInDB()
    const blogForUpdate = blogsAtStart[1]

    const updatedBlog = {
      ...blogForUpdate,
      likes: 777
    }

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogListHelper.blogsInDB()
    expect(blogsAtEnd[1].likes).toBe(777)
  })

  test('no token provided when adding new blog', async () => {
    const newBlog = {
      title: 'Token Black lives matter',
      author: 'Wendy Testaburger',
      url: 'http://checkataco.com',
      likes: 2023
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
