import { ServiceResponse } from '../../../../common/interface/ServiceResponse';
import axiosAgent from '../../../../config/axois-config';
import { VendorReadModel } from '../models/VendorReadModel';
import { VendorWriteModel } from '../models/VendorWriteModel';

// API URL
const API_URL = process.env.REACT_APP_API_URL + 'Vendor';

// Action URL
export const GET_ALL_VENDORS = `${API_URL}/GetAllVendors`;
export const GET_VENDOR = `${API_URL}/GetVendor`;
export const CREATE_VENDOR = `${API_URL}/CreateVendor`;
export const UPDATE_VENDOR = `${API_URL}/UpdateVendor`;
export const DELETE_VENDOR = `${API_URL}/DeleteVendor`;

// Get All Vendors
export const getAllVendors = async () => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<VendorReadModel[]>
  >(GET_ALL_VENDORS);
  return response;
};

// Get Vendor
export const getVendor = async () => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<VendorReadModel>
  >(GET_VENDOR);
  return response;
};

// Create Vendor
export const createVendor = async (vendor: VendorWriteModel) => {
  let response = await axiosAgent.requests.post<
    ServiceResponse<VendorReadModel>
  >(CREATE_VENDOR, vendor);
  return response;
};

// Update Vendor
export const updateVendor = async (vendor: VendorWriteModel) => {
  let response = await axiosAgent.requests.post<
    ServiceResponse<VendorReadModel>
  >(UPDATE_VENDOR, vendor);
  return response;
};

// Delete Vendor
export const deleteVendor = async (vendor: VendorWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse>(
    DELETE_VENDOR,
    vendor,
  );
  return response;
};
