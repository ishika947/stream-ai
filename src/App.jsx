import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Signup = lazy(() => import('./pages/Signup'));

function App() {

  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('app-theme', nextTheme);
  };

  // Base classes according to mode
  const themeClass = theme === 'dark' 
    ? 'bg-darkBg text-gray-100' 
    : 'bg-gray-50 text-gray-900';

  return (
    <Router>
      <div className={`min-h-screen antialiased selection:bg-accentBlue selection:text-darkBg transition-colors duration-300 ${themeClass}`}>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-darkBg text-white">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/login" element={<Login theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/signup" element={<Signup theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/dashboard" element={<Dashboard theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
