import React from 'react';

interface TableRowActionsProps {
  isEdit?: boolean;
  onEdit: ([{}]: any) => {};
  isDelete?: boolean;
  onDelete: ([{}]: any) => {};
  isDetails1?: boolean;
  titleDetails1?: string;
  onClickDetails1?: ([{}]: any) => {};
  isDetails2?: boolean;
  titleDetails2?: string;
  onClickDetails2?: ([{}]: any) => {};
}

const TableRowActions = ({
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
}: TableRowActionsProps) => {
  return (
    <>
      {isDetails1 && (
        <button
          type="button"
          className="font-medium text-slate-600-600 hover:underline pr-4"
          onClick={async () => await onClickDetails1!(onClickDetails1)}
        >
          {titleDetails1}
        </button>
      )}
      {isDetails2 && (
        <button
          type="button"
          className="font-medium text-slate-600-600 hover:underline pr-4"
          onClick={async () => await onClickDetails2!(onClickDetails2)}
        >
          {titleDetails2}
        </button>
      )}
      {isEdit && (
        <button
          type="button"
          className="font-medium text-blue-600 hover:underline pr-4"
          onClick={async () => await onEdit(onEdit)}
        >
          Edit
        </button>
      )}
      {isDelete && (
        <button
          type="button"
          className="font-medium text-red-600 hover:underline pr-4"
          onClick={async () => await onDelete(onDelete)}
        >
          Delete
        </button>
      )}
    </>
  );
};

export default TableRowActions;
