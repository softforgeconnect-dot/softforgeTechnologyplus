import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// ✅ Correct way: Import the logo so Vite processes it correctly in production
import logo from '@/assets/logo2.jpg';   // Works 100% on Hostinger, Vercel, Netlify, etc.

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Digital Marketing', path: '/digital-marketing' },
    { name: 'Services', path: '/services' },
    { name: 'Internship', path: '/internship' },
    { name: 'Career', path: '/career' },
    { name: 'Contact', path: '/contact' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Company Logo & Name */}
          <NavLink to="/" className="flex items-center space-x-3 text-white hover:text-primary transition-all">
            {/* ✅ Now the logo loads everywhere! */}
            <img
              src={logo}
              alt="Softforge Technology Logo"
              className="h-12 w-12 object-contain rounded-full border-2 border-purple-400/30 shadow-lg"
            />
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              Softforge Technology Pvt Ltd
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link text-white hover:text-primary transition-all duration-300 font-medium ${
                    isActive ? 'text-primary font-bold' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink
              to="/signin"
              className="text-white hover:text-primary transition-colors font-medium"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="px-6 py-2 bg-primary/20 backdrop-blur-sm border border-primary/50 text-white rounded-full hover:bg-primary/30 transition-all"
            >
              Sign Up
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-primary transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-purple-500/20 mt-2 py-4 bg-black/40 backdrop-blur-md">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `internship py-3 px-6 text-lg font-medium transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10 border-l-4 border-primary'
                        : 'text-white hover:text-primary hover:bg-white/5'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="pt-4 mt-4 border-t border-purple-500/20  space-y-3 px-6">
                <NavLink
                  to="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="internship text-white hover:text-primary font-medium"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="internship text-center py-3 bg-primary/20 border border-primary/50 rounded-lg text-white font-semibold hover:bg-primary/30 transition"
                >
                  Sign Up
                </NavLink>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;