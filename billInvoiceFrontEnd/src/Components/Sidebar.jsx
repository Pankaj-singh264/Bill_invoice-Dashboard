
// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { HiHome, HiUserGroup, HiCube, HiCog, HiLogout, HiX, HiMenuAlt1, HiMenu } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext'; 

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const { currentUser, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/home', icon: <HiHome className="w-5 h-5" /> },
    { name: 'Customer', path: '/home/customer', icon: <HiUserGroup className="w-5 h-5" /> },
    { name: 'Inventory', path: '/home/inventory', icon: <HiCube className="w-5 h-5" /> },
    { name: 'Settings', path: '/home/settings', icon: <HiCog className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderMobileToggle = () => (
    <button 
      onClick={toggleMobile}
      className="fixed top-4 right-4 z-20 bg-blue-900 text-white p-2 rounded-md lg:hidden"
    >
      <HiMenu className="w-6 h-6" />
    </button>
  );

  const renderSidebar = () => {
    const userInitial = currentUser?.username?.charAt(0)?.toUpperCase();

    return (
      <div className={`bg-blue-900 text-white h-full flex flex-col  transition-all duration-300 ${collapsed && !isMobile ? 'w-16' : 'w-64'}`}>
        <div className="p-4 flex items-center justify-between border-b border-blue-300  ">
          {(!collapsed || isMobile) && (
            <div className="flex items-center space-x-3">
              <div className="bg-white text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {userInitial}
              </div>
              <div>
                <p className="font-semibold text-sm">{currentUser?.username}</p>
                {/* <p className="text-xs opacity-70">{currentUser?.company}</p> */}
              </div>
            </div>
          )}

          {collapsed && !isMobile && (
            <div className="mx-auto">
              <div className="bg-white text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {userInitial}
              </div>
            </div>
          )}

          {isMobile && (
            <button onClick={toggleMobile} className="text-white opacity-70 hover:opacity-100 ">
              <HiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {!isMobile && (
          <div className="px-4 py-3 border-b border-blue-800  ">
            <button 
              onClick={toggleCollapse} 
              className="text-white opacity-70 hover:opacity-100 p-1 rounded-md hover:bg-blue-800 transition-colors"
            >
              <HiMenuAlt1 className="w-5 h-5" />
            </button>
          </div>
        )}

        <nav className="mt-4 flex-1 overflow-y-auto">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `w-full flex items-center py-3 ${collapsed && !isMobile ? 'px-0 justify-center' : 'px-4'} ${
                      isActive ? 'bg-blue-800' : 'hover:bg-blue-800'
                    }`
                  }
                  onClick={handleLinkClick}
                  end
                >
                  <div className="text-white mr-3">
                    {item.icon}
                  </div>
                  {(!collapsed || isMobile) && <span className="text-sm md:text-base">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-4 border-t border-blue-800">
          <button 
            className="bg-blue-800 text-white w-full py-2 rounded flex items-center justify-center text-sm"
            onClick={logout}
          >
            <HiLogout className={collapsed && !isMobile ? "" : "mr-2"} />
            {(!collapsed || isMobile) && "LOGOUT"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {isMobile && renderMobileToggle()}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden  "
          onClick={toggleMobile}
        ></div>
      )}
      <div 
        className={`
          fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 mb-8 ease-in-out 
          lg:relative lg:translate-x-0 
          ${isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        {renderSidebar()}
      </div>
    </>
  );
}
