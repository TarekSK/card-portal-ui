import { Formik, useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import ActionTypeEnum from '../../../common/enum/ActionTypeEnum';
import { TransactionWriteModel } from '../models/TransactionWriteModel';
import * as TransactionActions from '../redux/TransactionActions';
import FormModalLayout from '../../../common/components/Form/FormModalLayout';
import FormModalFooter from '../../../common/components/Form/FormModalFooter';
import DropDownList from '../../../common/components/Form/DropDownList';
import { DropDownListDataModel } from '../../../common/models/DropDownListDataModel';
import { convertEnumToObject } from '../../../common/helper/EnumToObject';
import TransactionTypeEnum from '../enum/TransactionTypeEnum';
import { VendorReadModel } from '../../vendor/vendor/models/VendorReadModel';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../config/redux/RootReducer';
import * as vendorRedux from '../../vendor/vendor/redux/VendorRedux';

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
  // Transaction Type - Enum To Object
  const trasnactionType: DropDownListDataModel[] =
    convertEnumToObject(TransactionTypeEnum);

  // Dispatch
  let dispatch = useDispatch();

  // Vendor - Get
  const vendorData: VendorReadModel[] = useSelector<RootState>(
    ({ vendor }) => vendor.vendor,
    shallowEqual,
  ) as VendorReadModel[];

  // Vendor - Get
  useEffect(() => {
    dispatch(vendorRedux.actions.requestVendor());
  }, []);

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
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.date!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Transaction Date"
                  required
                />
              </div>
              <div className="px-6 py-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.amount!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Amount"
                  min={1}
                  required
                />
              </div>
              <div className="px-6 py-2">
                <DropDownList
                  label="Transaction Type"
                  name="type"
                  data={trasnactionType!}
                  idPropName="id"
                  valuePropName="name"
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                  value={values?.type!}
                  required
                />
              </div>
              <div className="px-6 py-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  minLength={16}
                  maxLength={16}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.cardNumber!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Card Number"
                  required
                />
              </div>
              <div className="px-6 py-2">
                <DropDownList
                  label="Vendor"
                  name="vendorId"
                  data={vendorData!}
                  idPropName="id"
                  valuePropName="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.vendorId!}
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
