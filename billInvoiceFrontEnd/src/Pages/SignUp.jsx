import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import { useLocation } from 'react-router-dom';

const SignUp = () => {
  // const { userData } = useLocation().state;
  const { currentUser, register, updateProfile, apiUrl } = useAuth();
  // console.log(currentUser)
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    companyPhoneNo: '',
    companyEmail: '',
    billingAddress: '',
    state: '', 
    city: '', 
    pincode: '',
    isGstRegistered: true, 
    gstin: '',
    panNumber: '',
    enableEInvoice: false,
    password: '',
    confirmPassword: '',
    businessType: '',
    industryType: '',
    businessRegistrationType: '',
    termsAccepted: false
  });

  // File state
  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  // Error state
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill form with currentUser data if available
  useEffect(() => {
    if (currentUser) {
      setFormData(prevData => ({
        ...prevData,
        companyName: currentUser.companyName || '',
        companyPhoneNo: currentUser.companyPhoneNo || '',
        companyEmail: currentUser.companyEmail || '',
        billingAddress: currentUser.billingAddress || '',
        state: currentUser.state || '',
        city: currentUser.city || '',
        pincode: currentUser.pincode || '',
        isGstRegistered: currentUser.isGstRegistered ?? true,
        gstin: currentUser.gstin || '',
        panNumber: currentUser.panNumber || '',
        enableEInvoice: currentUser.enableEInvoice || false,
        businessType: currentUser.businessType || '',
        industryType: currentUser.industryType || '',
        businessRegistrationType: currentUser.businessRegistrationType || '',
        termsAccepted: true // Since user is already registered
      }));

      // Set logo preview if available
      if (currentUser.logo) {
        // console.log("currentUser.logo", currentUser.logo)
        // setLogoPreview(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/signature`);
        setLogoPreview(currentUser.logo)
      }

      // Set signature preview if available
      if (currentUser.signature) {
        setSignaturePreview(`${apiUrl}/user/signature/${currentUser._id}`);
      }
    }
  }, [currentUser, apiUrl]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear specific error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle GST registration selection
  const handleGstRegistration = (value) => {
    setFormData({
      ...formData,
      isGstRegistered: value
    });
    
    // Clear GSTIN error if switching to not registered
    if (!value && errors.gstin) {
      setErrors({
        ...errors,
        gstin: ''
      });
    }
  };

  // Handle logo upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          logo: 'Only JPEG, JPG, and PNG files are allowed'
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5000000) {
        setErrors({
          ...errors,
          logo: 'File size must be less than 5MB'
        });
        return;
      }
      
      setLogo(file);
      setErrors({
        ...errors,
        logo: ''
      });
      
      // Create preview using URL.createObjectURL
      const objectUrl = URL.createObjectURL(file);
      setLogoPreview(objectUrl);

      // Clean up the object URL when component unmounts
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  };

  // Handle signature upload
  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          signature: 'Only JPEG, JPG, and PNG files are allowed'
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5000000) {
        setErrors({
          ...errors,
          signature: 'File size must be less than 5MB'
        });
        return;
      }
      
      setSignature(file);
      setErrors({
        ...errors,
        signature: ''
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignaturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const handleRemoveLogo = () => {
    setLogo(null);
    setLogoPreview(null);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.companyPhoneNo) newErrors.companyPhoneNo = 'Company phone number is required';
    if (!formData.companyEmail) newErrors.companyEmail = 'Company email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) newErrors.companyEmail = 'Email is invalid';
    
    if (!formData.billingAddress) newErrors.billingAddress = 'Billing address is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    
    if (formData.isGstRegistered && !formData.gstin) newErrors.gstin = 'GSTIN is required for GST registered businesses';
    if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
    
    // Only validate password for new registrations
    if (!currentUser) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8 || formData.password.length > 15) {
        newErrors.password = 'Password must be between 8 and 15 characters';
      }
      
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.industryType) newErrors.industryType = 'Industry type is required';
    if (!formData.businessRegistrationType) newErrors.businessRegistrationType = 'Business registration type is required';
    
    // Only require signature for new registrations
    if (!currentUser && !signature) newErrors.signature = 'Signature is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstError);
      if (errorElement) errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setIsLoading(true);
    setSubmitError('');
    setSubmitSuccess('');
    
    try {
      // Create form data for multipart form submission
      const submitData = new FormData();
      
      // Add all form fields
      for (const key in formData) {
        if (key !== 'confirmPassword') { // Don't send confirmPassword to backend
          submitData.append(key, formData[key]);
        }
      }
      
      // Add files if they exist
      if (logo) submitData.append('logo', logo);
      if (signature) submitData.append('signature', signature);
      
      let response;
      if (currentUser) {
        // Update existing user profile
        response = await updateProfile(submitData);
        setSubmitSuccess('Profile updated successfully!');
      } else {
        // Register new user
        response = await register(submitData);
        setSubmitSuccess('Registration successful! Redirecting to dashboard...');
      }
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate(currentUser ? '/dashboard' : '/login');
      }, 2000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(
        error.response?.data?.message || 
        (currentUser ? 'Profile update failed.' : 'Registration failed.') + 
        ' Please check your information and try again.'
      );
      // window.scrollTo(0, 0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="w-full border-b border-black bg-[#0F2657] flex flex-wrap justify-end items-center p-4 gap-2">
          <a href="/dashboard">
            <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded border border-white text-white w-full sm:w-auto">Go Back</button>
            
          </a>
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className={`bg-white text-black px-4 py-2 rounded w-full sm:w-auto ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Processing...' : 'Save & Next'}
          </button>
        </div>

        {/* Form Container */}
        <div className="flex-grow flex items-center justify-center p-4 md:p-8">
          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg w-full max-w-7xl border">
            
            {/* Error and Success Messages */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p>{submitError}</p>
              </div>
            )}
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
                <p>{submitSuccess}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Left side - Company Info */}
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold">Company Info</h2>

                {/* Logo and Remove */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Company Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-3xl">👔</span>
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    <input 
                      type="file" 
                      id="logo" 
                      accept="image/jpeg,image/jpg,image/png" 
                      className="hidden" 
                      onChange={handleLogoChange}
                    />
                    <label htmlFor="logo" className="text-blue-500 text-sm font-semibold cursor-pointer">
                      {logo ? 'Change Logo' : 'Upload Logo'}
                    </label>
                    
                    {logo && (
                      <button 
                        type="button"
                        onClick={handleRemoveLogo} 
                        className="text-red-500 text-sm font-semibold mt-1"
                      >
                        Remove Logo
                      </button>
                    )}
                    
                    {errors.logo && <p className="text-xs text-red-500 mt-1">{errors.logo}</p>}
                  </div>
                </div>

                {/* Company Info Form */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company Name*</label>
                    <input 
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name" 
                      className={`w-full border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                    />
                    {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="companyPhoneNo" className="block text-sm font-medium mb-1">Company Phone No.*</label>
                      <input 
                        type="text"
                        id="companyPhoneNo"
                        name="companyPhoneNo"
                        value={formData.companyPhoneNo}
                        onChange={handleChange}
                        placeholder="Enter phone number" 
                        className={`w-full border ${errors.companyPhoneNo ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                      />
                      {errors.companyPhoneNo && <p className="text-xs text-red-500 mt-1">{errors.companyPhoneNo}</p>}
                    </div>
                    <div>
                      <label htmlFor="companyEmail" className="block text-sm font-medium mb-1">Company Email*</label>
                      <input 
                        type="email"
                        id="companyEmail"
                        name="companyEmail"
                        value={formData.companyEmail}
                        onChange={handleChange}
                        placeholder="Enter company email" 
                        className={`w-full border ${errors.companyEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                      />
                      {errors.companyEmail && <p className="text-xs text-red-500 mt-1">{errors.companyEmail}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="billingAddress" className="block text-sm font-medium mb-1">Billing Address*</label>
                    <input 
                      type="text"
                      id="billingAddress"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      placeholder="Enter billing address" 
                      className={`w-full border ${errors.billingAddress ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                    />
                    {errors.billingAddress && <p className="text-xs text-red-500 mt-1">{errors.billingAddress}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">State*</label>
                      <input 
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter state" 
                        className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                      />
                      {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium mb-1">Pincode*</label>
                      <input 
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter pincode" 
                        className={`w-full border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                      />
                      {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">City*</label>
                    <input 
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city" 
                      className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                    />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                  </div>

                  {/* GST Registered */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Are You GST Registered?*</label>
                    <div className="flex flex-wrap gap-4">
                      <button 
                        type="button"
                        onClick={() => handleGstRegistration(true)}
                        className={`flex-1 sm:flex-none px-6 py-2 ${formData.isGstRegistered ? 'bg-blue-600 text-white' : 'bg-gray-100 border border-gray-300 text-gray-700'} rounded-full text-sm`}
                      >
                        Yes
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleGstRegistration(false)}
                        className={`flex-1 sm:flex-none px-6 py-2 ${!formData.isGstRegistered ? 'bg-blue-600 text-white' : 'bg-gray-100 border border-gray-300 text-gray-700'} rounded-full text-sm`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  {formData.isGstRegistered && (
                    <div>
                      <label htmlFor="gstin" className="block text-sm font-medium mb-1">GSTIN*</label>
                      <input 
                        type="text"
                        id="gstin"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleChange}
                        placeholder="Enter GSTIN" 
                        className={`w-full border ${errors.gstin ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                      />
                      {errors.gstin && <p className="text-xs text-red-500 mt-1">{errors.gstin}</p>}
                    </div>
                  )}

                  <div>
                    <label htmlFor="panNumber" className="block text-sm font-medium mb-1">PAN Number*</label>
                    <input 
                      type="text"
                      id="panNumber"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      placeholder="Enter PAN number" 
                      className={`w-full border ${errors.panNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                    />
                    {errors.panNumber && <p className="text-xs text-red-500 mt-1">{errors.panNumber}</p>}
                  </div>

                  {/* e-Invoice toggle */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold text-gray-700">Enable e-Invoice</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        name="enableEInvoice"
                        checked={formData.enableEInvoice}
                        onChange={handleChange}
                        className="sr-only peer" 
                      />
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
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Create Password*</label>
                    <input 
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="********" 
                      className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                    />
                    <p className="text-xs text-red-500 mt-1">
                      {errors.password || "Note: password should be 8 to 15 characters"}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input 
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="********" 
                      className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                    />
                    <p className="text-xs text-red-500 mt-1">
                      {errors.confirmPassword || "Re-enter your password"}
                    </p>
                  </div>
                </div>

                {/* Business Info */}
                <div className="border rounded-xl p-4 space-y-4">
                  <h2 className="text-lg font-semibold mb-2">Business Info</h2>

                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium mb-1">Business Type*</label>
                    <input 
                      type="text"
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      placeholder="Finance etc..." 
                      className={`w-full border ${errors.businessType ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                    />
                    {errors.businessType && <p className="text-xs text-red-500 mt-1">{errors.businessType}</p>}
                  </div>

                  <div>
                    <label htmlFor="industryType" className="block text-sm font-medium mb-1">Industrial Type*</label>
                    <input 
                      type="text"
                      id="industryType"
                      name="industryType"
                      value={formData.industryType}
                      onChange={handleChange}
                      placeholder="Finance etc..." 
                      className={`w-full border ${errors.industryType ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                    />
                    {errors.industryType && <p className="text-xs text-red-500 mt-1">{errors.industryType}</p>}
                  </div>

                  <div>
                    <label htmlFor="businessRegistrationType" className="block text-sm font-medium mb-1">Business Registration Type*</label>
                    <input 
                      type="text"
                      id="businessRegistrationType"
                      name="businessRegistrationType"
                      value={formData.businessRegistrationType}
                      onChange={handleChange}
                      placeholder="Sole Proprietorship, Pvt Ltd..." 
                      className={`w-full border ${errors.businessRegistrationType ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-sm`} 
                    />
                    {errors.businessRegistrationType && <p className="text-xs text-red-500 mt-1">{errors.businessRegistrationType}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Terms & Conditions</label>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="termsAccepted"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="termsAccepted" className="text-sm">
                        I accept the <a href="/terms" className="text-blue-600 hover:underline">terms and conditions</a>
                      </label>
                    </div>
                    {errors.termsAccepted && <p className="text-xs text-red-500">{errors.termsAccepted}</p>}
                  </div>

                  {/* Signature Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Signature*</label>
                    <div className={`border-2 border-dashed ${errors.signature ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-xl p-6 text-center text-gray-400`}>
                      {signaturePreview ? (
                        <div className="flex flex-col items-center">
                          <img 
                            src={signaturePreview} 
                            alt="Signature" 
                            className="max-h-20 mb-2"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `
                                <input
                                  type="file"
                                  accept="image/jpeg,image/jpg,image/png"
                                  id="signature"
                                  className="hidden"
                                  onChange={handleSignatureChange}
                                />
                                <label htmlFor="signature" className="cursor-pointer text-blue-600 font-semibold">
                                  Upload Signature
                                </label>
                              `;
                            }}
                          />
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            id="signature"
                            className="hidden"
                            onChange={handleSignatureChange}
                          />
                          <label htmlFor="signature" className="cursor-pointer text-blue-600 font-semibold">
                            Change Signature
                          </label>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            id="signature"
                            className="hidden"
                            onChange={handleSignatureChange}
                          />
                          <label htmlFor="signature" className="cursor-pointer text-blue-600 font-semibold">
                            Browse...
                          </label>
                          <p className="text-xs mt-2">(Supported formats: .jpeg / .jpg / .png only)</p>
                        </>
                      )}
                    </div>
                    {errors.signature && <p className="text-xs text-red-500 mt-1">{errors.signature}</p>}
                  </div>

                </div>

              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;