import axios from 'axios'
import storageService from '../services/storage'

const baseUrl = '/api/blogs'

const headers = {}

const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}

const updateBlog = async (id, updatedBlog) => {
  const req = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return req.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const req = await axios.post(baseUrl, newBlog, config)
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
