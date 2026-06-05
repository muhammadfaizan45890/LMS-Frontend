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
import {
  Eye, EyeOff, Loader2, Mail, Lock, AlertCircle, Chrome, Github,
  GraduationCap, BookOpen, Users, Trophy, ChevronLeft, ChevronRight,
  Star, CheckCircle
} from 'lucide-react';

const Login = () => {
  const { setUser } = getData();
  const navigate = useNavigate();

  // Mode: 'login' or 'signup'
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const emailInputRef = useRef(null);

  // Password strength
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

  // Validation functions
  const validateName = (name) => {
    if (mode === 'signup' && !name) return 'Full name is required';
    if (mode === 'signup' && name.length < 2) return 'Name must be at least 2 characters';
    return '';
  };
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
  const validateConfirmPassword = (confirmPassword) => {
    if (mode === 'signup') {
      if (!confirmPassword) return 'Please confirm your password';
      if (confirmPassword !== formData.password) return 'Passwords do not match';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'name') setFieldErrors(prev => ({ ...prev, name: validateName(value) }));
    if (name === 'email') setFieldErrors(prev => ({ ...prev, email: validateEmail(value) }));
    if (name === 'password') {
      setFieldErrors(prev => ({ ...prev, password: validatePassword(value) }));
      setPasswordStrength(checkPasswordStrength(value));
      if (mode === 'signup') {
        setFieldErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(formData.confirmPassword) }));
      }
    }
    if (name === 'confirmPassword') {
      setFieldErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setFieldErrors(prev => ({ ...prev, name: validateName(value) }));
    if (name === 'email') setFieldErrors(prev => ({ ...prev, email: validateEmail(value) }));
    if (name === 'password') setFieldErrors(prev => ({ ...prev, password: validatePassword(value) }));
    if (name === 'confirmPassword') setFieldErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
  };

  const handleKeyUp = (e) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) setCapsLockOn(true);
    else setCapsLockOn(false);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail && mode === 'login') {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
    emailInputRef.current?.focus();
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all fields based on mode
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmError = validateConfirmPassword(formData.confirmPassword);
    if (nameError || emailError || passwordError || (mode === 'signup' && confirmError)) {
      setFieldErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmError
      });
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = mode === 'login' ? `${API}/user/login` : `${API}/user/register`;
      const payload = mode === 'login' 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };
      
      const res = await axios.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (res.data.success) {
        if (mode === 'login') {
          setUser(res.data.user);
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('userId', res.data.user._id);
          if (rememberMe) localStorage.setItem('rememberedEmail', formData.email);
          else localStorage.removeItem('rememberedEmail');
          toast.success(res.data.message || 'Logged in successfully!');
          navigate('/');
        } else {
          // After signup, auto login or redirect to login
          toast.success('Account created! Please log in.');
          setMode('login');
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(errorMsg);
      if (errorMsg.toLowerCase().includes('email')) {
        setFieldErrors(prev => ({ ...prev, email: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('password')) {
        setFieldErrors(prev => ({ ...prev, password: errorMsg }));
      } else if (errorMsg.toLowerCase().includes('name')) {
        setFieldErrors(prev => ({ ...prev, name: errorMsg }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} login coming soon!`);
  };

  // Demo data for LMS sections
  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '10K+', label: 'Active Students' },
    { icon: <BookOpen className="w-6 h-6" />, value: '200+', label: 'Expert Courses' },
    { icon: <Trophy className="w-6 h-6" />, value: '98%', label: 'Success Rate' },
    { icon: <GraduationCap className="w-6 h-6" />, value: '50+', label: 'Certifications' }
  ];

  const featuredCourses = [
    { title: 'Full Stack Web Development', instructor: 'Dr. Sarah Johnson', rating: 4.8, students: 3450, image: '🚀' },
    { title: 'Data Science & AI Mastery', instructor: 'Prof. Michael Chen', rating: 4.9, students: 2870, image: '🤖' },
    { title: 'UI/UX Design Principles', instructor: 'Emily Rodriguez', rating: 4.7, students: 1920, image: '🎨' },
  ];

  const testimonials = [
    { name: 'Alex Morgan', role: 'Software Engineer', text: 'The courses are incredibly detailed and the instructors are always available to help. Landed my dream job!', rating: 5 },
    { name: 'Priya Sharma', role: 'Data Analyst', text: 'Best investment in my career. The projects are real-world and the community is amazing.', rating: 5 },
    { name: 'James Wilson', role: 'Product Designer', text: 'From zero to hero in 6 months. The LMS platform is intuitive and engaging.', rating: 4 },
  ];
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      {/* Hero / LMS Branding Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left LMS Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-black/5 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <GraduationCap className="w-4 h-4" /> 
                <span>Empower Your Future with Expert-Led Courses</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Learn Anything, <span className="text-black underline decoration-4 decoration-yellow-400">Anytime</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Join thousands of learners worldwide. Access 200+ high-quality courses, live projects, and career coaching.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold">👤</div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-bold text-black">10,000+</span> students already enrolled
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm">
                    <div className="flex justify-center text-black mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Login/Signup Card (Advanced) */}
            <div className="w-full max-w-md mx-auto lg:ml-auto">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8">
                <div className="flex gap-3 mb-6 border-b border-gray-200">
                  <button
                    onClick={() => setMode('login')}
                    className={`pb-3 text-base font-semibold transition-all ${mode === 'login' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setMode('signup')}
                    className={`pb-3 text-base font-semibold transition-all ${mode === 'signup' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Create Account
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field (only for signup) */}
                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <label className="text-gray-700 font-medium flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4" /> Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John Doe"
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-sm ${
                          fieldErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-black'
                        }`}
                      />
                      {fieldErrors.name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.name}</p>}
                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-gray-700 font-medium flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" /> Email Address
                    </label>
                    <input
                      ref={emailInputRef}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-sm ${
                        fieldErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-black'
                      }`}
                    />
                    {fieldErrors.email && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.email}</p>}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-gray-700 font-medium flex items-center gap-2 text-sm">
                        <Lock className="w-4 h-4" /> Password
                      </label>
                      {mode === 'login' && (
                        <Link to="/forgot-password" className="text-xs text-black hover:underline">Forgot?</Link>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyUp={handleKeyUp}
                        placeholder="••••••••"
                        className={`w-full pr-12 px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-sm ${
                          fieldErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-black'
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {capsLockOn && <p className="text-amber-600 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />Caps Lock is on</p>}
                    {formData.password && !fieldErrors.password && mode === 'signup' && (
                      <div className="mt-1 space-y-1">
                        <div className="flex gap-1">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full ${i < passwordStrength.score ? passwordStrength.color : 'bg-gray-200'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">Strength: <span className="font-semibold">{passwordStrength.text}</span></p>
                      </div>
                    )}
                    {fieldErrors.password && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.password}</p>}
                  </div>

                  {/* Confirm Password (signup only) */}
                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <label className="text-gray-700 font-medium flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4" /> Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Confirm password"
                          className={`w-full pr-12 px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-sm ${
                            fieldErrors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-black'
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {fieldErrors.confirmPassword && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.confirmPassword}</p>}
                    </div>
                  )}

                  {/* Remember me (login only) */}
                  {mode === 'login' && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                    </div>
                  )}

                  {/* Social Login */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-gray-500">Or continue with</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => handleSocialLogin('Google')} className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm">
                      <Chrome className="w-4 h-4" /> Google
                    </button>
                    <button type="button" onClick={() => handleSocialLogin('GitHub')} className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm">
                      <Github className="w-4 h-4" /> GitHub
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
            <p className="text-gray-600 mt-2">Most popular courses loved by our community</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">{course.image}</div>
                <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{course.instructor}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex text-yellow-400">★</div>
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-xs text-gray-400">({course.students}+ students)</span>
                </div>
                <button className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition">View Course</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
          <div className="mt-8 relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex justify-center text-yellow-400 mb-4">
                {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-gray-700 text-lg italic">“{testimonials[testimonialIndex].text}”</p>
              <div className="mt-6">
                <p className="font-bold text-gray-900">{testimonials[testimonialIndex].name}</p>
                <p className="text-sm text-gray-500">{testimonials[testimonialIndex].role}</p>
              </div>
            </div>
            <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 text-center">
        <p className="text-sm">© 2025 LearnLMS. Empowering learners worldwide. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
