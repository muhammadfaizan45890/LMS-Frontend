// import React, { useEffect, useState } from "react"
// import { NavLink, useNavigate } from "react-router-dom"

// import {
//   LayoutDashboard,
//   User,
//   BookOpen,
//   Heart,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   GraduationCap,
//   BookKeyIcon,
//   DollarSignIcon,
//   BookCheck,
//   Book
// } from "lucide-react"

// const UserSidebar = () => {
//   const navigate = useNavigate()

//   const NAVBAR_HEIGHT = 64

//   // ================= STATES =================
//   const [collapsed, setCollapsed] = useState(false)
//   const [, setIsMobile] = useState(false)

//   // ================= RESPONSIVE =================
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 1024

//       setIsMobile(mobile)

//       // MOBILE = COLLAPSED
//       // DESKTOP = EXPANDED
//       if (mobile) {
//         setCollapsed(true)
//       } else {
//         setCollapsed(false)
//       }
//     }

//     handleResize()

//     window.addEventListener("resize", handleResize)

//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   // ================= MENU =================
//   const menuItems = [
//     {
//       title: "Dashboard",
//       icon: <LayoutDashboard size={20} />,
//       path: "/user/dashboard"
//     },
//     {
//       title: "Profile",
//       icon: <User size={20} />,
//       path: "/user/profile"
//     },
//     {
//       title: "Active Courses",
//       icon: <BookOpen size={20} />,
//       path: "/user/active-courses"
//     },
//     {
//       title: "Notes",
//       icon: <Book size={20} />,
//       path: "/user/notes"
//     },
//     {
//       title: "Apply for Refund",
//       icon: <DollarSignIcon size={20} />,
//       path: "/user/apply-refund"
//     },
//     {
//       title: "Certificate",
//       icon: <BookCheck size={20} />,
//       path: "/user/certificate"
//     },
//     {
//       title: "LMS Guide",
//       icon: <BookKeyIcon size={20} />,
//       path: "/user/guide"
//     },


//   ]

//   // ================= LOGOUT =================
//   const logoutHandler = () => {
//     // CLEAR ALL AUTH DATA
//     localStorage.removeItem("token")
//     localStorage.removeItem("userId")
//     localStorage.removeItem("role")
//     localStorage.clear()

//     // REDIRECT TO LOGIN
//     navigate("/login", { replace: true })

//     // OPTIONAL FULL REFRESH
//     window.location.reload()
//   }

//   return (
//     <>
//       {/* ================= SIDEBAR ================= */}
//       <aside
//         style={{
//           top: NAVBAR_HEIGHT,
//           height: `calc(100vh - ${NAVBAR_HEIGHT}px)`
//         }}
//         className={`
//           fixed left-0 z-[100]
//           bg-white text-black
//           border-r border-zinc-300
//           flex flex-col
//           transition-all duration-300 ease-in-out
//           shadow-sm

//           ${collapsed ? "w-[80px]" : "w-[280px]"}
//         `}
//       >
//         {/* ================= HEADER ================= */}
//         <div
//           className={`
//             flex items-center
//             px-4 py-5
//             border-b border-zinc-300

//             ${
//               collapsed
//                 ? "justify-center"
//                 : "justify-between"
//             }
//           `}
//         >
//           {/* LEFT */}
//           <div className="flex items-center gap-3">
//             <div className="bg-black text-white p-2 rounded-xl">
//   <GraduationCap size={20} />
// </div>

//             {!collapsed && (
//               <div>
//                 <h1 className="font-bold text-sm">
//                   Student Panel
//                 </h1>

//                 <p className="text-xs text-zinc-500">
//                   LMS Dashboard
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* TOGGLE */}
//           {!collapsed && (
//             <button
//               onClick={() => setCollapsed(true)}
//               className="text-zinc-500 hover:text-black"
//             >
//               <ChevronLeft size={18} />
//             </button>
//           )}

//           {collapsed && (
//             <button
//               onClick={() => setCollapsed(false)}
//               className="
//                 absolute -right-3 top-6
//                 bg-black text-white
//                 rounded-full p-1
//                 shadow-md
//               "
//             >
//               <ChevronRight size={16} />
//             </button>
//           )}
//         </div>

//         {/* ================= MENU ================= */}
//         <div className="flex-1 px-3 py-4 space-y-2">
//           {menuItems.map((item, index) => (
//             <NavLink
//               key={index}
//               to={item.path}
//               className={({ isActive }) => `
//                 flex items-center
//                 ${
//                   collapsed
//                     ? "justify-center"
//                     : "justify-start"
//                 }
//                 gap-3
//                 px-4 py-3
//                 rounded-2xl
//                 transition-all duration-200

//                 ${
//                   isActive
//                     ? "bg-black text-white"
//                     : "text-zinc-700 hover:bg-zinc-100 hover:text-black"
//                 }
//               `}
//             >
//               {item.icon}

