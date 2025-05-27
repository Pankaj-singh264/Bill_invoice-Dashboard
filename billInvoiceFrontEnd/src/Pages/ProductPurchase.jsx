import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Edit, Trash2, ArrowRight, X, PlusCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function ProductPurchase() {
  const location = useLocation();
  const navigate = useNavigate();
  const { apiUrl } = useAuth();
  const customerData = location.state?.customerData || {};

  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [discount, setDiscount] = useState('10');
  const [gstRate, setGstRate] = useState(18);
  const [cartItems, setCartItems] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [previousBalance, setPreviousBalance] = useState(customerData.balance || 0);
  const [balance, setBalance] = useState(customerData.balance || 0);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch inventory items
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}/inventory`);
        if (response.data.success) {
          setInventoryItems(response.data.data || []);
        }
      } catch (error) {
        //console.error('Error fetching inventory items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryItems();
  }, [apiUrl]);

  // Calculate financials without setting state
  const calculateFinancials = () => {
    const subtotal = cartItems.reduce((acc, item) =>
      acc + (item.price * item.quantity * (1 - item.discount / 100)), 0
    );
    const tax = subtotal * (gstRate / 100);
    const grandTotal = subtotal + tax;

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    };
  };

  // Update balance whenever relevant values change
  useEffect(() => {
    const financials = calculateFinancials();
    const newBalance = Number(previousBalance) + Number(financials.grandTotal) - Number(amountPaid || 0);
    setBalance(newBalance);
  }, [amountPaid, cartItems, previousBalance, gstRate]);

  // Handle product operations
  const handleEdit = (item) => {
    setEditingProduct(item);
    setSelectedItem(inventoryItems.find(invItem => invItem.itemName === item.name));
    setQuantity(item.quantity);
    setDiscount(item.discount);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setCartItems(items => items.filter(item => item.id !== itemId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerData._id) {
      alert("Customer ID not available!");
      return;
    }

    if (!selectedItem) {
      alert("Please select a product");
      return;
    }

    // Check for duplicate product (only for new items)
    if (!isEditMode) {
      const existingItem = cartItems.find(item => item.name === selectedItem.itemName);
      if (existingItem) {
        alert('This product is already in your cart');
        return;
      }
    }

    const newItem = {
      id: isEditMode ? editingProduct.id : Date.now(),
      name: selectedItem.itemName,
      price: Number(selectedItem.price),
      quantity: Number(quantity),
      discount: Number(discount),
      gstRate: Number(gstRate)
    };

    try {
      if (isEditMode) {
        // Update cart items
        setCartItems(items =>
          items.map(item => item.id === editingProduct.id ? newItem : item)
        );
      } else {
        // Add new item to cart
        setCartItems(items => [...items, newItem]);
      }

      // Reset form
      setSelectedItem(null);
      setQuantity('');
      setDiscount('10');
      setIsEditMode(false);
      setEditingProduct(null);
      setIsModalOpen(false);

    } catch (err) {
      //console.error('Error handling product:', err);
      alert('Failed to save product. Please try again.');
    }
  };

  const handleGenerateBill = async () => {
    const financials = calculateFinancials();

    if (!amountPaid) {
      alert('Please enter amount paid');
      return;
    }

    const totalDue = Number(previousBalance) + Number(financials.grandTotal);
    if (Number(amountPaid) > totalDue) {
      alert('Amount paid cannot be greater than total due');
      return;
    }

    // Format invoice items
    const invoiceItems = cartItems.map(item => ({
      productName: item.name,
      quantity: Number(item.quantity),
      price: Number(item.price),
      amount: Number(item.quantity) * Number(item.price),
      discount: Number(item.discount),
      gstRate: Number(gstRate)
    }));

    if (!invoiceItems.length) {
      alert('Please add at least one item to the invoice');
      return;
    }

    // Create invoice data
    const invoiceData = {
      customer: customerData._id,
      items: invoiceItems,
      subtotal: Number(financials.subtotal),
      totalGST: Number(financials.tax),
      grandTotal: Number(financials.grandTotal),
      paymentMethod: paymentMethod,
      amountPaid: Number(amountPaid),
      previousBalance: Number(previousBalance),
      remainingBalance: Number(balance)
    };

    try {
      const response = await axios.post(`${apiUrl}/invoices/`, invoiceData);

      if (response.status === 201) {
        const billData = {
          customer: {
            id: customerData._id,
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            balance: Number(balance)
          },
          items: cartItems,
          payment: {
            method: paymentMethod,
            amountPaid: Number(amountPaid),
            previousBalance: Number(previousBalance),
            currentBill: Number(financials.grandTotal),
            remainingBalance: Number(balance)
          },
          date: new Date().toLocaleDateString('en-IN'),
          totals: {
            subtotal: Number(financials.subtotal),
            tax: Number(financials.tax),
            grandTotal: Number(financials.grandTotal)
          }
        };

        navigate('/billinvoice', {
          state: {
            billData,
            customerData: {
              ...customerData,
              balance: balance
            }
          }
        });
      }
    } catch (error) {
      //console.error('Error creating invoice:', error);
      alert('Failed to create invoice: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <section className="flex flex-col lg:flex-row">
      <div className="w-full p-4 bg-white min-h-screen">
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96 relative">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setEditingProduct(null);
                  setSelectedItem(null);
                  setQuantity('');
                  setDiscount('10');
                }}
                className="absolute top-2 right-2"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm">Select Product</label>
                  <select
                    value={selectedItem ? selectedItem.itemId : ''}
                    onChange={(e) => {
                      const item = inventoryItems.find(item => item.itemId === e.target.value);
                      setSelectedItem(item);
                    }}
                    required
                    className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select a product</option>
                    {inventoryItems.map((item) => (
                      <option key={item.itemId} value={item.itemId}>
                        {item.itemName} - ₹{item.price} (Stock: {item.quantity})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    min="1"
                    max={selectedItem?.quantity || 1}
                    className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-sm">Discount (%)</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    required
                    min="0"
                    max="100"
                    className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-sm">GST Rate (%)</label>
                  <input
                    type="number"
                    value={gstRate}
                    onChange={(e) => setGstRate(e.target.value)}
                    required
                    className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  {isEditMode ? 'Update Product' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Header Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Customer Info</h1>
          <div className="text-sm space-y-1 mt-2">
            <p>Name: {customerData.name || 'N/A'}</p>
            <p>Phone: {customerData.phoneNumber || 'N/A'}</p>
            <p>Invoice Date: {new Date().toLocaleDateString('en-IN')}</p>
            <p>GST Number: {customerData.gstNumber || 'N/A'}</p>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 mb-6 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Products ({cartItems.length})</h3>
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded text-sm flex items-center"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="mr-1">+</span> Add Product
            </button>
          </div>

          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 pr-6">Product Name</th>
                <th className="py-2 pr-6">Price</th>
                <th className="py-2 pr-6">Qty</th>
                <th className="py-2 pr-6">Discount</th>
                <th className="py-2 pr-6">Total</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 pr-6">{item.name}</td>
                  <td className="py-2 pr-6">₹{item.price}</td>
                  <td className="py-2 pr-6">{item.quantity}</td>
                  <td className="py-2 pr-6">{item.discount}%</td>
                  <td className="py-2 pr-6">
                    ₹{(item.price * item.quantity * (1 - item.discount / 100)).toFixed(2)}
                  </td>
                  <td className="py-2 flex gap-2">
                    <button
                      className="hover:text-blue-600"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="hover:text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{calculateFinancials().subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST ({gstRate}%):</span>
              <span>₹{calculateFinancials().tax}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Grand Total:</span>
              <span>₹{calculateFinancials().grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 space-y-4">
          <h3 className="text-lg font-semibold">Payment Info</h3>

          <div>
            <p className="text-sm mb-1">Payment Method</p>
            <div className="flex gap-2">
              <button
                className={`border rounded px-3 py-1 text-sm ${paymentMethod === 'cash' ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setPaymentMethod('cash')}
                type="button"
              >
                Cash
              </button>
              <button
                className={`border rounded px-3 py-1 text-sm ${paymentMethod === 'upi' ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setPaymentMethod('upi')}
                type="button"
              >
                UPI
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm mb-1">Amount Paid</p>
            <input
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              placeholder="Enter amount"
              className="border rounded w-full sm:w-72 py-2 px-3"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Previous Balance</p>
            <input
              type="number"
              value={previousBalance}
              onChange={(e) => setPreviousBalance(e.target.value)}
              placeholder="Previous Balance"
              className="border rounded w-full sm:w-72 py-2 px-3"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Remaining Balance</p>
            <p className={`text-lg font-semibold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
              ₹{balance.toFixed(2)}
            </p>
          </div>

          <button
            className="w-full sm:w-72 bg-blue-600 text-white py-2 rounded-md flex justify-center items-center text-lg"
            onClick={handleGenerateBill}
          >
            Generate Bill <ArrowRight size={20} className="ml-3" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductPurchase;