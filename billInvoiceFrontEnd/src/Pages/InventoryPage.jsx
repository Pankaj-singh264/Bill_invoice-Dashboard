import { useState } from 'react';
import { HiPencil, HiTrash, HiDotsVertical, HiPlus, HiSearch, HiMenu } from 'react-icons/hi';

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: "ITM1 02",
      name: "H&M T-shirt",
      category: "T-shirt",
      stock: 24,
      status: "In Stock",
      price: 600
    },
    {
      id: "ITM1 43",
      name: "Black Cargo",
      category: "Cargos",
      stock: 45,
      status: "In Stock",
      price: 400
    },
    {
      id: "ITM1 56",
      name: "Shoes",
      category: "Shoes",
      stock: 3,
      status: "Low stock",
      price: 900
    },
    {
      id: "ITM1 45",
      name: "Denim Jeans",
      category: "Jeans",
      stock: 65,
      status: "In Stock",
      price: 1000
    },
    {
      id: "ITM1 07",
      name: "White Shirt",
      category: "Shirts",
      stock: 14,
      status: "In Stock",
      price: 200
    },
    {
      id: "ITM1 04",
      name: "Blue Shirt",
      category: "Shirts",
      stock: 0,
      status: "Out of stock",
      price: 400
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const getStatusClass = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-gray-100 text-gray-800";
      case "Low stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
           
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
          <h1 className="text-xl md:text-2xl font-bold">Inventory</h1>
          <button className="bg-blue-600 text-white rounded px-3 py-1.5 md:px-4 md:py-2 flex items-center text-sm md:text-base w-full sm:w-auto justify-center sm:justify-start">
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

        <div className="bg-white shadow rounded-lg">
          <div className="p-3 md:p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-base md:text-lg font-medium">All Items</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <HiDotsVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Table for larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item ID
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Name
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stocks
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-2 md:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-xs md:text-sm font-medium text-gray-900">{item.id}</div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-xs md:text-sm font-medium text-gray-900">{item.name}</div>
                      <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(item.status)}`}>
                        {item.status}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-xs md:text-sm text-gray-900">{item.category}</div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-xs md:text-sm text-gray-900">{item.stock}</div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-xs md:text-sm text-gray-900">₹{item.price}</div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-xs md:text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <HiPencil className="h-4 w-4 md:h-5 md:w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <HiTrash className="h-4 w-4 md:h-5 md:w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile screens */}
          <div className="md:hidden">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-3 border-b border-gray-200">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(item.status)}`}>
                        {item.status}
                      </div>
                      <span className="text-xs text-gray-500">{item.category}</span>
                    </div>
                    <div className="flex space-x-4 mt-1 text-xs text-gray-600">
                      <span>ID: {item.id}</span>
                      <span>Stock: {item.stock}</span>
                      <span>₹{item.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <HiPencil className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}