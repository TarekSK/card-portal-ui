import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import ActionTypeEnum from '../../../common/enum/ActionTypeEnum';
import { UserWriteModel } from '../models/UserWriteModel';
import * as UserActions from '../redux/UserActions';
import FormModalLayout from '../../../common/components/Form/FormModalLayout';

interface FormProps {
  user: UserWriteModel;
  actionType: ActionTypeEnum;
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => {};
  reloadData: () => {};
}

const UserForm = ({
  user,
  actionType,
  isShowModal,
  setIsShowModal,
  reloadData,
}: FormProps) => {
  // Form
  const renderedForm = () => {
    return (
      <>
        <Formik
          initialValues={user}
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
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="px-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.lastName!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="User Name"
                  required
                />
              </div>
              <div className="px-6 py-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.firstName!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="User Name"
                  required
                />
              </div>
              <div className="px-6 py-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  User Name
                </label>
                <input
                  type="email"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.username!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="User Name"
                  required
                />
              </div>

              <div className="px-6 py-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.password!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="User Name"
                  required
                />
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
  const handleSave = async (values: UserWriteModel) => {
    // Save
    if (actionType == ActionTypeEnum.Create) {
      await UserActions.createUser(values);
    } else if (actionType == ActionTypeEnum.Update) {
      await UserActions.updateUser(values);
    }
    // Reload Data
    reloadData();
    // Close
    await handleClose();
  };

  // Handle Close
  const handleClose = async () => {
    // Close
    await setIsShowModal(false);
  };

  return (
    <>
      {isShowModal && user && (
        <FormModalLayout
          headerTitle="User"
          headerOnClose={handleClose}
          formContent={renderedForm()}
        />
      )}
    </>
  );
};

export default UserForm;
