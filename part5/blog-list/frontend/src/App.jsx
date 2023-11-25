import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      handleMsg('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    handleMsg(`${user.username} has logged out`, 'success')
    setUser(null)
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        handleMsg(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
      })
      .catch(error => {
        handleMsg('something is wrong with the title/author', 'error')
      })
  }

  const handleMsg = (msg, type) => {
    setMessage({ message: msg, type: type })
    msgTimeout()
  }

  const msgTimeout = () => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin} >
        <h2>log in to application</h2>

        <div>
          username <input type="text" value={username} name="Username" onChange={({ target }) => setUserName(target.value)} />
        </div>
        <div>
          password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addBlog={createBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} />

      {!user && loginForm()}
      {user &&
        <div>
          <div>{user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <br></br>
          <br></br>
          {blogForm()}
        </div>
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
