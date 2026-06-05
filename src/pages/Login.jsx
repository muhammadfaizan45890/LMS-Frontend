// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff, Loader2 } from 'lucide-react';
// import { toast } from 'sonner';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { getData } from '@/context/userContext';
// import API from "../utils/api";

// const Login = () => {
//     const { setUser } = getData();
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [formData, setFormData] = useState({ email: "", password: "" });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.email || !formData.password) {
//             toast.error("Please fill in all fields");
//             return;
//         }

//         setIsLoading(true);
//         try {
//             const res = await axios.post(
//                 `${API}/user/login`,
//                 formData,
//                 { headers: { "Content-Type": "application/json" } }
//             );

//             if (res.data.success) {
//                 setUser(res.data.user);
//                 localStorage.setItem("accessToken", res.data.accessToken);
//                     localStorage.setItem("userId", res.data.user._id);

//                 toast.success(res.data.message || "Logged in successfully!");
//                 navigate('/');
//             }
//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || 
//                 "Failed to login. Please try again."
//             );
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-white font-poppins px-4 py-10">
//             <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-200">
                
//                 {/* Header */}
//                 <CardHeader className="py-6 text-center bg-white">
//                     <CardTitle className="text-3xl font-semibold text-black tracking-wide">
//                         Login
//                     </CardTitle>
//                     <CardDescription className="text-gray-600 mt-2">
//                         Start organizing your thoughts and ideas today
//                     </CardDescription>
//                 </CardHeader>

//                 {/* Content */}
//                 <CardContent className="px-6 py-8 space-y-6">
                    
//                     {/* Email */}
//                     <div className="flex flex-col">
//                         <Label htmlFor="email" className="text-black font-medium">
//                             Email
//                         </Label>
//                         <Input
//                             id="email"
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="example@mail.com"
//                             className="mt-1 border-gray-300 focus:ring-black focus:border-black rounded-lg"
//                             required
//                         />
//                     </div>

//                     {/* Password */}
//                     <div className="flex flex-col relative">
//                         <div className="flex justify-between items-center">
//                             <Label htmlFor="password" className="text-black font-medium">
//                                 Password
//                             </Label>
//                             <Link
//                                 to="/forgot-password"
//                                 className="text-sm text-black hover:underline"
//                             >
//                                 Forgot Password?
//                             </Link>
//                         </div>

//                         <Input
//                             id="password"
//                             name="password"
//                             type={showPassword ? "text" : "password"}
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Enter your password"
//                             className="mt-1 pr-12 border-gray-300 focus:ring-black focus:border-black rounded-lg"
//                             required
//                         />

//                         <Button
//                             variant="ghost"
//                             size="sm"
//                             type="button"
//                             className="absolute right-2 top-1/2 mt-3 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
//                             onClick={() => setShowPassword(!showPassword)}
//                             disabled={isLoading}
//                         >
//                             {showPassword ? (
//                                 <EyeOff className="w-5 h-5 text-gray-600" />
//                             ) : (
//                                 <Eye className="w-5 h-5 text-gray-600" />
//                             )}
//                         </Button>
//                     </div>
//                 </CardContent>

//                 {/* Footer */}
//                 <CardFooter className="px-6 py-6 flex flex-col gap-4 bg-white">
//                     <Button
//                         onClick={handleSubmit}
//                         type="submit"
//                         className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? (
//                             <>
//                                 <Loader2 className="h-5 w-5 animate-spin" />
//                                 Logging in...
//                             </>
//                         ) : "Login"}
//                     </Button>

//                     <p className="text-center text-gray-600 text-sm">
//                         Don't have an account?{" "}
//                         <span
//                             className="text-black font-medium cursor-pointer hover:underline"
//                             onClick={() => navigate("/signup")}
//                         >
//                             Sign Up
//                         </span>
//                     </p> 
//                 </CardFooter>
//             </Card>
//         </div>
//     );
// };

// export default Login;










import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../context/userContext';
import API from '../utils/api';
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle, Chrome, Github } from 'lucide-react';

