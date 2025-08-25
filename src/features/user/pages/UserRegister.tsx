import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../auth/store/authSlice';
import type { AppDispatch } from '../../../core/store';

interface UserRegisterProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string; // Required by backend
}

const UserRegister: React.FC<UserRegisterProps> = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password)
    };
    
    const passedCount = Object.values(checks).filter(Boolean).length;
    return { checks, strength: passedCount };
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    // Name validation
    if (formData.name.length < 3) {
      setError('Name must be at least 3 characters long');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Phone validation (required by backend)
    if (!formData.phone || formData.phone.length < 10) {
      setError('Phone number is required and must be at least 10 digits long');
      return false;
    }

    // Strong password validation (matching backend requirements)
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(formData.password)) {
      setError('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character (@$!%*?&)');
      return false;
    }

    // Password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await dispatch(registerUser({
        name: formData.name,
        emailId: formData.email, // Backend expects emailId
        password: formData.password,
        phNo: formData.phone // Backend requires phNo (phone number)
      })).unwrap();
      
      setSuccess('Account created successfully! You can now sign in.');
      
      // Auto switch to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
      
    } catch (err: any) {
      setError(err || 'Registration failed. Please try again.');
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
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a2240] mb-1">Create Account</h2>
          <p className="text-sm text-gray-600">Join Kuinbee to access premium datasets</p>
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

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg mb-4 text-sm"
          >
            {success}
          </motion.div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-[#1a2240] mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d5473] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                  placeholder="Full name"
                  required
                />
              </div>
            </div>
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
                  placeholder="Email address"
                  required
                />
              </div>
            </div>
          </div>

          {/* Phone Field (Required by backend) */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-[#1a2240] mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d5473] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                placeholder="Phone number (min 10 digits)"
                required
              />
            </div>
          </div>

          {/* Password Fields Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-[#1a2240] mb-1">
                Password <span className="text-red-500">*</span>
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
                  placeholder="Strong password (8+ chars, A-z, 0-9, @$!%*?&)"
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
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="text-xs font-semibold text-gray-700 mb-2">Password must include:</div>
                  <ul className="space-y-1 text-xs">
                    <li className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full ${passwordStrength.checks.length ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>{passwordStrength.checks.length ? '✓' : '•'}</span>
                      8+ characters
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full ${passwordStrength.checks.lowercase ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>{passwordStrength.checks.lowercase ? '✓' : '•'}</span>
                      Lowercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full ${passwordStrength.checks.uppercase ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>{passwordStrength.checks.uppercase ? '✓' : '•'}</span>
                      Uppercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full ${passwordStrength.checks.number ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>{passwordStrength.checks.number ? '✓' : '•'}</span>
                      Number
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full ${passwordStrength.checks.special ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>{passwordStrength.checks.special ? '✓' : '•'}</span>
                      Special character <span className="ml-1 text-gray-400">(@$!%*?&)</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-[#1a2240] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d5473] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
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
                Creating Account...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </div>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#4d5473] hover:text-[#1a2240] font-semibold transition-colors duration-200"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Terms */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-[#4d5473] hover:underline">Terms</a>{' '}
            and{' '}
            <a href="#" className="text-[#4d5473] hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
