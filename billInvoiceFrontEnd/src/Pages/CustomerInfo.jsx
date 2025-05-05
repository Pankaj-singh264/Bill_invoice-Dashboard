
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import AddCustomerModal from "./AddCustomerModal";
// import {
//   faTrash,
//   faEllipsisV,
//   faFileInvoice,
//   faPlus,
//   faSearch,
//   faSpinner,
// } from "@fortawesome/free-solid-svg-icons";

// export default function CustomerPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomers, setSelectedCustomers] = useState(new Set());
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch customers from the database
//   const fetchCustomers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:5000/api/customer");
//       setCustomers(response.data);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching customers:", err);
//       setError("Failed to load customers. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const filteredCustomers = customers.filter(
//     (customer) =>
//       customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleCustomerAdded = (newCustomerData) => {
//     setCustomers([...customers, newCustomerData]);
//     setIsModalOpen(false);
//   };

//   const handleCheckboxChange = (customerId) => {
//     setSelectedCustomers((prevSelected) => {
//       const newSelected = new Set(prevSelected);
//       if (newSelected.has(customerId)) {
//         newSelected.delete(customerId);
//       } else {
//         newSelected.add(customerId);
//       }
//       return newSelected;
//     });
//   };

//   // Delete a single customer
//   const handleDeleteCustomer = async (customerId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/customer/${customerId}`);
//       // Refresh customer list after successful deletion
//       setCustomers(customers.filter(customer => customer._id !== customerId));
//       // Remove from selected if it's there
//       setSelectedCustomers(prev => {
//         const newSelected = new Set(prev);
//         newSelected.delete(customerId);
//         return newSelected;
//       });
//     } catch (err) {
//       console.error("Error deleting customer:", err);
//       alert("Failed to delete customer. Please try again.");
//     }
//   };

//   // Delete multiple selected customers
//   const handleDeleteSelected = async () => {
//     if (selectedCustomers.size === 0) return;
    
//     try {
//       const idsToDelete = Array.from(selectedCustomers);
//       await axios.post("http://localhost:5000/api/customer/delete-multiple", {
//         ids: idsToDelete
//       });
      
//       // Refresh customer list after successful deletion
//       setCustomers(customers.filter(customer => !selectedCustomers.has(customer._id)));
//       // Clear selected customers
//       setSelectedCustomers(new Set());
//     } catch (err) {
//       console.error("Error deleting customers:", err);
//       alert("Failed to delete selected customers. Please try again.");
//     }
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Main Content */}
//       <main className="flex-1 bg-white p-4 sm:p-6 overflow-y-auto">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//             <h1 className="text-2xl font-bold">Customers</h1>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
//             >
//               <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Customer
//             </button>

//             {isModalOpen && (
//               <AddCustomerModal
//                 onClose={handleCloseModal}
//                 onCustomerAdded={handleCustomerAdded}
//               />
//             )}
//           </div>

//           {/* Search Input */}
//           <div className="mb-6">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search customer by name, email"
//                 className="w-full border rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <FontAwesomeIcon
//                 icon={faSearch}
//                 className="absolute left-3 top-3 text-gray-400"
//               />
//             </div>
//           </div>

//           {/* Table or List */}
//           <div className="border rounded p-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">
//                 Customers Detail ({filteredCustomers.length})
//               </h2>
//               {selectedCustomers.size > 0 && (
//                 <div className="hidden sm:flex gap-4">
//                   <button 
//                     onClick={handleDeleteSelected}
//                     className="flex items-center text-red-500 hover:text-red-700"
//                   >
//                     <FontAwesomeIcon icon={faTrash} className="mr-1" />
//                     Delete Selected ({selectedCustomers.size})
//                   </button>
//                   <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer" />
//                 </div>
//               )}
//             </div>

//             {/* Loading indicator */}
//             {loading && (
//               <div className="flex justify-center items-center p-8">
//                 <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-2xl" />
//               </div>
//             )}

//             {/* Error message */}
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                 {error}
//               </div>
//             )}

