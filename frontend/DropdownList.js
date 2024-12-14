import React, { useState } from 'react';

const DropdownFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div>
      <label htmlFor="filter-dropdown">Filter: </label>
      <select
        id="filter-dropdown"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="In Progress">In Progress</option>
      </select>
      <p>Current Filter: {selectedFilter}</p>
    </div>
  );
};

export default DropdownFilter;
