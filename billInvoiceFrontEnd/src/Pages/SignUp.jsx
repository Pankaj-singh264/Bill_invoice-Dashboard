<<<<<<< HEAD
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { register: authRegister } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      gstRegistered: "no",
      eInvoice: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      await authRegister(data);
      navigate("/home");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const gstRegistered = watch("gstRegistered");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="w-full border-b bg-[#0F2657] p-4 flex justify-end">
        <a href="/login" className="text-white mr-4">
          Existing User? Login
        </a>
      </div>

      {/* Form Container */}
      <div className="flex-grow flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-7xl"
        >
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - Company Info */}
            <div className="space-y-6 row-span-2">
              <h2 className="text-2xl font-bold border-b pb-2">
                Company Information
              </h2>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Company Name*
                </label>
                <input
                  {...register("companyName", { required: "Company name is required" })}
                  className="w-full border rounded-lg p-3 text-sm"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone*</label>
                  <input
                    {...register("companyPhone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className="w-full border rounded-lg p-3 text-sm"
                  />
                  {errors.companyPhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.companyPhone.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email*</label>
                  <input
                    type="email"
                    {...register("companyEmail", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full border rounded-lg p-3 text-sm"
                  />
                  {errors.companyEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.companyEmail.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Billing Address*</label>
                <input
                  {...register("billingAddress", { required: "Address is required" })}
                  className="w-full border rounded-lg p-3 text-sm"
                />
                {errors.billingAddress && (
                  <p className="text-red-500 text-xs mt-1">{errors.billingAddress.message}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">State*</label>
                  <input
                    {...register("state", { required: "State is required" })}
                    className="w-full border rounded-lg p-3 text-sm"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City*</label>
                  <input
                    {...register("city", { required: "City is required" })}
                    className="w-full border rounded-lg p-3 text-sm"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pincode*</label>
                  <input
                    {...register("pinCode", {
                      required: "Pincode is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Invalid pincode",
                      },
                    })}
                    className="w-full border rounded-lg p-3 text-sm"
                  />
                  {errors.pinCode && (
                    <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GST Registered*</label>
                <Controller
                  name="gstRegistered"
                  control={control}
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => field.onChange("yes")}
                        className={`px-6 py-2 rounded-full ${field.value === "yes" ? "bg-blue-600 text-white" : "bg-gray-100"
                          }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => field.onChange("no")}
                        className={`px-6 py-2 rounded-full ${field.value === "no" ? "bg-blue-600 text-white" : "bg-gray-100"
                          }`}
                      >
                        No
                      </button>
                    </div>
                  )}
                />
              </div>

              {gstRegistered === "yes" && (
                <>
                  <div className="flex flex-col gap-4">
                    <label className="block text-sm font-medium mb-1">GSTIN*</label>
                    <input
                      {...register("gstin", {
                        required: "GSTIN is required for GST registered companies",
                        // pattern: {
                        //   value: /^[0-9A-Z]{15}$/,
                        //   message: "Invalid GSTIN format",
                        // },
                      })}
                      className="w-full border rounded-lg p-3 text-sm"
                    />
                    {errors.gstin && (
                      <p className="text-red-500 text-xs mt-1">{errors.gstin.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">*pin</label>
                    <input
                      {...register("state", { required: "pin  is required" ,type: "number"})}
                      className="w-full border rounded-lg p-3 text-sm"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                    )}
                  </div></>
              )}
            </div>

            {/* Middle Column - Login Setup */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold border-b pb-2">Account Setup</h2>

              <div>
                <label className="block text-sm font-medium mb-1">Password*</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full border rounded-lg p-3 text-sm"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm Password*
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="w-full border rounded-lg p-3 text-sm"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Business Info */}
            <div className="space-y-6 grid-cols-2">
              <h2 className="text-2xl font-bold border-b pb-2">Business Details</h2>

              <div>
                <label className="block text-sm font-medium mb-1">Business Type*</label>
                <input
                  {...register("businessType", { required: "Business type is required" })}
                  className="w-full border rounded-lg p-3 text-sm"
                />
                {errors.businessType && (
                  <p className="text-red-500 text-xs mt-1">{errors.businessType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Industry Type*</label>
                <input
                  {...register("industryType", { required: "Industry type is required" })}
                  className="w-full border rounded-lg p-3 text-sm"
                />
                {errors.industryType && (
                  <p className="text-red-500 text-xs mt-1">{errors.industryType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Signature*</label>
                <input
                  type="file"
                  {...register("signature", {
                    // required: "Signature is required",
                    // validate: {
                    //   fileFormat: (value) =>
                    //     ["image/jpeg", "image/png"].includes(value[0]?.type) ||
                    //     "Only JPG/PNG files are allowed",
                    //   fileSize: (value) =>
                    //     value[0]?.size <= 500000 || "File size should be less than 500KB",
                    // },
                  })}
                  className="w-full border rounded-lg p-3 text-sm"
                />
                {errors.signature && (
                  <p className="text-red-500 text-xs mt-1">{errors.signature.message}</p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? "bg-blue-400" : "bg-[#0F2657] hover:bg-blue-900"
                    } text-white py-3 rounded-lg transition`}
                >
                  {isSubmitting ? "Creating Account..." : "Complete Registration"}
                </button>
              </div>
            </div>
          </div>
        </form>
=======
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";

// export default function Signup() {
//   const [showRightPanel, setShowRightPanel] = useState(true);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex overflow-hidden">
//         {/* Left Side - Login */}
//         <div className="w-full md:w-1/2 p-10">
//           <div className="flex flex-col items-center">
//             <div className="bg-gray-200 rounded-full p-4 mb-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-10 h-10 text-[#0F2657] "
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M16.5 10.5V6.75A4.5 4.5 0 0012 2.25v0a4.5 4.5 0 00-4.5 4.5v3.75m9 0h-9m9 0l-1.636 9.818A2.25 2.25 0 0112.636 22.5H11.36a2.25 2.25 0 01-2.22-2.182L7.5 10.5"
//                 />
//               </svg>
//             </div>
            
//             <h1 className="text-2xl font-bold text-[#0F2657]  mb-2">Inventor</h1>
//             <p className="text-gray-500 text-sm mb-6">welcome back! please enter your details.</p>

//             <input
//               type="text"
//               placeholder="Enter your Email"
//               className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//             <input
//               type="password"
//               placeholder="************"
//               className="w-full px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//             <div className="w-full text-right text-sm text-blue-600 hover:underline cursor-pointer mb-4">
//               Forgot Password?
//             </div>
//             <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
//               <a href="/home">Sign In</a>
//             </button>
//           </div>
//         </div>

//         {/* Right Side - Sign Up Prompt */}
//         {showRightPanel && (
//           <div className="hidden md:flex flex-col justify-between bg-[#0F2657] text-white p-10 relative w-1/2">
//             <button
//               className="absolute top-4 right-4 text-white hover:text-red-400"
//               onClick={() => setShowRightPanel(false)}
//             >
//               <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
//             </button>
//             <div className="mt-9">
//               <h2 className="text-2xl font-bold mb-2 mt-9 text-center">New here?</h2>
//               <p className="mb-6 text-xl text-center">Create your company account</p>
//               <button className="bg-white text-[#0F2657] block mx-auto font-bold py-2 px-6 rounded hover:bg-gray-200">
//                 Sign Up
//               </button>
//             </div>

//             <div className="flex justify-end mt-auto">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-6 h-6 text-white opacity-20"
//               >
//                 <path d="M7 17l5-5 5 5z" />
//               </svg>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    gstNumber: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.businessName || !formData.gstNumber) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      // Use the register function from auth context
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        businessName: formData.businessName,
        gstNumber: formData.gstNumber,
        address: formData.address || ""
      });

      // Redirect to dashboard - navigation will be handled by the auth module
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Fixed width container for better mobile experience */}
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Registration Form */}
          <div className="w-full md:w-3/5 p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-gray-200 rounded-full p-3 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-[#0F2657]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75A4.5 4.5 0 0012 2.25v0a4.5 4.5 0 00-4.5 4.5v3.75m9 0h-9m9 0l-1.636 9.818A2.25 2.25 0 0112.636 22.5H11.36a2.25 2.25 0 01-2.22-2.182L7.5 10.5"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[#0F2657] mb-1">Inventor</h1>
              <p className="text-gray-500 text-sm">Create a new account</p>
            </div>

            {error && (
              <div className="mb-4 w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username*
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Your username"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password*
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password*
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="********"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name*
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Your Company Name"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST Number*
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  placeholder="e.g. 22AAAAA0000A1Z5"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your business address"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows="2"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} text-white py-2 rounded transition`}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>
          </div>

          {/* Right Side - Login Prompt */}
          <div className="hidden md:flex flex-col justify-center items-center bg-[#0F2657] text-white p-8 w-2/5">
            <div className="text-center max-w-xs">
              <h2 className="text-2xl font-bold mb-4">Already have an account?</h2>
              <p className="mb-6">Sign in to access your inventory, invoices, and business tools</p>
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-[#0F2657] font-bold py-2 px-6 rounded hover:bg-gray-200 transition"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Login Link */}
        <div className="md:hidden text-center p-4 border-t">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
      </div>
    </div>
  );
}