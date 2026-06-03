// import React, { useEffect, useMemo, useState } from "react"
// import axios from "axios"
// import UserPayment from "./UserPayment"
// import API from "../../utils/api";

// import {
//   Search,
//   BookOpen,
//   Clock3,
//   Wallet,
//   GraduationCap,
//   Sparkles,
//   CheckCircle2,
//   AlertCircle,
//   XCircle,
//   Layers3,
//   ArrowRight
// } from "lucide-react"

// const UserDashboard = () => {

//   // ================= STATES =================
//   const [courses, setCourses] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedCourse, setSelectedCourse] = useState(null)
//   const [search, setSearch] = useState("")
//   const [enrolledCourses, setEnrolledCourses] = useState([])

//   // ================= USER ID =================
//   const userId = localStorage.getItem("userId")

//   // ================= FETCH COURSES =================
//   const fetchCourses = async () => {
//     try {

//       setLoading(true)

//       const res = await axios.get(
//         `${API}/admin/courses`
//       )

//       setCourses(res.data || [])

//     } catch (error) {

//       console.log("COURSE ERROR:", error)

//     } finally {

//       setLoading(false)

//     }
//   }

//   // ================= FETCH ENROLLMENTS =================
//   const fetchEnrollments = async () => {
//     try {

//       if (!userId) return

//       const res = await axios.get(
//         `${API}/enroll/my-courses/${userId}`
//       )

//       setEnrolledCourses(res.data || [])

//     } catch (error) {

//       console.log("ENROLLMENT ERROR:", error)

//     }
//   }

//   useEffect(() => {
//     fetchCourses()
//     fetchEnrollments()
//   }, [])

//   // ================= SEARCH FILTER =================
//   const filteredCourses = useMemo(() => {
//     return courses.filter((course) =>
//       course.title?.toLowerCase().includes(search.toLowerCase())
//     )
//   }, [courses, search])

//   // ================= CHECK ENROLLMENT =================
//   const getEnrollment = (courseId) => {
//     return enrolledCourses.find(
//       (item) => item.courseId?._id === courseId
//     )
//   }

//   // ================= STATS =================
//   const activeCourses = enrolledCourses.filter(
//     (item) => item.status === "active"
//   ).length

//   const pendingCourses = enrolledCourses.filter(
//     (item) => item.status === "pending"
//   ).length

//   const totalCourses = courses.length

//   return (
//     <div className="min-h-screen mt-0 bg-zinc-100">

//       {/* ================= HERO SECTION ================= */}
//       <div className="relative overflow-hidden bg-black text-white">

//         {/* GLOW */}
//         <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">

//           <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

//             {/* LEFT */}
//             <div className="max-w-3xl">

//               <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-semibold mb-6">
//                 <Sparkles size={16} />
//                 Modern LMS Platform
//               </div>

//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
//                 Learn New Skills
//                 <span className="block text-zinc-400 mt-2">
//                   Anytime Anywhere
//                 </span>
//               </h1>

//               <p className="text-zinc-300 mt-6 text-lg leading-relaxed max-w-2xl">
//                 Explore premium courses, watch secure lectures,
//                 track progress, and build your future with
//                 our powerful LMS learning platform.
//               </p>

//             </div>

//             {/* RIGHT STATS */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:max-w-2xl">

//               {/* TOTAL */}
//               <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

//                 <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center mb-5">
//                   <Layers3 size={28} />
//                 </div>

//                 <p className="text-zinc-300 text-sm">
//                   Total Courses
//                 </p>

//                 <h2 className="text-4xl font-black mt-2">
//                   {totalCourses}
//                 </h2>

//               </div>

//               {/* ACTIVE */}
//               <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

//                 <div className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center mb-5">
//                   <CheckCircle2 size={28} />
//                 </div>

//                 <p className="text-zinc-300 text-sm">
//                   Active Courses
//                 </p>

//                 <h2 className="text-4xl font-black mt-2">
//                   {activeCourses}
//                 </h2>

