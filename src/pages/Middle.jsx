import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  PlayCircle,
  User,
  ShieldCheck,
  GraduationCap,
  CheckCircle2,
  Video,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  Award,
  Star,
  TrendingUp,
  Clock,
  ChevronRight,
  Globe,
  Zap,
  Heart,
  Users,
  Infinity,
  BarChart3,
  Lock,
  Download,
  MessageCircle,
  Calendar,
  Target,
  Trophy
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Middle = () => {

  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);
  const heroRef = useRef(null);

  // ================= CHECK LOGIN =================
  const userId = localStorage.getItem("userId");

  const handleNavigation = () => {
    if (userId) {
      navigate("/user/dashboard");
    } else {
      navigate("/login");
    }
  };

  // ================= COUNTER ANIMATION =================
  const [counters, setCounters] = useState({
    students: 0,
    courses: 0,
    certificates: 0,
    experts: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = { students: 15000, courses: 120, certificates: 8500, experts: 45 };
            const duration = 2000;
            const interval = 20;
            const steps = duration / interval;
            let step = 0;

            const timer = setInterval(() => {
              step++;
              setCounters({
                students: Math.min(targets.students, Math.floor((step / steps) * targets.students)),
                courses: Math.min(targets.courses, Math.floor((step / steps) * targets.courses)),
                certificates: Math.min(targets.certificates, Math.floor((step / steps) * targets.certificates)),
                experts: Math.min(targets.experts, Math.floor((step / steps) * targets.experts))
              });
              if (step >= steps) clearInterval(timer);
            }, interval);

            observer.disconnect(); // run only once
          }
        });
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ================= HOW LMS WORKS =================
  const studentSteps = [
    {
      title: "Create Account",
      desc: "Signup and verify your email to access the LMS platform.",
      icon: <User size={26} />,
      color: "from-blue-500 to-cyan-500",
      stat: "2 min setup"
    },
    {
      title: "Enroll In Courses",
      desc: "Browse available courses and enroll to start learning.",
      icon: <BookOpen size={26} />,
      color: "from-purple-500 to-pink-500",
      stat: "100+ courses"
    },
    {
      title: "Watch Video Lectures",
      desc: "Access course modules and watch secure embedded videos.",
      icon: <Video size={26} />,
      color: "from-orange-500 to-red-500",
      stat: "HD quality"
    },
    {
      title: "Track Progress",
      desc: "Monitor your active courses and continue your learning journey.",
      icon: <CheckCircle2 size={26} />,
      color: "from-green-500 to-emerald-500",
      stat: "Real-time"
    },
    {
      title: "Get Certificate",
      desc: "Receive a professional certificate after completing your course successfully.",
      icon: <Award size={26} />,
      color: "from-yellow-500 to-amber-500",
      stat: "Verified"
    },
  ];

  // ================= FEATURES =================
  const features = [
    {
      title: "Student Dashboard",
      desc: "Manage enrolled courses, profile, and progress from one place.",
      icon: <LayoutDashboard size={28} />,
      stats: "Personalized",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      title: "Secure Video Learning",
      desc: "Protected course videos with custom playback controls.",
      icon: <PlayCircle size={28} />,
      stats: "DRM Protected",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Admin Management",
      desc: "Admins can create courses, modules, and manage users easily.",
      icon: <ShieldCheck size={28} />,
      stats: "Full Control",
      gradient: "from-red-500 to-orange-500"
    },
    {
      title: "Course Certificates",
      desc: "Students receive digital certificates after successfully completing courses.",
      icon: <Award size={28} />,
      stats: "Shareable",
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      title: "Responsive Design",
      desc: "Fully optimized for mobile, tablet, and desktop devices.",
      icon: <Sparkles size={28} />,
      stats: "All Devices",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Progress Analytics",
      desc: "Track your learning journey with detailed analytics and insights.",
      icon: <BarChart3 size={28} />,
      stats: "Smart Insights",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  // ================= TESTIMONIALS =================
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "The best learning platform I've ever used. The video quality is amazing and the certificate helped me land my dream job!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      content: "Incredible course structure and support. The progress tracking feature keeps me motivated throughout my learning journey.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emma Williams",
      role: "Product Manager",
      content: "Highly recommend this platform. The admin management makes it easy for organizations to train their teams effectively.",
      rating: 5,
      avatar: "EW"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-black via-zinc-900 to-black text-white px-4 sm:px-6 lg:px-10 py-24 overflow-hidden"
      >
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-[120px] animate-pulse-slower" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-[150px]" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-sm font-medium mb-6 hover:scale-105 transition-all duration-300">
              <GraduationCap size={18} className="animate-pulse" />
              <span>🎓 LMS Learning Platform Guide</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight">
              Learn Smarter
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                With Our LMS Platform
              </span>
            </h1>

            <p className="text-zinc-300 text-lg mt-8 leading-relaxed max-w-2xl">
              Access courses, watch secure video lectures, track your learning
              progress, and earn professional certificates after completion.
            </p>

            {/* STATS COUNTERS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 py-6 border-y border-white/10">
              {[
                { label: "Active Students", value: counters.students, suffix: "+", icon: Users },
                { label: "Courses", value: counters.courses, suffix: "+", icon: BookOpen },
                { label: "Certificates", value: counters.certificates, suffix: "+", icon: Award },
                { label: "Expert Instructors", value: counters.experts, suffix: "", icon: Target }
              ].map((stat, idx) => (
                <div key={idx} className="text-center group cursor-default">
                  <stat.icon size={24} className="mx-auto mb-2 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                  <div className="text-2xl font-bold">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={handleNavigation}
                className="group relative bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2">
                  Start Learning
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              <button
                onClick={handleNavigation}
                className="group border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                Explore Courses
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT - Dashboard Preview */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[40px] blur-3xl opacity-30 animate-pulse-slow" />
            <div className="relative w-full max-w-2xl rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-5 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <div className="bg-gradient-to-br from-zinc-900 to-black rounded-[30px] p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                      Student Dashboard
                    </h3>
                    <p className="text-zinc-400 mt-1">Modern LMS Interface</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white to-zinc-200 text-black flex items-center justify-center shadow-lg">
                    <LayoutDashboard size={28} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: BookOpen, title: "Courses", desc: "Access enrolled courses instantly.", color: "text-white" },
                    { icon: PlayCircle, title: "Videos", desc: "Secure embedded video lectures.", color: "text-white" },
                    { icon: Award, title: "Certificates", desc: "Earn certificates after completion.", color: "text-yellow-400" },
                    { icon: ShieldCheck, title: "Security", desc: "Protected access and user roles.", color: "text-blue-400" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-black/50 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                      <item.icon className={`mb-4 ${item.color}`} size={28} />
                      <h4 className="font-bold text-xl">{item.title}</h4>
                      <p className="text-zinc-400 text-sm mt-2">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Course Progress</span>
                    <span className="text-white font-semibold">65%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-shimmer" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-4 sm:px-6 lg:px-10 py-24 bg-gradient-to-b from-white to-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full px-4 py-2 mb-4">
              <Zap size={16} className="text-purple-500" />
              <span className="text-sm font-semibold text-purple-600">Simple Process</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-black to-zinc-600 bg-clip-text text-transparent">
              How LMS Works
            </h2>
            <p className="text-zinc-600 mt-5 max-w-2xl mx-auto text-lg">
              Follow these simple steps to start learning on the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-7">
            {studentSteps.map((step, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`
                  relative bg-white rounded-[30px] p-8 border border-zinc-200 shadow-sm
                  transition-all duration-500 overflow-hidden group cursor-pointer
                  ${hoveredStep === index ? 'shadow-2xl -translate-y-2 border-zinc-300' : ''}
                `}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-zinc-100 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`
                  w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center mb-6 
                  transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
                `}>
                  {step.icon}
                </div>

                <div className="text-sm font-bold text-zinc-400 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-black">
                    {index + 1}
                  </span>
                  <span>STEP {index + 1}</span>
                </div>

                <h3 className="text-2xl font-bold text-black mb-4">
                  {step.title}
                </h3>

                <p className="text-zinc-600 leading-relaxed">
                  {step.desc}
                </p>

                <div className="mt-4 pt-4 border-t border-zinc-100">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Clock size={12} />
                    <span>{step.stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connection Line Animation */}
          <div className="hidden xl:block relative mt-8">
            <div className="absolute left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-zinc-300 to-transparent top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-white px-4 sm:px-6 lg:px-10 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full px-4 py-2 mb-4">
              <Sparkles size={16} className="text-blue-500" />
              <span className="text-sm font-semibold text-blue-600">Platform Capabilities</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-black to-zinc-600 bg-clip-text text-transparent">
              Powerful LMS Features
            </h2>
            <p className="text-zinc-600 mt-5 max-w-2xl text-lg">
              Everything you need for a modern online learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`
                  group relative rounded-[35px] border border-zinc-200 p-8
                  transition-all duration-500 bg-gradient-to-br from-zinc-50 to-white
                  hover:shadow-2xl hover:border-zinc-300 cursor-pointer
                  ${hoveredFeature === index ? 'scale-105' : ''}
                `}
              >
                <div className={`
                  w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white 
                  flex items-center justify-center mb-6 transition-all duration-300 
                  group-hover:scale-110 group-hover:rotate-12 shadow-lg
                `}>
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-black mb-3">
                  {feature.title}
                </h3>

                <p className="text-zinc-600 leading-relaxed">
                  {feature.desc}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent" />
                  <span className="text-xs font-medium text-zinc-400">{feature.stats}</span>
                </div>

                {hoveredFeature === index && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-zinc-400 to-transparent rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="px-4 sm:px-6 lg:px-10 py-24 bg-gradient-to-b from-zinc-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full px-4 py-2 mb-4">
              <Heart size={16} className="text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-600">Love From Students</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-black to-zinc-600 bg-clip-text text-transparent">
              What Our Students Say
            </h2>
            <p className="text-zinc-600 mt-5 max-w-2xl mx-auto text-lg">
              Join thousands of satisfied learners worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-600 leading-relaxed mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-black to-zinc-700 text-white flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{testimonial.name}</h4>
                    <p className="text-sm text-zinc-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="px-4 sm:px-6 lg:px-10 py-24">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-black to-zinc-900 rounded-[50px] p-12 sm:p-16 text-center text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse-slower" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,white,transparent_70%)] opacity-10" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-6">
              <Trophy size={16} />
              <span className="text-sm font-semibold">Join 15,000+ Happy Students</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black leading-tight">
              Ready To Start Learning?
            </h2>

            <p className="text-zinc-300 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
              Join the LMS platform today and unlock modern learning with
              interactive courses, secure videos, and completion certificates.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <button
                onClick={handleNavigation}
                className="group bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-2"
              >
                Start Learning Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={handleNavigation}
                className="border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <PlayCircle size={18} />
                Watch Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-white/10">
              {[
                { icon: ShieldCheck, label: "Secure Platform" },
                { icon: Infinity, label: "Lifetime Access" },
                { icon: Download, label: "Download Resources" },
                { icon: MessageCircle, label: "24/7 Support" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-zinc-400">
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        .animate-shimmer {
          position: relative;
          overflow: hidden;
        }
        .animate-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Middle;
