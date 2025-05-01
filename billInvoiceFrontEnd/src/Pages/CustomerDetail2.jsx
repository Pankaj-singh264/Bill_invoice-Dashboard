import React from 'react';

const CustomerDetail2 = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="w-full border-b border-black bg-[#0F2657] flex flex-wrap justify-end items-center p-4 gap-2">
          <a href="/dashboard">
            <button className="px-4 py-2 rounded border border-white text-white w-full sm:w-auto">Go Back</button>
          </a>
          <button className="bg-white text-black px-4 py-2 rounded w-full sm:w-auto">Save & Next</button>
        </div>

        {/* Form Container */}
        <div className="flex-grow flex items-center justify-center p-4 md:p-8">
          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg w-full max-w-7xl border">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Left side - Company Info */}
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold">Company Info</h2>

                {/* Logo and Remove */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-gray-400 text-3xl">👔</span>
                  </div>
                  <button className="text-red-500 text-sm font-semibold">Remove Logo</button>
                </div>

                {/* Company Info Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Company Name*</label>
                    <input type="text" placeholder="Unknown" className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Company Phone No.*</label>
                      <input type="text" placeholder="Company Phone No." className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Company Email*</label>
                      <input type="email" placeholder="Company Email" className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Billing Address*</label>
                    <input type="text" placeholder="7529 E. Pecan St." className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">State*</label>
                      <input type="text" placeholder="Uttarakhand" className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pincode*</label>
                      <input type="text" placeholder="249201" className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">City*</label>
                    <input type="text" placeholder="Rishikesh" className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                  </div>

                  {/* GST Registered */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Are You GST Registered?*</label>
                    <div className="flex flex-wrap gap-4">
                      <button className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white rounded-full text-sm">Yes</button>
                      <button className="flex-1 sm:flex-none px-6 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-full text-sm">No</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">GSTIN*</label>
                    <input type="text" placeholder="RTOF88FJFHKFHKSIF" className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">PAN Number*</label>
                    <input type="text" placeholder="ABCDE1234F" className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                  </div>

                  {/* e-Invoice toggle */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold text-gray-700">Enable e-Invoice</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>

                </div>
              </div>

              {/* Right side - Login Setup + Business Info */}
              <div className="space-y-6">
                {/* Login Setup */}
                <div className="border rounded-xl p-4 space-y-4">
                  <h2 className="text-lg font-semibold mb-2">Login Setup</h2>

                  <div>
                    <label className="block text-sm font-medium mb-1">Create Password*</label>
                    <input type="password" placeholder="******" className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                    <p className="text-xs text-red-500 mt-1">Note: password should be 8 to 15 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input type="password" placeholder="********" className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                    <p className="text-xs text-red-500 mt-1">Re-enter your password</p>
                  </div>
                </div>

                {/* Business Info */}
                <div className="border rounded-xl p-4 space-y-4">
                  <h2 className="text-lg font-semibold mb-2">Business Info</h2>

                  <div>
                    <label className="block text-sm font-medium mb-1">Business Type*</label>
                    <input type="text" placeholder="Finance etc..." className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Industrial Type*</label>
                    <input type="text" placeholder="Finance etc..." className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Business Registration Type</label>
                    <input type="text" placeholder="Sole Proprietorship, Pvt Ltd..." className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Terms & Conditions</label>
                    <textarea placeholder="terms and conditions" className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none" rows="3"></textarea>
                  </div>

                  {/* Signature Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Signature*</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400">
                      <input type="file" accept="image/*" id="signature" className="hidden" />
                      <label htmlFor="signature" className="cursor-pointer text-blue-600 font-semibold">Browse...</label>
                      <p className="text-xs mt-2">(Supported formats: .jpeg / .jpg / .png only)</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetail2;
