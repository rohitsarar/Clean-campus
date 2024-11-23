import React, { useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/uselogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-green-600">
      {/* Logo and Title Section */}
      <div className="flex flex-col items-center mt-10 mb-8">
        <div className="bg-green-300 rounded-full p-6 mb-4">
          {/* Replace with your logo */}
          <img src="src/assets/logo/logo.jpg" alt="Logo" className="w-16 h-16" />
        </div>
        <h1 className="text-3xl font-semibold text-white">
          Clean Campus
        </h1>
      </div>

      {/* Login Form Section */}
      <div className="w-full max-w-md p-6 pt-20 shadow-md bg-white rounded-t-3xl rounded-b-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md pl-10 text-gray-800 bg-white"
                placeholder="Email"
                required
              />
              <FaUser className="absolute right-2 top-2.5 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md pl-10 pr-10 text-gray-800 bg-white"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <Link to='/signup' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
              {"Don't"} have an account?
            </Link>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold hover:from-green-500 hover:to-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
