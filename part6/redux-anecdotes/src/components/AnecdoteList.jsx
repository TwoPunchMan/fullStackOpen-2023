import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

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
      return state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    }

    return state.anecdotes
  })

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList
