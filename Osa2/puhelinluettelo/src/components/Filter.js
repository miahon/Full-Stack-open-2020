import React from 'react'

const Filter = ({ searchTerm,handleFilterChange }) => (
    <div>
        <input  type="text" placeholder="Search" value={searchTerm} onChange={handleFilterChange} />
    </div>
  
)

export default Filter