import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteForVote = state.find(an => an.id === id)
      const upvotedAnecdote = {
        ...anecdoteForVote,
        votes: anecdoteForVote.votes + 1
      }
      const byVotes = (a, b) => b.votes - a.votes
      return state.map(an => an.id !== id ? an : upvotedAnecdote).sort(byVotes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
