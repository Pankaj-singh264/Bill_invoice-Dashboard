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
      </div>
    </div>
  );
}