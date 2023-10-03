import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import phoneBookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMsg] = useState(null);

  useEffect(() => {
    phoneBookService
      .getAllPersons()
      .then(people => {
        setPersons(people)
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find(person => person.name === newName)

    if (person) {
      updatePerson(person)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    phoneBookService
      .addNewPerson(newPerson)
      .then(returnedPerson => {
        showMsg(`Added ${newName}`, 'info')
        setPersons(persons.concat(returnedPerson))
      })
      .catch(error => {
        console.log(error.res.data.error)
      })

    clearForm()
  }

  const updatePerson = (person) => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedPerson = { ...person, number: newNumber }

      phoneBookService
        .updatePerson(person.id, updatedPerson)
        .then(updated => {
          showMsg(`Updated number for ${newName}`, 'info')
          const updatedInfo = persons.map(p => p.id !== person.id ? p : updated)
          setPersons(updatedInfo)
        })
    }

    clearForm()
  }

  const deletePerson = (personToDelete) => {
    const isPersonDelete = window.confirm(`Delete ${personToDelete.name}?`)

    if (isPersonDelete) {
      phoneBookService
        .deletePerson(personToDelete.id)
        .then(() => {
          showMsg(`Deleted ${personToDelete.name}`, 'info')
          const undeletedPersons = persons.filter(p => personToDelete.id !== p.id)
          setPersons(undeletedPersons)
        })
        .catch(error => {
          showMsg(`Information of ${personToDelete.name} has already been removed from server`, 'error')
        })
    }
  }

  const showMsg = (msg, type) => {
    setMsg({ message: msg, type: type })
    msgTimeout()
  }

  const msgTimeout = () => {
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter value={filter} changeFunction={handleFilter} />

      <h3>add a new</h3>

      <PersonForm values={[newName, newNumber]} changeFunctions={[handleNewName, handleNewNumber]} submitForm={addPerson} />

      <h3>Numbers</h3>

      <Persons people={personsToShow} deleteFunction={deletePerson} />
    </div>
  )
}

export default App
