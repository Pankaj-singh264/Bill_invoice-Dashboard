<<<<<<< HEAD
import { useState } from 'react';
import { HiPencil, HiTrash, HiDotsVertical, HiPlus, HiSearch, HiX } from 'react-icons/hi';

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([
    { id: "ITM1 02", name: "H&M T-shirt", category: "T-shirt", stock: 24, status: "In Stock", price: 600 },
    { id: "ITM1 43", name: "Black Cargo", category: "Cargos", stock: 45, status: "In Stock", price: 400 },
    { id: "ITM1 56", name: "Shoes", category: "Shoes", stock: 3, status: "Low stock", price: 900 },
    { id: "ITM1 45", name: "Denim Jeans", category: "Jeans", stock: 65, status: "In Stock", price: 1000 },
    { id: "ITM1 07", name: "White Shirt", category: "Shirts", stock: 14, status: "In Stock", price: 200 },
    { id: "ITM1 04", name: "Blue Shirt", category: "Shirts", stock: 0, status: "Out of stock", price: 400 }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    category: '',
    stock: '',
    price: '',
    status: 'In Stock'
  });
  const [activeFilter, setActiveFilter] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const removeItem = (id) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setNewItem({
      id: item.id,
      name: item.name,
      category: item.category,
      stock: item.stock,
      price: item.price,
      status: item.status
    });
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.id || !newItem.name || !newItem.category || !newItem.stock || !newItem.price) {
      alert('Please fill all fields');
      return;
    }

    const updatedItem = {
      ...newItem,
      stock: parseInt(newItem.stock),
      price: parseFloat(newItem.price),
      status: parseInt(newItem.stock) === 0 ? 'Out of stock' :
        parseInt(newItem.stock) <= 5 ? 'Low stock' : 'In Stock'
    };

    if (isEditMode) {
      setInventoryItems(items =>
        items.map(item => item.id === editingItem.id ? updatedItem : item)
      );
    } else {
      setInventoryItems(items => [updatedItem, ...items]);
    }

    setNewItem({
      id: '',
      name: '',
      category: '',
      stock: '',
      price: '',
      status: 'In Stock'
    });
    setIsEditMode(false);
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const filterByStock = (status) => {
    setActiveFilter(status);
    setIsFiltered(true);
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter) {
      return matchesSearch && item.status === activeFilter;
    }
    return matchesSearch;
  });

  const modalTitle = isEditMode ? 'Edit Product' : 'Add New Product';
  const submitButtonText = isEditMode ? 'Update Product' : 'Add Product';

  return (
    <>
      {/* MAIN CONTENT WITH BLUR */}
      <div className={`p-4 md:p-6 transition-all duration-300 ease-in-out ${isModalOpen ? 'blur-[2px]' : ''}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
          <h1 className="text-xl md:text-2xl font-bold">Inventory</h1>
          <button
            className="bg-blue-600 text-white rounded px-3 py-1.5 md:px-4 md:py-2 flex items-center text-sm md:text-base w-full sm:w-auto justify-center sm:justify-start"
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              setNewItem({
                id: '',
                name: '',
                category: '',
                stock: '',
                price: '',
                status: 'In Stock'
              });
            }}
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
            placeholder="Search item by name and category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Inventory Table */}
        <div className="bg-white shadow rounded-lg min-h-[70vh]">
          <div className="hidden md:block overflow-x-auto">
            <div className='w-full h-10 relative flex items-center justify-between px-10 md:px-6 py-2 bg-white border-b border-gray-200'>
              <h1>All-Items</h1>
              {!isFiltered ? (
                <HiDotsVertical
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => setIsFiltered(true)}
                />
              ) : (
                <div className='absolute right-0 top-full mt-1 bg-white shadow-lg rounded-md p-2 z-10 flex flex-col gap-2'>
                  <button
                    className={`px-4 py-2 text-left rounded-md hover:bg-gray-50 ${activeFilter === 'In Stock' ? 'bg-blue-50 text-blue-600' : ''}`}
                    onClick={() => filterByStock('In Stock')}
                  >
                    In Stock
                  </button>
                  <button
                    className={`px-4 py-2 text-left rounded-md hover:bg-gray-50 ${activeFilter === 'Low stock' ? 'bg-blue-50 text-blue-600' : ''}`}
                    onClick={() => filterByStock('Low stock')}
                  >
                    Low Stock
                  </button>
                  <button
                    className={`px-4 py-2 text-left rounded-md hover:bg-gray-50 ${activeFilter === 'Out of stock' ? 'bg-blue-50 text-blue-600' : ''}`}
                    onClick={() => filterByStock('Out of stock')}
                  >
                    Out of Stock
                  </button>
                  <button
                    className="px-4 py-2 text-left rounded-md hover:bg-gray-50 text-gray-500"
                    onClick={() => {
                      setActiveFilter(null);
                      setIsFiltered(false);
                    }}
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item ID</th>
                  <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                  <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stocks</th>
                  <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 md:px-6 py-2 md:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 md:px-6 py-3 md:py-4">{item.id}</td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      {item.name}
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${item.status === "Low stock" ? "bg-yellow-100 text-yellow-800" : item.status === "Out of stock" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">{item.category}</td>
                    <td className="px-4 md:px-6 py-3 md:py-4">{item.stock}</td>
                    <td className="px-4 md:px-6 py-3 md:py-4">₹{item.price}</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => handleEditClick(item)}>
                        <HiPencil />
                      </button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => removeItem(item.id)}>
                        <HiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL (Always outside blur wrapper) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl p-6 m-4 max-w-md w-full">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              <HiX className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold mb-6">{modalTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["id", "name", "category", "stock", "price"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field === 'stock' ? 'Stock Quantity' : field === 'price' ? 'Price (₹)' : `Item ${field}`}
                  </label>
                  <input
                    type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                    name={field}
                    value={newItem[field]}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder={`Enter ${field}`}
                    required
                    min={field === 'stock' || field === 'price' ? '0' : undefined}
                    step={field === 'price' ? '0.01' : undefined}
                    disabled={field === 'id' && isEditMode}
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {submitButtonText}
                </button>
              </div>
            </form>
=======
// import { useState, useEffect } from 'react';
// import { HiPencil, HiTrash, HiDotsVertical, HiPlus, HiSearch } from 'react-icons/hi';
// import axios from 'axios';
// import AddInventoryModal from '../Pages/AddInventoryModal';

// export default function Inventory() {
//   const [inventoryItems, setInventoryItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchItems = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:5000/api/inventory');
//       setInventoryItems(Array.isArray(res.data) ? res.data : []);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//       setError("Failed to load inventory items. Please try again later.");
//       setInventoryItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const getStatusClass = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800";
    
//     switch (status.toLowerCase()) {
//       case "in stock":
//         return "bg-green-100 text-green-800";
//       case "low stock":
//         return "bg-yellow-100 text-yellow-800";
//       case "out of stock":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const filteredItems = inventoryItems.filter(item =>
//     item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item?.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item?.id?.toString().toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="p-4 md:p-6">
//         <div className="text-center py-10">
//           <p>Loading inventory...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 md:p-6">
//         <div className="bg-red-50 p-4 rounded-md">
//           <p className="text-red-700">{error}</p>
//           <button 
//             onClick={fetchItems}
//             className="mt-2 text-sm text-red-700 underline"
//           >
//             Try again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
//         <h1 className="text-xl md:text-2xl font-bold">Inventory</h1>
//         <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white rounded px-3 py-1.5 md:px-4 md:py-2 flex items-center text-sm md:text-base w-full sm:w-auto justify-center sm:justify-start">
//           <HiPlus className="mr-2" />
//           Add Item
//         </button>
//       </div>

//       <div className="mb-4 md:mb-6 relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <HiSearch className="text-gray-400" />
//         </div>
//         <input
//           type="text"
//           className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
//           placeholder="Search item by name and category"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       <div className="bg-white shadow rounded-lg">
//         <div className="p-3 md:p-4 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h2 className="text-base md:text-lg font-medium">All Items</h2>
//             <button className="text-gray-400 hover:text-gray-600">
//               <HiDotsVertical className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {filteredItems.length === 0 ? (
//           <div className="p-6 text-center text-gray-500">
//             {searchQuery ? "No items match your search." : "No inventory items found."}
//           </div>
//         ) : (
//           <>
//             {/* Table for larger screens */}
//             <div className="hidden md:block overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stocks</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredItems.map((item) => (
//                     <tr key={item?.id || Math.random().toString()}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item?.ItemId || 'N/A'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {item?.itemName || 'Unnamed Item'}
//                         <div className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(item?.status)}`}>
//                           {item?.status || 'Unknown'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item?.category || 'Uncategorized'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item?.quantity || '0'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{item?.price || '0'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button className="text-blue-600 hover:text-blue-900 mr-3"><HiPencil className="h-5 w-5" /></button>
//                         <button className="text-red-600 hover:text-red-900"><HiTrash className="h-5 w-5" /></button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile Card View */}
//             <div className="md:hidden">
//               {filteredItems.map((item) => (
//                 <div key={item?.id || Math.random().toString()} className="p-3 border-b border-gray-200">
//                   <div className="flex justify-between">
//                     <div>
//                       <p className="font-medium text-sm">{item?.name || 'Unnamed Item'}</p>
//                       <div className="flex items-center space-x-2 mt-1">
//                         <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(item?.status)}`}>
//                           {item?.status || 'Unknown'}
//                         </div>
//                         <span className="text-xs text-gray-500">{item?.category || 'Uncategorized'}</span>
//                       </div>
//                       <div className="flex space-x-4 mt-1 text-xs text-gray-600">
//                         <span>ID: {item?.id || 'N/A'}</span>
//                         <span>Stock: {item?.stock || '0'}</span>
//                         <span>₹{item?.price || '0'}</span>
//                       </div>
//                     </div>
//                     <div className="flex flex-col space-y-2">
//                       <button className="text-blue-600 hover:text-blue-900"><HiPencil className="h-5 w-5" /></button>
//                       <button className="text-red-600 hover:text-red-900"><HiTrash className="h-5 w-5" /></button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Modal for adding inventory */}
//       {isModalOpen && (
//         <AddInventoryModal
//           closeModal={() => setIsModalOpen(false)}
//           onItemAdded={fetchItems}
//         />
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { HiPencil, HiTrash, HiDotsVertical, HiPlus, HiSearch } from 'react-icons/hi';
import axios from 'axios';
import AddInventoryModal from '../Pages/AddInventoryModal';
import EditInventoryModal from '../Pages/EditInventoryModal';

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, itemId: null });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/inventory');
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
      await axios.delete(`http://localhost:5000/api/inventory/${itemId}`);
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

  const filteredItems = inventoryItems.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item?.itemName?.toLowerCase().includes(searchLower) ||
      item?.category?.toLowerCase().includes(searchLower) ||
      item?.ItemId?.toString().toLowerCase().includes(searchLower)
    );
  });

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
            <button className="text-gray-400 hover:text-gray-600">
              <HiDotsVertical className="h-5 w-5" />
            </button>
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
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
          </div>
        </div>
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
