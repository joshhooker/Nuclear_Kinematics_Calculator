import React from 'react';
import './SimpleDataTable.scss';

const SimpleDataTable = ({ columns, data, fixedHeader, fixedHeaderScrollHeight }) => {
  const containerStyle = fixedHeader ? {
    maxHeight: fixedHeaderScrollHeight,
    overflow: 'auto'
  } : {};

  return (
    <div className="simple-data-table-wrapper" style={containerStyle}>
      <table className="simple-data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {row[column.selector]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleDataTable;