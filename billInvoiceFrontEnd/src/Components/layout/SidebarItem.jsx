import { NavLink } from 'react-router-dom';

const SidebarItem = ({ item, collapsed, onClick }) => {
  const Icon = item.icon;
  
  return (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) => 
          `w-full flex items-center py-3 ${collapsed ? 'lg:px-0 lg:justify-center' : 'px-4'} ${
            isActive ? 'bg-blue-800' : 'hover:bg-blue-800'
          }`
        }
        onClick={onClick}
        end
      >
        <div className="text-white mr-3 lg:mr-3">
          <Icon className="w-5 h-5" />
        </div>
        <span className={collapsed ? "lg:hidden text-sm md:text-base" : "text-sm md:text-base"}>
          {item.name}
        </span>
      </NavLink>
    </li>
  );
};

export default SidebarItem; 