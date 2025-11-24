import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Briefcase, MapPin, Clock } from 'lucide-react';

const jobs = [
  { id: '1', title: 'Frontend Engineer (React/TypeScript)', location: 'Nanded, India (Hybrid)', type: 'Full-time', seniority: 'Mid • Senior', summary: 'Build delightful, accessible user interfaces using React, TypeScript and Tailwind.' },
  { id: '2', title: 'Backend Engineer (Node.js)', location: 'Remote (India)', type: 'Full-time', seniority: 'Mid', summary: 'Design reliable APIs, databases and background processing pipelines.' },
  { id: '3', title: 'DevOps / Cloud Engineer', location: 'Nanded, India (On-site)', type: 'Full-time', seniority: 'Mid • Senior', summary: 'Own our cloud infrastructure, CI/CD and reliability story.' },
  { id: '4', title: 'Python Engineer', location: 'Nanded, India (On-site)', type: 'Full-time', seniority: 'Mid • Senior', summary: 'Build delightful, accessible user interfaces and reliable backend systems.' },
  { id: '5', title: 'Azure Engineer', location: 'Nanded, India (On-site)', type: 'Full-time', seniority: 'Mid • Senior', summary: 'Own our cloud infrastructure, CI/CD and reliability story.' },
  { id: '6', title: 'Multi-Cloud Engineer', location: 'Nanded, India (On-site)', type: 'Full-time', seniority: 'Mid • Senior', summary: 'Own our cloud infrastructure, CI/CD and reliability story.' },
  { id: '7', title: 'Angular Developer', location: 'Nanded, India (On-site)', type: 'Full-time', seniority: 'Mid • Senior', summary: 'Build delightful, accessible user interfaces with Angular.' },
  { id: '8', title: 'Java Full Stack Developer', location: 'Nanded, India (On-site)', type: 'Full-time', seniority: 'Mid • Senior', summary: 'Full stack development using Java and modern frontend stacks.' }
];

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/6 text-white/90">{children}</span>
);

