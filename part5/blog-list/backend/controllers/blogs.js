const blogRouter = require('express').Router()

const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogRouter.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body

  const user = req.user

  const blog = new Blog({
    title,
    author,
    user: user._id,
    url,
    likes: likes || 0
  })

  if (!user) {
    return res.status(401).json({ error: 'Cannot post new blog' })
  }

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  const updatedNewBlog = await Blog
    .findById(newBlog._id)
    .populate('user', { username: 1, name: 1 })

  res.status(201).json(updatedNewBlog)
})

blogRouter.delete('/:id', userExtractor, async (req, res) => {

  const user = req.user

  const blog = await Blog.findById(req.params.id)

  if (!user || blog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'Cannot delete blog' })
  }

  await Blog.findByIdAndRemove(req.params.id)

  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  const updatedBlog = {
    user: blog.user._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: req.body.likes,
    id: blog._id
  }

  await Blog.findByIdAndUpdate(req.params.id, updatedBlog)

  res.status(200).json(updatedBlog)
})

module.exports = blogRouter
