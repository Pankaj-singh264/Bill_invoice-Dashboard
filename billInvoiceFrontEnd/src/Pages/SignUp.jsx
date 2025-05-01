import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const [showRightPanel, setShowRightPanel] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex overflow-hidden">
        {/* Left Side - Login */}
        <div className="w-full md:w-1/2 p-10">
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 rounded-full p-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-[#0F2657] "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75A4.5 4.5 0 0012 2.25v0a4.5 4.5 0 00-4.5 4.5v3.75m9 0h-9m9 0l-1.636 9.818A2.25 2.25 0 0112.636 22.5H11.36a2.25 2.25 0 01-2.22-2.182L7.5 10.5"
                />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-[#0F2657]  mb-2">Inventor</h1>
            <p className="text-gray-500 text-sm mb-6">welcome back! please enter your details.</p>

            <input
              type="text"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="password"
              placeholder="************"
              className="w-full px-4 py-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="w-full text-right text-sm text-blue-600 hover:underline cursor-pointer mb-4">
              Forgot Password?
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              <a href="/dashboard">Sign In</a>
            </button>
          </div>
        </div>

        {/* Right Side - Sign Up Prompt */}
        {showRightPanel && (
          <div className="hidden md:flex flex-col justify-between bg-[#0F2657] text-white p-10 relative w-1/2">
            <button
              className="absolute top-4 right-4 text-white hover:text-red-400"
              onClick={() => setShowRightPanel(false)}
            >
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
            <div className="mt-9">
              <h2 className="text-2xl font-bold mb-2 mt-9 text-center">New here?</h2>
              <p className="mb-6 text-xl text-center">Create your company account</p>
              <button className="bg-white text-[#0F2657] block mx-auto font-bold py-2 px-6 rounded hover:bg-gray-200">
                Sign Up
              </button>
            </div>

            <div className="flex justify-end mt-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white opacity-20"
              >
                <path d="M7 17l5-5 5 5z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
