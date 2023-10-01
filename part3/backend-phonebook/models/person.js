const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('Connecting to the MongoDB...')

mongoose.connect(url)
  .then(result => {
    console.log('Connected to the MongoDB!')
  })
  .catch(error => {
    console.log('Error connecting to the MongoDB:', error.message)
  })

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
