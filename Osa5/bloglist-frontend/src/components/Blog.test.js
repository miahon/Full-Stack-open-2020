
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: "Olemisen sietämätön keveys",
  author: "Ahonen",
  url: "www",
  likes: 99,
  
       
}

test('renders Title, Author', () => {


  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  component.debug()
 
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent('Ahonen')
  
})

test('renders Title, Author, url, likes by View button', () => {


  const component = render(
    <Blog blog={blog} />
  ) 

  const button = component.getByText('view')
  fireEvent.click(button)

  //component.debug()
 
  expect(component.container).toHaveTextContent(blog.author,blog.url,blog.likes)
    
  
})



test('clicking the like button calls event handler twice', () => {
  
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} handleLike={mockHandler} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)
  
    const likesButton = component.getByText("like")
    fireEvent.click(likesButton)
    fireEvent.click(likesButton)

    //component.debug()
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })