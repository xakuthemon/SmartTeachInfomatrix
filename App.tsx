import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useAppContext } from './services/context';
import Sidebar from './components/Sidebar';
import TeacherSidebar from './components/TeacherSidebar';
import AuthScreen from './components/AuthScreen';
import FeedbackForm from './components/FeedbackForm';
import { View, User } from './types';
import { getCurrentUser, initializeDatabase, logout } from './services/storage';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

// Student Components
import Dashboard from './components/Dashboard';
import Grades from './components/Grades';
import Leaderboard from './components/Leaderboard';
import Homework from './components/Homework';
import Calendar from './components/Calendar';
import LearningHub from './components/LearningHub';
import GoalTracker from './components/GoalTracker';
import Portfolio from './components/Portfolio';
import AIPsychologist from './components/AIPsychologist';

// Teacher Components
import TeacherProfile from './components/teacher/TeacherProfile';
import TeacherLeaderboard from './components/teacher/TeacherLeaderboard';
import TeacherGrades from './components/teacher/TeacherGrades';
import TeacherClasses from './components/teacher/TeacherClasses';
import TeacherGenerator from './components/teacher/TeacherGenerator';
import TeacherFeedback from './components/teacher/TeacherFeedback';
import TeacherHomework from './components/teacher/TeacherHomework';

// Wrapper component to use the context
const MainApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // URL Params for public routes (e.g. Feedback Form QR)
  const urlParams = new URLSearchParams(window.location.search);
  const publicView = urlParams.get('view');
  const publicId = urlParams.get('id');

  useEffect(() => {
    const init = async () => {
      await initializeDatabase();
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        setCurrentView(currentUser.role === 'student' ? 'dashboard' : 'teacher-profile');
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);
    setCurrentView(loggedInUser.role === 'student' ? 'dashboard' : 'teacher-profile');
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50/50 backdrop-blur-sm text-gray-500 font-bold animate-pulse">Loading Platform...</div>;

  // Public Routes (No Auth Needed)
  if (publicView === 'feedback' && publicId) {
    return <FeedbackForm formId={publicId} onClose={() => window.location.href = window.location.pathname} />;
  }

  // Auth Screen
  if (!isAuthenticated || !user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // View Factory
  const renderView = () => {
    if (user.role === 'student') {
      switch (currentView) {
        case 'dashboard': return <Dashboard />;
        case 'grades': return <Grades />;
        case 'leaderboard': return <Leaderboard />;
        case 'homework': return <Homework />;
        case 'calendar': return <Calendar />;
        case 'learning': return <LearningHub />;
        case 'goals': return <GoalTracker />;
        case 'portfolio': return <Portfolio />;
        case 'psychologist': return <AIPsychologist />;
        default: return <Dashboard />;
      }
    } else {
      switch (currentView) {
        case 'teacher-profile': return <TeacherProfile />;
        case 'teacher-leaderboard': return <TeacherLeaderboard />;
        case 'teacher-grades': return <TeacherGrades />;
        case 'teacher-classes': return <TeacherClasses />;
        case 'teacher-generator': return <TeacherGenerator />;
        case 'teacher-feedback': return <TeacherFeedback />;
        case 'teacher-homework': return <TeacherHomework />;
        default: return <TeacherProfile />;
      }
    }
  };

  return (
    <div className="flex min-h-screen font-sans text-gray-800 dark:text-gray-100 overflow-hidden">
      {/* Animated Sidebar Wrapper */}
      <motion.div 
        animate={{ width: isSidebarOpen ? 'auto' : 0, opacity: isSidebarOpen ? 1 : 0 }} 
        initial={{ width: 'auto', opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="overflow-hidden h-screen sticky top-0 z-30"
      >
        <div className="w-72 h-full">
            {user.role === 'student' ? (
                <Sidebar currentView={currentView} setView={setCurrentView} onLogout={handleLogout} />
            ) : (
                <TeacherSidebar currentView={currentView} setView={setCurrentView} onLogout={handleLogout} />
            )}
        </div>
      </motion.div>
      
      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto no-scrollbar relative flex flex-col">
        
        {/* Top Bar with Sidebar Toggle */}
        <div className="sticky top-0 z-20 px-6 py-4 flex items-center">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="p-2 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-white/60 dark:border-slate-700 shadow-sm hover:bg-white dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-all"
               title={isSidebarOpen ? "Скрыть меню" : "Показать меню"}
             >
               {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
             </button>
        </div>

        <div className="p-6 lg:p-10 lg:pt-2 max-w-7xl mx-auto w-full pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// Root App Component
const App: React.FC = () => {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

export default App;