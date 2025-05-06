// import React, { useState } from 'react';
// import axios from 'axios';

// const AddCustomerModal = ({ onClose, onCustomerAdded }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log('Form Data:', formData);  // Debugging line to check form data
      
//       const response = await axios.post('http://localhost:5000/api/customer', formData);
//       onCustomerAdded(response.data);  // Passing data to parent component
//       onClose();  // Close the modal after adding customer
//     } catch (error) {
//       console.error('Error adding customer:', error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md opacity-100">
//         <h2 className="text-lg font-semibold text-gray-800">Add New Customer</h2>
//         <p className="text-sm text-gray-500 mb-4">
//           Enter the customer details below to add them to your system.
//         </p>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Individual name"
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="xxxxxx@example.com"
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Phone <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="789651233"
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Address <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="KhandGao, Near RTO office"
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//         <div className="mt-6 flex justify-end space-x-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Add Customer
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
//           >
//             Add Products
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCustomerModal;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCustomerModal = ({ onClose, onCustomerAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Simple validation to ensure required fields are filled
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setError('Please fill in all required fields');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      console.log('Form Data:', formData);  // Debugging line to check form data
      
      const response = await axios.post('http://localhost:5000/api/customer', formData);
      onCustomerAdded(response.data);  // Passing data to parent component
      onClose();  // Close the modal after adding customer
    } catch (error) {
      console.error('Error adding customer:', error);
      setError('Failed to add customer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddProducts = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // First save the customer to get the ID and complete data
      const response = await axios.post('http://localhost:5000/api/customer', formData);
      const customerData = response.data;
      
      // Notify parent component that customer was added
      onCustomerAdded(customerData);
      
      // Close the modal
      onClose();
      
      // Navigate to product purchase page with this customer's data
      navigate('/productpurchase', {
        state: { customerData }
      });
    } catch (error) {
      console.error('Error adding customer:', error);
      setError('Failed to add customer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 bg-black flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md opacity-100">
        <h2 className="text-lg font-semibold text-gray-800">Add New Customer</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter the customer details below to add them to your system.
        </p>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Individual name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="xxxxxx@example.com"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="789651233"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="KhandGao, Near RTO office"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isSubmitting ? 'Adding...' : 'Add Customer'}
          </button>
          <button
            onClick={handleAddProducts}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
          >
            {isSubmitting ? 'Processing...' : 'Add Products'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;