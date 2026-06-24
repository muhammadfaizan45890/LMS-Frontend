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


// import { useState, useEffect } from 'react';
// import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard, Home, Menu, X, LogOut, User,
//   ChevronDown, Map, GraduationCap
// } from 'lucide-react';
// import {
//   DropdownMenu, DropdownMenuContent, DropdownMenuItem,
//   DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { getData } from '@/context/userContext';
// import axios from 'axios';
// import { toast } from 'sonner';
// import API from '@/utils/api';

// const getAvatarUrl = (avatarPath) => {
//   if (!avatarPath) return null;
//   if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')) {
//     return avatarPath;
//   }
//   const base = API.replace(/\/+$/, '');
//   const path = avatarPath.replace(/^\/+/, '');
//   return `${base}/${path}`;
// };

// const Navbar = () => {
//   const { user, setUser } = getData();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const accessToken = localStorage.getItem('accessToken');
//   const userRole = user?.role || 'user';

//   // Close mobile drawer on route change
//   useEffect(() => {
//     setMobileOpen(false);
//   }, [location.pathname]);

//   // Close drawer on resize to large screens
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setMobileOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Navigation items
//   const publicNavItems = [
//     { name: 'Home', path: '/', icon: Home },
//     { name: 'About', path: '/about', icon: Map },
//   ];

//   const userNavItems = [
//     { name: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
//   ];

//   const adminNavItems = [
//     { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
//   ];

//   let navItems;
//   if (user) {
//     navItems = userRole === 'admin' ? adminNavItems : userNavItems;
//   } else {
//     navItems = publicNavItems;
//   }

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.post(`${API}/user/logout`, {}, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       if (res.data.success) {
//         setUser(null);
//         toast.success(res.data.message);
//         localStorage.clear();
//         navigate('/');
//       }
//     } catch {
//       toast.error('Logout failed');
//     }
//   };

//   const getUserInitials = () => {
//     if (user?.fullname) return user.fullname.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//     if (user?.email) return user.email[0].toUpperCase();
//     return 'U';
//   };

//   const getRoleBadge = () => (userRole === 'admin' ? 'A' : null);

//   // Menu button click – now does nothing (drawer removed)
//   const handleMenuClick = (e) => {
//     e.stopPropagation();
//     // No drawer to toggle
//   };

//   const profileRoute = userRole === 'admin' ? '/admin/profile' : '/user/profile';

//   return (
//     <nav
//       className={`
//         sticky top-0 z-50 w-full
//         transition-all duration-300
//         ${isScrolled
//           ? 'bg-white/80 backdrop-blur-md shadow-sm'
//           : 'bg-white'
//         }
//       `}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-[62px] gap-3">

//           {/* Left: mobile menu + logo */}
//           <div className="flex items-center gap-1 shrink-0">
//             <button
//               onClick={handleMenuClick}
//               className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-black hover:bg-gray-100 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
//               aria-label="Toggle menu"
//             >
//               <Menu className="h-[18px] w-[18px]" />
//             </button>

//             <Link to="/" className="flex items-center gap-2.5 group">
//               <div className="bg-black text-white p-2 rounded-xl transition-transform group-hover:scale-105">
//                 <GraduationCap className="h-5 w-5" />
//               </div>
//               {/* 👇 Stylish LMS text */}
//               <span className="font-bold text-[1.2rem] tracking-wider bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover:from-gray-700 group-hover:to-gray-400 transition-all duration-300">
//                 LMS
//               </span>
//             </Link>
//           </div>

//           {/* Right: user menu or Login */}
//           <div className="flex items-center gap-1.5 shrink-0">
//             {user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <button className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-gray-400/50">
//                     <div className="relative">
//                       <Avatar className="h-7 w-7 border-2 border-gray-300 group-hover:border-black transition-all">
//                         <AvatarImage src={getAvatarUrl(user?.avatar)} />
//                         <AvatarFallback className="bg-gray-200 text-gray-700 text-[10px] font-bold">
//                           {getUserInitials()}
//                           {getRoleBadge() && <span className="ml-0.5 text-[8px]">{getRoleBadge()}</span>}
//                         </AvatarFallback>
//                       </Avatar>
//                       <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
//                     </div>
//                     <span className="hidden md:block text-[13px] font-medium text-gray-700 max-w-[90px] truncate">
//                       {user?.fullname?.split(' ')[0] || 'Profile'}
//                     </span>
//                     <ChevronDown className="hidden md:block h-3.5 w-3.5 text-gray-400 group-hover:text-black transition-transform duration-200 group-data-[state=open]:rotate-180" />
//                   </button>
//                 </DropdownMenuTrigger>

//                 <DropdownMenuContent align="end" sideOffset={8} className="w-60 rounded-2xl border border-gray-200 bg-white shadow-xl p-1.5 z-50">
//                   <DropdownMenuLabel className="px-2 py-2">
//                     <div className="flex items-center gap-2.5">
//                       <Avatar className="h-9 w-9 border-2 border-gray-200">
//                         <AvatarImage src={getAvatarUrl(user?.avatar)} />
//                         <AvatarFallback className="bg-gray-200 text-gray-700 text-xs font-bold">
//                           {getUserInitials()}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="min-w-0">
//                         <p className="text-sm font-semibold text-black truncate">{user?.fullname || 'Profile'}</p>
//                         <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
//                         {userRole !== 'user' && (
//                           <span className="inline-block mt-0.5 text-[9px] font-semibold uppercase bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">
//                             {userRole}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </DropdownMenuLabel>

//                   <DropdownMenuSeparator className="my-1 bg-gray-100" />

//                   {[
//                     { to: profileRoute, icon: User, label: 'Profile' },
//                     { to: userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//                   ].map((item) => (
//                     <DropdownMenuItem key={item.to} asChild>
//                       <Link to={item.to} className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-150">
//                         <item.icon className="h-3.5 w-3.5 text-gray-400" />
//                         {item.label}
//                       </Link>
//                     </DropdownMenuItem>
//                   ))}

//                   <DropdownMenuSeparator className="my-1 bg-gray-100" />
//                   <DropdownMenuItem onClick={logoutHandler} className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer transition-all duration-150">
//                     <LogOut className="h-3.5 w-3.5" />
//                     Sign out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Link to="/login">
//                 <button className="h-8 px-4 text-[13px] font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400/50">
//                   Log in
//                 </button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
