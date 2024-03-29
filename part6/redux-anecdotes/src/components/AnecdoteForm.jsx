import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification, removeNotification } from "../reducers/notificationReducer"

import anecdoteService from "../services/anecdotes"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
