import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Mail, Lock, Home } from 'lucide-react';
import Button from '../components/Button';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // After signup, redirect to dashboard (user should land on their console)
      navigate('/dashboard');
    }, 900);
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
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3 border border-indigo-500/20 shadow-inner">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-[clamp(1.35rem,7vw,1.5rem)] font-bold text-white tracking-wide">Create your LiveOps account</h2>
          <p className="text-gray-400 text-sm mt-1">Start monitoring real-time streams</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-400 mb-2">Full name</label>
            <input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="w-full min-h-11 bg-gray-950/60 border border-gray-800/80 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-400 mb-2">Work email</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full min-h-11 bg-gray-950/60 border border-gray-800/80 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Choose a secure password" className="w-full min-h-11 bg-gray-950/60 border border-gray-800/80 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">{isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"/> : 'Create Account'}</Button>
          </div>
        </form>

        <div className="mt-4 text-center text-xs text-gray-400">
          Already have an account? <button onClick={() => navigate('/login')} className="min-h-11 text-indigo-400 font-semibold ml-1">Sign in</button>
        </div>
      </div>
    </div>
  );
}