//             {/* Table for larger screens */}
//             {!loading && !error && (
//               <div className="hidden sm:block overflow-x-auto">
//                 {filteredCustomers.length > 0 ? (
//                   <table className="min-w-full text-left">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="py-2 px-4">Name</th>
//                         <th className="py-2 px-4">Email</th>
//                         <th className="py-2 px-4">Phone</th>
//                         <th className="py-2 px-4">Address</th>
//                         <th className="py-2 px-4">Invoice</th>
//                         <th className="py-2 px-4">Actions</th>
//                         <th className="py-2 px-4">Select</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredCustomers.map((customer) => (
//                         <tr key={customer._id} className="border-b hover:bg-gray-50">
//                           <td className="py-2 px-4">{customer.name}</td>
//                           <td className="py-2 px-4">{customer.email}</td>
//                           <td className="py-2 px-4">{customer.phone}</td>
//                           <td className="py-2 px-4">{customer.address}</td>
//                           <td className="py-2 px-4">
//                             <div className="flex items-center gap-2">
//                               <FontAwesomeIcon icon={faFileInvoice} />
//                             </div>
//                           </td>
//                           <td className="py-2 px-4">
//                             <button
//                               onClick={() => handleDeleteCustomer(customer._id)}
//                               className="text-red-500 hover:text-red-700"
//                             >
//                               <FontAwesomeIcon icon={faTrash} />
//                             </button>
//                           </td>
//                           <td className="py-2 px-4">
//                             <input
//                               type="checkbox"
//                               checked={selectedCustomers.has(customer._id)}
//                               onChange={() => handleCheckboxChange(customer._id)}
//                               className="form-checkbox h-5 w-5 text-blue-600"
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     No customers found. Add your first customer or try a different search term.
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Cards for mobile view */}
//             {!loading && !error && (
//               <div className="sm:hidden flex flex-col gap-4">
//                 {filteredCustomers.length > 0 ? (
//                   filteredCustomers.map((customer) => (
//                     <div
//                       key={customer._id}
//                       className="border p-4 rounded-lg shadow-sm"
//                     >
//                       <div className="flex justify-between items-start">
//                         <h3 className="text-lg font-semibold mb-2">{customer.name}</h3>
//                         <div className="flex items-center space-x-2">
//                           <input
//                             type="checkbox"
//                             checked={selectedCustomers.has(customer._id)}
//                             onChange={() => handleCheckboxChange(customer._id)}
//                             className="form-checkbox h-4 w-4 text-blue-600"
//                           />
//                           <button
//                             onClick={() => handleDeleteCustomer(customer._id)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <FontAwesomeIcon icon={faTrash} />
//                           </button>
//                         </div>
//                       </div>
//                       <p className="text-sm"><span className="font-semibold">Email:</span> {customer.email}</p>
//                       <p className="text-sm"><span className="font-semibold">Phone:</span> {customer.phone}</p>
//                       <p className="text-sm"><span className="font-semibold">Address:</span> {customer.address}</p>
//                       <div className="flex items-center justify-between mt-4">
//                         <span className="text-sm font-semibold">Invoice:</span>
//                         <div className="flex items-center gap-2">
//                           <FontAwesomeIcon icon={faFileInvoice} />
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     No customers found. Add your first customer or try a different search term.
//                   </div>
//                 )}
//               </div>
//             )}
            
