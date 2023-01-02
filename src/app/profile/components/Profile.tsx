import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { RootState } from '../../../config/redux/RootReducer';
import DataViewHeader from '../../../common/components/DataView/DataViewHeader';
import * as userRedux from '../../user/redux/UserRedux';
import * as userActions from '../../user/redux/UserActions';
import { Formik } from 'formik';
import { ChangeNameModel } from '../models/ChangeNameModel';
import { ChangePasswordModel } from '../models/ChangePasswordModel';
import { UserReadModel } from '../../user/models/UserReadModel';
import HttpStatusCodeEnum from '../../../config/Http/HttpStatusCodeEnum';
import { Loader } from '../../../common/components/Loader';
import { UserWriteModel } from '../../user/models/UserWriteModel';
import Alert from '../../../common/components/Form/Alert';
import useToken from '../../../common/helper/user/useToken';

// State
const mapState = (state: RootState) => ({
  contactType: state.contactType,
});

// Connector
const connector = connect(mapState, userRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Profile
const Profile: FC<PropsFromRedux> = () => {
  // Token - Hook
  const { getUser } = useToken();

  // User Model - Default
  const userModelDefault: UserReadModel = {
    id: 0,
    lastName: '',
    firstName: '',
    username: '',
    password: '',
  };

  // State - User
  const [user, setUser] = useState<UserReadModel>(userModelDefault);
  // State - Loading
  const [isLoading, setIsLoading] = useState<boolean>();
  // State - Name Changed
  const [nameChanged, setNameChanged] = useState<boolean>(false);
  // State - Password Changed
  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);

  // User Id - Get
  const getUserId = () => {
    return getUser();
  };

  // User - Get
  const getUserData = async () => {
    // Loading - Start
    setIsLoading(true);

    // UserId - Get
    const userId: number = getUserId();

    // User - Get
    const userData = await userActions.getUser(userId);

    // User State, Default - Set
    if (userData.statusCode == HttpStatusCodeEnum.Ok) {
      // User - State - Set
      await setUser(userData.data);
    }

    // Loading - Stop
    setIsLoading(false);
  };

  // User - Get
  useEffect(() => {
    getUserData();
  }, []);

  // Change Name - Default
  const changeNameDefaultValues: ChangeNameModel = {
    id: user!.id,
    lastName: user!.lastName,
    firstName: user!.firstName,
  };

  // Change Password - Default
  const changePasswordDefaultValues: ChangePasswordModel = {
    id: user!.id,
    password: user!.password,
  };

  // Change Name - Save
  const handleChangeNameSave = async (changeNameValues: ChangeNameModel) => {
    // Change Name
    const result = await userActions.changeName(changeNameValues);
    // Check Result
    if (result.statusCode == HttpStatusCodeEnum.Ok) {
      // Set Name Changed - True
      setNameChanged(true);
    }
  };

  // Change Password - Save
  const handleChangePasswordSave = async (
    changePasswordValues: ChangePasswordModel,
  ) => {
    // Change Password
    const result = await userActions.changePassword(changePasswordValues);
    // Check Result
    if (result.statusCode == HttpStatusCodeEnum.Ok) {
      // Set Password Changed - True
      setPasswordChanged(true);
    }
  };

  // Change Name - Form
  const renderedChangeNameForm = () => {
    return (
      <>
        <Formik
          initialValues={changeNameDefaultValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // Change Name -Save
              handleChangeNameSave(values);
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
          }) => (
            <>
              <div>
                <form className="mt-6" onSubmit={handleSubmit}>
                  <div className="px-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      maxLength={25}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.lastName!}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Last Name"
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
                      maxLength={25}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.firstName!}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="px-6 py-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
                <Alert
                  type="success"
                  isShow={nameChanged}
                  title="Last, Fist Name Change"
                  text="Last & First Name Changed Successfully"
                />
              </div>
            </>
          )}
        </Formik>
      </>
    );
  };

  // Change Password - Form
  const renderedChangPasswordForm = () => {
    return (
      <>
        <Formik
          initialValues={changePasswordDefaultValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // Change Password -Save
              handleChangePasswordSave(values);
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
          }) => (
            <>
              <div>
                <form className="mt-6" onSubmit={handleSubmit}>
                  <div className="px-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      maxLength={25}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.password!}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="px-6 py-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
                <Alert
                  type="success"
                  isShow={passwordChanged}
                  title="Password Change"
                  text="Password Changed Successfully"
                />
              </div>
            </>
          )}
        </Formik>
      </>
    );
  };

  return (
    <div className="flex-auto w-96">
      <Loader loading={isLoading}>
        <DataViewHeader title="Profile" isCreate={false} />

        <div className="flex">
          <div className="w-2/4 p-6 ml-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Change Last, First Name
            </h5>
            {renderedChangeNameForm()}
          </div>
          <div className="w-2/4 p-6 ml-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Change Password
            </h5>
            {renderedChangPasswordForm()}
          </div>
        </div>
      </Loader>
    </div>
  );
};

export default connector(Profile);
