import React from 'react'
 
const AddBlogForm = ({ addBlog, title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
 

return (

<form onSubmit={addBlog}> 
        <div>
          title: 
          <input 
          id='title'
          value={title}
          onChange={handleTitleChange}/>
        </div>
        <div>
          author:          
          <input
          id='author'
          value={author}
          onChange={handleAuthorChange}/>        
        
        </div>   
        <div>
          url: 
          <input
          id='url'
          value={url}
          onChange={handleUrlChange}/>
        </div>
        
        <div>
          <button id='create-button' type="submit">create</button>
        </div>
      </form>
  
)

}


export default AddBlogForm