import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HiX } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import {
  faTrash,
  faEllipsisV,
  faFileInvoice,
  faPlus,
  faSearch,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useCustomers } from "../contexts/CustomerContext";

export default function CustomerPage() {
  const navigate = useNavigate();

  const { customers, addCustomer, deleteCustomers, updateCustomer } = useCustomers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState(new Set());
  const [newCustomer, setNewCustomer] = useState({
    id: Date.now(),
    name: '',
    email: '',
    phone: '',
    address: '',
    balance: 0,
    cart: []
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingCustomer(null);
    setNewCustomer({
      id: Date.now(),
      name: '',
      email: '',
      phone: '',
      address: '',
      balance: 0,
      cart: []
    });
  };

  const handleCustomer = (currentCustomer) => {
    navigate('/home/productpurchase', {
      state: {
        customerData: currentCustomer
      }
    });
  };


  const handleCheckboxChange = (email) => {
    setSelectedCustomers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(email)) {
        newSelected.delete(email);
      } else {
        newSelected.add(email);
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = () => {
    deleteCustomers(selectedCustomers);
    setSelectedCustomers(new Set());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setNewCustomer({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      balance: customer.balance,
      cart: customer.cart || []
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) {
      alert('Please fill required fields');
      return;
    }

    if (isEditMode) {
      updateCustomer(newCustomer);
    } else {
      addCustomer(newCustomer);
    }

    // Reset form
    setNewCustomer({
      id: Date.now(),
      name: '',
      email: '',
      phone: '',
      address: '',
      balance: 0,
      cart: []
    });
    setIsEditMode(false);
    setEditingCustomer(null);
    setIsModalOpen(false);
  };

  const directPurchase = (e) => {
    e.preventDefault(); // Prevent form submission

    if (!newCustomer.name || !newCustomer.email) {
      alert('Please fill required fields');
      return;
    }

    // First add the customer
    addCustomer(newCustomer);

    // Then navigate to product purchase with the new customer data
    navigate('/home/productpurchase', {
      state: {
        customerData: newCustomer
      }
    });

    // Reset form and close modal
    setNewCustomer({
      id: Date.now(),
      name: '',
      email: '',
      phone: '',
      address: '',
      balance: 0,
      cart: []
    });
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 bg-white p-4 sm:p-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold">Customers ({filteredCustomers.length})</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Customer
            </button>
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search customer by name, email"
                className="w-full border rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-3 text-gray-400"
              />
            </div>
          </div>

          {/* Table or List */}
          <div className="border rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Customers Detail ({customers.length})
              </h2>
              <div className="hidden sm:flex gap-4">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer"
                  onClick={handleDeleteSelected} // Trigger delete on icon click
                />
                <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer" />
              </div>
            </div>

            {/* Table for larger screens */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Phone</th>
                    <th className="py-2 px-4">Address</th>
                    <th className="py-2 px-4">Balance</th>
                    <th className="py-2 px-4">Invoice</th>
                    <th className="py-2 px-4">Select</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.email} className="border-b hover:bg-gray-50 cursor-pointer" >
                      <td
                        onClick={() => handleCustomer(customer)}
                        className="py-2 px-4">{customer.name}</td>
                      <td className="py-2 px-4">{customer.email}</td>
                      <td className="py-2 px-4">{customer.phone}</td>
                      <td className="py-2 px-4">{customer.address}</td>
                      <td className="py-2 px-4">
                        <span className={`font-semibold ${customer.balance > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                          ₹{customer.balance || 0}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faFileInvoice} />
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.has(customer.email)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleCheckboxChange(customer.email);
                          }}
                        />
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="hover:text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(customer);
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button
                            className="hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCustomers(customer)

                              handleDeleteSelected(new Set([customer.email]));
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for mobile view */}
            <div className="sm:hidden flex flex-col gap-4">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.email}
                  className="border p-4 rounded-lg shadow-sm cursor-pointer"
                  onClick={() => handleCustomer(customer)}
                >
                  <h3 className="text-lg font-semibold mb-2">{customer.name}</h3>
                  <p className="text-sm"><span className="font-semibold">Email:</span> {customer.email}</p>
                  <p className="text-sm"><span className="font-semibold">Phone:</span> {customer.phone}</p>
                  <p className="text-sm"><span className="font-semibold">Address:</span> {customer.address}</p>
                  <p className="text-sm mt-2">
                    <span className="font-semibold">Balance:</span>
                    <span className={`ml-2 ${customer.balance > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                      ₹{customer.balance || 0}
                    </span>
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-semibold">Invoice:</span>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faFileInvoice} />
                    </div>
                  </div>
                  {/* Mobile delete icon */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="cursor-pointer mt-2"
                    onClick={() => handleDeleteSelected(customer)}
                  />
                  <FontAwesomeIcon
                    icon={faPen}
                    className="cursor-pointer mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(customer);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal for Add/Edit Customer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{isEditMode ? 'Edit Customer' : 'Add Customer'}</h2>
              <HiX className="cursor-pointer text-xl" onClick={handleCloseModal} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newCustomer.address}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Balance</label>
                <input
                  type="number"
                  name="balance"
                  value={newCustomer.balance}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="flex justify-between px-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm border rounded-lg"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border rounded-lg text-sm"
                  onClick={directPurchase}
                >
                  Add & Purchase
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  {isEditMode ? 'Update' : 'Add Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
