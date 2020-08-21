import React from 'react'

const Person = ({person, handleDeletePerson}) => (
    
  <div>
    <li className='person'>{person.name} {person.number} 
    <button  type="button" onClick={() => handleDeletePerson(person.id, person.name)}> Delete</button></li>
  </div>
    )

  export default Person