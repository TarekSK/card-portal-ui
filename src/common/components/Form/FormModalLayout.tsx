import React from 'react';
import FormModalHeader from './FormModalHeader';

interface FormModalLayoutProps {
  headerTitle: string;
  headerOnClose: () => {};
  formContent: any;
}

const FormModalLayout = ({
  headerTitle,
  headerOnClose,
  formContent,
}: FormModalLayoutProps) => {
  return (
    <>
      <div
        className="relative z-10 transition duration-150 ease-in-out"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-2xl font-medium leading-6 pt-5 px-6 text-gray-900">
                    {headerTitle}
                  </h3>
                  <div className="mt-2">{formContent}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormModalLayout;
