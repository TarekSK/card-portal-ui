import React from 'react';
import TableRowActions from './TableRowActions';

interface TableBodyProps {
  data: [{}];
  idColumn: string;
  columnsDisplay: string[];
  isEdit?: boolean;
  onEdit?: ([{}]: any) => {};
  isDelete?: boolean;
  onDelete?: ([{}]: any) => {};
  isDetails1?: boolean;
  titleDetails1?: string;
  onClickDetails1?: ([{}]: any) => {};
  isDetails2?: boolean;
  titleDetails2?: string;
  onClickDetails2?: ([{}]: any) => {};
}

const TableBody = ({
  data,
  idColumn = 'id',
  columnsDisplay,
  isEdit = true,
  onEdit,
  isDelete = true,
  onDelete,
  isDetails1 = false,
  titleDetails1 = '',
  onClickDetails1 = undefined,
  isDetails2 = false,
  titleDetails2 = '',
  onClickDetails2 = undefined,
}: TableBodyProps) => {
  return (
    <>
      <tbody className="text-gray-600 text-sm font-light">
        {data?.map((dataRecord, index) => (
          <tr
            key={JSON.stringify(dataRecord)}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            {columnsDisplay?.map((columnName, columnindex) => (
              <td
                key={JSON.stringify(dataRecord) + columnName + index}
                className="py-4 px-6 font-medium"
              >
                {dataRecord[columnName as keyof typeof dataRecord]}
              </td>
            ))}
            <td className=" text-right px-6 transition-colors">
              <TableRowActions
                isEdit={isEdit}
                onEdit={() => onEdit!(dataRecord)}
                isDelete={isDelete}
                onDelete={() => onDelete!(dataRecord)}
                isDetails1={isDetails1}
                titleDetails1={titleDetails1}
                onClickDetails1={onClickDetails1}
                isDetails2={isDetails2}
                titleDetails2={titleDetails2}
                onClickDetails2={onClickDetails2}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};
export default TableBody;
