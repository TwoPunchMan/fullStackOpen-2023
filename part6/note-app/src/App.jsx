import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [])

/*  useEffect(() => {
    noteService
      .getAll()
      .then(notes =>
        dispatch(setNotes(notes))
      )
  }, [])
*/

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes  />
    </div>
  )
}

export default App
