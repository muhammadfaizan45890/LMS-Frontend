// import {
//   ArrowRight,
//   Sparkles,
//   BrainCircuit,
//   ShieldCheck,
//   Zap,
//   Star,
//   PlayCircle,
// } from "lucide-react";

// import React, { useState, useEffect } from "react";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { useNavigate } from "react-router-dom";
// import { getData } from "@/context/userContext";

// const Hero = () => {
//   const { user } = getData();
//   const navigate = useNavigate();
//   const [isHovered, setIsHovered] = useState(false);
//   const [buttonState, setButtonState] = useState("idle");

//   const handleGetStarted = () => {
//     setButtonState("loading");
//     setTimeout(() => {
//       if (!user) {
//         navigate("/login");
//       } else {
//         navigate("/user/dashboard");
//       }
//       setButtonState("idle");
//     }, 500);
//   };

//   const handleExploreAI = () => {
//     setButtonState("exploring");
//     setTimeout(() => {
//       setButtonState("idle");
//     }, 500);
//   };

//   // Parallax background effect (only moves on scroll – no fade)
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrolled = window.scrollY;
//       const bgElements = document.querySelectorAll('.parallax-bg');
//       bgElements.forEach((el, i) => {
//         const speed = 0.5 + i * 0.2;
//         el.style.transform = `translateY(${scrolled * speed}px)`;
//       });
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-white via-zinc-50 to-white text-black">

//       {/* ================= BACKGROUND EFFECTS (no fade, only parallax & CSS animations) ================= */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="parallax-bg absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-gradient-to-r from-zinc-200 to-zinc-300 rounded-full blur-[120px] opacity-60 animate-pulse-slow" />
//         <div className="parallax-bg absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-l from-zinc-300 to-zinc-400 rounded-full blur-[140px] opacity-50 animate-pulse-slower" />
//         <div className="parallax-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-zinc-100 via-zinc-200 to-zinc-100 rounded-full blur-[150px] opacity-40 animate-spin-slow" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
//         <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-white/50" />
//       </div>

//       {/* ================= MAIN CONTENT (no fade-in transitions) ================= */}
//       <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

//           {/* ================= LEFT CONTENT ================= */}
//           <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8">

//             {/* USER INFO */}
//             {user && (
//               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
//                 <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-zinc-200 shadow-lg rounded-full px-4 sm:px-5 py-2 hover:shadow-xl transition-shadow duration-300">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center font-bold text-xs sm:text-sm uppercase shadow-md">
//                     {user.username?.charAt(0) || "U"}
//                   </div>
//                   <div className="text-left">
//                     <p className="text-[10px] sm:text-xs text-zinc-500 font-medium">Welcome Back</p>
//                     <h3 className="font-semibold text-sm sm:text-base truncate max-w-[120px] sm:max-w-[150px]">
//                       {user.username || "User"}
//                     </h3>
//                   </div>
//                 </div>
//                 <div className={`
//                   px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wider shadow-md border
//                   ${user.role === "admin"
//                     ? "bg-gradient-to-r from-black to-zinc-800 text-white border-black"
//                     : "bg-white text-black border-zinc-200 shadow-sm"}
//                 `}>
//                   {user.role === "admin" ? "⚡ ADMIN" : "🎓 STUDENT"}
//                 </div>
//               </div>
//             )}

//             {/* BADGE with hover scale */}
//             <div className="transform hover:scale-105 transition-transform duration-300">
//               <Badge className="bg-gradient-to-r from-black to-zinc-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold shadow-xl border border-zinc-700">
//                 <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
//                 AI Powered Learning Platform
//               </Badge>
//             </div>

//             {/* HEADING – fully responsive, no animation */}
//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] sm:leading-tight tracking-tighter">
//               Intelligent
//               <span className="block bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 bg-clip-text text-transparent mt-1 sm:mt-2">
//                 Learning
//               </span>
//               <span className="block text-zinc-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mt-2 sm:mt-3">
//                 Designed For The Future
//               </span>
//             </h1>

//             {/* DESCRIPTION */}
//             <p className="max-w-2xl text-zinc-600 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed">
//               Experience a modern AI-powered platform that helps students
//               learn smarter, stay organized, and access secure educational
//               content with a beautiful and responsive interface designed
//               for productivity and growth.
//             </p>

