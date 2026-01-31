import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../../api/auth/useSignup';

// Emerald / professional Eye SVGs
const EyeOpen = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="inline">
    <path d="M1.293 12.707a1 1 0 0 1 0-1.414C3.908 8.678 7.594 6.5 12 6.5c4.406 0 8.092 2.178 10.707 4.793a1 1 0 0 1 0 1.414C20.092 15.322 16.406 17.5 12 17.5c-4.406 0-8.092-2.178-10.707-4.793z" stroke="#10b981" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke="#10b981" strokeWidth="2" />
  </svg>
);
const EyeClosed = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="inline">
    <path d="M3 3l18 18M1.293 12.707a1 1 0 0 1 0-1.414C3.908 8.678 7.594 6.5 12 6.5c2.042 0 3.981.41 5.75 1.13M9.88 9.88A3 3 0 0 1 14.12 14.12" stroke="#10b981" strokeWidth="2" />
    <path d="M15 15c-1.657 1.657-4.343 1.657-6 0a3.979 3.979 0 0 1-1.044-1.73M7.75 7.75C5.981 8.46 4.042 8.87 2 8.87" stroke="#10b981" strokeWidth="2" />
  </svg>
);

function Signup() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const { loading, signup } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (key, value) => setInputs({ ...inputs, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-2 overflow-y-auto">
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-5 md:p-8 flex flex-col items-center">
        {/* Row: text left, logo right */}
        <div className="flex items-center w-full mb-2 justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">Create your account</h2>
            <p className="text-gray-500 text-sm mt-1">Sign up for CCPS</p>
          </div>
          <img src="/images/CCPS.png" alt="Brand Logo" className="h-12 w-12 rounded ml-3 shrink-0" />
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4 mt-3">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-800">Name</label>
            <input
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 focus:border-emerald-500 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white transition placeholder-gray-400"
              value={inputs.name}
              onChange={e => handleChange('name', e.target.value)}
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-800">Email</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="example@iitbhilai.ac.in"
              className="w-full border border-gray-300 focus:border-emerald-500 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white transition placeholder-gray-400"
              value={inputs.email}
              onChange={e => handleChange('email', e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-800">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Password"
                className="w-full border border-gray-300 focus:border-emerald-500 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white transition placeholder-gray-400 pr-10"
                value={inputs.password}
                onChange={e => handleChange('password', e.target.value)}
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600"
                tabIndex={-1}
              >{showPassword ? <EyeClosed /> : <EyeOpen />}</button>
            </div>
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-800">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 focus:border-emerald-500 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white transition placeholder-gray-400 pr-10"
                value={inputs.confirmPassword}
                onChange={e => handleChange('confirmPassword', e.target.value)}
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600"
                tabIndex={-1}
              >{showPassword ? <EyeClosed /> : <EyeOpen />}</button>
            </div>
          </div>
          {/* Role Select */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-800">Select Role</label>
            <select
              value={inputs.role}
              onChange={e => handleChange('role', e.target.value)}
              className="w-full border border-gray-300 focus:border-emerald-500 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white transition placeholder-gray-400"
              required
            >
              <option value="">Choose Role</option>
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition duration-150 disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? <span className="animate-spin">⏳</span> : 'Sign Up'}
          </button>
        </form>
        <div className="w-full text-center mt-5 md:mt-7 text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <Link to="/login" className="text-emerald-600 hover:underline font-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Signup;
