import { useState, useEffect } from 'react';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Home, Menu, X, LogOut, User,
  ChevronDown, Map, GraduationCap
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getData } from '@/context/userContext';
import axios from 'axios';
import { toast } from 'sonner';
import API from '@/utils/api';

const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) return null;
  if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')) {
    return avatarPath;
  }
  const base = API.replace(/\/+$/, '');
  const path = avatarPath.replace(/^\/+/, '');
  return `${base}/${path}`;
};

const Navbar = () => {
  const { user, setUser } = getData();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const userRole = user?.role || 'user';

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close drawer on resize to large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const publicNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Map },
  ];

  const userNavItems = [
    { name: 'Dashboard', path: '/user/dashboard', icon: LayoutDashboard },
  ];

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  ];

  let navItems;
  if (user) {
    navItems = userRole === 'admin' ? adminNavItems : userNavItems;
  } else {
    navItems = publicNavItems;
  }

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${API}/user/logout`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data.success) {
        setUser(null);
        toast.success(res.data.message);
        localStorage.clear();
        navigate('/');
      }
    } catch {
      toast.error('Logout failed');
    }
  };

  const getUserInitials = () => {
    if (user?.fullname) return user.fullname.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    if (user?.email) return user.email[0].toUpperCase();
    return 'U';
  };

  const getRoleBadge = () => (userRole === 'admin' ? 'A' : null);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    if (window.innerWidth < 1024) {
      setMobileOpen(!mobileOpen);
    }
  };

  const profileRoute = userRole === 'admin' ? '/admin/profile' : '/user/profile';

  return (
    <nav
      className={`
        sticky top-0 z-50 w-full
        transition-all duration-300
        ${isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-white'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px] gap-3">

          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleMenuClick}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-black hover:bg-gray-100 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
              aria-label="Toggle menu"
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-black text-white p-2 rounded-xl transition-transform group-hover:scale-105">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-semibold text-[1rem] tracking-tight hidden sm:block text-black">
                LMS
              </span>
            </Link>
          </div>

          {/* Right: user menu or Login */}
          <div className="flex items-center gap-1.5 shrink-0">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-gray-400/50">
                    <div className="relative">
                      <Avatar className="h-7 w-7 border-2 border-gray-300 group-hover:border-black transition-all">
                        <AvatarImage src={getAvatarUrl(user?.avatar)} />
                        <AvatarFallback className="bg-gray-200 text-gray-700 text-[10px] font-bold">
                          {getUserInitials()}
                          {getRoleBadge() && <span className="ml-0.5 text-[8px]">{getRoleBadge()}</span>}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                    </div>
                    <span className="hidden md:block text-[13px] font-medium text-gray-700 max-w-[90px] truncate">
                      {user?.fullname?.split(' ')[0] || 'Profile'}
                    </span>
                    <ChevronDown className="hidden md:block h-3.5 w-3.5 text-gray-400 group-hover:text-black transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" sideOffset={8} className="w-60 rounded-2xl border border-gray-200 bg-white shadow-xl p-1.5 z-50">
                  <DropdownMenuLabel className="px-2 py-2">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-9 w-9 border-2 border-gray-200">
                        <AvatarImage src={getAvatarUrl(user?.avatar)} />
                        <AvatarFallback className="bg-gray-200 text-gray-700 text-xs font-bold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-black truncate">{user?.fullname || 'Profile'}</p>
                        <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                        {userRole !== 'user' && (
                          <span className="inline-block mt-0.5 text-[9px] font-semibold uppercase bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">
                            {userRole}
                          </span>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="my-1 bg-gray-100" />

                  {[
                    { to: profileRoute, icon: User, label: 'Profile' },
                    { to: userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                  ].map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link to={item.to} className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-150">
                        <item.icon className="h-3.5 w-3.5 text-gray-400" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  <DropdownMenuItem onClick={logoutHandler} className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer transition-all duration-150">
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <button className="h-8 px-4 text-[13px] font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400/50">
                  Log in
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[150] bg-black/30 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`
          fixed inset-y-0 left-0 z-[200] lg:hidden
          w-[300px] max-w-[88vw]
          bg-white border-r border-gray-200
          flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-2xl shadow-black/10
        `}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
            <div className="bg-black text-white p-2 rounded-xl">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-bold text-[1.05rem] tracking-wide text-black">
              LMS
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-black transition-all duration-200 active:scale-95"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 px-3 pb-2">
            {user ? 'Navigation' : 'Menu'}
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200
                ${isActive
                  ? 'bg-gray-200 text-black border border-gray-300'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
                }
              `}
              onClick={() => setMobileOpen(false)}
            >
              {({ isActive }) => (
                <>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-gray-300 text-black' : 'text-gray-400'}`}>
                    <item.icon className={`h-3.5 w-3.5 ${isActive ? 'text-black' : ''}`} />
                  </div>
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="px-3 pb-5 pt-3 border-t border-gray-200 space-y-2">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <div className="relative">
                  <Avatar className="h-8 w-8 border-2 border-gray-300">
                    <AvatarImage src={getAvatarUrl(user?.avatar)} />
                    <AvatarFallback className="bg-gray-200 text-gray-700 text-[10px] font-bold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-black truncate">{user?.fullname || user?.email}</p>
                  <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                  {userRole !== 'user' && (
                    <span className="inline-block mt-0.5 text-[9px] font-semibold uppercase bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">
                      {userRole}
                    </span>
                  )}
                </div>
              </div>

              <Link
                to={profileRoute}
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200 active:scale-98"
              >
                <User className="h-4 w-4 text-gray-400" /> View Profile
              </Link>

              <button
                onClick={() => { logoutHandler(); setMobileOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 active:scale-98"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <button className="w-full py-2.5 rounded-xl text-[13px] font-medium text-gray-700 hover:text-black border border-gray-300 hover:border-gray-400 transition-all duration-200 active:scale-98">
                Log in
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;  
