import React, { useState } from 'react';
import Header from '@/components/Header'; 
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

const Contact = () => {
  // form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  function validate() {
    const err: { [k: string]: string } = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!form.email.trim()) err.email = 'Email is required';
    // basic email pattern
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) err.email = 'Enter a valid email';
    if (!form.message.trim()) err.message = 'Message is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    // Simulate send — do NOT navigate or open mail client.
    setTimeout(() => {
      setShowSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setSending(false);

      // auto-close after 5s
      setTimeout(() => setShowSuccess(false), 5000);
    }, 700);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black">
      <Header />
      <main className="pt-16">
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-hero text-white font-bold mb-6">Contact Us</h1>
            <p className="text-subtitle text-gray-200 max-w-3xl mx-auto">
              Ready to launch your project? Let's connect and make it happen
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">Send us a Message</h2>
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="w-full"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Enter the subject"
                      className="w-full"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message here..."
                      className="w-full min-h-[120px]"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    {errors.message && <p className="text-sm text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  <Button className="w-full" size="lg" type="submit" disabled={sending}>
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>

              {/* Company Information */}
              <div className="space-y-8">
                <div className="glass-card p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Company Information</h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Location</h3>
                        <p className="text-muted-foreground">
                          Softforge Technology Pvt. Ltd<br />
                          Office No 103 Raj Mall, Anand Nagar<br />
                          Nanded, Maharashtra<br />
                          India - 431603
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Email Address</h3>
                        <p className="text-muted-foreground">
                          anilz@softforge.com<br />
                          support@softforge.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Phone Numbers</h3>
                        <p className="text-muted-foreground">
                          +91 9156780778<br />
                          +91 8459007841<br />
                          +91 8446278682
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 10:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 5:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Success Modal (stays on same page) */}
      {showSuccess && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Submission successful"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            onClick={() => setShowSuccess(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="relative max-w-sm w-full mx-4 bg-white/6 border border-white/10 rounded-2xl p-6 text-center text-white z-10">
            <div className="flex items-center justify-center mb-3">
              <CheckCircle size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">Submitted successfully</h3>
            <p className="text-sm text-white/80 mb-4">Thanks — your enquiry has been received. We'll get back to you soon.</p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 rounded-full bg-white text-purple-900 font-semibold"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
