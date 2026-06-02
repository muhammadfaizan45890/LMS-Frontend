// import {
//   ArrowRight,
//   Sparkles,
//   BrainCircuit,
//   ShieldCheck,
//   Zap,
//   Star,
//   PlayCircle,
// } from "lucide-react";

// import React from "react";
// // eslint-disable-next-line no-unused-vars
// import { motion } from "framer-motion";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { useNavigate } from "react-router-dom";
// import { getData } from "@/context/userContext";


// const Hero = () => {
// const handleGetStarted = () => {
//   if (!user) {
//     navigate("/login");
//   } else {
//     navigate("/user/dashboard");
//   }
// };

  
//   const { user } = getData();
//   const navigate = useNavigate();

//   // ================= ANIMATIONS =================
//   const fadeUp = {
//     hidden: {
//       opacity: 0,
//       y: 40,
//     },

//     visible: (delay = 0) => ({
//       opacity: 1,
//       y: 0,

//       transition: {
//         duration: 0.8,
//         delay,
//       },
//     }),
//   };

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden bg-white text-black">

//       {/* ================= BACKGROUND EFFECTS ================= */}
//       <div className="absolute inset-0 overflow-hidden">

//         <motion.div
//           animate={{
//             scale: [1, 1.1, 1],
//             opacity: [0.4, 0.6, 0.4],
//           }}
//           transition={{
//             duration: 6,
//             repeat: Infinity,
//           }}
//           className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-zinc-200 rounded-full blur-[120px]"
//         />

//         <motion.div
//           animate={{
//             scale: [1, 1.15, 1],
//             opacity: [0.4, 0.6, 0.4],
//           }}
//           transition={{
//             duration: 7,
//             repeat: Infinity,
//           }}
//           className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-zinc-300 rounded-full blur-[140px]"
//         />

//         <motion.div
//           animate={{
//             rotate: [0, 360],
//           }}
//           transition={{
//             duration: 40,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-100 rounded-full blur-[150px] opacity-70"
//         />

//       </div>

//       {/* ================= MAIN CONTENT ================= */}
//       <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10 py-20">

//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

//           {/* ================= LEFT CONTENT ================= */}
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeUp}
//             className="flex flex-col items-center lg:items-start text-center lg:text-left"
//           >

//             {/* USER INFO */}
//             {user && (
//               <motion.div
//                 custom={0.1}
//                 variants={fadeUp}
//                 initial="hidden"
//                 animate="visible"
//                 className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
//               >

//                 <motion.div
//                   whileHover={{
//                     scale: 1.03,
//                   }}
//                   className="flex items-center gap-3 bg-white border border-zinc-200 shadow-sm rounded-full px-5 py-2"
//                 >

//                   <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm uppercase">
//                     {user.username?.charAt(0)}
//                   </div>

//                   <div className="text-left">
//                     <p className="text-xs text-zinc-500">
//                       Welcome Back
//                     </p>

//                     <h3 className="font-semibold text-sm sm:text-base">
//                       {user.username}
//                     </h3>
//                   </div>

//                 </motion.div>

//                 <motion.div
//                   whileHover={{
//                     scale: 1.05,
//                   }}
//                   className={`
//                     px-4 py-2 rounded-full text-xs font-bold tracking-widest shadow-sm border
//                     ${
//                       user.role === "admin"
//                         ? "bg-black text-white border-black"
//                         : "bg-zinc-100 text-black border-zinc-200"
//                     }
//                   `}
//                 >
//                   {user.role === "admin"
//                     ? "ADMIN ACCESS"
//                     : "STUDENT ACCESS"}
//                 </motion.div>

//               </motion.div>
//             )}

//             {/* BADGE */}
//             <motion.div
//               custom={0.2}
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//             >
//               <Badge className="bg-black text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
//                 <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
//                 AI Powered Learning Platform
//               </Badge>
//             </motion.div>

//             {/* HEADING */}
//             <motion.h1
//               custom={0.3}
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               className="mt-8 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-tight tracking-tight"
//             >

//               Intelligent Learning

//               <motion.span
//                 animate={{
//                   opacity: [0.5, 1, 0.5],
//                 }}
//                 transition={{
//                   duration: 4,
//                   repeat: Infinity,
//                 }}
//                 className="block text-zinc-400 mt-2"
//               >
//                 Designed For The Future
//               </motion.span>