//               </div>

//               {/* PENDING */}
//               <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

//                 <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-white flex items-center justify-center mb-5">
//                   <AlertCircle size={28} />
//                 </div>

//                 <p className="text-zinc-300 text-sm">
//                   Pending
//                 </p>

//                 <h2 className="text-4xl font-black mt-2">
//                   {pendingCourses}
//                 </h2>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* ================= CONTENT ================= */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

//         {/* ================= TOP BAR ================= */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

//           <div>
//             <h2 className="text-3xl sm:text-4xl font-black text-black">
//               Explore Courses
//             </h2>

//             <p className="text-zinc-600 mt-2">
//               Find the best courses and start learning today
//             </p>
//           </div>

//           {/* SEARCH */}
//           <div className="relative w-full lg:w-[380px]">

//             <Search
//               size={20}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
//             />

//             <input
//               type="text"
//               placeholder="Search courses..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="
//                 w-full
//                 h-14
//                 pl-12 pr-4
//                 rounded-2xl
//                 border border-zinc-300
//                 bg-white
//                 shadow-sm
//                 focus:outline-none
//                 focus:ring-2
//                 focus:ring-black
//                 transition-all
//               "
//             />

//           </div>

//         </div>

//         {/* ================= LOADING ================= */}
//         {loading ? (

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

//             {[1,2,3,4,5,6].map((item) => (
//               <div
//                 key={item}
//                 className="bg-white rounded-[30px] p-6 shadow-sm border border-zinc-200 animate-pulse"
//               >

//                 <div className="flex items-center justify-between mb-6">

//                   <div className="w-16 h-16 bg-zinc-200 rounded-2xl" />

//                   <div className="w-20 h-8 bg-zinc-200 rounded-full" />

//                 </div>

//                 <div className="h-7 bg-zinc-200 rounded mb-4" />
//                 <div className="h-4 bg-zinc-200 rounded mb-2" />
//                 <div className="h-4 bg-zinc-200 rounded mb-2" />
//                 <div className="h-4 bg-zinc-200 rounded w-2/3 mb-8" />

//                 <div className="h-12 bg-zinc-300 rounded-2xl" />

//               </div>
//             ))}

//           </div>

//         ) : filteredCourses.length === 0 ? (

//           <div className="bg-white rounded-[35px] p-14 text-center border border-zinc-200 shadow-sm">

//             <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-6">
//               <BookOpen size={40} className="text-zinc-500" />
//             </div>

//             <h2 className="text-3xl font-black text-black">
//               No Courses Found
//             </h2>

//             <p className="text-zinc-500 mt-4 text-lg">
//               Try another keyword to search courses
//             </p>

//           </div>

//         ) : (

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

//             {filteredCourses.map((course) => {

//               const enrollment = getEnrollment(course._id)

//               return (
//                 <div
//                   key={course._id}
//                   className="
//                     group
//                     bg-white
//                     rounded-[35px]
//                     border border-zinc-200
//                     p-7
//                     shadow-sm
//                     hover:shadow-2xl
//                     hover:-translate-y-2
//                     transition-all duration-500
//                     flex flex-col
//                     overflow-hidden
//                     relative
//                   "
//                 >

//                   {/* TOP */}
//                   <div className="flex items-start justify-between mb-6">

//                     <div className="
//                       w-16 h-16
//                       rounded-2xl
//                       bg-black
//                       text-white
//                       flex items-center justify-center
//                       shadow-lg
//                     ">
//                       <GraduationCap size={30} />
//                     </div>

//                     {enrollment && (
//                       <span
//                         className={`
//                           px-4 py-2
//                           rounded-full
//                           text-xs
//                           font-bold
//                           capitalize
//                           ${
//                             enrollment.status === "active"
//                               ? "bg-green-100 text-green-700"
//                               : enrollment.status === "pending"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-red-100 text-red-700"
//                           }
//                         `}
//                       >
//                         {enrollment.status}
//                       </span>
//                     )}

//                   </div>

