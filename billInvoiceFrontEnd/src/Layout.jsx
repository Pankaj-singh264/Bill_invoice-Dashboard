// src/Layout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar';

export default function Layout() {
  return (
    <div className="flex  bg-gray-50">
      {/* Sidebar - now self-contained */}
        <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-auto pl-0 ">
        <Outlet />
      </div>
    </div>
  );
}