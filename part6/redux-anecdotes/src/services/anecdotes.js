import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNewAnecdote = async (anecdote) => {
  const newAnecdote = { content: anecdote, id: getId(), votes: 0 }
  const res = await axios.post(baseUrl, newAnecdote)
  return res.data
}

export default {
  getAll,
  createNewAnecdote
}
