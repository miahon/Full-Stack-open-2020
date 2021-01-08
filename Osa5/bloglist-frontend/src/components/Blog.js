import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2
  }

  const [view, setView] = useState(false)

  const handleView = () => {
    setView(!view)
        
  }

  

    
  return (
    <div style={blogStyle}>
      {view === false ?
      <div>{blog.title} <button id={blog.title} onClick={handleView}>view</button></div>
        
        :
        <div>
          <div>{blog.title} <button  onClick={handleView}>view</button></div>
          <p>{blog.url}</p>          
          <div>
            {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <p>{blog.author}</p>

          <div>
          <button onClick={() => handleDelete(blog)}>delete</button>
        </div>

        </div>


      }
      
    </div>
  )
}

export default Blog
