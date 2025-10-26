import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Rocket, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Sign up data:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md relative">
        {/* RED ANIMATED CLOSE BUTTON - TOP RIGHT */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute -top-12 right-0 p-2 h-10 w-10 rounded-full bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/50 shadow-lg"
          >
            <X className="h-5 w-5 text-red-400 hover:text-red-200" />
          </Button>
        </motion.div>

        <Card className="glass-card border-purple-500/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-primary/20 rounded-full">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Join A Unique Tech</CardTitle>
            <CardDescription className="text-black">
              Create your account and start your journey to the stars
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-black">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 bg-white/10 border-black/20 text-black placeholder-gray-400 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-white/10 border-black/20 text-black placeholder-gray-400 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-black">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-white/10 border-black/20 text-black placeholder-gray-400 focus:border-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-black">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-white/10 border-black/20 text-black placeholder-gray-400 focus:border-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-primary bg-white/10 border-black/20 rounded focus:ring-primary"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the{' '}
                  <NavLink to="/terms" className="text-primary hover:text-primary-light">
                    Terms of Service
                  </NavLink>{' '}
                  and{' '}
                  <NavLink to="/privacy" className="text-primary hover:text-primary-light">
                    Privacy Policy
                  </NavLink>
                </label>
              </div>

              <Button type="submit" className="w-full btn-hero">
                Create Account
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400 bg-transparent">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Google
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                GitHub
              </Button>
            </div>

            <div className="text-center text-sm text-gray-300">
              Already have an account?{' '}
              <NavLink to="/signin" className="text-primary hover:text-primary-light font-medium">
                Sign in here
              </NavLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;