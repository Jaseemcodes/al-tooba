import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../store/toastStore';

export default function Login() {
  const [isLoginState, setIsLoginState] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
    agreeTerms: false,
  });
  
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLoginState) {
      if (!formData.email || !formData.password) {
        showToast('Please enter both email and password.', 'error');
        return;
      }
      // Mock successful login
      showToast('Welcome back to Al-Tooba!');
      navigate('/');
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        showToast('Please fill out all fields.', 'error');
        return;
      }
      if (!formData.agreeTerms) {
        showToast('You must agree to the Terms and Conditions.', 'error');
        return;
      }
      // Mock successful signup
      showToast('Account created successfully! Welcome to Al-Tooba.');
      setIsLoginState(true);
    }
  };

  const handleSocialLogin = (platform) => {
    showToast(`Connecting with ${platform}...`);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#FAF7F2] font-sans px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#0D3B2A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4A24C]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-[450px] w-full bg-white rounded-[28px] md:rounded-[36px] shadow-[0_20px_50px_rgba(13,59,42,0.06)] border border-[#D4A24C]/10 z-10 p-8 sm:p-12 md:p-14 flex flex-col justify-center"
      >
          
          {/* Form Header Tabs */}
          <div className="flex border-b border-[#0D3B2A]/10 mb-8 pb-1 gap-6">
            <button
              onClick={() => { setIsLoginState(true); }}
              className={`text-sm font-sans font-bold tracking-widest pb-3 relative transition-all duration-300 ${
                isLoginState ? 'text-[#0D3B2A]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              SIGN IN
              {isLoginState && (
                <motion.div 
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4A24C]" 
                />
              )}
            </button>
            <button
              onClick={() => { setIsLoginState(false); }}
              className={`text-sm font-sans font-bold tracking-widest pb-3 relative transition-all duration-300 ${
                !isLoginState ? 'text-[#0D3B2A]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              CREATE ACCOUNT
              {!isLoginState && (
                <motion.div 
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4A24C]" 
                />
              )}
            </button>
          </div>

          {/* Form Area */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLoginState ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name Field (Only on Register) */}
              {!isLoginState && (
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#0D3B2A]/80 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-[#0D3B2A]/10 bg-white text-[#0D3B2A] focus:outline-none focus:border-[#D4A24C]/60 focus:ring-1 focus:ring-[#D4A24C]/30 transition-all font-sans text-sm shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#0D3B2A]/80 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#0D3B2A]/10 bg-white text-[#0D3B2A] focus:outline-none focus:border-[#D4A24C]/60 focus:ring-1 focus:ring-[#D4A24C]/30 transition-all font-sans text-sm shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#0D3B2A]/80">
                    Password
                  </label>
                  {isLoginState && (
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to your email.'); }}
                      className="text-[10px] font-sans font-bold text-[#D4A24C] hover:text-[#0D3B2A] tracking-wider uppercase transition-colors"
                    >
                      Forgot?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-[#0D3B2A]/10 bg-white text-[#0D3B2A] focus:outline-none focus:border-[#D4A24C]/60 focus:ring-1 focus:ring-[#D4A24C]/30 transition-all font-sans text-sm shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                />
              </div>

              {/* Checkboxes */}
              {isLoginState ? (
                <div className="flex items-center">
                  <label className="flex items-center text-xs text-[#0D3B2A]/80 font-sans cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300 text-[#0D3B2A] focus:ring-[#D4A24C]/50 mr-2 accent-[#0D3B2A]"
                    />
                    Remember me
                  </label>
                </div>
              ) : (
                <div className="flex items-center">
                  <label className="flex items-center text-xs text-[#0D3B2A]/80 font-sans cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300 text-[#0D3B2A] focus:ring-[#D4A24C]/50 mr-2 accent-[#0D3B2A]"
                    />
                    I agree to the <a href="#" onClick={(e) => e.preventDefault()} className="text-[#D4A24C] underline hover:text-[#0D3B2A] ml-1">Terms & Conditions</a>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-[#0D3B2A] hover:bg-[#D4A24C] text-[#FAF7F2] hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_12px_rgba(13,59,42,0.1)] hover:shadow-[0_6px_20px_rgba(212,162,76,0.2)] active:scale-[0.98] cursor-pointer"
              >
                {isLoginState ? 'Sign In' : 'Create Account'}
              </button>

              {/* Social Dividers */}
              <div className="relative flex items-center justify-center my-6">
                <div className="absolute w-full border-t border-[#0D3B2A]/10"></div>
                <span className="relative px-3 bg-white text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest">
                  Or continue with
                </span>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center gap-2.5 py-3 rounded-xl border border-[#0D3B2A]/10 bg-white hover:bg-gray-50 transition-colors text-xs font-sans font-bold text-[#0D3B2A] shadow-[0_2px_8px_rgba(0,0,0,0.01)] cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#0D3B2A]/10 bg-white hover:bg-gray-50 transition-colors text-xs font-sans font-bold text-[#0D3B2A] shadow-[0_2px_8px_rgba(0,0,0,0.01)] cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5 fill-[#0D3B2A] mb-0.5" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.75.8.01 2.02-.79 3.61-.63 1.65.17 2.94.85 3.65 2.01-3.25 1.9-2.54 6.22.56 7.49-.66 1.66-1.56 3.4-2.9 3.35zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.26 2.5-2.14 4.45-3.74 4.25z"/>
                  </svg>
                  Apple
                </button>
              </div>
            </motion.form>
          </AnimatePresence>
      </motion.div>
    </div>
  );
}
