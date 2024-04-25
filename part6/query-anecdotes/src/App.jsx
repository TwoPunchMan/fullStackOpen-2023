import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'

import { AnecdoteContextProvider } from './AnecdoteContext'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return (
      <div>
        anecdote service not loading due to problems in server
      </div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <AnecdoteContextProvider>
        <Notification />
        <AnecdoteForm client={queryClient} />

        <AnecdoteList client={queryClient} anecdotes={anecdotes} />
      </AnecdoteContextProvider>
    </div>
  )
}

export default App
