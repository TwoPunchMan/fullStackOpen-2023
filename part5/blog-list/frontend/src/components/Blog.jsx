import { useState, useEffect } from "react"

const Blog = (props) => {
  const { title, author, user, url, likes, id } = props.blog

  const [visible, setVisible] = useState(false)
  const [amtLikes, setLikes] = useState(likes)
  const [blogCreator, setCreator] = useState(user.name)

  useEffect(() => {
    if (!user) {
      setCreator(null)
    }
  })

  const addLike = () => {
    props.addLike(id)
    setLikes(amtLikes + 1)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        {blogCreator}
      </div>
    </div>
  )
}

export default Blog
