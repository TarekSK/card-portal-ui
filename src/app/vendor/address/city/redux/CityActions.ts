import { ServiceResponse } from '../../../../../common/interface/ServiceResponse';
import axiosAgent from '../../../../../config/axois-config';
import { CityReadModel } from '../models/CityReadModel';
import { CityWriteModel } from '../models/CityWriteModel';

// API URL
const API_URL = process.env.REACT_APP_API_URL + 'City';

// Action URL
export const GET_ALL_CITIES = `${API_URL}/GetAllCities`;
export const GET_CITY = `${API_URL}/GetCity`;
export const CREATE_CITY = `${API_URL}/CreateCity`;
export const UPDATE_CITY = `${API_URL}/UpdateCity`;
export const DELETE_CITY = `${API_URL}/DeleteCity`;

// Get All Citites
export const getAllCities = async () => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<CityReadModel[]>
  >(GET_ALL_CITIES);
  return response;
};

// Create City
export const createCity = async (city: CityWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<CityReadModel>>(
    CREATE_CITY,
    city,
  );
  return response;
};

// Update City
export const updateCity = async (city: CityWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<CityReadModel>>(
    UPDATE_CITY,
    city,
  );
  return response;
};

// Delete City
export const deleteCity = async (city: CityWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse>(
    DELETE_CITY,
    city,
  );
  return response;
};
