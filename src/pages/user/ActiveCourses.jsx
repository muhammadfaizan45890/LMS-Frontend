// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import API from "../../utils/api";

// import {
//   BookOpen,
//   Clock3,
//   DollarSign,
//   PlayCircle,
//   CheckCircle2,
//   ArrowLeft,
//   Layers3,
//   CalendarDays,
//   Sparkles,
//   Circle,
//   CheckCircle,
//   GraduationCap,
// } from "lucide-react";

// const ActiveCourses = () => {
//   // ================= STATES =================
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedCourse, setSelectedCourse] = useState(false);
//   const [courseData, setCourseData] = useState(null);

//   // ================= WATCHED MODULES =================
//   const [watchedModules, setWatchedModules] = useState([]);

//   const navigate = useNavigate();

//   const userId = localStorage.getItem("userId");

//   // ================= FETCH COURSES =================
//   const fetchCourses = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `${API}/enroll/my-courses/${userId}`
//       );

//       const activeCourses = (res.data || []).filter(
//         (item) => item.status === "active"
//       );

//       setCourses(activeCourses);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // ================= LOAD WATCHED MODULES =================
//   useEffect(() => {
//     const saved =
//       JSON.parse(localStorage.getItem("watchedModules")) || [];

//     setWatchedModules(saved);
//   }, []);

//   // ================= MARK AS WATCHED =================
//   const markAsWatched = (moduleId) => {
//     if (!watchedModules.includes(moduleId)) {
//       const updated = [...watchedModules, moduleId];

//       setWatchedModules(updated);

//       localStorage.setItem(
//         "watchedModules",
//         JSON.stringify(updated)
//       );
//     }
//   };

//   // ================= OPEN COURSE =================
//   const openCourse = async (courseId) => {
//     try {
//       const [courseRes, moduleRes] = await Promise.all([
//         axios.get(`${API}/admin/course/${courseId}`),

//         axios.get(
//           `${API}/api/modules/course/${courseId}`
//         ),
//       ]);

//       setCourseData({
//         ...courseRes.data,
//         modules: moduleRes.data || [],
//       });

//       setSelectedCourse(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ================= WATCH VIDEO =================
//   const watchVideo = (module) => {
//     markAsWatched(module._id);

//     navigate("/user/video", {
//       state: {
//         youtubeUrl: module.youtubeUrl,
//       },
//     });
//   };

//   // ================= COURSE DETAILS PAGE =================
//   if (selectedCourse && courseData) {
//     return (
//       <div className="min-h-screen bg-zinc-100 overflow-x-hidden">
//         {/* ================= HERO ================= */}
//         <div className="relative overflow-hidden bg-black text-white">
//           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_35%)]" />

//           <div className="relative px-4 sm:px-6 lg:px-10 py-8 lg:py-14">
//             {/* BACK BUTTON */}
//             <button
//               onClick={() => {
//                 setSelectedCourse(false);
//                 setCourseData(null);
//               }}
//               className="
//                 flex items-center gap-2
//                 bg-white/10 hover:bg-white/20
//                 border border-white/10
//                 px-5 py-3 rounded-2xl
//                 transition-all duration-300
//                 backdrop-blur-md
//               "
//             >
//               <ArrowLeft size={18} />
//               Back To Courses
//             </button>

//             {/* HERO CONTENT */}
//             <div className="mt-10 flex flex-col xl:flex-row gap-10 items-start justify-between">
//               <div className="max-w-4xl">
//                 <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
//                   <Sparkles size={16} />
//                   Premium Learning Experience
//                 </div>

//                 <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
//                   <BookOpen size={42} />
//                 </div>

//                 <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight">
//                   {courseData?.title}
//                 </h1>

//                 <p className="mt-6 text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
//                   {courseData?.description}
//                 </p>
//               </div>

//               {/* COURSE STATS */}
//               <div className="w-full xl:w-[350px] bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
//                 <h3 className="text-xl font-bold mb-6">
//                   Course Information
//                 </h3>

//                 <div className="space-y-5">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <Clock3 size={18} />
//                       <span>Duration</span>
//                     </div>

//                     <span className="font-semibold">
//                       {courseData?.duration || "N/A"}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <DollarSign size={18} />
//                       <span>Price</span>
//                     </div>

