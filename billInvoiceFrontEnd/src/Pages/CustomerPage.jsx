import React from 'react';
import Sidebar from '../Components/Sidebar';

const CustomerPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <div className="bg-white border rounded-xl p-6 md:p-10 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Company Info */}
            <div className="flex flex-col space-y-6">

              {/* Logo */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <span className="text-3xl">👔</span>
                </div>
                <button className="text-red-500 text-sm font-semibold">Remove Logo</button>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Company Name*</label>
                <input type="text" placeholder="Unknown" className="w-full border rounded-lg p-3 text-sm" />
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Phone No.*</label>
                  <input type="text" placeholder="Company Phone No." className="w-full border rounded-lg p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company Email*</label>
                  <input type="email" placeholder="Company Email" className="w-full border rounded-lg p-3 text-sm" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1">Password*</label>
                <input type="password" placeholder="***********" className="w-full border rounded-lg p-3 text-sm" />
              </div>

              {/* Billing Address */}
              <div>
                <label className="block text-sm font-medium mb-1">Billing Address*</label>
                <input type="text" placeholder="Billing Address" className="w-full border rounded-lg p-3 text-sm" />
              </div>

              {/* State and Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">State*</label>
                  <input type="text" placeholder="State" className="w-full border rounded-lg p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pincode*</label>
                  <input type="text" placeholder="Pincode" className="w-full border rounded-lg p-3 text-sm" />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium mb-1">City*</label>
                <input type="text" placeholder="City" className="w-full border rounded-lg p-3 text-sm" />
              </div>

              {/* GST Registered */}
              <div>
                <label className="block text-sm font-medium mb-2">Are You GST Registered?*</label>
                <div className="flex gap-4">
                  <button className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm">Yes</button>
                  <button className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 text-sm">No</button>
                </div>
              </div>

              {/* GSTIN */}
              <div>
                <label className="block text-sm font-medium mb-1">GSTIN*</label>
                <input type="text" placeholder="GSTIN" className="w-full border rounded-lg p-3 text-sm" />
              </div>

              {/* PAN Number */}
              <div>
                <label className="block text-sm font-medium mb-1">PAN Number*</label>
                <input type="text" placeholder="PAN Number" className="w-full border rounded-lg p-3 text-sm" />
              </div>

              {/* Enable E-invoice */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Enable e-Invoice</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative transition">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>

            </div>

            {/* Business Info */}
            <div className="flex flex-col space-y-6 border rounded-xl p-6 ">

              {/* Business Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Business Type*</label>
                <input type="text" placeholder="Finance etc..." className="w-full border rounded-lg p-3 text-sm" />
              </div>

              {/* Industrial Type */}
              <div>
                <label className="block text-sm font-medium mb-1">Industrial Type*</label>
                <input type="text" placeholder="Finance etc..." className="w-full border rounded-lg p-3 text-sm" />
              </div>

              {/* Business Registration */}
              <div>
                <label className="block text-sm font-medium mb-1">Business Registration Type</label>
                <input type="text" placeholder="Finance etc..." className="w-full border rounded-lg p-3 text-sm" />
              </div>

              {/* Terms */}
              <div>
                <label className="block text-sm font-medium mb-1">Terms & Conditions</label>
                <textarea rows="3" placeholder="Terms and conditions" className="w-full border rounded-lg p-3 text-sm resize-none" />
              </div>

              {/* Signature */}
              <div className="space-y-3">
                <label className="block text-sm font-medium mb-1">Signature*</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <input type="file" id="signature" accept="image/*" className="hidden" />
                  <label htmlFor="signature" className="cursor-pointer text-blue-600 font-semibold">Browse...</label>
                  <p className="text-xs text-gray-400 mt-2">(Supported formats: .jpeg, .jpg, .png)</p>
                </div>
              </div>

              {/* Update Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg">
                Update
              </button>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default CustomerPage;
