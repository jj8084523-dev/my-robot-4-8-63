
import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronLeft, ChevronRight, ChevronDown, Home, Calendar, Users, Settings, Bell } from "lucide-react";
import NotificationCenter from "@/components/admin/NotificationCenter";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDirection = () => {
    setIsRTL(!isRTL);
    // In a real app, this would update the HTML dir attribute and load RTL styles
    document.documentElement.dir = isRTL ? "ltr" : "rtl";
  };

  const mainNavItems = [
    {
      title: "Dashboard",
      icon: <Home size={20} />,
      path: "/admin/dashboard",
    },
    {
      title: "Courses",
      icon: <Calendar size={20} />,
      path: "/admin/courses",
    },
    {
      title: "Users",
      icon: <Users size={20} />,
      path: "/admin/users",
    },
    {
      title: "Attendance",
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      path: "/admin/attendance",
    },
    {
      title: "Events",
      icon: <Calendar size={20} />,
      path: "/admin/events",
    },
    {
      title: "Payments",
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 14H3M21 4H3M15 19H9M17 9H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      path: "/admin/payments",
    },
    {
      title: "Coordinators",
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M23 21V19C23 16.7909 21.2091 15 19 15M19 15C16.7909 15 15 13.2091 15 11C15 8.79086 16.7909 7 19 7M19 7C21.2091 7 23 8.79086 23 11C23 13.2091 21.2091 15 19 15M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      path: "/admin/coordinators",
    },
    {
      title: "Reports",
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 6V21M8 13H15M8 6L3 11M8 6L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 16V3M16 16L11 11M16 16L21 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      path: "/admin/reports",
    },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className={`min-h-screen bg-gray-50 ${isRTL ? "font-cairo" : "font-poppins"}`}>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-myrobot-navy text-myrobot-white p-0 w-64">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-myrobot-orange text-white flex items-center justify-center font-fredoka text-lg">MR</div>
                  <span className="text-lg font-bold font-fredoka">My Robot</span>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 py-4 overflow-y-auto">
              <div className="px-3 py-2">
                <h3 className="mb-2 px-4 text-xs uppercase text-white/60">Main Navigation</h3>
                <nav className="space-y-1">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        location.pathname === item.path
                          ? "bg-sidebar-accent text-white"
                          : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {item.icon}
                      <span className="ms-3">{item.title}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ms-3">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-white/60">admin@myrobot.com</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 ${
          isRTL ? "right-0" : "left-0"
        } z-20 hidden md:flex flex-col transition-all bg-myrobot-navy text-myrobot-white ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className={`flex items-center justify-between p-4 ${isSidebarCollapsed ? "justify-center" : "border-b border-white/10"}`}>
          {!isSidebarCollapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-myrobot-orange text-white flex items-center justify-center font-fredoka text-lg">MR</div>
              <span className="text-lg font-bold font-fredoka">My Robot</span>
            </Link>
          )}
          {isSidebarCollapsed && (
            <div className="w-8 h-8 rounded-full bg-myrobot-orange text-white flex items-center justify-center font-fredoka text-lg">
              MR
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            {isRTL 
              ? (isSidebarCollapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />)
              : (isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />)
            }
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center ${isSidebarCollapsed ? "justify-center" : ""} px-4 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-white"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {item.icon}
                {!isSidebarCollapsed && <span className="ms-3">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className={`p-4 ${!isSidebarCollapsed && "border-t border-white/10"}`}>
          {isSidebarCollapsed ? (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
              <div className="ms-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-white/60">admin@myrobot.com</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`min-h-screen ${
          isSidebarCollapsed ? "md:ms-16" : "md:ms-64"
        } ${isRTL && (isSidebarCollapsed ? "md:me-16 md:ms-0" : "md:me-64 md:ms-0")}`}
      >
        {/* Top Navigation */}
        <header className="sticky top-0 z-10 bg-white border-b shadow-sm h-16">
          <div className="flex items-center justify-between px-4 h-full">
            <div className="md:hidden">
              {/* Mobile sidebar trigger is separate */}
            </div>
            
            <div className="flex-1 md:flex md:items-center md:justify-between">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-myrobot-navy">
                  Admin Dashboard
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Language Toggle */}
                <Button 
                  variant="outline" 
                  className="text-sm"
                  onClick={toggleDirection}
                >
                  {isRTL ? "English" : "العربية"}
                </Button>
                
                {/* Notifications */}
                <NotificationCenter />
                
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin/profile" className="w-full cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/settings" className="w-full cursor-pointer">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="w-full cursor-pointer text-red-600 focus:text-red-600"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
