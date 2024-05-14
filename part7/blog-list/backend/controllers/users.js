const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs', { url: 1, title: 1, author: 1, likes: 1 })

  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body

  if (password.length < 3) {
    return res.status(400).json({ error: "Password needs to be at least 3 or more characters" })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter;
