import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

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
        {blog.title} {blog.author} <button onClick={toggleDetails}>view</button>
      </div>
      <div style={showVisible}>
        {blog.title} {blog.author} <button onClick={toggleDetails}>hide</button><br></br>
        {blog.url}<br></br>
        likes {blog.likes} <button>like</button><br></br>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
