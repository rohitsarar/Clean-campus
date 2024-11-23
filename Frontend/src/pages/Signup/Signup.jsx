import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom'; // Import useNavigate for redirection
import useSignup from '../../hooks/usesignup';
import toast from 'react-hot-toast';

function Signup() {
  const [name, setName] = useState('');
  const [classname, setClassName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signup } = useSignup();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calling signup function with the form data
    const success = await signup({ name, classname, email, password });

    if (success) {
      // Show success message
      toast.success('Signup successful! Please log in.');
      
      // Redirect to login page after successful signup
      navigate('/login');
    }

    // Clear the form fields after submission
    setName('');
    setClassName('');
    setEmail('');
    setPassword('');

    console.log({ name, classname, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Signup<span className="text-green-500"> Clean-Campus</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-700">User Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full input input-bordered h-10 text-gray-800 bg-white"
              required
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-700">Class Name</span>
            </label>
            <input
              type="text"
              value={classname}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full input input-bordered h-10 text-gray-800 bg-white"
              required
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-700">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input input-bordered h-10 text-gray-800 bg-white"
              required
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-700">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full input input-bordered h-10 text-gray-800 bg-white"
              required
            />
          </div>

          <div className="text-sm hover:underline hover:text-blue-600 mt-2">
            Already have an account? 
            <Link to='/login'>Login</Link>
          </div>

          <div>
            <button type="submit" className="btn btn-block btn-sm mt-2 bg-green-500 text-white hover:bg-green-600">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
