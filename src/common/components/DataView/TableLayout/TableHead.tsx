import React from 'react';

interface TableHeadProps {
  columnsHeaders: string[];
}

const TableHead = ({ columnsHeaders }: TableHeadProps) => {
  return (
    <>
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          {columnsHeaders?.map((column) => (
            <th key={column} className="py-3 px-6 text-left">
              {column}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
