import React from 'react';
import { BiWindowClose } from 'react-icons/bi';

interface Props {
  title: string;
  recordText: string;
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => {};
  onOK: (isDelete: boolean) => {};
}

const DeleteConfirmModal = ({
  title,
  recordText,
  isShowModal,
  setIsShowModal,
  onOK,
}: Props) => {
  // handle OK
  const handleOK = () => {
    console.log('DELETE CONFIRM MODAL');
    // OK - Delete
    onOK(true);
    // Hide Modal
    setIsShowModal(false);
  };

  // handle Close
  const handleClose = () => {
    // Hide Modal
    setIsShowModal(false);
  };

  return (
    <>
      {isShowModal && (
        <div>
          <div
            tabIndex={-1}
            className="
                fixed 
                top-0 
                right-0 
                z-50 
                bg-slate-300
                bg-opacity-50
                p-4 
                overflow-x-hidden 
                overflow-y-auto 
                h-modal 
                md:h-full 
                transition-all
                flex-auto
                w-96
                from-slate-900 to-blue-600
                modal-fade"
          >
            <div className="md:h-auto mx-auto w-110 transition-all">
              <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal"
                    onClick={() => handleClose()}
                  >
                    <BiWindowClose />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="pl-5 p-3">
                    Are you sure you want to delete {title} <br />
                    <span className="font-semibold text-blue-600">
                      {recordText}
                    </span>{' '}
                    ?
                  </div>
                  <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      data-modal-toggle="defaultModal"
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => handleOK()}
                    >
                      Delete
                    </button>
                    <button
                      data-modal-toggle="defaultModal"
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      onClick={() => handleClose()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirmModal;
