import React, { useState } from 'react';
import Sidebar2 from '../Components/Sidebar2';
import { Edit, Trash2, ArrowRight, X } from 'lucide-react';

function ProductPurchase() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className={`flex ${isModalOpen ? "backdrop-blur-sm" : ""}`}>
        <div>
          <Sidebar2 />
        </div>

        <div className={`relative w-full`}>
          <div className="p-2 bg-white min-h-screen ml-25">
            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-30 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="text-sm">Product Name</label>
                      <input type="text" className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                      <label className="text-sm">Price</label>
                      <input type="number" className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                      <label className="text-sm">Quantity</label>
                      <input type="number" className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                      <label className="text-sm">Discount (%)</label>
                      <input type="number" className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                      Add Product
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Main Content */}
            <h1 className="text-3xl font-bold mb-4">Customer Info</h1>
            <div className="text-sm mb-6 space-y-2">
              <p><span>Name: John Doe</span></p>
              <p><span>Phone: +91 98765 43210</span></p>
              <p><span>Invoice Date: 11-04-2025</span></p>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 mb-4 w-280 h-100 space-y-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-2xl">Add Purchased Products(7)</h3>
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm flex items-center"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="mr-1">+</span> Add Product
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm border-b">
                      <th className="py-2 pr-6">Product Name</th>
                      <th className="py-2 pr-6">Price</th>
                      <th className="py-2 pr-6">Qty</th>
                      <th className="py-2 pr-6">Discount</th>
                      <th className="py-2 pr-6">Total</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {/* Product Rows */}
                    <tr>
                      <td className="py-2 pr-6">Colored Shirt</td>
                      <td className="py-2 pr-6">₹4799</td>
                      <td className="py-2 pr-6">2</td>
                      <td className="py-2 pr-6">8.24%</td>
                      <td className="py-2 pr-6">₹8809</td>
                      <td className="py-2 flex space-x-2">
                        <button className="p-1 hover:text-blue-600">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                    {/* Add more products here */}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <span className="w-16 text-right">Subtotal:</span>
                  <span className="w-24 ml-222">₹15,067</span>
                </div>
                <div className="ml-1 mt-3 flex text-sm">
                  <span className="w-16 text-right">Tax (18%):</span>
                  <span className="w-24 ml-221">₹676</span>
                </div>
                <div className="flex mt-3 ml-1">
                  <span className="text-2xl">Grand Total:</span>
                  <span className="ml-205">₹15,963</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4">
              <h3 className="text-2xl mb-4">Payment Info</h3>
              <div className="mb-4">
                <p className="text-sm mb-2">Payment Method</p>
                <div className="flex space-x-2">
                  <button className="border rounded-md px-3 py-1 text-sm flex items-center">Card</button>
                  <button className="border rounded-md px-3 py-1 text-sm flex items-center bg-blue-600 text-white">Cash</button>
                  <button className="border rounded-md px-3 py-1 text-sm flex items-center">UPI</button>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm mb-1">Amount Paid</p>
                <input type="text" placeholder="15960" className="border-1 rounded w-220 py-3 px-2" />
              </div>
              <div className="mb-6">
                <p className="text-sm mb-1">Balance</p>
                <input type="text" placeholder="3" className="border-1 rounded w-220 py-3 px-2" />
              </div>
              <button className="w-220 bg-blue-600 text-white py-2 rounded-md flex items-center justify-center text-2xl">
                Generate Bill <ArrowRight size={25} className="ml-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductPurchase;
