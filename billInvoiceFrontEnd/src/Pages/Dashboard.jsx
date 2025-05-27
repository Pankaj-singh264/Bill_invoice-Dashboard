import React, { useState, useEffect } from 'react';
import { useCustomer } from '../contexts/CustomerContext';
import { useApp } from '../contexts/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
  const { customers, setLoading, isLoading } = useCustomer();
  const { theme } = useApp();
  const { apiUrl, refreshUserData } = useAuth();
  const [dashboardError, setDashboardError] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    pendingAmount: 0,
    paidAmount: 0,
    totalInvoices: 0,
    pendingInvoices: 0,
    paidInvoices: 0,
    monthlyRevenue: 0,
    monthlyGrowth: 0
  });

  useEffect(() => {
    // Refresh user data to ensure we have the latest profile info including logo
    refreshUserData();
    
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/invoices`);
      const fetchedInvoices = response.data.data || [];
      // ////console.log(fetchedInvoices);
      
      // Save invoices to state
      setInvoices(fetchedInvoices);
      
      // Calculate statistics
      const stats = calculateStatistics(fetchedInvoices);
      setDashboardData(stats);
      setDashboardError(null);
    } catch (error) {
      //console.error('Error fetching dashboard data:', error);
      setDashboardError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const calculateStatistics = (invoices) => {
    if (!invoices || invoices.length === 0) {
      return {
        totalRevenue: 0,
        pendingAmount: 0,
        paidAmount: 0,
        totalInvoices: 0,
        pendingInvoices: 0,
        paidInvoices: 0,
        monthlyRevenue: 0,
        monthlyGrowth: 0
      };
    }

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
      monthlyRevenue: 0,
      monthlyGrowth: 0
    };

    // Current month revenue
    let currentMonthRevenue = 0;
    let lastMonthRevenue = 0;

    invoices.forEach(invoice => {
      const invoiceDate = new Date(invoice.date);
      const amount = Number(invoice.amount || invoice.totalAmount || 0);

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

    return stats;
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center`}>
        <div className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading dashboard...</div>
      </div>
    );
  }

  if (dashboardError) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center`}>
        <div className={`text-xl ${theme === 'dark' ? 'text-red-300' : 'text-red-600'}`}>{dashboardError}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} py-6 px-4 mt-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Dashboard Overview</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Welcome to your business dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Customers */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Customers</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{customers.length}</h3>
              <span className="text-green-500 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Active
              </span>
            </div>
          </div>

          {/* Total Revenue */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Revenue</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(dashboardData.totalRevenue)}</h3>
              <span className={`flex items-center text-sm ${dashboardData.monthlyGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {dashboardData.monthlyGrowth >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                {Math.abs(dashboardData.monthlyGrowth).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Pending Invoices */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Pending Invoices</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{dashboardData.pendingInvoices}</h3>
              <span className="text-yellow-500 flex items-center text-sm">
                {formatCurrency(dashboardData.pendingAmount)}
              </span>
            </div>
          </div>

          {/* Paid Invoices */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Paid Invoices</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{dashboardData.paidInvoices}</h3>
              <span className="text-green-500 flex items-center text-sm">
                {formatCurrency(dashboardData.paidAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Revenue Chart and Recent Invoices */}
        <div className="grid  px-3 py-2 grid-cols-1  sm:grid-cols-2 w-full gap-2 border"> 
          <div className="w-full">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Revenue Trends</h2>
            <div className="h-92 w-[800px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#4B5563' : '#E5E7EB'} />
                  <XAxis dataKey="month" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                  <YAxis
                    tickFormatter={(value) => `₹${value / 1000}K`}
                    width={80}
                    stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                      border: 'none',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      color: theme === 'dark' ? '#FFFFFF' : '#000000'
                    }}
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

          {/* Recent Activities */}
          <div className="md:w-[400px] md:justify-self-end">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
              <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Invoices</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {invoices && invoices.length > 0 ? (
                    invoices.slice(0, 4).map((invoice) => (
                      <div key={invoice._id} className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 rounded-full p-2 ${invoice.status === 'paid' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                          {invoice.status === 'paid' ? (
                            <DollarSign className="h-5 w-5 text-green-600" />
                          ) : (
                            <FileText className="h-5 w-5 text-yellow-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Invoice #{invoice.invoiceNumber || 'N/A'} - {invoice.customerName || 'Customer'}
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Amount: {formatCurrency(invoice.amount || invoice.totalAmount || 0)}
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                            {formatDate(invoice.date)}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          invoice.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {invoice.status ? invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1) : 'Pending'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No recent invoices found
                    </div>
                  )}
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