import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
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
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="Enter the subject" 
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Enter your message here..."
                      className="w-full min-h-[120px]"
                    />
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Send Message
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
                          Office No 103 Raj Mall ,Anand Nagar<br />
                          Nanded , Maharashtra <br />
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
                          +91 8459007841 <br />
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
    </div>
  );
};

export default Contact;