import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

// Internship data — use this array to add / edit internship cards
const internships = [
  {
    id: 'i1',
    title: 'Frontend Engineer (React/TypeScript)',
    tags: ['React', 'TypeScript', 'Frontend'],
    location: 'Nanded',
    duration: '6 Months',
    openings: 4,
    stipend: 'Unpaid',
    description: 'Build UIs with React & TypeScript, work with designers and backend engineers to ship features.'
  },
  {
    id: 'i2',
    title: 'Backend Engineer (Node.js)',
    tags: ['Node.js', 'APIs', 'Backend'],
    location: 'Nanded',
    duration: '6 Months',
    openings: 3,
    stipend: 'Unpaid',
    description: 'Design and build REST/GraphQL APIs, work on data models and performance optimizations.'
  },
  {
    id: 'i3',
    title: 'DevOps / Cloud Engineer',
    tags: ['DevOps', 'AWS', 'CI/CD'],
    location: 'Remote / Nanded',
    duration: '6 Months',
    openings: 2,
    stipend: 'Unpaid',
    description: 'Automate deployments, manage infrastructure-as-code and observability for applications.'
  },
  {
    id: 'i4',
    title: 'Python Engineer',
    tags: ['Python', 'Django', 'Flask'],
    location: 'Nanded',
    duration: '6 Months',
    openings: 2,
    stipend: 'Unpaid',
    description: 'Backend work with Python frameworks, data processing and backend integrations.'
  },
  {
    id: 'i5',
    title: 'Azure Engineer',
    tags: ['Azure', 'Cloud'],
    location: 'Remote / Nanded',
    duration: '6 Months',
    openings: 1,
    stipend: 'Unpaid',
    description: 'Work on Azure services, deployments and cloud-native patterns.'
  },
  {
    id: 'i6',
    title: 'Multi-Cloud Engineer',
    tags: ['Azure', 'AWS', 'GCP'],
    location: 'Remote / Nanded',
    duration: '6 Months',
    openings: 1,
    stipend: 'Unpaid',
    description: 'Help architect multi-cloud deployments and CI/CD across providers.'
  },
  {
    id: 'i7',
    title: 'Java Full Stack Developer',
    tags: ['Java', 'Spring', 'React'],
    location: 'Nanded',
    duration: '6 Months',
    openings: 3,
    stipend: 'Unpaid',
    description: 'Full stack tasks using Java/Spring on the backend and React on the frontend.'
  },
  {
    id: 'i8',
    title: 'Angular Developer',
    tags: ['Angular', 'TypeScript'],
    location: 'Nanded',
    duration: '6 Months',
    openings: 2,
    stipend: 'Unpaid',
    description: 'Develop SPA frontends with Angular and collaborate on design implementation.'
  },
  {
    id: 'i9',
    title: 'Linux Administrator & Support Engineer',
    tags: ['Linux', 'Support', 'Sysadmin'],
    location: 'Nanded',
    duration: '6 Months',
    openings: 2,
    stipend: 'Unpaid',
    description: 'Manage Linux servers, provide support for deployments and troubleshooting.'
  }
];

const TagPill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block text-xs px-2 py-1 rounded-md border border-white/10 whitespace-nowrap">{children}</span>
);

const InternshipPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(internships.flatMap((i) => i.tags))).sort();

  // modal state for Apply form
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const filtered = internships.filter((i) => {
    const matchesQuery = query.trim() === '' || (i.title + ' ' + i.description).toLowerCase().includes(query.toLowerCase());
    const matchesTag = !selectedTag || i.tags.includes(selectedTag);
    return matchesQuery && matchesTag;
  });

  // Email HR modal state
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black text-white">
      <Header />

      <main className="pt-20">
        {/* HERO */}
        <section className="py-10 text-center px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">Internships at Softforge Technology</h1>
            <p className="text-base sm:text-lg text-white/85 mb-6">Hands-on internships for students and freshers — learn by building real projects with mentors.</p>

            <div className="mx-auto max-w-xl w-full flex items-center gap-3 bg-white/6 rounded-full px-3 py-2">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roles, skills or keywords..."
                className="bg-transparent placeholder:text-white/60 flex-1 outline-none px-2 py-1 text-sm"
              />
              <button onClick={() => setQuery('')} className="hidden sm:inline-block px-4 py-2 rounded-full bg-white text-purple-900 font-semibold text-sm">Clear</button>
            </div>

            <div className="mt-4 sm:mt-6">
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex gap-3 w-max">
                  {allTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                      className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${selectedTag === t ? 'bg-white text-purple-900' : 'bg-white/6'}`}>
                      #{t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERNSHIP CARDS */}
        <section className="py-8 px-4 sm:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((intern) => (
                <div key={intern.id} className="p-5 rounded-2xl bg-white/5 hover:bg-white/6 transition">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold">{intern.title}</h3>
                      <p className="text-sm text-white/75 mt-2 line-clamp-3">{intern.description}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/70">
                        <span className="flex items-center gap-2"><Calendar size={14} /> {intern.duration}</span>
                        <span>•</span>
                        <span className="flex items-center gap-2"><MapPin size={14} /> {intern.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-2"><Users size={14} /> {intern.openings} openings</span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {intern.tags.map((tg) => <TagPill key={tg}>#{tg}</TagPill>)}
                      </div>
                    </div>

                    <div className="w-full sm:w-auto text-right flex-shrink-0">
                      <button
                        onClick={() => { setSelectedRole(intern.title); setModalOpen(true); }}
                        className="mt-3 sm:mt-0 w-full sm:w-auto block px-4 py-2 rounded-md bg-white text-purple-900 font-semibold">
                        Apply
                      </button>

                      <div className="text-xs text-white/60 mt-2">{intern.stipend}</div>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full p-6 rounded-xl bg-white/4 text-center">No internships found. Try a different keyword or tag.</div>
              )}
            </div>
          </div>
        </section>

        {/* SIMPLE CTA */}
        <section className="py-10 bg-white/6 px-4 sm:px-6">
          <div className="container mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Want to intern with us?</h3>
            <p className="text-sm text-white/80 mb-4">Send your CV and a short note to hr@softforgetechnology.com with the role you’re interested in.</p>
            <button onClick={() => setEmailModalOpen(true)} className="inline-block px-6 py-3 rounded-md bg-white text-purple-900 font-semibold">Email HR</button>
          </div>
        </section>
      </main>

      <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)} role={selectedRole} />
      <EmailModal open={emailModalOpen} onClose={() => setEmailModalOpen(false)} />
      <Footer />
    </div>
  );
};

// --- APPLY FORM MODAL ADDED BELOW ---

type ApplyModalProps = { open: boolean; onClose: () => void; role: string };

type FormDataType = {
  fullName: string;
  email: string;
  mobile: string;
  stream: string;
  college: string;
  address: string;
  resume: File | null;
};

const ApplyModal: React.FC<ApplyModalProps> = ({ open, onClose, role }) => {
  const [formData, setFormData] = React.useState<FormDataType>({
    fullName: '',
    email: '',
    mobile: '',
    stream: '',
    college: '',
    address: '',
    resume: null
  });

  if (!open) return null;

  // Handles text inputs and textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value } as unknown as FormDataType));
  };

  // Handles file input separately (strongly typed)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      resumeName: formData.resume ? formData.resume.name : null
    };
    console.log('APPLICATION SUBMITTED:', payload);
    alert('Application Submitted Successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-purple-600 text-black w-full max-w-full sm:max-w-lg p-5 sm:p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Apply for {role}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className=" mr-2 w-full p-1 border rounded-xl" required />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-1 border rounded-xl" required />
          <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} className="w-full p-1 border rounded-xl" required />
          <input name="stream" placeholder="Stream" value={formData.stream} onChange={handleChange} className="w-full p-1 border rounded-xl" required />
          <input name="college" placeholder="College" value={formData.college} onChange={handleChange} className="w-full p-1 border rounded-xl" required />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-1 border rounded-xl" required />
          <input name="resume" type="file" className="w-full" onChange={handleFileChange} />

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded w-full sm:w-auto">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-400 text-white rounded w-full sm:w-auto">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- EMAIL HR MODAL ---

type EmailFormType = { name: string; email: string; resume: File | null };

const EmailModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [state, setState] = React.useState<EmailFormType>({ name: '', email: '', resume: null });
  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((p) => ({ ...p, [name]: value } as EmailFormType));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setState((p) => ({ ...p, resume: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just log — replace with your API/email logic
    console.log('EMAIL HR PAYLOAD:', state);
    alert('Details sent to HR (demo)');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-purple-500 text-black w-full max-w-full sm:max-w-md p-5 sm:p-6 rounded-xl shadow-xl">
        <h3 className="text-lg font-semibold mb-3">Email HR</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" placeholder="Your name" value={state.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="email" placeholder="Your email" value={state.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="resume" type="file" className="w-full" onChange={handleFile} />

<<<<<<< HEAD
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Send</button>
=======
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded w-full sm:w-auto">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded w-full sm:w-auto">Send</button>
>>>>>>> d73853db8ee028aa2c64be381847bea04e91778a
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternshipPage;
