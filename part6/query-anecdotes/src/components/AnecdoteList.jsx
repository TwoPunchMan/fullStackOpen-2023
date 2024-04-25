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
  const notifyWith = useNotificationDispatch()
  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: ({ content }) => {
      client.invalidateQueries('anecdotes')
      notifyWith(`anecdote '${content}' voted`)
    }
  })

  const handleVote = async (anecdote) => {
    voteAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
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
