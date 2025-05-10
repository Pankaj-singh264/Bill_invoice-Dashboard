import { NavLink } from 'react-router-dom';

const SidebarItem = ({ item, collapsed, isMobile, onClick }) => {
  const Icon = item.icon;
  
  return (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) => 
          `w-full flex items-center py-3 ${collapsed && !isMobile ? 'px-0 justify-center' : 'px-4'} ${
            isActive ? 'bg-blue-800' : 'hover:bg-blue-800'
          }`
        }
        onClick={onClick}
        end
      >
        <div className="text-white mr-3">
          <Icon className="w-5 h-5" />
        </div>
        {(!collapsed || isMobile) && <span className="text-sm md:text-base">{item.name}</span>}
      </NavLink>
    </li>
  );
};

export default SidebarItem; 