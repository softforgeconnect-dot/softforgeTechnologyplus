// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// const Services = () => {
//   const services = [
//     {
//       title: "Web Development",
//       description: "Modern, responsive websites built with cutting-edge technologies",
//       features: ["React.js/Next.js","Angular", "Android iOS Application", "SEO Optimized", "Performance Focused"]
//     },
    
//     {
//       title: "Mobile Apps",
//       description: "Native and cross-platform mobile applications",
//       features: ["iOS & Android", "React Native", "UI/UX Design", "App Store Optimization"]
//     },
//     {
//       title: "Cloud Services",
//       description: "We Provide all the related Cloud service with customer satisfation ",
//       features: ["Amazon Web Services", "Google Cloud Platform", "Manual Server " ]
//     },
//       {
//       title: "Digital Marketing",
//       description: "Strategic marketing campaigns that drive real results",
//       features: ["Social Media Marketing", "Content Strategy", "PPC Campaigns", "Analytics & Reporting"]
//     },
//     {
//       title: "Brand Strategy",
//       description: "Complete brand identity and positioning services",
//       features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Brand Positioning"]
//     }
  
      
//   ];

//   return (
//     <div className="min-h-screen bg-black">
//       <Header />
//       <main className="pt-16">
//         <section className="py-20 gradient-hero">
//           <div className="container mx-auto px-4 text-center">
//             <h1 className="text-hero text-white font-bold mb-6">Our Services</h1>
//             <p className="text-subtitle text-gray-200 max-w-3xl mx-auto">
//               Comprehensive digital solutions to propel your business to new heights
//             </p>
//           </div>
//         </section>

//         <section className="py-20 bg-pink-100">
//           <div className="container mx-auto px-4">
//             <div className="grid md:grid-cols-2 gap-8">
//               {services.map((service, index) => (
//                 <div key={index} className="glass-card p-8 hover:scale-105 transition-transform duration-300">
//                   <h3 className="text-2xl font-bold text-blue mb-4">{service.title}</h3>
//                   <p className="text-black-300 mb-6">{service.description}</p>
//                   <ul className="space-y-2">
//                     {service.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center text-black">
//                         <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Services;

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      features: ["React.js/Next.js","Angular", "Android iOS Application", "SEO Optimized", "Performance Focused"]
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications",
      features: ["iOS & Android Application", "React Native Application", "UI/UX Resposive Design ", "App Store Optimization"]
    },
    {
      title: "Cloud Services",
      description: "We Provide all the related Cloud service with customer satisfation ",
      features: ["Amazon Web Services", "Google Cloud Platform", "Azure ", "Manual Server " ]
    },
    {
      title: "Digital Marketing",
      description: "Strategic marketing campaigns that drive real results",
      features: ["Social Media Marketing", "Content Strategy", "PPC Campaigns", "Analytics & Reporting","AI Support Marketing"]
    },
    {
      title: "Brand Strategy",
      description: "Complete brand identity and positioning services",
      features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Brand Positioning"]
    }
  ];

  // Color schemes for each service (hueA, hueB)
  const serviceColors = [
    [340, 100],    // Web Development - Red/Orange
    [20, 100],     // Mobile Apps - Orange
    [60, 200],     // Cloud Services - Yellow
    [80, 400],    // Digital Marketing - Green
    [100, 280],   // Brand Strategy - Green/Blue
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black  ">
      <Header />
      <main className="pt-5">
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-hero text-white font-bold mb-6">Our Services</h1>
            <p className="text-subtitle text-gray-200 max-w-3xl mx-auto">
              Comprehensive digital solutions to propel your business to new heights
            </p>
          </div>
        </section>

        <section className="py-5" style={{ backgroundColor: 'lightpurple' }}>
          <div className="container mx-auto px-4" style={container}>
            {services.map((service, index) => (
              <AnimatedServiceCard 
                key={index} 
                service={service} 
                index={index} 
                hueA={serviceColors[index][0]} 
                hueB={serviceColors[index][1]} 
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Animated Service Card Component
interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    features: string[];
  };
  index: number;
  hueA: number;
  hueB: number;
}

function AnimatedServiceCard({ service, index, hueA, hueB }: ServiceCardProps) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className={`service-card-container-${index}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div style={{ ...splash, background }} />
      <motion.div 
        style={serviceCard} 
        variants={cardVariants} 
        className="service-card"
      >
        <div className="p-">
          <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
          <p className="text-white mb-6 opacity-90">{service.description}</p>
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-white">
                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  flexDirection: "row",
  margin: "200px auto",
  maxWidth: "100%",
  paddingBottom: 20,
  width: "100%",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 80,
  alignItems: "center",

  display: "grid",
  justifyContent: "center",
};

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
};

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const serviceCard: React.CSSProperties = {
  width: 200,
  height: 500,
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 100, 0.37)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  borderRadius: 20,
  transformOrigin: "10% 60%",
};

export default Services;