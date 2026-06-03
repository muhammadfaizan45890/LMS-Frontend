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








import React, { useEffect, useMemo, useState } from "react"
import axios from "axios"
import UserPayment from "./UserPayment"
import API from "../../utils/api";

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
  ArrowRight
} from "lucide-react"

const UserDashboard = () => {

  // ================= STATES =================
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [search, setSearch] = useState("")
  const [enrolledCourses, setEnrolledCourses] = useState([])

  // ================= USER ID =================
  const userId = localStorage.getItem("userId")

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API}/admin/courses`)
      setCourses(res.data || [])
    } catch (error) {
      console.log("COURSE ERROR:", error)
    } finally {
      setLoading(false)
    }
  }

  // ================= FETCH ENROLLMENTS =================
  const fetchEnrollments = async () => {
    try {
      if (!userId) return
      const res = await axios.get(`${API}/enroll/my-courses/${userId}`)
      setEnrolledCourses(res.data || [])
    } catch (error) {
      console.log("ENROLLMENT ERROR:", error)
    }
  }

  useEffect(() => {
    fetchCourses()
    fetchEnrollments()
  }, [])

  // ================= SEARCH FILTER =================
  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title?.toLowerCase().includes(search.toLowerCase())
    )
  }, [courses, search])

  // ================= CHECK ENROLLMENT =================
  const getEnrollment = (courseId) => {
    return enrolledCourses.find((item) => item.courseId?._id === courseId)
  }

  // ================= STATS =================
  const activeCourses = enrolledCourses.filter(
    (item) => item.status === "active"
  ).length

  const pendingCourses = enrolledCourses.filter(
    (item) => item.status === "pending"
  ).length

  const totalCourses = courses.length

  return (
    <div className="min-h-screen bg-zinc-100 overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <div className="relative overflow-hidden bg-black text-white">
        {/* Glow effects - smaller on mobile */}
        <div className="absolute top-0 left-0 w-56 sm:w-96 h-56 sm:h-96 bg-white/10 blur-[80px] sm:blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-56 sm:w-96 h-56 sm:h-96 bg-white/10 blur-[80px] sm:blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-12 lg:py-16">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 sm:gap-10">
            {/* LEFT TEXT - smaller on mobile */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 border border-white/10 backdrop-blur-md rounded-full px-2.5 py-1 sm:px-5 sm:py-2 text-[10px] sm:text-sm font-semibold mb-3 sm:mb-6">
                <Sparkles size={12} className="sm:w-4 sm:h-4" />
                <span className="hidden xs:inline sm:inline">Modern LMS Platform</span>
                <span className="xs:hidden sm:hidden">LMS</span>
              </div>
              <h1 className="text-xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Learn New Skills
                <span className="block text-zinc-400 mt-0.5 sm:mt-2">
                  Anytime Anywhere
                </span>
              </h1>
              <p className="text-zinc-300 mt-2 sm:mt-6 text-xs sm:text-lg leading-relaxed max-w-2xl">
                Explore premium courses, watch secure lectures,
                track progress, and build your future with
                our powerful LMS learning platform.
              </p>
            </div>

            {/* STATS CARDS - 2 columns on mobile, 3 on larger */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-5 w-full xl:max-w-2xl">
              {/* Total */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-3xl p-2.5 sm:p-6">
                <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-white text-black flex items-center justify-center mb-1.5 sm:mb-5">
                  <Layers3 size={16} className="sm:w-7 sm:h-7" />
                </div>
                <p className="text-zinc-300 text-[9px] sm:text-sm">Total Courses</p>
                <h2 className="text-lg sm:text-4xl font-black mt-0.5 sm:mt-2">{totalCourses}</h2>
              </div>

              {/* Active */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-3xl p-2.5 sm:p-6">
                <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-green-500 text-white flex items-center justify-center mb-1.5 sm:mb-5">
                  <CheckCircle2 size={16} className="sm:w-7 sm:h-7" />
                </div>
                <p className="text-zinc-300 text-[9px] sm:text-sm">Active Courses</p>
                <h2 className="text-lg sm:text-4xl font-black mt-0.5 sm:mt-2">{activeCourses}</h2>
              </div>

              {/* Pending - spans full width on mobile? No, keep 2-col layout, it will wrap */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-3xl p-2.5 sm:p-6 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-yellow-500 text-white flex items-center justify-center mb-1.5 sm:mb-5">
                  <AlertCircle size={16} className="sm:w-7 sm:h-7" />
                </div>
                <p className="text-zinc-300 text-[9px] sm:text-sm">Pending</p>
                <h2 className="text-lg sm:text-4xl font-black mt-0.5 sm:mt-2">{pendingCourses}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10">
        {/* TOP BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-5 mb-6 sm:mb-10">
          <div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-black">
              Explore Courses
            </h2>
            <p className="text-zinc-600 text-xs sm:text-base mt-0.5 sm:mt-2">
              Find the best courses and start learning today
            </p>
          </div>

          {/* SEARCH - smaller on mobile */}
          <div className="relative w-full lg:w-[320px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full h-9 sm:h-14
                pl-8 sm:pl-12 pr-3 sm:pr-4
                rounded-xl sm:rounded-2xl
                border border-zinc-300
                bg-white shadow-sm
                focus:outline-none focus:ring-2 focus:ring-black
                transition-all text-xs sm:text-base
              "
            />
          </div>
        </div>

        {/* LOADING SKELETON - 2 columns on mobile */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-5">
            {[1,2,3,4,5,6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl sm:rounded-3xl p-2.5 sm:p-5 shadow-sm border border-zinc-200 animate-pulse"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div className="w-8 h-8 sm:w-14 sm:h-14 bg-zinc-200 rounded-lg sm:rounded-2xl" />
                  <div className="w-12 h-4 sm:w-20 sm:h-7 bg-zinc-200 rounded-full" />
                </div>
                <div className="h-4 sm:h-6 bg-zinc-200 rounded mb-1.5" />
                <div className="h-2.5 bg-zinc-200 rounded mb-1" />
                <div className="h-2.5 bg-zinc-200 rounded mb-1" />
                <div className="h-2.5 bg-zinc-200 rounded w-2/3 mb-3 sm:mb-6" />
                <div className="h-7 sm:h-10 bg-zinc-300 rounded-lg sm:rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-14 text-center border border-zinc-200 shadow-sm">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3 sm:mb-6">
              <BookOpen size={28} className="sm:w-10 sm:h-10 text-zinc-500" />
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-black">No Courses Found</h2>
            <p className="text-zinc-500 mt-2 sm:mt-4 text-sm sm:text-lg">
              Try another keyword to search courses
            </p>
          </div>
        ) : (
          /* COURSE GRID - 2 columns on mobile, 3 on tablet, 4 on desktop */
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-5 lg:gap-7">
            {filteredCourses.map((course) => {
              const enrollment = getEnrollment(course._id)
              return (
                <div
                  key={course._id}
                  className="
                    group bg-white rounded-xl sm:rounded-3xl
                    border border-zinc-200 p-2.5 sm:p-5
                    shadow-sm hover:shadow-xl
                    hover:-translate-y-0.5 sm:hover:-translate-y-2
                    transition-all duration-200 sm:duration-300
                    flex flex-col overflow-hidden
                  "
                >
                  {/* TOP ICON & BADGE */}
                  <div className="flex items-start justify-between mb-2 sm:mb-4">
                    <div className="
                      w-8 h-8 sm:w-14 sm:h-14
                      rounded-lg sm:rounded-2xl
                      bg-black text-white
                      flex items-center justify-center shadow-md
                    ">
                      <GraduationCap size={16} className="sm:w-7 sm:h-7" />
                    </div>
                    {enrollment && (
                      <span
                        className={`
                          px-1.5 py-0.5 sm:px-3 sm:py-1
                          rounded-full text-[8px] sm:text-xs
                          font-bold capitalize
                          ${
                            enrollment.status === "active"
                              ? "bg-green-100 text-green-700"
                              : enrollment.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {enrollment.status === "active"
                          ? "Active"
                          : enrollment.status === "pending"
                          ? "Pending"
                          : "Refund"}
                      </span>
                    )}
                  </div>

                  {/* TITLE */}
                  <h2 className="text-sm sm:text-xl md:text-2xl font-black text-black leading-tight line-clamp-2">
                    {course.title}
                  </h2>

                  {/* DESCRIPTION - hidden on mobile to save space, visible on sm+ */}
                  <p className="hidden sm:block text-zinc-600 mt-2 leading-relaxed text-xs sm:text-sm line-clamp-2">
                    {course.description}
                  </p>

                  {/* INFO ROWS */}
                  <div className="mt-2 sm:mt-5 space-y-1.5 sm:space-y-3">
                    <div className="flex items-center gap-1.5 sm:gap-3 text-zinc-700">
                      <div className="w-5 h-5 sm:w-9 sm:h-9 rounded-md bg-zinc-100 flex items-center justify-center">
                        <Clock3 size={10} className="sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-xs text-zinc-500">Duration</p>
                        <h4 className="font-bold text-[10px] sm:text-sm">{course.duration}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-3 text-zinc-700">
                      <div className="w-5 h-5 sm:w-9 sm:h-9 rounded-md bg-zinc-100 flex items-center justify-center">
                        <Wallet size={10} className="sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-xs text-zinc-500">Price</p>
                        <h4 className="font-bold text-[10px] sm:text-sm">{course.price || "Free"}</h4>
                      </div>
                    </div>
                  </div>

                  {/* BUTTON */}
                  {enrollment ? (
                    <button
                      disabled
                      className={`
                        mt-3 sm:mt-6 w-full py-1.5 sm:py-3
                        rounded-lg sm:rounded-2xl
                        font-bold cursor-not-allowed text-[10px] sm:text-sm
                        ${
                          enrollment.status === "active"
                            ? "bg-green-600 text-white"
                            : enrollment.status === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                        }
                      `}
                    >
                      {enrollment.status === "active"
                        ? "Enrolled"
                        : enrollment.status === "pending"
                        ? "Pending"
                        : "Refunded"}
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="
                        mt-3 sm:mt-6 w-full bg-black text-white
                        py-1.5 sm:py-3 rounded-lg sm:rounded-2xl
                        font-bold hover:bg-zinc-800
                        transition-all duration-200
                        flex items-center justify-center gap-1 sm:gap-2
                        text-[10px] sm:text-sm
                      "
                    >
                      Enroll Now
                      <ArrowRight size={10} className="sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ================= PAYMENT MODAL ================= */}
      {selectedCourse && (
        <UserPayment
          course={selectedCourse}
          userId={userId}
          onClose={() => {
            setSelectedCourse(null)
            fetchEnrollments()
          }}
        />
      )}
    </div>
  )
}

export default UserDashboard
