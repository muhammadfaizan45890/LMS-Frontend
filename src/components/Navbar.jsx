// import React, { useEffect, useState } from 'react'
// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

// import {
//   BookA,
//   LogOut,
//   User,
//   Menu,
//   X,
//   LayoutDashboard,
//   ShieldCheck,
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
//               <ShieldCheck size={18} />
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
// <NavLink to="/about">
//   <DropdownMenuItem className="cursor-pointer rounded-xl py-3">
//     <BookA className="mr-2 h-4 w-4" />
//     About
//   </DropdownMenuItem>
// </NavLink>

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





import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  BookA,
  LogOut,
  User,
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
  Home,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";

import axios from "axios";
import { toast } from "sonner";

import API from "../utils/api";
import { getData } from "@/context/userContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Navbar = () => {

  const { user, setUser } = getData();

  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem("accessToken");

  const [isScrolled, setIsScrolled] = useState(false);

  // ================= SCROLL EFFECT =================
  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

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
      );

      if (res.data.success) {

        localStorage.clear();

        setUser(null);

        toast.success(
          res.data.message || "Logout successful"
        );

        navigate("/login");
      }

    } catch (error) {

      toast.error("Logout failed");

    }
  };

  // ================= ROUTES =================
  const dashboardRoute =
    user?.role === "admin"
      ? "/admin/dashboard"
      : "/user/dashboard";

  const profileRoute =
    user?.role === "admin"
      ? "/admin/profile"
      : "/user/profile";

  // ================= ACTIVE STYLE =================
  const navLinkClass = ({ isActive }) =>
    `
      relative
      text-sm lg:text-base
      font-medium
      transition-all duration-300
      hover:text-black

      ${
        isActive
          ? "text-black"
          : "text-zinc-600"
      }
    `;

  return (

    <header
      className={`
        fixed top-0 left-0 w-full z-[999]
        transition-all duration-500

        ${
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl border-b shadow-sm"
            : "bg-white border-b"
        }
      `}
    >

      {/* ================= CONTAINER ================= */}
      <div
        className="
          max-w-7xl mx-auto
          h-16 lg:h-20
          px-4 sm:px-6 lg:px-8
          flex items-center justify-between
        "
      >

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-8">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >

            <div
              className="
                h-11 w-11
                rounded-2xl
                bg-black text-white
                flex items-center justify-center
                shadow-lg
                transition-all duration-300
                group-hover:scale-105
                group-hover:rotate-3
              "
            >
              <ShieldCheck size={20} />
            </div>

            <div className="hidden sm:block">

              <h1
                className="
                  text-lg lg:text-xl
                  font-bold tracking-tight
                  text-black
                "
              >
                Learning LMS
              </h1>

              <p className="text-xs text-zinc-500">
                Management System
              </p>

            </div>

          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">

            <NavLink
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={navLinkClass}
            >
              About
            </NavLink>

            <NavLink
              to="/courses"
              className={navLinkClass}
            >
              Courses
            </NavLink>

            <NavLink
              to="/contact"
              className={navLinkClass}
            >
              Contact
            </NavLink>

          </nav>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-3">

          {user ? (

            <>
              {/* NOTIFICATION */}
              <button
                className="
                  hidden sm:flex
                  h-10 w-10
                  rounded-xl
                  items-center justify-center
                  border
                  hover:bg-zinc-100
                  transition
                "
              >
                <Bell size={18} />
              </button>

              {/* SETTINGS */}
              <button
                className="
                  hidden sm:flex
                  h-10 w-10
                  rounded-xl
                  items-center justify-center
                  border
                  hover:bg-zinc-100
                  transition
                "
              >
                <Settings size={18} />
              </button>

              {/* PROFILE MENU */}
              <DropdownMenu>

                <DropdownMenuTrigger asChild>

                  <button
                    className="
                      flex items-center gap-3
                      rounded-2xl
                      border
                      px-2 py-1.5
                      hover:shadow-md
                      transition-all duration-300
                    "
                  >

                    <Avatar
                      className="
                        h-10 w-10
                        ring-2 ring-zinc-200
                      "
                    >

                      <AvatarImage src={user?.avatar} />

                      <AvatarFallback
                        className="
                          bg-black text-white
                        "
                      >
                        {user?.username
                          ?.slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>

                    </Avatar>

                    <div className="hidden md:block text-left">

                      <h2
                        className="
                          text-sm font-semibold
                          text-black leading-none
                        "
                      >
                        {user?.username}
                      </h2>

                      <p
                        className="
                          text-xs text-zinc-500 capitalize
                          mt-1
                        "
                      >
                        {user?.role}
                      </p>

                    </div>

                    <ChevronRight
                      size={16}
                      className="rotate-90 text-zinc-400"
                    />

                  </button>

                </DropdownMenuTrigger>

                {/* DROPDOWN */}
                <DropdownMenuContent
                  align="end"
                  className="
                    w-72
                    rounded-3xl
                    p-3
                    shadow-2xl
                    border
                    mt-3
                  "
                >

                  {/* USER INFO */}
                  <DropdownMenuLabel>

                    <div className="flex items-center gap-3">

                      <Avatar className="h-14 w-14">

                        <AvatarImage src={user?.avatar} />

                        <AvatarFallback
                          className="
                            bg-black text-white
                          "
                        >
                          {user?.username
                            ?.slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>

                      </Avatar>

                      <div>

                        <h1
                          className="
                            font-bold text-black
                            text-base
                          "
                        >
                          {user?.username}
                        </h1>

                        <p
                          className="
                            text-sm text-zinc-500
                            capitalize
                          "
                        >
                          {user?.role}
                        </p>

                      </div>

                    </div>

                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {/* DASHBOARD */}
                  <DropdownMenuItem
                    onClick={() => navigate(dashboardRoute)}
                    className="
                      cursor-pointer
                      rounded-2xl
                      py-3
                    "
                  >

                    <LayoutDashboard
                      className="mr-3"
                      size={18}
                    />

                    Dashboard

                  </DropdownMenuItem>

                  {/* PROFILE */}
                  <DropdownMenuItem
                    onClick={() => navigate(profileRoute)}
                    className="
                      cursor-pointer
                      rounded-2xl
                      py-3
                    "
                  >

                    <User
                      className="mr-3"
                      size={18}
                    />

                    Profile

                  </DropdownMenuItem>

                  {/* ABOUT */}
                  <DropdownMenuItem
                    onClick={() => navigate("/about")}
                    className="
                      cursor-pointer
                      rounded-2xl
                      py-3
                    "
                  >

                    <BookA
                      className="mr-3"
                      size={18}
                    />

                    About

                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* LOGOUT */}
                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="
                      cursor-pointer
                      rounded-2xl
                      py-3
                      text-red-600
                      focus:text-red-600
                    "
                  >

                    <LogOut
                      className="mr-3"
                      size={18}
                    />

                    Logout

                  </DropdownMenuItem>

                </DropdownMenuContent>

              </DropdownMenu>
            </>

          ) : (

            <div className="hidden md:flex items-center gap-3">

              <Link
                to="/login"
                className="
                  px-5 py-2.5
                  rounded-2xl
                  border
                  font-medium
                  hover:bg-zinc-100
                  transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  px-5 py-2.5
                  rounded-2xl
                  bg-black text-white
                  font-medium
                  hover:bg-zinc-800
                  transition
                "
              >
                Register
              </Link>

            </div>

          )}

          {/* ================= MOBILE MENU ================= */}
          <Sheet>

            <SheetTrigger asChild>

              <button
                className="
                  lg:hidden
                  h-11 w-11
                  rounded-xl
                  border
                  flex items-center justify-center
                "
              >
                <Menu size={22} />
              </button>

            </SheetTrigger>

            <SheetContent
              side="left"
              className="
                w-[320px]
                p-0
              "
            >

              <div
                className="
                  h-full
                  flex flex-col
                "
              >

                {/* TOP */}
                <div
                  className="
                    p-6
                    border-b
                  "
                >

                  <Link
                    to="/"
                    className="
                      flex items-center gap-3
                    "
                  >

                    <div
                      className="
                        h-11 w-11
                        rounded-2xl
                        bg-black text-white
                        flex items-center justify-center
                      "
                    >
                      <ShieldCheck size={20} />
                    </div>

                    <div>

                      <h1
                        className="
                          font-bold text-lg
                        "
                      >
                        Learning LMS
                      </h1>

                      <p
                        className="
                          text-xs text-zinc-500
                        "
                      >
                        Management System
                      </p>

                    </div>

                  </Link>

                </div>

                {/* LINKS */}
                <div
                  className="
                    flex-1
                    p-6
                    flex flex-col gap-3
                  "
                >

                  <NavLink
                    to="/"
                    className="
                      flex items-center gap-3
                      px-4 py-3
                      rounded-2xl
                      hover:bg-zinc-100
                      transition
                    "
                  >

                    <Home size={20} />

                    Home

                  </NavLink>

                  <NavLink
                    to="/about"
                    className="
                      flex items-center gap-3
                      px-4 py-3
                      rounded-2xl
                      hover:bg-zinc-100
                      transition
                    "
                  >

                    <BookA size={20} />

                    About

                  </NavLink>

                  {user && (

                    <>
                      <button
                        onClick={() =>
                          navigate(dashboardRoute)
                        }
                        className="
                          flex items-center gap-3
                          px-4 py-3
                          rounded-2xl
                          hover:bg-zinc-100
                          transition
                        "
                      >

                        <LayoutDashboard size={20} />

                        Dashboard

                      </button>

                      <button
                        onClick={() =>
                          navigate(profileRoute)
                        }
                        className="
                          flex items-center gap-3
                          px-4 py-3
                          rounded-2xl
                          hover:bg-zinc-100
                          transition
                        "
                      >

                        <User size={20} />

                        Profile

                      </button>

                    </>
                  )}

                </div>

                {/* BOTTOM */}
                <div
                  className="
                    p-6 border-t
                  "
                >

                  {user ? (

                    <button
                      onClick={logoutHandler}
                      className="
                        w-full
                        flex items-center justify-center gap-3
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        py-3 rounded-2xl
                        font-medium
                        transition
                      "
                    >

                      <LogOut size={20} />

                      Logout

                    </button>

                  ) : (

                    <Link
                      to="/login"
                      className="
                        w-full block
                        text-center
                        bg-black text-white
                        py-3 rounded-2xl
                        font-medium
                      "
                    >
                      Login
                    </Link>

                  )}

                </div>

              </div>

            </SheetContent>

          </Sheet>

        </div>

      </div>

    </header>
  );
};

export default Navbar;
