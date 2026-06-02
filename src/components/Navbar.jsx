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
  Home
} from 'lucide-react'

import API from "../utils/api"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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

  // ================= CHECK CURRENT PANEL =================
  const isAdminPanel = location.pathname.startsWith("/admin")
  const isUserPanel = location.pathname.startsWith("/user")

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
  const dashboardRoute =
    user?.role === "admin"
      ? "/admin/dashboard"
      : "/user/dashboard"

  // ================= PROFILE ROUTE =================
  const profileRoute =
    user?.role === "admin"
      ? "/admin/profile"
      : "/user/profile"

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-[500]
        transition-all duration-300

        ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b"
            : "bg-white border-b"
        }
      `}
    >

      {/* ================= CONTAINER ================= */}
      <div
        className="
          h-14
          px-4 sm:px-6 lg:px-8
          flex items-center justify-between
        "
      >

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-3">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >

            <div
              className="
                bg-black text-white
                p-2 rounded-xl
                group-hover:scale-105
                transition
              "
            >
              <GraduationCap size={18} />
            </div>

            <div className="hidden sm:block">
              <h1 className="font-bold text-black text-lg leading-none">
                Learning
              </h1>

              <p className="text-[10px] text-zinc-500">
                Management System
              </p>
            </div>
          </Link>

          {/* PANEL BADGE */}
          {(isAdminPanel || isUserPanel) && (
            <div
              className={`
                hidden md:flex
                items-center gap-2
                px-3 py-1 rounded-full
                text-xs font-medium

                ${
                  isAdminPanel
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }
              `}
            >

              <LayoutDashboard size={14} />

              {isAdminPanel
                ? "Admin Panel"
                : "User Panel"}
            </div>
          )}
        </div>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-5">

          {/* HOME */}
          <button
            onClick={() => navigate("/")}
            className="
              flex items-center gap-2
              text-zinc-700 hover:text-black
              transition font-medium
            "
          >
            <Home size={18} />
            Home
          </button>

          {user ? (

            <DropdownMenu>

              {/* AVATAR */}
              <DropdownMenuTrigger>

                <Avatar
                  className="
                    cursor-pointer
                    ring-2 ring-zinc-200
                    hover:ring-black
                    transition-all duration-300
                  "
                >

                  <AvatarImage src={user?.avatar} />

                  <AvatarFallback className="bg-black text-white">
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>

                </Avatar>

              </DropdownMenuTrigger>

              {/* DROPDOWN */}
              <DropdownMenuContent
                align="end"
                className="
                  w-60 rounded-2xl
                  border bg-white shadow-xl
                  p-2
                  mt-3
                "
              >

                <DropdownMenuLabel className="pb-3">

                  <div className="flex items-center gap-3">

                    <Avatar className="h-10 w-10">

                      <AvatarImage src={user?.avatar} />

                      <AvatarFallback className="bg-black text-white">
                        {user?.username?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>

                    </Avatar>

                    <div>
                      <h1 className="font-semibold text-black">
                        {user?.username}
                      </h1>

                      <p className="text-xs text-zinc-500 capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>

                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* DASHBOARD */}
                <DropdownMenuItem
                  onClick={() => navigate(dashboardRoute)}
                  className="cursor-pointer rounded-xl py-3"
                >

                  <LayoutDashboard className="mr-2 h-4 w-4" />

                  {
                    user?.role === "admin"
                      ? "Admin Dashboard"
                      : "User Dashboard"
                  }

                </DropdownMenuItem>

                {/* PROFILE */}
                <DropdownMenuItem
                  onClick={() => navigate(profileRoute)}
                  className="cursor-pointer rounded-xl py-3"
                >

                  <User className="mr-2 h-4 w-4" />

                  Profile

                </DropdownMenuItem>

             {/* ABOUT */}
<DropdownMenuItem
  onClick={() => navigate("/about")}
  className="cursor-pointer rounded-xl py-3"
>
  <BookA className="mr-2 h-4 w-4" />
  About
</DropdownMenuItem>

<DropdownMenuSeparator />
                {/* LOGOUT */}
                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="
                    cursor-pointer rounded-xl py-3
                    text-red-600 focus:text-red-600
                  "
                >

                  <LogOut className="mr-2 h-4 w-4" />

                  Logout

                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          ) : (

            <Link
              to="/login"
              className="
                px-5 py-2 rounded-xl
                bg-black text-white
                hover:bg-zinc-800
                transition font-medium
              "
            >
              Login
            </Link>

          )}
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="
            md:hidden
            text-black
            hover:text-zinc-600
            transition
          "
        >

          {
            isMobileMenuOpen
              ? <X className="h-7 w-7" />
              : <Menu className="h-7 w-7" />
          }

        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`
          md:hidden overflow-hidden
          transition-all duration-300

          ${
            isMobileMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >

        <div className="bg-white border-t px-5 py-5">

          {user ? (

            <div className="flex flex-col gap-5">

              {/* USER INFO */}
              <div className="flex items-center gap-3">

                <Avatar>

                  <AvatarImage src={user?.avatar} />

                  <AvatarFallback className="bg-black text-white">
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>

                </Avatar>

                <div>

                  <h1 className="font-semibold text-black">
                    {user?.username}
                  </h1>

                  <p className="text-sm text-zinc-500 capitalize">
                    {user?.role}
                  </p>

                </div>
              </div>

              {/* DASHBOARD */}
              <button
                onClick={() => navigate(dashboardRoute)}
                className="
                  flex items-center gap-3
                  text-black font-medium
                "
              >

                <LayoutDashboard size={18} />

                {
                  user?.role === "admin"
                    ? "Admin Dashboard"
                    : "User Dashboard"
                }

              </button>

              {/* PROFILE */}
              <button
                onClick={() => navigate(profileRoute)}
                className="
                  flex items-center gap-3
                  text-black font-medium
                "
              >

                <User size={18} />

                Profile

              </button>

              {/* HOME */}
              {/* <button
                onClick={() => navigate("/")}
                className="
                  flex items-center gap-3
                  text-black font-medium
                "
              >

                <Home size={18} />

                Home

              </button> */}

              {/* LOGOUT */}
              <button
                onClick={logoutHandler}
                className="
                  flex items-center gap-3
                  text-red-600 font-medium
                "
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          ) : (

            <Link
              to="/login"
              className="
                block w-full text-center
                bg-black text-white
                py-3 rounded-xl
                font-medium
              "
            >
              Login
            </Link>

          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar








// import React, { useEffect, useState } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom'

// import {
//   BookA,
//   LogOut,
//   User,
//   Menu,
//   X,
//   LayoutDashboard,
//   GraduationCap,
//   Home,
//   ChevronDown,
//   Settings,
//   HelpCircle,
//   Bell,
//   Shield,
//   Sparkles,
//   ChevronRight,
//   ChevronLeft,
//   FileText,
//   MessageCircle,
//   LifeBuoy
// } from 'lucide-react'

// import API from "../utils/api"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
//   DropdownMenuSub,
//   DropdownMenuSubTrigger,
//   DropdownMenuSubContent,
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
//   const [notifications, setNotifications] = useState(0)
//   const [notificationList, setNotificationList] = useState([])
//   const [mobileHelpOpen, setMobileHelpOpen] = useState(false)

//   // ================= CHECK CURRENT PANEL =================
//   const isAdminPanel = location.pathname.startsWith("/admin")
//   const isUserPanel = location.pathname.startsWith("/user")
//   const isActive = (path) => location.pathname === path

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
//     setMobileHelpOpen(false)
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

//   // ================= MARK NOTIFICATION AS READ =================
//   const markAsRead = (id) => {
//     if (notificationList.length === 0) return
//     setNotificationList(prev => prev.map(notif => 
//       notif.id === id ? { ...notif, read: true } : notif
//     ))
//     const unreadCount = notificationList.filter(n => !n.read && n.id !== id).length
//     setNotifications(unreadCount)
//   }

//   const markAllAsRead = () => {
//     if (notificationList.length === 0) return
//     setNotificationList(prev => prev.map(notif => ({ ...notif, read: true })))
//     setNotifications(0)
//     toast.success("All notifications marked as read")
//   }

//   // ================= DASHBOARD ROUTE =================
//   const dashboardRoute = user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
//   const profileRoute = user?.role === "admin" ? "/admin/profile" : "/user/profile"
//   const settingsRoute = user?.role === "admin" ? "/admin/settings" : "/user/settings"

//   // ================= NAVIGATION ITEMS =================
//   const navItems = [
//     { path: "/", label: "Home", icon: Home },
//     { path: "/about", label: "About", icon: BookA },
//   ]

//   // ================= HELP SUBMENU ITEMS =================
//   const helpItems = [
//     { label: "Documentation", icon: <FileText size={18} />, onClick: () => navigate("/docs") },
//     { label: "FAQ", icon: <MessageCircle size={18} />, onClick: () => navigate("/faq") },
//     { label: "Contact Support", icon: <LifeBuoy size={18} />, onClick: () => navigate("/support") },
//   ]

//   return (
//     <>
//       {/* Overlay for mobile menu */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-[490] md:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       <nav
//         className={`
//           fixed top-0 left-0 w-full z-[500]
//           transition-all duration-500 ease-out
//           ${isScrolled
//             ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-zinc-200/50"
//             : "bg-white border-b border-zinc-100"
//           }
//         `}
//       >
//         {/* ================= CONTAINER ================= */}
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="h-16 flex items-center justify-between gap-2">

//             {/* ================= LEFT SECTION ================= */}
//             <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">

//               {/* ANIMATED LOGO */}
//               <Link
//                 to="/"
//                 className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
//               >
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-800 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
//                   <div className="relative bg-gradient-to-br from-black to-zinc-800 text-white p-2 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg">
//                     <GraduationCap size={20} />
//                   </div>
//                 </div>

//                 <div className="hidden sm:block">
//                   <h1 className="font-black text-black text-base sm:text-lg leading-none tracking-tight">
//                     Learn<span className="text-zinc-500">Hub</span>
//                   </h1>
//                   <p className="text-[9px] sm:text-[10px] text-zinc-500 font-medium tracking-wide">
//                     AI Learning Platform
//                   </p>
//                 </div>
//               </Link>

//               {/* PANEL BADGE WITH GLOW EFFECT */}
//               {(isAdminPanel || isUserPanel) && (
//                 <div className="hidden md:flex relative flex-shrink-0">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-30" />
//                   <div className={`
//                     relative flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg whitespace-nowrap
//                     ${isAdminPanel
//                       ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
//                       : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
//                     }
//                   `}>
//                     <LayoutDashboard size={14} />
//                     {isAdminPanel ? "Admin Panel" : "User Panel"}
//                     <Sparkles size={10} className="animate-pulse" />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* ================= DESKTOP MENU ================= */}
//             <div className="hidden md:flex items-center gap-1 lg:gap-3">

//               {/* NAVIGATION ITEMS */}
//               {navItems.map((item) => (
//                 <button
//                   key={item.path}
//                   onClick={() => navigate(item.path)}
//                   className={`
//                     relative px-3 py-2 rounded-xl text-sm font-medium
//                     transition-all duration-300 whitespace-nowrap
//                     ${isActive(item.path)
//                       ? "text-black bg-zinc-100"
//                       : "text-zinc-600 hover:text-black hover:bg-zinc-50"
//                     }
//                   `}
//                 >
//                   <span className="flex items-center gap-2">
//                     <item.icon size={16} />
//                     {item.label}
//                   </span>
//                   {isActive(item.path) && (
//                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-black rounded-full" />
//                   )}
//                 </button>
//               ))}

//               {/* NOTIFICATION BELL WITH DROPDOWN */}
//               {user && (
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <button className="relative p-2 rounded-xl hover:bg-zinc-100 transition-all duration-300">
//                       <Bell size={20} className="text-zinc-600" />
//                       {notifications > 0 && (
//                         <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
//                       )}
//                     </button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent
//                     align="end"
//                     className="w-80 rounded-2xl border border-zinc-200 bg-white/95 backdrop-blur-xl shadow-2xl p-0 mt-3"
//                   >
//                     <div className="flex items-center justify-between p-4 border-b border-zinc-100">
//                       <DropdownMenuLabel className="p-0 font-bold text-black">
//                         Notifications
//                       </DropdownMenuLabel>
//                       {notifications > 0 && (
//                         <button
//                           onClick={markAllAsRead}
//                           className="text-xs text-blue-600 hover:text-blue-700 font-medium"
//                         >
//                           Mark all as read
//                         </button>
//                       )}
//                     </div>
//                     <div className="max-h-80 overflow-y-auto">
//                       {notificationList.length === 0 ? (
//                         <div className="p-8 text-center text-zinc-400">
//                           <Bell size={32} className="mx-auto mb-2 opacity-50" />
//                           <p className="text-sm">No notifications</p>
//                         </div>
//                       ) : (
//                         notificationList.map((notif) => (
//                           <DropdownMenuItem
//                             key={notif.id}
//                             onClick={() => markAsRead(notif.id)}
//                             className={`
//                               cursor-pointer p-4 border-b border-zinc-50 hover:bg-zinc-50
//                               ${!notif.read ? "bg-blue-50/30" : ""}
//                             `}
//                           >
//                             <div className="flex gap-3">
//                               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
//                                 NEW
//                               </div>
//                               <div className="flex-1">
//                                 <p className="text-sm font-medium text-black">{notif.title}</p>
//                                 <p className="text-xs text-zinc-400 mt-1">{notif.time}</p>
//                               </div>
//                               {!notif.read && (
//                                 <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
//                               )}
//                             </div>
//                           </DropdownMenuItem>
//                         ))
//                       )}
//                     </div>
//                     <div className="p-3 border-t border-zinc-100">
//                       <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
//                         View all notifications
//                       </button>
//                     </div>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               )}

//               {/* USER SECTION */}
//               {user ? (
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <button className="flex items-center gap-2 ml-2 group">
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-800 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
//                         <Avatar className="cursor-pointer ring-2 ring-zinc-200 group-hover:ring-black transition-all duration-300 relative">
//                           <AvatarImage src={user?.avatar} />
//                           <AvatarFallback className="bg-gradient-to-br from-black to-zinc-800 text-white font-bold">
//                             {user?.username?.slice(0, 2).toUpperCase()}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
//                       </div>
//                       <ChevronDown size={16} className="text-zinc-500 group-hover:rotate-180 transition-transform duration-300" />
//                     </button>
//                   </DropdownMenuTrigger>

//                   <DropdownMenuContent
//                     align="end"
//                     className="w-80 rounded-2xl border border-zinc-200 bg-white/95 backdrop-blur-xl shadow-2xl p-2 mt-3"
//                   >
//                     <DropdownMenuLabel className="pb-3">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-12 w-12 ring-2 ring-zinc-200">
//                           <AvatarImage src={user?.avatar} />
//                           <AvatarFallback className="bg-gradient-to-br from-black to-zinc-800 text-white font-bold text-lg">
//                             {user?.username?.slice(0, 2).toUpperCase()}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <h1 className="font-bold text-black">
//                             {user?.username}
//                           </h1>
//                           <div className="flex items-center gap-2 mt-1">
//                             <div className={`
//                               text-xs px-2 py-0.5 rounded-full font-medium
//                               ${user?.role === "admin"
//                                 ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
//                                 : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
//                               }
//                             `}>
//                               {user?.role === "admin" ? "Administrator" : "Student"}
//                             </div>
//                             <Shield size={12} className="text-zinc-400" />
//                           </div>
//                         </div>
//                       </div>
//                     </DropdownMenuLabel>

//                     <DropdownMenuSeparator className="bg-zinc-100" />

//                     {/* Stats Row REMOVED */}

//                     <DropdownMenuItem
//                       onClick={() => navigate(dashboardRoute)}
//                       className="cursor-pointer rounded-xl py-3 px-3 hover:bg-zinc-100 transition-all duration-300 group mt-1"
//                     >
//                       <LayoutDashboard className="mr-3 h-4 w-4 text-zinc-500 group-hover:text-black transition-colors" />
//                       <span className="flex-1">
//                         {user?.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
//                       </span>
//                       <span className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
//                     </DropdownMenuItem>

//                     <DropdownMenuItem
//                       onClick={() => navigate(profileRoute)}
//                       className="cursor-pointer rounded-xl py-3 px-3 hover:bg-zinc-100 transition-all duration-300 group"
//                     >
//                       <User className="mr-3 h-4 w-4 text-zinc-500 group-hover:text-black transition-colors" />
//                       <span className="flex-1">Profile Settings</span>
//                       <span className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
//                     </DropdownMenuItem>

//                     <DropdownMenuSub>
//                       <DropdownMenuSubTrigger className="cursor-pointer rounded-xl py-3 px-3 hover:bg-zinc-100 transition-all duration-300">
//                         <HelpCircle className="mr-3 h-4 w-4 text-zinc-500" />
//                         <span>Help & Support</span>
//                       </DropdownMenuSubTrigger>
//                       <DropdownMenuSubContent className="rounded-xl bg-white border border-zinc-200 shadow-lg">
//                         <DropdownMenuItem className="cursor-pointer py-2">
//                           Documentation
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="cursor-pointer py-2">
//                           FAQ
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="cursor-pointer py-2">
//                           Contact Support
//                         </DropdownMenuItem>
//                       </DropdownMenuSubContent>
//                     </DropdownMenuSub>

//                     <DropdownMenuSeparator className="bg-zinc-100" />

//                     <DropdownMenuItem
//                       onClick={logoutHandler}
//                       className="cursor-pointer rounded-xl py-3 px-3 text-red-600 focus:text-red-600 hover:bg-red-50 transition-all duration-300 group"
//                     >
//                       <LogOut className="mr-3 h-4 w-4" />
//                       <span className="flex-1">Logout</span>
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Link
//                     to="/login"
//                     className="relative px-4 py-2 rounded-xl bg-transparent border border-black text-black font-semibold text-sm hover:bg-black hover:text-white transition-all duration-300"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="relative px-4 py-2 rounded-xl bg-gradient-to-r from-black to-zinc-800 text-white font-semibold text-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
//                   >
//                     <span className="absolute inset-0 bg-gradient-to-r from-zinc-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                     <span className="relative">Sign Up</span>
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* ================= MOBILE TOGGLE ================= */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden relative w-10 h-10 rounded-xl hover:bg-zinc-100 transition-all duration-300 flex-shrink-0"
//               aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//             >
//               <div className="absolute inset-0 flex items-center justify-center">
//                 {isMobileMenuOpen ? (
//                   <X className="h-6 w-6 text-black" />
//                 ) : (
//                   <Menu className="h-6 w-6 text-black" />
//                 )}
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* ================= ADVANCED MOBILE MENU ================= */}
//         <div
//           className={`
//             fixed top-16 left-0 bottom-0 w-[300px] z-[500]
//             bg-white/95 backdrop-blur-xl shadow-2xl
//             transform transition-transform duration-500 ease-in-out
//             md:hidden
//             flex flex-col
//             ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
//           `}
//         >
//           <div className="flex-1 overflow-y-auto px-5 py-6">
//             {user ? (
//               <div className="flex flex-col gap-4">

//                 {/* USER INFO CARD */}
//                 <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-zinc-50 to-white border border-zinc-200">
//                   <Avatar className="h-14 w-14 ring-2 ring-zinc-200 flex-shrink-0">
//                     <AvatarImage src={user?.avatar} />
//                     <AvatarFallback className="bg-gradient-to-br from-black to-zinc-800 text-white font-bold text-lg">
//                       {user?.username?.slice(0, 2).toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h1 className="font-bold text-black text-lg">
//                       {user?.username}
//                     </h1>
//                     <div className="flex items-center gap-2 mt-1">
//                       <div className={`
//                         text-xs px-2 py-0.5 rounded-full font-medium
//                         ${user?.role === "admin"
//                           ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
//                           : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
//                         }
//                       `}>
//                         {user?.role === "admin" ? "Admin" : "Student"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* MOBILE NAV ITEMS */}
//                 {[
//                   { icon: LayoutDashboard, label: user?.role === "admin" ? "Admin Dashboard" : "User Dashboard", route: dashboardRoute },
//                   { icon: User, label: "Profile", route: profileRoute },
//                   { icon: Home, label: "Home", route: "/" },
//                   { icon: BookA, label: "About", route: "/about" },
//                 ].map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       navigate(item.route)
//                       setIsMobileMenuOpen(false)
//                     }}
//                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-black font-medium hover:bg-zinc-100 transition-all duration-300 group w-full text-left"
//                   >
//                     <item.icon size={20} className="text-zinc-500 group-hover:text-black transition-colors flex-shrink-0" />
//                     <span className="flex-1 text-left">{item.label}</span>
//                     <ChevronRight size={16} className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </button>
//                 ))}

//                 <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-2" />

//                 {/* NOTIFICATION SECTION FOR MOBILE */}
//                 {notifications > 0 && (
//                   <div className="bg-blue-50 rounded-xl p-3">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-xs font-bold text-blue-600">Notifications</span>
//                       <button 
//                         onClick={markAllAsRead}
//                         className="text-xs text-blue-500"
//                       >
//                         Mark all read
//                       </button>
//                     </div>
//                     <p className="text-sm text-blue-700">
//                       You have {notifications} new notification{notifications > 1 ? 's' : ''}
//                     </p>
//                   </div>
//                 )}

//                 {/* HELP & SUPPORT COLLAPSIBLE SECTION (ADVANCED) */}
//                 <div className="border border-zinc-200 rounded-xl overflow-hidden">
//                   <button
//                     onClick={() => setMobileHelpOpen(!mobileHelpOpen)}
//                     className="flex items-center justify-between w-full px-4 py-3 text-left text-black font-medium hover:bg-zinc-50 transition-colors"
//                   >
//                     <div className="flex items-center gap-3">
//                       <HelpCircle size={20} className="text-zinc-500" />
//                       <span>Help & Support</span>
//                     </div>
//                     <ChevronRight
//                       size={18}
//                       className={`text-zinc-400 transition-transform duration-300 ${mobileHelpOpen ? "rotate-90" : ""}`}
//                     />
//                   </button>
//                   <div
//                     className={`overflow-hidden transition-all duration-300 ${mobileHelpOpen ? "max-h-96" : "max-h-0"}`}
//                   >
//                     <div className="border-t border-zinc-100 bg-zinc-50/50">
//                       {helpItems.map((item, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => {
//                             item.onClick()
//                             setIsMobileMenuOpen(false)
//                           }}
//                           className="flex items-center gap-3 w-full px-4 py-3 text-left text-zinc-600 hover:bg-zinc-100 transition-colors"
//                         >
//                           {item.icon}
//                           <span className="text-sm">{item.label}</span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* LOGOUT BUTTON */}
//                 <button
//                   onClick={logoutHandler}
//                   className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-all duration-300 group w-full text-left mt-2"
//                 >
//                   <LogOut size={20} />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <Link
//                   to="/login"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="block w-full text-center bg-gradient-to-r from-black to-zinc-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="block w-full text-center border-2 border-black text-black py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-black hover:text-white"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* SPACER FOR CONTENT */}
//       <div className="h-16" />
//     </>
//   )
// }

// export default Navbar
