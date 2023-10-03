const noteRouter = require('express').Router()

const Note = require('../models/note')

noteRouter.get('/', (req, res) => {
  Note
    .find({})
    .then(notes => {
      res.json(notes)
    })
})

noteRouter.get(':/id', (req, res, next) => {
  Note
    .find(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

noteRouter.post('/', (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note
    .save()
    .then(savedNote => {
      res.json(savedNote)
    })
    .catch(error => next(error))
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

noteRouter.delete('/:id', (req, res, next) => {
  Note
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = noteRouter;
