import { ServiceResponse } from '../../../common/interface/ServiceResponse';
import axiosAgent from '../../../config/axois-config';
import { UserReadModel } from '../models/UserReadModel';
import { UserWriteModel } from '../models/UserWriteModel';

// API URL
const API_URL = process.env.REACT_APP_API_URL + 'User';

// Action URL
export const GET_ALL_USERS = `${API_URL}/GetAllUsers`;
export const GET_CITY = `${API_URL}/GetUser`;
export const CREATE_CITY = `${API_URL}/CreateUser`;
export const UPDATE_CITY = `${API_URL}/UpdateUser`;
export const DELETE_CITY = `${API_URL}/DeleteUser`;

// Get All Citites
export const getAllUsers = async () => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<UserReadModel[]>
  >(GET_ALL_USERS);
  return response;
};

// Create User
export const createUser = async (user: UserWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<UserReadModel>>(
    CREATE_CITY,
    user,
  );
  return response;
};

// Update User
export const updateUser = async (user: UserWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<UserReadModel>>(
    UPDATE_CITY,
    user,
  );
  return response;
};

// Delete User
export const deleteUser = async (user: UserWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse>(
    DELETE_CITY,
    user,
  );
  return response;
};