//             {/* BUTTONS – only animated elements */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto pt-2 sm:pt-4">
//               {/* Get Started Button */}
//               <div className="relative group">
//                 <Button
//                   onClick={handleGetStarted}
//                   disabled={buttonState === "loading"}
//                   onMouseEnter={() => setIsHovered(true)}
//                   onMouseLeave={() => setIsHovered(false)}
//                   size="lg"
//                   className="relative h-12 sm:h-14 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-black to-zinc-800 text-white font-semibold text-sm sm:text-base hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 ease-out overflow-hidden group"
//                 >
//                   <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-zinc-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//                   <span className="relative z-10 flex items-center">
//                     {buttonState === "loading" ? (
//                       <>
//                         <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Loading...
//                       </>
//                     ) : (
//                       <>
//                         Get Started
//                         <ArrowRight className={`ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : 'translate-x-0'}`} />
//                       </>
//                     )}
//                   </span>
//                 </Button>
//                 <div className="absolute -inset-1 bg-gradient-to-r from-black/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
//               </div>

//               {/* Explore AI Button */}
//               <div className="relative group">
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   onClick={handleExploreAI}
//                   disabled={buttonState === "exploring"}
//                   onMouseEnter={() => setIsHovered(true)}
//                   onMouseLeave={() => setIsHovered(false)}
//                   className="relative h-12 sm:h-14 px-6 sm:px-8 rounded-2xl border-2 border-black/20 text-black font-semibold text-sm sm:text-base hover:bg-black hover:text-white hover:border-black transition-all duration-300 ease-out overflow-hidden group"
//                 >
//                   <span className="absolute inset-0 w-full h-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
//                   <span className="relative z-10 flex items-center">
//                     {buttonState === "exploring" ? (
//                       <>
//                         <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Exploring...
//                       </>
//                     ) : (
//                       <>
//                         <BrainCircuit className={`mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-hover:rotate-12`} />
//                         Explore AI
//                       </>
//                     )}
//                   </span>
//                 </Button>
//               </div>
//             </div>

//             {/* TRUST LINE – hover scale on icons */}
//             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 sm:pt-6">
//               {[
//                 { icon: ShieldCheck, label: "Secure Platform" },
//                 { icon: Zap, label: "Fast Performance" },
//                 { icon: Star, label: "Modern Experience" }
//               ].map((item, idx) => (
//                 <div key={idx} className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm group cursor-default">
//                   <item.icon size={14} className="sm:w-[18px] sm:h-[18px] transition-transform group-hover:scale-110 duration-300" />
//                   <span className="font-medium">{item.label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ================= RIGHT SIDE – Dashboard Preview (no fade, only hover shadow) ================= */}
//           <div className="relative flex justify-center mt-8 lg:mt-0">
//             <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-[30px] sm:rounded-[35px] bg-white/90 backdrop-blur-xl border border-zinc-200/50 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-shadow duration-500 overflow-hidden">
//               {/* Top bar */}
//               <div className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-5 border-b border-zinc-200/50 bg-white/50">
//                 <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/80" />
//                 <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400/80" />
//                 <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/80" />
//                 <div className="flex-1 text-center">
//                   <p className="text-[10px] sm:text-xs text-zinc-400 font-mono">student-dashboard.ai</p>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-5 sm:p-6 md:p-8">
//                 {/* Header */}
//                 <div className="flex items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
//                   <div>
//                     <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent">
//                       Student Dashboard
//                     </h2>
//                     <p className="text-zinc-500 text-xs sm:text-sm mt-1 sm:mt-2">Manage your learning journey</p>
//                   </div>
//                   <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center shadow-lg">
//                     <BrainCircuit size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
//                   </div>
//                 </div>

//                 {/* Grid cards – hover effects only */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
//                   {/* Card 1 */}
//                   <div className="bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center mb-3 sm:mb-4 md:mb-5 shadow-md">
//                       <PlayCircle size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
//                     </div>
//                     <h3 className="text-base sm:text-lg md:text-xl font-bold">Video Learning</h3>
//                     <p className="text-zinc-500 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
//                       Watch secure lectures with advanced controls.
//                     </p>
//                   </div>

//                   {/* Card 2 */}
//                   <div className="bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center mb-3 sm:mb-4 md:mb-5 shadow-md">
//                       <ShieldCheck size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
//                     </div>
//                     <h3 className="text-base sm:text-lg md:text-xl font-bold">Secure Access</h3>
//                     <p className="text-zinc-500 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
//                       Protected environment with role access.
//                     </p>
//                   </div>

