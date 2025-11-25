import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';

type Service = {
  title: string;
  description: string;
  features: string[];
};

const services: Service[] = [
  {
    title: "Web Development",
    description: "Modern, responsive websites built with cutting-edge technologies.",
    features: ["React.js / Next.js", "Angular", "Android & iOS", "SEO Optimized", "Performance Focused"],
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications with polished UI/UX.",
    features: ["iOS & Android", "React Native", "Responsive UI/UX", "App Store Optimization"],
  },
  {
    title: "Cloud Services",
    description: "Reliable cloud architecture and managed services to scale your product.",
    features: ["Amazon Web Services (AWS)", "Google Cloud Platform (GCP)", "Microsoft Azure", "Server Management"],
  },
  {
    title: "Digital Marketing",
    description: "Data-driven campaigns that increase visibility and conversions.",
    features: ["Social Media Marketing", "Content Strategy", "PPC Campaigns", "Analytics & Reporting"],
  },
  {
    title: "Brand Strategy",
    description: "Complete brand identity, messaging and marketing collateral.",
    features: ["Logo & Identity", "Brand Guidelines", "Marketing Collateral", "Positioning & Messaging"],
  },
];

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-black text-gray-100">
      <Header />

      <main className="pt-8 pb-20">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Our Services</h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions to propel your business to new heights. End-to-end development,
            cloud, marketing and brand strategy tailored for measurable results.
          </p>
        </section>

        {/* Cards */}
        <section className="mt-12 max-w-6xl mx-auto px-4">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, idx) => (
              <article
                key={idx}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-6 shadow-md"
                aria-labelledby={`service-${idx}-title`}
              >
                {/* Accent stripe */}
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-indigo-400 to-teal-300 opacity-60" />

                <div className="ml-4">
                  <h3 id={`service-${idx}-title`} className="text-2xl font-semibold mb-2 text-white">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">{svc.description}</p>

                  <ul className="space-y-3">
                    {svc.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="flex-none mt-1 w-3 h-3 rounded-full bg-white"
                          aria-hidden="true"
                        />
                        <span className="text-gray-200 text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <a
                      href="#contact"
                      className="inline-block text-sm font-medium px-4 py-2 rounded-lg bg-white/10 border border-white/8 hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
