import { useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../AnecdoteContext'

const AnecdoteForm = ({ client }) => {
  const dispatch = useNotificationDispatch()

  const generateId = () =>
    Number((Math.random() * 100000).toFixed(0))

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = client.getQueryData(['anecdotes'])
      client.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({ type: 'TOO_SHORT' })
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

    const reducerData = {
      type: 'CREATE',
      payload: content
    }

    dispatch(reducerData)

    setTimeout(() => {
      dispatch({ type: 'NONE' })
    }, 5000)
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