//                   {/* TITLE */}
//                   <h2 className="text-3xl font-black text-black leading-tight">
//                     {course.title}
//                   </h2>

//                   {/* DESCRIPTION */}
//                   <p className="text-zinc-600 mt-4 leading-relaxed flex-grow">
//                     {course.description}
//                   </p>

//                   {/* INFO */}
//                   <div className="mt-7 space-y-4">

//                     <div className="flex items-center gap-3 text-zinc-700">

//                       <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center">
//                         <Clock3 size={20} />
//                       </div>

//                       <div>
//                         <p className="text-xs text-zinc-500">
//                           Duration
//                         </p>

//                         <h4 className="font-bold">
//                           {course.duration}
//                         </h4>
//                       </div>

//                     </div>

//                     <div className="flex items-center gap-3 text-zinc-700">

//                       <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center">
//                         <Wallet size={20} />
//                       </div>

//                       <div>
//                         <p className="text-xs text-zinc-500">
//                           Course Price
//                         </p>

//                         <h4 className="font-bold">
//                           {course.price || "Free"}
//                         </h4>
//                       </div>

//                     </div>

//                   </div>

//                   {/* BUTTON */}
//                   {enrollment ? (

//                     <button
//                       disabled
//                       className={`
//                         mt-8
//                         w-full
//                         py-4
//                         rounded-2xl
//                         font-bold
//                         cursor-not-allowed
//                         ${
//                           enrollment.status === "active"
//                             ? "bg-green-600 text-white"
//                             : enrollment.status === "pending"
//                             ? "bg-yellow-500 text-white"
//                             : "bg-red-500 text-white"
//                         }
//                       `}
//                     >
//                       {enrollment.status === "active"
//                         ? "Already Enrolled"
//                         : enrollment.status === "pending"
//                         ? "Request Pending"
//                         : "Refund Requested"}
//                     </button>

//                   ) : (

//                     <button
//                       onClick={() => setSelectedCourse(course)}
//                       className="
//                         mt-8
//                         w-full
//                         bg-black
//                         text-white
//                         py-4
//                         rounded-2xl
//                         font-bold
//                         hover:bg-zinc-800
//                         transition-all duration-300
//                         flex items-center justify-center gap-2
//                         group-hover:scale-[1.02]
//                       "
//                     >
//                       Enroll Now
//                       <ArrowRight size={18} />
//                     </button>

//                   )}

//                 </div>
//               )
//             })}

//           </div>
//         )}

//       </div>

//       {/* ================= PAYMENT MODAL ================= */}
//       {selectedCourse && (
//         <UserPayment
//           course={selectedCourse}
//           userId={userId}
//           onClose={() => {
//             setSelectedCourse(null)
//             fetchEnrollments()
//           }}
//         />
//       )}

//     </div>
//   )
// }

// export default UserDashboard










