import React from 'react';
import { GoPlus } from 'react-icons/go';

interface DataViewHeaderProps {
  title: string;
  isCreate?: boolean;
  onCreate?: ([{}]: any) => {};
}

const DataViewHeader = ({
  title,
  isCreate = true,
  onCreate,
}: DataViewHeaderProps) => {
  return (
    <>
      <div className="mx-3 mt-4 flex p-3 px-4 bg-slate-100 rounded">
        <h2 className="text-2xl font-bold tracking-tight capitalize text-gray-900">
          {title}
        </h2>
        {isCreate && (
          <div className="ml-auto">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                onCreate!(onCreate);
              }}
            >
              <GoPlus className="w-4 h-4" />
              <span className="sr-only">Add</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DataViewHeader;
