import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ActionTypeEnum from '../../../../../common/enum/ActionTypeEnum';
import { AreaWriteModel } from '../models/AreaWriteModel';
import * as AreaActions from '../redux/AreaActions';
import DropDownList from '../../../../../common/components/Form/DropDownList';
import * as cityRedux from '../../city/redux/CityRedux';
import { CityReadModel } from '../../city/models/CityReadModel';
import { RootState } from '../../../../../config/redux/RootReducer';
import FormModalLayout from '../../../../../common/components/Form/FormModalLayout';
import FormModalFooter from '../../../../../common/components/Form/FormModalFooter';

interface FormProps {
  area: AreaWriteModel;
  actionType: ActionTypeEnum;
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => {};
  reloadData: () => {};
}

const AreaForm = ({
  area,
  actionType,
  isShowModal,
  setIsShowModal,
  reloadData,
}: FormProps) => {
  // Dispatch
  let dispatch = useDispatch();

  // City - Get
  const cityData: CityReadModel[] = useSelector<RootState>(
    ({ city }) => city.city,
    shallowEqual,
  ) as CityReadModel[];

  // City - Get
  useEffect(() => {
    dispatch(cityRedux.actions.requestCity());
  }, []);

  // Form
  const renderedForm = () => {
    return (
      <>
        <Formik
          initialValues={area}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // Save
              handleSave(values);
              // Submitting
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
                  Area Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.name!}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Area Name"
                  required
                />
                <DropDownList
                  label="City"
                  name="cityId"
                  data={cityData!}
                  idPropName="id"
                  valuePropName="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.cityId!}
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
  const handleSave = async (values: AreaWriteModel) => {
    // Save
    if (actionType == ActionTypeEnum.Create) {
      await AreaActions.createArea(values);
    } else if (actionType == ActionTypeEnum.Update) {
      await AreaActions.updateArea(values);
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
      {isShowModal && area && (
        <FormModalLayout
          headerTitle="Area"
          headerOnClose={handleClose}
          formContent={renderedForm()}
        />
      )}
    </>
  );
};

export default AreaForm;
