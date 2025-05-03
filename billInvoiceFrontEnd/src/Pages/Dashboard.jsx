import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HiDocumentText, HiUserGroup, HiCube, HiMenu } from 'react-icons/hi';
import { FaRupeeSign } from "react-icons/fa";
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';
import { HiDocumentDuplicate } from 'react-icons/hi';

export default function Dashboard() {
  // Initialize all the data directly inside the component
  const currentDate = "21 April 2025";
  const dayOfWeek = "Monday";
  
  // Stats data
  const stats = {
    totalRevenue: {
      value: 1400568.79,
      change: 20.1,
      period: "month",
      currency: "₹",
      icon: "revenue"
    },
    pendingInvoices: {
      value: 12,
      change: -4,
      period: "week",
      icon: "invoice"
    },
    totalCustomers: {
      value: 136,
      change: 10.1,
      period: "month",
      icon: "customer"
    },
    inventoryTotal: {
      value: 12,
      change: -16,
      period: "week",
      icon: "inventory"
    }
  };
  
  // Revenue data
  const revenueData = {
    title: "Revenue Overview",
    subtitle: "Revenue trends over past 6 months",
    currentMonth: "May",
    currentMonthValue: 296099,
    year: "2025",
    period: "Jan-July",
    currency: "₹",
    data: [
      { month: "January", value: 50000 },
      { month: "February", value: 150000 },
      { month: "March", value: 100000 },
      { month: "April", value: 180000 },
      { month: "May", value: 150000 },
      { month: "June", value: 130000 },
      { month: "July", value: 296099 }
    ]
  };
  
  // Recent activities
  const recentActivities = [
    {
      id: "1043",
      type: "Invoice created",
      customerName: "Rishubh Rawat",
      time: "Just now"
    },
    {
      id: "1023",
      type: "Invoice created",
      customerName: "Sung Jin Woo",
      time: "3h ago"
    },
    {
      id: "1076",
      type: "Invoice created",
      customerName: "AB company",
      time: "5h ago"
    },
    {
      id: "1004",
      type: "Invoice created",
      customerName: "Walter White",
      time: "12h ago"
    }
  ];

  // Helper function for formatting currency
  const formatCurrency = (value, currency = "₹") => {
    return `${currency}${value.toLocaleString()}`;
  };

  // Helper function for rendering icons with react-icons
  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'revenue':
        return <FaRupeeSign className="h-6 w-6" />;
      case 'invoice':
        return <HiDocumentText className="h-6 w-6" />;
      case 'customer':
        return <HiUserGroup className="h-6 w-6" />;
      case 'inventory':
        return <HiCube className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-blue-900 text-white p-3 md:p-4 flex justify-end">
  <div className="flex flex-col md:flex-row items-end md:items-end space-y-1 md:space-y-0 md:space-x-4 text-sm md:text-base">
    <span className="flex items-end">👋 Welcome back</span>
    <span className="hidden md:inline">|</span>
    <span>{currentDate}</span>
    <span className="hidden md:inline">|</span>
    <span>{dayOfWeek}</span>
  </div>
</div>

      
      {/* Dashboard Content */}
      <div className="bg-white p-4 md:p-6 rounded-b-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
          <div className="space-x-0 md:space-x-3 flex flex-col sm:flex-row w-full md:w-auto space-y-2 sm:space-y-0">
            <button className="border border-gray-300 rounded px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base whitespace-nowrap">
              Export Reports
            </button>
            <button className="bg-blue-600 text-white rounded px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base whitespace-nowrap">
              New Invoice
            </button>
          </div>
        </div>
        
        {/* Stats Cards - Using react-icons now */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {/* Total Revenue Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4">
            <div className="flex justify-between items-center mb-1 md:mb-2">
              <span className="text-gray-600 text-sm md:text-base">Total Revenue</span>
              <span className="text-gray-500">{renderIcon(stats.totalRevenue.icon)}</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">{formatCurrency(stats.totalRevenue.value)}</div>
            <div className={`flex items-center text-xs md:text-sm ${stats.totalRevenue.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.totalRevenue.change >= 0 ? (
                <HiArrowUp className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              ) : (
                <HiArrowDown className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              )}
              <span>{stats.totalRevenue.change >= 0 ? '+' : ''}{stats.totalRevenue.change}%</span>
              <span className="text-gray-500 ml-1">from last {stats.totalRevenue.period}</span>
            </div>
          </div>
          
          {/* Pending Invoice Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4">
            <div className="flex justify-between items-center mb-1 md:mb-2">
              <span className="text-gray-600 text-sm md:text-base">Pending Invoice</span>
              <span className="text-gray-500">{renderIcon(stats.pendingInvoices.icon)}</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">{stats.pendingInvoices.value}</div>
            <div className={`flex items-center text-xs md:text-sm ${stats.pendingInvoices.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.pendingInvoices.change >= 0 ? (
                <HiArrowUp className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              ) : (
                <HiArrowDown className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              )}
              <span>{stats.pendingInvoices.change >= 0 ? '+' : ''}{stats.pendingInvoices.change}%</span>
              <span className="text-gray-500 ml-1">from last {stats.pendingInvoices.period}</span>
            </div>
          </div>
          
          {/* Total Customer Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4">
            <div className="flex justify-between items-center mb-1 md:mb-2">
              <span className="text-gray-600 text-sm md:text-base">Total Customer</span>
              <span className="text-gray-500">{renderIcon(stats.totalCustomers.icon)}</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">{stats.totalCustomers.value}</div>
            <div className={`flex items-center text-xs md:text-sm ${stats.totalCustomers.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.totalCustomers.change >= 0 ? (
                <HiArrowUp className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              ) : (
                <HiArrowDown className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              )}
              <span>{stats.totalCustomers.change >= 0 ? '+' : ''}{stats.totalCustomers.change}%</span>
              <span className="text-gray-500 ml-1">from last {stats.totalCustomers.period}</span>
            </div>
          </div>
          
          {/* Inventory Total Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4">
            <div className="flex justify-between items-center mb-1 md:mb-2">
              <span className="text-gray-600 text-sm md:text-base">Inventory Total</span>
              <span className="text-gray-500">{renderIcon(stats.inventoryTotal.icon)}</span>
            </div>
            <div className="text-xl md:text-2xl font-bold">{stats.inventoryTotal.value}</div>
            <div className={`flex items-center text-xs md:text-sm ${stats.inventoryTotal.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.inventoryTotal.change >= 0 ? (
                <HiArrowUp className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              ) : (
                <HiArrowDown className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              )}
              <span>{stats.inventoryTotal.change >= 0 ? '+' : ''}{stats.inventoryTotal.change}%</span>
              <span className="text-gray-500 ml-1">from last {stats.inventoryTotal.period}</span>
            </div>
          </div>
        </div>
        
        {/* Charts and Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Revenue Chart */}
          <div className="bg-white p-3 md:p-4">
            <h2 className="text-base md:text-lg font-semibold">{revenueData.title}</h2>
            <p className="text-xs md:text-sm text-gray-500">{revenueData.subtitle}</p>
            
            <div className="mt-3 md:mt-4 rounded-lg border border-gray-200 p-3 md:p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <div>
                  <div className="text-xs md:text-sm text-gray-500">{revenueData.currentMonth} Total Revenue</div>
                  <div className="text-lg md:text-xl font-semibold">{formatCurrency(revenueData.currentMonthValue)}</div>
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-2 sm:mt-0">
                  Year<br />
                  {revenueData.year} ({revenueData.period})
                </div>
              </div>
              
              <div className="h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData.data}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ fontSize: '12px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={2} 
                      dot={{ stroke: '#3B82F6', strokeWidth: 2, fill: 'white', r: 3 }}
                      activeDot={{ r: 5 }}
                      fill="url(#colorUv)"
                    />
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Recent Activities */}
          <div className="bg-white p-3 md:p-4">
            <h2 className="text-base md:text-lg font-semibold">Recent Activities</h2>
            <p className="text-xs md:text-sm text-gray-500">Latest transaction and actions</p>
            
            <div className="mt-3 md:mt-4 space-y-3 md:space-y-4 rounded-lg border border-gray-200 p-3 md:p-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id}
                  className={`flex items-start ${index !== recentActivities.length - 1 ? 'border-b border-gray-100 pb-3 md:pb-4' : ''}`}
                >
                  <div className="bg-blue-100 text-blue-600 p-1.5 md:p-2 rounded mr-2 md:mr-3">
                    <HiDocumentDuplicate className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div className="truncate">
                        <p className="font-medium text-sm md:text-base truncate">Invoice #{activity.id} created</p>
                        <p className="text-gray-500 text-xs md:text-sm truncate">Customer: {activity.customerName}</p>
                      </div>
                      <span className="text-gray-500 text-xs md:text-sm mt-1 sm:mt-0 sm:ml-2 whitespace-nowrap">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}