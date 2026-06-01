import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Database, ArrowRight, Cpu, Server, Sun, Moon, Activity, Bell, Monitor, AlertTriangle, BarChart2, Menu, X } from 'lucide-react';

function LandingPage({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const headerRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const statsRef = useRef(null);
  const [counts, setCounts] = useState({ eps: 0, uptime: 0, latency: 0, clients: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    let started = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const duration = 1400;

          const targets = { eps: 10000000, uptime: 99.99, latency: 0.9, clients: 500 };

          function step(now) {
            const t = Math.min((now - start) / duration, 1);
            setCounts({
              eps: Math.floor(targets.eps * t),
              uptime: +(targets.uptime * t).toFixed(2),
              latency: +(targets.latency * t).toFixed(2),
              clients: Math.floor(targets.clients * t),
            });
            if (t < 1) requestAnimationFrame(step);
          }

          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.section-animate');
    if (!els || !els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar')) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function formatStat(key, val) {
    if (key === 'eps') {
      if (val >= 1000000) return `${Math.floor(val / 1000000)}M+`;
      if (val >= 1000) return `${Math.floor(val / 1000)}K+`;
      return `${Math.floor(val)}`;
    }
    if (key === 'uptime') return `${val.toFixed(2)}%`;
    if (key === 'latency') return val < 1 ? '<1ms' : `${val}ms`;
    if (key === 'clients') return `${val}+`;
    return val;
  }

  const dropdownPanelClass = (width) => `absolute top-full left-0 z-50 mt-3 ${width} border ${isDark ? 'bg-[#13132b] border-[#2a2a4a] text-white' : 'bg-white border-gray-200 text-gray-900'}`;
  const dropdownItemClass = `${isDark ? 'hover:bg-[#1e1e3a]' : 'hover:bg-gray-100'}`;
  const dropdownLabelClass = `${isDark ? 'text-gray-100' : 'text-gray-800'}`;
  const dropdownDescriptionClass = `text-sm ${isDark ? 'text-[#7c7c9a]' : 'text-gray-500'}`;
  const dropdownSectionLabelClass = `font-semibold mb-2 text-xs uppercase tracking-wide ${isDark ? 'text-[#4a4a6a]' : 'text-gray-400'}`;
  const dropdownDividerClass = `border-t ${isDark ? 'border-[#2a2a4a]' : 'border-gray-200'}`;
  const mobileNavItemClass = `min-h-11 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
    isDark ? 'text-gray-100 hover:bg-gray-900/80' : 'text-gray-800 hover:bg-gray-100'
  }`;

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 relative ${isDark ? 'bg-[#060814] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      <header ref={headerRef} className={`navbar border-b px-4 sm:px-6 py-3 sm:py-4 fixed top-0 left-0 right-0 w-full z-50 ${isScrolled || isMobileMenuOpen ? 'backdrop-blur-md bg-black/70' : ''} ${isDark ? 'border-gray-900' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="p-2 bg-indigo-600/10 rounded-xl border border-indigo-500/20 flex-shrink-0">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
              </div>
              <span className="text-lg sm:text-xl font-black tracking-wider whitespace-nowrap">
                LiveOps <span style={{color:'#4f3ef0'}}>AI</span>
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-1 ml-6">
               {/* Product */}
               <div className="relative">
                 <button onClick={() => setOpenDropdown(openDropdown === 'product' ? null : 'product')} className={`px-3 py-2 rounded-md text-sm font-semibold flex items-center gap-2 ${openDropdown === 'product' ? 'bg-[#13132b]' : ''}`}>
                   Product
                 </button>
                 {openDropdown === 'product' && (
                   <div className={dropdownPanelClass('w-96')} style={{borderRadius:10}}>
                     <div className="p-4 grid grid-cols-1 gap-3">
                       <a className={`flex items-start gap-3 p-2 rounded-md ${dropdownItemClass}`}>
                         <div className={`w-10 h-10 rounded-md flex items-center justify-center ${isDark ? 'bg-[#2d2060] text-[#a78bfa]' : 'bg-purple-100 text-purple-600'}`}><Monitor className="w-4 h-4"/></div>
                         <div>
                           <div className={`font-semibold ${dropdownLabelClass}`}>Live Console <span className="ml-2 text-xs bg-indigo-700 px-2 py-0.5 rounded-full">New</span></div>
                           <div className={dropdownDescriptionClass}>Real-time streaming dashboard</div>
                         </div>
                       </a>
                       <a className={`flex items-start gap-3 p-2 rounded-md ${dropdownItemClass}`}>
                         <div className={`w-10 h-10 rounded-md flex items-center justify-center ${isDark ? 'bg-[#4a1f3c] text-[#f0abfc]' : 'bg-pink-100 text-pink-600'}`}><AlertTriangle className="w-4 h-4"/></div>
                         <div>
                           <div className={`font-semibold ${dropdownLabelClass}`}>Anomaly Detection</div>
                           <div className={dropdownDescriptionClass}>AI-powered fraud & threat alerts</div>
                         </div>
                       </a>
                       <a className={`flex items-start gap-3 p-2 rounded-md ${dropdownItemClass}`}>
                         <div className={`w-10 h-10 rounded-md flex items-center justify-center ${isDark ? 'bg-[#153f3d] text-[#5eead4]' : 'bg-teal-100 text-teal-600'}`}><Server className="w-4 h-4"/></div>
                         <div>
                           <div className={`font-semibold ${dropdownLabelClass}`}>Kafka Highway</div>
                           <div className={dropdownDescriptionClass}>Millions of events/sec ingest</div>
                         </div>
                       </a>
                       <a className={`flex items-start gap-3 p-2 rounded-md ${dropdownItemClass}`}>
                         <div className={`w-10 h-10 rounded-md flex items-center justify-center ${isDark ? 'bg-[#1e2d5c] text-[#93c5fd]' : 'bg-blue-100 text-blue-600'}`}><BarChart2 className="w-4 h-4"/></div>
                         <div>
                           <div className={`font-semibold ${dropdownLabelClass}`}>Analytics Engine</div>
                           <div className={dropdownDescriptionClass}>Grafana-powered live metrics</div>
                         </div>
                       </a>
                       <div className={`${dropdownDividerClass} mt-2 pt-2 flex justify-between text-sm`}>
                         <a className="text-indigo-300 hover:underline">View all features</a>
                         <a className="text-indigo-300 hover:underline">Watch demo</a>
                       </div>
                     </div>
                   </div>
                 )}
               </div>

               {/* About */}
               <div className="relative">
                 <button onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')} className="px-3 py-2 rounded-md text-sm font-semibold">About</button>
                 {openDropdown === 'about' && (
                   <div className={dropdownPanelClass('w-72')} style={{borderRadius:10}}>
                     <div className="p-4 space-y-2 text-sm">
                       <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Our Story</a>
                       <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Mission & Vision</a>
                       <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Team</a>
                       <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Press & Media</a>
                     </div>
                   </div>
                 )}
               </div>

               {/* More */}
               <div className="relative">
                 <button onClick={() => setOpenDropdown(openDropdown === 'more' ? null : 'more')} className="px-3 py-2 rounded-md text-sm font-semibold">More</button>
                 {openDropdown === 'more' && (
                   <div className={dropdownPanelClass('w-80')} style={{borderRadius:10}}>
                     <div className="p-4 grid grid-cols-2 gap-3 text-sm">
                       <div>
                         <div className={dropdownSectionLabelClass}>Resources</div>
                         <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Documentation</a>
                         <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Tutorials</a>
                         <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Community</a>
                       </div>
                       <div>
                         <div className={dropdownSectionLabelClass}>Company</div>
                         <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Case Studies</a>
                         <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Blog</a>
                       </div>
                     </div>
                   </div>
                 )}
               </div>

               {/* Details */}
               <div className="relative">
                 <button onClick={() => setOpenDropdown(openDropdown === 'details' ? null : 'details')} className="px-3 py-2 rounded-md text-sm font-semibold">Details</button>
                 {openDropdown === 'details' && (
                   <div className={dropdownPanelClass('w-80')} style={{borderRadius:10}}>
                     <div className="p-4 grid grid-cols-2 gap-3 text-sm">
                       <div>
                         <div className={dropdownSectionLabelClass}>Plans</div>
                         <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Pricing</a>
                         <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Feature Comparison</a>
                       </div>
                       <div>
                         <div className={dropdownSectionLabelClass}>Technical</div>
                         <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>SLA & Uptime</a>
                         <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>Security & Compliance</a>
                         <a className={`block p-2 rounded ${dropdownItemClass} ${dropdownLabelClass}`}>API Reference</a>
                       </div>
                     </div>
                   </div>
                 )}
               </div>

               {/* Careers */}
               <div className="relative">
                 <button onClick={() => setOpenDropdown(openDropdown === 'careers' ? null : 'careers')} className="px-3 py-2 rounded-md text-sm font-semibold text-[#4f3ef0]">Careers <span className="ml-2 text-xs bg-[#1a1040] px-2 py-0.5 rounded">6 open</span></button>
                 {openDropdown === 'careers' && (
                   <div className={dropdownPanelClass('w-80')} style={{borderRadius:10}}>
                     <div className="p-4 text-sm space-y-2">
                       <div className={`font-semibold ${dropdownLabelClass}`}>Engineering</div>
                       <div className={`text-sm ml-2 ${isDark ? 'text-[#7c7c9a]' : 'text-gray-500'}`}>3 roles</div>
                       <div className={`font-semibold mt-2 ${dropdownLabelClass}`}>Growth & Marketing</div>
                       <div className={`text-sm ml-2 ${isDark ? 'text-[#7c7c9a]' : 'text-gray-500'}`}>1 role</div>
                       <div className={`font-semibold mt-2 ${dropdownLabelClass}`}>Customer Success</div>
                       <div className={`text-sm ml-2 ${isDark ? 'text-[#7c7c9a]' : 'text-gray-500'}`}>2 roles</div>
                       <div className={`${dropdownDividerClass} mt-2 pt-2 flex justify-between text-sm`}>
                         <a className="text-indigo-300 hover:underline">View all openings</a>
                         <a className="text-indigo-300 hover:underline">Reach out</a>
                       </div>
                     </div>
                   </div>
                 )}
               </div>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={toggleTheme}
              className={`min-h-11 min-w-11 p-2.5 rounded-xl border font-bold flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                isDark ? 'bg-gray-900/60 border-gray-800 text-yellow-400' : 'bg-yellow-100 border-yellow-300 text-yellow-700'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 fill-current" /> : <Moon className="w-4 h-4 fill-current" />}
            </button>

            <button 
              onClick={() => navigate('/login')}
              className={`hidden sm:inline-flex items-center min-h-11 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                isDark ? 'border-gray-800 text-gray-300 hover:text-white' : 'border-gray-300 text-gray-700'
              }`}
            >
              Sign In
            </button>

            <button 
              onClick={() => navigate('/login')}
              className="hidden sm:inline-flex items-center min-h-11 bg-[#4f3ef0] hover:bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-lg shadow-indigo-600/20 transition-all active:scale-95 cursor-pointer"
            >
              Sign Up
            </button>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuOpen((open) => !open);
                setOpenDropdown(null);
              }}
              className={`lg:hidden min-h-11 min-w-11 rounded-xl border flex items-center justify-center transition-all active:scale-95 ${
                isDark ? 'border-gray-800 bg-gray-900/60 text-gray-100' : 'border-gray-300 bg-white text-gray-900'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className={`lg:hidden max-w-7xl mx-auto mt-3 rounded-2xl border p-3 shadow-2xl ${
            isDark ? 'bg-[#0E1322] border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <nav className="grid gap-1">
              {['Product', 'About', 'Resources', 'Plans', 'Careers'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavItemClass}
                >
                  {item}
                </button>
              ))}
            </nav>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-800/60">
              <button
                onClick={() => navigate('/login')}
                className={`min-h-11 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  isDark ? 'border-gray-700 text-gray-200' : 'border-gray-300 text-gray-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/login')}
                className="min-h-11 bg-[#4f3ef0] hover:bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-lg shadow-indigo-600/20 transition-all"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      <main className={`flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28 flex flex-col items-center justify-center text-center relative z-10 ${openDropdown ? 'pointer-events-none' : ''}`}>
        <div className="section-animate fade-transition flex flex-col items-center text-center w-full">
        <div className="inline-flex max-w-full items-center justify-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[11px] sm:text-xs font-semibold tracking-wide uppercase mb-6 sm:mb-8">
          <Zap className="w-3.5 h-3.5 fill-current" /> Next-Gen Data Streaming Platform
        </div>
        
        <h1 className={`text-[clamp(2.25rem,12vw,4.5rem)] font-black tracking-tight max-w-5xl leading-[1.05] text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Real-time AI/Data Streaming <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            & Operations Analytics Engine
          </span>
        </h1>
        
        <p className={`mt-6 text-base sm:text-lg leading-relaxed font-medium text-center mx-auto max-w-[680px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Monitor massive live data streams, detect fraud instantly with Python ML models, 
          and prevent system crashes using intelligent SQS queuing. All in one beautiful real-time dashboard terminal.
        </p>

        <p className={`mt-4 text-sm sm:text-base leading-relaxed font-semibold text-center mx-auto max-w-[680px] ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Process millions of live events with sub-millisecond latency. Built for scale, powered by AI.
        </p>

        <div className="mt-8 flex w-full flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="group flex min-h-12 items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold px-6 sm:px-10 py-4 rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all text-base sm:text-lg active:scale-95 cursor-pointer"
          >
            Launch Live Console 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => window.open('#', '_blank')}
            className={`min-h-12 px-6 sm:px-8 py-3 rounded-2xl text-base sm:text-lg font-semibold transition-colors border ${isDark ? 'border-indigo-500/40 text-indigo-200 hover:bg-[#11131f]/60' : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'} bg-transparent`}
          >
            Watch Demo →
          </button>
        </div>

        {/* Ticker / marquee */}
        <div className="mt-6 w-full max-w-3xl mx-auto">
          <div className={`overflow-hidden rounded-full px-4 py-2 ${isDark ? 'bg-[#071025]/50 border border-indigo-800/30' : 'bg-gray-50 border border-gray-200'}`} aria-hidden="false" role="status">
            <div className="flex items-center">
              <div className="marquee-track flex gap-8 whitespace-nowrap">
                <span className={`text-sm font-semibold px-2 ${isDark ? 'text-indigo-200' : 'text-indigo-600'}`}>10M+ Events/sec</span>
                <span className={`text-sm font-semibold px-2 ${isDark ? 'text-indigo-200' : 'text-indigo-600'}`}>99.99% Uptime</span>
                <span className={`text-sm font-semibold px-2 ${isDark ? 'text-indigo-200' : 'text-indigo-600'}`}>&lt;1ms Latency</span>
                <span className={`text-sm font-semibold px-2 ${isDark ? 'text-indigo-200' : 'text-indigo-600'}`}>500+ Enterprise Clients</span>
                {/* duplicate for seamless loop */}
                <span className={`text-sm font-semibold px-2 ${isDark ? 'text-indigo-200' : 'text-indigo-600'}`}>10M+ Events/sec</span>
                <span className={`text-sm font-semibold px-2 ${isDark ? 'text-indigo-200' : 'text-indigo-600'}`}>99.99% Uptime</span>
                <span className={`text-sm font-semibold px-2 ${isDark ? 'text-indigo-200' : 'text-indigo-600'}`}>&lt;1ms Latency</span>
                <span className={`text-sm font-semibold px-2 ${isDark ? 'text-indigo-200' : 'text-indigo-600'}`}>500+ Enterprise Clients</span>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .marquee-track { animation: marquee 18s linear infinite; }
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          /* make track wider so duplicate items scroll smoothly */
          .marquee-track > span { display: inline-block; }
          .section-animate { opacity: 0; transform: translateY(2rem); }
          .section-animate.in-view { opacity: 1; transform: translateY(0); }
          .fade-transition { transition: opacity 0.6s ease, transform 0.6s ease; }
        `}</style>
        </div>

        <div className="section-animate fade-transition mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 xl:gap-8 text-left w-full relative">
          
          <div className={`p-6 rounded-2xl border transform transition-all duration-300 relative overflow-hidden ${
            isDark ? 'bg-[#0E1322]/80 border-gray-800/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-600/30' : 'bg-white border-gray-200 shadow-md hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-600/20'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-5 border border-indigo-500/20">
              <Server className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Apache Kafka Highway</h3>
            <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Ingests millions of live events and user transactions per second with sub-millisecond latency. Zero data loss.
            </p>
            <div className={`font-mono text-[10px] p-2.5 rounded-lg border break-all ${isDark ? 'bg-gray-950/80 border-gray-900 text-indigo-400' : 'bg-gray-50 border-gray-200 text-indigo-600'}`}>
              {"$ kafka-topics.sh --bootstrap-server liveops:9092 --describe"}
            </div>
            <div className="mt-4">
              <button onClick={() => navigate('/')} className={`text-sm font-semibold ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
                Learn More <ArrowRight className="w-4 h-4 inline-block ml-1" />
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border transform transition-all duration-300 relative overflow-hidden ${
            isDark ? 'bg-[#0E1322]/80 border-gray-800/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-600/30' : 'bg-white border-gray-200 shadow-md hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-600/20'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-5 border border-purple-500/20">
              <Database className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>AWS SQS Smart Buffering</h3>
            <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Handles heavy spikes in traffic by queuing system tasks seamlessly. Prevents downstream AI services from crashing.
            </p>
            <div className={`font-mono text-[10px] p-2.5 rounded-lg border break-all ${isDark ? 'bg-gray-950/80 border-gray-900 text-purple-400' : 'bg-gray-50 border-gray-200 text-purple-600'}`}>
              {"QueueUrl: https://sqs.ap-south-1.amazonaws.com/live-buffer"}
            </div>
            <div className="mt-4">
              <button onClick={() => navigate('/')} className={`text-sm font-semibold ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
                Learn More <ArrowRight className="w-4 h-4 inline-block ml-1" />
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border transform transition-all duration-300 relative overflow-hidden ${
            isDark ? 'bg-[#0E1322]/80 border-gray-800/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-600/30' : 'bg-white border-gray-200 shadow-md hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-600/20'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-5 border border-pink-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Python Anomaly Detection</h3>
            <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Live intelligence engine scanning transaction models for fraud patterns and generating instant operational threat alerts.
            </p>
            <div className={`font-mono text-[10px] p-2.5 rounded-lg border break-all ${isDark ? 'bg-gray-950/80 border-gray-900 text-pink-400' : 'bg-gray-50 border-gray-200 text-pink-600'}`}>
              {"model.predict(tensor) -> IsolationForest()"}
            </div>
            <div className="mt-4">
              <button onClick={() => navigate('/')} className={`text-sm font-semibold ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
                Learn More <ArrowRight className="w-4 h-4 inline-block ml-1" />
              </button>
            </div>
          </div>

          {/* Grafana Live Dashboards card */}
          <div className={`p-6 rounded-2xl border transform transition-all duration-300 relative overflow-hidden ${
            isDark ? 'bg-[#0E1322]/80 border-gray-800/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-600/30' : 'bg-white border-gray-200 shadow-md hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-600/20'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-5 border border-indigo-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Grafana Live Dashboards</h3>
            <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Visualize streaming metrics in real-time with customizable dashboards and automated alerting.
            </p>
            <div className={`font-mono text-[10px] p-2.5 rounded-lg border break-all ${isDark ? 'bg-gray-950/80 border-gray-900 text-indigo-400' : 'bg-gray-50 border-gray-200 text-indigo-600'}`}>
              {"dashboard.panel({ type: 'timeseries' })"}
            </div>
            <div className="mt-4">
              <button onClick={() => navigate('/')} className={`text-sm font-semibold ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
                Learn More <ArrowRight className="w-4 h-4 inline-block ml-1" />
              </button>
            </div>
          </div>

        </div>

        {/* Stats section */}
        <section ref={statsRef} className={`section-animate fade-transition w-full mt-12 ${isDark ? 'bg-[#1a1a2e]' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {formatStat('eps', counts.eps)}
                </div>
                <div className={`mt-2 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Events Per Second</div>
              </div>

              <div className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {formatStat('uptime', counts.uptime)}
                </div>
                <div className={`mt-2 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Uptime SLA</div>
              </div>

              <div className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {formatStat('latency', counts.latency)}
                </div>
                <div className={`mt-2 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Processing Latency</div>
              </div>

              <div className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {formatStat('clients', counts.clients)}
                </div>
                <div className={`mt-2 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Enterprise Clients</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section className={`section-animate fade-transition w-full mt-12 ${isDark ? 'bg-[#06071a]/40' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
            <h3 className={`text-2xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Pricing</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free */}
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0E1322]/60 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Free</div>
                  <div className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>$0</div>
                </div>
                <div className={`mt-4 space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div>100K events/mo</div>
                  <div>1 stream</div>
                  <div>Community support</div>
                </div>
                <div className="mt-6">
                  <button className={`w-full px-4 py-3 rounded-xl font-semibold border ${isDark ? 'border-indigo-500/30 text-indigo-200' : 'border-indigo-600 text-indigo-600'} bg-transparent`}>Get Started</button>
                </div>
              </div>

              {/* Pro - most popular */}
              <div className={`relative p-6 rounded-2xl border-2 ${isDark ? 'bg-[#0F1530]/80 border-purple-500' : 'bg-white border-purple-400'} shadow-lg`}>
                <div className="absolute -top-3 right-3 bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</div>
                <div className="flex items-center justify-between">
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Pro</div>
                  <div className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>$49/mo</div>
                </div>
                <div className={`mt-4 space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div>10M events/mo</div>
                  <div>10 streams</div>
                  <div>SQS buffering</div>
                  <div>Anomaly detection</div>
                  <div>Email support</div>
                </div>
                <div className="mt-6">
                  <button className="w-full px-4 py-3 rounded-xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-2xl">Start Free Trial</button>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow: isDark ? '0 8px 30px rgba(124,58,237,0.18)' : '0 8px 30px rgba(124,58,237,0.12)' }} />
              </div>

              {/* Enterprise */}
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0E1322]/60 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Enterprise</div>
                  <div className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Custom</div>
                </div>
                <div className={`mt-4 space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div>Unlimited events</div>
                  <div>Custom SLAs</div>
                  <div>Dedicated support</div>
                  <div>SSO</div>
                </div>
                <div className="mt-6">
                  <button className={`w-full px-4 py-3 rounded-xl font-semibold border ${isDark ? 'border-indigo-500/30 text-indigo-200' : 'border-indigo-600 text-indigo-600'} bg-transparent`}>Contact Sales</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-animate fade-transition w-full mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
            <h3 className={`text-2xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>How It Works</h3>

            {/* Desktop horizontal flow */}
            <div className="hidden lg:flex items-center justify-between gap-6">
              <div className="flex-1 flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Ingest</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Data streams in via Kafka topics from any source at any scale.</div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <svg className="w-[clamp(4rem,8vw,10rem)] h-8" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <path d="M0 10 L180 10" stroke="url(#g1)" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" className="animate-dash" />
                  <path d="M180 10 L170 5 M180 10 L170 15" stroke="url(#g1)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div className="flex-1 flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Process</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>AI models and anomaly detection run on every event in real time.</div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <svg className="w-[clamp(4rem,8vw,10rem)] h-8" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="g2" x1="0" x2="1">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <path d="M0 10 L180 10" stroke="url(#g2)" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" className="animate-dash" />
                  <path d="M180 10 L170 5 M180 10 L170 15" stroke="url(#g2)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div className="flex-1 flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Alert & Act</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Instant alerts, dashboards, and automated responses fire within milliseconds.</div>
                </div>
              </div>
            </div>

            {/* Mobile vertical flow */}
            <div className="lg:hidden flex flex-col items-start gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Ingest</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Data streams in via Kafka topics from any source at any scale.</div>
                </div>
              </div>

              <div className="w-full flex items-center justify-center">
                <svg className="w-2 h-12" viewBox="0 0 2 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 0 L1 60" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-vertical" strokeLinecap="round" />
                </svg>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Process</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>AI models and anomaly detection run on every event in real time.</div>
                </div>
              </div>

              <div className="w-full flex items-center justify-center">
                <svg className="w-2 h-12" viewBox="0 0 2 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 0 L1 60" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4" className="animate-dash-vertical" strokeLinecap="round" />
                </svg>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Alert & Act</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Instant alerts, dashboards, and automated responses fire within milliseconds.</div>
                </div>
              </div>
            </div>

            <style>{`
              .animate-dash { animation: dash 2s linear infinite; }
              @keyframes dash { to { stroke-dashoffset: -28; } }
              .animate-dash-vertical { animation: dash-vert 2s linear infinite; }
              @keyframes dash-vert { to { stroke-dashoffset: -12; } }
            `}</style>
          </div>
        </section>

      </main>

      <footer className={`border-t py-6 text-center text-xs tracking-wide font-medium ${isDark ? 'border-gray-900/60 text-gray-600 bg-gray-950/20' : 'border-gray-200 text-gray-400 bg-gray-100/50'}`}>
        © 2026 LiveOps AI Engine. Designed for High-Throughput Scalable Operations.
      </footer>

    </div>
  );
}

export default LandingPage;
