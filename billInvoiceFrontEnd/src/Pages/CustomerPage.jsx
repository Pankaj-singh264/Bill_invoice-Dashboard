// import React from 'react';
// import Sidebar from '../Components/Sidebar';

// const CustomerPage = () => {
//   return (
//     <div className="flex min-h-screen">
//       {/* Main Content */}
//       <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
//         <div className="bg-white border rounded-xl p-6 md:p-10 w-full max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//             {/* Company Info */}
//             <div className="flex flex-col space-y-6">

//               {/* Logo */}
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
//                   <span className="text-3xl">👔</span>
//                 </div>
//                 <button className="text-red-500 text-sm font-semibold">Remove Logo</button>
//               </div>

//               {/* Company Name */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Company Name*</label>
//                 <input type="text" placeholder="Unknown" className="w-full border rounded-lg p-3 text-sm" />
//               </div>

//               {/* Phone and Email */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Company Phone No.*</label>
//                   <input type="text" placeholder="Company Phone No." className="w-full border rounded-lg p-3 text-sm" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Company Email*</label>
//                   <input type="email" placeholder="Company Email" className="w-full border rounded-lg p-3 text-sm" />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Password*</label>
//                 <input type="password" placeholder="***********" className="w-full border rounded-lg p-3 text-sm" />
//               </div>

//               {/* Billing Address */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Billing Address*</label>
//                 <input type="text" placeholder="Billing Address" className="w-full border rounded-lg p-3 text-sm" />
//               </div>

//               {/* State and Pincode */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">State*</label>
//                   <input type="text" placeholder="State" className="w-full border rounded-lg p-3 text-sm" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Pincode*</label>
//                   <input type="text" placeholder="Pincode" className="w-full border rounded-lg p-3 text-sm" />
//                 </div>
//               </div>

//               {/* City */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">City*</label>
//                 <input type="text" placeholder="City" className="w-full border rounded-lg p-3 text-sm" />
//               </div>

//               {/* GST Registered */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">Are You GST Registered?*</label>
//                 <div className="flex gap-4">
//                   <button className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm">Yes</button>
//                   <button className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 text-sm">No</button>
//                 </div>
//               </div>

//               {/* GSTIN */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">GSTIN*</label>
//                 <input type="text" placeholder="GSTIN" className="w-full border rounded-lg p-3 text-sm" />
//               </div>

//               {/* PAN Number */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">PAN Number*</label>
//                 <input type="text" placeholder="PAN Number" className="w-full border rounded-lg p-3 text-sm" />
//               </div>

//               {/* Enable E-invoice */}
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-semibold">Enable e-Invoice</span>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input type="checkbox" className="sr-only peer" />
//                   <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative transition">
//                     <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
//                   </div>
//                 </label>
//               </div>

//             </div>

//             {/* Business Info */}
//             <div className="flex flex-col space-y-6 border rounded-xl p-6 ">

//               {/* Business Type */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Business Type*</label>
//                 <input type="text" placeholder="Finance etc..." className="w-full border rounded-lg p-3 text-sm" />
//               </div>

//               {/* Industrial Type */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Industrial Type*</label>
//                 <input type="text" placeholder="Finance etc..." className="w-full border rounded-lg p-3 text-sm" />
//               </div>

//               {/* Business Registration */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Business Registration Type</label>
//                 <input type="text" placeholder="Finance etc..." className="w-full border rounded-lg p-3 text-sm" />
//               </div>

//               {/* Terms */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Terms & Conditions</label>
//                 <textarea rows="3" placeholder="Terms and conditions" className="w-full border rounded-lg p-3 text-sm resize-none" />
//               </div>

//               {/* Signature */}
//               <div className="space-y-3">
//                 <label className="block text-sm font-medium mb-1">Signature*</label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
//                   <input type="file" id="signature" accept="image/*" className="hidden" />
//                   <label htmlFor="signature" className="cursor-pointer text-blue-600 font-semibold">Browse...</label>
//                   <p className="text-xs text-gray-400 mt-2">(Supported formats: .jpeg, .jpg, .png)</p>
//                 </div>
//               </div>

//               {/* Update Button */}
//               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg">
//                 Update
//               </button>

//             </div>

//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default CustomerPage;

import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useCustomers } from '../contexts/CustomerContext';

