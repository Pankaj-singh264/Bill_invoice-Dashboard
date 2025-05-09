import { useState, useEffect } from 'react';
import { HiPencil, HiTrash, HiDotsVertical, HiPlus, HiSearch } from 'react-icons/hi';
import axios from 'axios';
import AddInventoryModal from '../Pages/AddInventoryModal';
import EditInventoryModal from '../Pages/EditInventoryModal';

const API_URL = 'http://localhost:9000/api' || import.meta.env.REACT_APP_API_URL;

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, itemId: null });
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    stock: 'all',
    category: 'all',
    priceRange: 'all',
    sortBy: 'name-asc'
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/inventory`);
      setInventoryItems(Array.isArray(res.data) ? res.data : []);
      setError(null);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to load inventory items. Please try again later.");
      setInventoryItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilters && !event.target.closest('.filters-dropdown')) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilters]);

  const getStatusClass = (quantity) => {
    if (quantity === undefined || quantity === null) return "bg-gray-100 text-gray-800";
    
    if (quantity <= 0) {
      return "bg-red-100 text-red-800";
    } else if (quantity < 10) {
      return "bg-yellow-100 text-yellow-800";
    } else {
      return "bg-green-100 text-green-800";
    }
  };

  const getStatusText = (quantity) => {
    if (quantity === undefined || quantity === null) return "Unknown";
    
    if (quantity <= 0) {
      return "Out of stock";
    } else if (quantity < 10) {
      return "Low stock";
    } else {
      return "In stock";
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/inventory/${itemId}`);
      fetchItems(); // Refresh the list after deletion
      setDeleteConfirmation({ isOpen: false, itemId: null });
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const confirmDelete = (itemId) => {
    setDeleteConfirmation({ isOpen: true, itemId });
  };

  const filterByStock = (items) => {
    switch (filters.stock) {
      case 'in-stock':
        return items.filter(item => item.quantity > 10);
      case 'low-stock':
        return items.filter(item => item.quantity > 0 && item.quantity <= 10);
      case 'out-stock':
        return items.filter(item => item.quantity <= 0);
      default:
        return items;
    }
  };

  const filterByCategory = (items) => {
    return filters.category === 'all' 
      ? items 
      : items.filter(item => item.category === filters.category);
  };

  const filterByPrice = (items) => {
    switch (filters.priceRange) {
      case 'under-1000':
        return items.filter(item => item.price < 1000);
      case '1000-9000':
        return items.filter(item => item.price >= 1000 && item.price <= 9000);
      case 'over-9000':
        return items.filter(item => item.price > 9000);
      default:
        return items;
    }
  };

  const sortItems = (items) => {
    switch (filters.sortBy) {
      case 'name-asc':
/* The code is creating a new array by spreading the items array and then sorting the new array based
on the itemName property of each object using the localeCompare method for string comparison. */
        return [...items].sort((a, b) => a.itemName.localeCompare(b.itemName));
      case 'name-desc':
        return [...items].sort((a, b) => b.itemName.localeCompare(a.itemName));
      case 'price-asc':
        return [...items].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...items].sort((a, b) => b.price - a.price);
      default:
        return items;
    }
  };

