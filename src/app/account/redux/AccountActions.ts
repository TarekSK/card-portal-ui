import { ServiceResponse } from '../../../common/interface/ServiceResponse';
import axiosAgent from '../../../config/axois-config';
import { AccountReadModel } from '../models/AccountReadModel';
import { AccountWriteModel } from '../models/AccountWriteModel';

// API URL
const API_URL = process.env.REACT_APP_API_URL + 'Account';

// Action URL
export const GET_ALL_ACCOUNTS = `${API_URL}/GetAllAccounts`;
export const GET_USER_ACCOUNTS = `${API_URL}/GetUserAccounts`;
export const GET_ACCOUNT = `${API_URL}/GetAccount`;
export const CREATE_ACCOUNT = `${API_URL}/CreateAccount`;
export const UPDATE_ACCOUNT = `${API_URL}/UpdateAccount`;
export const DELETE_ACCOUNT = `${API_URL}/DeleteAccount`;

// Get All Accounts
export const getAllAccounts = async () => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<AccountReadModel[]>
  >(GET_ALL_ACCOUNTS);
  return response;
};

// Get All Accounts
export const getUserAccounts = async (userId: number) => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<AccountReadModel[]>
  >(GET_USER_ACCOUNTS, userId);
  return response;
};

// Create Account
export const createAccount = async (contacttype: AccountWriteModel) => {
  let response = await axiosAgent.requests.post<
    ServiceResponse<AccountReadModel>
  >(CREATE_ACCOUNT, contacttype);
  return response;
};

// Update Account
export const updateAccount = async (contacttype: AccountWriteModel) => {
  let response = await axiosAgent.requests.post<
    ServiceResponse<AccountReadModel>
  >(UPDATE_ACCOUNT, contacttype);
  return response;
};

// Delete Account
export const deleteAccount = async (contacttype: AccountWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse>(
    DELETE_ACCOUNT,
    contacttype,
  );
  return response;
};