const Career: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [showApply, setShowApply] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openApply(job: typeof jobs[0]) {
    setSelectedJob(job);
    setShowApply(true);
    setError(null);
    setResumeFile(null);
    setForm({ name: '', email: '', message: '' });
  }

  function validateForm() {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!form.email.trim()) return 'Please enter your email.';
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) return 'Please enter a valid email address.';
    if (!form.message.trim()) return 'Please enter a short message or cover note.';
    // Ensure resume is uploaded
    if (!resumeFile) return 'Please upload your resume (PDF/DOC).';
    // Optional: restrict file types / size (example: max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (resumeFile.size > maxSize) return 'Resume too large. Max file size is 5 MB.';
    return null;
  }

  async function submitApplication(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!selectedJob) {
      setError('No job selected.');
      return;
    }

    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append('jobId', selectedJob.id);
      fd.append('name', form.name.trim());
      fd.append('email', form.email.trim());
      fd.append('message', form.message.trim());
      if (resumeFile) fd.append('resume', resumeFile, resumeFile.name);

      // Send to your backend endpoint
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: fd
        // DO NOT set Content-Type header when sending FormData — browser will set the correct boundary
      });

      if (!res.ok) {
        // try read json error message if provided
        let errText = 'Submission failed. Please try again later.';
        try {
          const json = await res.json();
          if (json?.error) errText = json.error;
        } catch (err) { /* ignore json parse error */ }
        throw new Error(errText);
      }

      // assume JSON { ok: true }
      const data = await res.json();
      if (data?.ok) {
        setShowSuccess(true);
        setForm({ name: '', email: '', message: '' });
        setResumeFile(null);

        // Auto-close modal after a delay
        setTimeout(() => {
          setShowSuccess(false);
          setShowApply(false);
          setSelectedJob(null);
        }, 2200);
      } else {
        throw new Error(data?.error || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      // Fallback: if backend unavailable, optionally fallback to mailto (commented)
      setError(err?.message || 'Submission failed. Please try again.');

      // Optional fallback behavior (uncomment if desired):
      // const subject = encodeURIComponent(`Application: ${selectedJob.title} - ${form.name}`);
      // const body = encodeURIComponent(`${form.message}\n\nName: ${form.name}\nEmail: ${form.email}\n\n(Resume not attached - please reply with your resume)`);
      // window.location.href = `mailto:careers@softforge.com?subject=${subject}&body=${body}`;
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black text-white">
      <Header />

      <main className="pt-20">
        {/* HERO */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">Careers at Softforge</h1>
            <p className="max-w-3xl mx-auto text-lg text-white/90 mb-8">
              Join a small, fast-moving team building products that matter. We care about growth, craftsmanship and building a healthy company culture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#open-roles" className="inline-block rounded-xl px-6 py-3 bg-white text-purple-900 font-semibold shadow-lg">View Open Roles</a>
              <a href="#culture" className="inline-block rounded-xl px-6 py-3 border border-white/10">Our Culture</a>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3 mb-2"><Briefcase size={20} /> <span className="font-semibold">Benefits</span></div>
                <p className="text-sm text-white/80">Flexible hours, remote-first options, health benefits and learning budget.</p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3 mb-2"><Clock size={20} /> <span className="font-semibold">Growth</span></div>
                <p className="text-sm text-white/80">Mentorship from industry experts and time for side-projects and training.</p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3 mb-2"><MapPin size={20} /> <span className="font-semibold">Office</span></div>
                <p className="text-sm text-white/80">A friendly hub in Nanded plus a remote-friendly setup.</p>
              </div>
            </div>
          </div>
        </section>

        {/* OPEN ROLES */}
        <section id="open-roles" className="py-16 bg-white/4">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">Open Roles</h2>
                <p className="text-sm text-white/80">We’re always looking for talented people. Below are roles we’re actively hiring for.</p>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-md bg-white/6">Filter</button>
                <a href="#" className="px-4 py-2 rounded-md bg-white text-purple-900 font-semibold">Refer a friend</a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <article key={job.id} className="p-6 rounded-xl bg-gradient-to-tr from-white/3 to-white/6">
                  <header className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-sm text-white/75 mt-1">{job.summary}</p>
                    </div>

                    <div className="text-right">
                      <Pill>{job.type}</Pill>
                      <div className="text-xs text-white/70 mt-2">{job.seniority}</div>
                    </div>
                  </header>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-white/80 flex items-center gap-3"><MapPin size={14} /> {job.location}</div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 rounded-md border border-white/10" onClick={() => setSelectedJob(job)}>Details</button>
                      <button className="px-4 py-2 rounded-md bg-white text-purple-900 font-semibold" onClick={() => openApply(job)}>Apply</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-white/70">Don't see the role you want? Send your resume to <a className="underline" href="mailto:softforgeconnect@gmail.com">careers@softforge.com</a></p>
            </div>
          </div>
        </section>

        {/* CULTURE / VALUES */}
        <section id="culture" className="py-16">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
              <p className="text-white/80 mb-4">We believe in learning fast, shipping with care and treating every team member with respect. Diversity, psychological safety and transparent communication are core to how we work.</p>

              <ul className="space-y-3 text-white/80">
                <li>• Continuous learning budget and mentor hours</li>
                <li>• 18 days paid leave + work-from-home flexibility</li>
                <li>• Regular hackdays and demo sessions</li>
              </ul>
            </div>

            <div className="rounded-xl p-6 bg-white/4">
              <h3 className="font-semibold mb-2">Perks & Benefits</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-sm">Learning budget</div>
                <div className="text-sm">Health insurance</div>
                <div className="text-sm">Flexible hours</div>
                <div className="text-sm">Gym stipend</div>
              </div>
            </div>
          </div>
        </section>

        {/* SIMPLE MODAL / APPLY FORM */}
        {showApply && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
            <div className="w-full max-w-xl rounded-xl bg-gradient-to-b from-white/6 to-white/4 p-6 relative">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">Apply — {selectedJob.title}</h3>
                  <p className="text-sm text-white/80">Location: {selectedJob.location} • {selectedJob.type}</p>
                </div>
                <button className="text-white/70" onClick={() => setShowApply(false)}>✕</button>
              </div>

              <form onSubmit={submitApplication} className="mt-4 grid grid-cols-1 gap-3">
                {error && <div className="text-sm text-rose-400 bg-rose-900/10 p-2 rounded">{error}</div>}

                <label className="text-xs">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2" />

                <label className="text-xs">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2" />

                <label className="text-xs">Short message / cover note</label>
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 min-h-[120px]" />

                <label className="text-xs">Upload Resume (PDF / DOC) — max 5 MB</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setResumeFile(f);
                  }}
                  className="w-full text-sm file:rounded file:px-3 file:py-1 file:border file:border-white/10 file:bg-white/6 file:text-white"
                />

                <div className="flex items-center justify-between mt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-4 py-2 rounded-md ${submitting ? 'bg-white/30 text-white/60 cursor-not-allowed' : 'bg-white text-purple-900 font-semibold'}`}
                  >
                    {submitting ? 'Uploading...' : 'Send Application'}
                  </button>

                  {/* previously a download link; now show small helper and an optional manual download link */}
                  <div className="text-sm">
                    <a href="/apply-template.pdf" className="underline mr-3">Download CV template</a>
                    <span className="text-white/60">or upload your resume</span>
                  </div>
                </div>
              </form>

              {/* Success toast inside modal */}
              {showSuccess && (
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 w-[90%] md:w-2/3 bg-emerald-600 text-black font-semibold rounded-lg px-4 py-3 text-center">
                  ✅ Your application was submitted successfully!
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Career;
