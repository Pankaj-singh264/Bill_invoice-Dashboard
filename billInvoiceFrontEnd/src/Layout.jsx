// src/Layout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
<<<<<<< HEAD
=======
      {/* Sidebar - now self-contained */}
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
      <Sidebar/>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto pl-0 ">
        <Outlet />
      </div>
    </div>
  );
}