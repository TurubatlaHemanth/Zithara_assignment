import React from 'react';

const PaginationHorizontal = ({ recordsPerPage, totalRecords, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination horizontal">
        <li className={currentPage === 1 ? 'disabled' : ''}>
          <button onClick={() => paginate(currentPage - 1)}>Previous</button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
        <li className={currentPage === pageNumbers.length ? 'disabled' : ''}>
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
}

export default PaginationHorizontal;
