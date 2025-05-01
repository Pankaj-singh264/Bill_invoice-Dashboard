import React from 'react';
import Sidebar from '../Components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-[#0b1f4e] text-white flex justify-between items-center p-4 text-sm">
          <span>Welcome back</span>
          <div className="flex gap-4">
            <span>21 April 2025</span>
            <span>Monday</span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold">Dashboard</h1>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button className="px-4 py-2 bg-white border rounded hover:bg-gray-100">Export Reports</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">New Invoice</button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Each Card */}
            {[
              { title: "Total Revenue", value: "₹14,00,568.79", change: "+240.1%", color: "text-green-500" },
              { title: "Pending Invoice", value: "12", change: "-4%", color: "text-red-500" },
              { title: "Total Customer", value: "136", change: "+16%", color: "text-green-500" },
              { title: "Inventory Total", value: "12", change: "-16%", color: "text-red-500" }
            ].map((card, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">{card.title}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                  </svg>
                </div>
                <p className="text-lg font-bold">{card.value}</p>
                <p className="text-xs">
                  <span className={card.color}>{card.change}</span> from last period
                </p>
              </div>
            ))}
          </div>

          {/* Revenue & Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Revenue Overview */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Revenue Overview</h2>
                  <p className="text-xs text-gray-500">Revenue Trends over past 6 months</p>
                </div>
              </div>
              {/* Revenue Chart */}
              <div className="h-40 bg-gradient-to-b from-blue-50 to-white relative rounded-lg overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-20 bg-blue-100/30">
                  <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,10 5,8 10,12 20,5 30,15 40,8 50,14 60,4 70,12 80,8 90,16 100,6" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(month => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">Recent Activities</h2>
                <p className="text-xs text-gray-500">Latest transactions and actions</p>
              </div>

              <div className="space-y-6">
                {[
                  { invoice: "#1043", time: "Just now", customer: "Relangi Selva" },
                  { invoice: "#1023", time: "3h ago", customer: "Suraj Ali Khan" },
                  { invoice: "#1076", time: "5h ago", customer: "XYZ Company" },
                  { invoice: "#1004", time: "12h ago", customer: "Walter White" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold">{activity.invoice} created</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-xs text-gray-500">Customer: {activity.customer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
