import { HiHome, HiUserGroup, HiCube, HiCog, HiDocumentText } from 'react-icons/hi';

export const NAV_ITEMS = [
  { 
    name: 'Dashboard', 
    path: '/', 
    icon: HiHome 
  },
  { 
    name: 'Customer', 
    path: '/customer', 
    icon: HiUserGroup 
  },
  { 
    name: 'Invoices', 
    path: '/invoices', 
    icon: HiDocumentText 
  },
  { 
    name: 'Inventory', 
    path: '/inventory', 
    icon: HiCube 
  },
  { 
    name: 'Settings', 
    path: '/settings', 
    icon: HiCog 
  }
]; 