import { ServiceResponse } from '../../../../../common/interface/ServiceResponse';
import axiosAgent from '../../../../../config/axois-config';
import { ContactReadModel } from '../models/ContactReadModel';
import { ContactWriteModel } from '../models/ContactWriteModel';

// API URL
const API_URL = process.env.REACT_APP_API_URL + 'Contact';

// Action URL
export const GET_VENDOR_CONTACTS = `${API_URL}/GetVendorContacts`;
export const GET_CONTACT = `${API_URL}/GetContact`;
export const CREATE_CONTACT = `${API_URL}/CreateContact`;
export const UPDATE_CONTACT = `${API_URL}/UpdateContact`;
export const DELETE_CONTACT = `${API_URL}/DeleteContact`;

// Get Vendor Contacts
export const getVendorContacts = async (vendorId: number) => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<ContactReadModel[]>
  >(GET_VENDOR_CONTACTS, vendorId);
  return response;
};

// Get Contact
export const getContact = async (contactId: number) => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<ContactReadModel[]>
  >(GET_CONTACT, contactId);
  return response;
};

// Create Contact
export const createContact = async (contact: ContactWriteModel) => {
  let response = await axiosAgent.requests.post<
    ServiceResponse<ContactReadModel>
  >(CREATE_CONTACT, contact);
  return response;
};

// Update Contact
export const updateContact = async (contact: ContactWriteModel) => {
  let response = await axiosAgent.requests.post<
    ServiceResponse<ContactReadModel>
  >(UPDATE_CONTACT, contact);
  return response;
};

// Delete Contact
export const deleteContact = async (contact: ContactWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse>(
    DELETE_CONTACT,
    contact,
  );
  return response;
};
