import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimes,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const API_URL = 'http://localhost:5000/api';

export default function CustomerInvoiceModal({ customer, onClose }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddInvoice, setShowAddInvoice] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/invoices/customer/${customer._id}`);
        console.log('Invoice response:', response.data);
        
        if (response.data.success) {
          setInvoices(response.data.invoices);
        } else {
          setError('Failed to fetch invoices');
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setError(error.response?.data?.message || 'Failed to fetch invoices');
      } finally {
        setLoading(false);
      }
    };

    if (customer?._id) {
      fetchInvoices();
    }
  }, [customer]);

  // Calculate total amount
  const calculateTotalAmount = () => {
    return invoices.reduce((total, invoice) => total + Number(invoice.amount), 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">
              Invoices for {customer?.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total Invoices: {invoices.length} | Total Amount: ₹{calculateTotalAmount().toFixed(2)}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Customer Details */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm"><span className="font-medium">Name:</span> {customer.name}</p>
              <p className="text-sm"><span className="font-medium">Email:</span> {customer.email}</p>
              <p className="text-sm"><span className="font-medium">Phone:</span> {customer.phone}</p>
            </div>
            <div>
              <p className="text-sm"><span className="font-medium">Address:</span> {customer.address}</p>
              <p className="text-sm"><span className="font-medium">Balance:</span> ₹{customer.balance || 0}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-2xl" />
            <p className="mt-2">Loading invoices...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            {error}
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No invoices found for this customer.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(invoice.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{invoice.itemCount} items</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{Number(invoice.amount).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-right font-medium">Total:</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">₹{calculateTotalAmount().toFixed(2)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}