//                     <span className="font-semibold">
//                       {courseData?.price || "Free"}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <Layers3 size={18} />
//                       <span>Modules</span>
//                     </div>

//                     <span className="font-semibold">
//                       {courseData?.modules?.length || 0}
//                     </span>
//                   </div>

//                   {/* PROGRESS */}
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <CheckCircle2
//                         size={18}
//                         className="text-green-400"
//                       />
//                       <span>Completed</span>
//                     </div>

//                     <span className="font-semibold text-green-300">
//                       {
//                         courseData?.modules?.filter((m) =>
//                           watchedModules.includes(m._id)
//                         ).length
//                       }
//                       /
//                       {courseData?.modules?.length || 0}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================= COURSE CONTENT ================= */}
//         <div className="px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
//           <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
//                 Course Modules
//               </h2>

//               <p className="text-zinc-500 mt-2">
//                 Watch lectures and continue learning
//               </p>
//             </div>

//             {/* PROGRESS CARD */}
//             <div className="bg-white border border-zinc-200 rounded-2xl px-5 py-3 shadow-sm">
//               <p className="text-sm text-zinc-500">
//                 Learning Progress
//               </p>

//               <h3 className="text-2xl font-bold text-black">
//                 {
//                   courseData?.modules?.filter((m) =>
//                     watchedModules.includes(m._id)
//                   ).length
//                 }
//                 /
//                 {courseData?.modules?.length || 0}
//               </h3>
//             </div>
//           </div>

//           {/* MODULES */}
//           <div className="space-y-5">
//             {courseData?.modules?.length > 0 ? (
//               courseData.modules.map((m, i) => {
//                 const watched = watchedModules.includes(m._id);

//                 return (
//                   <div
//                     key={i}
//                     className="
//                       bg-white
//                       rounded-3xl
//                       border border-zinc-200
//                       p-5 sm:p-6
//                       hover:shadow-xl
//                       transition-all duration-300
//                     "
//                   >
//                     <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//                       {/* LEFT */}
//                       <div className="flex items-start gap-4">
//                         <div
//                           className={`
//                             min-w-[60px]
//                             h-[60px]
//                             rounded-2xl
//                             flex items-center justify-center
//                             text-lg font-bold
//                             ${
//                               watched
//                                 ? "bg-green-600 text-white"
//                                 : "bg-black text-white"
//                             }
//                           `}
//                         >
//                           {watched ? (
//                             <CheckCircle size={28} />
//                           ) : (
//                             i + 1
//                           )}
//                         </div>

//                         <div>
//                           <div className="flex items-center gap-3 flex-wrap">
//                             <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
//                               {m.title}
//                             </h3>

//                             {watched ? (
//                               <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
//                                 Watched
//                               </span>
//                             ) : (
//                               <span className="bg-zinc-100 text-zinc-600 text-xs px-3 py-1 rounded-full font-semibold">
//                                 Not Watched
//                               </span>
//                             )}
//                           </div>

//                           <p className="text-zinc-500 mt-2 leading-relaxed">
//                             {m.description}
//                           </p>
//                         </div>
//                       </div>

//                       {/* RIGHT */}
//                       <button
//                         onClick={() => watchVideo(m)}
//                         className={`
//                           flex items-center justify-center gap-2
//                           px-6 py-4
//                           rounded-2xl
//                           transition-all duration-300
//                           w-full lg:w-auto
//                           ${
//                             watched
//                               ? "bg-green-600 hover:bg-green-700 text-white"
//                               : "bg-black hover:bg-zinc-800 text-white"
//                           }
//                         `}
//                       >
//                         {watched ? (
//                           <>
//                             <CheckCircle2 size={20} />
//                             Watched
//                           </>
//                         ) : (
//                           <>
//                             <PlayCircle size={20} />
//                             Watch Now
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="bg-white rounded-3xl p-10 text-center border border-zinc-200">
//                 <div className="text-6xl mb-5">
//                   📂
//                 </div>

//                 <h3 className="text-2xl font-bold text-zinc-900">
//                   No Modules Available
//                 </h3>

//                 <p className="text-zinc-500 mt-3">
//                   Admin has not uploaded modules yet
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ================= MAIN PAGE =================
//   return (
//     <div className="min-h-screen bg-zinc-100 overflow-x-hidden">
//       {/* ================= TOP HERO ================= */}
//       <div className="relative overflow-hidden bg-black text-white">
//         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_35%)]" />

