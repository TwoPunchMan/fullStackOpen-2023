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
  if (!blogs) {
    return {}
  }

  let maxBlog = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > maxBlog.likes) {
      maxBlog = blog
    }
  })

  return maxBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
