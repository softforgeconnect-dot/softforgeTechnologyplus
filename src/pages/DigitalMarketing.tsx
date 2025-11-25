import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, BarChart2, Users, Target, Mail, CheckCircle } from 'lucide-react';

const services = [
  { id: 's1', title: 'Full-funnel Strategy', desc: 'From audience research to conversion optimization — a measurable plan tailored to your goals.' },
  { id: 's2', title: 'Paid Ads (Google & Meta)', desc: 'Campaign setup, creative testing and bid management to maximize ROI.' },
  { id: 's3', title: 'SEO & Content Marketing', desc: 'Technical SEO, on-page optimization and content that attracts high-intent users.' },
  { id: 's4', title: 'Social Media & Community', desc: 'Organic growth strategies, content calendar and community engagement.' }
];

const caseStudies = [
  { id: 'c1', title: 'E-commerce growth (2.4x ROAS)', brief: 'We scaled a local retailer with targeted search + shopping ads and improved landing pages.' },
  { id: 'c2', title: 'Lead gen for B2B SaaS', brief: 'A content-first approach reduced CPL by 43% while increasing demo requests.' }
];

const tiers = [
  {
    id: 't1',
    name: 'Starter Package',
    tagline: 'For Small Local Businesses',
    price: '₹5,000 – ₹8,000 / month',
    bullets: [
      'Social Media Management (2 platforms — Facebook + Instagram)',
      '12 posts per month',
      '4 reels per month',
      'Basic content writing',
      'Ad creatives (2)',
      'Monthly analytics report',
      'Basic strategy'
    ]
  },
  {
    id: 't2',
    name: 'Growth Package',
    tagline: 'For SMEs & business owners',
    price: '₹12,000 – ₹20,000 / month',
    bullets: [
      'Social Media Management (3 platforms — Facebook, Instagram, LinkedIn)',
      '16–20 posts per month',
      '6–8 reels per month',
      'Complete content writing',
      '5–8 ad creatives',
      'Facebook/Instagram ad management',
      'Ad budget management: ₹5,000 – ₹20,000',
      'WhatsApp marketing setup',
      'Monthly video strategy',
      'Competitor analysis',
      'Advanced monthly report'
    ]
  },
  {
    id: 't3',
    name: 'Scale Package',
    tagline: 'For brands ready to scale',
    price: '₹25,000 – ₹50,000 / month',
    bullets: [
      'Social Media Management (All major platforms: FB, IG, LinkedIn, YouTube, X/Twitter)',
      '30 posts per month',
      '10–12 reels per month',
      'Professional ad creatives',
      'Google Ads + Facebook Ads management',
      'Website SEO (basic)',
      'Monthly photo/video shoot (optional — extra cost)',
      'Influencer collaboration management',
      'Complete marketing strategy',
      'Weekly reporting',
      'Dedicated account manager',
      'Note: Top agencies may charge ₹75k–₹1.5L — as a startup we recommend ₹25k–₹50k'
    ]
  },
  {
    id: 't4',
    name: 'Additional / Add-Ons',
    tagline: 'Optional services (one-time / monthly)',
    price: 'See ranges below',
    bullets: []
  }
];

const addons = [
  { service: 'Website Development', price: '₹10,000 – ₹40,000' },
  { service: 'Logo & Branding', price: '₹3,000 – ₹15,000' },
  { service: 'Google Ads Setup', price: '₹3,000 – ₹10,000' },
  { service: 'SEO (monthly)', price: '₹10,000 – ₹35,000 / month' },
  { service: 'Social Media Paid Ads', price: '10% – 15% of ad budget' },
  { service: 'Photography / Video shoot', price: '₹5,000 – ₹20,000 per day' }
];

