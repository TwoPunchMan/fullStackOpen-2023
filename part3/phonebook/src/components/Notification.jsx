const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: message.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={style}>
      {message.message}
    </div>
  )
}

export default Notification;
