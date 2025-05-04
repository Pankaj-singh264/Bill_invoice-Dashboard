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
      </div>
    </div>
  );
}