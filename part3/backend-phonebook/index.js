require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

const logger = `${morgan.tiny} :body`

app.use(cors())
app.use(morgan(logger))
app.use(express.static('build'))
/*
let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]
*/
app.get('/', (req, res) => {
  res.send('<h1>Hello phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  //const id = Number(req.params.id)
  //const person = persons.find(person => person.id === id)

  //if (!person) {
  //  res.status(404).end('404 - Person not found')
  //} else {
  Person
    .findById(req.params.id)
    .then(person => {
      res.json(person)
    })
    .catch(error => {
      res.status(404).end('404 - Person not found')
    })
})

app.get('/api/info', (req, res) => {
  const numPeople = persons.length
  const currentDate = new Date()
  const output =
    `<div>
      Phonebook has info for ${numPeople} people
      <br/></br>
      ${currentDate}
    </div>`

  res.send(output)
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

  let isPersonAlreadyExist;

  Person.find({}).then(persons => {
    isPersonAlreadyExist = persons.find(person => person.name === newPerson.name)
  })

  if (isPersonAlreadyExist) {
    return res.status(404).json({
      error: `${newPerson.name} is already listed.`
    })
  } else {
    newPerson.save().then(savedPerson => {
      res.json(savedPerson)
    })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
