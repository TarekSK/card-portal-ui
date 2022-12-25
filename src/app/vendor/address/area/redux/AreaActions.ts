import { ServiceResponse } from '../../../../../common/interface/ServiceResponse';
import axiosAgent from '../../../../../config/axois-config';
import { AreaReadModel } from '../models/AreaReadModel';
import { AreaWriteModel } from '../models/AreaWriteModel';

// API URL
const API_URL = process.env.REACT_APP_API_URL + 'Area';

// Action URL
export const GET_ALL_AREAS = `${API_URL}/GetAllAreas`;
export const GET_CITY_AREAS = `${API_URL}/GetCityAreas`;
export const GET_AREA = `${API_URL}/GetArea`;
export const CREATE_AREA = `${API_URL}/CreateArea`;
export const UPDATE_AREA = `${API_URL}/UpdateArea`;
export const DELETE_AREA = `${API_URL}/DeleteArea`;

// Get All Citites
export const getAllAreas = async () => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<AreaReadModel[]>
  >(GET_ALL_AREAS);
  return response;
};

// Get City Areas
export const getCityAreas = async (cityId: number) => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<AreaReadModel[]>
  >(GET_CITY_AREAS, cityId);
  return response;
};

// Create Area
export const createArea = async (area: AreaWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<AreaReadModel>>(
    CREATE_AREA,
    area,
  );
  return response;
};

// Update Area
export const updateArea = async (area: AreaWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<AreaReadModel>>(
    UPDATE_AREA,
    area,
  );
  return response;
};

// Delete Area
export const deleteArea = async (area: AreaWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse>(
    DELETE_AREA,
    area,
  );
  return response;
};
