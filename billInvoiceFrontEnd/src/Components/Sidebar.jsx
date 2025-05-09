import { useState } from 'react';
import { HiLogout, HiMenuAlt1, HiMenu } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import { useWindowSize } from '../hooks/useWindowSize';
import { NAV_ITEMS } from '../constants/navigation';
import SidebarItem from './layout/SidebarItem';
import UserProfile from './layout/UserProfile';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useWindowSize();
  const { currentUser, logout } = useAuth();

  const handleLinkClick = () => isMobile && setMobileOpen(false);
  
  const renderMobileToggle = () => (
    <button 
      onClick={() => setMobileOpen(true)}
      className="fixed top-4 left-4 z-20 bg-blue-900 text-white p-2 rounded-md lg:hidden"
    >
      <HiMenu className="w-6 h-6" />
    </button>
  );

  const renderSidebar = () => (
    <div className={`bg-blue-900 text-white h-full flex flex-col transition-all duration-300 ${
      collapsed && !isMobile ? 'w-16' : 'w-64'
    }`}>
      <UserProfile 
        user={currentUser?.user}
        collapsed={collapsed}
        isMobile={isMobile}
        onMobileClose={() => setMobileOpen(false)}
      />

      {!isMobile && (
        <div className="px-4 py-3 border-b border-blue-800">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="text-white opacity-70 hover:opacity-100 p-1 rounded-md hover:bg-blue-800 transition-colors"
          >
            <HiMenuAlt1 className="w-5 h-5" />
          </button>
        </div>
      )}

      <nav className="mt-4 flex-1 overflow-y-auto">
        <ul>
          {NAV_ITEMS.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              collapsed={collapsed}
              isMobile={isMobile}
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
          <HiLogout className={collapsed && !isMobile ? "" : "mr-2"} />
          {(!collapsed || isMobile) && "LOGOUT"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {isMobile && renderMobileToggle()}
      
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <div className={`
        fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out 
        lg:relative lg:translate-x-0
        ${isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'}
      `}>
        {renderSidebar()}
      </div>
    </>
  );
}
