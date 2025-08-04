
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { title: language === 'en' ? "Home" : "الرئيسية", path: "/" },
    { title: language === 'en' ? "About Us" : "من نحن", path: "/about" },
    { title: language === 'en' ? "Programs" : "البرامج", path: "/programs" },
    { title: language === 'en' ? "Events" : "الفعاليات", path: "/events" },
    { title: language === 'en' ? "Gallery" : "المعرض", path: "/gallery" },
    { title: language === 'en' ? "Achievements" : "الإنجازات", path: "/achievements" },
    { title: language === 'en' ? "Contact" : "اتصل بنا", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-myrobot-orange text-white flex items-center justify-center font-fredoka text-xl">MR</div>
          <span className="text-xl font-bold font-fredoka text-myrobot-navy">My Robot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.title}
            </Link>
          ))}
          
          <button
            onClick={toggleLanguage}
            className="p-2 ml-2 text-myrobot-navy hover:text-myrobot-orange rounded-full transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={20} />
          </button>
        </nav>

        <div className="hidden md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {user?.role === 'parent' && (
                <Link to="/parent/dashboard">
                  <Button className="btn-primary mr-2">
                    {language === 'en' ? "Dashboard" : "لوحة التحكم"}
                  </Button>
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link to="/admin/dashboard">
                  <Button className="btn-primary mr-2">
                    {language === 'en' ? "Admin Dashboard" : "لوحة الإدارة"}
                  </Button>
                </Link>
              )}
              {user?.role === 'student' && (
                <Link to="/student/dashboard">
                  <Button className="btn-primary mr-2">
                    {language === 'en' ? "Student Dashboard" : "لوحة الطالب"}
                  </Button>
                </Link>
              )}
              {user?.role === 'coordinator' && (
                <Link to="/coordinator/dashboard">
                  <Button className="btn-primary mr-2">
                    {language === 'en' ? "Coordinator Dashboard" : "لوحة المنسق"}
                  </Button>
                </Link>
              )}
              <Button variant="outline" className="btn-outline" onClick={logout}>
                {language === 'en' ? "Logout" : "تسجيل الخروج"}
              </Button>
            </div>
          ) : (
            <>
              <Link to="/auth/register">
                <Button className="btn-primary mr-2">
                  {language === 'en' ? "Register" : "تسجيل"}
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button variant="outline" className="btn-outline">
                  {language === 'en' ? "Login" : "تسجيل الدخول"}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleLanguage}
            className="p-2 mr-2 text-myrobot-navy hover:text-myrobot-orange rounded-full transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={20} />
          </button>
          
          <button className="text-myrobot-navy p-2" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20">
          <nav className="flex flex-col items-center space-y-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium ${location.pathname === link.path ? "text-myrobot-orange" : "text-myrobot-navy"}`}
                onClick={toggleMenu}
              >
                {link.title}
              </Link>
            ))}
            <div className="flex flex-col space-y-4 w-full items-center mt-4">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-4 w-3/4">
                  {user?.role === 'parent' && (
                    <Link to="/parent/dashboard" onClick={toggleMenu}>
                      <Button className="btn-primary w-full">
                        {language === 'en' ? "Dashboard" : "لوحة التحكم"}
                      </Button>
                    </Link>
                  )}
                  {user?.role === 'admin' && (
                    <Link to="/admin/dashboard" onClick={toggleMenu}>
                      <Button className="btn-primary w-full">
                        {language === 'en' ? "Admin Dashboard" : "لوحة الإدارة"}
                      </Button>
                    </Link>
                  )}
                  {user?.role === 'student' && (
                    <Link to="/student/dashboard" onClick={toggleMenu}>
                      <Button className="btn-primary w-full">
                        {language === 'en' ? "Student Dashboard" : "لوحة الطالب"}
                      </Button>
                    </Link>
                  )}
                  {user?.role === 'coordinator' && (
                    <Link to="/coordinator/dashboard" onClick={toggleMenu}>
                      <Button className="btn-primary w-full">
                        {language === 'en' ? "Coordinator Dashboard" : "لوحة المنسق"}
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" className="btn-outline w-full" onClick={() => { logout(); toggleMenu(); }}>
                    {language === 'en' ? "Logout" : "تسجيل الخروج"}
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/auth/register" className="w-3/4" onClick={toggleMenu}>
                    <Button className="btn-primary w-full">
                      {language === 'en' ? "Register" : "تسجيل"}
                    </Button>
                  </Link>
                  <Link to="/auth/login" className="w-3/4" onClick={toggleMenu}>
                    <Button variant="outline" className="btn-outline w-full">
                      {language === 'en' ? "Login" : "تسجيل الدخول"}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
