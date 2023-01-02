import { ServiceResponse } from '../../../common/interface/ServiceResponse';
import axiosAgent from '../../../config/axois-config';
import { LoginModel } from '../../login/models/LoginModel';
import { TokenModel } from '../../login/models/TokenModel';
import { ChangeNameModel } from '../../profile/models/ChangeNameModel';
import { ChangePasswordModel } from '../../profile/models/ChangePasswordModel';
import { UserReadModel } from '../models/UserReadModel';
import { UserWriteModel } from '../models/UserWriteModel';

// API URL
const API_URL = process.env.REACT_APP_API_URL + 'User';

// Action URL
export const GET_ALL_USERS = `${API_URL}/GetAllUsers`;
export const GET_USER = `${API_URL}/GetUser`;
export const CREATE_USER = `${API_URL}/CreateUser`;
export const UPDATE_USER = `${API_URL}/UpdateUser`;
export const DELETE_USER = `${API_URL}/DeleteUser`;
export const LOGIN = `${API_URL}/login`;
export const REQUEST_NEW_PASSWORD = `${API_URL}/RequestNewPassword`;
export const CHANGE_NAME = `${API_URL}/ChangeName`;
export const CHANGE_PASSWORD = `${API_URL}/ChangePassword`;

// Get All Users
export const getAllUsers = async () => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<UserReadModel[]>
  >(GET_ALL_USERS);
  return response;
};

// Get All Users
export const getUser = async (id: number) => {
  let response = await axiosAgent.requests.get<ServiceResponse<UserReadModel>>(
    GET_USER + '/' + id,
  );
  return response;
};

// Create User
export const createUser = async (user: UserWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<UserReadModel>>(
    CREATE_USER,
    user,
  );
  return response;
};

// Update User
export const updateUser = async (user: UserWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<UserReadModel>>(
    UPDATE_USER,
    user,
  );
  return response;
};

// Delete User
export const deleteUser = async (user: UserWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse>(
    DELETE_USER,
    user,
  );
  return response;
};

//#region Login

// Login
export const login = async (login: LoginModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<TokenModel>>(
    LOGIN,
    login,
  );
  return response;
};

// Request New Password
export const requestNewPassword = async (username: string) => {
  let response = await axiosAgent.requests.post<ServiceResponse>(
    REQUEST_NEW_PASSWORD + '?username=' + username,
    {},
  );
  console.log(username);
  return response;
};

//#endregion Login

//#region Profile

// Change Name
export const changeName = async (changeName: ChangeNameModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<string>>(
    CHANGE_NAME,
    changeName,
  );
  return response;
};

// Change Password
export const changePassword = async (changePassword: ChangePasswordModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<string>>(
    CHANGE_PASSWORD,
    changePassword,
  );
  return response;
};

//#endregion Profile
