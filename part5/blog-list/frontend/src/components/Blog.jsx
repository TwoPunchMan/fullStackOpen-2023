import { useState, useEffect } from "react"

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const [amtLikes, setLikes] = useState(0)
  const [blogCreator, setCreator] = useState(null)

  const { title, author, user, url, likes, id } = props.blog

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
  })

  const addLike = () => {
    const addLike = props.functions[0]
    addLike(id)
    setLikes(amtLikes + 1)
  }

  const deleteBlog = () => {
    const deleteBlog = props.functions[1]
    deleteBlog(props.blog)
  }

  const hideVisible = { display: visible ? 'none' : '' }
  const showVisible = { display: visible ? '' : 'none' }

  const toggleDetails = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideVisible}>
        {title} {author} <button onClick={toggleDetails}>view</button>
      </div>
      <div style={showVisible}>
        {title} {author} <button onClick={toggleDetails}>hide</button><br></br>
        <a href={url}>{url}</a><br></br>
        likes {amtLikes} <button onClick={addLike}>like</button><br></br>
        {blogCreator}<br></br>
        <button onClick={() => deleteBlog()}>remove</button>
      </div>
    </div>
  )
}

export default Blog
