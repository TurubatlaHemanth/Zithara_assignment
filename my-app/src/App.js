// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './Table';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

function App() {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null); // Initialize sortBy state as null

  useEffect(() => {
    // Fetch data from the server
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:5000/');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Handle search
  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to page 1 when search term changes
  };

  // Handle sorting
  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  // Apply sorting and filtering to all records
  const filteredRecords = records.filter(record =>
    record.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedRecords = [...filteredRecords]; // Create a copy of filtered records

  // Sort records based on sortBy state
  if (sortBy) {
    sortedRecords.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortBy === 'time') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
    });
  }

  // Get current records after pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  let currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="App">
      <h1>Customer Records</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="dropdown">
        <button className="dropbtn">Sort By</button>
        <div className="dropdown-content">
          <button onClick={() => handleSort('date')}>Date</button>
          <button onClick={() => handleSort('time')}>Time</button>
        </div>
      </div>
      <Table records={currentRecords} />
      <div className="pagination-container">
        <Pagination
          recordsPerPage={recordsPerPage}
          totalRecords={filteredRecords.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default App;

