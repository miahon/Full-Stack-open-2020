const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)

describe('http get', () => {

  beforeEach(async () => {
    //await Blog.deleteMany({})
    //await Blog.insertMany(helper.initialNotes)
  })


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('blog id defined', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})



test('a specific blogs is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

      expect(contents).toContain(
          'Sietämisen olematon keveys'
)

})



describe('http post', () => {


  test('blog without title is not added', async () => {
    
    const newBlog = {

      _id: "5f43c8d23a233f3a8cce1bab",
      author: "Testi",
      likes: "10",
      userId: "5f43b1b0ddd48e17203707da",
      __v: 0
             
  }
  
      await api
      .post('/api/blogs')
      .set("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pYWhvbiIsImlkIjoiNWY0M2IxYjBkZGQ0OGUxNzIwMzcwN2RhIiwiaWF0IjoxNTk4MjcyMTg1fQ.bZWM58hkp4BwhdtQARHyRra3qlTvE7cnDT_o8vJvaBk"
      )
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd  = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })

  
  test('a valid blog can be added ', async () => {
    const newBlog = {

        _id: "5f43c8d23a233f3a8cce1bab",
        title: "async/await simplifies making async calls",
        author: "Testi",
        url: "www.goo.com",
        likes: "10",
        userId: "5f43b1b0ddd48e17203707da",
        __v: 0
               
    }
  
    await api
      .post('/api/blogs')
      .set("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pYWhvbiIsImlkIjoiNWY0M2IxYjBkZGQ0OGUxNzIwMzcwN2RhIiwiaWF0IjoxNTk4MjcyMTg1fQ.bZWM58hkp4BwhdtQARHyRra3qlTvE7cnDT_o8vJvaBk"
        )
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    
    const blogsAtEnd  = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(r => r.title)  
       expect(titles).toContain('async/await simplifies making async calls'     
    )
  })



  test('if likes not defined, set value to 0', async () => {
    
    const newBlog = {

      _id: "5f43c8d23a233f3a8cce1bab",
      title: "async/await simplifies making async calls",
      author: "Testi",
      url: "www.goo.com",
      userId: "5f43b1b0ddd48e17203707da",
      __v: 0
             
  }
  

      await api
      .post('/api/blogs')
      .set("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pYWhvbiIsImlkIjoiNWY0M2IxYjBkZGQ0OGUxNzIwMzcwN2RhIiwiaWF0IjoxNTk4MjcyMTg1fQ.bZWM58hkp4BwhdtQARHyRra3qlTvE7cnDT_o8vJvaBk"
      )
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
            expect(response.body[3].likes).toBe(0)
  

  })

  
  describe('http delete', () => {

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/notes/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })

})  

})

/*
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  */


afterAll(() => { 
  
  mongoose.connection.close() 

}) 

})