//         <div className="relative px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
//           <div className="max-w-4xl">
//             <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
//               <Sparkles size={16} />
//               Continue Your Learning Journey
//             </div>

//             <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight">
//               Active Courses
//             </h1>

//             <p className="text-zinc-300 mt-5 text-base sm:text-lg max-w-2xl">
//               Access your enrolled courses, continue learning,
//               and watch premium modules anytime.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ================= CONTENT ================= */}
//       <div className="px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
//         {/* LOADING */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="
//                   bg-white
//                   rounded-3xl
//                   h-[350px]
//                   animate-pulse
//                 "
//               />
//             ))}
//           </div>
//         ) : courses.length === 0 ? (
//           <div className="bg-white rounded-3xl border border-zinc-200 p-10 lg:p-16 text-center">
//             <div className="text-7xl mb-6">
//               📚
//             </div>

//             <h2 className="text-3xl font-black text-zinc-900">
//               No Active Courses
//             </h2>

//             <p className="text-zinc-500 mt-4 max-w-xl mx-auto">
//               Once admin approves your enrollment request,
//               your active courses will appear here.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
// {courses.map((item) => (
//   <div
//     key={item._id}
//     className="
//       group
//       relative
//       overflow-hidden
//       rounded-[32px]
//       border border-zinc-200/80
//       bg-white/80
//       backdrop-blur-xl
//       shadow-sm
//       hover:shadow-2xl
//       transition-all duration-500
//       hover:-translate-y-2
//     "
//   >
//     {/* TOP GLOW */}
//     <div className="absolute -top-20 -right-20 w-52 h-52 bg-zinc-300/20 blur-3xl rounded-full" />

//     {/* HEADER */}
//     <div
//       className="
//         relative
//         bg-gradient-to-br
//         from-black
//         via-zinc-900
//         to-zinc-800
//         p-6 sm:p-8
//         overflow-hidden
//       "
//     >
//       {/* BACKGROUND EFFECT */}
//       <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_35%)]" />

//       {/* STATUS BADGE */}
//       <div className="absolute top-5 right-5">
//         <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-300 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
//           <CheckCircle2 size={14} />
//           Active
//         </div>
//       </div>

//       {/* ICON */}
//       <div
//         className="
//           relative
//           w-20 h-20
//           rounded-3xl
//           bg-white/10
//           border border-white/10
//           backdrop-blur-md
//           flex items-center justify-center
//           text-4xl
//           shadow-2xl
//         "
//       >
//          <div className="absolute inset-0 rounded-[28px] bg-white/5 blur-xl" />

//   <BookOpen
//     size={40}
//     className="relative text-white"
//     strokeWidth={2.2}
//   />
//       </div>

//       {/* CONTENT */}
//       <div className="relative mt-6">
//         <h2
//           className="
//             text-2xl sm:text-3xl
//             font-black
//             text-white
//             leading-tight
//             line-clamp-2
//           "
//         >
//           {item.courseId?.title}
//         </h2>

//         <p
//           className="
//             mt-4
//             text-zinc-300
//             text-sm sm:text-base
//             leading-relaxed
//             line-clamp-3
//           "
//         >
//           {item.courseId?.description}
//         </p>
//       </div>
//     </div>

//     {/* BODY */}
//     <div className="p-5 sm:p-6">
//       {/* INFO GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//         {/* DURATION */}
//         <div
//           className="
//             rounded-2xl
//             border border-zinc-200
//             bg-zinc-50
//             p-4
//           "
//         >
//           <div className="flex items-center gap-2 text-zinc-500 text-sm mb-2">
//             <Clock3 size={16} />
//             Duration
//           </div>

//           <h3 className="font-bold text-zinc-900 text-lg">
//             {item.courseId?.duration || "N/A"}
//           </h3>
//         </div>

//         {/* PRICE */}
//         <div
//           className="
//             rounded-2xl
//             border border-zinc-200
//             bg-zinc-50
//             p-4
//           "
//         >
//           <div className="flex items-center gap-2 text-zinc-500 text-sm mb-2">
//             <DollarSign size={16} />
//             Price
//           </div>

//           <h3 className="font-bold text-zinc-900 text-lg">
//             {item.courseId?.price || "Free"}
//           </h3>
//         </div>

