require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

const logger = `${morgan.tiny} :body`

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name == 'CastError') {
    return res.status(404).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(express.json())
app.use(cors())
app.use(morgan(logger))
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Hello phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      res.json(person)
    })
    .catch(error => next(error))
})

app.get('/api/info', (req, res) => {
  Person
    .find({})
    .then(persons => {
      const currentDate = new Date()
      const numPeople = persons.length
      const output =
        `<div>
          Phonebook has info for ${numPeople} people
          <br/></br>
          ${currentDate}
        </div>`
      res.send(output)
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(404).json({
      error: 'No Person listed'
    })
  } else if (!body.number) {
    return res.status(404).json({
      error: 'Number is missing'
    })
  }

  const newPerson = new Person ({
    name: body.name,
    number: body.number
  })

  newPerson
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  const person = { name, number }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatePerson => {
      res.json(updatePerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(res => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
