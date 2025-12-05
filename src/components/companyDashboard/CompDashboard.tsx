// src/pages/company/CompDashboard.tsx
import { useState, useEffect } from 'react';
import { Search, Plus, Home, Users, CheckSquare, BarChart3, LogOut, Edit, Trash2, X, Filter, Calendar, MessageSquare, Paperclip, LayoutGrid, List, UserMinus, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

interface Employee {
  name: string;
  empId: string;
  email: string;
  phone: string;
  dept: string;
  position: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  photo: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assigneePhoto: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  project: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  comments: number;
  attachments: number;
  checklist: { text: string; completed: boolean }[];
}

function CompDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'tasks'>('overview');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [taskSearch, setTaskSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
  const [photoPreview, setPhotoPreview] = useState('https://via.placeholder.com/150');
  const [taskFilter, setTaskFilter] = useState<'All' | 'My Tasks' | 'Overdue' | 'This Week'>('All');
  const [taskView, setTaskView] = useState<'kanban' | 'table'>('kanban');
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [form, setForm] = useState<Employee>({
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
  const [taskForm, setTaskForm] = useState<Task>({
    id: '',
    title: '',
    description: '',
    assignee: '',
    assigneePhoto: '',
    priority: 'Medium',
    dueDate: '',
    project: '',
    status: 'To Do',
    comments: 0,
    attachments: 0,
    checklist: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem('employees');
    if (saved) setEmployees(JSON.parse(saved));

    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Sample tasks data
      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Design new landing page',
          description: 'Create mockups for the new product landing page',
          assignee: 'John Doe',
          assigneePhoto: 'https://via.placeholder.com/40',
          priority: 'High',
          dueDate: '2025-12-08',
          project: 'Website Redesign',
          status: 'In Progress',
          comments: 3,
          attachments: 2,
          checklist: [
            { text: 'Research competitors', completed: true },
            { text: 'Create wireframes', completed: true },
            { text: 'Design mockups', completed: false }
          ]
        },
        {
          id: '2',
          title: 'Fix authentication bug',
          description: 'Users cannot login with Google OAuth',
          assignee: 'Jane Smith',
          assigneePhoto: 'https://via.placeholder.com/40',
          priority: 'High',
          dueDate: '2025-12-03',
          project: 'Bug Fixes',
          status: 'To Do',
          comments: 5,
          attachments: 0,
          checklist: []
        },
        {
          id: '3',
          title: 'Update documentation',
          description: 'Add API endpoints documentation',
          assignee: 'Mike Johnson',
          assigneePhoto: 'https://via.placeholder.com/40',
          priority: 'Medium',
          dueDate: '2025-12-10',
          project: 'Documentation',
          status: 'Review',
          comments: 1,
          attachments: 1,
          checklist: [
            { text: 'List all endpoints', completed: true },
            { text: 'Add examples', completed: false }
          ]
        },
        {
          id: '4',
          title: 'Employee onboarding process',
          description: 'Create checklist for new employees',
          assignee: 'Sarah Williams',
          assigneePhoto: 'https://via.placeholder.com/40',
          priority: 'Low',
          dueDate: '2025-12-15',
          project: 'HR',
          status: 'Done',
          comments: 2,
          attachments: 3,
          checklist: []
        },
        {
          id: '5',
          title: 'Q4 Performance Review',
          description: 'Conduct performance reviews for all team members',
          assignee: 'John Doe',
          assigneePhoto: 'https://via.placeholder.com/40',
          priority: 'High',
          dueDate: '2025-12-06',
          project: 'HR',
          status: 'In Progress',
          comments: 8,
          attachments: 5,
          checklist: [
            { text: 'Schedule meetings', completed: true },
            { text: 'Prepare feedback forms', completed: false },
            { text: 'Conduct reviews', completed: false }
          ]
        }
      ];
      setTasks(sampleTasks);
    }

    // Check for logged in user
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoginMode(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
      updated[editingIndex] = form;
      setEmployees(updated);
    } else {
      setEmployees([...employees, form]);
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

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const deleteEmployee = (index: number) => {
    if (confirm('Delete this employee?')) {
      setEmployees(employees.filter((_, i) => i !== index));
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      setIsLoginMode(true);
      navigate('/');
    }
  };

  const handleLogin = (employee: Employee) => {
    setCurrentUser(employee);
    localStorage.setItem('currentUser', JSON.stringify(employee));
    setIsLoginMode(false);
  };

  const isAdmin = () => {
    return currentUser?.position?.toLowerCase().includes('admin') ||
      currentUser?.position?.toLowerCase().includes('manager') ||
      currentUser?.dept?.toLowerCase().includes('admin');
  };

  const openTaskModal = () => {
    setEditingTaskIndex(null);
    setTaskForm({
      id: Date.now().toString(),
      title: '',
      description: '',
      assignee: '',
      assigneePhoto: '',
      priority: 'Medium',
      dueDate: '',
      project: '',
      status: 'To Do',
      comments: 0,
      attachments: 0,
      checklist: [],
    });
    setIsTaskModalOpen(true);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTaskIndex !== null) {
      const updated = [...tasks];
      updated[editingTaskIndex] = taskForm;
      setTasks(updated);
    } else {
      setTasks([...tasks, taskForm]);
    }
    setIsTaskModalOpen(false);
    setEditingTaskIndex(null);
  };

  const openEditTask = (index: number) => {
    const task = filterTasks()[index];
    const actualIndex = tasks.findIndex(t => t.id === task.id);
    setEditingTaskIndex(actualIndex);
    setTaskForm(task);
    setIsTaskModalOpen(true);
  };

  const deleteTask = (index: number) => {
    const task = filterTasks()[index];
    if (confirm(`Delete task "${task.title}"?`)) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
  };

  const reassignTask = (taskId: string, newAssignee: string, newPhoto: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, assignee: newAssignee, assigneePhoto: newPhoto }
        : task
    ));
  };

  const removeEmployeeFromTask = (taskId: string) => {
    if (confirm('Remove assignee from this task?')) {
      setTasks(tasks.map(task =>
        task.id === taskId
          ? { ...task, assignee: 'Unassigned', assigneePhoto: 'https://via.placeholder.com/40' }
          : task
      ));
    }
  };

  const addChecklistItem = () => {
    setTaskForm({
      ...taskForm,
      checklist: [...taskForm.checklist, { text: '', completed: false }]
    });
  };

  const updateChecklistItem = (index: number, text: string) => {
    const updated = [...taskForm.checklist];
    updated[index].text = text;
    setTaskForm({ ...taskForm, checklist: updated });
  };

  const removeChecklistItem = (index: number) => {
    setTaskForm({
      ...taskForm,
      checklist: taskForm.checklist.filter((_, i) => i !== index)
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const filterTasks = () => {
    let filtered = tasks;

    // If not admin, only show tasks assigned to current user
    if (!isAdmin() && currentUser) {
      filtered = filtered.filter(task => task.assignee === currentUser.name);
    }

    if (taskFilter === 'Overdue') {
      filtered = filtered.filter(task => isOverdue(task.dueDate) && task.status !== 'Done');
    } else if (taskFilter === 'This Week') {
      const today = new Date();
      const weekEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && dueDate <= weekEnd;
      });
    } else if (taskFilter === 'My Tasks') {
      filtered = filtered.filter(task => task.assignee === currentUser?.name);
    }

    if (taskSearch) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
        task.description.toLowerCase().includes(taskSearch.toLowerCase())
      );
    }

    return filtered;
  };

  const getTaskStats = () => {
    // Filter tasks based on user role
    const userTasks = !isAdmin() && currentUser
      ? tasks.filter(t => t.assignee === currentUser.name)
      : tasks;

    const total = userTasks.length;
    const overdue = userTasks.filter(t => isOverdue(t.dueDate) && t.status !== 'Done').length;
    const today = new Date();
    const weekStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const completedThisWeek = userTasks.filter(t => {
      return t.status === 'Done' && new Date(t.dueDate) >= weekStart;
    }).length;
    const myPending = userTasks.filter(t => t.status !== 'Done').length;

    return { total, overdue, completedThisWeek, myPending };
  };

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.empId.includes(search)
  );

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black">
      {/* Login Screen */}
      {isLoginMode ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl shadow-2xl">
            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Employee Management System
            </h1>
            <p className="text-center text-gray-600 mb-8">Select your profile to login</p>

            {employees.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No employees registered yet</p>
                <button
                  onClick={() => {
                    setIsLoginMode(false);
                    const adminUser: Employee = {
                      name: 'Admin',
                      empId: 'ADMIN001',
                      email: 'admin@company.com',
                      phone: '',
                      dept: 'Administration',
                      position: 'System Administrator',
                      joinDate: new Date().toISOString().split('T')[0],
                      status: 'Active',
                      photo: 'https://via.placeholder.com/150'
                    };
                    setCurrentUser(adminUser);
                    localStorage.setItem('currentUser', JSON.stringify(adminUser));
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Continue as Admin
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.filter(emp => emp.status === 'Active').map((emp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLogin(emp)}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={emp.photo || 'https://via.placeholder.com/60'}
                        alt={emp.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-200 group-hover:border-purple-500"
                      />
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{emp.name}</h3>
                        <p className="text-sm text-gray-500">{emp.empId}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600"><span className="font-semibold">Position:</span> {emp.position}</p>
                      <p className="text-gray-600"><span className="font-semibold">Department:</span> {emp.dept}</p>
                      <p className="text-gray-600"><span className="font-semibold">Email:</span> {emp.email}</p>
                    </div>
                    <div className="mt-4 text-center">
                      <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        Login
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Close Button */}
          <button
            onClick={() => navigate(-1)}
            className="fixed top-4 right-4 z-50 p-2 h-10 w-10 rounded-full bg-red-600 hover:bg-red-700 text-white border border-red-500 shadow-lg transition-all duration-200 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-purple-950 to-purple-900 text-white flex flex-col shadow-2xl border-r border-purple-700">
              {/* User Profile Section */}
              <div className="p-6 border-b border-purple-700">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={currentUser?.photo || 'https://via.placeholder.com/60'}
                    alt={currentUser?.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-400"
                  />
                  <div>
                    <h2 className="font-bold text-lg">{currentUser?.name}</h2>
                    <p className="text-xs text-purple-300">{currentUser?.position}</p>
                  </div>
                </div>
                <div className="bg-purple-800/50 rounded-lg p-3 text-xs space-y-1">
                  <p><span className="text-purple-300">ID:</span> {currentUser?.empId}</p>
                  <p><span className="text-purple-300">Dept:</span> {currentUser?.dept}</p>
                  <p><span className="text-purple-300">Role:</span> {isAdmin() ? 'Admin' : 'Employee'}</p>
                </div>
              </div>

              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'overview'
                      ? 'bg-purple-600 shadow-lg scale-105'
                      : 'hover:bg-purple-800 hover:scale-102'
                    }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </button>

                {isAdmin() && (
                  <>
                    <button
                      onClick={() => setActiveTab('employees')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'employees'
                          ? 'bg-purple-600 shadow-lg scale-105'
                          : 'hover:bg-purple-800 hover:scale-102'
                        }`}
                    >
                      <Users className="w-5 h-5" />
                      <span className="font-medium">All Employees</span>
                    </button>

                    <button
                      onClick={openAddModal}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 bg-green-700 shadow-md"
                    >
                      <Plus className="w-5 h-5" />
                      <span className="font-medium">Add Employee</span>
                    </button>
                  </>
                )}

                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'tasks'
                      ? 'bg-purple-600 shadow-lg scale-105'
                      : 'hover:bg-purple-800 hover:scale-102'
                    }`}
                >
                  <CheckSquare className="w-5 h-5" />
                  <span className="font-medium">{isAdmin() ? 'All Tasks' : 'My Tasks'}</span>
                </button>

                {isAdmin() && (
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-800 transition-all duration-200"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span className="font-medium">Reports</span>
                  </button>
                )}
              </nav>

              <div className="p-4 border-t border-purple-700">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200 shadow-md"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="p-8">
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                      {isAdmin() ? 'Team Overview' : 'My Dashboard'}
                    </h1>
                    <p className="text-purple-200">
                      {isAdmin() ? 'Manage and monitor your workforce' : 'Track your tasks and progress'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl shadow-xl border border-purple-500">
                      <h3 className="text-purple-100 text-sm uppercase tracking-wide mb-2">
                        {isAdmin() ? 'Total Employees' : 'My Total Tasks'}
                      </h3>
                      <p className="text-5xl font-bold text-white">
                        {isAdmin() ? employees.length : getTaskStats().total}
                      </p>
                      <div className="mt-4 h-2 bg-purple-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-300" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl shadow-xl border border-green-500">
                      <h3 className="text-green-100 text-sm uppercase tracking-wide mb-2">
                        {isAdmin() ? 'Active Employees' : 'Completed This Week'}
                      </h3>
                      <p className="text-5xl font-bold text-white">
                        {isAdmin()
                          ? employees.filter(e => e.status === 'Active').length
                          : getTaskStats().completedThisWeek
                        }
                      </p>
                      <div className="mt-4 h-2 bg-green-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-300" style={{
                          width: isAdmin() && employees.length
                            ? `${(employees.filter(e => e.status === 'Active').length / employees.length * 100)}%`
                            : '100%'
                        }}></div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-6 rounded-xl shadow-xl border border-yellow-500">
                      <h3 className="text-yellow-100 text-sm uppercase tracking-wide mb-2">
                        {isAdmin() ? 'On Leave' : 'Pending Tasks'}
                      </h3>
                      <p className="text-5xl font-bold text-white">
                        {isAdmin()
                          ? employees.filter(e => e.status === 'On Leave').length
                          : getTaskStats().myPending
                        }
                      </p>
                      <div className="mt-4 h-2 bg-yellow-800 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-300" style={{
                          width: isAdmin() && employees.length
                            ? `${(employees.filter(e => e.status === 'On Leave').length / employees.length * 100)}%`
                            : '100%'
                        }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Employee View - Show their tasks */}
                  {!isAdmin() && (
                    <div className="bg-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-700">
                      <h2 className="text-2xl font-bold text-white mb-4">My Recent Tasks</h2>
                      <div className="space-y-3">
                        {tasks.filter(t => t.assignee === currentUser?.name).slice(0, 5).map(task => (
                          <div key={task.id} className="bg-white rounded-lg p-4 flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-gray-800">{task.title}</h3>
                              <p className="text-sm text-gray-600">{task.project}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.status === 'To Do' ? 'bg-gray-600 text-white' :
                                  task.status === 'In Progress' ? 'bg-yellow-600 text-white' :
                                    task.status === 'Review' ? 'bg-blue-600 text-white' :
                                      'bg-green-600 text-white'
                                }`}>
                                {task.status}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
                                  task.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                    'bg-green-100 text-green-700'
                                }`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Admin View */}
                  {isAdmin() && employees.length === 0 && (
                    <div className="bg-purple-900/50 backdrop-blur-sm rounded-xl p-12 text-center border border-purple-700">
                      <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">No Employees Yet</h3>
                      <p className="text-purple-300 mb-6">Start building your team by adding your first employee</p>
                      <button
                        onClick={openAddModal}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
                      >
                        Add First Employee
                      </button>
                    </div>
                  )}

                  {isAdmin() && employees.length > 0 && (
                    <div className="bg-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-700">
                      <h2 className="text-2xl font-bold text-white mb-4">System Activity</h2>
                      <p className="text-purple-300">Employee management dashboard is active with {employees.length} team members and {tasks.length} total tasks</p>
                    </div>
                  )}
                </div>
              )}

              {/* Employees Tab */}
              {activeTab === 'employees' && (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-2">All Employees</h1>
                      <p className="text-purple-200">Manage your team members</p>
                    </div>
                    <button
                      onClick={openAddModal}
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
                    >
                      <Plus className="w-5 h-5" />
                      Add Employee
                    </button>
                  </div>

                  <div className="relative mb-6">
                    <Search className="absolute left-4 top-4 text-purple-300 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search employees by name or ID..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-purple-900/50 border border-purple-700 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="bg-purple-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-purple-700">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-purple-950/80">
                          <tr>
                            <th className="px-6 py-4 text-left text-purple-200 font-semibold">Photo</th>
                            <th className="px-6 py-4 text-left text-purple-200 font-semibold">Name</th>
                            <th className="px-6 py-4 text-left text-purple-200 font-semibold">ID</th>
                            <th className="px-6 py-4 text-left text-purple-200 font-semibold">Department</th>
                            <th className="px-6 py-4 text-left text-purple-200 font-semibold">Position</th>
                            <th className="px-6 py-4 text-left text-purple-200 font-semibold">Email</th>
                            <th className="px-6 py-4 text-left text-purple-200 font-semibold">Status</th>
                            <th className="px-6 py-4 text-left text-purple-200 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="px-6 py-12 text-center text-purple-300">
                                {search ? 'No employees found matching your search' : 'No employees added yet'}
                              </td>
                            </tr>
                          ) : (
                            filtered.map((emp, i) => (
                              <tr key={i} className="border-t border-purple-800 hover:bg-purple-800/30 transition-colors duration-150">
                                <td className="px-6 py-4">
                                  <img
                                    src={emp.photo || 'https://via.placeholder.com/40'}
                                    alt={emp.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 shadow-md"
                                  />
                                </td>
                                <td className="px-6 py-4 text-white font-medium">{emp.name}</td>
                                <td className="px-6 py-4 text-purple-200">{emp.empId}</td>
                                <td className="px-6 py-4 text-purple-200">{emp.dept || '-'}</td>
                                <td className="px-6 py-4 text-purple-200">{emp.position || '-'}</td>
                                <td className="px-6 py-4 text-purple-200">{emp.email}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${emp.status === 'Active' ? 'bg-green-600 text-white' :
                                      emp.status === 'On Leave' ? 'bg-yellow-600 text-white' :
                                        'bg-red-600 text-white'
                                    }`}>
                                    {emp.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => openEdit(i)}
                                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-all duration-150"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                      onClick={() => deleteEmployee(i)}
                                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-150"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tasks Tab */}
              {activeTab === 'tasks' && (
                <div className="p-8">
                  {/* Top Bar */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                      <h1 className="text-4xl font-bold text-white">
                        {isAdmin() ? 'Tasks & To-Do' : 'My Tasks'}
                      </h1>
                      {isAdmin() && (
                        <button
                          onClick={openTaskModal}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all duration-200 shadow-lg font-semibold"
                        >
                          <Plus className="w-5 h-5" />
                          Create New Task
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                      {/* Filter Dropdowns */}
                      <div className="flex gap-2">
                        {(['All', 'My Tasks', 'Overdue', 'This Week'] as const).map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setTaskFilter(filter)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${taskFilter === filter
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700'
                              }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>

                      {/* View Toggle */}
                      <div className="flex gap-2 ml-auto">
                        <button
                          onClick={() => setTaskView('kanban')}
                          className={`p-2 rounded-lg ${taskView === 'kanban' ? 'bg-purple-600' : 'bg-purple-800/50'}`}
                        >
                          <LayoutGrid className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={() => setTaskView('table')}
                          className={`p-2 rounded-lg ${taskView === 'table' ? 'bg-purple-600' : 'bg-purple-800/50'}`}
                        >
                          <List className="w-5 h-5 text-white" />
                        </button>
                      </div>

                      {/* Search Bar */}
                      <div className="relative flex-1 min-w-[300px]">
                        <Search className="absolute left-4 top-3 text-purple-300 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search tasks..."
                          value={taskSearch}
                          onChange={(e) => setTaskSearch(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-purple-900/50 border border-purple-700 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Kanban View */}
                  {taskView === 'kanban' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {(['To Do', 'In Progress', 'Review', 'Done'] as const).map((status) => (
                        <div key={status} className="bg-purple-900/30 rounded-xl p-4 border border-purple-700">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-white flex items-center gap-2">
                              <span className={`w-3 h-3 rounded-full ${status === 'To Do' ? 'bg-gray-400' :
                                  status === 'In Progress' ? 'bg-yellow-400' :
                                    status === 'Review' ? 'bg-blue-400' :
                                      'bg-green-400'
                                }`}></span>
                              {status}
                            </h3>
                            <span className="bg-purple-800 px-2 py-1 rounded-full text-xs text-white">
                              {filterTasks().filter(t => t.status === status).length}
                            </span>
                          </div>

                          <div className="space-y-3 max-h-[600px] overflow-y-auto">
                            {filterTasks().filter(task => task.status === status).map((task, idx) => (
                              <div
                                key={task.id}
                                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200"
                              >
                                {/* Task Title */}
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-bold text-gray-800 flex-1">{task.title}</h4>
                                  {isAdmin() && (
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => openEditTask(filterTasks().findIndex(t => t.id === task.id))}
                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                        title="Edit task"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => deleteTask(filterTasks().findIndex(t => t.id === task.id))}
                                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                                        title="Delete task"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  )}
                                </div>

                                {/* Assignee with Actions */}
                                <div className="flex items-center justify-between mb-2 bg-gray-50 p-2 rounded">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={task.assigneePhoto}
                                      alt={task.assignee}
                                      className="w-6 h-6 rounded-full"
                                    />
                                    <span className="text-sm text-gray-600">{task.assignee}</span>
                                  </div>
                                  {isAdmin() && (
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => {
                                          const newAssignee = prompt('Enter new assignee name:');
                                          if (newAssignee) {
                                            const employee = employees.find(e => e.name === newAssignee);
                                            reassignTask(task.id, newAssignee, employee?.photo || 'https://via.placeholder.com/40');
                                          }
                                        }}
                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                        title="Reassign task"
                                      >
                                        <UserPlus className="w-3 h-3" />
                                      </button>
                                      {task.assignee !== 'Unassigned' && (
                                        <button
                                          onClick={() => removeEmployeeFromTask(task.id)}
                                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                                          title="Remove assignee"
                                        >
                                          <UserMinus className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* Priority & Due Date */}
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
                                      task.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                    {task.priority}
                                  </span>
                                  <div className="flex items-center gap-1 text-xs text-gray-600">
                                    <Calendar className="w-3 h-3" />
                                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                  </div>
                                  {isOverdue(task.dueDate) && task.status !== 'Done' && (
                                    <span className="px-2 py-1 bg-red-500 text-white rounded text-xs font-semibold">
                                      Overdue
                                    </span>
                                  )}
                                </div>

                                {/* Project Tag */}
                                <div className="mb-2">
                                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                    {task.project}
                                  </span>
                                </div>

                                {/* Comments & Attachments */}
                                <div className="flex items-center gap-3 text-gray-500 text-sm">
                                  <div className="flex items-center gap-1">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>{task.comments}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Paperclip className="w-4 h-4" />
                                    <span>{task.attachments}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

              
                  {/* Table View */}
                  {taskView === 'table' && (
                    <div className="bg-purple-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-purple-700 mb-8">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-purple-950/80">
                            <tr>
                              <th className="px-6 py-4 text-left text-purple-200 font-semibold">Task</th>
                              <th className="px-6 py-4 text-left text-purple-200 font-semibold">Assignee</th>
                              <th className="px-6 py-4 text-left text-purple-200 font-semibold">Priority</th>
                              <th className="px-6 py-4 text-left text-purple-200 font-semibold">Due Date</th>
                              <th className="px-6 py-4 text-left text-purple-200 font-semibold">Status</th>
                              <th className="px-6 py-4 text-left text-purple-200 font-semibold">Project</th>
                              <th className="px-6 py-4 text-left text-purple-200 font-semibold">Activity</th>
                              <th className="px-6 py-4 text-left text-purple-200 font-semibold">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterTasks().map((task, idx) => (
                              <tr key={task.id} className="border-t border-purple-800 hover:bg-purple-800/30 transition-colors duration-150">
                                <td className="px-6 py-4 text-white font-medium">{task.title}</td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <img src={task.assigneePhoto} alt={task.assignee} className="w-8 h-8 rounded-full" />
                                    <span className="text-purple-200">{task.assignee}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.priority === 'High' ? 'bg-red-600 text-white' :
                                      task.priority === 'Medium' ? 'bg-orange-600 text-white' :
                                        'bg-green-600 text-white'
                                    }`}>
                                    {task.priority}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-purple-200">{new Date(task.dueDate).toLocaleDateString()}</span>
                                    {isOverdue(task.dueDate) && task.status !== 'Done' && (
                                      <span className="px-2 py-1 bg-red-500 text-white rounded text-xs">Overdue</span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.status === 'To Do' ? 'bg-gray-600 text-white' :
                                      task.status === 'In Progress' ? 'bg-yellow-600 text-white' :
                                        task.status === 'Review' ? 'bg-blue-600 text-white' :
                                          'bg-green-600 text-white'
                                    }`}>
                                    {task.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="text-purple-200">{task.project}</span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3 text-purple-300">
                                    <div className="flex items-center gap-1">
                                      <MessageSquare className="w-4 h-4" />
                                      <span>{task.comments}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Paperclip className="w-4 h-4" />
                                      <span>{task.attachments}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    {isAdmin() && (
                                      <>
                                        <button
                                          onClick={() => openEditTask(idx)}
                                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-all duration-150"
                                          title="Edit task"
                                        >
                                          <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => {
                                            const newAssignee = prompt('Enter new assignee name:');
                                            if (newAssignee) {
                                              const employee = employees.find(e => e.name === newAssignee);
                                              reassignTask(task.id, newAssignee, employee?.photo || 'https://via.placeholder.com/40');
                                            }
                                          }}
                                          className="p-2 text-green-400 hover:text-green-300 hover:bg-green-900/30 rounded-lg transition-all duration-150"
                                          title="Reassign task"
                                        >
                                          <UserPlus className="w-4 h-4" />
                                        </button>
                                        {task.assignee !== 'Unassigned' && (
                                          <button
                                            onClick={() => removeEmployeeFromTask(task.id)}
                                            className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/30 rounded-lg transition-all duration-150"
                                            title="Remove assignee"
                                          >
                                            <UserMinus className="w-4 h-4" />
                                          </button>
                                        )}
                                        <button
                                          onClick={() => deleteTask(idx)}
                                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-150"
                                          title="Delete task"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </>
                                    )}
                                    {!isAdmin() && (
                                      <span className="text-purple-300 text-sm">View Only</span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Quick Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-xl">
                      <h3 className="text-blue-100 text-sm uppercase tracking-wide mb-2">Total Tasks</h3>
                      <p className="text-4xl font-bold text-white">{getTaskStats().total}</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl shadow-xl">
                      <h3 className="text-red-100 text-sm uppercase tracking-wide mb-2">Overdue</h3>
                      <p className="text-4xl font-bold text-white">{getTaskStats().overdue}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl shadow-xl">
                      <h3 className="text-green-100 text-sm uppercase tracking-wide mb-2">Completed This Week</h3>
                      <p className="text-4xl font-bold text-white">{getTaskStats().completedThisWeek}</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-6 rounded-xl shadow-xl">
                      <h3 className="text-yellow-100 text-sm uppercase tracking-wide mb-2">My Pending</h3>
                      <p className="text-4xl font-bold text-white">{getTaskStats().myPending}</p>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-purple-700 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  {editingIndex !== null ? 'Edit' : 'Add'} Employee
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-purple-200">Photo</label>
                    <div className="flex items-center gap-4">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-purple-600 shadow-lg"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="flex-1 text-purple-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-700 file:text-white hover:file:bg-purple-600 file:cursor-pointer"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="p-3 border border-purple-700 bg-purple-900/50 rounded-lg w-full text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Employee ID"
                    required
                    value={form.empId}
                    onChange={(e) => setForm({ ...form, empId: e.target.value })}
                    className="p-3 border border-purple-700 bg-purple-900/50 rounded-lg w-full text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="p-3 border border-purple-700 bg-purple-900/50 rounded-lg w-full text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="p-3 border border-purple-700 bg-purple-900/50 rounded-lg w-full text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Department"
                    value={form.dept}
                    onChange={(e) => setForm({ ...form, dept: e.target.value })}
                    className="p-3 border border-purple-700 bg-purple-900/50 rounded-lg w-full text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="p-3 border border-purple-700 bg-purple-900/50 rounded-lg w-full text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="date"
                    value={form.joinDate}
                    onChange={(e) => setForm({ ...form, joinDate: e.target.value })}
                    className="p-3 border border-purple-700 bg-purple-900/50 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as Employee['status'] })}
                    className="p-3 border border-purple-700 bg-purple-900/50 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 border border-purple-700 rounded-lg hover:bg-purple-800 text-white transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Task Modal */}
          {isTaskModalOpen && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  {editingTaskIndex !== null ? 'Edit' : 'Create New'} Task
                </h2>
                <form onSubmit={handleTaskSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Task Title *</label>
                    <input
                      type="text"
                      placeholder="Enter task title"
                      required
                      value={taskForm.title}
                      onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Description</label>
                    <textarea
                      placeholder="Enter task description"
                      value={taskForm.description}
                      onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                      rows={4}
                      className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Checklist */}
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Checklist</label>
                    <div className="space-y-2 mb-2">
                      {taskForm.checklist.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Checklist item"
                            value={item.text}
                            onChange={(e) => updateChecklistItem(index, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeChecklistItem(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addChecklistItem}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add checklist item
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Assignee */}
                    <div>
                      <label className="block mb-2 font-semibold text-gray-700">Assignee *</label>
                      <select
                        required
                        value={taskForm.assignee}
                        onChange={(e) => {
                          const selectedEmployee = employees.find(emp => emp.name === e.target.value);
                          setTaskForm({
                            ...taskForm,
                            assignee: e.target.value,
                            assigneePhoto: selectedEmployee?.photo || 'https://via.placeholder.com/40'
                          });
                        }}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select assignee</option>
                        {employees.map((emp, i) => (
                          <option key={i} value={emp.name}>{emp.name}</option>
                        ))}
                        <option value="John Doe">John Doe</option>
                        <option value="Jane Smith">Jane Smith</option>
                        <option value="Mike Johnson">Mike Johnson</option>
                        <option value="Sarah Williams">Sarah Williams</option>
                      </select>
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block mb-2 font-semibold text-gray-700">Priority *</label>
                      <select
                        required
                        value={taskForm.priority}
                        onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as Task['priority'] })}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Due Date */}
                    <div>
                      <label className="block mb-2 font-semibold text-gray-700">Due Date *</label>
                      <input
                        type="date"
                        required
                        value={taskForm.dueDate}
                        onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block mb-2 font-semibold text-gray-700">Status *</label>
                      <select
                        required
                        value={taskForm.status}
                        onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value as Task['status'] })}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Review">Review</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                  </div>

                  {/* Project/Category */}
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Project/Category</label>
                    <input
                      type="text"
                      placeholder="e.g., Website Redesign, Bug Fixes"
                      value={taskForm.project}
                      onChange={(e) => setTaskForm({ ...taskForm, project: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Attach Files */}
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Attach Files</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-400 mt-1">PDF, DOC, Images (Max 10MB)</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setIsTaskModalOpen(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg font-semibold"
                    >
                      {editingTaskIndex !== null ? 'Update' : 'Create'} Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <Footer />
        </div>
      )
  }  </div>
   
  );
}

export default CompDashboard;