//                   {/* Card 3 – full width */}
//                   <div className="sm:col-span-2 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:shadow-2xl transition-all duration-300">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
//                       <div>
//                         <p className="text-zinc-400 text-[10px] sm:text-xs font-mono">PLATFORM STATUS</p>
//                         <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-1 sm:mt-2 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
//                           Active & Ready
//                         </h2>
//                       </div>
//                       <div className="bg-white/10 backdrop-blur-sm text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base w-fit border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default">
//                         🤖 AI Enabled
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Progress bar */}
//                 <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-200/50">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-[10px] sm:text-xs text-zinc-500 font-medium">Today's Progress</span>
//                     <span className="text-[10px] sm:text-xs text-zinc-500 font-medium">65%</span>
//                   </div>
//                   <div className="w-full h-1.5 sm:h-2 bg-zinc-100 rounded-full overflow-hidden">
//                     <div className="h-full bg-gradient-to-r from-black to-zinc-600 rounded-full" style={{ width: '65%' }} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Floating NEW badge (pulse animation) */}
//             <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg animate-pulse-slow">
//               NEW
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Custom CSS for background animations */}
//       <style jsx>{`
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.6; }
//           50% { opacity: 0.8; }
//         }
//         @keyframes pulse-slower {
//           0%, 100% { opacity: 0.5; }
//           50% { opacity: 0.7; }
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 4s ease-in-out infinite;
//         }
//         .animate-pulse-slower {
//           animation: pulse-slower 6s ease-in-out infinite;
//         }
//         .animate-spin-slow {
//           animation: spin-slow 20s linear infinite;
//         }
//         .bg-radial-gradient {
//           background: radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.8) 100%);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Hero;








import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  ShieldCheck,
  Zap,
  Star,
  PlayCircle,
  TrendingUp,
  Clock,
  CheckCircle2,
  Activity,
} from "lucide-react";

import React, { useState, useEffect, useRef } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { getData } from "@/context/userContext";

// ------------------------------------------------------------------
// Mouse position hook for glow effect
// ------------------------------------------------------------------
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { mousePosition, isHoveringHero, setIsHoveringHero };
};

// ------------------------------------------------------------------
// Floating particle (CSS only)
// ------------------------------------------------------------------
const FloatingParticle = ({ delay, duration, size, left, top }: any) => (
  <div
    className="absolute rounded-full bg-gradient-to-r from-white/30 to-zinc-400/20 blur-sm pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      top: `${top}%`,
      animation: `float-particle ${duration}s infinite ease-in-out`,
      animationDelay: `${delay}s`,
      opacity: 0.4,
    }}
  />
);

