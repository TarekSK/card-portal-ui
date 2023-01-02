import React, { useState } from 'react';
import { FiCreditCard, FiLogIn, FiSend } from 'react-icons/fi';
import { login } from '../../../app/user/redux/UserActions';
import useToken from '../../../common/helper/user/useToken';
import HttpStatusCodeEnum from '../../../config/Http/HttpStatusCodeEnum';
import { LoginModel } from '../models/LoginModel';
import * as userActions from '../../user/redux/UserActions';
import { Link } from 'react-router-dom';
import Alert from '../../../common/components/Form/Alert';
import { ServiceResponse } from '../../../common/interface/ServiceResponse';

interface LoginProps {
  setUserToken: (userToken: string) => void;
  setUser: (id: number) => void;
}

const Login = ({ setUserToken, setUser }: LoginProps) => {
  // Token - Hook
  const { token, setToken } = useToken();

  // State - Login
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(true);

  // Switch Between Login and Request New Password - [RNP]
  const [isShowRNP, setIsShowRNP] = useState<boolean>(false);

  // State - Request New Password - [RNP]
  const [email, setEmail] = useState<string>();
  const [isShowAlertRNP, setIsShowAlertRNP] = useState<boolean>(false);
  const [alertTypeRNP, setAlertTypeRNP] = useState<string>();
  const [alertTextRNP, setAlertTextRNP] = useState<string>();

  // Login
  const handleSubmit = async (e: React.FormEvent) => {
    // Avoid Reload
    e.preventDefault();
    // Login - Model
    const loginData: LoginModel = { username, password };
    // Login - Post
    let result = await login(loginData);
    // Check Status Code
    if (result.statusCode == HttpStatusCodeEnum.Ok) {
      console.log(result);
      // Set Token
      await setUserToken(result.data.token);
      // Set User
      await setUser(result.data.userId);
      // Valid Credentials
      await setIsValid(true);
    } else {
      // Invalid Credentials
      await setIsValid(false);
    }
  };

  // Handle Request New Password
  const handleRequestNewPassword = async () => {
    // Request New Password - Show
    await setIsShowRNP(true);
  };

  // Handle Back To Login
  const handleBackToLogin = async () => {
    // Request New Password - Hide
    await setIsShowRNP(false);
  };

  // Handle Request New Password Click
  const onRequestNewPassword = async (e: React.FormEvent) => {
    // Avoid Reload
    e.preventDefault();

    // Request New Password - Post
    let result = await userActions.requestNewPassword(email!);

    // Check Status Code
    if (result.statusCode == HttpStatusCodeEnum.Ok) {
      // Alert Type - Success
      await setAlertTypeRNP('success');
      // Alert - Message
      await setAlertTextRNP('New Password Sent To Your Email Successfully');
    } else {
      // Alert Type - Danger
      await setAlertTypeRNP('danger');
      // Alert - Message
      await setAlertTextRNP('Something Went Wrong, Please Try Again Later');
    }

    // Alert - Show
    await setIsShowAlertRNP(true);
  };

  // Left Panel - Logo
  const renderedLeftPanel = () => {
    return (
      <>
        <div className="w-2/6 px-auto py-auto justify-center pt-20 bg-gradient-to-r from-slate-50 to-slate-200">
          <div className="lg:w-2/5 md:w-3/5 sm:w-4/5 mx-auto justify-center">
            <img
              src="\images\card.png"
              width={'70px'}
              className="align-middle"
            />
            <div className="text-5xl font-bold tracking-tight capitalize text-blue-700">
              Card Portal
            </div>
          </div>
        </div>
      </>
    );
  };

  // Login Form
  const renderedLoginForm = () => {
    return (
      <>
        {!isShowRNP && (
          <div className="w-4/6 my-auto items-center justify-center px-4 sm:px-6 lg:px-8 bg-blue-600">
            <div className="mx-auto lg:w-2/5 md:w-3/5 sm:w-4/5">
              <div>
                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-100">
                  Sign in
                </h2>
              </div>
              <form
                className="mt-8 space-y-6"
                onSubmit={async (e) => await handleSubmit(e)}
              >
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Email address"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <br />
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-200 py-2 px-4 text-sm font-medium text-blue-800 hover:bg-blue-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiLogIn />
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
              <div>
                {!isValid && (
                  <div
                    className="p-4 mt-7 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                    role="alert"
                  >
                    <span className="font-medium">Invalid Credentials</span>
                    <br />
                    Wrong Username or Password
                  </div>
                )}
              </div>
              <div className="mt-3 float-right">
                <button
                  type="button"
                  className="bg-transparent text-slate-50 font-medium text-sm"
                  onClick={() => handleRequestNewPassword()}
                >
                  Request New Password
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // Request New Password - Form
  const renderedRequestNewPasswordForm = () => {
    return (
      <>
        {isShowRNP && (
          <>
            <div className="w-4/6 my-auto items-center justify-center px-4 sm:px-6 lg:px-8 bg-blue-600">
              <div className="mx-auto lg:w-2/5 md:w-3/5 sm:w-4/5">
                <div>
                  <h2 className="text-center text-3xl font-bold tracking-tight text-gray-100">
                    Request New Password
                  </h2>
                </div>
                <form
                  className="mt-8 space-y-6"
                  onSubmit={async (e) => await onRequestNewPassword(e)}
                >
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter Your Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-200 py-2 px-4 text-sm font-medium text-blue-800 hover:bg-blue-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiSend />
                      </span>
                      Send Password
                    </button>
                  </div>
                </form>
                <div>
                  <Alert
                    type={alertTypeRNP!}
                    isShow={isShowAlertRNP}
                    setIsShow={(isShowAlertRNP: boolean) =>
                      setIsShowAlertRNP(isShowAlertRNP)
                    }
                    title="Request New Password"
                    text={alertTextRNP!}
                  />
                </div>
                <div className="mt-3 float-right">
                  <button
                    type="button"
                    className="bg-transparent text-slate-50 font-medium text-sm"
                    onClick={() => handleBackToLogin()}
                  >
                    Back To Login
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <div className="w-full h-screen flex bg-gradient-to-r bg-blue-600">
        {renderedLeftPanel()}
        {renderedLoginForm()}
        {renderedRequestNewPasswordForm()}
      </div>
    </>
  );
};

export default Login;
