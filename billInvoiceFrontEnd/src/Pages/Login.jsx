import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log('Logging in...');
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-50">
      <button 
        onClick={handleBack}
        aria-label="Go back to homepage"
        className="absolute top-4 right-4 text-4xl font-bold text-gray-800 hover:text-gray-600"
      >
        ←
      </button>
      
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

          <div className="mb-5 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Mobile Number
            </label>
            <input
              type="text"
              autoComplete="username"
              placeholder="Enter your Email or Mobile"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-5 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Enter your Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end w-full mb-6">
            <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
