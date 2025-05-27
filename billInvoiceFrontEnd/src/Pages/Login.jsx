
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      // Use the login function from auth context
      await login(formData.email, formData.password);
      
      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-50">
  
      
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <div className="flex justify-center mb-6 bg-gray-200 rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-[#0F2657]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75A4.5 4.5 0 0012 2.25v0a4.5 4.5 0 00-4.5 4.5v3.75m9 0h-9m9 0l-1.636 9.818A2.25 2.25 0 0112.636 22.5H11.36a2.25 2.25 0 01-2.22-2.182L7.5 10.5"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-center text-[#0F2657] mb-4">Inventor</h2>
          <h3 className="text-2xl font-medium text-center text-gray-700 mb-6">Log in to your account</h3>
          <p className="text-sm text-gray-500 text-center mb-8">Welcome back! Please enter your details.</p>

          {error && (
            <div className="mb-4 w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="mb-5 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="Enter your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-5 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="Enter your Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end w-full mb-6">
            <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white p-3 rounded-lg transition duration-200`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <button 
              type="button"
              onClick={() => navigate('/signup')}
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;