import React from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';

interface TableProps {
  data: [{}];
  idColumn: string;
  columnsDisplay: string[];
  columnsHeaders: string[];
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

const Table = ({
  data,
  idColumn = 'id',
  columnsDisplay,
  columnsHeaders,
  isEdit = true,
  onEdit = undefined,
  isDelete = true,
  onDelete = undefined,
  isDetails1 = false,
  titleDetails1 = '',
  onClickDetails1 = undefined,
  isDetails2 = false,
  titleDetails2 = '',
  onClickDetails2 = undefined,
}: TableProps) => {
  return (
    <>
      <div className="overflow-x-auto mx-3 mt-3 p-3 bg-slate-100 rounded">
        <table className="min-w-max w-full table-auto bg-white">
          <TableHead columnsHeaders={columnsHeaders} />
          <TableBody
            data={data}
            idColumn={idColumn}
            columnsDisplay={columnsDisplay}
            isEdit={isEdit}
            onEdit={onEdit}
            isDelete={isDelete}
            onDelete={onDelete}
            isDetails1={isDetails1}
            titleDetails1={titleDetails1}
            onClickDetails1={onClickDetails1}
            isDetails2={isDetails2}
            titleDetails2={titleDetails2}
            onClickDetails2={onClickDetails2}
          />
        </table>
      </div>
    </>
  );
};

export default Table;
