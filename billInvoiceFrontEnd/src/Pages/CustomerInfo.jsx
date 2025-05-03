// import { useState, useEffect } from 'react';
// import { HiTrash, HiPencil, HiDotsHorizontal } from 'react-icons/hi';
// import { FaFileInvoice } from 'react-icons/fa';

// export default function CustomerInfo() {
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCustomers, setSelectedCustomers] = useState([]);
//   const [allCustomers, setAllCustomers] = useState([
//     { id: 1, name: 'Rishu Rawat', email: 'rr889985@gmail.com', phone: '7895613233', address: 'KhandGaon, Rishikesh' },
//     { id: 2, name: 'Robert Fox', email: 'rr889985@gmail.com', phone: '7895613233', address: 'KhandGaon, Rishikesh' },
//     { id: 3, name: 'Jane Cooper', email: 'rr889985@gmail.com', phone: '7895613233', address: 'KhandGaon, Rishikesh' },
//     { id: 4, name: 'Wade Warren', email: 'rr889985@gmail.com', phone: '7895613233', address: 'KhandGaon, Rishikesh' },
//     { id: 5, name: 'Wade Warren', email: 'rr889985@gmail.com', phone: '7895613233', address: 'KhandGaon, Rishikesh' },
//     { id: 6, name: 'Esther Howard', email: 'rr889985@gmail.com', phone: '7895613233', address: 'KhandGaon, Rishikesh' },
//   ]);
//   const [customers, setCustomers] = useState(allCustomers);
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: ''
//   });

//   // Filter customers when search term changes
//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setCustomers(allCustomers);
//     } else {
//       const filteredCustomers = allCustomers.filter(customer => 
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setCustomers(filteredCustomers);
//     }
//   }, [searchTerm, allCustomers]);
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
  
//   const handleAddCustomer = () => {
//     // Create new customer object
//     const newCustomer = {
//       id: allCustomers.length + 1,
//       ...formData
//     };
    
//     // Add to customers array
//     const updatedCustomers = [...allCustomers, newCustomer];
//     setAllCustomers(updatedCustomers);
    
//     // Reset form and close modal
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       address: ''
//     });
//     setShowAddModal(false);
//   };
  
//   const handleDeleteSelected = () => {
//     if (selectedCustomers.length > 0) {
//       const updatedCustomers = allCustomers.filter(
//         customer => !selectedCustomers.includes(customer.id)
//       );
//       setAllCustomers(updatedCustomers);
//       setSelectedCustomers([]);
//     }
//   };
  
//   const handleCustomerSelection = (customerId) => {
//     setSelectedCustomers(prev => {
//       if (prev.includes(customerId)) {
//         return prev.filter(id => id !== customerId);
//       } else {
//         return [...prev, customerId];
//       }
//     });
//   };
  
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Customers</h1>
//         <button 
//           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" 
//           onClick={() => setShowAddModal(true)}
//         >
//           Add Customer
//         </button>
//       </div>
      
//       {/* Search Bar */}
//       <div className="mb-6">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="search customer by name, email"
//             className="w-full p-2 pl-10 border border-gray-300 rounded-md"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//             <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//             </svg>
//           </div>
//         </div>
//       </div>
      
//       {/* Customer Table */}
//       <div className="bg-white rounded-md shadow">
//         <div className="p-4 flex justify-between items-center">
//           <h2 className="font-bold">Customers Detail({customers.length})</h2>
//           <div className="flex space-x-2">
//             <button 
//               className={`p-2 ${selectedCustomers.length > 0 ? 'text-red-500 hover:text-red-700' : 'text-gray-400 cursor-not-allowed'}`}
//               onClick={handleDeleteSelected}
//               disabled={selectedCustomers.length === 0}
//               title={selectedCustomers.length > 0 ? `Delete ${selectedCustomers.length} selected customer(s)` : 'Select customers to delete'}
//             >
//               <HiTrash className="w-5 h-5" />
//             </button>
//             <button className="p-2 text-gray-500 hover:text-gray-700">
//               <HiDotsHorizontal className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="border-t border-b">
//               <tr>
//                 <th className="px-4 py-2 text-left font-medium">Name</th>
//                 <th className="px-4 py-2 text-left font-medium">Email</th>
//                 <th className="px-4 py-2 text-left font-medium">Phone</th>
//                 <th className="px-4 py-2 text-left font-medium">Address</th>
//                 <th className="px-4 py-2 text-left font-medium">Invoice</th>
//                 <th className="px-4 py-2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {customers.map((customer) => (
//                 <tr key={customer.id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3">{customer.name}</td>
//                   <td className="px-4 py-3">{customer.email}</td>
//                   <td className="px-4 py-3">{customer.phone}</td>
//                   <td className="px-4 py-3">{customer.address}</td>
//                   <td className="px-4 py-3">
//                     <button className="text-gray-600 hover:text-blue-600">
//                       <FaFileInvoice className="w-5 h-5" />
//                     </button>
//                   </td>
//                   <td className="px-4 py-3">
//                     <input 
//                       type="checkbox" 
//                       className="rounded"
//                       checked={selectedCustomers.includes(customer.id)}
//                       onChange={() => handleCustomerSelection(customer.id)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
      
//       {/* Add Customer Modal */}
//       {showAddModal && (
//         <>
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowAddModal(false)}></div>
//           <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-50 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-2">Add New Customer</h2>
//             <p className="text-gray-600 mb-6">Enter the customer details below to add them to your system.</p>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="name">
//                   Name<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Individual name"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="email">
//                   Email<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="xxxxxxx@example.com"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="phone">
//                   Phone<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   placeholder="78956 13233"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="address">
//                   Address<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   placeholder="Khand Gaon, Near RTO office"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div className="flex justify-between mt-8">
//               <button 
//                 className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Cancel
//               </button>
//               <div className="flex space-x-2">
//                 <button 
//                   className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
//                   onClick={handleAddCustomer}
//                 >
//                   Add Customer
//                 </button>
//                 <button 
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   Add Products
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
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
  const [customers, setCustomers] = useState(
    JSON.parse(localStorage.getItem("customers")) || customersList
  );
  const [selectedCustomers, setSelectedCustomers] = useState(new Set()); // State to track selected customers

  const filteredCustomers = customers.filter(
    (customer) =>
      customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCustomerAdded = (newCustomerData) => {
    const updatedCustomers = [...customers, newCustomerData];
    setCustomers(updatedCustomers);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (email) => {
    setSelectedCustomers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(email)) {
        newSelected.delete(email);
      } else {
        newSelected.add(email);
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = () => {
    const updatedCustomers = customers.filter(
      (customer) => !selectedCustomers.has(customer.email)
    );
    setCustomers(updatedCustomers);
    setSelectedCustomers(new Set()); // Clear selected customers after deletion
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar
      <div className="hidden md:block">
        <Sidebar />
      </div> */}

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
              <AddCustomerModal
                onClose={handleCloseModal}
                onCustomerAdded={handleCustomerAdded}
              />
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
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer"
                  onClick={handleDeleteSelected} // Trigger delete on icon click
                />
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
                    <th className="py-2 px-4">Select</th> {/* Add a column for selecting customers */}
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
                          {/* <input type="checkbox" /> */}
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.has(customer.email)}
                          onChange={() => handleCheckboxChange(customer.email)}
                        />
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
                      {/* <input type="checkbox" /> */}
                    </div>
                  </div>
                  {/* Mobile delete icon */}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="cursor-pointer mt-2"
                    onClick={() => handleDeleteSelected(customer.email)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
