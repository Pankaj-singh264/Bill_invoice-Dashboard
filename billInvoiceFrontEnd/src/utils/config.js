// API Configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API = {
  AUTH: {
    REGISTER: `${BASE_URL}/user/register`,
    LOGIN: `${BASE_URL}/user/login`,
    LOGOUT: `${BASE_URL}/user/logout`,
    PROFILE: `${BASE_URL}/user/profile`,
    UPDATE: `${BASE_URL}/user/update`
  },
  CUSTOMERS: {
    BASE: `${BASE_URL}/customers`,
    GET_ALL: `${BASE_URL}/customers`,
    ADD: `${BASE_URL}/customers`,
    UPDATE: `${BASE_URL}/customers`,
    DELETE: `${BASE_URL}/customers`
  },
  INVOICES: {
    BASE: `${BASE_URL}/invoices`,
    ADD: `${BASE_URL}/invoices/addItem`,
    GET_ALL: `${BASE_URL}/invoices`,
    GET_BY_CUSTOMER: `${BASE_URL}/invoices/customer`
  },
  ITEMS: {
    BASE: `${BASE_URL}/items`,
    ADD: `${BASE_URL}/items`
  },
  INVENTORY: {
    BASE: `${BASE_URL}/inventory`,
    ADD: `${BASE_URL}/inventory`
  }
};

export default API; 