//         {/* ENROLL DATE */}
//         <div
//           className="
//             rounded-2xl
//             border border-zinc-200
//             bg-zinc-50
//             p-4
//             sm:col-span-2
//           "
//         >
//           <div className="flex items-center gap-2 text-zinc-500 text-sm mb-2">
//             <CalendarDays size={16} />
//             Enrolled On
//           </div>

//           <h3 className="font-bold text-zinc-900">
//             {item.createdAt
//               ? new Date(item.createdAt).toLocaleDateString()
//               : "N/A"}
//           </h3>
//         </div>

//       </div>

//       {/* FOOTER */}
//       <div className="mt-6 flex flex-col sm:flex-row gap-3">

//         {/* CONTINUE */}
//         <button
//           onClick={() =>
//             openCourse(item.courseId?._id)
//           }
//           className="
//             flex-1
//             bg-black
//             hover:bg-zinc-800
//             text-white
//             py-4
//             rounded-2xl
//             font-semibold
//             transition-all duration-300
//             flex items-center justify-center gap-2
//             shadow-lg hover:shadow-black/20
//           "
//         >
//           <PlayCircle size={20} />
//           Continue Learning
//         </button>

//         {/* PROGRESS */}
//         <div
//           className="
//             sm:w-[120px]
//             rounded-2xl
//             bg-green-50
//             border border-green-200
//             flex flex-col
//             items-center
//             justify-center
//             py-3
//           "
//         >
//           <span className="text-xs text-green-600 font-medium">
//             Progress
//           </span>

//           <span className="text-xl font-black text-green-700">
//             {item.courseId?.modules?.length
//               ? `${Math.round(
//                   (watchedModules.filter((id) =>
//                     courseData?.modules?.some(
//                       (m) => m._id === id
//                     )
//                   ).length /
//                     item.courseId.modules.length) *
//                     100
//                 )}%`
//               : "0%"}
//           </span>
//         </div>

//       </div>
//     </div>

//     {/* HOVER BORDER */}
//     <div
//       className="
//         absolute inset-0
//         rounded-[32px]
//         border border-transparent
//         group-hover:border-zinc-300
//         transition-all duration-500
//         pointer-events-none
//       "
//     />
//   </div>
// ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ActiveCourses;








import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

