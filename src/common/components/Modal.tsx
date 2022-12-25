import React, { useEffect } from 'react';
import { FiCornerDownLeft } from 'react-icons/fi';

interface ModalProps {
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => {};
  title: string;
  modalContent: any;
  okButtonText: string;
  cancelButtonText: string;
  onOK: () => {};
  onCancel: () => {};
}

const Modal = ({
  isShowModal,
  setIsShowModal,
  title,
  modalContent,
  okButtonText,
  cancelButtonText,
  onOK,
  onCancel,
}: ModalProps) => {
  // Handle OK
  const handleOK = async () => {
    // OK
    onOK();
    // Close
    await setIsShowModal(false);
  };

  onCancel = async () => {
    console.log('Close');
    // Cancel
    onCancel();
    // Close
    await setIsShowModal(false);
  };

  return (
    <>
      {isShowModal && (
        <div
          tabIndex={-1}
          className="fixed 
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
                >
                  <FiCornerDownLeft />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="space-y-6">{modalContent}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
