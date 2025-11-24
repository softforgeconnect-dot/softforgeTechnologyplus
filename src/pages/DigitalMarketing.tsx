import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, BarChart2, Users, Target, Mail } from 'lucide-react';

const services = [
  {
    id: 's1',
    title: 'Full-funnel Strategy',
    desc: 'From audience research to conversion optimization — a measurable plan tailored to your goals.'
  },
  {
    id: 's2',
    title: 'Paid Ads (Google & Meta)',
    desc: 'Campaign setup, creative testing and bid management to maximize ROI.'
  },
  {
    id: 's3',
    title: 'SEO & Content Marketing',
    desc: 'Technical SEO, on-page optimization and content that attracts high-intent users.'
  },
  {
    id: 's4',
    title: 'Social Media & Community',
    desc: 'Organic growth strategies, content calendar and community engagement.'
  }
];

const caseStudies = [
  {
    id: 'c1',
    title: 'E‑commerce growth (2.4x ROAS)',
    brief: 'We scaled a local retailer with targeted search + shopping ads and improved landing pages.'
  },
  {
    id: 'c2',
    title: 'Lead gen for B2B SaaS',
    brief: 'A content-first approach reduced CPL by 43% while increasing demo requests.'
  }
];

const tiers = [
  { id: 't1', name: 'Starter', price: '₹15,000/mo', bullets: ['Basic SEO', '1 campaign', 'Monthly reporting'] },
  { id: 't2', name: 'Growth', price: '₹40,000/mo', bullets: ['SEO + Ads', 'A/B testing', 'Bi-weekly calls'] },
  { id: 't3', name: 'Scale', price: 'Custom', bullets: ['Full-funnel', 'Dedicated strategist', 'SLA & dashboard'] }
];

const DigitalMarketing = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    // fallback to mail client — replace with API in production
    const subject = encodeURIComponent('Digital Marketing Inquiry — ' + form.name);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`);
    window.location.href = `mailto:hello@softforge.com?subject=${subject}&body=${body}`;
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div key={t.id} className="p-6 rounded-xl bg-white/5 text-center">
                <h4 className="text-xl font-semibold mb-2">{t.name}</h4>
                <div className="text-2xl font-bold mb-3">{t.price}</div>
                <ul className="text-sm space-y-2 mb-4">
                  {t.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <a href="#contact" className="inline-block px-4 py-2 rounded-md bg-white text-purple-900 font-semibold">Get started</a>
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
              <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2" />
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2" />
              <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2" />
              <textarea required placeholder="Briefly describe your needs" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 min-h-[120px]" />

              <div className="flex gap-3 justify-center">
                <button type="submit" className="px-6 py-3 rounded-full bg-white text-purple-900 font-semibold flex items-center gap-2"><Mail size={16} /> Send inquiry</button>
                <a href="mailto:hello@softforge.com" className="px-6 py-3 rounded-full border border-white/10">Email us</a>
              </div>
            </form>

            <p className="text-xs text-white/70 mt-4 text-center">We reply within 48 business hours.</p>
          </div>
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
