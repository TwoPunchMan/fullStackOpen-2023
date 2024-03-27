import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      const anecdote = action.payload
      return `anecdote '${anecdote}' has been created`
    },
    voteNotification(state, action) {
      const anecdote = action.payload.content
      return `you voted '${anecdote}'`
    },
    removeNotification(state, action) {
      setTimeout(() => {}, 5000)
      return ''
    }
  }
})

export const { createNotification, voteNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