// ------------------------------------------------------------------
// Main Hero Component
// ------------------------------------------------------------------
const Hero = () => {
  const { user } = getData();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [buttonState, setButtonState] = useState<"idle" | "loading" | "exploring">("idle");
  const heroRef = useRef<HTMLDivElement>(null);
  const { mousePosition, isHoveringHero, setIsHoveringHero } = useMousePosition();

  const handleGetStarted = () => {
    setButtonState("loading");
    setTimeout(() => {
      if (!user) {
        navigate("/login");
      } else {
        navigate("/user/dashboard");
      }
      setButtonState("idle");
    }, 500);
  };

  const handleExploreAI = () => {
    setButtonState("exploring");
    setTimeout(() => {
      setButtonState("idle");
    }, 500);
  };

  // Parallax background effect (scroll movement, no fade)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const bgElements = document.querySelectorAll(".parallax-bg");
      bgElements.forEach((el, i) => {
        const speed = 0.5 + i * 0.2;
        (el as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const followerGlowStyle = {
    left: `${mousePosition.x - 150}px`,
    top: `${mousePosition.y - 150}px`,
  };

  const dashboardStats = [
    { label: "AI Sessions", value: "48", icon: BrainCircuit, change: "+12%" },
    { label: "Modules Done", value: "8/12", icon: CheckCircle2, change: "66%" },
    { label: "Study Time", value: "24h", icon: Clock, change: "+4h" },
  ];

  return (
    <>
      {/* Inject global styles for custom keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -30px) rotate(5deg); }
          50% { transform: translate(-15px, 40px) rotate(-3deg); }
          75% { transform: translate(30px, -10px) rotate(7deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.05); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 15px) scale(1.08); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes grid-shift {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 14s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        .animate-grid-shift { animation: grid-shift 20s linear infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}} />

      <div
        ref={heroRef}
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
        className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-[#fafafa] via-[#ffffff] to-[#f4f4f5] text-black"
      >
        {/* Mouse follower glow */}
        {isHoveringHero && (
          <div
            className="fixed pointer-events-none rounded-full w-[300px] h-[300px] bg-gradient-to-r from-zinc-200/40 to-transparent blur-3xl transition-transform duration-150 ease-out z-0"
            style={{ ...followerGlowStyle, transform: "translate(-50%, -50%)" }}
          />
        )}

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 animate-gradient-shift"
            style={{
              background: "radial-gradient(circle at 20% 40%, rgba(0,0,0,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.04) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Parallax blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="parallax-bg absolute top-[-150px] left-[-150px] w-[450px] h-[450px] bg-gradient-to-r from-zinc-300/30 to-zinc-500/20 rounded-full blur-[130px] animate-float-slow" />
          <div className="parallax-bg absolute bottom-[-180px] right-[-150px] w-[500px] h-[500px] bg-gradient-to-l from-zinc-400/30 to-zinc-600/20 rounded-full blur-[150px] animate-float-reverse" />
          <div className="parallax-bg absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-zinc-200/20 via-zinc-300/10 to-transparent rounded-full blur-[160px] animate-spin-slow" />
          <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-black/5 rounded-full blur-[80px] animate-pulse-slow" />
          <div className="absolute bottom-[15%] right-[5%] w-80 h-80 bg-zinc-800/5 rounded-full blur-[100px] animate-pulse-slower" />
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-zinc-100/5 to-transparent animate-grid-shift" />
        </div>

        {/* Floating particles */}
        <FloatingParticle delay={0} duration={18} size="120px" left={15} top={70} />
        <FloatingParticle delay={2} duration={25} size="90px" left={85} top={20} />
        <FloatingParticle delay={5} duration={22} size="150px" left={45} top={85} />
        <FloatingParticle delay={1} duration={30} size="70px" left={75} top={55} />
        <FloatingParticle delay={3.5} duration={20} size="100px" left={5} top={40} />

        {/* Main content */}
        <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left column */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8">
              {user && (
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-zinc-200/80 shadow-xl rounded-full px-4 sm:px-5 py-2 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center font-bold text-xs sm:text-sm uppercase shadow-md ring-2 ring-white/50">
                      {user.username?.charAt(0) || "U"}
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] sm:text-xs text-zinc-500 font-medium tracking-wide">Welcome Back</p>
                      <h3 className="font-semibold text-sm sm:text-base truncate max-w-[120px] sm:max-w-[150px]">
                        {user.username || "User"}
                      </h3>
                    </div>
                  </div>
                  <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wider shadow-lg border transition-all duration-300 hover:scale-105 ${user.role === "admin" ? "bg-gradient-to-r from-black to-zinc-800 text-white border-black/20 hover:shadow-black/20" : "bg-white/90 text-black border-zinc-200/80 backdrop-blur-sm hover:shadow-lg"}`}>
                    {user.role === "admin" ? "⚡ ADMIN ACCESS" : "🎓 STUDENT PRO"}
                  </div>
                </div>
              )}

              <div className="group relative transform hover:scale-105 transition-transform duration-300">
                <Badge className="bg-gradient-to-r from-black to-zinc-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold shadow-2xl border border-zinc-700/50 overflow-hidden relative">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  AI Powered Learning Platform
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] sm:leading-tight tracking-tighter">
                Intelligent
                <span className="block bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent mt-1 sm:mt-2">
                  Learning
                </span>
                <span className="block text-zinc-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mt-2 sm:mt-3">
                  Designed For The Future
                </span>
              </h1>

              <p className="max-w-2xl text-zinc-600 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed border-l-4 border-black/20 pl-4 sm:pl-5">
                Experience a modern AI-powered platform that helps students
                learn smarter, stay organized, and access secure educational
                content with a beautiful and responsive interface designed
                for productivity and growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto pt-2 sm:pt-4">
                {/* Get Started Button */}
                <div className="relative group">
                  <Button
                    onClick={handleGetStarted}
                    disabled={buttonState === "loading"}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    size="lg"
                    className="relative h-12 sm:h-14 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-black to-zinc-800 text-white font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 ease-out overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-zinc-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    <span className="relative z-10 flex items-center">
                      {buttonState === "loading" ? (
                        <>
                          <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          Get Started
                          <ArrowRight className={`ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${isHovered ? 'translate-x-1' : 'translate-x-0'}`} />
                        </>
                      )}
                    </span>
                  </Button>
                  <div className="absolute -inset-1 bg-gradient-to-r from-black/30 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>

                {/* Explore AI Button */}
                <div className="relative group">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleExploreAI}
                    disabled={buttonState === "exploring"}
                    className="relative h-12 sm:h-14 px-6 sm:px-8 rounded-2xl border-2 border-black/20 text-black font-semibold text-sm sm:text-base bg-white/80 backdrop-blur-sm hover:bg-black hover:text-white hover:border-black transition-all duration-300 ease-out overflow-hidden group shadow-md hover:shadow-xl"
                  >
                    <span className="absolute inset-0 w-full h-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <span className="relative z-10 flex items-center">
                      {buttonState === "exploring" ? (
                        <>
                          <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Exploring...
                        </>
                      ) : (
                        <>
                          <BrainCircuit className={`mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`} />
                          Explore AI
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 sm:pt-6">
                {[
                  { icon: ShieldCheck, label: "Secure Platform", description: "Enterprise-grade" },
                  { icon: Zap, label: "Fast Performance", description: "< 50ms latency" },
                  { icon: Star, label: "Modern Experience", description: "Cutting-edge UI" }
                ].map((item, idx) => (
                  <div key={idx} className="group relative flex items-center gap-2 text-zinc-500 text-xs sm:text-sm cursor-default">
                    <div className="p-1.5 rounded-full bg-gradient-to-br from-black/5 to-zinc-200/50 group-hover:from-black/10 group-hover:to-zinc-300/50 transition-all duration-300">
                      <item.icon size={14} className="sm:w-[18px] sm:h-[18px] transition-transform group-hover:scale-110 duration-300" />
                    </div>
                    <span className="font-medium group-hover:text-black transition-colors">{item.label}</span>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - Dashboard Preview */}
            <div className="relative flex justify-center mt-8 lg:mt-0 group/dashboard">
              <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-[32px] bg-white/90 backdrop-blur-xl border border-zinc-200/60 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                <div className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-5 border-b border-zinc-200/50 bg-gradient-to-r from-white/80 to-zinc-50/80">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/80 hover:bg-red-500 transition-colors" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400/80 hover:bg-yellow-500 transition-colors" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/80 hover:bg-green-500 transition-colors" />
                  <div className="flex-1 text-center">
                    <p className="text-[10px] sm:text-xs text-zinc-400 font-mono tracking-wide flex items-center justify-center gap-2">
                      student-dashboard.ai
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent">
                        Student Dashboard
                      </h2>
                      <p className="text-zinc-500 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center gap-1">
                        <Activity size={12} className="text-green-500" /> Live insights
                      </p>
                    </div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                      <BrainCircuit size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {dashboardStats.map((stat, idx) => (
                      <div key={idx} className="group/stat bg-gradient-to-br from-white to-zinc-50 border border-zinc-200 rounded-xl p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default">
                        <div className="flex items-center justify-between">
                          <stat.icon size={18} className="text-zinc-600 group-hover/stat:text-black transition-colors" />
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">{stat.change}</span>
                        </div>
                        <p className="text-2xl font-black mt-2">{stat.value}</p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="group/card bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center mb-3 sm:mb-4 shadow-md group-hover/card:shadow-xl transition-all">
                        <PlayCircle size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold">Video Learning</h3>
                      <p className="text-zinc-500 text-xs sm:text-sm mt-2 leading-relaxed">
                        Watch secure lectures with AI-powered transcripts.
                      </p>
                    </div>

                    <div className="group/card bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center mb-3 sm:mb-4 shadow-md group-hover/card:shadow-xl transition-all">
                        <ShieldCheck size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold">Secure Access</h3>
                      <p className="text-zinc-500 text-xs sm:text-sm mt-2 leading-relaxed">
                        Protected environment with role-based encryption.
                      </p>
                    </div>

                    <div className="sm:col-span-2 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] cursor-default relative overflow-hidden group/ai">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/ai:opacity-100 transition-opacity duration-700" />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                        <div>
                          <p className="text-zinc-400 text-[10px] sm:text-xs font-mono flex items-center gap-2">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            PLATFORM STATUS
                          </p>
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-1 sm:mt-2 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            AI Supercharged
                          </h2>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base w-fit border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default group-hover/ai:scale-105">
                          🤖 GPT-4 Ready
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-200/50">
                    <div className="flex justify-between items-center mb-2 group/progress">
                      <span className="text-[10px] sm:text-xs text-zinc-500 font-medium flex items-center gap-2">
                        Today's Learning Progress
                        <TrendingUp size={12} className="text-green-500 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-[10px] sm:text-xs text-zinc-500 font-medium">65%</span>
                    </div>
                    <div className="w-full h-1.5 sm:h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-black to-zinc-600 rounded-full relative transition-all duration-500 hover:w-[75%]" style={{ width: '65%' }}>
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-shimmer" />
                      </div>
                    </div>
                    <p className="text-[9px] text-zinc-400 mt-2 flex items-center justify-between">
                      <span>📚 3 modules completed today</span>
                      <span className="group-hover/progress:opacity-100 transition-opacity">🎯 +5 XP</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-2xl animate-bounce-slow z-20 backdrop-blur-sm">
                ✨ LIVE
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Hero;
