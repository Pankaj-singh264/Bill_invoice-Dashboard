import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import InventoryPage from './Pages/InventoryPage';
import CustomerInfo from './Pages/CustomerInfo';
import ProductPurchase from './Pages/ProductPurchase';
import BillInvoice from './Pages/BillInvoice';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { CustomerProvider } from './contexts/CustomerContext';

export default function App() {
  return (
    <CustomerProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
           /* These two lines of code are defining public routes in a React application using React
           Router. */
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
              </Route>
            {/* </Route> */}

            {/* Redirect all unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </CustomerProvider>
  );
}
