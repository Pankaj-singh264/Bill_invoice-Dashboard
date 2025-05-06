import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimes,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
const API_URL = 'http://localhost:5000/api' || process.env.REACT_APP_API_URL;

export default function CustomerInvoiceModal({ customer, onClose }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    invoiceNo: "",
    date: new Date().toISOString().split('T')[0],
    items: [],
    amount: 0
  });
  const [currentItem, setCurrentItem] = useState({
    name: "",
    quantity: 1,
    price: 0
  });

  // Fetch customer invoices
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      // const response = await axios.get(`http://localhost:5000/api/customer/invoices/${customer._id}`);
      const response = await axios.get(`${API_URL}/customer/invoices/${customer._id}`);
      setInvoices(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching invoices:", err);
      setError("Failed to load invoice data. Please try again.");
      // For demo, populate with sample data
      setInvoices([
        {
          _id: "inv1",
          invoiceNo: "#INV00123",
          date: "14-Apr-2025",
          itemsPurchased: "5 Items",
          amount: 3250
        },
        {
          _id: "inv2",
          invoiceNo: "#INV00456",
          date: "12-Apr-2025",
          itemsPurchased: "3 Items",
          amount: 1105
        },
        {
          _id: "inv3",
          invoiceNo: "#INV00623",
          date: "08-Apr-2025",
          itemsPurchased: "6 Items",
          amount: 2050
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [customer._id]);

  // Calculate total purchase amount
  const calculateTotalPurchase = () => {
    return invoices.reduce((total, invoice) => total + invoice.amount, 0);
  };

  const handleAddItem = () => {
    if (!currentItem.name || currentItem.price <= 0) return;
    
    const itemTotal = currentItem.quantity * currentItem.price;
    const newItems = [...newInvoice.items, {...currentItem, total: itemTotal}];
    
    // Calculate new invoice total
    const newTotal = newItems.reduce((sum, item) => sum + item.total, 0);
    
    setNewInvoice({
      ...newInvoice,
      items: newItems,
      amount: newTotal
    });
    
    // Reset current item
    setCurrentItem({
      name: "",
      quantity: 1,
      price: 0
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...newInvoice.items];
    updatedItems.splice(index, 1);
    
    // Recalculate total
    const newTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    
    setNewInvoice({
      ...newInvoice,
      items: updatedItems,
      amount: newTotal
    });
  };

  const handleSubmitInvoice = async () => {
    if (newInvoice.items.length === 0) {
      alert("Please add at least one item to the invoice");
      return;
    }

    try {
      setLoading(true);
      // Replace with your actual API endpoint
      await axios.post(`http://localhost:5000/api/customer/invoice/${customer._id}`, newInvoice);
      
      // Add to local state for immediate UI update
      const newInvoiceDisplay = {
        _id: Date.now().toString(),
        invoiceNo: newInvoice.invoiceNo,
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }).replace(/ /g, '-'),
        itemsPurchased: `${newInvoice.items.length} Items`,
        amount: newInvoice.amount
      };
      
      setInvoices([...invoices, newInvoiceDisplay]);
      setShowAddInvoice(false);
      setNewInvoice({
        invoiceNo: "",
        date: new Date().toISOString().split('T')[0],
        items: [],
        amount: 0
      });
    } catch (err) {
      console.error("Error adding invoice:", err);
      alert("Failed to add invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Invoice Details of Customer</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Customer Info */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><span className="font-semibold">Purchaser:</span> {customer.name}</p>
            <p><span className="font-semibold">Address:</span> {customer.address}</p>
            <p><span className="font-semibold">Total Invoice:</span> {invoices.length}</p>
          </div>
          <div>
            <p><span className="font-semibold">Phone No.:</span> {customer.phone}</p>
            <p><span className="font-semibold">GSTIN:</span> {customer.gstin || "N/A"}</p>
            <p><span className="font-semibold">Total Purchase:</span> ₹{calculateTotalPurchase().toLocaleString()}</p>
          </div>
        </div>

        {/* Invoice History Table */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Invoice History Table</h3>
            <button
              onClick={() => setShowAddInvoice(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> New Invoice
            </button>
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center items-center p-8">
              <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-2xl" />
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Invoices Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border text-left">Invoice No.</th>
                    <th className="py-2 px-4 border text-left">Date</th>
                    <th className="py-2 px-4 border text-left">Item Purchased</th>
                    <th className="py-2 px-4 border text-left">Amount (₹)</th>
                    <th className="py-2 px-4 border text-center">View</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 border">{invoice.invoiceNo}</td>
                      <td className="py-2 px-4 border">{invoice.date}</td>
                      <td className="py-2 px-4 border">{invoice.itemsPurchased}</td>
                      <td className="py-2 px-4 border">₹{invoice.amount.toLocaleString()}</td>
                      <td className="py-2 px-4 border text-center">
                        <button className="text-blue-600 hover:text-blue-800">
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Invoice Modal */}
      {showAddInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Create New Invoice</h2>
              <button 
                onClick={() => setShowAddInvoice(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g. #INV00789"
                    value={newInvoice.invoiceNo}
                    onChange={(e) => setNewInvoice({...newInvoice, invoiceNo: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={newInvoice.date}
                    onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value})}
                  />
                </div>
              </div>

              {/* Add Items */}
              <div className="mb-6">
              
                
                <div className="grid grid-cols-12 gap-2 mb-2">
                  <div className="col-span-5">
                  <label className="block text-gray-700 text-sm font-bold">
                    Item
                  </label>
                    <input
                      type="text"
                      placeholder="Item name"
                      className="w-full p-2 border rounded"
                      value={currentItem.name}
                      onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                  <label className="block text-gray-700 text-sm font-bold">
                    Qty
                  </label>
                    <input
                      type="number"
                      placeholder="Qty"
                      min="1"
                      className="w-full p-2 border rounded"
                      value={currentItem.quantity}
                      onChange={(e) => setCurrentItem({...currentItem, quantity: parseInt(e.target.value) || 1})}
                    />
                  </div>
                  <div className="col-span-3">
                  <label className="block text-gray-700 text-sm font-bold">
                    prize
                  </label>
                    <input
                      type="number"
                      placeholder="Price"
                      min="0"
                      className="w-full p-2 border rounded"
                      value={currentItem.price}
                      onChange={(e) => setCurrentItem({...currentItem, price: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div className="col-span-2">
                    <button
                      onClick={handleAddItem}
                      className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Items Table */}
                {newInvoice.items.length > 0 && (
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-2 px-4 border text-left">Item</th>
                          <th className="py-2 px-4 border text-left">Quantity</th>
                          <th className="py-2 px-4 border text-left">Price</th>
                          <th className="py-2 px-4 border text-left">Total</th>
                          <th className="py-2 px-4 border text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newInvoice.items.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2 px-4 border">{item.name}</td>
                            <td className="py-2 px-4 border">{item.quantity}</td>
                            <td className="py-2 px-4 border">₹{item.price.toLocaleString()}</td>
                            <td className="py-2 px-4 border">₹{item.total.toLocaleString()}</td>
                            <td className="py-2 px-4 border text-center">
                              <button
                                onClick={() => handleRemoveItem(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50 font-semibold">
                          <td colSpan="3" className="py-2 px-4 border text-right">Total Amount:</td>
                          <td className="py-2 px-4 border">₹{newInvoice.amount.toLocaleString()}</td>
                          <td className="py-2 px-4 border"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowAddInvoice(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitInvoice}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}