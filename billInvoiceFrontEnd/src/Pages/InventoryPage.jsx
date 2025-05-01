import React, { useState } from 'react';
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import Sidebar from '../Components/Sidebar';

const inventoryItems = [
  { id: "ITM1 02", name: "H&M T-shirt", category: "T-shirt", stock: 24, price: 600, status: "In Stock" },
  { id: "ITM1 43", name: "Black Cargo", category: "Cargos", stock: 45, price: 400, status: "In Stock" },
  { id: "ITM1 56", name: "Shoes", category: "Shoes", stock: 3, price: 900, status: "Low stock" },
  { id: "ITM1 45", name: "Denim Jeans", category: "Jeans", stock: 65, price: 1000, status: "In Stock" },
  { id: "ITM1 07", name: "White Shirt", category: "Shirts", stock: 14, price: 200, status: "In Stock" },
  { id: "ITM1 04", name: "Blue Shirt", category: "Shirts", stock: 0, price: 400, status: "Out of stock" },
];

const statusClasses = {
  "In Stock": "bg-gray-100 text-gray-600",
  "Low stock": "bg-yellow-100 text-yellow-700",
  "Out of stock": "bg-red-100 text-red-700",
};

const InventoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 bg-gray-50 overflow-y-auto">
          <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Inventory</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
              >
                Add Item
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search Item by name and category"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold text-gray-900">All Items</h2>
                <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100">
                  <MoreHorizontal className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Responsive Table */}
              <table className="min-w-full bg-white text-sm sm:text-base">
                <thead className="bg-gray-100 hidden sm:table-header-group">
                  <tr className="text-gray-700">
                    <th className="text-left py-3 px-4">Item ID</th>
                    <th className="text-left py-3 px-4">Item Name</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Stocks</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item, idx) => (
                    <tr
                      key={idx}
                      className="flex flex-col sm:table-row border-b sm:border-none mb-4 sm:mb-0 p-4 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none"
                    >
                      <td className="py-2 px-2 sm:py-3 sm:px-4 font-semibold">
                        <span className="sm:hidden font-bold">Item ID: </span> {item.id}
                      </td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="sm:hidden font-bold">Item Name: </span> 
                        {item.name}
                        <span className={`text-xs px-2 py-1 rounded-full ${statusClasses[item.status]}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4">
                        <span className="sm:hidden font-bold">Category: </span> {item.category}
                      </td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4">
                        <span className="sm:hidden font-bold">Stock: </span> {item.stock}
                      </td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4">
                        <span className="sm:hidden font-bold">Price: </span> ₹{item.price}
                      </td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 flex gap-3">
                        <button className="text-blue-500 hover:text-blue-700">
                          <Pencil size={18} />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Item Name"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Category"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryPage;