import React, { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import UserPayment from "./UserPayment";
import API from "../../utils/api";
import { debounce } from "lodash"; // or implement simple debounce

import {
  Search,
  BookOpen,
  Clock3,
  Wallet,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Layers3,
  ArrowRight,
  Filter,
  SortAsc,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

const UserDashboard = () => {
  // ================= STATES =================
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [search, setSearch] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // ================= USER ID =================
  const userId = localStorage.getItem("userId");

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API}/admin/courses`);
      setCourses(res.data || []);
    } catch (err) {
      console.error("COURSE ERROR:", err);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH ENROLLMENTS =================
  const fetchEnrollments = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(`${API}/enroll/my-courses/${userId}`);
      setEnrolledCourses(res.data || []);
    } catch (err) {
      console.error("ENROLLMENT ERROR:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  // ================= DERIVED DATA =================
  // Extract unique categories (if courses have a category field, else use a placeholder)
  const categories = useMemo(() => {
    const cats = new Set(courses.map(c => c.category).filter(Boolean));
    return ["all", ...Array.from(cats)];
  }, [courses]);

  // Filter & sort courses
  const processedCourses = useMemo(() => {
    let filtered = [...courses];

    // Search filter
    if (search) {
      filtered = filtered.filter(course =>
        course.title?.toLowerCase().includes(search.toLowerCase()) ||
        course.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category !== "all") {
      filtered = filtered.filter(course => course.category === category);
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === "title") return a.title?.localeCompare(b.title);
      if (sortBy === "price") {
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        return priceA - priceB;
      }
      if (sortBy === "duration") return (a.duration || "").localeCompare(b.duration || "");
      return 0;
    });

    return filtered;
  }, [courses, search, category, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedCourses.length / itemsPerPage);
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedCourses.slice(start, start + itemsPerPage);
  }, [processedCourses, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortBy]);

  // ================= CHECK ENROLLMENT =================
  const getEnrollment = (courseId) => {
    return enrolledCourses.find(item => item.courseId?._id === courseId);
  };

  // ================= STATS =================
  const activeCourses = enrolledCourses.filter(item => item.status === "active").length;
  const pendingCourses = enrolledCourses.filter(item => item.status === "pending").length;
  const totalCourses = courses.length;

  // ================= DEBOUNCED SEARCH =================
  const debouncedSetSearch = useCallback(
    debounce(value => setSearch(value), 300),
    []
  );

  // ================= HANDLE PAGE CHANGE =================
  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-100 overflow-x-hidden pt-14 sm:pt-16">
      {/* ================= HERO SECTION ================= */}
      <div className="relative overflow-hidden bg-black text-white">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 lg:py-16">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 lg:gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                <Sparkles size={16} />
                Modern LMS Platform
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Learn New Skills
                <span className="block text-zinc-400 mt-1 sm:mt-2">Anytime Anywhere</span>
              </h1>
              <p className="text-zinc-300 mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed max-w-2xl">
                Explore premium courses, watch secure lectures, track progress,
                and build your future with our powerful LMS learning platform.
              </p>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full xl:max-w-2xl">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-transform hover:scale-105">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white text-black flex items-center justify-center mb-4 sm:mb-5">
                  <Layers3 size={24} className="sm:w-7 sm:h-7" />
                </div>
                <p className="text-zinc-300 text-xs sm:text-sm">Total Courses</p>
                <h2 className="text-3xl sm:text-4xl font-black mt-1 sm:mt-2">{totalCourses}</h2>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-transform hover:scale-105">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center mb-4 sm:mb-5">
                  <CheckCircle2 size={24} className="sm:w-7 sm:h-7" />
                </div>
                <p className="text-zinc-300 text-xs sm:text-sm">Active Courses</p>
                <h2 className="text-3xl sm:text-4xl font-black mt-1 sm:mt-2">{activeCourses}</h2>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-transform hover:scale-105">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-yellow-500 text-white flex items-center justify-center mb-4 sm:mb-5">
                  <AlertCircle size={24} className="sm:w-7 sm:h-7" />
                </div>
                <p className="text-zinc-300 text-xs sm:text-sm">Pending</p>
                <h2 className="text-3xl sm:text-4xl font-black mt-1 sm:mt-2">{pendingCourses}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
        {/* FILTERS & SEARCH BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black">Explore Courses</h2>
            <p className="text-zinc-600 mt-1 sm:mt-2 text-sm sm:text-base">
              Find the best courses and start learning today
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 sm:h-14 pl-10 pr-8 rounded-xl sm:rounded-2xl border border-zinc-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black appearance-none text-sm sm:text-base"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 sm:h-14 pl-10 pr-8 rounded-xl sm:rounded-2xl border border-zinc-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
              >
                <option value="title">Sort by Title</option>
                <option value="price">Sort by Price (Low to High)</option>
                <option value="duration">Sort by Duration</option>
              </select>
              <SortAsc size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search courses..."
                onChange={(e) => debouncedSetSearch(e.target.value)}
                className="w-full h-12 sm:h-14 pl-11 pr-4 rounded-xl sm:rounded-2xl border border-zinc-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-center gap-4">
            <AlertTriangle className="text-red-500 w-8 h-8" />
            <div>
              <h3 className="font-bold text-red-800">Something went wrong</h3>
              <p className="text-red-600">{error}</p>
              <button onClick={fetchCourses} className="mt-2 text-sm underline">Try again</button>
            </div>
          </div>
        )}

        {/* LOADING SKELETON (Shimmer) */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-7">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl sm:rounded-[35px] p-5 sm:p-7 shadow-sm border border-zinc-200">
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 rounded-xl animate-pulse" />
                  <div className="w-20 h-8 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 rounded-full animate-pulse" />
                </div>
                <div className="h-6 sm:h-7 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 rounded mb-3 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 rounded mb-2 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 rounded mb-2 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 rounded w-2/3 mb-6 animate-pulse" />
                <div className="h-10 sm:h-12 bg-zinc-300 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* COURSE GRID */}
        {!loading && !error && (
          <>
            {paginatedCourses.length === 0 ? (
              <div className="bg-white rounded-2xl sm:rounded-[35px] p-8 sm:p-14 text-center border border-zinc-200 shadow-sm">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                  <BookOpen size={36} className="sm:w-10 sm:h-10 text-zinc-500" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-black">No Courses Found</h2>
                <p className="text-zinc-500 mt-3 sm:mt-4 text-base sm:text-lg">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-7">
                  {paginatedCourses.map((course, idx) => {
                    const enrollment = getEnrollment(course._id);
                    return (
                      <div
                        key={course._id}
                        className="group bg-white rounded-2xl sm:rounded-[35px] border border-zinc-200 p-5 sm:p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden animate-fadeIn"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        {/* TOP */}
                        <div className="flex items-start justify-between mb-5 sm:mb-6">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-black text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <GraduationCap size={28} className="sm:w-[30px] sm:h-[30px]" />
                          </div>
                          {enrollment && (
                            <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold capitalize ${
                              enrollment.status === "active" ? "bg-green-100 text-green-700" :
                              enrollment.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {enrollment.status}
                            </span>
                          )}
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-black text-black leading-tight line-clamp-2">{course.title}</h2>
                        <p className="text-zinc-600 mt-3 sm:mt-4 leading-relaxed flex-grow text-sm sm:text-base line-clamp-3">{course.description}</p>

                        <div className="mt-5 sm:mt-7 space-y-3 sm:space-y-4">
                          <div className="flex items-center gap-3 text-zinc-700">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-100 flex items-center justify-center">
                              <Clock3 size={18} className="sm:w-5 sm:h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] sm:text-xs text-zinc-500">Duration</p>
                              <h4 className="font-bold text-sm sm:text-base">{course.duration}</h4>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-zinc-700">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-100 flex items-center justify-center">
                              <Wallet size={18} className="sm:w-5 sm:h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] sm:text-xs text-zinc-500">Course Price</p>
                              <h4 className="font-bold text-sm sm:text-base">{course.price || "Free"}</h4>
                            </div>
                          </div>
                        </div>

                        {enrollment ? (
                          <button disabled className={`mt-6 sm:mt-8 w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold cursor-not-allowed text-sm sm:text-base ${
                            enrollment.status === "active" ? "bg-green-600 text-white" :
                            enrollment.status === "pending" ? "bg-yellow-500 text-white" :
                            "bg-red-500 text-white"
                          }`}>
                            {enrollment.status === "active" ? "Already Enrolled" :
                             enrollment.status === "pending" ? "Request Pending" : "Refund Requested"}
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedCourse(course)}
                            className="mt-6 sm:mt-8 w-full bg-black text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02] text-sm sm:text-base"
                          >
                            Enroll Now <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl border border-zinc-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl border border-zinc-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {selectedCourse && (
        <UserPayment
          course={selectedCourse}
          userId={userId}
          onClose={() => {
            setSelectedCourse(null);
            fetchEnrollments();
          }}
        />
      )}

      {/* Add keyframe animation for fadeIn */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
