// import React, { useEffect, useState } from 'react'
// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

// import {
//   BookA,
//   LogOut,
//   User,
//   Menu,
//   X,
//   LayoutDashboard,
//   GraduationCap,
//   Home
// } from 'lucide-react'

// import API from "../utils/api"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { getData } from '@/context/userContext'

// import axios from 'axios'
// import { toast } from 'sonner'

// const Navbar = () => {

//   const { user, setUser } = getData()

//   const navigate = useNavigate()
//   const location = useLocation()

//   const accessToken = localStorage.getItem("accessToken")

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)

//   // ================= CHECK CURRENT PANEL =================
//   const isAdminPanel = location.pathname.startsWith("/admin")
//   const isUserPanel = location.pathname.startsWith("/user")

//   // ================= SCROLL EFFECT =================
//   useEffect(() => {

//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }

//     window.addEventListener("scroll", handleScroll)

//     return () => window.removeEventListener("scroll", handleScroll)

//   }, [])

//   // ================= CLOSE MOBILE MENU ON ROUTE CHANGE =================
//   useEffect(() => {
//     setIsMobileMenuOpen(false)
//   }, [location.pathname])

//   // ================= LOGOUT =================
//   const logoutHandler = async () => {

//     try {

//       const res = await axios.post(
//         `${API}/user/logout`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )

//       if (res.data.success) {

//         setUser(null)

//         localStorage.clear()

//         toast.success(res.data.message || "Logged out successfully!")

//         navigate("/login")
//       }

//     } catch {
//       toast.error("Logout failed!")
//     }
//   }

//   // ================= DASHBOARD ROUTE =================
//   const dashboardRoute =
//     user?.role === "admin"
//       ? "/admin/dashboard"
//       : "/user/dashboard"

//   // ================= PROFILE ROUTE =================
//   const profileRoute =
//     user?.role === "admin"
//       ? "/admin/profile"
//       : "/user/profile"

//   return (
//     <nav
//       className={`
//         fixed top-0 left-0 w-full z-[500]
//         transition-all duration-300

//         ${
//           isScrolled
//             ? "bg-white/95 backdrop-blur-md shadow-sm border-b"
//             : "bg-white border-b"
//         }
//       `}
//     >

//       {/* ================= CONTAINER ================= */}
//       <div
//         className="
//           h-14
//           px-4 sm:px-6 lg:px-8
//           flex items-center justify-between
//         "
//       >

//         {/* ================= LEFT ================= */}
//         <div className="flex items-center gap-3">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className="flex items-center gap-2 group"
//           >

//             <div
//               className="
//                 bg-black text-white
//                 p-2 rounded-xl
//                 group-hover:scale-105
//                 transition
//               "
//             >
//               <GraduationCap size={18} />
//             </div>

//             <div className="hidden sm:block">
//               <h1 className="font-bold text-black text-lg leading-none">
//                 Learning
//               </h1>

//               <p className="text-[10px] text-zinc-500">
//                 Management System
//               </p>
//             </div>
//           </Link>

//           {/* PANEL BADGE */}
//           {(isAdminPanel || isUserPanel) && (
//             <div
//               className={`
//                 hidden md:flex
//                 items-center gap-2
//                 px-3 py-1 rounded-full
//                 text-xs font-medium

//                 ${
//                   isAdminPanel
//                     ? "bg-red-100 text-red-700"
//                     : "bg-blue-100 text-blue-700"
//                 }
//               `}
//             >

//               <LayoutDashboard size={14} />

//               {isAdminPanel
//                 ? "Admin Panel"
//                 : "User Panel"}
//             </div>
//           )}
//         </div>

//         {/* ================= DESKTOP MENU ================= */}
//         <div className="hidden md:flex items-center gap-5">

//           {/* HOME */}
//           <button
//             onClick={() => navigate("/")}
//             className="
//               flex items-center gap-2
//               text-zinc-700 hover:text-black
//               transition font-medium
//             "
//           >
//             <Home size={18} />
//             Home
//           </button>

//           {user ? (

//             <DropdownMenu>

//               {/* AVATAR */}
//               <DropdownMenuTrigger>

//                 <Avatar
//                   className="
//                     cursor-pointer
//                     ring-2 ring-zinc-200
//                     hover:ring-black
//                     transition-all duration-300
//                   "
//                 >

//                   <AvatarImage src={user?.avatar} />

//                   <AvatarFallback className="bg-black text-white">
//                     {user?.username?.slice(0, 2).toUpperCase()}
//                   </AvatarFallback>

//                 </Avatar>

//               </DropdownMenuTrigger>

//               {/* DROPDOWN */}
//               <DropdownMenuContent
//                 align="end"
//                 className="
//                   w-60 rounded-2xl
//                   border bg-white shadow-xl
//                   p-2
//                   mt-3
//                 "
//               >

