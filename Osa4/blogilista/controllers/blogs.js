const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

/*

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
*/

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})




const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}



blogsRouter.post('/', async (request, response) => {
  
  const body = request.body

  
  if(!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)   
   
  const blog = new Blog({

    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })     

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.json(savedBlog.toJSON())
  
})

/*
  
  blogsRouter.post('/',  (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
*/

blogsRouter.get('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {

  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
  if (blog) {
  response.json(updatedBlog.toJSON())
  } else {
    response.status(404).end()
  }

}), 


module.exports = blogsRouter