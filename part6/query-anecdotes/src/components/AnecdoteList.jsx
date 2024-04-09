import { useMutation } from '@tanstack/react-query'
import { voteAnecdote } from '../requests'

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
