import React from 'react';
import { BiWindowClose } from 'react-icons/bi';

interface FormModalHeaderProps {
  title: string;
  onClose: () => {};
}

const FormModalHeader = ({ title, onClose }: FormModalHeaderProps) => {
  return (
    <>
      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-blue-600 dark:text-white">
          {title}
        </h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="defaultModal"
          onClick={() => onClose()}
        >
          <BiWindowClose />
          <span className="sr-only">Close modal</span>
        </button>
      </div>
    </>
  );
};

export default FormModalHeader;
