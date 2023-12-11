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
  console.log(user)
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
  console.log('upup', updatedNewBlog)
  res.status(201).json(updatedNewBlog)
})

blogRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  console.log('addlike', blog)
  console.log('reqbody', req.body)
  const updatedBlog = {
    user: blog.user._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: req.body.likes,
    id: blog._id
  }

  const updatedNewBlog = await Blog
    .findByIdAndUpdate(req.params.id, updatedBlog, { new: true })
    .populate('user')
  console.log('updated', updatedNewBlog)
  res.status(200).json(updatedNewBlog)
})

blogRouter.delete('/:id', userExtractor, async (req, res) => {
  console.log('body', req)
  const blogId = req.params.id
  console.log('user', req.user)
  const blog = await Blog.findById(blogId)

  if (!blog || blog.user.toString() !== blogId.toString()) {
    console.log('blog', blog)
    console.log('usertostring', blog.user.toString())
    console.log('blogid', blogId.toString())
    return res.status(401).json({ error: 'Cannot delete blog' })
  }

  await Blog.findByIdAndRemove(blogId)

  res.status(204).end()
})

module.exports = blogRouter
