import { createContext, useReducer, useContext } from "react";

const anecdoteReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      state = `new anecdote '${action.payload}' has been created`
      return state
    case 'VOTE':
      state = `anecdote '${action.payload}' voted`
      return state
    case 'NONE':
      return null
    case 'TOO_SHORT':
      return 'too short anecdote, must have length 5 or more'
    default:
      return state
  }
}

const AnecdoteContext = createContext()

export const useNotificationMsg = () => {
  const anecdoteAndDispatch = useContext(AnecdoteContext)
  return anecdoteAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const anecdoteAndDispatch = useContext(AnecdoteContext)
  return anecdoteAndDispatch[1]
}

export const AnecdoteContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(anecdoteReducer, null)

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteContext
