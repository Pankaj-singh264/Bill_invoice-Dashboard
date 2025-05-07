import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CustomerContext = createContext(null);
const API_URL = 'http://localhost:5000/api' || process.env.REACT_APP_API_URL ;

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/customers`);
      setCustomers(data);
      localStorage.setItem('customers', JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  // Add new customer
  const addCustomer = async (customerData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}/customers`, customerData);
      setCustomers(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add customer');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete customer
  const deleteCustomer = async (customerId) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/customers/${customerId}`);
      setCustomers(prev => prev.filter(customer => customer._id !== customerId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete customer');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete multiple customers
  const deleteMultipleCustomers = async (customerIds) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/customers/delete-multiple`, { ids: customerIds });
      setCustomers(prev => prev.filter(customer => !customerIds.includes(customer._id)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete customers');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update customer
  const updateCustomer = async (customerId, updatedData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${API_URL}/customers/${customerId}`, updatedData);
      setCustomers(prev => 
        prev.map(customer => customer._id === customerId ? data : customer)
      );
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update customer');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load customers on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const value = {
    customers,
    loading,
    error,
    addCustomer,
    deleteCustomer,
    deleteMultipleCustomers,
    updateCustomer,
    refreshCustomers: fetchCustomers
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};

export default CustomerContext;

