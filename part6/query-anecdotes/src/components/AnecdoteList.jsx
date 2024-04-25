import { useMutation } from '@tanstack/react-query'
import { voteAnecdote } from '../requests'
import { useNotificationDispatch } from '../AnecdoteContext'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = ({ client, anecdotes }) => {
  const dispatch = useNotificationDispatch()
  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      client.invalidateQueries('anecdotes')
    }
  })

  const handleVote = async (anecdote) => {
    voteAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })

    const reducerData = {
      type: 'VOTE',
      payload: anecdote.content
    }

    dispatch(reducerData)

    setTimeout(() => {
      dispatch({ type: 'NONE' })
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList;
