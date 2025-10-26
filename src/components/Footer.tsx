import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Rocket } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Softforge Technology </span>
            </div>
            <p className="text-gray-300">
              Shooting for the moon and landing among the stars. Your digital transformation partner.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-300 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><NavLink to="/" className="text-gray-300 hover:text-primary transition-colors">Home</NavLink></li>
              <li><NavLink to="/services" className="text-gray-300 hover:text-primary transition-colors">Services</NavLink></li>
              <li><NavLink to="/digital-marketing" className="text-gray-300 hover:text-primary transition-colors">Digital Marketing</NavLink></li>
              <li><NavLink to="/blog" className="text-gray-300 hover:text-primary transition-colors">Blog</NavLink></li>
              <li><NavLink to="/career" className="text-gray-300 hover:text-primary transition-colors">Career</NavLink></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Web Development</li>
              <li className="text-gray-300">Mobile Apps</li>
              <li className="text-gray-300">SEO Optimization</li>
              <li className="text-gray-300">Social Media Marketing</li>
              <li className="text-gray-300">Brand Strategy</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-300">softforgeconnect@gmail.com</span>
                <span className="text-gray-300">anilz@softforge.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-300">9156780778</span>
                <span className="text-gray-300">8459007841</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-300">Office No 103 Raj Mall ,Anand Nagar, Nanded , Maharashtra , India - 431603</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Softforge Technology . All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;