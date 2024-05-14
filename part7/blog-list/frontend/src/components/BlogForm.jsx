import { useState } from "react"
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url,  setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new blog</h2>
        <form onSubmit={handleCreateBlog} >
          <div>
            title:
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              placeholder="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              placeholder="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              id="url"
              type="text"
              value={url}
              name="Url"
              placeholder="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id="create-blog-btn" type="submit">create</button>
        </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm
