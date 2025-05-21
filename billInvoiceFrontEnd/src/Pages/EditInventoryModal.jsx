import { useState, useEffect } from 'react';
import axios from 'axios';

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function EditInventoryModal({ item, closeModal, onItemUpdated }) {
  const [form, setForm] = useState({
    ItemId: '',
    itemName: '',
    category: '',
    quantity: '',
    price: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setForm({
        ItemId: item.ItemId || '',
        itemName: item.itemName || '',
        category: item.category || '',
        quantity: item.quantity || '',
        price: item.price || ''
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // await axios.put(`http://localhost:5000/api/inventory/${item._id}`, form);
      await axios.put(`${API_URL}/${item._id}`, form);
      onItemUpdated();
      closeModal();
    } catch (error) {
      console.error("Error updating item:", error);
      setError('Failed to update item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Edit Item</h2>
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
          Update the item details below.
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
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}