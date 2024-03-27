import { useSelector } from "react-redux"

const Notification = () => {

  const notification = useSelector(state => {
    if (state.notification) {
      return state.notification
    }

    return null
  })

  const style = useSelector(state => {
    if (state.notification) {
      return {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 20
      }
    }

    return null
  })

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
