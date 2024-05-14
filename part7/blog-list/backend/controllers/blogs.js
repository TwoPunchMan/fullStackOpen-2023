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

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0
  })

  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'Cannot post new blog' })
  }

  blog.user = user._id

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  const updatedNewBlog = await Blog
    .findById(newBlog._id)
    .populate('user')

  res.status(201).json(updatedNewBlog)
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = await Blog.findById(req.params.id)

  const updateBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: body.likes,
    id: req.params.id
  }

  let updatedBlog = await Blog
    .findByIdAndUpdate(req.params.id, updateBlog, { new: true })
  updatedBlog = await Blog.findById(updatedBlog._id).populate('user')

  res.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', userExtractor, async (req, res) => {
  const blogId = req.params.id
  const loginUser = req.user

  const blog = await Blog.findById(blogId)

  if (!blog || blog.user.toString() !== loginUser._id.toString()) {
    return res.status(401).json({ error: 'Cannot delete blog' })
  }

  await Blog.findByIdAndRemove(blogId)

  res.status(204).end()
})

module.exports = blogRouter
