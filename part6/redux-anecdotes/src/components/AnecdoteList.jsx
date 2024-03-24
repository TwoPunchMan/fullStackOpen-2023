import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { filterChange } from "../reducers/filterReducer"

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

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
    }

    return state.anecdotes
  })

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const byVotes = (a, b) => b.votes - a.votes

  return (
    <div>
      {anecdotes.sort(byVotes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      )}
    </div>
  )
}

export default AnecdoteList
