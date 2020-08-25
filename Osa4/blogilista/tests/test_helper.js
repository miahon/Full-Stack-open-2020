const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      
      title: "Olemisen sietämätön keveys",
      author: "Moka Ahonen",
      url: "www.oogle.com",
      likes: "1",
      userId: "5f43b1b0ddd48e17203707da"

    },
    {
      title: "Sietämisen olematon keveys",
      author: "Moka Ahonen",
      url: "www.oogle.com",
      likes: "1",
      userId: "5f43b1b0ddd48e17203707da"
    },
  ]
  
    
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
  module.exports = {
    initialBlogs, blogsInDb,usersInDb,
  }