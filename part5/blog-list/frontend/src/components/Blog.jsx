import { useState, useEffect } from "react"

const Blog = ({ blog, upLike, remove, isRemove }) => {
  const [visible, setVisible] = useState(false)

  const { title, author, user, url, likes } = blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVisible = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {title} {author}
        <button onClick={handleVisible}>
          {visible ? 'hide' : 'show'}
        </button>
        {visible &&
          <div>
            <div> <a href={url}>{url}</a></div>
            <div>likes {likes} <button id="like-btn" onClick={upLike}>like</button></div>
            <div>{user.username}</div>
            {isRemove &&
              <div>
                <button onClick={remove}>remove</button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Blog
