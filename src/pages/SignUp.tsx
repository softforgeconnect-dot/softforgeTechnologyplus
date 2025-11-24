import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Rocket, X, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as Yup from 'yup';

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[#@$!%*?&]/, 'Password must contain a special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  companyCode: Yup.string()
    .matches(/^[A-Z0-9]{6}$/, 'Company code must be 6 alphanumeric characters (uppercase)')
    .required('Company code is required'),
});

type FormData = Yup.InferType<typeof validationSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyCode: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Real-time validation
    validationSchema
      .validateAt(name, { ...formData, [name]: value })
      .then(() => {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      })
      .catch((err: Yup.ValidationError) => {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      });
  };

  // Simulated API call
  const simulateSignup = async (data: FormData): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 30% chance of failure
        const isSuccess = Math.random() > 0.3;
        if (isSuccess) {
          resolve({ success: true, message: 'Account created successfully!' });
        } else {
          resolve({ success: false, message: 'Signup failed. Email already exists or server error.' });
        }
      }, 1500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      await validationSchema.validate(formData, { abortEarly: false });

      // Simulate API call
      const result = await simulateSignup(formData);

      if (result.success) {
        alert('Success! ' + result.message);
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          companyCode: '',
        });
        setTouched({});
        setErrors({});
        // Optional: navigate('/dashboard');
      } else {
        alert('Signup Failed! ' + result.message);
      }
    } catch (err: any) {
      // Validation errors
      const validationErrors: Partial<FormData> = {};
      err.inner.forEach((error: Yup.ValidationError) => {
        if (error.path) validationErrors[error.path as keyof FormData] = error.message;
      });
      setErrors(validationErrors);
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        companyCode: true,
      });
      alert('Please fix the errors in the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md relative">
        {/* RED ANIMATED CLOSE BUTTON */}
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
              {/* Full Name */}
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
                    className={`pl-10 bg-white/10 border ${
                      touched.name && errors.name ? 'border-red-500' : 'border-black/20'
                    } text-black placeholder-gray-400 focus:border-primary`}
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
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
                    className={`pl-10 bg-white/10 border ${
                      touched.email && errors.email ? 'border-red-500' : 'border-black/20'
                    } text-black placeholder-gray-400 focus:border-primary`}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Company Code */}
              <div className="space-y-2">
                <Label htmlFor="companyCode" className="text-black">Company Code</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="companyCode"
                    name="companyCode"
                    type="text"
                    placeholder="ABC123"
                    value={formData.companyCode}
                    onChange={handleChange}
                    className={`pl-10 bg-white/10 border uppercase ${
                      touched.companyCode && errors.companyCode ? 'border-red-500' : 'border-black/20'
                    } text-black placeholder-gray-400 focus:border-primary`}
                    maxLength={6}
                  />
                </div>
                {touched.companyCode && errors.companyCode && (
                  <p className="text-red-400 text-xs mt-1">{errors.companyCode}</p>
                )}
                <p className="text-xs text-gray-400">6-character uppercase code (e.g., ABC123)</p>
              </div>

              {/* Password */}
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
                    className={`pl-10 pr-10 bg-white/10 border ${
                      touched.password && errors.password ? 'border-red-500' : 'border-black/20'
                    } text-black placeholder-gray-400 focus:border-primary`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
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
                    className={`pl-10 pr-10 bg-white/10 border ${
                      touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-black/20'
                    } text-black placeholder-gray-400 focus:border-primary`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms */}
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-hero relative"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
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