//             </motion.h1>

//             {/* DESCRIPTION */}
//             <motion.p
//               custom={0.4}
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               className="mt-8 max-w-2xl text-zinc-600 text-base sm:text-lg leading-relaxed"
//             >

//               Experience a modern AI-powered platform that helps students
//               learn smarter, stay organized, and access secure educational
//               content with a beautiful and responsive interface designed
//               for productivity and growth.

//             </motion.p>

//             {/* BUTTONS */}
//             <motion.div
//               custom={0.5}
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
//             >

//               <motion.div
//                 whileHover={{
//                   scale: 1.05,
//                 }}

//                 whileTap={{
//                   scale: 0.95,
//                 }}
//               >
//                 <Button
//                   onClick={handleGetStarted}
//                   size="lg"
//                   className="
//                     h-14 px-8 rounded-2xl
//                     bg-black text-white
//                     hover:bg-zinc-800
//                     shadow-xl
//                     transition-all duration-300
//                     text-base font-semibold
//                   "
//                 >
//                   Get Started

//                   <motion.div
//                     animate={{
//                       x: [0, 5, 0],
//                     }}
//                     transition={{
//                       duration: 1.5,
//                       repeat: Infinity,
//                     }}
//                   >
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </motion.div>

//                 </Button>
//               </motion.div>

//               <motion.div
//                 whileHover={{
//                   scale: 1.05,
//                 }}

//                 whileTap={{
//                   scale: 0.95,
//                 }}
//               >
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="
//                     h-14 px-8 rounded-2xl
//                     border-2 border-black
//                     text-black
//                     hover:bg-black hover:text-white
//                     transition-all duration-300
//                     text-base font-semibold
//                   "
//                 >
//                   <motion.div
//                     animate={{
//                       rotate: [0, 10, -10, 0],
//                     }}
//                     transition={{
//                       duration: 3,
//                       repeat: Infinity,
//                     }}
//                   >
//                     <BrainCircuit className="mr-2 h-5 w-5" />
//                   </motion.div>

//                   Explore AI
//                 </Button>
//               </motion.div>

//             </motion.div>

//             {/* TRUST LINE */}
//             <motion.div
//               custom={0.6}
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 text-sm text-zinc-500"
//             >

//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center gap-2"
//               >
//                 <ShieldCheck size={18} />
//                 Secure Platform
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center gap-2"
//               >
//                 <Zap size={18} />
//                 Fast Performance
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center gap-2"
//               >
//                 <Star size={18} />
//                 Modern Experience
//               </motion.div>

//             </motion.div>

//           </motion.div>

//           {/* ================= RIGHT SIDE ================= */}
//           <motion.div
//             initial={{
//               opacity: 0,
//               x: 80,
//             }}

//             animate={{
//               opacity: 1,
//               x: 0,
//             }}

//             transition={{
//               duration: 1,
//             }}

//             className="relative flex justify-center"
//           >

//             {/* FLOATING EFFECT */}
//             <motion.div
//               animate={{
//                 y: [0, -15, 0],
//               }}
//               transition={{
//                 duration: 5,
//                 repeat: Infinity,
//               }}
//               className="
//                 relative w-full max-w-2xl
//                 rounded-[35px]
//                 bg-white/80
//                 backdrop-blur-xl
//                 border border-zinc-200
//                 shadow-[0_20px_80px_rgba(0,0,0,0.12)]
//                 overflow-hidden
//               "
//             >

//               {/* TOP BAR */}
//               <div className="flex items-center gap-2 px-6 py-5 border-b border-zinc-200">

//                 <div className="w-3 h-3 rounded-full bg-red-400" />

//                 <div className="w-3 h-3 rounded-full bg-yellow-400" />

//                 <div className="w-3 h-3 rounded-full bg-green-400" />

//               </div>

//               {/* CONTENT */}
//               <div className="p-6 sm:p-8">

//                 {/* HEADER */}
//                 <div className="flex items-center justify-between gap-4 mb-8">

//                   <div>
//                     <h2 className="text-2xl sm:text-3xl font-bold">
//                       Student Dashboard
//                     </h2>

//                     <p className="text-zinc-500 mt-2">
//                       Manage your learning journey
//                     </p>
//                   </div>

