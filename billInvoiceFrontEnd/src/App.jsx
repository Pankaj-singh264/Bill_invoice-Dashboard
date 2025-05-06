<<<<<<< HEAD
=======
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from 'react-router-dom';
// import CustomerDetail from './Pages/CustomerDetail';
// import CustomerDetail2 from './Pages/CustomerDetail2';
// import CustomerInfo from './Pages/CustomerInfo';
// import Dashboard from './Pages/Dashboard';
// import SignUp from './Pages/SignUp';
// import Login from './Pages/Login';
// import InventoryPage from './Pages/InventoryPage';
// import CustomerPage from './Pages/CustomerPage';
// import ProductPurchase from './Pages/ProductPurchase';
// import BillInvoice from './Pages/BillInvoice';
// import Sidebar2 from './Components/Sidebar2';

// const router = createBrowserRouter([
//   { path: "/customerdetail", element: <CustomerDetail /> },
//   { path: "/customerdetail2", element: <CustomerDetail2 /> },
//   { path: "/dashboard", element: <Dashboard /> },
//   { path: "/", element: <SignUp /> },
//   { path: "/login", element: <Login/> },
//   { path: "/customerinfo", element: <CustomerInfo /> },
//   { path: "/inventorypage", element: <InventoryPage /> },
//   { path: "/customerpage", element: <CustomerPage /> },
//   {path: "/productpurchase", element: <ProductPurchase/>},
//   {path: "/billinvoice", element: <BillInvoice/>},
//   {path: "/Sidebar2", element: <Sidebar2/>}
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;





>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
<<<<<<< HEAD
import InventoryPage from './Pages/InventoryPage';
import CustomerInfo from './Pages/CustomerInfo';
=======
import Inventory from './Pages/InventoryPage'
import CustomerInfo from './Pages/CustomerInfo';
import CustomerPage from './Pages/CustomerPage';
import CustomerDetail from './Pages/CustomerDetail';
import CustomerDetail2 from './Pages/CustomerDetail2';
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
import ProductPurchase from './Pages/ProductPurchase';
import BillInvoice from './Pages/BillInvoice';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { CustomerProvider } from './contexts/CustomerContext';

export default function App() {
  return (
<<<<<<< HEAD
    <CustomerProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
     
            {/* <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} /> */}

            {/* Protected layout with nested routes */}
            {/* <Route element={<ProtectedRoute />}> */}
            {/* <Route path="/" element={<Layout />}> */}
              <Route path="/home" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="customer" element={<CustomerInfo />} />
                <Route path="productpurchase" element={<ProductPurchase />} />
                <Route path="billinvoice" element={<BillInvoice />} />
                <Route path="signup" element={<SignUp />} />
              </Route>
            {/* </Route> */}

            {/* Redirect all unknown routes to home */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </CustomerProvider>
=======
    <Router>
      <AuthProvider>
        <CustomerProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/signup" element={<CustomerDetail2 />} />
          <Route path="/login" element={<Login />} />

          {/* Protected layout with nested routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="customer" element={<CustomerInfo />} />
              <Route path="settings" element={<CustomerPage />} />
            </Route>
            <Route path="/customerdetail" element={<CustomerDetail />} />
            <Route path="/productpurchase" element={<ProductPurchase />} />
            <Route path="/billinvoice" element={<BillInvoice />} />
          </Route>

          {/* Redirect all unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </CustomerProvider>
      </AuthProvider>
    </Router>
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
  );
}
