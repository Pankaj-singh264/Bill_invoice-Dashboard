import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';


export default function AddInventoryModal({ closeModal, onItemAdded }) {
  const {apiurl} = useAuth()
  const [form, setForm] = useState({
    ItemId: '',
    itemName: '',
    category: '',
    quantity: '',
    price: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post(`${apiurl}/inventory/add`, form);
      if (response.data.success) {
        onItemAdded();
        closeModal();
      } else {
        setError(response.data.message || 'Failed to add item. Please try again.');
      }
    } catch (error) {
      //console.error("Error adding item:", error);
      setError(error.response?.data?.message || 'Failed to add item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add New Item</h2>
          <button 
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Descriptive text */}
        <div className="px-4 pt-2 text-sm text-gray-500">
          Enter the item details below to add them to your inventory.
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label htmlFor="ItemId" className="block text-sm font-medium">
              Item ID*
            </label>
            <input
              type="text"
              id="ItemId"
              name="ItemId"
              value={form.ItemId}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter item ID"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="itemName" className="block text-sm font-medium">
              Item Name*
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Item name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="category" className="block text-sm font-medium">
                Category*
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. shirt, pants"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="quantity" className="block text-sm font-medium">
                Stocks available
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Quantity"
                min="0"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="price" className="block text-sm font-medium">
              Price / Unit*
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Amount"
              min="0"
              step="0.01"
            />
          </div>
          
          {/* Save button aligned to right */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded text-gray-700 mr-2 hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}