const blogRouter = require('express').Router()

const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  if (!blog.title || !blog.url) {
    res.status(400).end()
  } else {
    const newBlog = await blog.save()
    res.status(201).json(newBlog)
  }
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
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
