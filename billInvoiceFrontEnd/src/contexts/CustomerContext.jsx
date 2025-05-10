import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CustomerContext = createContext();

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api' || import.meta.env.REACT_APP_API_URL;

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/customers`);
      setCustomers(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (customerData) => {
    try {
      const response = await axios.post(`${API_URL}/customers`, customerData);
      setCustomers(prev => [...prev, response.data.data]);
      return response.data.data;
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  };

  const updateCustomer = async (customerId, customerData) => {
    try {
      const response = await axios.put(`${API_URL}/customers/${customerId}`, customerData);
      setCustomers(prev => 
        prev.map(customer => 
          customer._id === customerId ? response.data.data : customer
        )
      );
      return response.data.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      await axios.delete(`${API_URL}/customers/${customerId}`);
      setCustomers(prev => prev.filter(customer => customer._id !== customerId));
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  };

  const getCustomerById = (customerId) => {
    return customers.find(customer => customer._id === customerId);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const value = {
    customers,
    loading,
    error,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

