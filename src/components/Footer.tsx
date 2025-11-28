import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// ✅ Correct import – this will work on Hostinger, Vercel, Netlify, etc.
import logo from '@/assets/logo2.jpg';   // or .jpg if it's a JPG

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              {/* ✅ Logo now loads perfectly on live server! */}
              <img
                src={logo}
                alt="Softforge Technology Logo"
                className="h-12 w-12 object-contain rounded-full border-2 border-purple-500/30 shadow-lg"
              />
              <span className="text-2xl font-bold tracking-tight">
                Softforge Technology
              </span>
            </div>

            <p className="text-gray-300 max-w-xs leading-relaxed">
              "Empowering Innovation With Next-Gen Tech."
            </p>

            {/* Social Icons */}
            <div className="flex space-x-5">
              <a href="https://www.facebook.com/profile.php?id=61583879651595" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/softforge_technology?igsh=MTYzY3pxd21zbWlvcg==" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/softforge-technology-private-limited/" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><NavLink to="/" className="text-gray-300 hover:text-primary transition-colors block">Home</NavLink></li>
              <li><NavLink to="/services" className="text-gray-300 hover:text-primary transition-colors block">Services</NavLink></li>
              <li><NavLink to="/digital-marketing" className="text-gray-300 hover:text-primary transition-colors block">Digital Marketing</NavLink></li>
              <li><NavLink to="/internship" className="text-gray-300 hover:text-primary transition-colors block">Internship</NavLink></li>
              <li><NavLink to="/career" className="text-gray-300 hover:text-primary transition-colors block">Career</NavLink></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Web Development</li>
              <li>Mobile App Development</li>
              <li>SEO Optimization</li>
              <li>Social Media Marketing</li>
              <li>Brand Strategy & Design</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y space-y-5">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-4 text-sm">

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-gray-300">softforgeconnect@gmail.com</p>
                  <p className="text-gray-300">infosoftforge@softforgetechnology.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <div className="text-gray-300">
                  <span>+91 91567 80778</span><br />
                  <span>+91 84590 07841</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-gray-300 max-w-xs">
                  Office No 103, Raj Mall,<br />
                  Anand Nagar, Nanded,<br />
                  Maharashtra, India - 431603
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Softforge Technology Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;