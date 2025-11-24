import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, LifeBuoy, Phone, Clock, Mail, CheckCircle } from 'lucide-react';

const kb = [
  { id: 'a1', title: 'How to get started with our services', excerpt: 'A quick start guide to onboard with Softforge and launch your first project.' },
  { id: 'a2', title: 'Billing & invoices', excerpt: 'How billing works, invoice schedule and payment methods we accept.' },
  { id: 'a3', title: 'Reporting bugs and incidents', excerpt: 'Steps to report an issue and what information helps us fix it faster.' }
];

const Support = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [ticket, setTicket] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const categories = ['Account', 'Billing', 'Technical', 'Sales'];

  const filtered = kb.filter((k) => {
    const byQuery = query.trim() === '' || (k.title + ' ' + k.excerpt).toLowerCase().includes(query.toLowerCase());
    const byCategory = !category || k.id.includes(category.toLowerCase());
    return byQuery && byCategory;
  });

  async function submitTicket(e: React.FormEvent) {
    e.preventDefault();
    // Basic client-side validation
    if (!ticket.name.trim() || !ticket.email.trim() || !ticket.subject.trim() || !ticket.message.trim()) {
      alert('Please fill all fields before submitting your request.');
      return;
    }

    setSubmitting(true);
    try {
      // Example: post to your backend ticketing API. Replace /api/tickets with your endpoint.
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...ticket, category: category || 'General' })
      });

      if (!res.ok) throw new Error('Failed to create ticket');

      setSent(true);
      setTicket({ name: '', email: '', subject: '', message: '' });

      // hide success after a moment
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      // fallback: open mail client
      const subject = encodeURIComponent(`[Support] ${ticket.subject}`);
      const body = encodeURIComponent(`Name: ${ticket.name}\nEmail: ${ticket.email}\nCategory: ${category || 'General'}\n\n${ticket.message}`);
      window.location.href = `mailto:support@softforge.com?subject=${subject}&body=${body}`;
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black text-white">
      <Header />

      <main className="pt-20 container mx-auto px-6">
        {/* HERO */}
        <section className="py-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">Support Center</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Need help? Search our knowledge base, open a ticket or contact our support team directly.</p>

          <div className="mt-6 mx-auto max-w-2xl flex items-center gap-2 bg-white/6 rounded-full px-4 py-2">
            <Search size={18} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search help articles, guides or keywords..." className="bg-transparent placeholder:text-white/60 flex-1 outline-none px-2 py-1" />
            <button onClick={() => {}} className="px-4 py-2 rounded-full bg-white text-purple-900 font-semibold">Search</button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: KB & Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl bg-white/5">
              <h2 className="text-2xl font-bold mb-3">Popular articles</h2>
              <div className="space-y-4">
                {filtered.map((a) => (
                  <article key={a.id} className="p-3 rounded-md hover:bg-white/6 transition">
                    <h3 className="font-semibold">{a.title}</h3>
                    <p className="text-sm text-white/75 mt-1">{a.excerpt}</p>
                  </article>
                ))}

                {filtered.length === 0 && <div className="text-sm text-white/70">No articles found. Try different keywords.</div>}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5">
              <h2 className="text-2xl font-bold mb-3">Open a support ticket</h2>
              <form onSubmit={submitTicket} className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input placeholder="Your name" value={ticket.name} onChange={(e) => setTicket({ ...ticket, name: e.target.value })} className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2" required />
                  <input placeholder="Email" type="email" value={ticket.email} onChange={(e) => setTicket({ ...ticket, email: e.target.value })} className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2" required />
                </div>

                <div className="flex gap-3 items-center">
                  <select value={category ?? ''} onChange={(e) => setCategory(e.target.value || null)} className="rounded-md bg-black/40 border border-white/10 px-3 py-2">
                    <option value="">Select category (optional)</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input placeholder="Subject" value={ticket.subject} onChange={(e) => setTicket({ ...ticket, subject: e.target.value })} className="flex-1 rounded-md bg-black/40 border border-white/10 px-3 py-2" required />
                </div>

                <textarea placeholder="Describe your issue or question" value={ticket.message} onChange={(e) => setTicket({ ...ticket, message: e.target.value })} className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 min-h-[140px]" required />

                <div className="flex items-center gap-3">
                  <button type="submit" disabled={submitting} className={`px-4 py-2 rounded-md ${submitting ? 'bg-white/30 text-white/60 cursor-not-allowed' : 'bg-white text-purple-900 font-semibold'}`}>
                    {submitting ? 'Submitting...' : 'Submit ticket'}
                  </button>

                  {sent && (
                    <div className="inline-flex items-center gap-2 text-sm text-emerald-400">
                      <CheckCircle size={16} /> Ticket submitted — our team will reply shortly.
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="p-6 rounded-xl bg-white/5">
              <h2 className="text-2xl font-bold mb-3">Support resources</h2>
              <ul className="space-y-2 text-white/80">
                <li>• Status page — real-time system health</li>
                <li>• API docs — integration guides and examples</li>
                <li>• Community forum — ask other users and get tips</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white/5">
              <h2 className="text-2xl font-bold mb-3">Frequently asked</h2>
              <details className="p-3 rounded-md bg-white/6"><summary className="font-semibold">How do I reset my password?</summary><div className="mt-2 text-sm text-white/80">Use the "Forgot password" link on the login page. If you don't receive an email within a few minutes, contact support.</div></details>
              <details className="p-3 rounded-md bg-white/6 mt-3"><summary className="font-semibold">What are your support hours?</summary><div className="mt-2 text-sm text-white/80">Mon–Fri, 9:30 AM — 6:30 PM IST. We provide limited weekend support for critical incidents.</div></details>
            </div>
          </div>

          {/* RIGHT: quick contact card + live chat */}
          <aside className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 text-center">
              <LifeBuoy size={34} className="mx-auto mb-2" />
              <h3 className="text-xl font-semibold">Need immediate help?</h3>
              <p className="text-sm text-white/80 mb-3">Contact our support team directly.</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 justify-center"><Phone size={16} /> <a href="tel:+912345678901" className="underline">+9834245297</a></div>
                <div className="flex items-center gap-2 justify-center"><Mail size={16} /> <a href="mailto:support@softforge.com" className="underline">softforgeconnect@gmail.com</a></div>
                <div className="flex items-center gap-2 justify-center"><Clock size={16} /> Support Hours: Mon–Fri</div>
              </div>

              <div className="mt-4">
                <button onClick={() => alert('Live chat placeholder — integrate your chat provider here')} className="px-4 py-2 rounded-md bg-white text-purple-900 font-semibold">Start live chat</button>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5">
              <h4 className="font-semibold mb-2">Contact options</h4>
              <ul className="text-sm text-white/80 space-y-2">
                <li>• Open a ticket (fastest)</li>
                <li>• Email support@softforge.com</li>
                <li>• Call during support hours</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white/5">
              <h4 className="font-semibold mb-2">Security</h4>
              <p className="text-sm text-white/80">We take privacy seriously — share only necessary details when opening a ticket. For security-sensitive info, request a secure link from support.</p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
