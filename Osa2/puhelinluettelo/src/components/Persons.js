
import React from 'react'
import Person from './Person'

const Persons = ({ persons, searchTerm, handleDeletePerson}) => {

  const results = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm)
  );
  
  
    return (
      <div>
        <ul>
          {results.map((person) => 
            <Person 
            key={person.id} 
            person={person}
            handleDeletePerson={handleDeletePerson}
            />
          )}
        </ul>
      </div>
    )
  }

  export default Persons