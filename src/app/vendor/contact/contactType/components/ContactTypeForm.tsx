import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import ActionTypeEnum from '../../../../../common/enum/ActionTypeEnum';
import { ContactTypeWriteModel } from '../models/ContactTypeWriteModel';
import * as ContactTypeActions from '../redux/ContactTypeActions';
import { BiWindowClose } from 'react-icons/bi';

interface FormProps {
  contacttype: ContactTypeWriteModel;
  actionType: ActionTypeEnum;
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => {};
  onOK: (isSaved: boolean) => {};
}

const ContactTypeForm = ({
  contacttype,
  actionType,
  isShowModal,
  setIsShowModal,
  onOK,
}: FormProps) => {
  // Header
  const renderedHeader = () => {
    return (
      <>
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-white">
            Contact Type
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
      </>
    );
  };

  // Form
  const renderedForm = () => {
    return (
      <>
        <Formik
          initialValues={contacttype}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // Save
              handleSave(values);

              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contact Type
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.name!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ContactType Name"
                  required
                />
                {errors.name && touched.name && errors.name}
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-toggle="defaultModal"
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save Changes
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
            </form>
          )}
        </Formik>
      </>
    );
  };

  // Save
  const handleSave = async (values: ContactTypeWriteModel) => {
    // Save
    if (actionType == ActionTypeEnum.Create) {
      await ContactTypeActions.createContactType(values);
    } else if (actionType == ActionTypeEnum.Update) {
      await ContactTypeActions.updateContactType(values);
    }
    onOK(true);
    // Close
    await setIsShowModal(false);
  };

  // Handle Close
  const handleClose = async () => {
    // Close
    await setIsShowModal(false);
  };

  return (
    <>
      {isShowModal && contacttype && (
        <div
          tabIndex={-1}
          className="fixed top-0 right-0 z-50 bg-slate-300 bg-opacontacttype-50 p-4 overflow-x-hidden overflow-y-auto h-modal md:h-full transition-all flex-auto w-96 from-slate-900 to-blue-600 modal-fade"
        >
          <div className="md:h-auto mx-auto w-110 transition-all">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700">
              {renderedHeader()}
              <div className="space-y-6">{renderedForm()}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactTypeForm;
