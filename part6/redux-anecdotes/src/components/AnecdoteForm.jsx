import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`anecdote '${content}' has been created`, 5))
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