//                 <DropdownMenuLabel className="pb-3">

//                   <div className="flex items-center gap-3">

//                     <Avatar className="h-10 w-10">

//                       <AvatarImage src={user?.avatar} />

//                       <AvatarFallback className="bg-black text-white">
//                         {user?.username?.slice(0, 2).toUpperCase()}
//                       </AvatarFallback>

//                     </Avatar>

//                     <div>
//                       <h1 className="font-semibold text-black">
//                         {user?.username}
//                       </h1>

//                       <p className="text-xs text-zinc-500 capitalize">
//                         {user?.role}
//                       </p>
//                     </div>
//                   </div>

//                 </DropdownMenuLabel>

//                 <DropdownMenuSeparator />

//                 {/* DASHBOARD */}
//                 <DropdownMenuItem
//                   onClick={() => navigate(dashboardRoute)}
//                   className="cursor-pointer rounded-xl py-3"
//                 >

//                   <LayoutDashboard className="mr-2 h-4 w-4" />

//                   {
//                     user?.role === "admin"
//                       ? "Admin Dashboard"
//                       : "User Dashboard"
//                   }

//                 </DropdownMenuItem>

//                 {/* PROFILE */}
//                 <DropdownMenuItem
//                   onClick={() => navigate(profileRoute)}
//                   className="cursor-pointer rounded-xl py-3"
//                 >

//                   <User className="mr-2 h-4 w-4" />

//                   Profile

//                 </DropdownMenuItem>

//              {/* ABOUT */}
// <DropdownMenuItem
//   onClick={() => navigate("/about")}
//   className="cursor-pointer rounded-xl py-3"
// >
//   <BookA className="mr-2 h-4 w-4" />
//   About
// </DropdownMenuItem>

// <DropdownMenuSeparator />
//                 {/* LOGOUT */}
//                 <DropdownMenuItem
//                   onClick={logoutHandler}
//                   className="
//                     cursor-pointer rounded-xl py-3
//                     text-red-600 focus:text-red-600
//                   "
//                 >

//                   <LogOut className="mr-2 h-4 w-4" />

//                   Logout

//                 </DropdownMenuItem>

//               </DropdownMenuContent>

//             </DropdownMenu>

//           ) : (

//             <Link
//               to="/login"
//               className="
//                 px-5 py-2 rounded-xl
//                 bg-black text-white
//                 hover:bg-zinc-800
//                 transition font-medium
//               "
//             >
//               Login
//             </Link>

//           )}
//         </div>

//         {/* ================= MOBILE TOGGLE ================= */}
//         <button
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="
//             md:hidden
//             text-black
//             hover:text-zinc-600
//             transition
//           "
//         >

//           {
//             isMobileMenuOpen
//               ? <X className="h-7 w-7" />
//               : <Menu className="h-7 w-7" />
//           }

//         </button>
//       </div>

//       {/* ================= MOBILE MENU ================= */}
//       <div
//         className={`
//           md:hidden overflow-hidden
//           transition-all duration-300

//           ${
//             isMobileMenuOpen
//               ? "max-h-[500px] opacity-100"
//               : "max-h-0 opacity-0"
//           }
//         `}
//       >

//         <div className="bg-white border-t px-5 py-5">

//           {user ? (

//             <div className="flex flex-col gap-5">

//               {/* USER INFO */}
//               <div className="flex items-center gap-3">

//                 <Avatar>

//                   <AvatarImage src={user?.avatar} />

//                   <AvatarFallback className="bg-black text-white">
//                     {user?.username?.slice(0, 2).toUpperCase()}
//                   </AvatarFallback>

//                 </Avatar>

//                 <div>

//                   <h1 className="font-semibold text-black">
//                     {user?.username}
//                   </h1>

//                   <p className="text-sm text-zinc-500 capitalize">
//                     {user?.role}
//                   </p>

//                 </div>
//               </div>

//               {/* DASHBOARD */}
//               <button
//                 onClick={() => navigate(dashboardRoute)}
//                 className="
//                   flex items-center gap-3
//                   text-black font-medium
//                 "
//               >

//                 <LayoutDashboard size={18} />

//                 {
//                   user?.role === "admin"
//                     ? "Admin Dashboard"
//                     : "User Dashboard"
//                 }

//               </button>

//               {/* PROFILE */}
//               <button
//                 onClick={() => navigate(profileRoute)}
//                 className="
//                   flex items-center gap-3
//                   text-black font-medium
//                 "
//               >

//                 <User size={18} />

//                 Profile

//               </button>

//               {/* HOME */}
//               {/* <button
//                 onClick={() => navigate("/")}
//                 className="
//                   flex items-center gap-3
//                   text-black font-medium
//                 "
//               >

//                 <Home size={18} />

