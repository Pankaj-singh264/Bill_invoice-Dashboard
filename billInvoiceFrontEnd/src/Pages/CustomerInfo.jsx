import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCustomerModal from "./AddCustomerModal";
import {
  faTrash,
  faEllipsisV,
  faFileInvoice,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Components/Sidebar";

const customersList = [
  {
    name: "Rishu Rawat",
    email: "rr889985@gmail.com",
    phone: "7895613233",
    address: "KhandGaon, Rishikesh",
  },
  {
    name: "Robert Fox",
    email: "robert@example.com",
    phone: "7895613233",
    address: "KhandGaon, Rishikesh",
  },
  {
    name: "Jane Cooper",
    email: "jane@example.com",
    phone: "7895613233",
    address: "KhandGaon, Rishikesh",
  },
  {
    name: "Wade Warren",
    email: "wade@example.com",
    phone: "7895613233",
    address: "KhandGaon, Rishikesh",
  },
  {
    name: "Esther Howard",
    email: "esther@example.com",
    phone: "7895613233",
    address: "KhandGaon, Rishikesh",
  },
];

export default function CustomerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customersList.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white p-4 sm:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold">Customers</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Customer
            </button>

            {isModalOpen && (
              <AddCustomerModal onClose={() => setIsModalOpen(false)} />
            )}
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search customer by name, email"
                className="w-full border rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-3 text-gray-400"
              />
            </div>
          </div>

          {/* Table or List */}
          <div className="border rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Customers Detail ({filteredCustomers.length})
              </h2>
              <div className="hidden sm:flex gap-4">
                <FontAwesomeIcon icon={faTrash} className="cursor-pointer" />
                <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer" />
              </div>
            </div>

            {/* Table for larger screens */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Phone</th>
                    <th className="py-2 px-4">Address</th>
                    <th className="py-2 px-4">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.email} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{customer.name}</td>
                      <td className="py-2 px-4">{customer.email}</td>
                      <td className="py-2 px-4">{customer.phone}</td>
                      <td className="py-2 px-4">{customer.address}</td>
                      <td className="py-2 px-4">
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faFileInvoice} />
                          <input type="checkbox" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for mobile view */}
            <div className="sm:hidden flex flex-col gap-4">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.email}
                  className="border p-4 rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-semibold mb-2">{customer.name}</h3>
                  <p className="text-sm"><span className="font-semibold">Email:</span> {customer.email}</p>
                  <p className="text-sm"><span className="font-semibold">Phone:</span> {customer.phone}</p>
                  <p className="text-sm"><span className="font-semibold">Address:</span> {customer.address}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-semibold">Invoice:</span>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faFileInvoice} />
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
