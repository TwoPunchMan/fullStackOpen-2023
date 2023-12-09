import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

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
    const user = storageService.loadUser()
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

  const addLikesToBlog = (blogId) => {
    const blog = blogs.find(b => b.id === blogId)

    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .updateBlog(blogId, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== blogId ? blog : returnedBlog))
      })
      .catch(error => {
        handleMsg("Can't add a like to this blog", 'error')
      })
  }

  const deleteBlog = (blogToDelete) => {
    const confirmDelete = window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)
    if (confirmDelete) {
      blogService
        .deleteBlog(blogToDelete.id)
        .then(deletedBlog => {
          console.log('delblog', deletedBlog)
          const undeletedBlogs = blogs.filter(blog => blog.id !== blogId)
          setBlogs(undeletedBlogs)
          handleMsg(`Deleted the blog ${blogToDelete.title} by ${blogToDelete.author}`, 'info')
        })
        .catch(error => {
          handleMsg('Blog has already been deleted', 'error')
        })
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
      setUser(user)
    } catch (error) {
      handleMsg('wrong username or password', 'error')
    }
  }

  const logout = async () => {
    handleMsg(`${user.username} has logged out`, 'success')
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
            functions={[addLikesToBlog, deleteBlog]}
            loggedInUser={user}
          />
        )}
      </div>
    </div>
  )
}

export default App
