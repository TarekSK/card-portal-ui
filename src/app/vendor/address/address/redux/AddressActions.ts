import { ServiceResponse } from '../../../../../common/interface/ServiceResponse';
import axiosAgent from '../../../../../config/axois-config';
import { AddressReadModel } from '../models/AddressReadModel';
import { AddressWriteModel } from '../models/AddressWriteModel';

// API URL
const API_URL = process.env.REACT_APP_API_URL + 'Address';

// Action URL
export const GET_VENDOR_ADDRESSS = `${API_URL}/GetVendorAddresss`;
export const GET_ADDRESS = `${API_URL}/GetAddress`;
export const CREATE_ADDRESS = `${API_URL}/CreateAddress`;
export const UPDATE_ADDRESS = `${API_URL}/UpdateAddress`;
export const DELETE_ADDRESS = `${API_URL}/DeleteAddress`;

// Get All Addresss
export const getVendorAddresses = async (vendorId: number) => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<AddressReadModel[]>
  >(GET_VENDOR_ADDRESSS, vendorId);
  return response;
};

// Get All Addresss
export const getAddress = async (addressId: number) => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<AddressReadModel>
  >(GET_ADDRESS, addressId);
  return response;
};

// Create Address
export const createAddress = async (address: AddressWriteModel) => {
  let response = await axiosAgent.requests.post<
    ServiceResponse<AddressReadModel>
  >(CREATE_ADDRESS, address);
  return response;
};

// Update Address
export const updateAddress = async (address: AddressWriteModel) => {
  let response = await axiosAgent.requests.post<
    ServiceResponse<AddressReadModel>
  >(UPDATE_ADDRESS, address);
  return response;
};

// Delete Address
export const deleteAddress = async (address: AddressWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse>(
    DELETE_ADDRESS,
    address,
  );
  return response;
};
