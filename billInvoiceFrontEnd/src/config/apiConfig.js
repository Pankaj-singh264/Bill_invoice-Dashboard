const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000';

export const API_ENDPOINTS = {
  AUTH: {
    BASE: `${BASE_URL}/api/user`,
    LOGIN: `${BASE_URL}/api/user/login`,
    REGISTER: `${BASE_URL}/api/user/register`,
    PROFILE: `${BASE_URL}/api/user/profile`,
    UPDATE: `${BASE_URL}/api/user/update`,
  },
  PRODUCTS: {
    BASE: `${BASE_URL}/api/items`,
    ADD: `${BASE_URL}/api/items/addItem`,
    GET_ALL: `${BASE_URL}/api/items/getItems`,
    UPDATE: `${BASE_URL}/api/items/updateItem`,
    DELETE: `${BASE_URL}/api/items/deleteItem`,
  },
  INVOICES: {
    BASE: `${BASE_URL}/api/invoices`,
    CREATE: `${BASE_URL}/api/invoices/create`,
    GET_ALL: `${BASE_URL}/api/invoices/all`,
    GET_BY_ID: `${BASE_URL}/api/invoices/get`,
  },
  CUSTOMERS: {
    BASE: `${BASE_URL}/api/customers`,
    ADD: `${BASE_URL}/api/customers/add`,
    GET_ALL: `${BASE_URL}/api/customers/all`,
  }
};