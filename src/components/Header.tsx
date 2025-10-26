import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Digital Marketing', path: '/digital-marketing' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Career', path: '/career' },
    { name: 'Contact', path: '/contact' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Company Logo & Name */}
          <NavLink to="/" className="flex items-center space-x-2 text-white hover:text-primary transition-colors">
            <Rocket className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Softforge Techology Pvt.Ltd</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link text-white hover:text-primary transition-all duration-300 ${
                    isActive ? 'text-primary' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink
              to="/signin"
              className="text-white hover:text-primary transition-colors"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="btn-glass"
            >
              Sign Up
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-purple-500/20">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-4 text-white hover:text-primary transition-colors ${
                      isActive ? 'text-primary bg-purple-500/10' : ''
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-purple-500/20">
                <NavLink
                  to="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 px-4 text-white hover:text-primary transition-colors"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-glass mx-4"
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