const CustomerPage = () => {
  const { currentUser, updateProfile, refreshUserData } = useAuth();
  const { cutomers, setCustomers, addCustomer,
    deleteCustomers,
    updateCustomer,
    getCustomerByEmail,
    updateCustomerBalance } = useCustomers()
  const [isLoading, setIsLoading] = useState(true);
  const [logoPreview, setLogoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  console.log(cutomers)
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    companyPhoneNo: '',
    companyEmail: '',
    password: '',
    billingAddress: '',
    state: '',
    pincode: '',
    city: '',
    isGstRegistered: false,
    gstin: '',
    panNumber: '',
    enableEInvoice: false,
    businessType: '',
    industryType: '',
    businessRegistrationType: '',
    termsAccepted: true
  });

  // State for file uploads
  const [files, setFiles] = useState({
    logo: null,
    signature: null
  });

  // Load user data when component mounts
  useEffect(() => {
    // Only fetch once on initial mount
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        // Only refresh user data if not already loaded
        if (currentUser && Object.keys(currentUser).length <= 2) {
          await refreshUserData();
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data");
        setIsLoading(false);
      }
    };

    fetchInitialData();
    // Empty dependency array to run only once on mount
  }, []);

  // Update form data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      // console.log("Setting form data from currentUser:", currentUser);
      setFormData({
        companyName: currentUser.user.companyName || '',
        companyPhoneNo: currentUser.user.companyPhoneNo || '',
        companyEmail: currentUser.user.companyEmail || '',
        password: '',
        billingAddress: currentUser.user.billingAddress || '',
        state: currentUser.user.state || '',
        pincode: currentUser.user.pincode || '',
        city: currentUser.user.city || '',
        isGstRegistered: currentUser.user.isGstRegistered || false,
        gstin: currentUser.user.gstin || '',
        panNumber: currentUser.user.panNumber || '',
        enableEInvoice: currentUser.user.enableEInvoice || false,
        businessType: currentUser.user.businessType || '',
        industryType: currentUser.user.industryType || '',
        businessRegistrationType: currentUser.user.businessRegistrationType || '',
        terms: currentUser.user.terms || '',
        termsAccepted: true
      });

      // Set logo preview if exists
      if (currentUser.logo) {
        setLogoPreview(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/${currentUser.logo}`);
      }

      // Set signature preview if exists
      if (currentUser.signature) {
        setSignaturePreview(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/${currentUser.signature}`);
      }
    }
  }, [currentUser]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFiles(prev => ({
        ...prev,
        [name]: files[0]
      }));

      // Create preview for the file
      const reader = new FileReader();
      reader.onload = (e) => {
        if (name === 'logo') {
          setLogoPreview(e.target.result);
        } else if (name === 'signature') {
          setSignaturePreview(e.target.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Handle GST option selection
  const handleGstSelection = (value) => {
    setFormData({
      ...formData,
      isGstRegistered: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData object for multipart form data
      const updatedData = new FormData();

      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        // Only add password if it was changed
        if (key === 'password' && !formData[key]) {
          return;
        }
        updatedData.append(key, formData[key]);
      });

      // Add files if changed
      if (files.logo) {
        updatedData.append('logo', files.logo);
      }

      if (files.signature) {
        updatedData.append('signature', files.signature);
      }

      // Call update profile method from auth context
      const result = await updateProfile(updatedData);
      console.log("Profile update result:", result);
      toast.success('Profile updated successfully!');

      // Refresh user data to ensure we have the latest
      await refreshUserData();
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMsg = error.response?.data?.message || 'Failed to update profile';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logo removal
  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setFiles(prev => ({
      ...prev,
      logo: null
    }));
    // Add a flag to indicate logo removal
    setFormData(prev => ({
      ...prev,
      removeLogo: true
    }));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <div className="bg-white border rounded-xl p-6 md:p-10 w-full max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Company Profile</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Company Info */}
            <div className="flex flex-col space-y-6">

              {/* Logo */}
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium">Company Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Company Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl">👔</span>
                    )}
                  </div>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <label htmlFor="logo" className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer text-sm">
                      Change
                    </label>
                    {logoPreview && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="px-3 py-1 border border-red-500 text-red-500 rounded text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company Name*</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full border rounded-lg p-3 text-sm"
                  required
                />
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyPhoneNo" className="block text-sm font-medium mb-1">Company Phone No.*</label>
                  <input
                    type="text"
                    id="companyPhoneNo"
                    name="companyPhoneNo"
                    value={formData.companyPhoneNo}
                    onChange={handleChange}
                    placeholder="Company Phone No."
                    className="w-full border rounded-lg p-3 text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="companyEmail" className="block text-sm font-medium mb-1">Company Email*</label>
                  <input
                    type="email"
                    id="companyEmail"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    placeholder="Company Email"
                    className="w-full border rounded-lg p-3 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Password (leave blank to keep current)</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full border rounded-lg p-3 text-sm"
                />
              </div>

              {/* Billing Address */}
              <div>
                <label htmlFor="billingAddress" className="block text-sm font-medium mb-1">Billing Address*</label>
                <input
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleChange}
                  placeholder="Billing Address"
                  className="w-full border rounded-lg p-3 text-sm"
                  required
                />
              </div>

              {/* State and Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium mb-1">State*</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full border rounded-lg p-3 text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium mb-1">Pincode*</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="w-full border rounded-lg p-3 text-sm"
                    required
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">City*</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border rounded-lg p-3 text-sm"
                  required
                />
              </div>

              {/* GST Registered */}
              <div>
                <label className="block text-sm font-medium mb-2">Are You GST Registered?*</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className={`px-6 py-2 rounded-full ${formData.isGstRegistered ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700'} text-sm`}
                    onClick={() => handleGstSelection(true)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`px-6 py-2 rounded-full ${!formData.isGstRegistered ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700'} text-sm`}
                    onClick={() => handleGstSelection(false)}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* GSTIN */}
              {formData.isGstRegistered && (
                <div>
                  <label htmlFor="gstin" className="block text-sm font-medium mb-1">GSTIN*</label>
                  <input
                    type="text"
                    id="gstin"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleChange}
                    placeholder="GSTIN"
                    className="w-full border rounded-lg p-3 text-sm"
                    required={formData.isGstRegistered}
                  />
                </div>
              )}

              {/* PAN Number */}
              <div>
                <label htmlFor="panNumber" className="block text-sm font-medium mb-1">PAN Number*</label>
                <input
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  placeholder="PAN Number"
                  className="w-full border rounded-lg p-3 text-sm"
                  required
                />
              </div>

              {/* Enable E-invoice */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Enable e-Invoice</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="enableEInvoice"
                    checked={formData.enableEInvoice}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative transition">
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${formData.enableEInvoice ? 'left-6' : 'left-1'}`}></div>
                  </div>
                </label>
              </div>

            </div>

            {/* Business Info */}
            <div className="flex flex-col space-y-6 border rounded-xl p-6">

              {/* Business Type */}
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium mb-1">Business Type*</label>
                <input
                  type="text"
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  placeholder="Finance etc..."
                  className="w-full border rounded-lg p-3 text-sm"
                  required
                />
              </div>

              {/* Industrial Type */}
              <div>
                <label htmlFor="industryType" className="block text-sm font-medium mb-1">Industrial Type*</label>
                <input
                  type="text"
                  id="industryType"
                  name="industryType"
                  value={formData.industryType}
                  onChange={handleChange}
                  placeholder="Finance etc..."
                  className="w-full border rounded-lg p-3 text-sm"
                  required
                />
              </div>

              {/* Business Registration */}
              <div>
                <label htmlFor="businessRegistrationType" className="block text-sm font-medium mb-1">Business Registration Type</label>
                <input
                  type="text"
                  id="businessRegistrationType"
                  name="businessRegistrationType"
                  value={formData.businessRegistrationType}
                  onChange={handleChange}
                  placeholder="Finance etc..."
                  className="w-full border rounded-lg p-3 text-sm"
                  required
                />
              </div>

              {/* Terms */}
              <div>
                <label htmlFor="terms" className="block text-sm font-medium mb-1">Terms & Conditions</label>
                <textarea
                  rows="3"
                  id="terms"
                  name="terms"
                  value={formData.terms || ''}
                  onChange={handleChange}
                  placeholder="Terms and conditions"
                  className="w-full border rounded-lg p-3 text-sm resize-none"
                />
              </div>

              {/* Signature */}
              <div className="space-y-3">
                <label className="block text-sm font-medium mb-1">Signature*</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  {signaturePreview && (
                    <div className="mb-4">
                      <img src={signaturePreview} alt="Signature Preview" className="max-h-32 mx-auto" />
                    </div>
                  )}
                  <input
                    type="file"
                    id="signature"
                    name="signature"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="signature" className="cursor-pointer text-blue-600 font-semibold">Browse...</label>
                  <p className="text-xs text-gray-400 mt-2">(Supported formats: .jpeg, .jpg, .png)</p>
                </div>
              </div>

              {/* Update Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update'}
              </button>

            </div>

          </form>
        </div>
      </div>

    </div>
  );
};

export default CustomerPage;