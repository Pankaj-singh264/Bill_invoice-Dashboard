import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import CustomerDetail from './Pages/CustomerDetail';
import CustomerDetail2 from './Pages/CustomerDetail2';
import CustomerInfo from './Pages/CustomerInfo';
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import InventoryPage from './Pages/InventoryPage';
import CustomerPage from './Pages/CustomerPage';
import ProductPurchase from './Pages/ProductPurchase';
import BillInvoice from './Pages/BillInvoice';
import Sidebar2 from './Components/Sidebar2';

const router = createBrowserRouter([
  { path: "/customerdetail", element: <CustomerDetail /> },
  { path: "/customerdetail2", element: <CustomerDetail2 /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/", element: <SignUp /> },
  { path: "/login", element: <Login/> },
  { path: "/customerinfo", element: <CustomerInfo /> },
  { path: "/inventorypage", element: <InventoryPage /> },
  { path: "/customerpage", element: <CustomerPage /> },
  {path: "/productpurchase", element: <ProductPurchase/>},
  {path: "/billinvoice", element: <BillInvoice/>},
  {path: "/Sidebar2", element: <Sidebar2/>}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
