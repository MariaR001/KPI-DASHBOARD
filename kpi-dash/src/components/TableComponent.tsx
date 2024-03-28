import React from 'react';
import { useTable } from 'react-table';

interface TableColumn {
  label: string;
  key: string;
}

interface TableData {
  title: string;
  columns: TableColumn[];
  rows: Record<string, any>[];
}

interface TableComponentProps {
  data: TableData;
  height: number;
  width: number;
}

const TableComponent: React.FC<TableComponentProps> = ({ data , height, width}) => {
  const columns = React.useMemo(
    () => data.columns.map(column => ({ Header: column.label, accessor: column.key })),
    [data.columns]
  );

  const tableData = React.useMemo(
    () => data.rows,
    [data.rows]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  return (
    <div style={{ width, height, textAlign: 'center', justifyContent: 'center' }}>
      <h2>{data.title}</h2>
      <table {...getTableProps()} style={{ margin: '0 auto', border: 'solid 1px blue', width: '100%', maxWidth: '800px' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ borderBottom: 'solid 1px red', background: '#fafafa', padding: '8px' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} style={{ padding: '8px', borderBottom: 'solid 1px pink', background: '#fafafa' }}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;