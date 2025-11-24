import Footer from '@/components/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CompDashboard = () => {
  const navigate = useNavigate(); // Define navigate hook

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  // Sample navigation links for NavLink
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Employees', href: '/employees' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black">
      {/* Close Button */}
      <Button
        type="button"
        variant="ghost"
        size="lg"
        onClick={handleClose}
        className="absolute top-4 right-4 p-1 h-8 w-8 rounded-full bg-red hover:bg-red border border-red"
      >
        ✕ {/* Added close icon for clarity */}
      </Button>

      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4 justify-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `text-white px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-purple-700' : 'hover:bg-purple-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-hero text-white mb-5 font-semibold text-center pt-16">
        Employee Management Dashboard
      </p>
      <main className="pt-16">
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <p className="text-subtitle text-gray-200 max-w-3xl mx-auto">
              Join our team and shoot for the stars together
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-foreground mb-8">Join Our Mission</h2>
              <p className="text-xl text-muted-foreground">
                Career opportunities coming soon. Be part of something stellar!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CompDashboard;