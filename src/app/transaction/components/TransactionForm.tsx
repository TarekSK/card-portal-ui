import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import ActionTypeEnum from '../../../common/enum/ActionTypeEnum';
import { TransactionWriteModel } from '../models/TransactionWriteModel';
import * as TransactionActions from '../redux/TransactionActions';
import FormModalLayout from '../../../common/components/Form/FormModalLayout';
import FormModalFooter from '../../../common/components/Form/FormModalFooter';

interface FormProps {
  transaction: TransactionWriteModel;
  actionType: ActionTypeEnum;
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => {};
  reloadData: () => {};
}

const TransactionForm = ({
  transaction,
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
          initialValues={transaction}
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
                  Contact Type
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.cardNumber!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Contact Type"
                  required
                />
                {errors.cardNumber && touched.cardNumber && errors.cardNumber}
              </div>
              <FormModalFooter cancelButtonOnClick={handleClose} />
            </form>
          )}
        </Formik>
      </>
    );
  };

  // Save
  const handleSave = async (values: TransactionWriteModel) => {
    // Save
    await TransactionActions.createTransaction(values);
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
      {isShowModal && transaction && (
        <FormModalLayout
          headerTitle="Transaction"
          headerOnClose={handleClose}
          formContent={renderedForm()}
        />
      )}
    </>
  );
};

export default TransactionForm;
