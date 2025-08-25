import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../auth/store/authSlice';
import type { AppDispatch } from '../../../core/store';

interface UserLoginProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await dispatch(loginUser({
        email: formData.email,
        password: formData.password
      })).unwrap();
      
      // Close the login overlay on successful login
      onClose();
    } catch (err: any) {
      setError(err || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
      <div className="px-6 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-[#1a2240] to-[#4d5473] rounded-full flex items-center justify-center mb-3">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a2240] mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-600">Sign in to access your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-[#1a2240] mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d5473] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-[#1a2240] mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d5473] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#1a2240] via-[#4d5473] to-[#1a2240] text-white py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#4d5473] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </div>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#4d5473] hover:text-[#1a2240] font-semibold transition-colors duration-200"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
