import { createContext, useReducer, useContext } from "react";

const anecdoteReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
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
  const dispatch = anecdoteAndDispatch[1]
  return (payload) => {
    dispatch({ type: 'SET', payload })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }
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
