import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const user = userService.loadUser()
    setUser(user)
  }, [])

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      handleMsg(`A new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
    } catch (error) {
      handleMsg('Something is wrong with the title/author', 'error')
    }

    blogFormRef.current.toggleVisibility()
  }

  const like = async (blog) => {
    const blogForUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }

    try {
      const likedBlog = await blogService.updateBlog(blogForUpdate)
      const updatedBlogs = blogs.map(b => b.id === blog.id ? likedBlog : b)
      setBlogs(updatedBlogs)
      handleMsg(`+1 like to the blog '${blog.title}' by '${blog.author}'`, 'success')
    } catch (error) {
      handleMsg("Can't add a like to this blog", 'error')
    }
  }

  const deleteBlog = async(blogToDelete) => {
    console.log(blogToDelete)
    const confirmDelete = window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)

    if (confirmDelete) {
      try {
        await blogService.deleteBlog(blogToDelete.id)
        const updatedBlogs = blogs.filter(blog => blog.id !== blogToDelete.id)
        setBlogs(updatedBlogs)
        handleMsg(`Deleted the blog ${blogToDelete.title} by ${blogToDelete.author}`, 'success')
      } catch (error) {
        handleMsg('Blog has already been deleted', 'error')
      }
    }
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

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      userService.saveUser(user)
      setUser(user)
    } catch (error) {
      handleMsg('wrong username or password', 'error')
    }
  }

  const logout = async () => {
    handleMsg(`${user.username} has logged out`, 'success')
    userService.removeUser()
    setUser(null)
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} />
        <LoginForm login={login} />
      </div>
    )
  }

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />

      <div>
        <div>{user.name} logged in
          <button onClick={logout}>logout</button>
        </div>
        <br></br>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm addBlog={createBlog} />
        </Togglable>
      </div>
      <div>
        {blogs.sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            upLike={() => like(blog)}
            remove={() => deleteBlog(blog)}
            isRemove={user && blog.user.username === user.username}
          />
        )}
      </div>
    </div>
  )
}

export default App
