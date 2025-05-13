import { HiX } from 'react-icons/hi';

const UserProfile = ({ user, collapsed, onMobileClose }) => {
  const userInitial = user?.companyName?.charAt(0)?.toUpperCase() || 'A';

  return (
    <div className="p-4 flex items-center justify-between border-b border-blue-800">
      <div className={`flex items-center space-x-3 ${collapsed ? 'lg:hidden' : ''}`}>
        <div className="bg-white text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {userInitial}
        </div>
        <div>
          <p className="font-semibold text-sm">{user?.companyName || 'Company Name'}</p>
        </div>
      </div>
      
      <div className={`mx-auto ${collapsed ? 'lg:flex' : 'hidden'} items-center justify-center`}>
        <div className="bg-white text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {userInitial}
        </div>
      </div>
      
      <button onClick={onMobileClose} className="text-white opacity-70 hover:opacity-100 lg:hidden">
        <HiX className="w-5 h-5" />
      </button>
    </div>
  );
};

export default UserProfile; 