  
import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchTerm, setSearchTerm] = useState("")
  const [Message, setMessage] = useState(null)
  

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { 
      name: newName, 
      number: newNumber 
    }

    const duplicateName = persons.filter( person => person.name === newName )
    
    if (duplicateName.length > 0) {
       const ok = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)

       if(ok){ 
       
        personService
          .update(duplicateName[0].id, newPerson)
          
          .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('') 
          setMessage(
            `${returnedPerson.name}'s number was updated`
          )

        })
        
        .catch(error => {
          setMessage(
            `${newName}' was already deleted from server`
          )        
    
          setTimeout(() => {
            setMessage(null)
          }, 3000)

          setPersons(persons.filter(n => n.id !== duplicateName[0].id))    
          
        })
      }     
    

    } 
  
    else {
   
    personService
     .create(newPerson)
     .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('') 

    
      setMessage(`Added ${newName}` )    
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

  }


  
  const handleFilterChange = (event) => {
   console.log(event.target.value)
   setSearchTerm(event.target.value)
   }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  
  const handleDeletePerson = (id,name) => {

    if (window.confirm(`Delete ${name}?`)) {

    personService
      .remove(id)
      .then(() => {
      setPersons(persons.filter(person => person.id !== id  )) 
      
      setMessage(` ${name} is deleted` )    
      setTimeout(() => {
          setMessage(null)
      }, 3000)
      })

      
      
      .catch(error => {
        setMessage(
          `${name}' was already deleted from server`
        )        
  
        setTimeout(() => {
          setMessage(null)
        }, 3000)

        setPersons(persons.filter(n => n.id !== id))    
        
      })        

    }

  }    

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} />
      <div>

      <Filter 
      searchTerm={searchTerm}
      handleFilterChange={handleFilterChange}      
      />
      </div>
            
           
      <h2>Add new</h2>
      <div>
      <PersonForm 
      addPerson={addPerson}
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}       
      
       />
      </div>

      <h2>Numbers</h2>
      
      <div>      
       <Persons 
       persons={persons}
       searchTerm={searchTerm}        
       handleDeletePerson={handleDeletePerson}
       />
       </div>      
       
    </div>
  )

}
export default App