import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('user@test.com');
  const [password, setPassword] = useState('myReactTestPass99!');
  const [error, setError] = useState('');
  
  // Bring in 'user' to check if they are already logged in
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // If a valid session already exists, instantly redirect to dashboard!
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials. Try user@test.com / myReactTestPass99!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-8 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">Sign in to manage your daily tasks</p>
        </div>
        
        {error && (
          <div className="p-4 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-gray-900 transition-all border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required 
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-gray-900 transition-all border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3.5 text-lg font-bold text-white transition-all transform rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;