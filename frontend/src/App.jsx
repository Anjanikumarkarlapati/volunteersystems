import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider, useData } from './context/DataContext';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './views/Home';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Opportunities from './views/Opportunities';
import Volunteers from './views/Volunteers';
import Scheduling from './views/Scheduling';
import Attendance from './views/Attendance';
import Applications from './views/Applications';
import Training from './views/Training';
import Communications from './views/Communications';
import Settings from './views/Settings';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-screen bg-surface">
        <TopNav />
        <div className="flex-1 flex">{children}</div>
        <Footer />
      </main>
    </div>
  );
}

function PublicLayout({ children }) {
  return <>{children}</>;
}

function FAB() {
  const token = localStorage.getItem('token');

  if (!token) return null;

  return (
    <button className="fixed bottom-6 right-6 bg-primary text-white w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40 cursor-pointer shadow-black/10">
      <span className="material-symbols-outlined text-[28px]">add</span>
    </button>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/opportunities" element={<ProtectedRoute><AppLayout><Opportunities /></AppLayout></ProtectedRoute>} />
          <Route path="/volunteers" element={<ProtectedRoute><AppLayout><Volunteers /></AppLayout></ProtectedRoute>} />
          <Route path="/scheduling" element={<ProtectedRoute><AppLayout><Scheduling /></AppLayout></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><AppLayout><Attendance /></AppLayout></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><AppLayout><Applications /></AppLayout></ProtectedRoute>} />
          <Route path="/training" element={<ProtectedRoute><AppLayout><Training /></AppLayout></ProtectedRoute>} />
          <Route path="/communications" element={<ProtectedRoute><AppLayout><Communications /></AppLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><AppLayout><Settings /></AppLayout></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toast />
        <FAB />
      </DataProvider>
    </BrowserRouter>
  );
}
