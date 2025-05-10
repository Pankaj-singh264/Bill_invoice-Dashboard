import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Inventory from './Pages/InventoryPage'
import CustomerInfo from './Pages/CustomerInfo';
import CustomerPage from './Pages/CustomerPage';
import SignUp from './Pages/SignUp';
import ProductPurchase from './Pages/ProductPurchase';
import BillInvoice from './Pages/BillInvoice';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { CustomerProvider } from './contexts/CustomerContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CustomerProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Protected layout with nested routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="customer" element={<CustomerInfo />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="settings" element={<CustomerPage />} />
            </Route>
            <Route path="/productpurchase" element={<ProductPurchase />} />
            <Route path="/billinvoice" element={<BillInvoice />} />
          </Route>

          {/* Redirect all unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </CustomerProvider>
      </AuthProvider>
    </Router>
  );
}
