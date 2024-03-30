import React from "react";
import { useTable } from "react-table";
import { useRef, useState, useEffect } from "react";

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
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const columns = React.useMemo(
    () =>
      data.columns.map((column) => ({
        Header: column.label,
        accessor: column.key,
      })),
    [data.columns]
  );

  const tableData = React.useMemo(() => data.rows, [data.rows]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  useEffect(() => {
    console.log("COMPONENT CHANGING");
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    const currentContainerRef = containerRef.current;

    const resizeObserver = new ResizeObserver(updateSize);
    if (currentContainerRef) {
      resizeObserver.observe(currentContainerRef);
    }

    updateSize();

    return () => {
      if (currentContainerRef) {
        resizeObserver.unobserve(currentContainerRef);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "95",
        height: "70%",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <h2>{data.title}</h2>
      <table
        {...getTableProps()}
        style={{
          margin: "0 auto",
          border: "solid 1px blue",
          width: "100%",
          maxWidth: containerSize.width,
          maxHeight: containerSize.height,
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 1px red",
                    background: "#fafafa",
                    padding: "8px",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "8px",
                        borderBottom: "solid 1px pink",
                        background: "#fafafa",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
