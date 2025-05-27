import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../Components/Sidebar";

const BillInvoice = () => {
  const location = useLocation();
  const { billData } = location.state || {};
  console.log(billData)
  const { currentUser } = useAuth()
  //console.log("currentUser", currentUser)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount).replace('INR', '₹');
  };

  // useEffect(()=>{
  //   async function loadUser() {
  //   ////console.log(currrenUser)  
  //   }
  //   loadUser
  // },[])

  // const currentUser =  currentUser.currentUser
  ////console.log(user)
  return (
    <section className=" bg-gradient-to-r from-amber-200 via-amber-100 to-amber-50 p-4">
     <div>
        <Sidebar />
     </div>

      <div className="container mx-auto">
        <div className="max-w-full sm:max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Bill Invoice</h1>
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Print
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                Download
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
                Share
              </button>
            </div>
          </div>

          {/* Invoice Section */}
          <div className="border p-4 rounded" id="invoice-content">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">Invoice</h2>

            {/* Billing Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="text-gray-600">
                <p>
                  <strong>Bill From:</strong> {currentUser.companyName}
                </p>
                <p>
                  {currentUser.city} || {currentUser.pincode} || {currentUser.state}
                </p>
                <p className="mt-4">
                  <strong>Bill To:</strong> {billData?.customer?.name}
                </p>
                <p>{billData?.customer?.address}</p>
              </div>
              <div className="text-gray-600 text-right">
                <p>
                  <strong>Invoice Details:</strong>
                </p>
                <p>Date: {billData?.date}</p>
                <p>
                  Payment Method:{" "}
                  <span className="capitalize">{billData?.payment?.method}</span>
                </p>
              </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-t border-b">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">Product Name</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Discount</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {billData?.items?.map((item) => (
                    <tr key={item.item} className="border-t">
                      <td className="p-2">{item.item}</td>
                      <td className="p-2">{formatCurrency(item.price)}</td>
                      <td className="p-2">{item.qty}</td>
                      <td className="p-2">{item.discount}%</td>
                      <td className="p-2">
                        {formatCurrency(
                          item.price * item.qty * (1 - item.discount / 100)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="text-right mt-6 space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Subtotal:</span>{" "}
                {formatCurrency(billData?.totals?.subtotal)}
              </p>
              <p>
                <span className="font-semibold">Tax (18%):</span>{" "}
                {formatCurrency(billData?.totals?.tax)}
              </p>
              <p className="text-xl font-bold">
                Grand Total: {formatCurrency(billData?.totals?.grandTotal)}
              </p>
            </div>

            {/* Payment Details */}
            <div className="mt-6 space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Previous Balance:</span>{" "}
                {formatCurrency(billData?.payment?.previousBalance)}
              </p>
              <p>
                <span className="font-semibold">Amount Paid:</span>{" "}
                {formatCurrency(billData?.payment?.amountPaid)}
              </p>
              <p>
                <span className="font-semibold">Remaining Balance:</span>{" "}
                {formatCurrency(billData?.payment?.remainingBalance)}
              </p>
            </div>

            {/* Thank You Note */}
            <p className="text-center mt-8 text-blue-600 font-semibold">
              Thank you for your Purchase!!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillInvoice;