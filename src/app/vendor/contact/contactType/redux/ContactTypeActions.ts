import { ServiceResponse } from '../../../../../common/interface/ServiceResponse';
import axiosAgent from '../../../../../config/axois-config';
import { ContactTypeReadModel } from '../models/ContactTypeReadModel';
import { ContactTypeWriteModel } from '../models/ContactTypeWriteModel';

// API URL
const API_URL = process.env.REACT_APP_API_URL + 'ContactType';

// Action URL
export const GET_ALL_CONTACT_TYPES = `${API_URL}/GetAllContactTypes`;
export const GET_CONTACT_TYPE = `${API_URL}/GetContactType`;
export const CREATE_CONTACT_TYPE = `${API_URL}/CreateContactType`;
export const UPDATE_CONTACT_TYPE = `${API_URL}/UpdateContactType`;
export const DELETE_CONTACT_TYPE = `${API_URL}/DeleteContactType`;

// Get All Citites
export const getAllContactTypes = async () => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<ContactTypeReadModel[]>
  >(GET_ALL_CONTACT_TYPES);
  return response;
};

// Create ContactType
export const createContactType = async (contacttype: ContactTypeWriteModel) => {
  let response = await axiosAgent.requests.post<
    ServiceResponse<ContactTypeReadModel>
  >(CREATE_CONTACT_TYPE, contacttype);
  return response;
};

// Update ContactType
export const updateContactType = async (contacttype: ContactTypeWriteModel) => {
  let response = await axiosAgent.requests.post<
    ServiceResponse<ContactTypeReadModel>
  >(UPDATE_CONTACT_TYPE, contacttype);
  return response;
};

// Delete ContactType
export const deleteContactType = async (contacttype: ContactTypeWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse>(
    DELETE_CONTACT_TYPE,
    contacttype,
  );
  return response;
};
