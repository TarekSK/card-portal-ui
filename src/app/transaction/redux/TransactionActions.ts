import { ServiceResponse } from '../../../common/interface/ServiceResponse';
import axiosAgent from '../../../config/axois-config';
import { TransactionReadModel } from '../models/TransactionReadModel';
import { TransactionWriteModel } from '../models/TransactionWriteModel';

// API URL
const API_URL = process.env.REACT_APP_API_URL + 'Transaction';

// Action URL
export const GET_ALL_TRANSACTIONS = `${API_URL}/GetAllTransactions`;
export const GET_USER_TRANSACTIONS = `${API_URL}/GetUserTransactions`;
export const GET_TRANSACTION = `${API_URL}/GetTransaction`;
export const CREATE_TRANSACTION = `${API_URL}/CreateTransaction`;

// Get All Transactions
export const getAllTransactions = async () => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<TransactionReadModel[]>
  >(GET_ALL_TRANSACTIONS);
  return response;
};

// Get User Transactions
export const getUserTransactions = async (userId: number) => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<TransactionReadModel[]>
  >(GET_USER_TRANSACTIONS, userId);
  return response;
};

// Create Transaction
export const createTransaction = async (contacttype: TransactionWriteModel) => {
  let response = await axiosAgent.requests.post<
    ServiceResponse<TransactionReadModel>
  >(CREATE_TRANSACTION, contacttype);
  return response;
};