const Login = () => {
  const { setUser } = getData();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const emailInputRef = useRef(null);

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;
    const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    return { score, text: texts[score], color: colors[score] };
  };
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') setFieldErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === 'password') {
      setFieldErrors((prev) => ({ ...prev, password: validatePassword(value) }));
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setFieldErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === 'password') setFieldErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleKeyUp = (e) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) setCapsLockOn(true);
    else setCapsLockOn(false);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
    emailInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    if (emailError || passwordError) {
      setFieldErrors({ email: emailError, password: passwordError });
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${API}/user/login`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('userId', res.data.user._id);
        if (rememberMe) localStorage.setItem('rememberedEmail', formData.email);
        else localStorage.removeItem('rememberedEmail');
        toast.success(res.data.message || 'Logged in successfully!');
        navigate('/');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to login. Please try again.';
      toast.error(errorMsg);
      if (errorMsg.toLowerCase().includes('email'))
        setFieldErrors((prev) => ({ ...prev, email: errorMsg }));
      else if (errorMsg.toLowerCase().includes('password'))
        setFieldErrors((prev) => ({ ...prev, password: errorMsg }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => toast.info(`${provider} login coming soon!`);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-6 sm:px-6 sm:py-10">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left branding - hidden on mobile/tablet, visible on md and up */}
          <div className="hidden md:flex flex-col space-y-5 lg:space-y-6 p-6 lg:p-8">
            <div className="space-y-3 lg:space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-black text-white shadow-lg">
                <svg className="w-7 h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-base lg:text-lg text-gray-600">Continue your journey of organized thoughts and creative ideas.</p>
            </div>
            <div className="space-y-4 mt-6 lg:mt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">Secure & Private</p>
                  <p className="text-xs lg:text-sm text-gray-600">Your data is encrypted and safe</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">24/7 Access</p>
                  <p className="text-xs lg:text-sm text-gray-600">Access your notes anytime, anywhere</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Card – fully responsive */}
          <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border-0">
            <div className="py-5 sm:py-6 text-center px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-wide">Sign In</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="px-5 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium flex items-center gap-2 text-sm sm:text-base">
                    <Mail className="w-4 h-4" /> Email Address
                  </label>
                  <div className="relative">
                    <input
                      ref={emailInputRef}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-3 py-2 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:ring-2 ${
                        fieldErrors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-200 focus:ring-black'
                      }`}
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {fieldErrors.email && (
                    <div className="flex items-center gap-1 text-red-500 text-xs sm:text-sm mt-1">
                      <AlertCircle className="w-3 h-3" /> <span>{fieldErrors.email}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium flex items-center gap-2 text-sm sm:text-base">
                      <Lock className="w-4 h-4" /> Password
                    </label>
                    <Link to="/forgot-password" className="text-xs sm:text-sm text-black hover:underline font-medium">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyUp={handleKeyUp}
                      placeholder="Enter your password"
                      className={`w-full pr-12 pl-3 py-2 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:ring-2 ${
                        fieldErrors.password
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-200 focus:ring-black'
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-gray-600" /> : <Eye className="w-4 h-4 text-gray-600" />}
                    </button>
                  </div>
                  {capsLockOn && (
                    <div className="flex items-center gap-1 text-amber-600 text-xs sm:text-sm mt-1">
                      <AlertCircle className="w-3 h-3" /> <span>Caps Lock is on</span>
                    </div>
                  )}
                  {formData.password && !fieldErrors.password && (
                    <div className="space-y-1 mt-2">
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < passwordStrength.score ? passwordStrength.color : 'bg-gray-200'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        Password strength: <span className="font-semibold">{passwordStrength.text}</span>
                      </p>
                    </div>
                  )}
                  {fieldErrors.password && (
                    <div className="flex items-center gap-1 text-red-500 text-xs sm:text-sm mt-1">
                      <AlertCircle className="w-3 h-3" /> <span>{fieldErrors.password}</span>
                    </div>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">Remember me</label>
                </div>

                {/* Social Login Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                  <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
                </div>

                {/* Social Buttons – stack on very small screens, side by side on sm and up */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button type="button" onClick={() => handleSocialLogin('Google')} className="flex items-center justify-center gap-2 w-full py-2 text-sm sm:text-base border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                    <Chrome className="w-4 h-4" /> Google
                  </button>
                  <button type="button" onClick={() => handleSocialLogin('GitHub')} className="flex items-center justify-center gap-2 w-full py-2 text-sm sm:text-base border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                    <Github className="w-4 h-4" /> GitHub
                  </button>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-5 sm:py-6 flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={isLoading || !!fieldErrors.email || !!fieldErrors.password}
                  className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? <><Loader2 className="h-5 w-5 animate-spin" /> Logging in...</> : 'Sign In'}
                </button>
                <p className="text-center text-gray-600 text-xs sm:text-sm">
                  Don't have an account?{' '}
                  <span className="text-black font-medium cursor-pointer hover:underline" onClick={() => navigate('/signup')}>
                    Create Account
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
