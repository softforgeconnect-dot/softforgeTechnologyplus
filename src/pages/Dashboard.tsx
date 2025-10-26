import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import directorImg from '@/assets/director.jpg';
import ceoImg from '@/assets/ceo.jpg';
import marketingHeadImg from '@/assets/marketing-head.jpg';
import technicaladviser from '@/assets/technical-adviser.jpg'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black ">
      <Header />
      <main>
        <Hero />
        
        {/* Welcome Section */}
        {/* <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Welcome to <span className="text-primary">A Unique Technology Pvt. Ltd</span> Dashboard
              </h2>
              <p className="text-xl text-primary font-semibold mb-4">
                Empowering Education with Innovative Mobile Solutions
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At A Unique Technology Pvt. Ltd, we are proud to lead the way in mobile application development for Android and iOS, 
                delivering cutting-edge solutions tailored for school student tracking and administration. This dashboard provides you 
                with real-time insights and tools to manage your educational ecosystem efficiently.
              </p>
            </div>
          </div>
        </section> */}

        {/* IT Partner Section */}
        <section className="py-20 bg-background ">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16 ">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Welcome<span className="text-primary">Softforge Technology</span> – Your IT Partner
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Softforge Technology, we are committed to transforming your business with innovative IT solutions. 
                With a strong foundation built on <span className="text-primary font-semibold">Expertise and Experience</span>, 
                we bring decades of industry knowledge to every project, ensuring you benefit from proven strategies and deep technical proficiency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="space-y-8">
                <div className="glass-card p-8 bg-primary/10">
                  <h3 className="text-2xl font-bold text-primary mb-4">Tailored Solutions for Your Success</h3>
                  <p className="text-black leading-relaxed">
                    We understand that every business is unique. That's why we offer <span className="text-primary">Tailored Solutions</span> designed 
                    to meet your specific needs. Whether you require custom software development, cloud integration, or IT consulting, 
                    our team crafts personalized strategies to drive your growth and efficiency.
                  </p>
                </div>

                <div className="glass-card p-8 bg-primary/10">
                  <h3 className="text-2xl font-bold text-primary mb-4">Harnessing Cutting-Edge Technology</h3>
                  <p className="text-black leading-relaxed">
                    Stay ahead of the curve with our use of <span className="text-primary">Cutting-Edge Technology</span>. We leverage the latest tools, 
                    frameworks, and platforms to deliver robust, future-ready solutions that empower your business in a rapidly evolving digital landscape.
                  </p>
                </div>

                <div className="glass-card p-8 bg-primary/10">
                  <h3 className="text-2xl font-bold text-primary mb-4">Uncompromising Quality Assurance</h3>
                  <p className="text-black leading-relaxed">
                    Your satisfaction is our priority. Through rigorous <span className="text-primary">Quality Assurance</span> processes, we ensure every 
                    deliverable meets the highest standards. Our meticulous testing and validation protocols guarantee flawless performance and reliability.
                  </p>
                </div>
              </div>

              <div className="space-y-8 ">
                <div className="glass-card p-8 bg-primary/10">
                  <h3 className="text-2xl font-bold text-primary mb-4">Committed to Timely Delivery</h3>
                  <p className="text-black leading-relaxed">
                    We value your time. With a focus on <span className="text-primary">Timely Delivery</span>, our streamlined workflows and dedicated teams 
                    ensure projects are completed on schedule without compromising quality. Expect consistent progress updates and punctual results.
                  </p>
                </div>

                <div className="glass-card p-8 bg-primary/10">
                  <h3 className="text-2xl font-bold text-primary mb-4">Transparent Communication at Every Step</h3>
                  <p className="text-black leading-relaxed">
                    Building trust is key to our success. We maintain <span className="text-primary">Transparent Communication</span> throughout the project 
                    lifecycle, providing clear insights, regular updates, and open dialogue. Our clients are always informed, involved, and confident.
                  </p>
                </div>

                <div className="glass-card p-8 bg-primary/10 border border-primary/20">
                  <h3 className="text-2xl font-bold text-primary mb-4">Let's Build Your Future Together</h3>
                  <p className="text-black leading-relaxed">
                    Partner with A Unique Technology to unlock the full potential of your IT infrastructure. Contact us today to discuss how our comprehensive 
                    services can elevate your business to new heights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section className="py-20 bg-purple-950/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Meet Our <span className="text-primary">Leadership Team</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Visionary leaders driving innovation and excellence in technology solutions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-10 max-w-8xl mx-auto">
              <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/30">
                  <img 
                    src={directorImg} 
                    alt="Director" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">P. Anil </h3>
                <p className="text-primary font-medium mb-3">Co-Founter And CEO</p>
                <p className="text-gray-300 text-sm">Leading strategic vision and operational excellence with 10+ years of industry experience.</p>
              </div>
              
              <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/30">
                  <img 
                    src={ceoImg} 
                    alt="CEO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Z. Anil </h3>
                <p className="text-primary font-medium mb-3">Director</p>
                <p className="text-gray-300 text-sm">Driving innovation and growth with expertise in mobile technology and educational solutions.</p>
              </div>
               <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/30">
                  <img 
                    src={technicaladviser} 
                    alt="CEO" 
                    className="w-full h-full object-cover "
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">K. Satish </h3>
                <p className="text-primary font-medium mb-3">Director – Technology & Solutions</p>
                <p className="text-gray-300 text-sm">At A Unique Technology Pvt. Ltd, our Technical Advisers play a pivotal role in driving innovation and excellence in our Android and iOS mobile application development, with a focus on school student tracking and administration solutions.</p>
              </div>
              
              <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/30">
                  <img 
                    src={marketingHeadImg} 
                    alt="Marketing Head" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">A. Mukesh</h3>
                <p className="text-primary font-medium mb-3">IT Head </p>
                <p className="text-gray-300 text-sm">Crafting compelling brand strategies and driving market expansion with creative excellence.</p>
              </div>
            </div>
          </div>
        </section>
       

        {/* CTA Section */}
        <section className="py-20 gradient-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Launch Your Success?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that have already reached for Softforge Technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg" className="bg-white text-primary hover:bg-gray-100">
                <NavLink to="/signup">
                  Start Your Journey
                </NavLink>
              </Button>
              <Button asChild variant="glass" size="lg">
                <NavLink to="/services">
                  Learn More
                </NavLink>
              </Button>
            </div>
          </div>
        </section>

           {/* Features Section */}
        <section className="py-20 bg-purple-950/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Comprehensive Features for <span className="text-primary">Education Management</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our student management system provides tailored solutions for every stakeholder in the educational ecosystem.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* For Students */}
              <div className="glass-card p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">👨‍🎓</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">For Students</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• View attendance</li>
                  <li>• View exam Schedules and marks</li>
                  <li>• View Progress report</li>
                  <li>• Take Online Test</li>
                  <li>• Online Teacher Interaction</li>
                  <li>• View remarks</li>
                  <li>• Self Learning and assessment</li>
                  <li>• Home work and Assignments</li>
                  <li>• Access to library activity</li>
                </ul>
              </div>

              {/* For Teachers */}
              <div className="glass-card p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">👩‍🏫</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">For Teachers</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• View class attendance</li>
                  <li>• Assign Remarks</li>
                  <li>• CCE Evaluation</li>
                  <li>• Maintain Daily Teaching Log</li>
                  <li>• Generate progress reports</li>
                  <li>• Online student Interaction</li>
                  <li>• Question bank and Exam Paper generation</li>
                  <li>• Online leave application and monthly attendance reports</li>
                  <li>• Access to library activity</li>
                </ul>
              </div>

              {/* For Parents */}
              <div className="glass-card p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">👪</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">For Parents</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Child's attendance</li>
                  <li>• Exam Schedules</li>
                  <li>• Child progress report</li>
                  <li>• Remarks by Teacher</li>
                  <li>• Online interaction with teachers</li>
                  <li>• Fee payment schedule and payment history</li>
                  <li>• Track location of School Bus</li>
                  <li>• Apply for Scholarship</li>
                  <li>• Convey grievances</li>
                  <li>• Absentee and late marks notifications by SMS and email</li>
                </ul>
              </div>

              {/* For Administrators */}
              <div className="glass-card p-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">For Administrators</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• School Analytics</li>
                  <li>• Staff and Student records management</li>
                  <li>• Schedule time-table</li>
                  <li>• Schedule Exams,Events</li>
                  <li>• Define fee structure</li>
                  <li>• View progress reports</li>
                  <li>• ID cards and certificate generation</li>
                  <li>• Academic report schema</li>
                  <li>• Fee, scholarships and Payroll</li>
                  <li>• Library and inventory management</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;