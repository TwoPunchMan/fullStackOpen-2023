import { useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../AnecdoteContext'

const AnecdoteForm = ({ client }) => {
  const notifyWith = useNotificationDispatch()

  const generateId = () =>
    Number((Math.random() * 100000).toFixed(0))

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = client.getQueryData(['anecdotes'])
      client.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notifyWith(`new anecdote '${newAnecdote.content}' has been created`)
    },
    onError: (error) => {
      notifyWith(error.response.data.error)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content,
      id: generateId().toString(),
      votes: 0
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
