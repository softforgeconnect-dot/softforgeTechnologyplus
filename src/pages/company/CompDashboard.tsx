// src/pages/company/CompDashboard.tsx
import { useState, useEffect } from 'react';
import { Search, Plus, Home, Users, CheckSquare, BarChart3, LogOut, Edit, Trash2 } from 'lucide-react';

interface Employee {
  name: string;
  empId: string;
  email: string;
  phone: string;
  dept: string;
  position: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  photo: string; // base64 string
}

function CompDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'tasks'>('overview');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [photoPreview, setPhotoPreview] = useState('https://via.placeholder.com/150');
  const [form, setForm] = useState<Omit<Employee, 'photo'> & { photo: string }>({
    name: '',
    empId: '',
    email: '',
    phone: '',
    dept: '',
    position: '',
    joinDate: '',
    status: 'Active',
    photo: '',
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('employees');
    if (saved) setEmployees(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // Fixed: Proper typing for FileReader result
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        setPhotoPreview(event.target.result);
        setForm({ ...form, photo: event.target.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...employees];
      updated[editingIndex] = form as Employee;
      setEmployees(updated);
    } else {
      setEmployees([...employees, form as Employee]);
    }
    closeModal();
  };

  const openAddModal = () => {
    setEditingIndex(null);
    setForm({
      name: '',
      empId: '',
      email: '',
      phone: '',
      dept: '',
      position: '',
      joinDate: '',
      status: 'Active',
      photo: ''
    });
    setPhotoPreview('https://via.placeholder.com/150');
    setIsModalOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    const emp = employees[index];
    setForm(emp);
    setPhotoPreview(emp.photo || 'https://via.placeholder.com/150');
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const deleteEmployee = (index: number) => {
    if (confirm('Delete this employee?')) {
      setEmployees(employees.filter((_, i) => i !== index));
    }
  };

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.empId.includes(search)
  );

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-blue-600 text-white flex flex-col">
          <div className="p-6 text-2xl font-bold border-b border-blue-700">
            EMS
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`sidebar-link ${activeTab === 'overview' ? 'bg-blue-700' : ''}`}>
              <Home className="w-5 h-5" />
              <span>Team Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className={`sidebar-link ${activeTab === 'employees' ? 'bg-blue-700' : ''}`}>
              <Users className="w-5 h-5" />
              <span>All Employees</span>
            </button>
            <button
              onClick={openAddModal}
              className="sidebar-link">
              <Plus className="w-5 h-5" />
              <span>Add Employee</span>
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`sidebar-link ${activeTab === 'tasks' ? 'bg-blue-700' : ''}`}>
              <CheckSquare className="w-5 h-5" />
              <span>Tasks</span>
            </button>
            <button className="sidebar-link">
              <BarChart3 className="w-5 h-5" />
              <span>Reports</span>
            </button>
          </nav>
          <button className="sidebar-link m-4 bg-red-500 hover:bg-red-600">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6">Team Overview</h1>
              {/* Cards same as before */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-600">Total Employees</h3>
                  <p className="text-3xl font-bold">{employees.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-600">Active</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {employees.filter(e => e.status === 'Active').length}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-600">On Leave</h3>
                  <p className="text-3xl font-bold text-yellow-600">
                    {employees.filter(e => e.status === 'On Leave').length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Employees List */}
          {activeTab === 'employees' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">All Employees</h1>
                <button
                  onClick={openAddModal}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                  <Plus className="w-5 h-5" />
                  Add Employee
                </button>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg"
                />
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left">Photo</th>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">ID</th>
                      <th className="px-6 py-3 text-left">Dept</th>
                      <th className="px-6 py-3 text-left">Position</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((emp, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <img
                            src={emp.photo || 'https://via.placeholder.com/40'}
                            alt={emp.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-6 py-4">{emp.name}</td>
                        <td className="px-6 py-4">{emp.empId}</td>
                        <td className="px-6 py-4">{emp.dept || '-'}</td>
                        <td className="px-6 py-4">{emp.position || '-'}</td>
                        <td className="px-6 py-4">{emp.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            emp.status === 'Active' ? 'bg-green-100 text-green-700' :
                            emp.status === 'On Leave' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => openEdit(i)}
                            className="text-blue-600 mr-4">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteEmployee(i)}
                            className="text-red-600">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingIndex !== null ? 'Edit' : 'Add'} Employee
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Photo</label>
                <div className="flex items-center gap-4">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="flex-1"
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Employee ID"
                required
                value={form.empId}
                onChange={(e) => setForm({...form, empId: e.target.value})}
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Department"
                value={form.dept}
                onChange={(e) => setForm({...form, dept: e.target.value})}
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="Position"
                value={form.position}
                onChange={(e) => setForm({...form, position: e.target.value})}
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="date"
                placeholder="Join Date"
                value={form.joinDate}
                onChange={(e) => setForm({...form, joinDate: e.target.value})}
                className="p-3 border rounded-lg w-full"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({...form, status: e.target.value as Employee['status']})}
                className="p-3 border rounded-lg w-full">
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CompDashboard;