//             {selectedCustomers.size > 0 && (
//               <div className="sm:hidden flex justify-center mt-4">
//                 <button 
//                   onClick={handleDeleteSelected}
//                   className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 >
//                   <FontAwesomeIcon icon={faTrash} className="mr-2" />
//                   Delete Selected ({selectedCustomers.size})
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCustomerModal from "./AddCustomerModal";
import CustomerInvoiceModal from "./CustomerInvoiceModal";
import {
  faTrash,
  faEllipsisV,
  faFileInvoice,
  faPlus,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export default function CustomerPage() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customers from the database
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/customer");
      setCustomers(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCustomerAdded = (newCustomerData) => {
    setCustomers([...customers, newCustomerData]);
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (customerId) => {
    setSelectedCustomers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(customerId)) {
        newSelected.delete(customerId);
      } else {
        newSelected.add(customerId);
      }
      return newSelected;
    });
  };

  // Delete a single customer
  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/customer/${customerId}`);
      // Refresh customer list after successful deletion
      setCustomers(customers.filter(customer => customer._id !== customerId));
      // Remove from selected if it's there
      setSelectedCustomers(prev => {
        const newSelected = new Set(prev);
        newSelected.delete(customerId);
        return newSelected;
      });
    } catch (err) {
      console.error("Error deleting customer:", err);
      alert("Failed to delete customer. Please try again.");
    }
  };

  // Delete multiple selected customers
  const handleDeleteSelected = async () => {
    if (selectedCustomers.size === 0) return;
    
    try {
      const idsToDelete = Array.from(selectedCustomers);
      await axios.post("http://localhost:5000/api/customer/delete-multiple", {
        ids: idsToDelete
      });
      
      // Refresh customer list after successful deletion
      setCustomers(customers.filter(customer => !selectedCustomers.has(customer._id)));
      // Clear selected customers
      setSelectedCustomers(new Set());
    } catch (err) {
      console.error("Error deleting customers:", err);
      alert("Failed to delete selected customers. Please try again.");
    }
  };

  // Open invoice modal for a customer
  const handleOpenInvoiceModal = (customer) => {
    setSelectedCustomer(customer);
    setIsInvoiceModalOpen(true);
  };

  // Navigate to product purchase page with customer data
  const handleCustomerClick = (customer) => {
    navigate('/productpurchase', { state: { customerData: customer } });
  };

  return (
    <div className="flex h-screen overflow-hidden">
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
              {selectedCustomers.size > 0 && (
                <div className="hidden sm:flex gap-4">
                  <button 
                    onClick={handleDeleteSelected}
                    className="flex items-center text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
                    Delete Selected ({selectedCustomers.size})
                  </button>
                  <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer" />
                </div>
              )}
            </div>

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center items-center p-8">
                <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-2xl" />
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Table for larger screens */}
            {!loading && !error && (
              <div className="hidden sm:block overflow-x-auto">
                {filteredCustomers.length > 0 ? (
                  <table className="min-w-full text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Phone</th>
                        <th className="py-2 px-4">Address</th>
                        <th className="py-2 px-4">Invoice</th>
                        <th className="py-2 px-4">Actions</th>
                        <th className="py-2 px-4">Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr 
                          key={customer._id} 
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleCustomerClick(customer)}
                        >
                          <td className="py-2 px-4">{customer.name}</td>
                          <td className="py-2 px-4">{customer.email}</td>
                          <td className="py-2 px-4">{customer.phone}</td>
                          <td className="py-2 px-4">{customer.address}</td>
                          <td className="py-2 px-4" onClick={(e) => {
                            e.stopPropagation(); // Prevent row click
                            handleOpenInvoiceModal(customer);
                          }}>
                            <div 
                              className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800"
                            >
                              <FontAwesomeIcon icon={faFileInvoice} />
                              <span>View</span>
                            </div>
                          </td>
                          <td className="py-2 px-4" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCustomer(customer._id);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                          <td className="py-2 px-4" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedCustomers.has(customer._id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleCheckboxChange(customer._id);
                              }}
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No customers found. Add your first customer or try a different search term.
                  </div>
                )}
              </div>
            )}

            {/* Cards for mobile view */}
            {!loading && !error && (
              <div className="sm:hidden flex flex-col gap-4">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <div
                      key={customer._id}
                      className="border p-4 rounded-lg shadow-sm cursor-pointer"
                      onClick={() => handleCustomerClick(customer)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold mb-2">{customer.name}</h3>
                        <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedCustomers.has(customer._id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleCheckboxChange(customer._id);
                            }}
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCustomer(customer._id);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm"><span className="font-semibold">Email:</span> {customer.email}</p>
                      <p className="text-sm"><span className="font-semibold">Phone:</span> {customer.phone}</p>
                      <p className="text-sm"><span className="font-semibold">Address:</span> {customer.address}</p>
                      <div className="flex items-center justify-between mt-4" onClick={(e) => e.stopPropagation()}>
                        <span className="text-sm font-semibold">Invoice:</span>
                        <div 
                          className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenInvoiceModal(customer);
                          }}
                        >
                          <FontAwesomeIcon icon={faFileInvoice} />
                          <span>View</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No customers found. Add your first customer or try a different search term.
                  </div>
                )}
              </div>
            )}
            
            {selectedCustomers.size > 0 && (
              <div className="sm:hidden flex justify-center mt-4">
                <button 
                  onClick={handleDeleteSelected}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Delete Selected ({selectedCustomers.size})
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Invoice Modal */}
      {isInvoiceModalOpen && selectedCustomer && (
        <CustomerInvoiceModal
          customer={selectedCustomer}
          onClose={() => setIsInvoiceModalOpen(false)}
        />
      )}
    </div>
  );
}







// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import AddCustomerModal from "./AddCustomerModal";
// import { useNavigate } from "react-router-dom";
// import {
//   faTrash,
//   faEllipsisV,
//   faFileInvoice,
//   faPlus,
//   faSearch,
// } from "@fortawesome/free-solid-svg-icons";
// import { useCustomers } from "../contexts/CustomerContext";

// export default function CustomerPage() {
//   const navigate = useNavigate();
 
//   const { customers, addCustomer, deleteCustomers } = useCustomers();
//   console.log(customers.length)
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCustomers, setSelectedCustomers] = useState(new Set());

//   const filteredCustomers = customers.filter(
//     (customer) =>
//       customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleCustomer = (currentCustomer) => {
//     navigate('/productpurchase', { 
//       state: { 
//         customerData: currentCustomer 
//       }
//     });
//   };

//   const handleCustomerAdded = (newCustomerData) => {
//     addCustomer(newCustomerData);
//     setIsModalOpen(false);
//   };

//   const handleCheckboxChange = (email) => {
//     setSelectedCustomers((prevSelected) => {
//       const newSelected = new Set(prevSelected);
//       if (newSelected.has(email)) {
//         newSelected.delete(email);
//       } else {
//         newSelected.add(email);
//       }
//       return newSelected;
//     });
//   };

//   const handleDeleteSelected = () => {
//     deleteCustomers(selectedCustomers);
//     setSelectedCustomers(new Set());
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar
//       <div className="hidden md:block">
//         <Sidebar />
//       </div> */}

//       {/* Main Content */}
//       <main className="flex-1 bg-white p-4 sm:p-6 ">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//             <h1 className="text-2xl font-bold">Customers ({filteredCustomers.length})</h1>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
//             >
//               <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Customer
//             </button>

//             {isModalOpen && (
//               <AddCustomerModal
//                 onClose={handleCloseModal}
//                 onCustomerAdded={handleCustomerAdded}
//               />
//             )}
//           </div>

//           {/* Search Input */}
//           <div className="mb-6">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search customer by name, email"
//                 className="w-full border rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <FontAwesomeIcon
//                 icon={faSearch}
//                 className="absolute left-3 top-3 text-gray-400"
//               />
//             </div>
//           </div>

//           {/* Table or List */}
//           <div className="border rounded p-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">
//                 Customers Detail ({customers.length})
//               </h2>
//               <div className="hidden sm:flex gap-4">
//                 <FontAwesomeIcon
//                   icon={faTrash}
//                   className="cursor-pointer"
//                   onClick={handleDeleteSelected} // Trigger delete on icon click
//                 />
//                 <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer" />
//               </div>
//             </div>

//             {/* Table for larger screens */}
//             <div className="hidden sm:block overflow-x-auto">
//               <table className="min-w-full text-left">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="py-2 px-4">Name</th>
//                     <th className="py-2 px-4">Email</th>
//                     <th className="py-2 px-4">Phone</th>
//                     <th className="py-2 px-4">Address</th>
//                     <th className="py-2 px-4">Balance</th>
//                     <th className="py-2 px-4">Invoice</th>
//                     <th className="py-2 px-4">Select</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredCustomers.map((customer) => (
//                     <tr key={customer.email} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleCustomer(customer)}>
//                       <td className="py-2 px-4">{customer.name}</td>
//                       <td className="py-2 px-4">{customer.email}</td>
//                       <td className="py-2 px-4">{customer.phone}</td>
//                       <td className="py-2 px-4">{customer.address}</td>
//                       <td className="py-2 px-4">
//                         <span className={`font-semibold ${
//                           customer.balance > 0 ? 'text-red-600' : 'text-green-600'
//                         }`}>
//                           ₹{customer.balance || 0}
//                         </span>
//                       </td>
//                       <td className="py-2 px-4">
//                         <div className="flex items-center gap-2">
//                           <FontAwesomeIcon icon={faFileInvoice} />
//                         </div>
//                       </td>
//                       <td className="py-2 px-4">
//                         <input
//                           type="checkbox"
//                           checked={selectedCustomers.has(customer.email)}
//                           onChange={(e) => {
//                             e.stopPropagation();
//                             handleCheckboxChange(customer.email);
//                           }}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Cards for mobile view */}
//             <div className="sm:hidden flex flex-col gap-4">
//               {filteredCustomers.map((customer) => (
//                 <div
//                   key={customer.email}
//                   className="border p-4 rounded-lg shadow-sm cursor-pointer"
//                   onClick={() => handleCustomer(customer)}
//                 >
//                   <h3 className="text-lg font-semibold mb-2">{customer.name}</h3>
//                   <p className="text-sm"><span className="font-semibold">Email:</span> {customer.email}</p>
//                   <p className="text-sm"><span className="font-semibold">Phone:</span> {customer.phone}</p>
//                   <p className="text-sm"><span className="font-semibold">Address:</span> {customer.address}</p>
//                   <p className="text-sm mt-2">
//                     <span className="font-semibold">Balance:</span>
//                     <span className={`ml-2 ${
//                       customer.balance > 0 ? 'text-red-600' : 'text-green-600'
//                     }`}>
//                       ₹{customer.balance || 0}
//                     </span>
//                   </p>
//                   <div className="flex items-center justify-between mt-4">
//                     <span className="text-sm font-semibold">Invoice:</span>
//                     <div className="flex items-center gap-2">
//                       <FontAwesomeIcon icon={faFileInvoice} />
//                       {/* <input type="checkbox" /> */}
//                     </div>
//                   </div>
//                   {/* Mobile delete icon */}
//                   <FontAwesomeIcon
//                     icon={faTrash}
//                     className="cursor-pointer mt-2"
//                     onClick={() => handleDeleteSelected(customer.email)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