import {
  BookOpen,
  Clock3,
  DollarSign,
  PlayCircle,
  CheckCircle2,
  ArrowLeft,
  Layers3,
  CalendarDays,
  Sparkles,
  Circle,
  CheckCircle,
  GraduationCap,
  Trophy,
  TrendingUp,
  Award,
  Zap,
  ChevronRight,
  FileText,
  Video,
  Headphones,
  Star,
  Infinity,
  Shield,
  Lock,
  Eye,
  ThumbsUp,
  Share2,
  Download,
  Bookmark,
  Volume2,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  Pause,
  Play
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const ActiveCourses = () => {
  // ================= STATES =================
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCourse, setSelectedCourse] = useState(false);
  const [courseData, setCourseData] = useState(null);

  // ================= WATCHED MODULES =================
  const [watchedModules, setWatchedModules] = useState([]);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/enroll/my-courses/${userId}`
      );

      const activeCourses = (res.data || []).filter(
        (item) => item.status === "active"
      );

      setCourses(activeCourses);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ================= LOAD WATCHED MODULES =================
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("watchedModules")) || [];

    setWatchedModules(saved);
  }, []);

  // ================= MARK AS WATCHED =================
  const markAsWatched = (moduleId) => {
    if (!watchedModules.includes(moduleId)) {
      const updated = [...watchedModules, moduleId];

      setWatchedModules(updated);

      localStorage.setItem(
        "watchedModules",
        JSON.stringify(updated)
      );
    }
  };

  // ================= OPEN COURSE =================
  const openCourse = async (courseId) => {
    try {
      const [courseRes, moduleRes] = await Promise.all([
        axios.get(`${API}/admin/course/${courseId}`),
        axios.get(`${API}/api/modules/course/${courseId}`),
      ]);

      setCourseData({
        ...courseRes.data,
        modules: moduleRes.data || [],
      });

      setSelectedCourse(true);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= WATCH VIDEO =================
  const watchVideo = (module) => {
    markAsWatched(module._id);

    navigate("/user/video", {
      state: {
        youtubeUrl: module.youtubeUrl,
      },
    });
  };

  // ================= CALCULATE COURSE PROGRESS =================
  const calculateProgress = (course) => {
    if (!course.modules || course.modules.length === 0) return 0;
    const watched = course.modules.filter(m => watchedModules.includes(m._id)).length;
    return Math.round((watched / course.modules.length) * 100);
  };

  // ================= GET COMPLETION STATUS =================
  const getCompletionStatus = (progress) => {
    if (progress === 100) return { text: "Completed", color: "green", icon: <Trophy size={14} /> };
    if (progress >= 75) return { text: "Advanced", color: "blue", icon: <TrendingUp size={14} /> };
    if (progress >= 50) return { text: "Halfway", color: "orange", icon: <Zap size={14} /> };
    if (progress >= 25) return { text: "Started", color: "purple", icon: <PlayCircle size={14} /> };
    return { text: "Not Started", color: "gray", icon: <Circle size={14} /> };
  };

  // ================= COURSE DETAILS PAGE =================
  if (selectedCourse && courseData) {
    const progress = calculateProgress(courseData);
    const completedModules = courseData.modules?.filter(m => watchedModules.includes(m._id)).length || 0;
    const totalModules = courseData.modules?.length || 0;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 overflow-x-hidden"
        >
          {/* ================= HERO SECTION ================= */}
          <div className="relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black text-white">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse-slow" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-[100px] animate-pulse-slower" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="relative px-4 sm:px-6 lg:px-10 py-8 lg:py-14">
              {/* BACK BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCourse(false);
                  setCourseData(null);
                }}
                className="
                  flex items-center gap-2
                  bg-white/10 hover:bg-white/20
                  border border-white/20
                  px-5 py-3 rounded-2xl
                  transition-all duration-300
                  backdrop-blur-md
                  group
                "
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Back To Courses
              </motion.button>

              {/* HERO CONTENT */}
              <div className="mt-10 flex flex-col xl:flex-row gap-10 items-start justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-4xl"
                >
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm mb-6">
                    <Sparkles size={16} className="animate-pulse" />
                    Premium Learning Experience
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center mb-6 backdrop-blur-md shadow-xl"
                  >
                    <BookOpen size={42} className="text-white" />
                  </motion.div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                    {courseData?.title}
                  </h1>

                  <p className="mt-6 text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
                    {courseData?.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-zinc-400">Overall Progress</span>
                      <span className="text-sm font-bold text-white">{progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* COURSE STATS CARD */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full xl:w-[380px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <GraduationCap size={20} />
                    Course Information
                  </h3>

                  <div className="space-y-5">
                    {[
                      { icon: Clock3, label: "Duration", value: courseData?.duration || "N/A" },
                      { icon: DollarSign, label: "Price", value: courseData?.price || "Free" },
                      { icon: Layers3, label: "Modules", value: totalModules },
                      { icon: CheckCircle2, label: "Completed", value: `${completedModules}/${totalModules}`, color: "text-green-400" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-white/10">
                        <div className="flex items-center gap-3 text-zinc-300">
                          <item.icon size={18} />
                          <span>{item.label}</span>
                        </div>
                        <span className={`font-semibold ${item.color || "text-white"}`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Achievement Badge */}
                  {progress === 100 && (
                    <div className="mt-6 p-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl border border-yellow-500/30">
                      <div className="flex items-center gap-3">
                        <Trophy size={24} className="text-yellow-400" />
                        <div>
                          <p className="text-xs text-yellow-400">Course Completed!</p>
                          <p className="text-sm font-bold text-white">You've mastered this course</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* ================= COURSE CONTENT ================= */}
          <div className="px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-black to-zinc-600 bg-clip-text text-transparent">
                  Course Modules
                </h2>
                <p className="text-zinc-500 mt-2">
                  Watch lectures and track your learning progress
                </p>
              </div>

              {/* PROGRESS CARD */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white border border-zinc-200 rounded-2xl px-6 py-3 shadow-lg"
              >
                <p className="text-xs text-zinc-500">Modules Completed</p>
                <h3 className="text-2xl font-bold text-black">
                  {completedModules}/{totalModules}
                </h3>
              </motion.div>
            </div>

            {/* MODULES LIST */}
            <div className="space-y-4">
              {courseData?.modules?.length > 0 ? (
                courseData.modules.map((m, i) => {
                  const watched = watchedModules.includes(m._id);
                  const isLocked = !watched && i > 0 && !watchedModules.includes(courseData.modules[i-1]?._id);

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      className={`
                        bg-white rounded-3xl border p-5 sm:p-6
                        transition-all duration-300 hover:shadow-2xl
                        ${watched ? 'border-green-200 bg-gradient-to-r from-white to-green-50/30' : 'border-zinc-200'}
                        ${isLocked ? 'opacity-75' : ''}
                      `}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        {/* LEFT SECTION */}
                        <div className="flex items-start gap-4 flex-1">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`
                              min-w-[60px] h-[60px] rounded-2xl
                              flex items-center justify-center text-lg font-bold
                              transition-all duration-300
                              ${watched
                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                                : isLocked
                                ? "bg-zinc-200 text-zinc-500"
                                : "bg-gradient-to-r from-black to-zinc-800 text-white shadow-lg"
                              }
                            `}
                          >
                            {watched ? (
                              <CheckCircle size={28} />
                            ) : isLocked ? (
                              <Lock size={24} />
                            ) : (
                              <span>{i + 1}</span>
                            )}
                          </motion.div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap mb-2">
                              <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
                                {m.title}
                              </h3>
                              {watched ? (
                                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                                  <CheckCircle2 size={12} />
                                  Completed
                                </span>
                              ) : (
                                <span className="bg-zinc-100 text-zinc-600 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                                  <Circle size={12} />
                                  Pending
                                </span>
                              )}
                            </div>
                            <p className="text-zinc-500 leading-relaxed">
                              {m.description}
                            </p>
                            {m.duration && (
                              <div className="flex items-center gap-2 mt-3 text-xs text-zinc-400">
                                <Clock3 size={12} />
                                <span>{m.duration} minutes</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* RIGHT SECTION - BUTTON */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => !isLocked && watchVideo(m)}
                          disabled={isLocked}
                          className={`
                            flex items-center justify-center gap-2
                            px-6 py-3 rounded-2xl
                            transition-all duration-300
                            w-full lg:w-auto min-w-[160px]
                            ${watched
                              ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                              : isLocked
                              ? "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-black to-zinc-800 hover:from-zinc-800 hover:to-black text-white shadow-lg"
                            }
                          `}
                        >
                          {watched ? (
                            <>
                              <Eye size={18} />
                              Review Again
                            </>
                          ) : isLocked ? (
                            <>
                              <Lock size={18} />
                              Complete Previous
                            </>
                          ) : (
                            <>
                              <PlayCircle size={18} />
                              Watch Now
                            </>
                          )}
                          <ChevronRight size={16} />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-3xl p-12 text-center border border-zinc-200"
                >
                  <div className="text-7xl mb-5">📂</div>
                  <h3 className="text-2xl font-bold text-zinc-900">No Modules Available</h3>
                  <p className="text-zinc-500 mt-3">Admin has not uploaded modules yet</p>
                </motion.div>
              )}
            </div>

            {/* Next Course Recommendation */}
            {progress === 100 && courses.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-purple-200"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Trophy size={32} className="text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-600 font-semibold">Congratulations!</p>
                      <p className="text-zinc-700">You've completed this course. Ready for the next challenge?</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCourse(false);
                      setCourseData(null);
                    }}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 flex items-center gap-2"
                  >
                    Browse More Courses
                    <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ================= MAIN PAGE =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 overflow-x-hidden">
      {/* ================= TOP HERO ================= */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-[100px] animate-pulse-slower" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-10 py-12 lg:py-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm mb-6"
            >
              <Sparkles size={16} className="animate-pulse" />
              Continue Your Learning Journey
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight"
            >
              Active Courses
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-300 mt-5 text-base sm:text-lg max-w-2xl"
            >
              Access your enrolled courses, continue learning,
              and watch premium modules anytime, anywhere.
            </motion.p>

            {/* Stats Summary */}
            {!loading && courses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/10"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={20} className="text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold">{courses.length}</div>
                    <div className="text-xs text-zinc-400">Active Courses</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy size={20} className="text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold">
                      {courses.filter(c => calculateProgress(c.courseId) === 100).length}
                    </div>
                    <div className="text-xs text-zinc-400">Completed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp size={20} className="text-green-400" />
                  <div>
                    <div className="text-2xl font-bold">
                      {Math.round(courses.reduce((acc, c) => acc + calculateProgress(c.courseId), 0) / courses.length)}%
                    </div>
                    <div className="text-xs text-zinc-400">Avg Progress</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        {/* LOADING STATE */}
        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl h-[400px] animate-pulse shadow-lg"
                >
                  <div className="h-48 bg-zinc-200 rounded-t-3xl" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-zinc-200 rounded w-3/4" />
                    <div className="h-4 bg-zinc-200 rounded w-full" />
                    <div className="h-4 bg-zinc-200 rounded w-5/6" />
                    <div className="h-10 bg-zinc-200 rounded-xl mt-4" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : courses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-zinc-200 p-12 lg:p-20 text-center shadow-xl"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                📚
              </motion.div>
              <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-black to-zinc-600 bg-clip-text text-transparent">
                No Active Courses
              </h2>
              <p className="text-zinc-500 mt-4 max-w-xl mx-auto text-lg">
                Once admin approves your enrollment request,
                your active courses will appear here.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-8 px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-zinc-800 transition-all duration-300 inline-flex items-center gap-2"
              >
                Browse Courses
                <ChevronRight size={18} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8"
            >
              {courses.map((item, index) => {
                const courseProgress = calculateProgress(item.courseId);
                const status = getCompletionStatus(courseProgress);
                
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Top Gradient Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${status.color === 'green' ? 'from-green-500 to-emerald-500' : status.color === 'blue' ? 'from-blue-500 to-cyan-500' : status.color === 'orange' ? 'from-orange-500 to-red-500' : 'from-purple-500 to-pink-500'}`} />

                    {/* Course Header */}
                    <div className="relative bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-6 overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_35%)]" />
                      
                      <div className="flex justify-between items-start">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl"
                        >
                          <BookOpen size={32} className="text-white" />
                        </motion.div>
                        
                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md ${status.color === 'green' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : status.color === 'blue' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : status.color === 'orange' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'}`}>
                          {status.icon}
                          <span>{status.text}</span>
                        </div>
                      </div>

                      <div className="mt-5">
                        <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight line-clamp-2">
                          {item.courseId?.title}
                        </h2>
                        <p className="mt-3 text-zinc-300 text-sm leading-relaxed line-clamp-2">
                          {item.courseId?.description}
                        </p>
                      </div>
                    </div>

                    {/* Course Body */}
                    <div className="p-5">
                      {/* Progress Section */}
                      <div className="mb-5">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-zinc-500 font-medium">Progress</span>
                          <span className="text-sm font-bold text-black">{courseProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${courseProgress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`h-full rounded-full bg-gradient-to-r ${status.color === 'green' ? 'from-green-500 to-emerald-500' : status.color === 'blue' ? 'from-blue-500 to-cyan-500' : status.color === 'orange' ? 'from-orange-500 to-red-500' : 'from-purple-500 to-pink-500'}`}
                          />
                        </div>
                      </div>

                      {/* Course Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-zinc-50 rounded-xl p-3">
                          <Clock3 size={14} className="text-zinc-400 mb-1" />
                          <p className="text-xs text-zinc-500">Duration</p>
                          <p className="text-sm font-bold text-black">{item.courseId?.duration || "N/A"}</p>
                        </div>
                        <div className="bg-zinc-50 rounded-xl p-3">
                          <Layers3 size={14} className="text-zinc-400 mb-1" />
                          <p className="text-xs text-zinc-500">Modules</p>
                          <p className="text-sm font-bold text-black">{item.courseId?.modules?.length || 0}</p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openCourse(item.courseId?._id)}
                        className="w-full bg-gradient-to-r from-black to-zinc-800 hover:from-zinc-800 hover:to-black text-white py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                      >
                        {courseProgress === 100 ? (
                          <>
                            <Award size={18} />
                            Review Course
                          </>
                        ) : (
                          <>
                            <PlayCircle size={18} />
                            Continue Learning
                          </>
                        )}
                        <ChevronRight size={16} />
                      </motion.button>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-zinc-200 transition-all duration-500 pointer-events-none" />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.2); }
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
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ActiveCourses;