const DigitalMarketing: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  // NOTE: This version does NOT navigate away or open mailto.
  // It simply validates, shows a success modal, and resets the form.
  function submitForm(e: React.FormEvent) {
    e.preventDefault();

    // Basic validation (inputs also have required attributes)
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert('Please fill Name, Email and Brief description before submitting.');
      return;
    }

    setSending(true);

    // Simulate sending (replace with real API call later)
    // Here we do NOT open mail client or navigate away
    setTimeout(() => {
      setShowSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setSending(false);

      // auto-close modal after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 600); // small delay to show "Sending..." state
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black text-white">
      <Header />

      <main className="pt-20">
        {/* HERO */}
        <section className="py-20 text-center px-6">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">Digital Marketing that Moves the Needle</h1>
            <p className="text-lg text-white/85 mb-6">Performance-driven campaigns, creative storytelling and data you can act on.</p>

            <div className="flex gap-3 justify-center">
              <a href="#services" className="rounded-full px-6 py-3 bg-white text-purple-900 font-semibold">Our Services</a>
              <a href="#pricing" className="rounded-full px-6 py-3 border border-white/10">Pricing</a>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <div className="p-4 rounded-xl bg-white/5 text-left max-w-2xl">
                <div className="flex items-center gap-3 mb-2"><BarChart2 size={18} /> <strong>Data-driven</strong></div>
                <div className="text-sm text-white/80">We measure what matters: CPA, LTV and actionable insights to grow sustainably.</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 text-left max-w-2xl">
                <div className="flex items-center gap-3 mb-2"><Users size={18} /> <strong>Local expertise</strong></div>
                <div className="text-sm text-white/80">Experience running campaigns for businesses across Maharashtra and pan-India.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-12 container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">What we do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.id} className="p-6 rounded-xl bg-white/5">
                <div className="flex items-center gap-3 mb-2"><Target size={18} /> <h3 className="font-semibold">{s.title}</h3></div>
                <p className="text-sm text-white/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CASE STUDIES */}
        <section className="py-12 bg-white/4">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4 text-center">Case studies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudies.map((c) => (
                <div key={c.id} className="p-6 rounded-xl bg-gradient-to-tr from-white/6 to-white/4">
                  <h3 className="font-semibold mb-2">{c.title}</h3>
                  <p className="text-sm text-white/80">{c.brief}</p>
                  <a href="#" className="mt-4 inline-block text-sm underline">Read full case study</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-12 container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((t) => (
              <div key={t.id} className="p-6 rounded-xl bg-white/5 text-center flex flex-col">
                <h4 className="text-xl font-semibold mb-1">{t.name}</h4>
                {t.tagline && <div className="text-sm text-white/80 mb-3">{t.tagline}</div>}
                <div className="text-2xl font-bold mb-3">{t.price}</div>

                {t.id === 't4' ? (
                  <>
                    <div className="text-sm text-white/80 mb-3">Optional services you can add to any package.</div>
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="py-2">Service</th>
                            <th className="py-2">Price range</th>
                          </tr>
                        </thead>
                        <tbody>
                          {addons.map((a) => (
                            <tr key={a.service} className="odd:bg-white/3">
                              <td className="py-2">{a.service}</td>
                              <td className="py-2">{a.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="text-xs text-white/70 mb-4">Pricing shown are typical ranges — final quotes depend on scope.</div>
                    <a href="#contact" className="mt-auto inline-block px-4 py-2 rounded-md bg-white text-purple-900 font-semibold">Request quote</a>
                  </>
                ) : (
                  <>
                    <ul className="text-sm space-y-2 mb-4 text-left">
                      {t.bullets.map((b, i) => <li key={i}>• {b}</li>)}
                    </ul>

                    <div className="mt-auto">
                      <a href="#contact" className="inline-block px-4 py-2 rounded-md bg-white text-purple-900 font-semibold">Get started</a>
                      <div className="text-xs text-white/70 mt-2">{t.id === 't3' ? 'Optional: monthly photo/video shoot at extra cost' : null}</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-12 bg-white/6">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl font-bold mb-4 text-center">Talk to a strategist</h2>
            <p className="text-center text-white/80 mb-6">Tell us about your goals and we’ll propose a custom plan.</p>

            <form onSubmit={submitForm} className="grid grid-cols-1 gap-3">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2"
              />
              <input
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2"
              />
              <textarea
                required
                placeholder="Briefly describe your needs"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 min-h-[120px]"
              />

              <div className="flex gap-3 justify-center">
                <button
                  type="submit"
                  disabled={sending}
                  className="px-6 py-3 rounded-full bg-white text-purple-900 font-semibold flex items-center gap-2 disabled:opacity-60"
                >
                  <Mail size={16} /> {sending ? 'Sending...' : 'Send inquiry'}
                </button>
                <button
                  type="button"
                  onClick={() => window.location.href = 'mailto:hello@softforge.com'}
                  className="px-6 py-3 rounded-full border border-white/10"
                >
                  Email us
                </button>
              </div>
            </form>

            <p className="text-xs text-white/70 mt-4 text-center">We reply within 48 business hours.</p>
          </div>

          {/* Success Modal (stays on same page) */}
          {showSuccess && (
            <div role="dialog" aria-modal="true" aria-label="Inquiry submitted" className="fixed inset-0 z-50 flex items-center justify-center">
              <div onClick={() => setShowSuccess(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

              <div className="relative max-w-sm w-full mx-4 bg-white/6 border border-white/10 rounded-2xl p-6 text-center text-white z-10">
                <div className="flex items-center justify-center mb-3">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Submitted successfully</h3>
                <p className="text-sm text-white/80 mb-4">Thanks — your enquiry has been received. We'll get back to you soon.</p>

                <div className="flex justify-center gap-3">
                  <button onClick={() => setShowSuccess(false)} className="px-4 py-2 rounded-full bg-white text-purple-900 font-semibold">OK</button>
                  <a href="mailto:hello@softforge.com" className="px-4 py-2 rounded-full border border-white/10">Email us</a>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* FAQ + Footer CTA */}
        <section className="py-12 container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">Frequently asked</h3>
            <div className="space-y-3">
              <details className="p-4 rounded-md bg-white/5"><summary className="font-semibold">How long before I see results?</summary><div className="mt-2 text-sm text-white/80">Depends on channel — paid ads can show immediate traffic, SEO takes months; we focus on both short- and long-term ROI.</div></details>
              <details className="p-4 rounded-md bg-white/5"><summary className="font-semibold">Do you work with small businesses?</summary><div className="mt-2 text-sm text-white/80">Yes — we have starter packages tailored for early-stage businesses.</div></details>
              <details className="p-4 rounded-md bg-white/5"><summary className="font-semibold">What industries do you serve?</summary><div className="mt-2 text-sm text-white/80">Retail, SaaS, education, local services and more — we adapt to each client's metrics and audience.</div></details>
            </div>

            <div className="mt-8 text-center">
              <a href="#contact" className="inline-block px-6 py-3 rounded-full bg-white text-purple-900 font-semibold">Start a conversation</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DigitalMarketing;
