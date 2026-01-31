import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';
import useLogin from '../../api/auth/useLogin.js';

const EyeOpen = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="inline"><path d="M1.293 12.707a1 1 0 0 1 0-1.414C3.908 8.678 7.594 6.5 12 6.5c4.406 0 8.092 2.178 10.707 4.793a1 1 0 0 1 0 1.414C20.092 15.322 16.406 17.5 12 17.5c-4.406 0-8.092-2.178-10.707-4.793z" stroke="#10b981" strokeWidth="2" /><circle cx="12" cy="12" r="3" stroke="#10b981" strokeWidth="2" /></svg>
);
const EyeClosed = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="inline"><path d="M3 3l18 18M1.293 12.707a1 1 0 0 1 0-1.414C3.908 8.678 7.594 6.5 12 6.5c2.042 0 3.981.41 5.75 1.13M9.88 9.88A3 3 0 0 1 14.12 14.12" stroke="#10b981" strokeWidth="2" /><path d="M15 15c-1.657 1.657-4.343 1.657-6 0a3.979 3.979 0 0 1-1.044-1.73M7.75 7.75C5.981 8.46 4.042 8.87 2 8.87" stroke="#10b981" strokeWidth="2" /></svg>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, login } = useLogin();
  const { setShowForgotPassword } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-2">
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col items-center">
        {/* Logo (larger) */}
        <img src="/images/CCPS.png" alt="Brand Logo" className="h-20 mb-3" />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-sm mb-8 text-center w-full">Sign in to access your dashboard</p>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-800" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 focus:border-emerald-500 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white transition placeholder-gray-400"
              placeholder="example@iitbhilai.ac.in"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-800" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 focus:border-emerald-500 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white transition placeholder-gray-400 pr-10"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeClosed /> : <EyeOpen />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs mb-2">
            <button
              type="button"
              className="text-emerald-500 hover:underline"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </button>
            <span className="flex items-center gap-1 text-gray-400 ml-auto">
              <svg width="14" height="14" fill="none"><circle cx="7" cy="7" r="6" stroke="#10b981" strokeWidth="2" /><path d="M5.5 7.5L7 9l2-3" stroke="#10b981" strokeWidth="2" /></svg>
              Secure login
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition duration-150 disabled:opacity-50 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <span className="animate-spin">⏳</span> : "Log In"}
          </button>
        </form>
        <div className="w-full text-center mt-7 text-sm">
          <span className="text-gray-500">Don’t have an account? </span>
          <Link to="/signup" className="text-emerald-600 hover:underline font-semibold">
            Sign up
          </Link>
        </div>
        {/* Uncomment if you add social login:
        <div className="w-full mt-7 flex flex-col gap-2">
          <button className="w-full border border-gray-200 rounded-lg py-2 hover:bg-gray-50 flex items-center justify-center gap-2">
            <img src="/google-icon.svg" alt="Google" className="h-5" /> Sign in with Google
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
