import { HiX } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useState, useEffect } from 'react';

const UserProfile = ({ user, collapsed, onMobileClose }) => {
  const { apiUrl } = useAuth();
  const [logoUrl, setLogoUrl] = useState(null);
  // console.log("user.logo", user.logo)

  useEffect(() => {
    const fetchLogo = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get(`${apiUrl}/user/logos/${user._id}`, {
            responseType: 'blob' // Important: This tells axios to expect binary data
          });
          
          // Create a blob URL from the response
          // const blob = new Blob([response.data], { type: response.headers['content-type'] });
          // console.log("response.data", response.data)
          const blob = response.data;
          // console.log("blob", blob)
          const url = URL.createObjectURL(blob);
          setLogoUrl(url);

          // Cleanup function
          return () => {
            URL.revokeObjectURL(url);
          };
        } catch (error) {
          console.error('Error fetching logo:', error);
          setLogoUrl(null);
        }
      }
    };

    fetchLogo();
  }, [user, apiUrl]);

  return (
    <div className="p-4 flex items-center justify-between border-b border-blue-800">
      <div className={`flex items-center space-x-3 ${collapsed ? 'lg:hidden' : ''}`}>
        {logoUrl ? (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={logoUrl} 
              alt={`${user?.companyName} logo`} 
              className="w-full h-full object-cover"
              onError={() => setLogoUrl(null)}
            />
          </div>
        ) : (
          <div className="bg-white text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {user?.city?.charAt(0) || 'U'}
          </div>
        )}
        <div>
          <p className="font-semibold text-sm">{user?.companyName || 'Company Name'}</p>
        </div>
      </div>
      
      <div className={`mx-auto ${collapsed ? 'lg:flex' : 'hidden'} items-center justify-center`}>
        {logoUrl ? (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={logoUrl} 
              alt={`${user?.companyName} logo`} 
              className="w-full h-full object-cover"
              onError={() => setLogoUrl(null)}
            />
          </div>
        ) : (
          <div className="bg-white text-blue-900 rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {user?.city?.charAt(0) || 'U'}
          </div>
        )}
      </div>
      
      <button onClick={onMobileClose} className="text-white opacity-70 hover:opacity-100 lg:hidden">
        <HiX className="w-5 h-5" />
      </button>
    </div>
  );
};

export default UserProfile; 