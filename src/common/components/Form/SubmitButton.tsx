import React from 'react';

interface SubmitButtonProps {
  buttonText?: string;
}

const SubmitButton = ({ buttonText = 'Save Changes' }: SubmitButtonProps) => {
  return (
    <>
      <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
      >
        {buttonText}
      </button>
    </>
  );
};

export default SubmitButton;
