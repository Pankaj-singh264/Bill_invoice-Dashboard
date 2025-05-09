import { HiX } from 'react-icons/hi';

const UserProfile = ({ user, collapsed, isMobile, onMobileClose }) => {
  const userInitial = user?.companyName?.charAt(0)?.toUpperCase() || 'A';

  return (
    <div className="p-4 flex items-center justify-between border-b border-blue-800">
      {(!collapsed || isMobile) && (
        <div className="flex items-center space-x-3">
          <div className="bg-white text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {userInitial}
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.companyName || 'Company Name'}</p>
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
        <button onClick={onMobileClose} className="text-white opacity-70 hover:opacity-100">
          <HiX className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default UserProfile; 