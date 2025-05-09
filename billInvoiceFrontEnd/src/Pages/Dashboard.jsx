import React, { useState, useEffect } from 'react';
import { useCustomer } from '../contexts/CustomerContext';
import axios from 'axios';
import { 
  Users, 
  Receipt, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
  MessageSquare,
  FileText,
  DollarSign,
  UserPlus,
  Send
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_URL = 'http://localhost:9000/api';

// Sample activities data
const sampleActivities = [
  {
    id: 1,
    type: 'invoice_created',
    message: 'New invoice created for ABC Corp',
    amount: 25000,
    time: '2 minutes ago',
    icon: FileText,
    color: 'blue'
  },
  {
    id: 2,
    type: 'payment_received',
    message: 'Payment received from XYZ Ltd',
    amount: 15000,
    time: '1 hour ago',
    icon: DollarSign,
    color: 'green'
  },
  {
    id: 3,
    type: 'customer_added',
    message: 'New customer registered: John Doe',
    time: '3 hours ago',
    icon: UserPlus,
    color: 'purple'
  },
  {
    id: 4,
    type: 'invoice_created',
    message: 'New invoice created for Tech Solutions',
    amount: 35000,
    time: '5 hours ago',
    icon: FileText,
    color: 'blue'
  },
  {
    id: 5,
    type: 'payment_received',
    message: 'Payment received from Global Inc',
    amount: 42000,
    time: '1 day ago',
    icon: DollarSign,
    color: 'green'
  }
];

// Sample revenue data for the chart
const revenueData = [
  { month: 'Jan', revenue: 125000 },
  { month: 'Feb', revenue: 145000 },
  { month: 'Mar', revenue: 185000 },
  { month: 'Apr', revenue: 165000 },
  { month: 'May', revenue: 195000 },
  { month: 'Jun', revenue: 220000 },
  { month: 'Jul', revenue: 210000 },
];

// Sample chat messages
const sampleChats = [
  {
    id: 1,
    sender: 'John Doe',
    message: 'Invoice #1234 has been paid',
    time: '2 min ago',
    avatar: '🧑'
  },
  {
    id: 2,
    sender: 'System',
    message: 'New customer registration: XYZ Corp',
    time: '10 min ago',
    avatar: '🤖'
  },
  {
    id: 3,
    sender: 'Jane Smith',
    message: 'Updated payment for Invoice #1235',
    time: '15 min ago',
    avatar: '👩'
  },
  {
    id: 4,
    sender: 'Support',
    message: 'Customer inquiry resolved for ABC Ltd',
    time: '30 min ago',
    avatar: '👨‍💼'
  }
];

const Dashboard = () => {
  const { customers } = useCustomer();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState(sampleChats);
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    pendingAmount: 0,
    paidAmount: 0,
    totalInvoices: 0,
    pendingInvoices: 0,
    paidInvoices: 0,
    recentInvoices: [],
    monthlyRevenue: 0,
    monthlyGrowth: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/invoices`);
      const invoices = response.data.data;

      // Calculate statistics
      const stats = calculateStatistics(invoices);
      setDashboardData(stats);
      setError(null);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const calculateStatistics = (invoices) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);

    const stats = {
      totalRevenue: 0,
      pendingAmount: 0,
      paidAmount: 0,
      totalInvoices: invoices.length,
      pendingInvoices: 0,
      paidInvoices: 0,
      recentInvoices: [],
      monthlyRevenue: 0,
      monthlyGrowth: 0
    };

    // Current month revenue
    let currentMonthRevenue = 0;
    let lastMonthRevenue = 0;

    invoices.forEach(invoice => {
      const invoiceDate = new Date(invoice.date);
      const amount = Number(invoice.totalAmount || 0);

      // Total amounts
      stats.totalRevenue += amount;

      // Status based calculations
      if (invoice.status === 'paid') {
        stats.paidAmount += amount;
        stats.paidInvoices++;
      } else {
        stats.pendingAmount += amount;
        stats.pendingInvoices++;
      }

      // Monthly calculations
      if (invoiceDate.getMonth() === currentMonth) {
        currentMonthRevenue += amount;
      } else if (invoiceDate.getMonth() === lastMonth.getMonth()) {
        lastMonthRevenue += amount;
      }
    });

    // Calculate monthly growth
    stats.monthlyRevenue = currentMonthRevenue;
    stats.monthlyGrowth = lastMonthRevenue ? 
      ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 
      100;

    // Get recent invoices (last 5)
    stats.recentInvoices = invoices
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    return stats;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      message: chatMessage,
      time: 'Just now',
      avatar: '👤'
    };

    setMessages([newMessage, ...messages]);
    setChatMessage('');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to your business dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Customers */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Customers</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{customers.length}</h3>
              <span className="text-green-500 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Active
              </span>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Revenue</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardData.totalRevenue)}</h3>
              <span className={`flex items-center text-sm ${dashboardData.monthlyGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {dashboardData.monthlyGrowth >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                {Math.abs(dashboardData.monthlyGrowth).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Pending Invoices */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Pending Invoices</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{dashboardData.pendingInvoices}</h3>
              <span className="text-yellow-500 flex items-center text-sm">
                {formatCurrency(dashboardData.pendingAmount)}
              </span>
            </div>
          </div>

          {/* Paid Invoices */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Paid Invoices</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{dashboardData.paidInvoices}</h3>
              <span className="text-green-500 flex items-center text-sm">
                {formatCurrency(dashboardData.paidAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `₹${value/1000}K`}
                  width={80}
                />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Recent Invoices - Takes up 3/7 of the space */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.recentInvoices.slice(0, 5).map((invoice) => (
                      <tr key={invoice._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(invoice.totalAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            invoice.status === 'paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Chat Section - Takes up 2/7 of the space */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Chat Updates</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 text-2xl">{msg.avatar}</div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm font-medium text-gray-900">{msg.sender}</span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Recent Activities - Takes up 2/7 of the space */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {dashboardData.recentInvoices.slice(0, 5).map((invoice) => (
                    <div key={invoice._id} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 rounded-full p-2 ${
                        invoice.status === 'paid' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        {invoice.status === 'paid' ? (
                          <DollarSign className="h-5 w-5 text-green-600" />
                        ) : (
                          <FileText className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          Invoice #{invoice.invoiceNumber} - {invoice.customerName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Amount: {formatCurrency(invoice.totalAmount)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(invoice.date)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;