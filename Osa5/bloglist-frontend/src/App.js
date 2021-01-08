import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login' 

import PropTypes from 'prop-types'

const App = () => {
  
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [ newblog, setBlog ] = useState('')
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)  
  const [ Message, setMessage ] = useState('')

  const blogFormRef = useRef()
 

  
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
 }

 const handleAuthorChange = (event) => {
   setAuthor(event.target.value)
 }

 const handleUrlChange = (event) => {
    setUrl(event.target.value)
 }

 

 const addBlog = (event) => {
  blogFormRef.current.toggleVisibility()
  event.preventDefault()
  const newBlog = { 
    title: title, 
    author: author,
    url: url

  }    
 
  blogService
   .create(newBlog)
   .then(returnedBlog => {
      setBlog(newblog.concat(returnedBlog))
      setTitle('')
      setAuthor('') 
      setUrl('') 

  
    setMessage(`a new blog ${title} by ${author} added ` )    
    setTimeout(() => {
        setMessage(null)
    }, 3000)


  })  
     
  .catch(error => 
    {console.log(error.response.data) 
    setMessage(`${error.response.data.error}`)    
    setTimeout(() => {
      setMessage(null)
     }, 3000)
  
  })

 }   

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async  (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      console.log('virhe kirjautumisessa')

      setMessage(`virhe kirjautumisessa`)    
      setTimeout(() => {
        setMessage(null)
       }, 3000)



    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )  

  const addBlogForm = () => (
    <Togglable  buttonLabel="new blog" ref={blogFormRef}>
      
      <AddBlogForm 
        addBlog={addBlog}
        title={title}
        author={author}
        url={url}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange} 
        handleUrlChange={handleUrlChange}    
        />
        
    </Togglable>
  )
 
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }



const handleClick = () => {
  console.log('clicked the button')

  window.localStorage.removeItem('loggedNoteappUser')
  window.location.reload();
}

const handleLike = async (blog) => {
  try {

    const blogUp = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes += 1
  }


      await blogService.update(blog.id, blogUp)
      setBlogs(blogs.map(blog => blog.id !== blogUp.id ? blog : blogUp).sort((a,b) => b.likes - a.likes))

  } catch (error) {
      console.log("virhe")
  }
}

const handleDelete = async (blog) => {

  if (window.confirm(`Delete ${blog.title}?`)) {

    blogService.setToken(user.token)
    await blogService.remove(blog.id)
    setMessage(`${blog.title} deleted`)
    setBlogs(blogs.filter(b => b.id !== blog.id))

    }

}

  return (
      

   <div>

        <p>{Message}</p>

        {user === null ?
         loginForm() :
        <div>
         
        <p>{user.name} logged in        
      
      {<button onClick={handleClick}>logout</button>}
    
        </p>

        <h2>blogs</h2>

        {blogs.map(blog => 
        <Blog 
        key={blog.id} 
        blog={blog}
        handleLike = {handleLike}
        handleDelete = {handleDelete}
        /> )} 
        {addBlogForm()}

                   
        </div>   
      }

       
      
   </div>

  )
}

export default App