import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Edit, Trash2, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCustomers } from '../contexts/CustomerContext';
import axios from 'axios'
const API_URL = 'http://localhost:5000/api';

function ProductPurchase() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateCustomerBalance } = useCustomers();
  const customerData = location.state?.customerData || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [discount, setDiscount] = useState('10'); // Default 10% discount
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const cart = location.state?.customerData?.cart || [];
    return cart.map(item => ({
      ...item,
      id: item.id || Date.now() + Math.random(),
      discount: 10
    }));
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [previousBalance, setPreviousBalance] = useState(() => {
    return customerData.balance || 230;
  });
  const [balance, setBalance] = useState(() => {
    return customerData.balance || 0;
  });

  useEffect(() => {
    const financials = calculateFinancials();
    const newBalance = Number(previousBalance) + Number(financials.grandTotal) - Number(amountPaid || 0);
    setBalance(newBalance);
  }, [amountPaid, cartItems, previousBalance]);

  const handleEdit = (item) => {
    setEditingProduct(item);
    setProductName(item.item); // Note: using item.item as that's the property name in cart
    setPrice(item.price);
    setQuantity(item.qty); // Note: using item.qty as that's the property name in cart
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

    const newItem = {
      id: isEditMode ? editingProduct.id : Date.now() + Math.random(),
      item: productName,
      price: Number(price),
      qty: Number(quantity),
      discount: Number(discount),
    };
    console.log(newItem)
    try {


      // Update cart items
      if (isEditMode) {
        setCartItems(items =>
          items.map(item => item.id === editingProduct.id ? newItem : item)
        );
      } else {
        setCartItems(items => [...items, newItem]);
      }

      // Reset form
      setProductName('');
      setPrice('');
      setQuantity('');
      setDiscount('10');
      setIsEditMode(false);
      setEditingProduct(null);
      setIsModalOpen(false);

    } catch (err) {
      console.error('Error saving invoice:', err);
      alert('Failed to save invoice. Please try again.');
    }
  };

  const calculateFinancials = () => {
    const subtotal = cartItems.reduce((acc, item) =>
      acc + (item.price * item.qty * (1 - item.discount / 100)), 0
    );
    const tax = subtotal * 0.18;
    const grandTotal = subtotal + tax;

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
      remainingBalance: balance.toFixed(2)
    };
  };

  const validatePayment = () => {
    const financials = calculateFinancials();
    const totalDue = Number(previousBalance) + Number(financials.grandTotal);
    const paid = Number(amountPaid);

    if (!paid) {
      alert('Please enter amount paid');
      return false;
    }

    if (paid > totalDue) {
      alert('Amount paid cannot be greater than total due');
      return false;
    }

    return true;
  };

  const handleGenerateBill = async () => {
    const financials = calculateFinancials();

    // Validate data before sending
    if (!customerData?.email) {
      alert('Customer information is missing');
      return;
    }

    if (cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    const billData = {
      customer: {
        name: customerData.name || '',
        email: customerData.email || '',
        phone: customerData.phone || '',
        balance: Number(balance) || 0,
        cart: cartItems.map(item => ({
          item: item.item,
          price: Number(item.price),
          qty: Number(item.qty),
          discount: Number(item.discount)
        }))
      },
      payment: {
        method: paymentMethod,
        amountPaid: Number(amountPaid) || 0,
        previousBalance: Number(previousBalance) || 0,
        currentBill: Number(financials.grandTotal) || 0,
        remainingBalance: Number(balance) || 0
      },
      date: currentDate,
      totals: {
        subtotal: Number(financials.subtotal),
        tax: Number(financials.tax),
        grandTotal: Number(financials.grandTotal)
      }
    };

    try {
      console.log('Sending bill data:', billData);

      const response = await axios.post(`${API_URL}/invoices`, billData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Server response:', response.data);

      if (response.status === 200 || response.status === 201) {
        // Update customer balance
        updateCustomerBalance(customerData.email, balance);

        // Navigate to bill preview
        navigate('/home/billinvoice', {
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
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        data: error.response?.data
      });

      alert(`Failed to save invoice: ${error.response?.data?.message || 'Server error occurred'}`);
    }
  };

  // Format date for invoice
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <section className={`flex flex-col lg:flex-row ${isModalOpen ? "backdrop-blur-sm" : ""}`}>
      {/* <Sidebar2 /> */}

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
                  setProductName('');
                  setPrice('');
                  setQuantity('');
                  setDiscount('10'); // Reset to default 10%
                }}
                className="absolute top-2 right-2"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {['Product Name', 'Price', 'Quantity', 'Discount (%)'].map((label, idx) => (
                  <div key={idx}>
                    <label className="text-sm">{label}</label>
                    <input
                      type={label === 'Product Name' ? 'text' : 'number'}
                      value={
                        label === 'Product Name'
                          ? productName
                          : label === 'Price'
                            ? price
                            : label === 'Quantity'
                              ? quantity
                              : discount
                      }
                      onChange={(e) => {
                        const setter =
                          label === 'Product Name'
                            ? setProductName
                            : label === 'Price'
                              ? setPrice
                              : label === 'Quantity'
                                ? setQuantity
                                : setDiscount;
                        setter(e.target.value);
                      }}
                      required
                      className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                ))}
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
          <h1 className="text-2xl font-bold mb-2">Customer Info</h1>
          <div className="text-sm space-y-1">
            <p>Name: {customerData.name || 'N/A'}</p>
            <p>Phone: {customerData.phone || 'N/A'}</p>
            <p>Invoice Date: {currentDate}</p>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 mb-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="font-semibold text-lg">Add Purchased Products (7)</h3>
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
                  <td className="py-2 pr-6">{item.item}</td>
                  <td className="py-2 pr-6">₹{item.price}</td>
                  <td className="py-2 pr-6">{item.qty}</td>
                  <td className="py-2 pr-6">{item.discount}%</td>
                  <td className="py-2 pr-6">
                    ₹{(item.price * item.qty * (1 - item.discount / 100)).toFixed(2)}
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
              <span>Tax (18%):</span>
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
            <div className="flex gap-2 flex-wrap">
              <button
                className={`border rounded px-3 py-1 text-sm ${paymentMethod === 'card' ? 'bg-blue-600 text-white' : ''
                  }`}
                onClick={() => setPaymentMethod('card')}
                type="button"
              >
                Card
              </button>
              <button
                className={`border rounded px-3 py-1 text-sm ${paymentMethod === 'cash' ? 'bg-blue-600 text-white' : ''
                  }`}
                onClick={() => setPaymentMethod('cash')}
                type="button"
              >
                Cash
              </button>
              <button
                className={`border rounded px-3 py-1 text-sm ${paymentMethod === 'upi' ? 'bg-blue-600 text-white' : ''
                  }`}
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
            <p className="text-sm mb-1">Balance</p>
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
            <p className={`text-lg font-semibold ${balance > 0 ? 'text-red-600' : 'text-green-600'
              }`}>
              ₹{balance.toFixed(2)}
            </p>
          </div>

          <button
            className="w-full sm:w-72 bg-blue-600 text-white py-2 rounded-md flex justify-center items-center text-lg"
            onClick={() => {
              if (validatePayment()) {
                handleGenerateBill();
              }
            }}
          >
            Generate Bill <ArrowRight size={20} className="ml-3" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductPurchase;
