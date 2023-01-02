import { ServiceResponse } from '../../../common/interface/ServiceResponse';
import axiosAgent from '../../../config/axois-config';
import { CardReadModel } from '../models/CardReadModel';
import { CardWriteModel } from '../models/CardWriteModel';

// API URL
const API_URL = process.env.REACT_APP_API_URL + 'Card';

// Action URL
export const GET_ALL_CARDS = `${API_URL}/GetAllCards`;
export const GET_USER_CARDS = `${API_URL}/GetUserCards`;
export const GET_CARD = `${API_URL}/GetCard`;
export const CREATE_CARD = `${API_URL}/CreateCard`;
export const UPDATE_CARD = `${API_URL}/UpdateCard`;
export const DELETE_CARD = `${API_URL}/DeleteCard`;

// Get All Cards
export const getAllCards = async () => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<CardReadModel[]>
  >(GET_ALL_CARDS);
  return response;
};

// Get User Cards
export const getUserCards = async (cardId: number) => {
  let response = await axiosAgent.requests.get<
    ServiceResponse<CardReadModel[]>
  >(GET_USER_CARDS, cardId);
  return response;
};

// Create Card
export const createCard = async (card: CardWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<CardReadModel>>(
    CREATE_CARD,
    card,
  );
  return response;
};

// Update Card
export const updateCard = async (card: CardWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse<CardReadModel>>(
    UPDATE_CARD,
    card,
  );
  return response;
};

// Delete Card
export const deleteCard = async (card: CardWriteModel) => {
  let response = await axiosAgent.requests.post<ServiceResponse>(
    DELETE_CARD,
    card,
  );
  return response;
};
