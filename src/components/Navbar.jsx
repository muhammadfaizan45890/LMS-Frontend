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

  // ================= BODY SCROLL LOCK WHEN MOBILE MENU OPEN =================
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

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
        transition-all duration-300 ease-out
        mb-0 pb-0
        ${isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-zinc-100"
          : "bg-white border-b border-zinc-100"
        }
      `}
    >

      {/* ================= CONTAINER ================= */}
      <div
        className="
          h-14 sm:h-16
          px-4 sm:px-6 lg:px-8
          flex items-center justify-between
        "
      >

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-3">

          {/* LOGO with enhanced hover */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg"
          >
            <div
              className="
                bg-black text-white
                p-2 rounded-xl
                group-hover:scale-105 group-hover:rotate-1
                transition-all duration-300
              "
            >
              <GraduationCap size={18} />
            </div>

            <div className="hidden sm:block">
              <h1 className="font-bold text-black text-lg leading-none tracking-tight">
                Learning
              </h1>
              <p className="text-[10px] text-zinc-500 font-medium">
                Management System
              </p>
            </div>
          </Link>

          {/* PANEL BADGE - enhanced styling */}
          {(isAdminPanel || isUserPanel) && (
            <div
              className={`
                hidden md:flex
                items-center gap-2
                px-3 py-1.5 rounded-full
                text-xs font-semibold
                backdrop-blur-sm
                transition-all
                ${isAdminPanel
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
                }
              `}
            >
              <LayoutDashboard size={14} strokeWidth={2} />
              {isAdminPanel ? "Admin Panel" : "User Panel"}
            </div>
          )}
        </div>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-6">

          {/* HOME with active state */}
          <NavLink
            to="/"
            className={({ isActive }) => `
              flex items-center gap-2
              transition-all duration-200
              font-medium rounded-lg px-2 py-1
              ${isActive
                ? "text-black bg-zinc-100"
                : "text-zinc-600 hover:text-black hover:bg-zinc-50"
              }
            `}
          >
            <Home size={18} strokeWidth={1.8} />
            Home
          </NavLink>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-full transition-transform hover:scale-105">
                  <Avatar
                    className="
                      cursor-pointer
                      ring-2 ring-zinc-200
                      hover:ring-black
                      transition-all duration-300
                    "
                  >
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-black text-white text-sm font-bold">
                      {user?.username?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="
                  w-64 rounded-2xl
                  border border-zinc-100 bg-white shadow-xl
                  p-2
                  mt-3
                  animate-in fade-in-0 zoom-in-95
                "
              >
                <DropdownMenuLabel className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-1 ring-zinc-200">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-black text-white text-xs font-bold">
                        {user?.username?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="font-semibold text-black">
                        {user?.username}
                      </h1>
                      <p className="text-xs text-zinc-500 capitalize font-medium">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-zinc-100" />

                <DropdownMenuItem
                  onClick={() => navigate(dashboardRoute)}
                  className="cursor-pointer rounded-xl py-3 px-3 focus:bg-zinc-100 transition-colors"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" strokeWidth={1.8} />
                  {user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate(profileRoute)}
                  className="cursor-pointer rounded-xl py-3 px-3 focus:bg-zinc-100 transition-colors"
                >
                  <User className="mr-2 h-4 w-4" strokeWidth={1.8} />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/about")}
                  className="cursor-pointer rounded-xl py-3 px-3 focus:bg-zinc-100 transition-colors"
                >
                  <BookA className="mr-2 h-4 w-4" strokeWidth={1.8} />
                  About
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-zinc-100" />

                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="
                    cursor-pointer rounded-xl py-3 px-3
                    text-red-600 focus:text-red-600 focus:bg-red-50
                    transition-colors
                  "
                >
                  <LogOut className="mr-2 h-4 w-4" strokeWidth={1.8} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="
                px-5 py-2.5 rounded-xl
                bg-black text-white
                hover:bg-zinc-800 hover:scale-[0.98]
                transition-all duration-200 font-medium
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black
              "
            >
              Login
            </Link>
          )}
        </div>

        {/* ================= MOBILE TOGGLE BUTTON ================= */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="
            md:hidden
            text-black
            hover:text-zinc-600
            transition-all duration-200
            p-1 rounded-lg
            focus:outline-none focus-visible:ring-2 focus-visible:ring-black
          "
        >
          {isMobileMenuOpen ? (
            <X className="h-7 w-7 transition-transform rotate-0" />
          ) : (
            <Menu className="h-7 w-7 transition-transform" />
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU (SLIDE DOWN) ================= */}
      <div
        className={`
          md:hidden overflow-hidden
          transition-all duration-300 ease-in-out
          bg-white border-t border-zinc-100
          ${isMobileMenuOpen
            ? "max-h-[600px] opacity-100 shadow-lg"
            : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="px-5 py-6 space-y-6">
          {user ? (
            <div className="flex flex-col gap-5">
              {/* USER INFO with improved styling */}
              <div className="flex items-center gap-3 pb-2 border-b border-zinc-100">
                <Avatar className="h-12 w-12 ring-2 ring-zinc-100">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-black text-white text-sm font-bold">
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-bold text-black text-base">
                    {user?.username}
                  </h1>
                  <p className="text-sm text-zinc-500 capitalize font-medium">
                    {user?.role}
                  </p>
                </div>
              </div>

              {/* PANEL BADGE for mobile */}
              {(isAdminPanel || isUserPanel) && (
                <div
                  className={`
                    flex items-center justify-center gap-2
                    py-2 rounded-full text-xs font-semibold
                    ${isAdminPanel
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                    }
                  `}
                >
                  <LayoutDashboard size={14} strokeWidth={2} />
                  {isAdminPanel ? "Admin Panel" : "User Panel"}
                </div>
              )}

              {/* MOBILE NAVIGATION LINKS */}
              <button
                onClick={() => navigate("/")}
                className="
                  flex items-center gap-3
                  text-black font-medium
                  py-2 px-2 rounded-xl
                  hover:bg-zinc-50
                  transition-all duration-200
                "
              >
                <Home size={20} strokeWidth={1.8} />
                Home
              </button>

              <button
                onClick={() => navigate(dashboardRoute)}
                className="
                  flex items-center gap-3
                  text-black font-medium
                  py-2 px-2 rounded-xl
                  hover:bg-zinc-50
                  transition-all duration-200
                "
              >
                <LayoutDashboard size={20} strokeWidth={1.8} />
                {user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
              </button>

              <button
                onClick={() => navigate(profileRoute)}
                className="
                  flex items-center gap-3
                  text-black font-medium
                  py-2 px-2 rounded-xl
                  hover:bg-zinc-50
                  transition-all duration-200
                "
              >
                <User size={20} strokeWidth={1.8} />
                Profile
              </button>

              <button
                onClick={() => navigate("/about")}
                className="
                  flex items-center gap-3
                  text-black font-medium
                  py-2 px-2 rounded-xl
                  hover:bg-zinc-50
                  transition-all duration-200
                "
              >
                <BookA size={20} strokeWidth={1.8} />
                About
              </button>

              <button
                onClick={logoutHandler}
                className="
                  flex items-center gap-3
                  text-red-600 font-medium
                  py-2 px-2 rounded-xl
                  hover:bg-red-50
                  transition-all duration-200
                "
              >
                <LogOut size={20} strokeWidth={1.8} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="
                block w-full text-center
                bg-black text-white
                py-3.5 rounded-xl
                font-medium
                hover:bg-zinc-800 hover:scale-[0.99]
                transition-all duration-200
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
