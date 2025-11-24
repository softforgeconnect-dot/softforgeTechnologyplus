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

      {/* If your Header is fixed (position: fixed), this top padding prevents content from being hidden under it.
          Adjust the values below to match your Header height: md/lg values are optional. */}
      <main className="pt-24 md:pt-28 lg:pt-32 pb-20">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 break-words">
            Our Services
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions to propel your business to new heights. End-to-end development,
            cloud, marketing and brand strategy tailored for measurable results.
          </p>
        </section>

        {/* Cards */}
        <section className="mt-12 max-w-7xl mx-auto px-4">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, idx) => (
              <article
                key={idx}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-6 shadow-md min-h-[220px] flex flex-col"
                aria-labelledby={`service-${idx}-title`}
              >
                {/* Accent stripe (keeps inside card but does not overlap text) */}
                <div className="absolute left-4 top-4 bottom-4 w-1 rounded bg-gradient-to-b from-indigo-400 to-teal-300 opacity-80" />

                {/* Content area has left padding so stripe doesn't overlap text */}
                <div className="pl-6 sm:pl-8">
                  <h3
                    id={`service-${idx}-title`}
                    className="text-xl sm:text-2xl font-semibold mb-2 text-white leading-tight break-words"
                    style={{ scrollMarginTop: 96 }} /* good for anchor links if header is fixed */
                  >
                    {svc.title}
                  </h3>

                  <p className="text-sm text-gray-300 mb-4">{svc.description}</p>

                  <ul className="space-y-2 flex-1">
                    {svc.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-200 text-sm">
                        <span
                          className="flex-none mt-1 w-3 h-3 rounded-full bg-white"
                          aria-hidden="true"
                        />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4">
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
