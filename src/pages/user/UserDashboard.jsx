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
  XCircle,
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

      const res = await axios.get(
        `${API}/admin/courses`
      )

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

      const res = await axios.get(
        `${API}/enroll/my-courses/${userId}`
      )

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
    return enrolledCourses.find(
      (item) => item.courseId?._id === courseId
    )
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
    <div className="bg-zinc-100">

      {/* ================= HERO SECTION ================= */}
      <div className="relative overflow-hidden bg-black text-white">

        {/* GLOW */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

            {/* LEFT */}
            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-semibold mb-6">
                <Sparkles size={16} />
                Modern LMS Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Learn New Skills
                <span className="block text-zinc-400 mt-2">
                  Anytime Anywhere
                </span>
              </h1>

              <p className="text-zinc-300 mt-6 text-lg leading-relaxed max-w-2xl">
                Explore premium courses, watch secure lectures,
                track progress, and build your future with
                our powerful LMS learning platform.
              </p>

            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:max-w-2xl">

              {/* TOTAL */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center mb-5">
                  <Layers3 size={28} />
                </div>

                <p className="text-zinc-300 text-sm">
                  Total Courses
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {totalCourses}
                </h2>

              </div>

              {/* ACTIVE */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center mb-5">
                  <CheckCircle2 size={28} />
                </div>

                <p className="text-zinc-300 text-sm">
                  Active Courses
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {activeCourses}
                </h2>

              </div>

              {/* PENDING */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-white flex items-center justify-center mb-5">
                  <AlertCircle size={28} />
                </div>

                <p className="text-zinc-300 text-sm">
                  Pending
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {pendingCourses}
                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* ================= TOP BAR ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-black">
              Explore Courses
            </h2>

            <p className="text-zinc-600 mt-2">
              Find the best courses and start learning today
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full lg:w-[380px]">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-14
                pl-12 pr-4
                rounded-2xl
                border border-zinc-300
                bg-white
                shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-black
                transition-all
              "
            />

          </div>

        </div>

        {/* ================= LOADING ================= */}
        {loading ? (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

            {[1,2,3,4,5,6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-[30px] p-6 shadow-sm border border-zinc-200 animate-pulse"
              >

                <div className="flex items-center justify-between mb-6">

                  <div className="w-16 h-16 bg-zinc-200 rounded-2xl" />

                  <div className="w-20 h-8 bg-zinc-200 rounded-full" />

                </div>

                <div className="h-7 bg-zinc-200 rounded mb-4" />
                <div className="h-4 bg-zinc-200 rounded mb-2" />
                <div className="h-4 bg-zinc-200 rounded mb-2" />
                <div className="h-4 bg-zinc-200 rounded w-2/3 mb-8" />

                <div className="h-12 bg-zinc-300 rounded-2xl" />

              </div>
            ))}

          </div>

        ) : filteredCourses.length === 0 ? (

          <div className="bg-white rounded-[35px] p-14 text-center border border-zinc-200 shadow-sm">

            <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-6">
              <BookOpen size={40} className="text-zinc-500" />
            </div>

            <h2 className="text-3xl font-black text-black">
              No Courses Found
            </h2>

            <p className="text-zinc-500 mt-4 text-lg">
              Try another keyword to search courses
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

            {filteredCourses.map((course) => {

              const enrollment = getEnrollment(course._id)

              return (
                <div
                  key={course._id}
                  className="
                    group
                    bg-white
                    rounded-[35px]
                    border border-zinc-200
                    p-7
                    shadow-sm
                    hover:shadow-2xl
                    hover:-translate-y-2
                    transition-all duration-500
                    flex flex-col
                    overflow-hidden
                    relative
                  "
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between mb-6">

                    <div className="
                      w-16 h-16
                      rounded-2xl
                      bg-black
                      text-white
                      flex items-center justify-center
                      shadow-lg
                    ">
                      <GraduationCap size={30} />
                    </div>

                    {enrollment && (
                      <span
                        className={`
                          px-4 py-2
                          rounded-full
                          text-xs
                          font-bold
                          capitalize
                          ${
                            enrollment.status === "active"
                              ? "bg-green-100 text-green-700"
                              : enrollment.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {enrollment.status}
                      </span>
                    )}

                  </div>

                  {/* TITLE */}
                  <h2 className="text-3xl font-black text-black leading-tight">
                    {course.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-zinc-600 mt-4 leading-relaxed flex-grow">
                    {course.description}
                  </p>

                  {/* INFO */}
                  <div className="mt-7 space-y-4">

                    <div className="flex items-center gap-3 text-zinc-700">

                      <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center">
                        <Clock3 size={20} />
                      </div>

                      <div>
                        <p className="text-xs text-zinc-500">
                          Duration
                        </p>

                        <h4 className="font-bold">
                          {course.duration}
                        </h4>
                      </div>

                    </div>

                    <div className="flex items-center gap-3 text-zinc-700">

                      <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center">
                        <Wallet size={20} />
                      </div>

                      <div>
                        <p className="text-xs text-zinc-500">
                          Course Price
                        </p>

                        <h4 className="font-bold">
                          {course.price || "Free"}
                        </h4>
                      </div>

                    </div>

                  </div>

                  {/* BUTTON */}
                  {enrollment ? (

                    <button
                      disabled
                      className={`
                        mt-8
                        w-full
                        py-4
                        rounded-2xl
                        font-bold
                        cursor-not-allowed
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
                        ? "Already Enrolled"
                        : enrollment.status === "pending"
                        ? "Request Pending"
                        : "Refund Requested"}
                    </button>

                  ) : (

                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="
                        mt-8
                        w-full
                        bg-black
                        text-white
                        py-4
                        rounded-2xl
                        font-bold
                        hover:bg-zinc-800
                        transition-all duration-300
                        flex items-center justify-center gap-2
                        group-hover:scale-[1.02]
                      "
                    >
                      Enroll Now
                      <ArrowRight size={18} />
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
//   ArrowRight,
//   Trophy,
//   TrendingUp,
//   Zap,
//   Users,
//   Star,
//   Shield,
//   PlayCircle,
//   Award,
//   CalendarDays,
//   DollarSign
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
//       const res = await axios.get(`${API}/admin/courses`)
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
//       const res = await axios.get(`${API}/enroll/my-courses/${userId}`)
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

//   // ================= GET STATUS STYLES =================
//   const getStatusStyles = (status) => {
//     switch(status) {
//       case "active":
//         return { bg: "bg-green-500", lightBg: "bg-green-100", text: "text-green-700", icon: <CheckCircle2 size={14} />, label: "Active" }
//       case "pending":
//         return { bg: "bg-yellow-500", lightBg: "bg-yellow-100", text: "text-yellow-700", icon: <AlertCircle size={14} />, label: "Pending" }
//       default:
//         return { bg: "bg-red-500", lightBg: "bg-red-100", text: "text-red-700", icon: <XCircle size={14} />, label: "Refunded" }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
//       {/* ================= HERO SECTION ================= */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black text-white">
//         {/* Background Effects */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-[120px]" />
//           <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-[120px]" />
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
//           <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
//             {/* LEFT CONTENT */}
//             <div className="max-w-3xl">
//               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-sm font-semibold mb-6">
//                 <Sparkles size={16} />
//                 Modern AI-Powered LMS Platform
//               </div>

//               <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
//                 Learn New Skills
//                 <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
//                   Anytime Anywhere
//                 </span>
//               </h1>

//               <p className="text-zinc-300 mt-6 text-base sm:text-lg leading-relaxed max-w-2xl">
//                 Explore premium courses, watch secure lectures,
//                 track progress, and build your future with
//                 our powerful LMS learning platform.
//               </p>

//               {/* Quick Actions */}
//               <div className="flex flex-wrap gap-3 mt-8">
//                 <button className="px-6 py-2.5 bg-white/10 backdrop-blur-md rounded-xl text-sm font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
//                   Browse All Courses
//                 </button>
//                 <button className="px-6 py-2.5 bg-white/10 backdrop-blur-md rounded-xl text-sm font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
//                   View Certificates
//                 </button>
//               </div>
//             </div>

//             {/* RIGHT STATS CARDS */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:max-w-2xl">
//               {/* Total Courses */}
//               <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all duration-300">
//                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center mb-5 shadow-lg">
//                   <Layers3 size={28} />
//                 </div>
//                 <p className="text-zinc-300 text-sm font-medium">Total Courses</p>
//                 <h2 className="text-4xl font-black mt-2">{totalCourses}</h2>
//                 <p className="text-xs text-zinc-400 mt-2">Available for enrollment</p>
//               </div>

//               {/* Active Courses */}
//               <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all duration-300">
//                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white flex items-center justify-center mb-5 shadow-lg">
//                   <CheckCircle2 size={28} />
//                 </div>
//                 <p className="text-zinc-300 text-sm font-medium">Active Courses</p>
//                 <h2 className="text-4xl font-black mt-2">{activeCourses}</h2>
//                 <p className="text-xs text-green-400 mt-2">Currently learning</p>
//               </div>

//               {/* Pending Requests */}
//               <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all duration-300">
//                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white flex items-center justify-center mb-5 shadow-lg">
//                   <AlertCircle size={28} />
//                 </div>
//                 <p className="text-zinc-300 text-sm font-medium">Pending Requests</p>
//                 <h2 className="text-4xl font-black mt-2">{pendingCourses}</h2>
//                 <p className="text-xs text-yellow-400 mt-2">Awaiting approval</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Wave Decoration */}
//         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//       </div>

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-12">
//         {/* ================= TOP BAR ================= */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
//           <div>
//             <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-black to-zinc-600 bg-clip-text text-transparent">
//               Explore Courses
//             </h2>
//             <p className="text-zinc-600 mt-2 flex items-center gap-2">
//               <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
//               Find the best courses and start learning today
//             </p>
//           </div>

//           {/* SEARCH BAR */}
//           <div className="relative w-full lg:w-[400px]">
//             <Search
//               size={20}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
//             />
//             <input
//               type="text"
//               placeholder="Search courses by title..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="
//                 w-full
//                 h-14
//                 pl-12 pr-4
//                 rounded-2xl
//                 border border-zinc-200
//                 bg-white
//                 shadow-sm
//                 focus:outline-none
//                 focus:ring-2
//                 focus:ring-black
//                 focus:border-transparent
//                 transition-all
//                 duration-300
//               "
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
//               >
//                 <XCircle size={18} />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ================= LOADING STATE ================= */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
//             {[1, 2, 3, 4, 5, 6].map((item) => (
//               <div
//                 key={item}
//                 className="bg-white rounded-3xl shadow-lg border border-zinc-200 overflow-hidden"
//               >
//                 <div className="h-48 bg-gradient-to-r from-zinc-200 to-zinc-100 animate-pulse" />
//                 <div className="p-6 space-y-4">
//                   <div className="h-7 bg-zinc-200 rounded-lg w-3/4 animate-pulse" />
//                   <div className="h-4 bg-zinc-100 rounded w-full animate-pulse" />
//                   <div className="h-4 bg-zinc-100 rounded w-5/6 animate-pulse" />
//                   <div className="flex gap-3 pt-4">
//                     <div className="h-10 bg-zinc-200 rounded-xl w-1/2 animate-pulse" />
//                     <div className="h-10 bg-zinc-200 rounded-xl w-1/2 animate-pulse" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : filteredCourses.length === 0 ? (
//           // ================= EMPTY STATE =================
//           <div className="bg-white rounded-3xl p-12 lg:p-20 text-center border border-zinc-200 shadow-lg">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center mx-auto mb-6">
//               <BookOpen size={40} className="text-zinc-500" />
//             </div>
//             <h2 className="text-2xl lg:text-3xl font-black text-black">
//               No Courses Found
//             </h2>
//             <p className="text-zinc-500 mt-3 max-w-md mx-auto">
//               We couldn't find any courses matching "{search}". Try a different keyword or browse all courses.
//             </p>
//             <button
//               onClick={() => setSearch("")}
//               className="mt-6 px-6 py-2.5 bg-black text-white rounded-xl font-semibold hover:bg-zinc-800 transition-all duration-300"
//             >
//               Clear Search
//             </button>
//           </div>
//         ) : (
//           // ================= COURSES GRID =================
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
//             {filteredCourses.map((course, index) => {
//               const enrollment = getEnrollment(course._id)
//               const status = enrollment?.status
//               const statusStyle = getStatusStyles(status)

//               return (
//                 <div
//                   key={course._id}
//                   className="
//                     group
//                     bg-white
//                     rounded-3xl
//                     border border-zinc-200
//                     shadow-lg
//                     hover:shadow-2xl
//                     hover:-translate-y-1
//                     transition-all
//                     duration-300
//                     flex flex-col
//                     overflow-hidden
//                     relative
//                   "
//                 >
//                   {/* Top Gradient Bar */}
//                   <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black to-zinc-600" />

//                   {/* Header Section */}
//                   <div className="p-6 pb-4 border-b border-zinc-100">
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
//                         <GraduationCap size={28} />
//                       </div>

//                       {enrollment && (
//                         <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyle.lightBg} ${statusStyle.text}`}>
//                           {statusStyle.icon}
//                           <span>{statusStyle.label}</span>
//                         </div>
//                       )}
//                     </div>

//                     <h2 className="text-xl font-black text-black leading-tight line-clamp-2">
//                       {course.title}
//                     </h2>

//                     <p className="text-zinc-500 mt-2 text-sm leading-relaxed line-clamp-2">
//                       {course.description}
//                     </p>
//                   </div>

//                   {/* Course Details */}
//                   <div className="p-6 space-y-4 flex-grow">
//                     <div className="grid grid-cols-2 gap-3">
//                       <div className="bg-zinc-50 rounded-xl p-3">
//                         <Clock3 size={14} className="text-zinc-400 mb-1" />
//                         <p className="text-xs text-zinc-500">Duration</p>
//                         <p className="text-sm font-bold text-black truncate">{course.duration || "Self-paced"}</p>
//                       </div>
//                       <div className="bg-zinc-50 rounded-xl p-3">
//                         <Wallet size={14} className="text-zinc-400 mb-1" />
//                         <p className="text-xs text-zinc-500">Price</p>
//                         <p className="text-sm font-bold text-black">
//                           {course.price === "0" || !course.price ? "Free" : `$${course.price}`}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Additional Info */}
//                     {course.modules && (
//                       <div className="flex items-center gap-2 text-xs text-zinc-400 pt-2">
//                         <Layers3 size={12} />
//                         <span>{course.modules.length} modules</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Action Button */}
//                   <div className="p-6 pt-0">
//                     {enrollment ? (
//                       <button
//                         disabled
//                         className={`
//                           w-full
//                           py-3.5
//                           rounded-xl
//                           font-bold
//                           cursor-not-allowed
//                           transition-all
//                           duration-300
//                           flex items-center justify-center gap-2
//                           ${status === "active"
//                             ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
//                             : status === "pending"
//                             ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
//                             : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
//                           }
//                         `}
//                       >
//                         {status === "active" ? (
//                           <>
//                             <PlayCircle size={16} />
//                             Continue Learning
//                           </>
//                         ) : status === "pending" ? (
//                           <>
//                             <AlertCircle size={16} />
//                             Request Pending
//                           </>
//                         ) : (
//                           <>
//                             <XCircle size={16} />
//                             Refund Requested
//                           </>
//                         )}
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => setSelectedCourse(course)}
//                         className="
//                           w-full
//                           bg-gradient-to-r
//                           from-black
//                           to-zinc-800
//                           text-white
//                           py-3.5
//                           rounded-xl
//                           font-bold
//                           hover:from-zinc-800
//                           hover:to-black
//                           transition-all
//                           duration-300
//                           flex items-center justify-center gap-2
//                           group
//                         "
//                       >
//                         Enroll Now
//                         <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         )}

//         {/* ================= RECOMMENDATION SECTION ================= */}
//         {!loading && filteredCourses.length > 0 && (
//           <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border border-blue-100">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
//                   <Zap size={24} className="text-white" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-blue-600">Learning Tip</p>
//                   <p className="text-zinc-700">Complete your enrolled courses to earn certificates and unlock advanced content!</p>
//                 </div>
//               </div>
//               <button className="px-5 py-2 bg-white rounded-xl text-black font-semibold hover:shadow-lg transition-all duration-300 border border-zinc-200 whitespace-nowrap">
//                 View My Progress
//               </button>
//             </div>
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
