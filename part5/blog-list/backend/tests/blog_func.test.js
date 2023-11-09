test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('total sum of likes from a list of blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('only one blog, itself', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('most liked blog from a list of blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'blogs': 1 })
  })

  test('author that wrote the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ 'author': 'Robert C. Martin', 'blogs': 3 })
  })
})

describe('author with the most likes', () => {
  test('one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 5 })
  })

  test('author with the most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 17 })
  })
})
