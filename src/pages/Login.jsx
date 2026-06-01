import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Lock, Mail, Eye, EyeOff, Home } from 'lucide-react';
import Button from '../components/Button';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Fake loading effect taaki realistic lage client ko
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard'); // Redirect to dashboard after sign-in
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 sm:p-6 bg-gradient-to-tr from-darkBg via-gray-950 to-darkBg relative">
      <button
        aria-label="Back to Home"
        onClick={() => navigate('/')}
        className="absolute left-4 top-4 min-h-11 min-w-11 p-2 rounded-full bg-gray-800/60 hover:bg-gray-800/80 text-indigo-400 shadow-sm flex items-center justify-center"
      >
        <Home className="w-5 h-5" />
      </button>

      <div className="w-full max-w-md bg-cardBg/60 backdrop-blur-xl border border-gray-800 p-5 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_20px_rgba(99,102,241,0.8)]" />

        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3 border border-indigo-500/20 shadow-inner">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-[clamp(1.35rem,7vw,1.5rem)] font-bold text-white tracking-wide">Welcome to LiveOps Console</h2>
          <p className="text-gray-400 text-sm mt-1">Authorized cloud administration gate</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-2">System Admin Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                id="email"
                type="email" 
                required
                placeholder="admin@liveops.ai" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="System Admin Email"
                className="w-full min-h-11 bg-gray-950/60 border border-gray-800/80 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-400 tracking-wider uppercase mb-2">Access Key / Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                id="password"
                type={showPassword ? 'text' : 'password'} 
                required
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Access Key or Password"
                className="w-full min-h-11 bg-gray-950/60 border border-gray-800/80 rounded-xl py-3 pl-11 pr-11 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
              />
              <button 
                type="button"
                aria-pressed={showPassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-11 min-w-11 text-gray-500 hover:text-gray-400 transition-colors flex items-center justify-center"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-2">
            <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isLoading}>
              {isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : 'Authenticate Console'}
            </Button>
          </div>
        </form>

        {/* Demo Helper Hint */}
        <div className="mt-6 text-center text-xs text-gray-600 border-t border-gray-900 pt-4">
          💡 <span className="italic">Demo Hint: Enter any dummy email/password to pass authentication.</span>
        </div>
        <div className="mt-3 text-center text-sm">
          <span className="text-gray-400">Don't have an account?</span>
          <button onClick={() => navigate('/signup')} className="ml-2 min-h-11 text-indigo-400 font-semibold">Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
