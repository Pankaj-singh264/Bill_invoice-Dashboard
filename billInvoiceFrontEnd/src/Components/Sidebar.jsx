import { useState } from 'react';
import { HiLogout, HiMenuAlt1, HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import { NAV_ITEMS } from '../constants/navigation';
import SidebarItem from './layout/SidebarItem';
import UserProfile from './layout/UserProfile';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  // console.log(currentUser)

  const handleLinkClick = () => {
    setMobileOpen(false);
  };
  
  const handleUserProfileClick = () => {
    // Navigate to signup page with user data
    navigate('/signup', { state: { userData: currentUser } });
    setMobileOpen(false);
  };
  
  const renderSidebar = () => (
    <div className={`bg-blue-900 text-white h-full flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}>
      <div onClick={handleUserProfileClick} className="cursor-pointer">
        <UserProfile 
          user={currentUser}
          collapsed={collapsed}
          onMobileClose={() => setMobileOpen(false)}
        />
      </div>

      <div className="px-4 py-3 border-b border-blue-800 hidden lg:block">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-white opacity-70 hover:opacity-100 p-1 rounded-md hover:bg-blue-800 transition-colors"
        >
          <HiMenu className="w-5 h-5" />
          {/* {collapsed ? <HiMenu className="w-5 h-5" /> : <HiMenuAlt1 className="w-5 h-5" />} */}
        </button>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto">
        <ul>
          {NAV_ITEMS.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              collapsed={collapsed}
              onClick={handleLinkClick}
            />
          ))}
        </ul>
      </nav>

      <div className="mt-auto p-4 border-t border-blue-800">
        <button 
          onClick={logout}
          className="bg-blue-800 text-white w-full py-2 rounded flex items-center justify-center text-sm"
        >
          <HiLogout className={collapsed ? "lg:m-0" : "mr-2"} />
          <span className={collapsed ? "lg:hidden" : ""}>LOGOUT</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-20 bg-blue-900 text-white p-2 rounded-md lg:hidden"
      >
        <HiMenu className="w-6 h-6" />
      </button>
      
      {/* Overlay for Mobile Menu */}
      {mobileOpen && (
        <div 
          className="fixed inset-x-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out 
        lg:relative lg:translate-x-0 ${collapsed ? 'lg:w-16' : 'lg:w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {renderSidebar()}
      </div>
    </>
  );
}
