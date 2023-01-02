import { Formik, useFormik, useFormikContext } from 'formik';
import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ActionTypeEnum from '../../../common/enum/ActionTypeEnum';
import { CardWriteModel } from '../models/CardWriteModel';
import * as CardActions from '../redux/CardActions';
import FormModalLayout from '../../../common/components/Form/FormModalLayout';
import FormModalFooter from '../../../common/components/Form/FormModalFooter';
import DropDownList from '../../../common/components/Form/DropDownList';
import { UserReadModel } from '../../user/models/UserReadModel';
import { RootState } from '../../../config/redux/RootReducer';
import * as userRedux from '../../user/redux/UserRedux';
import { convertEnumToObject } from '../../../common/helper/EnumToObject';
import CardTypeEnum from '../enum/CardTypeEnum';
import { DropDownListDataModel } from '../../../common/models/DropDownListDataModel';
import CardStateEnum from '../enum/CardStateEnum';
import CurrencyEnum from '../enum/CurrencyEnum';

interface FormProps {
  card: CardWriteModel;
  actionType: ActionTypeEnum;
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => {};
  reloadData: () => {};
}

const CardForm = ({
  card,
  actionType,
  isShowModal,
  setIsShowModal,
  reloadData,
}: FormProps) => {
  // Form Values
  // State
  const [isCurrency, setIsCurrency] = useState<boolean>(false);
  // Dispatch
  let dispatch = useDispatch();

  // User - Get
  const userData: UserReadModel[] = useSelector<RootState>(
    ({ user }) => user.user,
    shallowEqual,
  ) as UserReadModel[];

  // Card Type - Enum To Object
  const cardState: DropDownListDataModel[] = convertEnumToObject(CardStateEnum);
  // Card Type - Enum To Object
  const cardType: DropDownListDataModel[] = convertEnumToObject(CardTypeEnum);
  // Card Type - Enum To Object
  const currency: DropDownListDataModel[] = convertEnumToObject(CurrencyEnum);

  // User - Get
  useEffect(() => {
    dispatch(userRedux.actions.requestUser());
  }, []);

  // Formik - Init
  const formik = useFormik({
    initialValues: card,
    onSubmit: (values) => {
      console.log(values);
      // Save
      handleSave(values);
    },
  });

  useEffect(() => {
    // Handle Card Type Change
    handleCardTypeChange();
  }, [formik.values.type]);

  // Handle Card Type Change
  const handleCardTypeChange = () => {
    // Check If Card Type Is Currency
    if (formik.values.type == CardTypeEnum.Currency) {
      // Show Currency DropDownList
      setIsCurrency(true);
    } else {
      // Hide Currency DropDownList
      setIsCurrency(false);
      // Clear Currency Value
      formik.values.currency = CurrencyEnum.None;
    }
  };

  // Form
  const renderedForm = () => {
    return (
      <>
        <form onSubmit={formik.handleSubmit} className="mt-6">
          <div className="px-6 py-2">
            <DropDownList
              label="User"
              name="userId"
              data={userData!}
              idPropName="id"
              valuePropName="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.userId!}
              required
            />
          </div>
          <div className="px-6 py-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              minLength={16}
              maxLength={16}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.cardNumber!}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Card Number 16 Digit"
              required
            />
            {formik.errors.cardNumber &&
              formik.touched.cardNumber &&
              formik.errors.cardNumber}
          </div>
          <div className="px-6 py-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Valid
            </label>
            <input
              type="checkbox"
              id="valid"
              name="valid"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values?.valid!}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {formik.errors.valid && formik.touched.valid && formik.errors.valid}
          </div>
          <div className="px-6 py-2">
            <DropDownList
              label="Card State"
              name="state"
              data={cardState!}
              idPropName="id"
              valuePropName="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.state!}
              required
            />
          </div>
          <div className="px-6 py-2">
            <DropDownList
              label="Card Type"
              name="type"
              data={cardType!}
              idPropName="id"
              valuePropName="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.type!}
              required
            />
          </div>
          <div className="px-6 py-2 pb-4">
            {isCurrency && (
              <DropDownList
                label="Currency"
                name="currency"
                data={currency!}
                idPropName="id"
                valuePropName="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.currency!}
                required
              />
            )}
          </div>

          <FormModalFooter cancelButtonOnClick={handleClose} />
        </form>
      </>
    );
  };

  // Save
  const handleSave = async (values: CardWriteModel) => {
    // Save
    if (actionType == ActionTypeEnum.Create) {
      await CardActions.createCard(values);
    } else if (actionType == ActionTypeEnum.Update) {
      await CardActions.updateCard(values);
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
      {isShowModal && card && (
        <>
          <FormModalLayout
            headerTitle="Card"
            headerOnClose={handleClose}
            formContent={renderedForm()}
          />
        </>
      )}
    </>
  );
};

export default CardForm;
