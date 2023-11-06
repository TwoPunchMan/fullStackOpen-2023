const jwt = require('jsonwebtoken')

const blogRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

const { tokenExtractor } = require('../utils/middleware')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogRouter.post('/', tokenExtractor, async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0
  })

  if (!blog.title || !blog.url) {
    res.status(400).end()
  } else {
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    res.status(201).json(newBlog)
  }
})

blogRouter.delete('/:id', tokenExtractor, async (req, res) => {

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id || !decodedToken) {
    return res.status(400).json({ error: 'Invalid token or user' })
  }

  const userid = decodedToken.id
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() === userid.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  }
})

blogRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: req.body.likes
  }

  await Blog.findByIdAndUpdate(req.params.id, updatedBlog)
  res.status(200).json(updatedBlog)
})

module.exports = blogRouter
