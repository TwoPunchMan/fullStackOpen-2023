var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const sumFunction = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(sumFunction, 0)
}

const favoriteBlog = (blogs) => {
  let maxBlog = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > maxBlog.likes) {
      maxBlog = blog
    }
  })

  return maxBlog
}

const mostBlogs = (blogs) => {
  const authors = _.groupBy(blogs, 'author')

  let table = []

  _.forEach(authors, (arrayBlogs, author) => {
    table.push({
      'author': author,
      'blogs': arrayBlogs.length
    })
  })

  return _.maxBy(table, (author) => author.blogs)
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author')

  let table = []

  _.forEach(authors, (arrayBlogs, author) => {
    table.push({
      'author': author,
      'likes': _.sumBy(arrayBlogs, (author) => author.likes)
    })
  })

  return _.maxBy(table, (author) => author.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
