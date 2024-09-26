"use client";
import React from 'react';
import { useTable } from 'react-table';

const DashboardTable = ({ columns, data, onRowClick }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div style={{ overflowY: 'auto', maxHeight: '600px' }}> {/* Set maxHeight as needed */}
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index} style={{ backgroundColor: '#f5f5f5', textAlign: 'left' }}>
              {headerGroup.headers.map((column, colIndex) => (
                <th {...column.getHeaderProps()} key={colIndex} style={{ borderBottom: '2px solid #ddd', padding: '10px', fontWeight: 'bold' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={rowIndex}
                onClick={() => onRowClick(row.original)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: row.index % 2 === 0 ? '#f9f9f9' : '#fff',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = row.index % 2 === 0 ? '#f9f9f9' : '#fff'}
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    {...cell.getCellProps()}
                    key={cellIndex}
                    style={{ padding: '10px', borderBottom: '1px solid #ddd' }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;
