import { useState, useEffect } from "react"

const Blog = ({ blog, upLike, remove, loginUser }) => {
  const [visible, setVisible] = useState(false)
  const [isDelete, setDeleteBtn] = useState(false)

  const { title, author, user, url, likes } = blog

  useEffect(() => {
    if (loginUser.username === user.username) {
      setDeleteBtn(true)
    }
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {title} {author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'show' : 'hide'}
      </button>
      {visible &&
        <div>
          <div> <a href={url}>{url}</a></div>
          <div>likes {likes} <button onClick={upLike}>like</button></div>
          <div>{user.username}</div>
          {isDelete &&
            <div>
              <button onClick={remove}>remove</button>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Blog
