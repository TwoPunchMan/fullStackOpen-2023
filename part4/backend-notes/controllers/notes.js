const noteRouter = require('express').Router()

const Note = require('../models/note')
const User = require('../models/user')

noteRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
    .populate('user', { username: 1, name: 1 })

  res.json(notes)
})

noteRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

noteRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  res.status(201).json(savedNote)
})

noteRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note
    .findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

noteRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = noteRouter;
