import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import ActionTypeEnum from '../../../common/enum/ActionTypeEnum';
import { AccountWriteModel } from '../models/AccountWriteModel';
import * as AccountActions from '../redux/AccountActions';
import FormModalLayout from '../../../common/components/Form/FormModalLayout';
import FormModalFooter from '../../../common/components/Form/FormModalFooter';

interface FormProps {
  account: AccountWriteModel;
  actionType: ActionTypeEnum;
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => {};
  reloadData: () => {};
}

const AccountForm = ({
  account,
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
          initialValues={account}
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
                  Balance
                </label>
                <input
                  type="number"
                  id="balance"
                  name="balance"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.balance!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Contact Type"
                  required
                />
              </div>
              <FormModalFooter cancelButtonOnClick={handleClose} />
            </form>
          )}
        </Formik>
      </>
    );
  };

  // Save
  const handleSave = async (values: AccountWriteModel) => {
    // Save
    if (actionType == ActionTypeEnum.Create) {
      await AccountActions.createAccount(values);
    } else if (actionType == ActionTypeEnum.Update) {
      await AccountActions.updateAccount(values);
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
      {isShowModal && account && (
        <FormModalLayout
          headerTitle="Account"
          headerOnClose={handleClose}
          formContent={renderedForm()}
        />
      )}
    </>
  );
};

export default AccountForm;
