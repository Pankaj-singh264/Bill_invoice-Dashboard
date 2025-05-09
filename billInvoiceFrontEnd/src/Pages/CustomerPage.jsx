import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomer } from '../contexts/CustomerContext';
import { Edit, Trash2, X } from 'lucide-react';

const CustomerPage = () => {
  const navigate = useNavigate();
  const { customers, loading, error, updateCustomer, deleteCustomer } = useCustomer();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gstNumber: '',
    balance: 0,
    state: '',
    city: '',
    pincode: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Load customer data into form
  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
      gstNumber: customer.gstNumber || '',
      balance: customer.balance || 0,
      state: customer.state || '',
      city: customer.city || '',
      pincode: customer.pincode || '',
    });
    setIsModalOpen(true);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.phone) errors.phone = 'Phone is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.pincode) errors.pincode = 'Pincode is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updateCustomer(selectedCustomer._id, formData);
      setSubmitSuccess('Customer updated successfully!');
      setIsModalOpen(false);
      // Clear form and selected customer
      setSelectedCustomer(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        gstNumber: '',
        balance: 0,
        state: '',
        city: '',
        pincode: '',
      });
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to update customer');
    }
  };

  // Handle customer deletion
  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(customerId);
        setSubmitSuccess('Customer deleted successfully!');
      } catch (error) {
        setSubmitError('Failed to delete customer');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">Customer Management</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Messages */}
        {submitError && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            {submitError}
          </div>
        )}
        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
            {submitSuccess}
          </div>
        )}

        {/* Customers List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Customers</h2>
            </div>

            {loading ? (
              <div className="text-center py-4">Loading customers...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.gstNumber}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">{customer.phone}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">{customer.address}</div>
                          <div className="text-sm text-gray-500">{customer.city}, {customer.state}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">₹{customer.balance || 0}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditCustomer(customer)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteCustomer(customer._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Customer</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedCustomer(null);
                  setFormErrors({});
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone*</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">GST Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address*</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                  />
                  {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">State*</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full border ${formErrors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                  />
                  {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">City*</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                  />
                  {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Pincode*</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`w-full border ${formErrors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                  />
                  {formErrors.pincode && <p className="text-red-500 text-xs mt-1">{formErrors.pincode}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Balance</label>
                  <input
                    type="number"
                    name="balance"
                    value={formData.balance}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedCustomer(null);
                    setFormErrors({});
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
