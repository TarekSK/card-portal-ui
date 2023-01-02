import React from 'react';
import CancelButton from './CancelButton';
import SubmitButton from './SubmitButton';

interface FormModalFooterProps {
  submitButtonText?: string;
  cancelButtonText?: string;
  cancelButtonOnClick: () => {};
  isSubmit?: boolean;
}

const FormModalFooter = ({
  submitButtonText,
  cancelButtonText,
  cancelButtonOnClick,
  isSubmit = true,
}: FormModalFooterProps) => {
  return (
    <>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        {isSubmit && <SubmitButton buttonText={submitButtonText} />}
        <CancelButton
          buttonText={cancelButtonText}
          onClose={cancelButtonOnClick}
        />
      </div>
    </>
  );
};

export default FormModalFooter;
