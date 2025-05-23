import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Edit, Trash2, ArrowRight, X, PlusCircle, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

// Add axios interceptor to include token in all requests
function ProductPurchase() {
  const location = useLocation();
  const navigate = useNavigate();
  const { apiUrl } = useAuth();

  const customerData = location.state?.customerData || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [discount, setDiscount] = useState('10');
  const [loading, setLoading] = useState(false);
  const [customerProducts, setCustomerProducts] = useState([]);
  const [showProductsDrawer, setShowProductsDrawer] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const cart = location.state?.customerData?.cart || [];
    return cart.map(item => ({
      ...item,
      id: item.id || Date.now() + Math.random(),
      discount: item.discount || 10
    }));
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [previousBalance, setPreviousBalance] = useState(() => {
    return customerData.balance || 0;
  });
  const [balance, setBalance] = useState(() => {
    return customerData.balance || 0;
  });
  const [gstRate, setGstRate] = useState(18);


  // Load customer's previous products
  useEffect(() => {
    const fetchCustomerProducts = async () => {
      setLoading(true);
      try {
        if (customerData._id) {
          const response = await axios.get(`${apiUrl}/items?customerId=${customerData._id}`);
          if (response.status === 200) {
            setCustomerProducts(response.data.items);
          }
        } else {
          setCustomerProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch customer products:", error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
        setCustomerProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerProducts();
  }, [customerData._id, navigate, apiUrl]);

  // Calculate balance
  useEffect(() => {
    const financials = calculateFinancials();
    const newBalance = Number(previousBalance) + Number(financials.grandTotal) - Number(amountPaid || 0);
    setBalance(newBalance);
  }, [amountPaid, cartItems, previousBalance]);

  const handleEdit = (item) => {
    setEditingProduct(item);
    setProductName(item.item);
    setPrice(item.price);
    setQuantity(item.qty);
    setDiscount(item.discount);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setCartItems(items => items.filter(item => item.id !== itemId));
    }
  };

  const addProductToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.item === product.name
    );

    if (existingItemIndex !== -1) {
      // Product already in cart, increase quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].qty += 1;
      setCartItems(updatedItems);
    } else {
      // Add new product to cart
      const newCartItem = {
        id: Date.now() + Math.random(),
        item: product.name,
        price: product.price,
        qty: 1,
        discount: product.discount,
        itemId: product._id // Store the database item reference
      };
      setCartItems(prev => [...prev, newCartItem]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerData._id) {
      alert("Customer ID not available!");
      return;
    }

    const newItem = {
      id: isEditMode ? editingProduct.id : Date.now() + Math.random(),
      item: productName,
      price: Number(price),
      qty: Number(quantity),
      discount: Number(discount),
    };

    try {
      // Save to backend if needed (for persistent storage)
      const itemData = {
        customer: customerData._id,
        name: productName,
        discount: Number(discount),
        price: Number(price),
        quantity: Number(quantity),
        gstRate: Number(gstRate)
      };

      // Only save to backend for new items, not temporary cart edits
      if (!isEditMode) {
        const res = await axios.post(`${apiUrl}/items`, itemData);

        if (res.status !== 201) {
          throw new Error('Failed to add item to database');
        }
        //console.log('Product added to database:', res.data);
        // Store the database item ID for later reference
        newItem.itemId = res.data.item._id;
      }

      // Update cart items (local state)
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
      console.error('Error adding product:', err);
      alert('Failed to add product. Please try again.');
    }
  };

  const calculateFinancials = () => {
    const subtotal = cartItems.reduce((acc, item) =>
      acc + (item.price * item.qty * (1 - item.discount / 100)), 0
    );
    const tax = subtotal * (gstRate / 100);
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

    // Validate data
    if (!validatePayment()) return;

    // Format invoice items for the database
    const invoiceItems = cartItems.map(item => {
      // Ensure all values are valid numbers
      const quantity = Number(item.qty);
      const price = Number(item.price);

      if (isNaN(quantity) || isNaN(price)) {
        throw new Error('Invalid quantity or price values');
      }

      return {
        productId: item.itemId,
        productName: item.item || 'Unnamed Product',
        quantity: quantity,
        price: price,
        amount: quantity * price,
        discount: Number(item.discount) || 0,
        gstRate: 18 // Default GST rate
      };
    });

    // Validate that we have valid items
    if (!invoiceItems.length) {
      alert('Please add at least one item to the invoice');
      return;
    }

    // Validate payment method
    const validPaymentMethods = ['cash', 'upi', 'card', 'bank_transfer'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      alert(`Invalid payment method. Please choose one of: ${validPaymentMethods.join(', ')}`);
      return;
    }

    // Create invoice data according to the schema
    const invoiceData = {
      customer: customerData._id,
      items: invoiceItems,
      subtotal: Number(financials.subtotal),
      totalGST: Number(financials.tax),
      grandTotal: Number(financials.grandTotal),
      paymentMethod: paymentMethod,
      amountPaid: Number(amountPaid) || 0,
      previousBalance: Number(previousBalance) || 0,
      remainingBalance: Number(balance) || 0
    };

    try {
      const response = await axios.post(`${apiUrl}/invoices/`, invoiceData);

      if (response.status === 201) {
        //console.log('Invoice created:', response.data);

        // Create bill data for display
        const billData = {
          // billNumber: response.data.invoice.invoiceNumber,
          invoiceNumber : `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,

          customer: {
            id: customerData._id || '',
            name: customerData.name || '',
            email: customerData.email || '',
            phone: customerData.phone || '',
            address: customerData.address || '',
            balance: Number(balance) || 0,
          },
          items: cartItems.map(item => ({
            item: item.item,
            price: Number(item.price),
            qty: Number(item.qty),
            discount: Number(item.discount)
          })),
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
          },
          // invoiceNumber: response.data.invoice.invoiceNumber
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
      console.error('Error details:', error);

      // Handle validation errors specifically
      if (error.response?.data?.message?.includes('validation failed')) {
        const errorMessage = error.response.data.message;
        // Extract specific validation errors
        if (errorMessage.includes('quantity')) {
          alert('Invalid quantity value. Please ensure all quantities are valid numbers greater than 0.');
        } else if (errorMessage.includes('amount')) {
          alert('Invalid amount value. Please check the price and quantity values.');
        } else if (errorMessage.includes('productName')) {
          alert('Product name is required for all items.');
        } else {
          alert('Invoice validation failed. Please check all item details.');
        }
      } else if (error.response?.status === 401) {
        navigate('/login');
      } else {
        alert('Failed to save invoice: ' + (error.response?.data?.message || error.message));
      }
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
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Customer Info</h1>
            <button
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              onClick={() => setShowProductsDrawer(!showProductsDrawer)}
            >
              <ShoppingBag size={18} />
              <span>{showProductsDrawer ? 'Hide' : 'Show'} Previous Products</span>
            </button>
          </div>
          <div className="text-sm space-y-1 mt-2">
            <p>Name: {customerData.name || 'N/A'}</p>
            <p>Phone: {customerData.phoneNumber || 'N/A'}</p>
            <p>Invoice Date: {currentDate}</p>
            <p>GST Number: {customerData.gstNumber || 'N/A'}</p>
          </div>
        </div>

        {/* Customer Products Drawer */}
        {showProductsDrawer && (
          <div className="bg-gray-50 border rounded-md p-4 mb-6 overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">
                Previous Products {loading ? '(Loading...)' : `(${customerProducts.length})`}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowProductsDrawer(false)}
              >
                <X size={18} />
              </button>
            </div>

            {loading ? (
              <p className="text-center text-gray-500 py-4">Loading products...</p>
            ) : customerProducts.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No previous products found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {customerProducts.map(product => (
                  <div key={product._id} className="border rounded-md p-3 bg-white shadow-sm">
                    <p className="font-medium">{product.name}</p>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>Price: ₹{product.price}</p>
                      <p>Discount: {product.discount}%</p>
                      <p>GST: {product.gstRate || gstRate}%</p>
                    </div>
                    <button
                      className="mt-2 w-full flex items-center justify-center gap-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 py-1 px-2 rounded"
                      onClick={() => addProductToCart(product)}
                    >
                      <PlusCircle size={14} /> Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Product Table */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 mb-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="font-semibold text-lg">Add Purchased Products ({cartItems.length})</h3>
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
            <div className="flex gap-2 flex-wrap">

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
            <p className={`text-lg font-semibold ${balance > 0 ? 'text-red-600' : 'text-green-600'
              }`}>
              ₹{balance.toFixed(2)}
            </p>
          </div>
          {paymentMethod == 'upi' && <div className=''>
            <button
              className="w-full sm:w-72 bg-blue-600 text-white py-2 rounded-md flex justify-center items-center text-lg"
              onClick={handlePayment}
            >Pay now</button>
          </div>
          }

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