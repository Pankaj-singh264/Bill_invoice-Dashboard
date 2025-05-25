import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiArrowLeft, HiDownload, HiPrinter } from 'react-icons/hi';

export default function InvoiceDetails() {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = 'https://bill-invoice-dashboard.onrender.com' ;

  useEffect(() => {
    // console.log("id", id);
    fetchInvoiceDetails();
  }, [id]);


  const fetchInvoiceDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/invoices/${id}`);
      if (response.data.success) {
        setInvoice(response.data.invoice);
        console.log("invoice", response.data.invoice);
      } else {
        setError(response.data.message || 'Failed to load invoice details');
      }
    } catch (error) {
      console.error('Error fetching invoice:', error);
      setError(error.response?.data?.message || 'Failed to load invoice details');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`${API_URL}/invoices/${id}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading invoice:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Invoice not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/invoices')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <HiArrowLeft className="w-5 h-5 mr-2" />
          Back to Invoices
        </button>
        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <HiDownload className="w-5 h-5 mr-2" />
            Download
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <HiPrinter className="w-5 h-5 mr-2" />
            Print
          </button>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Invoice #{invoice.invoiceNumber}</h1>
            <p className="text-gray-600">Date: {new Date(invoice.date).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Status:</p>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold
              ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'}`}
            >
              {invoice.status}
            </span>
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
            <div className="text-gray-600">
              <p className="font-medium">{invoice.customerId?.name || invoice.customerName}</p>
              <p>{invoice.customerId?.email}</p>
              <p>{invoice.customerId?.phone}</p>
              <p>{invoice.customerId?.address}</p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
            <div className="text-gray-600">
              <p><span className="font-medium">Payment Method:</span> {invoice.paymentMethod}</p>
              <p><span className="font-medium">Amount Paid:</span> ₹{invoice.amountPaid?.toFixed(2)}</p>
              <p><span className="font-medium">Previous Balance:</span> ₹{invoice.previousBalance?.toFixed(2)}</p>
              <p><span className="font-medium">Remaining Balance:</span> ₹{invoice.remainingBalance?.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoice.items?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.productName || item.productId?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{item.price?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{item.amount?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal:</span>
              <span>₹{invoice.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax:</span>
              <span>₹{invoice.tax?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>Total:</span>
              <span>₹{invoice.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Notes</h2>
            <p className="text-gray-600">{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
} 