import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Rocket, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import * as Yup from 'yup';
import CompDashboard from './company/CompDashboard';

// Yup Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setShowErrorDialog(false);

    try {
      // Validate with Yup
      await validationSchema.validate(formData, { abortEarly: false });

      // Mock authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock: Check credentials (replace with real API)
      const isValidUser =
        //formData.email === 'softforgeconnect@gmail.com' &&
        formData.email === 'softforgeconnect@gmail.com' &&
        formData.password === '12345Softforge#';

      if (isValidUser) {
        console.log('Sign in successful:', formData);
        setFormData({ email: '', password: '' });
        navigate('/CompDashboard');
      } else {
        // Show dialog on wrong credentials
        setShowErrorDialog(true);
      }
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err: any) => {
          if (err.path) validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Login error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  // Auto-close dialog after 3 seconds
  useEffect(() => {
    if (showErrorDialog) {
      const timer = setTimeout(() => {
        setShowErrorDialog(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showErrorDialog]);

  return (
    <>
      <div className="min-h-screen gradient-hero flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-md relative">
          {/* CLOSE BUTTON */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute -top-12 right-0 p-1 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
          >
            <X className="h-4 w-4 text-white" />
          </Button>

          <Card className="glass-card border-purple-500/20 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-primary/20 rounded-full">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
              <CardDescription className="text-black">
                Sign in to your Softforge Tech account and access your dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
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
                      disabled={isLoading}
                      className={`pl-10 bg-white/10 border ${
                        errors.email ? 'border-red-500' : 'border-black/20'
                      } text-black placeholder-gray-400 focus:border-primary`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-black">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`pl-10 pr-10 bg-white/10 border ${
                        errors.password ? 'border-red-500' : 'border-black/20'
                      } text-black placeholder-gray-400 focus:border-primary`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary"
                      disabled={isLoading}
                    />
                    <label htmlFor="remember" className="text-gray-300">Remember me</label>
                  </div>
                  <NavLink
                    to="/forgot-password"
                    className="text-primary hover:text-primary-light disabled:opacity-50"
                    style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                  >
                    Forgot password?
                  </NavLink>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full btn-hero"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-400 bg-transparent">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  disabled={isLoading}
                >
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  disabled={isLoading}
                >
                  GitHub
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-gray-300">
                Don't have an account?{' '}
                <NavLink to="/signup" className="text-primary hover:text-primary-light font-medium">
                  Sign up here
                </NavLink>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Invalid Credentials
            </AlertDialogTitle>
            <AlertDialogDescription>
              The email or password you entered is incorrect. Please try again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorDialog(false)}>
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SignIn;