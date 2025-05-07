import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEllipsisV,
  faFileInvoice,
  faPlus,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useCustomers } from "../contexts/CustomerContext";
import AddCustomerModal from "./AddCustomerModal";
import CustomerInvoiceModal from "./CustomerInvoiceModal";

export default function CustomerPage() {
  const navigate = useNavigate();
  const { 
    customers, 
    loading, 
    error,
    addCustomer,
    deleteCustomer,
    deleteMultipleCustomers,
    updateCustomers 
  } = useCustomers();

  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState(new Set());

  // Filter customers based on search
  const filteredCustomers = customers?.filter(customer =>
    customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Event Handlers
  const handleDeleteSingle = async (customerId, e) => {
    e?.stopPropagation();
    try {
      await deleteCustomer(customerId);
      setSelectedCustomers(prev => {
        const newSelected = new Set(prev);
        newSelected.delete(customerId);
        return newSelected;
      });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

// const handleUpdate = async (customerId, updatedData, e) => {
//   e?.stopPropagation();
//   try {
//     await updateCustomers(customerId, updatedData);
//   } catch (error) {
//     console.error("Update failed:", error);
//   }
// };

  const handleDeleteSelected = async () => {
    if (selectedCustomers.size === 0) return;
    try {
      await deleteMultipleCustomers(Array.from(selectedCustomers));
      setSelectedCustomers(new Set());
    } catch (error) {
      console.error("Bulk delete failed:", error);
    }
  };

  const handleCheckboxChange = (customerId, e) => {
    e?.stopPropagation();
    setSelectedCustomers(prev => {
      const newSelected = new Set(prev);
      newSelected.has(customerId) ? newSelected.delete(customerId) : newSelected.add(customerId);
      return newSelected;
    });
  };

  const handleCustomerClick = (customer) => {
    navigate('/productpurchase', { state: { customerData: customer } });
  };

  const handleOpenInvoiceModal = (customer, e) => {
    e?.stopPropagation();
    setSelectedCustomer(customer);
    setIsInvoiceModalOpen(true);
  };

  const handleCustomerAdded = async (customerData) => {
    try {
      await addCustomer(customerData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Add customer failed:", error.message);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 bg-white p-4 sm:p-6">
        {/* Header with Add Customer Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Customers ({filteredCustomers.length})
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Customer
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Customer List Section */}
        <div className="border rounded p-4">
          {/* Bulk Delete Header */}
          {selectedCustomers.size > 0 && (
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={handleDeleteSelected}
                className="flex items-center text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Delete Selected ({selectedCustomers.size})
              </button>
            </div>
          )}

          {/* Loading and Error States */}
          {loading && (
            <div className="flex justify-center py-8">
              <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-2xl" />
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Customer Table */}
          {!loading && !error && (
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Select</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr 
                      key={customer._id}
                      onClick={() => handleCustomerClick(customer)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{customer.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => handleOpenInvoiceModal(customer, e)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FontAwesomeIcon icon={faFileInvoice} />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => handleDeleteSingle(customer._id, e)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.has(customer._id)}
                          onChange={(e) => handleCheckboxChange(customer._id, e)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile View */}
          {/* ... Your existing mobile view code ... */}
        </div>
      </main>

      {/* Modals */}
      {isModalOpen && (
        <AddCustomerModal
          onClose={() => setIsModalOpen(false)}
          onCustomerAdded={handleCustomerAdded}
        />
      )}

      {isInvoiceModalOpen && selectedCustomer && (
        <CustomerInvoiceModal
          customer={selectedCustomer}
          onClose={() => setIsInvoiceModalOpen(false)}
        />
      )}
    </div>
  );
}
