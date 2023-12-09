import { useState, useEffect } from "react"

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const [amtLikes, setLikes] = useState(0)
  const [blogCreator, setCreator] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState(null)

  const { title, author, user, url, likes, id } = props.blog
  const [ addLike, deleteBlog ] = props.functions

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    setCreator(user.name)
    setLikes(likes)
    setLoggedInUser(props.loggedInUser)
  }, [])

  const hideVisible = { display: visible ? 'none' : '' }
  const showVisible = { display: visible ? '' : 'none' }

  const displayRemoveBtn = {
    display: !loggedInUser || loggedInUser.name !== user.name
      ? 'none'
      : ''
  }

  const upVote = () => {
    addLike(id)
    setLikes(amtLikes + 1)
  }

  const removeBlog = () => {
    deleteBlog(props.blog)
  }

  const toggleDetails = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideVisible}>
        {title} {author} <button onClick={toggleDetails}>view</button>
      </div>
      <div style={showVisible}>
        {title} {author} <button onClick={toggleDetails}>hide</button><br/>
        <a href={url}>{url}</a><br/>
        likes {amtLikes} <button onClick={upVote}>like</button><br/>
        {blogCreator}<br/>
        <button style={displayRemoveBtn} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
