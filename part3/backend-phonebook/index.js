const express = require('express')
const morgan = require('morgan')

const app = express()

const logger = (tokens, req, res) => {
	return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
		JSON.stringify(req.body)
  ].join(' ')
}

app.use(express.json())
app.use(morgan(logger))

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

app.get('/', (req, res) => {
	res.send('<h1>Hello phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(person => person.id === id)

	if (!person) {
		res.status(404).end('404 - Person not found')
	} else {
		res.json(person)
	}
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
	const id = Math.floor(Math.random() * 10000)
	const body = req.body

	if (!body.name) {
		return res.status(404).json({
			error: 'No Person listed'
		})
	}

	const newPerson = {
		id: id,
		name: body.name,
		number: body.number
	}

	persons = persons.concat(newPerson)
	res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)
	res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