//                   <motion.div
//                     animate={{
//                       rotate: [0, 10, -10, 0],
//                     }}
//                     transition={{
//                       duration: 4,
//                       repeat: Infinity,
//                     }}
//                     className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg"
//                   >
//                     <BrainCircuit size={32} />
//                   </motion.div>

//                 </div>

//                 {/* GRID */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

//                   {/* CARD */}
//                   <motion.div
//                     whileHover={{
//                       y: -8,
//                       scale: 1.02,
//                     }}
//                     className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-300"
//                   >

//                     <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mb-5">
//                       <PlayCircle size={28} />
//                     </div>

//                     <h3 className="text-xl font-bold">
//                       Video Learning
//                     </h3>

//                     <p className="text-zinc-500 mt-3 leading-relaxed">
//                       Watch secure lectures with advanced controls.
//                     </p>

//                   </motion.div>

//                   {/* CARD */}
//                   <motion.div
//                     whileHover={{
//                       y: -8,
//                       scale: 1.02,
//                     }}
//                     className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-300"
//                   >

//                     <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mb-5">
//                       <ShieldCheck size={28} />
//                     </div>

//                     <h3 className="text-xl font-bold">
//                       Secure Access
//                     </h3>

//                     <p className="text-zinc-500 mt-3 leading-relaxed">
//                       Protected learning environment with role access.
//                     </p>

//                   </motion.div>

//                   {/* CARD */}
//                   <motion.div
//                     whileHover={{
//                       scale: 1.01,
//                     }}
//                     className="bg-black text-white rounded-3xl p-6 sm:col-span-2"
//                   >

//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

//                       <div>
//                         <p className="text-zinc-400 text-sm">
//                           Platform Status
//                         </p>

//                         <motion.h2
//                           animate={{
//                             opacity: [0.7, 1, 0.7],
//                           }}
//                           transition={{
//                             duration: 2,
//                             repeat: Infinity,
//                           }}
//                           className="text-4xl font-black mt-2"
//                         >
//                           Active & Ready
//                         </motion.h2>
//                       </div>

//                       <motion.div
//                         animate={{
//                           scale: [1, 1.05, 1],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                         }}
//                         className="bg-white text-black px-6 py-3 rounded-2xl font-bold w-fit"
//                       >
//                         AI Enabled
//                       </motion.div>

//                     </div>

//                   </motion.div>

//                 </div>

//               </div>

//             </motion.div>

//           </motion.div>

//         </div>

//       </section>

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
} from "lucide-react";

import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { getData } from "@/context/userContext";

