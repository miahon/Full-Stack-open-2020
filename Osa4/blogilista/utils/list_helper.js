 
const dummy = (blogs) => {
    // ...
    return(1)
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((likes, blog) => (likes += blog.likes), 0)
    
  }

  const favoriteBlog = (blogs) => {    
    const likes =  blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    
    return likes 

  }

  const mostBlogs = (blogs) => {
  }
  
  module.exports = {
    dummy,totalLikes,favoriteBlog
  }