//                 Home

//               </button> */}

//               {/* LOGOUT */}
//               <button
//                 onClick={logoutHandler}
//                 className="
//                   flex items-center gap-3
//                   text-red-600 font-medium
//                 "
//               >

//                 <LogOut size={18} />

//                 Logout

//               </button>

//             </div>

//           ) : (

//             <Link
//               to="/login"
//               className="
//                 block w-full text-center
//                 bg-black text-white
//                 py-3 rounded-xl
//                 font-medium
//               "
//             >
//               Login
//             </Link>

//           )}
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar







import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import {
  BookA,
  LogOut,
  User,
  Menu,
  X,
  LayoutDashboard,
  GraduationCap,
  Home,
  ChevronDown,
  Settings,
  HelpCircle,
  Bell,
  Sun,
  Moon,
  Shield,
  Sparkles
} from 'lucide-react'

import API from "../utils/api"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getData } from '@/context/userContext'

import axios from 'axios'
import { toast } from 'sonner'

const Navbar = () => {

  const { user, setUser } = getData()

  const navigate = useNavigate()
  const location = useLocation()

  const accessToken = localStorage.getItem("accessToken")

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [activeDropdown, setActiveDropdown] = useState(null)

  // ================= CHECK CURRENT PANEL =================
  const isAdminPanel = location.pathname.startsWith("/admin")
  const isUserPanel = location.pathname.startsWith("/user")
  const isActive = (path) => location.pathname === path

  // ================= SCROLL EFFECT =================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ================= CLOSE MOBILE MENU ON ROUTE CHANGE =================
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // ================= DARK MODE TOGGLE =================
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  // ================= LOGOUT =================
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${API}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (res.data.success) {
        setUser(null)
        localStorage.clear()
        toast.success(res.data.message || "Logged out successfully!")
        navigate("/login")
      }
    } catch {
      toast.error("Logout failed!")
    }
  }

  // ================= DASHBOARD ROUTE =================
  const dashboardRoute = user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
  const profileRoute = user?.role === "admin" ? "/admin/profile" : "/user/profile"
  const settingsRoute = user?.role === "admin" ? "/admin/settings" : "/user/settings"

  // ================= NAVIGATION ITEMS =================
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: BookA },
  ]

  // ================= DROPDOWN ANIMATION =================
  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 }
  }

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-[500]
          transition-all duration-500 ease-out
          ${isScrolled
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-lg border-b border-zinc-200/50 dark:border-zinc-800/50"
            : "bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-800"
          }
        `}
      >
        {/* ================= CONTAINER ================= */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">

            {/* ================= LEFT SECTION ================= */}
            <div className="flex items-center gap-4">

              {/* ANIMATED LOGO */}
              <Link
                to="/"
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-800 dark:from-white dark:to-zinc-400 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-black to-zinc-800 dark:from-white dark:to-zinc-400 text-white p-2.5 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <GraduationCap size={20} />
                  </div>
                </div>

                <div className="hidden sm:block">
                  <h1 className="font-black text-black dark:text-white text-lg leading-none tracking-tight">
                    Learn<span className="text-zinc-500 dark:text-zinc-400">Hub</span>
                  </h1>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
                    AI Learning Platform
                  </p>
                </div>
              </Link>

              {/* PANEL BADGE WITH GLOW EFFECT */}
              {(isAdminPanel || isUserPanel) && (
                <div className="hidden md:flex relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-30" />
                  <div className={`
                    relative flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg
                    ${isAdminPanel
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                      : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    }
                  `}>
                    <LayoutDashboard size={14} />
                    {isAdminPanel ? "Admin Panel" : "User Panel"}
                    <Sparkles size={10} className="animate-pulse" />
                  </div>
                </div>
              )}
            </div>

            {/* ================= DESKTOP MENU ================= */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">

              {/* NAVIGATION ITEMS */}
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    relative px-4 py-2 rounded-xl text-sm font-medium
                    transition-all duration-300
                    ${isActive(item.path)
                      ? "text-black dark:text-white bg-zinc-100 dark:bg-zinc-800"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <item.icon size={16} />
                    {item.label}
                  </span>
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-black dark:bg-white rounded-full" />
                  )}
                </button>
              ))}

              {/* NOTIFICATION BELL */}
              {user && (
                <button
                  className="relative p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
                  onClick={() => setNotifications(0)}
                >
                  <Bell size={20} className="text-zinc-600 dark:text-zinc-400" />
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </button>
              )}

              {/* DARK MODE TOGGLE */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-zinc-600" />
                )}
              </button>

              {/* USER SECTION */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 ml-2 group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-800 dark:from-white dark:to-zinc-400 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                        <Avatar className="cursor-pointer ring-2 ring-zinc-200 dark:ring-zinc-700 group-hover:ring-black dark:group-hover:ring-white transition-all duration-300 relative">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-black to-zinc-800 dark:from-white dark:to-zinc-400 text-white dark:text-black font-bold">
                            {user?.username?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-black" />
                      </div>
                      <ChevronDown size={16} className="text-zinc-500 group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-80 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-2xl p-2 mt-3"
                  >
                    <DropdownMenuLabel className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 ring-2 ring-zinc-200 dark:ring-zinc-700">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-black to-zinc-800 text-white font-bold text-lg">
                            {user?.username?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h1 className="font-bold text-black dark:text-white">
                            {user?.username}
                          </h1>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`
                              text-xs px-2 py-0.5 rounded-full font-medium
                              ${user?.role === "admin"
                                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                                : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                              }
                            `}>
                              {user?.role === "admin" ? "Administrator" : "Student"}
                            </div>
                            <Shield size={12} className="text-zinc-400" />
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

                    <DropdownMenuItem
                      onClick={() => navigate(dashboardRoute)}
                      className="cursor-pointer rounded-xl py-3 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 group"
                    >
                      <LayoutDashboard className="mr-3 h-4 w-4 text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                      <span className="flex-1">
                        {user?.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
                      </span>
                      <span className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate(profileRoute)}
                      className="cursor-pointer rounded-xl py-3 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 group"
                    >
                      <User className="mr-3 h-4 w-4 text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                      <span className="flex-1">Profile Settings</span>
                      <span className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate(settingsRoute)}
                      className="cursor-pointer rounded-xl py-3 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 group"
                    >
                      <Settings className="mr-3 h-4 w-4 text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                      <span className="flex-1">Account Settings</span>
                      <span className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </DropdownMenuItem>

                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="cursor-pointer rounded-xl py-3 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300">
                        <HelpCircle className="mr-3 h-4 w-4 text-zinc-500" />
                        <span>Help & Support</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-lg">
                        <DropdownMenuItem className="cursor-pointer py-2">
                          Documentation
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer py-2">
                          FAQ
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer py-2">
                          Contact Support
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

                    <DropdownMenuItem
                      onClick={logoutHandler}
                      className="cursor-pointer rounded-xl py-3 px-3 text-red-600 dark:text-red-400 focus:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-all duration-300 group"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="flex-1">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  to="/login"
                  className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-black to-zinc-800 dark:from-white dark:to-zinc-400 text-white dark:text-black font-semibold text-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-zinc-700 to-black dark:from-zinc-300 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative">Login / Sign Up</span>
                </Link>
              )}
            </div>

            {/* ================= MOBILE TOGGLE ================= */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-black dark:text-white animate-in zoom-in duration-300" />
                ) : (
                  <Menu className="h-6 w-6 text-black dark:text-white animate-in zoom-in duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`
            md:hidden overflow-hidden
            transition-all duration-500 ease-in-out
            ${isMobileMenuOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 px-5 py-6">

            {user ? (
              <div className="flex flex-col gap-4">

                {/* USER INFO CARD */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-black border border-zinc-200 dark:border-zinc-800">
                  <Avatar className="h-14 w-14 ring-2 ring-zinc-200 dark:ring-zinc-700">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-black to-zinc-800 text-white font-bold text-lg">
                      {user?.username?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-bold text-black dark:text-white text-lg">
                      {user?.username}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`
                        text-xs px-2 py-0.5 rounded-full font-medium
                        ${user?.role === "admin"
                          ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        }
                      `}>
                        {user?.role === "admin" ? "Admin" : "Student"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* MOBILE NAV ITEMS */}
                {[
                  { icon: LayoutDashboard, label: user?.role === "admin" ? "Admin Dashboard" : "User Dashboard", route: dashboardRoute },
                  { icon: User, label: "Profile", route: profileRoute },
                  { icon: Settings, label: "Settings", route: settingsRoute },
                  { icon: Home, label: "Home", route: "/" },
                  { icon: BookA, label: "About", route: "/about" },
                  { icon: HelpCircle, label: "Help", route: "/help" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(item.route)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-black dark:text-white font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 group"
                  >
                    <item.icon size={20} className="text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <span className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                ))}

                {/* DARK MODE TOGGLE FOR MOBILE */}
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-black dark:text-white font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
                >
                  {isDarkMode ? (
                    <>
                      <Sun size={20} className="text-yellow-500" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={20} className="text-zinc-600" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>

                <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent my-2" />

                {/* LOGOUT BUTTON */}
                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-950/50 transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="block w-full text-center bg-gradient-to-r from-black to-zinc-800 dark:from-white dark:to-zinc-400 text-white dark:text-black py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center border-2 border-black dark:border-white text-black dark:text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* SPACER FOR CONTENT */}
      <div className="h-16" />
    </>
  )
}

export default Navbar