const Hero = () => {
  const { user } = getData();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [buttonState, setButtonState] = useState("idle");

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

  // Parallax background effect (only moves on scroll – no fade)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const bgElements = document.querySelectorAll('.parallax-bg');
      bgElements.forEach((el, i) => {
        const speed = 0.5 + i * 0.2;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-white via-zinc-50 to-white text-black">

      {/* ================= BACKGROUND EFFECTS (no fade, only parallax & CSS animations) ================= */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax-bg absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-gradient-to-r from-zinc-200 to-zinc-300 rounded-full blur-[120px] opacity-60 animate-pulse-slow" />
        <div className="parallax-bg absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-l from-zinc-300 to-zinc-400 rounded-full blur-[140px] opacity-50 animate-pulse-slower" />
        <div className="parallax-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-zinc-100 via-zinc-200 to-zinc-100 rounded-full blur-[150px] opacity-40 animate-spin-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-white/50" />
      </div>

      {/* ================= MAIN CONTENT (no fade-in transitions) ================= */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8">

            {/* USER INFO */}
            {user && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-zinc-200 shadow-lg rounded-full px-4 sm:px-5 py-2 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center font-bold text-xs sm:text-sm uppercase shadow-md">
                    {user.username?.charAt(0) || "U"}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] sm:text-xs text-zinc-500 font-medium">Welcome Back</p>
                    <h3 className="font-semibold text-sm sm:text-base truncate max-w-[120px] sm:max-w-[150px]">
                      {user.username || "User"}
                    </h3>
                  </div>
                </div>
                <div className={`
                  px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wider shadow-md border
                  ${user.role === "admin"
                    ? "bg-gradient-to-r from-black to-zinc-800 text-white border-black"
                    : "bg-white text-black border-zinc-200 shadow-sm"}
                `}>
                  {user.role === "admin" ? "⚡ ADMIN" : "🎓 STUDENT"}
                </div>
              </div>
            )}

            {/* BADGE with hover scale */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Badge className="bg-gradient-to-r from-black to-zinc-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold shadow-xl border border-zinc-700">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                AI Powered Learning Platform
              </Badge>
            </div>

            {/* HEADING – fully responsive, no animation */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] sm:leading-tight tracking-tighter">
              Intelligent
              <span className="block bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 bg-clip-text text-transparent mt-1 sm:mt-2">
                Learning
              </span>
              <span className="block text-zinc-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mt-2 sm:mt-3">
                Designed For The Future
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="max-w-2xl text-zinc-600 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed">
              Experience a modern AI-powered platform that helps students
              learn smarter, stay organized, and access secure educational
              content with a beautiful and responsive interface designed
              for productivity and growth.
            </p>

            {/* BUTTONS – only animated elements */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto pt-2 sm:pt-4">
              {/* Get Started Button */}
              <div className="relative group">
                <Button
                  onClick={handleGetStarted}
                  disabled={buttonState === "loading"}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  size="lg"
                  className="relative h-12 sm:h-14 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-black to-zinc-800 text-white font-semibold text-sm sm:text-base hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 ease-out overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-zinc-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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
                        <ArrowRight className={`ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : 'translate-x-0'}`} />
                      </>
                    )}
                  </span>
                </Button>
                <div className="absolute -inset-1 bg-gradient-to-r from-black/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>

              {/* Explore AI Button */}
              <div className="relative group">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleExploreAI}
                  disabled={buttonState === "exploring"}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative h-12 sm:h-14 px-6 sm:px-8 rounded-2xl border-2 border-black/20 text-black font-semibold text-sm sm:text-base hover:bg-black hover:text-white hover:border-black transition-all duration-300 ease-out overflow-hidden group"
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
                        <BrainCircuit className={`mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-hover:rotate-12`} />
                        Explore AI
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </div>

            {/* TRUST LINE – hover scale on icons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 sm:pt-6">
              {[
                { icon: ShieldCheck, label: "Secure Platform" },
                { icon: Zap, label: "Fast Performance" },
                { icon: Star, label: "Modern Experience" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm group cursor-default">
                  <item.icon size={14} className="sm:w-[18px] sm:h-[18px] transition-transform group-hover:scale-110 duration-300" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDE – Dashboard Preview (no fade, only hover shadow) ================= */}
          <div className="relative flex justify-center mt-8 lg:mt-0">
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-[30px] sm:rounded-[35px] bg-white/90 backdrop-blur-xl border border-zinc-200/50 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-shadow duration-500 overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-5 border-b border-zinc-200/50 bg-white/50">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/80" />
                <div className="flex-1 text-center">
                  <p className="text-[10px] sm:text-xs text-zinc-400 font-mono">student-dashboard.ai</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent">
                      Student Dashboard
                    </h2>
                    <p className="text-zinc-500 text-xs sm:text-sm mt-1 sm:mt-2">Manage your learning journey</p>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center shadow-lg">
                    <BrainCircuit size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>
                </div>

                {/* Grid cards – hover effects only */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Card 1 */}
                  <div className="bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center mb-3 sm:mb-4 md:mb-5 shadow-md">
                      <PlayCircle size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold">Video Learning</h3>
                    <p className="text-zinc-500 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
                      Watch secure lectures with advanced controls.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center mb-3 sm:mb-4 md:mb-5 shadow-md">
                      <ShieldCheck size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold">Secure Access</h3>
                    <p className="text-zinc-500 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
                      Protected environment with role access.
                    </p>
                  </div>

                  {/* Card 3 – full width */}
                  <div className="sm:col-span-2 bg-gradient-to-r from-black to-zinc-800 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                      <div>
                        <p className="text-zinc-400 text-[10px] sm:text-xs font-mono">PLATFORM STATUS</p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-1 sm:mt-2 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                          Active & Ready
                        </h2>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base w-fit border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default">
                        🤖 AI Enabled
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-200/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] sm:text-xs text-zinc-500 font-medium">Today's Progress</span>
                    <span className="text-[10px] sm:text-xs text-zinc-500 font-medium">65%</span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-black to-zinc-600 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating NEW badge (pulse animation) */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg animate-pulse-slow">
              NEW
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for background animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.7; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .bg-radial-gradient {
          background: radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.8) 100%);
        }
      `}</style>
    </div>
  );
};

export default Hero;