//               {!collapsed && (
//                 <span className="text-sm font-medium">
//                   {item.title}
//                 </span>
//               )}
//             </NavLink>
//           ))}
//         </div>

//         {/* ================= FOOTER ================= */}
//         <div className="border-t border-zinc-300 p-3">
//           <button
//             onClick={logoutHandler}
//             className={`
//               w-full flex items-center
//               ${
//                 collapsed
//                   ? "justify-center"
//                   : "justify-start"
//               }
//               gap-3
//               px-4 py-3
//               rounded-2xl
//               text-red-600
//               hover:bg-red-50
//               transition-all duration-200
//             `}
//           >
//             <LogOut size={20} />

//             {!collapsed && (
//               <span className="text-sm font-medium">
//                 Logout
//               </span>
//             )}
//           </button>
//         </div>
//       </aside>

//       {/* ================= CONTENT SPACER ================= */}
//       <div
//         className={`
//           transition-all duration-300
//           ${collapsed ? "w-[80px]" : "w-[280px]"}
//         `}
//       />
//     </>
//   )
// }

// export default UserSidebar





import React, { useEffect, useState } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"

import {
  LayoutDashboard,
  User,
  BookOpen,
  Heart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BookKeyIcon,
  DollarSignIcon,
  BookCheck,
  Book,
  Sparkles,
  TrendingUp,
  Clock,
  Award,
  Menu,
  X,
  Bell,
  HelpCircle,
  Star,
  Zap,
  Shield
} from "lucide-react"

import { motion, AnimatePresence } from "framer-motion"

const UserSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const NAVBAR_HEIGHT = 64

  // ================= STATES =================
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [userStats, setUserStats] = useState({
    coursesCompleted: 3,
    totalCourses: 8,
    certificates: 2,
    learningHours: 45
  })

  // ================= RESPONSIVE =================
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)

      if (mobile) {
        setCollapsed(true)
        setIsMobileOpen(false)
      } else {
        setCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // ================= CLOSE MOBILE MENU ON ROUTE CHANGE =================
  useEffect(() => {
    if (isMobile) {
      setIsMobileOpen(false)
    }
  }, [location.pathname, isMobile])

  // ================= MENU ITEMS =================
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/user/dashboard",
      badge: null,
      iconBg: "from-blue-500 to-cyan-500"
    },
    {
      title: "Profile",
      icon: <User size={20} />,
      path: "/user/profile",
      badge: null,
      iconBg: "from-purple-500 to-pink-500"
    },
    {
      title: "Active Courses",
      icon: <BookOpen size={20} />,
      path: "/user/active-courses",
      badge: "5",
      badgeColor: "bg-green-500",
      iconBg: "from-green-500 to-emerald-500"
    },
    {
      title: "Notes",
      icon: <Book size={20} />,
      path: "/user/notes",
      badge: null,
      iconBg: "from-orange-500 to-red-500"
    },
    {
      title: "Apply for Refund",
      icon: <DollarSignIcon size={20} />,
      path: "/user/apply-refund",
      badge: null,
      iconBg: "from-yellow-500 to-amber-500"
    },
    {
      title: "Certificate",
      icon: <BookCheck size={20} />,
      path: "/user/certificate",
      badge: userStats.certificates,
      badgeColor: "bg-purple-500",
      iconBg: "from-indigo-500 to-purple-500"
    },
    {
      title: "LMS Guide",
      icon: <BookKeyIcon size={20} />,
      path: "/user/guide",
      badge: null,
      iconBg: "from-cyan-500 to-blue-500"
    },
  ]

  // ================= LOGOUT =================
  const logoutHandler = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("role")
    localStorage.clear()
    navigate("/login", { replace: true })
    window.location.reload()
  }

  // ================= SIDEBAR VARIANTS =================
  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  }

  const mobileOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const mobileSidebarVariants = {
    hidden: { x: -300 },
    visible: { x: 0 }
  }

  return (
    <>
      {/* ================= MOBILE MENU BUTTON ================= */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-20 left-4 z-[150] bg-black text-white p-2 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* ================= MOBILE OVERLAY ================= */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileOverlayVariants}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-[120] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ================= SIDEBAR ================= */}
      <motion.aside
        initial={false}
        animate={isMobile && isMobileOpen ? "visible" : (isMobile ? "collapsed" : (collapsed ? "collapsed" : "expanded"))}
        variants={isMobile ? mobileSidebarVariants : sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          top: NAVBAR_HEIGHT,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`
        }}
        className={`
          fixed left-0 z-[130]
          bg-gradient-to-br from-white via-white to-zinc-50
          text-black
          border-r border-zinc-200
          flex flex-col
          shadow-2xl
          overflow-hidden

          ${isMobile ? 'w-[280px]' : ''}
          ${!isMobile && collapsed ? 'w-[80px]' : ''}
          ${!isMobile && !collapsed ? 'w-[280px]' : ''}
        `}
      >
        {/* ================= HEADER SECTION ================= */}
        <div
          className={`
            relative flex items-center
            px-4 py-6
            border-b border-zinc-200
            bg-gradient-to-r from-zinc-50 to-white

            ${collapsed && !isMobile ? "justify-center" : "justify-between"}
          `}
        >
          {/* LEFT - LOGO */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-800 rounded-xl blur-md opacity-30" />
              <div className="relative bg-gradient-to-br from-black to-zinc-800 text-white p-2.5 rounded-xl shadow-lg">
                <GraduationCap size={22} />
              </div>
            </motion.div>

            {(!collapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-black text-black text-base leading-tight">
                  Student
                </h1>
                <p className="text-[10px] text-zinc-500 font-medium tracking-wide">
                  Learning Portal
                </p>
              </motion.div>
            )}
          </div>

          {/* TOGGLE BUTTON - DESKTOP ONLY */}
          {!isMobile && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCollapsed(!collapsed)}
              className={`
                text-zinc-500 hover:text-black transition-all duration-300
                ${collapsed ? "absolute -right-3 top-8 bg-black text-white rounded-full p-1 shadow-md" : ""}
              `}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={18} />}
            </motion.button>
          )}
        </div>

        {/* ================= USER PROGRESS SECTION ================= */}
        {(!collapsed || isMobile) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-6 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-blue-600">Learning Progress</span>
              <Sparkles size={14} className="text-blue-500" />
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-zinc-600">Overall Completion</span>
              <span className="text-xs font-bold text-blue-600">65%</span>
            </div>
            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-lg font-bold text-black">{userStats.coursesCompleted}</div>
                <div className="text-[10px] text-zinc-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-black">{userStats.learningHours}</div>
                <div className="text-[10px] text-zinc-500">Hours</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= MENU ITEMS ================= */}
        <div className="flex-1 px-3 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              className={({ isActive }) => `
                relative group flex items-center
                ${collapsed && !isMobile ? "justify-center" : "justify-start"}
                gap-3
                px-4 py-3
                rounded-2xl
                transition-all duration-300
                overflow-hidden

                ${isActive
                  ? "bg-gradient-to-r from-black to-zinc-800 text-white shadow-lg"
                  : "text-zinc-700 hover:bg-zinc-100 hover:text-black"
                }
              `}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: hoveredItem === index ? "0%" : "-100%" }}
                transition={{ duration: 0.3 }}
              />

              {/* Icon Container */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`
                  relative flex items-center justify-center
                  transition-all duration-300
                  ${collapsed && !isMobile ? 'w-full' : ''}
                `}
              >
                <div className={`
                  ${!collapsed || isMobile ? '' : ''}
                `}>
                  {item.icon}
                </div>
              </motion.div>

              {/* Label */}
              {(!collapsed || isMobile) && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-medium flex-1"
                >
                  {item.title}
                </motion.span>
              )}

              {/* Badge */}
              {item.badge && (!collapsed || isMobile) && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`
                    text-xs font-bold px-2 py-0.5 rounded-full
                    ${item.badgeColor || "bg-red-500"} text-white
                  `}
                >
                  {item.badge}
                </motion.span>
              )}

              {/* Tooltip for collapsed mode */}
              {collapsed && !isMobile && hoveredItem === index && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-2 px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 shadow-lg"
                >
                  {item.title}
                  {item.badge && ` (${item.badge})`}
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="border-t border-zinc-200 p-3 space-y-2 bg-gradient-to-b from-transparent to-zinc-50">
          {/* Help Button */}
          <NavLink
            to="/user/help"
            className={({ isActive }) => `
              flex items-center
              ${collapsed && !isMobile ? "justify-center" : "justify-start"}
              gap-3
              px-4 py-3
              rounded-2xl
              transition-all duration-300
              ${isActive
                ? "bg-gradient-to-r from-black to-zinc-800 text-white"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-black"
              }
            `}
          >
            <HelpCircle size={20} />
            {(!collapsed || isMobile) && (
              <span className="text-sm font-medium">Help Center</span>
            )}
          </NavLink>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={logoutHandler}
            className={`
              w-full flex items-center
              ${collapsed && !isMobile ? "justify-center" : "justify-start"}
              gap-3
              px-4 py-3
              rounded-2xl
              text-red-600
              hover:bg-red-50
              transition-all duration-300
              group
            `}
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform duration-300" />
            {(!collapsed || isMobile) && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </motion.button>
        </div>
      </motion.aside>

      {/* ================= CONTENT SPACER ================= */}
      {!isMobile && (
        <div
          className={`
            transition-all duration-300
            ${collapsed ? "w-[80px]" : "w-[280px]"}
          `}
        />
      )}

      {/* ================= CUSTOM SCROLLBAR STYLES ================= */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  )
}

export default UserSidebar
