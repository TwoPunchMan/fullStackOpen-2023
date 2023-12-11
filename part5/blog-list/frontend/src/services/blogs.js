import axios from 'axios'
import userService from '../services/user'

const baseUrl = '/api/blogs'

const config = {
  headers: {
    Authorization: userService.loadUser()
      ? `Bearer ${userService.getToken()}`
      : null
  }
}

const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}

const create = async (newBlog) => {
  const req = await axios.post(baseUrl, newBlog, config)
  return req.data
}

const updateBlog = async (blog) => {
  const req = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return req.data
}

const deleteBlog = async (id) => {
  const req = await axios.delete(`${baseUrl}/${id}`)
  return req.data
}

export default {
  getAll,
  updateBlog,
  create,
  deleteBlog
}
