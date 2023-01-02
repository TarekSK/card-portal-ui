import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import ActionTypeEnum from '../../../../../common/enum/ActionTypeEnum';
import { CityWriteModel } from '../models/CityWriteModel';
import * as CityActions from '../redux/CityActions';
import { BiWindowClose } from 'react-icons/bi';
import FormModalFooter from '../../../../../common/components/Form/FormModalFooter';
import FormModalLayout from '../../../../../common/components/Form/FormModalLayout';

interface FormProps {
  city: CityWriteModel;
  actionType: ActionTypeEnum;
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => {};
  reloadData: () => {};
}

const CityForm = ({
  city,
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
          initialValues={city}
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
              <div className="p-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  City Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.name!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="City Name"
                  required
                />
                {errors.name && touched.name && errors.name}
              </div>
              <FormModalFooter cancelButtonOnClick={handleClose} />
            </form>
          )}
        </Formik>
      </>
    );
  };

  // Save
  const handleSave = async (values: CityWriteModel) => {
    // Save
    if (actionType == ActionTypeEnum.Create) {
      await CityActions.createCity(values);
    } else if (actionType == ActionTypeEnum.Update) {
      await CityActions.updateCity(values);
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
      {isShowModal && city && (
        <FormModalLayout
          headerTitle="City"
          headerOnClose={handleClose}
          formContent={renderedForm()}
        />
      )}
    </>
  );
};

export default CityForm;
