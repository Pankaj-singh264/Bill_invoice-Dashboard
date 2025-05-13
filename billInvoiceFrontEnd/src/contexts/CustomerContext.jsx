import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

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
  const { apiUrl } = useAuth();

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/customers`);
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
      // Ensure phoneNumber is a string
      const formattedData = {
        ...customerData,
        phoneNumber: customerData.phoneNumber.toString(),
        balance: customerData.balance || 0
      };

      const response = await axios.post(`${apiUrl}/customers`, formattedData);
      
      if (response.data.success) {
        setCustomers(prev => [...prev, response.data.data]);
        return response.data.data;
      } else {
        throw new Error(response.data.error || 'Failed to add customer');
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      const errorMessage = error.response?.data?.error || error.message;
      throw new Error(errorMessage);
    }
  };

  const updateCustomer = async (customerId, customerData) => {
    try {
      const response = await axios.put(`${apiUrl}/customers/${customerId}`, customerData);
      if (response.data.success) {
        setCustomers(prev => 
          prev.map(customer => 
            customer._id === customerId ? response.data.data : customer
          )
        );
        return response.data.data;
      } else {
        throw new Error(response.data.error || 'Failed to update customer');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      const errorMessage = error.response?.data?.error || error.message;
      throw new Error(errorMessage);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      const response = await axios.delete(`${apiUrl}/customers/${customerId}`);
      if (response.data.success) {
        setCustomers(prev => prev.filter(customer => customer._id !== customerId));
      } else {
        throw new Error(response.data.error || 'Failed to delete customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      const errorMessage = error.response?.data?.error || error.message;
      throw new Error(errorMessage);
    }
  };

  const getCustomerById = (customerId) => {
    return customers.find(customer => customer._id === customerId);
  };

  useEffect(() => {
    fetchCustomers();
  }, [apiUrl]);

  const value = {
    customers,
    loading,
    error,
    setLoading,
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

