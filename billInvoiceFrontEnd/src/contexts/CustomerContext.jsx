import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerContext = createContext(null); // Initialize with null

export const  useCustomers = () => {
  const context = useContext(CustomerContext);
  const navigate = useNavigate()
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};

export function CustomerProvider({ children }) {
  const customersList = [
    {
      id: 1,
      name: "Rishu Rawat",
      email: "rr889985@gmail.com",
      phone: "7895613233",
      address: "KhandGaon, Rishikesh",
      balance: 0, // Add initial balance
      cart: [
        {
          item: "Laptop",
          id: Date.now() + Math.random(),
          price: 1200,
          qty: 1,
          discount:10

        },
        {
          item: "Smartphone",
          id: Date.now() + Math.random(),
          price: 800,
          qty: 1,
          discount:10

        }
      ]
    },
    {
      id: 2,
      name: "Robert Fox",
      email: "robert@example.com",
      phone: "7895613233",
      address: "KhandGaon, Rishikesh",
      balance: 0, // Add initial balance
      cart: [
        {
          item: "Wireless Headphones",
          id: Date.now() + Math.random(),
          price: 150,
          qty: 2,
          discount:10

        },
        {
          item: "Smartwatch",
          id: Date.now() + Math.random(),
          price: 250,
          qty: 1,
          discount: 15,
          total: 212.5
        }
      ]
    },
    {
      id: 3,
      name: "Jane Cooper",
      email: "jane@example.com",
      phone: "7895613233",
      address: "KhandGaon, Rishikesh",
      balance: 0, // Add initial balance
      cart: [
        {
          item: "4K Television",
          id: Date.now() + Math.random(),
          price: 900,
          qty: 1,
          discount:10

        },
        {
          item: "Soundbar",
          id: Date.now() + Math.random(),
          price: 300,
          qty: 1,
          discount:10

        }
      ]
    },
    {
      id: 4,
      name: "Wade Warren",
      email: "wade@example.com",
      phone: "7895613233",
      address: "KhandGaon, Rishikesh",
      balance: 0, // Add initial balance
      cart: [
        {
          item: "Gaming Console",
          id: Date.now() + Math.random(),
          price: 500,
          qty: 1,
          discount:10

        },
        {
          item: "Controller",
          id: Date.now() + Math.random(),
          price: 60,
          qty: 2,
          discount:10

        }
      ]
    },
    {
      id: 5,
      name: "Esther Howard",
      email: "esther@example.com",
      phone: "7895613233",
      address: "KhandGaon, Rishikesh",
      balance: 0, // Add initial balance
      cart: [
        {
          item: "Fitness Tracker",
          id: Date.now() + Math.random(),
          price: 80,
          qty: 3,
          discount:10

        },
        {
          item: "Yoga Mat",
          id: Date.now() + Math.random(),
          price: 25,
          qty: 2,
          discount:10

        }
      ]
    }
  ];

  const [customers, setCustomers] = useState(customersList)
  localStorage.setItem('customers', JSON.stringify(customers))

  const addCustomer = (newCustomer) => {
    const updatedCustomers = [newCustomer, ...customers];
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
  };

  const deleteCustomers = (emailsToDelete) => {
    const updatedCustomers = customers.filter(
      (customer) => !emailsToDelete.has(customer.email)
    );
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    return updatedCustomers;
  };
  const updateCustomer = (updatedCustomer) => {
    const updatedCustomers = customers.map(customer =>
      customer.email === updatedCustomer.email ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
  };

  const getCustomerByEmail = (email) => {
    return customers.find(customer => customer.email === email);
  };

  const updateCustomerBalance = (email, newBalance) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => 
        customer.email === email 
          ? { ...customer, balance: newBalance }
          : customer
      )
    );
  };

  const value = {
    customers,
    addCustomer,
    deleteCustomers,
    updateCustomer,
    getCustomerByEmail,
    updateCustomerBalance
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}