/* The above code is filtering and sorting inventory items based on various criteria. It first filters
the inventory items based on a search query that matches the item's name, category, or ID. Then it
filters the items by stock availability, category, and price. Finally, it sorts the filtered items. */
  const filteredItems = sortItems(
    filterByPrice(
      filterByCategory(
        filterByStock(
          inventoryItems.filter(item => {
            const searchLower = searchQuery.toLowerCase();
            return (
              item?.itemName?.toLowerCase().includes(searchLower) ||
              item?.category?.toLowerCase().includes(searchLower) ||
              item?.ItemId?.toString().toLowerCase().includes(searchLower)
            );
          })
        )
      )
    )
  );

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="text-center py-10">
          <p>Loading inventory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={fetchItems}
            className="mt-2 text-sm text-red-700 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
        <h1 className="text-xl md:text-2xl font-bold">Inventory</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)} 
          className="bg-blue-600 text-white rounded px-3 py-1.5 md:px-4 md:py-2 flex items-center text-sm md:text-base w-full sm:w-auto justify-center sm:justify-start"
        >
          <HiPlus className="mr-2" />
          Add Item
        </button>
      </div>

      <div className="mb-4 md:mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <HiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
          placeholder="Search item by name, ID, or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-3 md:p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-base md:text-lg font-medium">All Items</h2>
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="text-gray-400 hover:text-gray-600"
              >
                <HiDotsVertical className="h-5 w-5" />
              </button>
              
              {showFilters && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200 filters-dropdown">
                  <div className="p-4 space-y-4">
                    {/* Stock Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                      <select
                        value={filters.stock}
                        onChange={(e) => setFilters({...filters, stock: e.target.value})}
                        className="w-full border rounded-md p-1.5 text-sm"
                      >
                        <option value="all">All Stock</option>
                        <option value="in-stock">In Stock</option>
                        <option value="low-stock">Low Stock</option>
                        <option value="out-stock">Out of Stock</option>
                      </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters({...filters, category: e.target.value})}
                        className="w-full border rounded-md p-1.5 text-sm"
                      >
                        <option value="all">All Categories</option>
                        {/* Add your categories dynamically */}
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="furniture">Furniture</option>
                      </select>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                      <select
                        value={filters.priceRange}
                        onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                        className="w-full border rounded-md p-1.5 text-sm"
                      >
                        <option value="all">All Prices</option>
                        <option value="under-1000">Under ₹1,000</option>
                        <option value="1000-9000">₹1,000 - ₹5,000</option>
                        <option value="over-9000">Over ₹5,000</option>
                      </select>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                        className="w-full border rounded-md p-1.5 text-sm"
                      >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                      </select>
                    </div>

                    {/* Reset Filters Button */}
                    <button
                      onClick={() => setFilters({
                        stock: 'all',
                        category: 'all',
                        priceRange: 'all',
                        sortBy: 'name-asc'
                      })}
                      className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-200"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searchQuery ? "No items match your search." : "No inventory items found."}
          </div>
        ) : (
          <>
            {/* Table for larger screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stocks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map((item) => (
                    <tr key={item?._id || Math.random().toString()}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.ItemId || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item?.itemName || 'Unnamed Item'}
                        <div className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(item?.quantity)}`}>
                          {getStatusText(item?.quantity)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item?.category || 'Uncategorized'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item?.quantity || '0'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{item?.price || '0'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <HiPencil className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => confirmDelete(item._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <HiTrash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
              {filteredItems.map((item) => (
                <div key={item?._id || Math.random().toString()} className="p-3 border-b border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">{item?.itemName || 'Unnamed Item'}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(item?.quantity)}`}>
                          {getStatusText(item?.quantity)}
                        </div>
                        <span className="text-xs text-gray-500">{item?.category || 'Uncategorized'}</span>
                      </div>
                      <div className="flex space-x-4 mt-1 text-xs text-gray-600">
                        <span>ID: {item?.ItemId || 'N/A'}</span>
                        <span>Stock: {item?.quantity || '0'}</span>
                        <span>₹{item?.price || '0'}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <HiPencil className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => confirmDelete(item._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <HiTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal for adding inventory */}
      {isAddModalOpen && (
        <AddInventoryModal
          closeModal={() => setIsAddModalOpen(false)}
          onItemAdded={fetchItems}
        />
      )}

      {/* Modal for editing inventory */}
      {isEditModalOpen && (
        <EditInventoryModal
          item={currentItem}
          closeModal={() => setIsEditModalOpen(false)}
          onItemUpdated={fetchItems}
        />
      )}

      {/* Delete confirmation modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeleteConfirmation({ isOpen: false, itemId: null })}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmation.itemId)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
