import React from 'react';

const TableHeader = ({ items }) => {
  return (
    <tr>
      {items.map((item) => (
        <th>{item}</th>
      ))}
    </tr>
  );
};

export default TableHeader;
