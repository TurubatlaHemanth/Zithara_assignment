import React from 'react';

const Table = ({ records }) => {
  return (
    <table>
      <thead>
        <tr>
          <th rowSpan={2}>S.No.</th>
          <th rowSpan={2}>Customer Name</th>
          <th rowSpan={2}>Age</th>
          <th rowSpan={2}>Phone</th>
          <th rowSpan={2}>Location</th>
          <th colSpan={2} >Created At
          </th>
        </tr>
        <tr>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {records.map((customer, index) => (
          <tr key={customer.sno}>
            <td>{customer.sno}</td>
            <td>{customer.customer_name}</td>
            <td>{customer.age}</td>
            <td>{customer.phone}</td>
            <td>{customer.location}</td>
            <td>{new Date(customer.created_at).toLocaleDateString()}</td>
            <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
