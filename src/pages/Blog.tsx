import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Calendar, Tag, MessageCircle } from 'lucide-react';

const samplePosts = [
  {
    id: 'p1',
    title: 'How we built a scalable React + Node stack',
    excerpt: 'An inside look at our architecture choices, deployment pipeline and lessons learned while scaling to 100k users.',
    tags: ['react', 'node', 'architecture'],
    date: '2025-06-12',
    readTime: '6 min'
  },
  {
    id: 'p2',
    title: 'Performance tuning: Tailwind, images and caching',
    excerpt: 'Practical steps we used to reduce TTFB and bring our Lighthouse score up by 20 points.',
    tags: ['performance', 'tailwind', 'webperf'],
    date: '2025-04-10',
    readTime: '4 min'
  },
  {
    id: 'p3',
    title: 'Hiring engineers in smaller cities — what worked for us',
    excerpt: 'Tips for recruiting, interviewing and retaining talent when you’re outside a big tech hub.',
    tags: ['hiring', 'culture'],
    date: '2025-02-28',
    readTime: '5 min'
  }
];

const TagPill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block text-xs px-2 py-1 rounded-md border border-white/10">{children}</span>
);

const Blog = () => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = Array.from(new Set(samplePosts.flatMap((p) => p.tags))).sort();

  const filtered = samplePosts.filter((p) => {
    const matchesQuery = query.trim() === '' || (p.title + ' ' + p.excerpt).toLowerCase().includes(query.toLowerCase());
    const matchesTag = !selectedTag || p.tags.includes(selectedTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black text-white">
      <Header />

      <main className="pt-20">
        {/* HERO */}
        <section className="py-20 text-center px-6">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">Insights from Softforge</h1>
            <p className="text-lg text-white/85 mb-6">Stories, tutorials and practical notes on product development, performance and company culture.</p>

            <div className="mx-auto max-w-xl flex items-center gap-3 bg-white/6 rounded-full px-4 py-2">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts, tags or keywords..."
                className="bg-transparent placeholder:text-white/60 flex-1 outline-none px-2 py-1"
              />
              <button className="px-4 py-2 rounded-full bg-white text-purple-900 font-semibold">Search</button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                  className={`px-3 py-1 rounded-md text-sm ${selectedTag === t ? 'bg-white text-purple-900' : 'bg-white/6'}`}>
                  #{t}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED / LIST */}
        <section className="py-12 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Latest posts</h2>

              <div className="space-y-6">
                {filtered.map((post) => (
                  <article key={post.id} className="p-6 rounded-xl bg-white/5 hover:bg-white/6 transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-sm text-white/75 mt-2">{post.excerpt}</p>

                        <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                          <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                          <span>•</span>
                          <span>{post.readTime} read</span>
                        </div>

                        <div className="mt-3 flex gap-2">
                          {post.tags.map((tg) => <TagPill key={tg}>#{tg}</TagPill>)}
                        </div>
                      </div>

                      <div className="text-right">
                        <a href={`/blog/${post.id}`} className="inline-block px-4 py-2 rounded-md bg-white text-purple-900 font-semibold">Read</a>
                        <div className="text-xs text-white/60 mt-2">Comments • 0</div>
                      </div>
                    </div>
                  </article>
                ))}

                {filtered.length === 0 && (
                  <div className="p-6 rounded-xl bg-white/4 text-center">No posts found. Try a different keyword or tag.</div>
                )}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="p-6 rounded-xl bg-white/5">
                <h4 className="font-semibold mb-2">Subscribe</h4>
                <p className="text-sm text-white/80 mb-3">Get new posts straight to your inbox.</p>
                <form onSubmit={(e) => { e.preventDefault(); window.location.href = 'mailto:blog@softforge.com?subject=Subscribe'; }} className="flex gap-2">
                  <input placeholder="Your email" className="flex-1 rounded-md bg-black/40 border border-white/10 px-3 py-2" required />
                  <button className="px-3 py-2 rounded-md bg-white text-purple-900 font-semibold">Subscribe</button>
                </form>
              </div>

              <div className="p-6 rounded-xl bg-white/5">
                <h4 className="font-semibold mb-2">Popular tags</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <button key={t} onClick={() => setSelectedTag(t)} className="text-sm px-2 py-1 rounded-md bg-white/6">#{t}</button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/5">
                <h4 className="font-semibold mb-2">About the blog</h4>
                <p className="text-sm text-white/80">We write practical guides and behind-the-scenes stories about product building, engineering and growing teams.</p>
              </div>

              <div className="p-6 rounded-xl bg-white/5">
                <h4 className="font-semibold mb-2">Talk to us</h4>
                <a className="flex items-center gap-2 text-sm" href="mailto:blog@softforge.com"><MessageCircle size={16} /> Send a pitch</a>
              </div>
            </aside>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="py-12 bg-white/6">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Have an idea for a post?</h3>
            <p className="text-sm text-white/80 mb-4">We welcome guest writers and community contributions.</p>
            <a href="mailto:blog@softforge.com" className="inline-block px-6 py-3 rounded-md bg-white text-purple-900 font-semibold">Pitch your story</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
